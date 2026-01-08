import { useQuery, useMutation } from "@tanstack/react-query";
import { api, buildUrl, type errorSchemas } from "@shared/routes";
import { z } from "zod";

// ============================================
// CATEGORIES
// ============================================

export function useCategories() {
  return useQuery({
    queryKey: [api.categories.list.path],
    queryFn: async () => {
      const res = await fetch(api.categories.list.path);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return api.categories.list.responses[200].parse(await res.json());
    },
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: [api.categories.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.categories.get.path, { slug });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch category");
      return api.categories.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}

// ============================================
// MENU ITEMS
// ============================================

export function useMenuItems(categoryId?: string) {
  return useQuery({
    queryKey: [api.menuItems.list.path, categoryId],
    queryFn: async () => {
      const url = new URL(api.menuItems.list.path, window.location.origin);
      if (categoryId) {
        url.searchParams.append("categoryId", categoryId);
      }
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch menu items");
      return api.menuItems.list.responses[200].parse(await res.json());
    },
  });
}

export function useMenuItemsByCategory(categoryId: number) {
  return useQuery({
    queryKey: [api.menuItems.getByCategory.path, categoryId],
    queryFn: async () => {
      const url = buildUrl(api.menuItems.getByCategory.path, { id: categoryId });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch items");
      return api.menuItems.getByCategory.responses[200].parse(await res.json());
    },
    enabled: !!categoryId,
  });
}

// ============================================
// CONTACT
// ============================================

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.contact.submit.input>) => {
      const validated = api.contact.submit.input.parse(data);
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit message");
      }
      
      return api.contact.submit.responses[200].parse(await res.json());
    },
  });
}
