import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitReservation } from "@/hooks/use-restaurant";
import { api } from "@shared/routes";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Calendar, Users, User } from "lucide-react";
import { motion } from "framer-motion";

// Helper to coerce types for form
const reservationFormSchema = api.reservation.submit.input;
type ReservationFormValues = z.infer<typeof reservationFormSchema>;

export default function Reservation() {
  const { toast } = useToast();
  const submitMutation = useSubmitReservation();
  
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      date: "",
      time: "",
      guests: 2
    }
  });

  const onSubmit = (data: ReservationFormValues) => {
    submitMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Reservation Request Sent!",
          description: "Thank you for choosing us. We will confirm your table shortly.",
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
          <h1 className="font-serif text-5xl font-bold mb-4">Book a Table</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-lg">
            Plan your perfect dining experience. Secure your table at Shri Krishna Pure Vegetarian.
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

          {/* Reservation Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-2/3"
          >
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border">
              <h3 className="font-serif text-3xl font-bold mb-2 text-[#1b4332]">Table Reservation</h3>
              <p className="text-muted-foreground mb-8">Please fill in the details to request a table.</p>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">First Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        {...form.register("firstName")}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-[#4caf50]/20 focus:border-[#4caf50] transition-all"
                        placeholder="John"
                        required
                      />
                    </div>
                    {form.formState.errors.firstName && <p className="text-destructive text-xs">{form.formState.errors.firstName.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        {...form.register("lastName")}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-[#4caf50]/20 focus:border-[#4caf50] transition-all"
                        placeholder="Doe"
                        required
                      />
                    </div>
                    {form.formState.errors.lastName && <p className="text-destructive text-xs">{form.formState.errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Contact Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        {...form.register("phone")}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-[#4caf50]/20 focus:border-[#4caf50] transition-all"
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                    {form.formState.errors.phone && <p className="text-destructive text-xs">{form.formState.errors.phone.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        {...form.register("email")}
                        type="email"
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-[#4caf50]/20 focus:border-[#4caf50] transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    {form.formState.errors.email && <p className="text-destructive text-xs">{form.formState.errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      {...form.register("address")}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-[#4caf50]/20 focus:border-[#4caf50] transition-all"
                      placeholder="Your full address"
                      required
                    />
                  </div>
                  {form.formState.errors.address && <p className="text-destructive text-xs">{form.formState.errors.address.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Reservation Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        {...form.register("date")}
                        type="date"
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-[#4caf50]/20 focus:border-[#4caf50] transition-all"
                        required
                      />
                    </div>
                    {form.formState.errors.date && <p className="text-destructive text-xs">{form.formState.errors.date.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Reservation Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        {...form.register("time")}
                        type="time"
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-[#4caf50]/20 focus:border-[#4caf50] transition-all"
                        required
                      />
                    </div>
                    {form.formState.errors.time && <p className="text-destructive text-xs">{form.formState.errors.time.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Number of Guests</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        {...form.register("guests", { valueAsNumber: true })}
                        type="number"
                        min="1"
                        max="20"
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-[#4caf50]/20 focus:border-[#4caf50] transition-all"
                        required
                      />
                    </div>
                    {form.formState.errors.guests && <p className="text-destructive text-xs">{form.formState.errors.guests.message}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full md:w-auto px-10 py-4 bg-[#4caf50] text-white font-bold rounded-full shadow-lg shadow-[#4caf50]/30 hover:shadow-xl hover:-translate-y-1 hover:bg-[#43a047] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitMutation.isPending ? "Requesting..." : "Reserve Now"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
