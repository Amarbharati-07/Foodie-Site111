import { z } from "zod";

export interface Category {
  id: number;
  name: string;
  slug: string;
  bannerImage: string;
  description: string;
}

export interface MenuItem {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isVeg: boolean;
  isBestseller: boolean;
}

export const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  message: z.string().min(1, "Message is required"),
});

export const insertReservationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(1, "Address is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.number().min(1, "At least 1 guest required"),
});

export const insertReviewSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, "Review text is required"),
  location: z.string().optional(),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type Reservation = z.infer<typeof insertReservationSchema> & { id: number };
export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Review = z.infer<typeof insertReviewSchema> & { id: number; date: string };
export type InsertReview = z.infer<typeof insertReviewSchema>;
