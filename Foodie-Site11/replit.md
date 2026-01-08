# Shri Krishna Restaurant Website

## Overview

A premium restaurant website for Shri Krishna Restaurant, a pure vegetarian restaurant located in Ambernath, Thane. The site showcases the restaurant's menu with image-based cards, provides information about the restaurant, displays a photo gallery, and includes a contact form. The design draws inspiration from premium restaurant websites with smooth animations and a gold/amber color theme.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom theme configuration extending colors (gold/amber primary) and fonts (Playfair Display serif, Inter sans-serif)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for page transitions, scroll animations, and hover effects
- **State Management**: TanStack React Query for server state and data fetching
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers
- **PDF Generation**: jsPDF with jspdf-autotable for menu PDF export

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript using ESM modules
- **API Design**: RESTful endpoints with centralized route definitions in shared code
- **Build System**: Custom build script using esbuild for server bundling, Vite for client bundling
- **Development**: tsx for running TypeScript directly, Vite dev server with HMR

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for automatic schema-to-validation integration
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Tables**: 
  - `categories` - Menu categories with banner images
  - `menuItems` - Individual dishes with images, prices, veg indicators
  - `contactMessages` - Contact form submissions
- **Database Commands**: `npm run db:push` uses drizzle-kit to push schema changes

### Key Design Patterns
- **Monorepo Structure**: Client (`client/`), server (`server/`), and shared code (`shared/`) in single repository
- **Shared Types**: Schema definitions and API route contracts shared between frontend and backend via `@shared/` path alias
- **API Route Definition**: Centralized in `shared/routes.ts` with Zod schemas for request/response validation
- **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared code
- **Data Seeding**: Server automatically seeds initial menu data on startup if database is empty

### Project Structure
```
Foodie-Site/
├── client/           # React frontend
│   └── src/
│       ├── components/  # UI components including shadcn/ui
│       ├── pages/       # Route pages (Home, Menu, About, Gallery, Contact)
│       ├── hooks/       # Custom hooks for data fetching and utilities
│       └── lib/         # Utilities and query client configuration
├── server/           # Express backend
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database operations and seeding
│   ├── db.ts         # Database connection setup
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared code between client and server
│   ├── schema.ts     # Drizzle database schema definitions
│   └── routes.ts     # API route contracts with Zod validation
└── migrations/       # Drizzle database migrations
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database queries and schema management
- **connect-pg-simple**: PostgreSQL session storage (available but sessions not currently implemented)

### Third-Party Libraries
- **jsPDF**: Client-side PDF generation for downloadable menus
- **Framer Motion**: Animation library for smooth UI transitions
- **Radix UI**: Accessible component primitives (via shadcn/ui)
- **TanStack Query**: Data fetching and caching
- **Zod**: Schema validation for forms and API contracts

### Build Tools
- **Vite**: Frontend development server and production bundler
- **esbuild**: Server-side TypeScript bundling for production
- **tsx**: TypeScript execution for development

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner display