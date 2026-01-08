import { db } from "./db";
import {
  categories,
  menuItems,
  contactMessages,
  type Category,
  type MenuItem,
  type InsertContactMessage,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getMenuItems(categoryId?: number): Promise<MenuItem[]>;
  getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]>;
  createContactMessage(message: InsertContactMessage): Promise<void>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async getMenuItems(categoryId?: number): Promise<MenuItem[]> {
    if (categoryId) {
      return this.getMenuItemsByCategory(categoryId);
    }
    return await db.select().from(menuItems);
  }

  async getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]> {
    return await db.select().from(menuItems).where(eq(menuItems.categoryId, categoryId));
  }

  async createContactMessage(message: InsertContactMessage): Promise<void> {
    await db.insert(contactMessages).values(message);
  }

  async seedData(): Promise<void> {
    const existingCats = await this.getCategories();
    if (existingCats.length > 0) return;

    // Seed Categories
    const catsData = [
      { name: "Breakfast & Snacks", slug: "breakfast", banner: "https://images.unsplash.com/photo-1593560708920-63984dc86f71?auto=format&fit=crop&q=80" },
      { name: "Sandwich", slug: "sandwich", banner: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80" },
      { name: "Burger", slug: "burger", banner: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80" },
      { name: "Pav Bhaji", slug: "pav-bhaji", banner: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&q=80" },
      { name: "Soups", slug: "soups", banner: "https://images.unsplash.com/photo-1547592166-23acbe3a624b?auto=format&fit=crop&q=80" },
      { name: "Sabzi (Punjabi Dishes)", slug: "sabzi", banner: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80" },
      { name: "Dal", slug: "dal", banner: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80" },
      { name: "Rice & Biryani", slug: "rice", banner: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80" },
      { name: "Paneer Special", slug: "paneer", banner: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80" },
      { name: "Tandoor Corner", slug: "tandoor", banner: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80" },
      { name: "Chinese Snacks", slug: "chinese-snacks", banner: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80" },
      { name: "Noodles", slug: "noodles", banner: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80" },
      { name: "Chinese Rice", slug: "chinese-rice", banner: "https://images.unsplash.com/photo-1538329972958-465d6d2166e3?auto=format&fit=crop&q=80" },
      { name: "Breads", slug: "breads", banner: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80" },
    ];

    const insertedCats = await db.insert(categories).values(
      catsData.map(c => ({ name: c.name, slug: c.slug, bannerImage: c.banner }))
    ).returning();

    // Map inserted categories by slug for easy lookup
    const catMap = new Map(insertedCats.map(c => [c.slug, c.id]));

    // Seed Menu Items
    const items = [
      // Breakfast
      { cat: "breakfast", name: "Bread Butter", price: 40, img: "https://images.unsplash.com/photo-1616035805118-0245465e6417?auto=format&fit=crop&q=80" },
      { cat: "breakfast", name: "Toast Butter", price: 50, img: "https://images.unsplash.com/photo-1584776293029-418f03766aeb?auto=format&fit=crop&q=80" },
      { cat: "breakfast", name: "Bread Butter Jam", price: 55, img: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80" },
      { cat: "breakfast", name: "Chutney Sandwich", price: 60, img: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80" },
      { cat: "breakfast", name: "Medu Vada Sambhar", price: 70, img: "https://images.unsplash.com/photo-1626132646529-5aa212ddbae4?auto=format&fit=crop&q=80" },
      { cat: "breakfast", name: "Idli Sambhar", price: 60, img: "https://images.unsplash.com/photo-1589301760576-416b71151a73?auto=format&fit=crop&q=80" },
      { cat: "breakfast", name: "Masala Dosa", price: 90, img: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80" },
      { cat: "breakfast", name: "Mysore Dosa", price: 100, img: "https://images.unsplash.com/photo-1630406184470-7fd4440e82ae?auto=format&fit=crop&q=80" },
      
      // Sandwich
      { cat: "sandwich", name: "Chilli Cheese Sandwich", price: 120, img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80" },
      { cat: "sandwich", name: "Corn Cheese Sandwich", price: 130, img: "https://images.unsplash.com/photo-1621852004158-f3bc188caa21?auto=format&fit=crop&q=80" },
      { cat: "sandwich", name: "Tandoori Paneer Sandwich", price: 150, img: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&q=80" },

      // Burger
      { cat: "burger", name: "Classic Veg Burger", price: 90, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80" },
      { cat: "burger", name: "Cheese Burger", price: 110, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80" },
      { cat: "burger", name: "Aloo Tikki Burger", price: 80, img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80" },

      // Pav Bhaji
      { cat: "pav-bhaji", name: "Pav Bhaji", price: 120, img: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&q=80" },
      { cat: "pav-bhaji", name: "Amul Pav Bhaji", price: 140, img: "https://images.unsplash.com/photo-1606491959313-000a653457a8?auto=format&fit=crop&q=80" },
      { cat: "pav-bhaji", name: "Cheese Pav Bhaji", price: 150, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80" },

      // Sabzi
      { cat: "sabzi", name: "Paneer Butter Masala", price: 240, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80" },
      { cat: "sabzi", name: "Paneer Kadai", price: 250, img: "https://images.unsplash.com/photo-1601050638911-c32699179cc1?auto=format&fit=crop&q=80" },
      { cat: "sabzi", name: "Veg Kolhapuri", price: 220, img: "https://images.unsplash.com/photo-1585937421612-70a008356f36?auto=format&fit=crop&q=80" },

      // Rice
      { cat: "rice", name: "Veg Biryani", price: 200, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80" },
      { cat: "rice", name: "Jeera Rice", price: 140, img: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80" },
      { cat: "rice", name: "Hyderabadi Biryani", price: 220, img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80" },

      // Chinese
      { cat: "noodles", name: "Veg Hakka Noodles", price: 180, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80" },
      { cat: "noodles", name: "Schezwan Noodles", price: 200, img: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80" },
      { cat: "chinese-snacks", name: "Veg Manchurian", price: 190, img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80" },
      { cat: "chinese-snacks", name: "Paneer Chilli", price: 220, img: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&q=80" },
    ];

    await db.insert(menuItems).values(
      items.map(item => ({
        categoryId: catMap.get(item.cat)!,
        name: item.name,
        price: item.price,
        imageUrl: item.img,
        description: "Delicious " + item.name + " prepared with fresh ingredients.",
        isVeg: true,
      }))
    );
  }
}

export const storage = new DatabaseStorage();
