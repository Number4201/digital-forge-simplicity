
import { z } from 'zod';

// Validation schema for the form
export const formSchema = z.object({
  name: z.string().min(2, { message: 'Jméno musí mít alespoň 2 znaky' }),
  company: z.string().optional(),
  websiteType: z.string().min(3, { message: 'Popište prosím o jaký web půjde' }),
  questions: z.string().optional(),
  phone: z.string()
    .regex(/^(\+420)? ?[0-9]{3} ?[0-9]{3} ?[0-9]{3}$/, { 
      message: 'Neplatné telefonní číslo. Formát: +420 123 456 789' 
    })
    .optional()
    .or(z.literal('')),
  email: z.string()
    .email({ message: 'Neplatná emailová adresa' })
    .optional()
    .or(z.literal('')),
}).refine(data => data.phone || data.email, {
  message: 'Zadejte prosím telefonní číslo nebo email',
  path: ['phone'],
});

export type FormValues = z.infer<typeof formSchema>;
