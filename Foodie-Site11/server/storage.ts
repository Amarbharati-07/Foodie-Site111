import {
  type Category,
  type MenuItem,
  type InsertContactMessage,
  type InsertReservation,
  type Review,
  type InsertReview,
} from "@shared/schema";
import fs from "fs/promises";
import path from "path";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getMenuItems(categoryId?: number): Promise<MenuItem[]>;
  getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]>;
  createContactMessage(message: InsertContactMessage): Promise<void>;
  createReservation(reservation: InsertReservation): Promise<void>;
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  private reservationFile = path.resolve(process.cwd(), "reservation.json");
  private reviewsFile = path.resolve(process.cwd(), "reviews.json");
  private categories: Category[] = [];
  private menuItems: MenuItem[] = [];
  private contactMessages: any[] = [];

  async getReviews(): Promise<Review[]> {
    try {
      const data = await fs.readFile(this.reviewsFile, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }

  async createReview(review: InsertReview): Promise<Review> {
    const reviews = await this.getReviews();
    const newReview: Review = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...review
    };
    reviews.push(newReview);
    await fs.writeFile(this.reviewsFile, JSON.stringify(reviews, null, 2));
    return newReview;
  }

  async getCategories(): Promise<Category[]> {
    return this.categories;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return this.categories.find(c => c.slug === slug);
  }

  async getMenuItems(categoryId?: number): Promise<MenuItem[]> {
    if (categoryId) {
      return this.menuItems.filter(item => item.categoryId === categoryId);
    }
    return this.menuItems;
  }

  async getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]> {
    return this.menuItems.filter(item => item.categoryId === categoryId);
  }

  async createContactMessage(message: InsertContactMessage): Promise<void> {
    this.contactMessages.push({ id: Date.now(), ...message });
  }

  async createReservation(reservation: InsertReservation): Promise<void> {
    try {
      let currentReservations: any[] = [];
      try {
        const data = await fs.readFile(this.reservationFile, "utf-8");
        currentReservations = JSON.parse(data);
      } catch (e) {
        currentReservations = [];
      }
      
      const newReservation = {
        id: Date.now(),
        ...reservation
      };
      
      currentReservations.push(newReservation);
      await fs.writeFile(this.reservationFile, JSON.stringify(currentReservations, null, 2));
    } catch (error) {
      console.error("Error saving reservation to file:", error);
      throw new Error("Failed to save reservation locally.");
    }
  }

  async seedData(): Promise<void> {
    if (this.categories.length > 0) return;

    const catsData = [
      { id: 1, name: "Breakfast & Snacks", slug: "breakfast", bannerImage: "https://images.unsplash.com/photo-1593560708920-63984dc86f71?auto=format&fit=crop&q=80" },
      { id: 2, name: "Sandwich", slug: "sandwich", bannerImage: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80" },
      { id: 3, name: "Burger", slug: "burger", bannerImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80" },
      { id: 4, name: "Pav Bhaji", slug: "pav-bhaji", bannerImage: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&q=80" },
      { id: 5, name: "Soups", slug: "soups", bannerImage: "https://images.unsplash.com/photo-1547592166-23acbe3a624b?auto=format&fit=crop&q=80" },
      { id: 6, name: "Sabzi (Punjabi Dishes)", slug: "sabzi", bannerImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80" },
      { id: 7, name: "Dal", slug: "dal", bannerImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80" },
      { id: 8, name: "Rice & Biryani", slug: "rice", bannerImage: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80" },
      { id: 9, name: "Paneer Special", slug: "paneer", bannerImage: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80" },
      { id: 10, name: "Tandoor Corner", slug: "tandoor", bannerImage: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80" },
      { id: 11, name: "Chinese Snacks", slug: "chinese-snacks", bannerImage: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80" },
      { id: 12, name: "Noodles", slug: "noodles", bannerImage: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80" },
      { id: 13, name: "Chinese Rice", slug: "chinese-rice", bannerImage: "https://images.unsplash.com/photo-1538329972958-465d6d2166e3?auto=format&fit=crop&q=80" },
      { id: 14, name: "Breads", slug: "breads", bannerImage: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80" },
    ];

    this.categories = catsData.map(c => ({ 
      id: c.id, 
      name: c.name, 
      slug: c.slug, 
      bannerImage: c.bannerImage,
      description: ""
    }));

    const items = [
      { catId: 1, name: "Bread Butter", price: 40, img: "https://images.unsplash.com/photo-1616035805118-0245465e6417?auto=format&fit=crop&q=80" },
      { catId: 1, name: "Toast Butter", price: 50, img: "https://images.unsplash.com/photo-1584776293029-418f03766aeb?auto=format&fit=crop&q=80" },
      { catId: 1, name: "Bread Butter Jam", price: 55, img: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80" },
      { catId: 1, name: "Chutney Sandwich", price: 60, img: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80" },
      { catId: 1, name: "Medu Vada Sambhar", price: 70, img: "https://images.unsplash.com/photo-1626132646529-5aa212ddbae4?auto=format&fit=crop&q=80" },
      { catId: 1, name: "Idli Sambhar", price: 60, img: "https://images.unsplash.com/photo-1589301760576-416b71151a73?auto=format&fit=crop&q=80" },
      { catId: 1, name: "Masala Dosa", price: 90, img: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80" },
      { catId: 1, name: "Mysore Dosa", price: 100, img: "https://images.unsplash.com/photo-1630406184470-7fd4440e82ae?auto=format&fit=crop&q=80" },
      { catId: 2, name: "Chilli Cheese Sandwich", price: 120, img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80" },
      { catId: 2, name: "Corn Cheese Sandwich", price: 130, img: "https://images.unsplash.com/photo-1621852004158-f3bc188caa21?auto=format&fit=crop&q=80" },
      { catId: 2, name: "Tandoori Paneer Sandwich", price: 150, img: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&q=80" },
      { catId: 3, name: "Classic Veg Burger", price: 90, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80" },
      { catId: 3, name: "Cheese Burger", price: 110, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80" },
      { catId: 3, name: "Aloo Tikki Burger", price: 80, img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80" },
      { catId: 4, name: "Pav Bhaji", price: 120, img: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&q=80" },
      { catId: 4, name: "Amul Pav Bhaji", price: 140, img: "https://images.unsplash.com/photo-1606491959313-000a653457a8?auto=format&fit=crop&q=80" },
      { catId: 4, name: "Cheese Pav Bhaji", price: 150, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80" },
      { catId: 6, name: "Paneer Butter Masala", price: 240, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80" },
      { catId: 6, name: "Paneer Kadai", price: 250, img: "https://images.unsplash.com/photo-1601050638911-c32699179cc1?auto=format&fit=crop&q=80" },
      { catId: 6, name: "Veg Kolhapuri", price: 220, img: "https://images.unsplash.com/photo-1585937421612-70a008356f36?auto=format&fit=crop&q=80" },
      { catId: 8, name: "Veg Biryani", price: 200, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80" },
      { catId: 8, name: "Jeera Rice", price: 140, img: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80" },
      { catId: 8, name: "Hyderabadi Biryani", price: 220, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80" },
      { catId: 12, name: "Veg Hakka Noodles", price: 180, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80" },
      { catId: 12, name: "Schezwan Noodles", price: 200, img: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80" },
      { catId: 11, name: "Veg Manchurian", price: 190, img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80" },
      { catId: 11, name: "Paneer Chilli", price: 220, img: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&q=80" },
    ];

    this.menuItems = items.map((item, idx) => ({
      id: idx + 1,
      categoryId: item.catId,
      name: item.name,
      price: item.price,
      imageUrl: item.img,
      description: "Delicious " + item.name + " prepared with fresh ingredients.",
      isVeg: true,
      isBestseller: false
    }));
  }
}

export const storage = new DatabaseStorage();
