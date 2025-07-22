# Form Builder Application

## Overview

This is a modern wizard-style form builder application built with React and Express. The application guides users through a three-step process to create, style, and preview custom forms with a comprehensive component library and multiple design themes.

## User Preferences

Preferred communication style: Simple, everyday language.
Mobile-first design: Ensure all interfaces work seamlessly on mobile devices.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Bundler**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: Custom React hooks with local state management
- **Drag & Drop**: @dnd-kit for form builder interactions
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Storage**: PostgreSQL-based sessions (connect-pg-simple)
- **Development**: Hot reload with Vite integration

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and schemas
├── components.json  # shadcn/ui configuration
└── migrations/      # Database migrations
```

## Key Components

### Wizard Flow
- **Step 1 - Build**: Drag-and-drop form creation with component palette and properties panel
- **Step 2 - Style**: Selection from 5 predefined form themes/styles
- **Step 3 - Preview**: Final form preview and save functionality

### Form Builder Core
- **Component Palette**: Draggable form elements (text, email, textarea, select, image, etc.)
- **Form Canvas**: Drop zone with sortable elements and live preview
- **Properties Panel**: Element configuration and styling options
- **Theme Selector**: Multiple visual themes for form styling
- **Final Preview**: Complete form preview with save functionality

### Database Schema
- **Users Table**: Authentication and user management
- **Forms Table**: Form storage with JSON-based element configuration
- **Elements Structure**: Flexible JSON schema for form components with validation rules

### UI Components
- Complete shadcn/ui component library integration
- Consistent design system with CSS variables
- Fully responsive design with mobile-first approach
- Accessibility-focused components with proper touch targets
- Mobile-optimized interactions and animations
- Floating action button for mobile component addition

## Data Flow

1. **Step 1 - Form Creation**: Users drag components from palette to canvas and configure properties
2. **Step 2 - Theme Selection**: Users choose from 5 predefined visual themes
3. **Step 3 - Preview & Save**: Users preview the final styled form and save to database
4. **State Management**: Custom hooks manage wizard state, form data, and theme selection
5. **Persistence**: Complete forms with theme data saved to PostgreSQL via REST API endpoints

## External Dependencies

### Frontend Libraries
- **UI Framework**: Radix UI primitives with shadcn/ui styling
- **Form Handling**: React Hook Form with Zod validation
- **Utilities**: clsx for conditional classes, date-fns for date handling
- **Development**: Replit-specific tooling for cloud development

### Backend Services
- **Database**: Neon PostgreSQL (serverless)
- **ORM**: Drizzle with PostgreSQL dialect
- **Validation**: Zod schemas shared between client and server

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with Express backend
- **Hot Reload**: Full-stack hot reload with Vite middleware
- **Database**: Drizzle migrations with push-based schema updates

### Production
- **Build Process**: Vite builds frontend assets, esbuild bundles server
- **Static Assets**: Served from Express with Vite-built client
- **Database**: Production PostgreSQL connection via DATABASE_URL
- **Session Management**: PostgreSQL-backed sessions for scalability

### Configuration
- **Environment Variables**: DATABASE_URL for database connection
- **Path Aliases**: TypeScript path mapping for clean imports
- **CSS Variables**: Customizable theme system with dark mode support

The application follows modern full-stack development practices with type safety throughout, efficient development workflows, and scalable deployment architecture. The form builder provides an intuitive interface for creating complex forms without requiring technical knowledge from end users.