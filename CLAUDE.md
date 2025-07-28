# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DragFormMaster is a modern, wizard-style form builder application built with React, TypeScript, and Vite. It allows users to create forms through a drag-and-drop interface, customize them with 14 different themes, and export them for use in other applications.

## Key Commands

```bash
# Development
npm run dev                    # Start development server (runs tsx server/index.ts with NODE_ENV=development)

# Build & Production
npm run build                  # Build client with Vite and bundle server with esbuild
npm start                      # Run production server (requires build first)

# Type Checking
npm run check                  # Run TypeScript type checking (tsc)

# Database
npm run db:push               # Push database schema changes using Drizzle Kit
```

## Architecture Overview

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui components
- **Backend**: Node.js, Express, TypeScript (ES modules)
- **Database**: PostgreSQL with Drizzle ORM (Neon serverless)
- **State Management**: TanStack Query, React Hook Form + Zod
- **Drag & Drop**: @dnd-kit/core and @dnd-kit/sortable

### Project Structure

```
/client                         # Frontend React application
  /src
    /components
      /form-builder            # Core form builder components
        form-wizard.tsx        # Main wizard component (3-step process)
        /wizard-steps          # Individual wizard steps
          build-step.tsx       # Drag-and-drop form creation
          style-step.tsx       # Theme selection and customization
          preview-step.tsx     # Final preview and save
      /ui                      # Reusable UI components (shadcn/ui)
    /hooks
      use-form-wizard.ts       # Wizard state management
      use-form-builder.ts      # Form building logic
    /pages
      form-builder.tsx         # Main form builder page
    /types
      form-builder.ts          # TypeScript types for form elements

/server                        # Backend Express server
  index.ts                     # Server entry point with Vite integration
  routes.ts                    # API routes for forms CRUD
  storage.ts                   # Database interface using Drizzle

/shared
  schema.ts                    # Shared Zod schemas and database models

/lib                          # Exportable component library
  /components                  # Form builder as a standalone package
  INTEGRATION.md              # Guide for integrating into other projects
```

### Key Concepts

1. **Three-Step Wizard Flow**:
   - Build: Drag-and-drop form elements from palette to canvas
   - Style: Select from 14 themes and customize colors/gradients
   - Preview: Final form preview with theme applied and save functionality

2. **Form Elements**: 
   - Basic inputs (text, email, number variants)
   - Selection controls (select, checkbox groups, radio groups)
   - Special components (rate scale, boolean switch, full name)

3. **Theme System**:
   - 14 pre-built themes (Minimal, Modern, Professional, Neon, etc.)
   - Dynamic theme customization with color pickers and gradient presets
   - Theme-aware component rendering

4. **Drag & Drop Architecture**:
   - Uses @dnd-kit for accessible drag-and-drop
   - Component palette with draggable items
   - Sortable form canvas with visual drop indicators
   - Properties panel for element configuration

5. **Database Schema**:
   - Forms table with JSONB columns for elements and settings
   - Theme configuration stored as part of form data
   - Uses Drizzle ORM for type-safe database operations

### API Endpoints

- `GET /api/forms` - List all forms
- `GET /api/forms/:id` - Get specific form
- `POST /api/forms` - Create new form
- `PUT /api/forms/:id` - Update existing form
- `DELETE /api/forms/:id` - Delete form

### Development Notes

- The project uses Vite in development mode with hot module replacement
- Express server serves the Vite dev server in development
- Production build creates optimized client bundle and ESM server bundle
- All form state is managed through the `useFormWizard` hook
- Form validation uses Zod schemas defined in `shared/schema.ts`