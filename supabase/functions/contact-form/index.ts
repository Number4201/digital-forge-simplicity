
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.3";

// Define the Resend API key directly
const RESEND_API_KEY = "re_JPvTaZko_5aE7M6YhsY7h4pxQhEFKRDXt";

console.log("Initializing with Resend API key:", RESEND_API_KEY.substring(0, 5) + "...");

const resend = new Resend(RESEND_API_KEY);
const NOTIFICATION_EMAIL = "theheydee@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev"; // Using Resend's default domain until yours is verified

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
  phone?: string;
  company?: string;
  form_type?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Vyřešení CORS pro preflight požadavky
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    const { name, email, subject = "", message, phone, company, form_type } = formData;

    // Logging data received for debugging
    console.log("Received form data:", formData);

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
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase environment variables are not set properly");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Odeslání e-mailu
    try {
      console.log("Sending email with Resend");
      console.log("To:", NOTIFICATION_EMAIL);
      console.log("From:", FROM_EMAIL);
      
      // Enhance email subject with form type if available
      const emailSubject = form_type 
        ? `Nový kontakt [${form_type}]: ${subject}`
        : `Nový kontakt: ${subject || "Kontaktní formulář"}`;
      
      // Enhance email content with additional fields if available
      let emailContent = `
        <h1>Nový kontaktní formulář</h1>
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
      `;
      
      if (phone) {
        emailContent += `<p><strong>Telefon:</strong> ${phone}</p>`;
      }
      
      if (company) {
        emailContent += `<p><strong>Firma:</strong> ${company}</p>`;
      }
      
      if (form_type) {
        emailContent += `<p><strong>Typ formuláře:</strong> ${form_type}</p>`;
      }
      
      if (subject) {
        emailContent += `<p><strong>Předmět:</strong> ${subject}</p>`;
      }
      
      emailContent += `
        <p><strong>Zpráva:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `;
      
      const emailResponse = await resend.emails.send({
        from: `Digitální kováři <${FROM_EMAIL}>`,
        to: [NOTIFICATION_EMAIL],
        subject: emailSubject,
        html: emailContent,
      });

      console.log("E-mail response:", JSON.stringify(emailResponse));

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
    } catch (emailError: any) {
      console.error("Chyba při odesílání e-mailu:", emailError);
      console.error("Error details:", JSON.stringify(emailError));
      
      return new Response(
        JSON.stringify({
          error: `Chyba při odesílání e-mailu: ${emailError.message}`,
          details: JSON.stringify(emailError)
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
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
