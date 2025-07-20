# REST Express Sponsorship Platform

## Overview

This is a full-stack web application built for managing sponsorship packages and quotes. The application uses a modern tech stack with a React frontend and Express backend, designed to handle sponsorship benefits, packages, and quote generation for what appears to be a Brazilian event or platform.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and bundling
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the entire application
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (configured but can be provisioned later)
- **Session Storage**: PostgreSQL-based sessions using connect-pg-simple
- **API Design**: RESTful endpoints with proper error handling

### Database Strategy
- **ORM**: Drizzle ORM chosen for type-safe database operations
- **Migrations**: Automated migrations using drizzle-kit
- **Schema**: Centralized schema definition in `shared/schema.ts`
- **Development**: Currently uses in-memory storage with plans for PostgreSQL integration

## Key Components

### Data Models
1. **Benefits**: Individual sponsorship benefits with pricing and quantity limits
2. **Packages**: Pre-configured bundles of benefits with special pricing
3. **Sponsorship Quotes**: Generated quotes containing selected benefits and total pricing

### Frontend Components
- **BenefitSelector**: Interactive component for selecting individual benefits
- **PackageCard**: Visual cards for predefined sponsorship packages
- **TotalCalculator**: Real-time calculation and quote submission interface

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Route Handlers**: RESTful API endpoints for benefits, packages, and quotes
- **Validation**: Zod schemas for runtime type checking and validation

## Data Flow

1. **Initial Load**: Frontend fetches available benefits and packages from API
2. **Selection Process**: Users can either select individual benefits or choose pre-configured packages
3. **Real-time Calculation**: Total pricing updates dynamically as selections change
4. **Quote Generation**: Validated quotes are submitted and stored via API
5. **Feedback**: Users receive confirmation through toast notifications

## External Dependencies

### Frontend Dependencies
- **UI Components**: Extensive Radix UI component library for accessibility
- **Styling**: Tailwind CSS with class-variance-authority for component variants
- **Data Fetching**: TanStack React Query for caching and synchronization
- **Date Handling**: date-fns for date manipulation
- **Icons**: Lucide React for consistent iconography

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connectivity
- **Validation**: Zod for schema validation and type inference
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution in development

### Development Tools
- **Build**: esbuild for production server bundling
- **Type Checking**: Comprehensive TypeScript configuration
- **CSS Processing**: PostCSS with Tailwind and Autoprefixer

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Development**: Hot reloading with Vite middleware integration

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Development**: Special Replit integration for development environment
- **Production**: Node.js runtime with compiled JavaScript

### Database Setup
- **Current**: In-memory storage for development/testing
- **Production**: PostgreSQL database with Drizzle migrations
- **Migration**: `db:push` command for schema synchronization

The application is structured as a monorepo with clear separation between client, server, and shared code, making it maintainable and scalable for sponsorship management needs.