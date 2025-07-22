# Form Builder Application

## Overview

This is a modern form builder application built with React and Express, featuring a drag-and-drop interface for creating custom forms. The application provides a visual form designer with real-time preview capabilities and a comprehensive component library.

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

### Form Builder Core
- **Component Palette**: Draggable form elements (text, email, textarea, select, etc.)
- **Form Canvas**: Drop zone with sortable elements and live preview
- **Properties Panel**: Element configuration and styling options
- **Preview Mode**: Real-time form preview functionality

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

1. **Form Creation**: Users drag components from palette to canvas
2. **Element Configuration**: Properties panel updates element settings in real-time
3. **State Management**: Custom hooks manage form builder state and synchronization
4. **Persistence**: Forms saved to PostgreSQL via REST API endpoints
5. **Preview**: Toggle between edit and preview modes for user testing

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