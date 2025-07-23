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
- **Step 2 - Style**: Selection from 10 robust and modern form themes with enhanced styling
- **Step 3 - Preview**: Final form preview with accurate theme rendering and save functionality

### Form Builder Core
- **Component Palette**: Draggable form elements (text, email, textarea, select, image, etc.)
- **Form Canvas**: Drop zone with sortable elements and live preview
- **Properties Panel**: Element configuration and styling options
- **Theme Selector**: 10 robust visual themes including Minimal, Modern, Professional, Playful, Elegant, Neon, Nature, Luxury, Retro, and Glassmorphism
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
2. **Step 2 - Theme Selection**: Users choose from 10 comprehensive visual themes with modern styling
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

## Recent Changes (July 2025)

### Enhanced Themes System
- **Enhanced 5 Existing Themes**: Updated Minimal, Modern, Professional, Playful, and Elegant themes with more robust styling, better typography, improved color schemes, and modern design patterns
- **Added 5 New Themes**: 
  - **Neon**: Cyberpunk-inspired with glowing effects and dark backgrounds
  - **Nature**: Earth tones with organic shapes and natural textures
  - **Luxury**: Premium design with rich colors and serif typography
  - **Retro**: Vintage 80s style with bold colors and geometric patterns
  - **Glassmorphism**: Frosted glass effect with transparent backgrounds
- **Improved Theme Previews**: Enhanced preview cards with theme-specific styling demonstrations and better visual representation
- **Fixed Form Preview**: Created dedicated ThemedFormRenderer for accurate preview rendering with proper theme application

### Drag and Drop System Improvements
- **Fixed Desktop Drag and Drop**: Resolved drag and drop functionality issues with proper event handling and component structure
- **Enhanced Component Palette**: Improved sidebar positioning with proper z-index hierarchy and responsive layout
- **Optimized Drag Sensors**: Configured mouse and touch sensors with appropriate activation constraints for better user experience
- **Added Drag Compatibility Diagnostic**: Comprehensive diagnostic tool to test browser and device compatibility for drag operations

### Technical Improvements
- **Fixed Infinite Loop Issues**: Resolved useEffect dependency problems that caused maximum update depth exceeded errors
- **Enhanced ThemedFormRenderer**: Specialized component for proper theme application in preview mode using native HTML elements
- **Improved Type Safety**: Better TypeScript integration throughout the theme system
- **Drag Diagnostic System**: Real-time compatibility testing for touch support, mouse support, browser compatibility, performance, and event system functionality
- **Fixed Rate Scale Display Style Persistence**: Updated data comparison logic in BuildStep to use deep comparison (JSON.stringify) instead of shallow ID comparison, ensuring that property changes like `rateVariant` are properly detected and saved when navigating between wizard steps
- **Streamlined Form Builder Components**: Removed Submit and Reset buttons from the component palette and form builder tools, making them exclusively auto-generated in Step 3 Preview for a cleaner building experience
- **Enhanced Boolean Switch Component**: Completed implementation of Boolean Switch component with three display variants (Yes/No, True/False, On/Off), full integration with component palette, properties panel, and form renderers
- **Automatic Form Completion**: All forms now automatically include Submit and Reset buttons in the preview step, eliminating the need for manual button placement and ensuring consistent form completion
- **JSON Form Data Preview**: Added functionality to preview form submission data in JSON format when clicking Submit button in Step 3, showing users exactly how their form data will be structured for backend processing with copy-to-clipboard feature
- **Enhanced Rate Scale Data Handling**: Rate scales now show "NA" instead of null or 0 when no value is selected, providing clearer indication of unselected rating fields in form submissions
- **Email Client Preview**: Replaced raw JSON output with professional email client-style preview showing form submissions as they would appear in notification emails, with option to view technical JSON data separately
- **Improved Button Spacing**: Added dedicated spacer element (35px height) between form fields and submit/reset buttons in Step 3 preview for clean visual separation and improved user experience
- **Fixed Textarea Data Processing**: Resolved issue where textarea values were incorrectly processed as boolean false instead of text strings in form submissions, ensuring proper data type handling for all text-based inputs

The application now provides 10 comprehensive themes, fully functional drag and drop with compatibility testing, ranging from minimal to luxury designs, offering users extensive customization options while maintaining modern full-stack development practices with type safety throughout, efficient development workflows, and scalable deployment architecture. The form builder provides an intuitive interface for creating complex forms without requiring technical knowledge from end users.