import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitContact } from "@/hooks/use-restaurant";
import { api } from "@shared/routes";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

// Helper to coerce types for form
const contactFormSchema = api.contact.submit.input;
type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const submitMutation = useSubmitContact();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    submitMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We will get back to you shortly.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Header */}
      <div className="bg-foreground text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-lg">
            We'd love to hear from you. Whether it's a reservation, feedback, or a catering query.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-border">
              <h3 className="font-serif text-2xl font-bold mb-6 text-foreground">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Location</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Station Road, Near Shiv Mandir,<br />Ambernath (West), Thane 421501
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Phone</h4>
                    <p className="text-muted-foreground text-sm">
                      <a href="tel:+917028684786" className="hover:text-primary transition-colors">+91 7028684786</a>
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Email</h4>
                    <p className="text-muted-foreground text-sm">info@shrikrishnarestaurant.com</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Opening Hours</h4>
                    <p className="text-muted-foreground text-sm">Mon - Sun: 8:45 AM - 10:45 PM</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-muted h-64 rounded-2xl overflow-hidden relative shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.6666060416965!2d73.1812!3d19.2057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDEyJzIwLjUiTiA3M8KwMTAnNTIuMyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Restaurant Location"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-2/3"
          >
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border">
              <h3 className="font-serif text-3xl font-bold mb-2">Send us a Message</h3>
              <p className="text-muted-foreground mb-8">We value your feedback and queries.</p>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Your Name</label>
                    <input
                      {...form.register("name")}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="John Doe"
                    />
                    {form.formState.errors.name && <p className="text-destructive text-xs">{form.formState.errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <input
                      {...form.register("phone")}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="+91 9876543210"
                    />
                    {form.formState.errors.phone && <p className="text-destructive text-xs">{form.formState.errors.phone.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <input
                    {...form.register("email")}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && <p className="text-destructive text-xs">{form.formState.errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    {...form.register("message")}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="Tell us about your experience..."
                  />
                  {form.formState.errors.message && <p className="text-destructive text-xs">{form.formState.errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitMutation.isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
