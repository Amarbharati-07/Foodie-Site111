import { z } from 'zod';
import { insertContactMessageSchema, categories, menuItems } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  categories: {
    list: {
      method: 'GET' as const,
      path: '/api/categories',
      responses: {
        200: z.array(z.custom<typeof categories.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/categories/:slug',
      responses: {
        200: z.custom<typeof categories.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
  menuItems: {
    list: {
      method: 'GET' as const,
      path: '/api/menu-items',
      input: z.object({
        categoryId: z.string().optional(), // Query param is string, needs parsing
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof menuItems.$inferSelect>()),
      },
    },
    getByCategory: {
      method: 'GET' as const,
      path: '/api/categories/:id/items',
      responses: {
        200: z.array(z.custom<typeof menuItems.$inferSelect>()),
      },
    }
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertContactMessageSchema,
      responses: {
        200: z.object({ success: z.boolean() }),
        400: errorSchemas.validation,
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
