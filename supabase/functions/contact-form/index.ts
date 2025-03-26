
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const NOTIFICATION_EMAIL = "theheydee@gmail.com";
const FROM_EMAIL = "tvorba@digitalnikovari.cz";

// Nastavení CORS hlaviček
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Vyřešení CORS pro preflight požadavky
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject = "", message }: ContactFormData = await req.json();

    // Validace dat
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: "Všechna povinná pole musí být vyplněna.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Vytvoření Supabase klienta
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Uložení do databáze
    const { data, error: dbError } = await supabase
      .from("contact_form_submissions")
      .insert([{ name, email, message }]);

    if (dbError) {
      console.error("Chyba při ukládání do databáze:", dbError);
      // Pokračujeme s odesláním e-mailu i když se nepodařilo uložit do databáze
    }

    // Odeslání e-mailu
    const emailResponse = await resend.emails.send({
      from: `Digitální kováři <${FROM_EMAIL}>`,
      to: [NOTIFICATION_EMAIL],
      subject: `Nový kontakt: ${subject || "Kontaktní formulář"}`,
      html: `
        <h1>Nový kontaktní formulář</h1>
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Předmět:</strong> ${subject}</p>` : ""}
        <p><strong>Zpráva:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    console.log("E-mail odeslán:", emailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Formulář byl úspěšně odeslán.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Chyba při zpracování kontaktního formuláře:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Vyskytla se chyba při zpracování požadavku.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
