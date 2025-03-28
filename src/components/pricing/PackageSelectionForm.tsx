
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PricingTier } from './PackageTypes';
import { formSchema, FormValues } from './FormSchema';

interface PackageSelectionFormProps {
  selectedPackage: PricingTier;
  showExpressOption: boolean;
  isSubmitting: boolean;
  onSubmit: (data: FormValues) => Promise<void>;
}

const PackageSelectionForm = ({ 
  selectedPackage, 
  showExpressOption, 
  isSubmitting, 
  onSubmit 
}: PackageSelectionFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      websiteType: '',
      questions: '',
      phone: '',
      email: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jméno</FormLabel>
                <FormControl>
                  <Input placeholder="Vaše jméno" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firma</FormLabel>
                <FormControl>
                  <Input placeholder="Název firmy (nepovinné)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="websiteType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>O jaký web půjde</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Popište stručně jaký web potřebujete a k čemu bude sloužit" 
                  rows={3} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="questions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dotazy</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Máte-li nějaké další dotazy či požadavky, napište nám je sem" 
                  rows={3} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefonní číslo</FormLabel>
                <FormControl>
                  <Input placeholder="+420 123 456 789" {...field} />
                </FormControl>
                <FormDescription>
                  Vyplňte telefon nebo email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="vas@email.cz" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6 sm:mt-8">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Odesílám...
              </>
            ) : (
              "Odeslat objednávku"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PackageSelectionForm;
