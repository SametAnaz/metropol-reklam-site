# Metropol Reklam Website

A modern and dynamic advertising agency website for Metropol Reklam, showcasing their professional advertising solutions, portfolio, and services. Built with Next.js, TailwindCSS, and modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Website Structure](#website-structure)
- [Installation and Setup](#installation-and-setup)
- [Deployment](#deployment)
- [Contact](#contact)

## 📌 Overview

The Metropol Reklam website is designed to showcase the company's advertising and signage services in Kuşadası, Turkey. The site features a modern, responsive design with interactive elements that highlight the company's portfolio, services, and expertise in the advertising industry.

The website serves as both an informational platform for potential clients and a management system for administrators to update content and maintain communication with customers.

## ✨ Features

### 🌐 Public-Facing Features

- **Responsive Design**: Fully optimized for all devices from mobile to desktop
- **Interactive UI Components**: Animated sections, interactive portfolio displays, and dynamic page elements
- **Modern Design Language**: Clean aesthetics with branded color scheme and typography
- **Service Showcases**: Detailed presentation of all advertising services offered
- **Portfolio Gallery**: Visual gallery of completed projects categorized by service type
- **Customer Testimonials**: Integration with Google Reviews via Elfsight widget
- **Contact System**: Easy-to-use contact form with location map and contact details
- **Multi-language Support**: Content available in both Turkish and English
- **WhatsApp Integration**: Quick contact button for direct WhatsApp communication
- **Legal Documentation**: Privacy Policy and Terms of Use in both Turkish and English

### �️ Technical Features

- **SEO Optimization**: Structured metadata, semantic HTML, and performance optimization
- **Fast Page Loading**: Optimized assets and efficient loading strategies
- **Accessibility Compliance**: WCAG compliant design elements and navigation
- **Custom 404 Page**: User-friendly error page with navigation options
- **Animation System**: Smooth scroll animations and interactive elements using Framer Motion
- **Responsive Images**: Optimized image delivery based on device and viewport size
- **Cookie Consent**: GDPR-compliant cookie consent management
- **Analytics Integration**: User behavior tracking with privacy-focused Umami Analytics

### �‍💼 Admin Features

- **Secure Admin Panel**: Protected management interface for website administrators
- **Content Management**: Tools to update portfolio items, gallery entries, and service information
- **User Management**: Administration of system users and access control
- **Activity Logging**: Tracking of administrative actions for security and accountability
- **Gallery Management**: Upload and organization system for project images

## � Technology Stack

### Frontend
- **Next.js**: React framework for server-side rendering and static generation
- **TailwindCSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for React
- **React Hooks**: Custom hooks for intersection observer, active section tracking, etc.
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Backend
- **Next.js API Routes**: Serverless functions for backend logic
- **Prisma ORM**: Database toolkit for type-safe database access
- **NextAuth.js**: Authentication solution for Next.js
- **Resend Email API**: Email service for contact form submissions

### Integrations
- **Elfsight Widget**: For displaying Google Reviews
- **Google Maps**: Location display on contact page
- **Umami Analytics**: Privacy-focused analytics platform
- **reCAPTCHA**: Form protection against spam

### Design Elements
- **Custom Animations**: Scroll-triggered animations and interactive elements
- **Particle Backgrounds**: Dynamic background effects
- **SVG Graphics**: Scalable vector graphics for icons and decorative elements

## 🏢 Website Structure

The website consists of the following main sections:

### 📱 Public Pages

1. **Home Page**
   - Hero section with company introduction
   - Services overview with visual cards
   - Featured portfolio projects
   - Customer testimonials via Google Reviews
   - Quick contact information

2. **About Page**
   - Company history and mission
   - Team information with photos
   - Company values and approach
   - Workspace gallery

3. **Portfolio Page**
   - Interactive showcase of selected projects
   - Filterable by service category
   - Detailed project information with visuals

4. **Gallery Page**
   - Comprehensive image gallery of completed projects
   - Categorized by service type
   - Lightbox viewing for detailed inspection

5. **Products Page**
   - Information about available product lines
   - Product categories and descriptions
   - Visual representations of products

6. **Contact Page**
   - Contact form with reCAPTCHA protection
   - Company location with map integration
   - Direct contact details (phone, email, address)
   - Business hours information

7. **Legal Pages**
   - Privacy Policy (Turkish and English versions)
   - Terms of Use (Turkish and English versions)

### 🔐 Administrative Section

1. **Admin Dashboard**
   - Overview of website statistics and recent activity
   - Quick access to management tools

2. **Gallery Management**
   - Upload and organization of project images
   - Category assignment and metadata editing

3. **User Management**
   - Account creation and permission settings
   - Password management and access control

4. **Activity Logs**
   - Audit trail of administrative actions
   - Security monitoring tools

## 🚀 Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/sametanaz/metropol-reklam-site.git
cd metropol-reklam-site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Configure your environment variables in the .env file
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## 🔒 Security Features

- CSRF protection for all forms
- Rate limiting on API endpoints
- Input validation and sanitization
- XSS protection measures
- SQL injection prevention with Prisma ORM
- Secure authentication with NextAuth.js
- Role-based access control
- Protected API routes
- HTTPS enforcement in production

## 📦 Deployment

The website is configured for deployment on Vercel's platform with:

- Continuous deployment from GitHub
- Environment variable management
- Preview deployments for pull requests
- Automatic HTTPS and CDN optimization

## 📧 Contact

For questions about this project, please contact:

Samet Anaz - [sametanaz.tr@gmail.com](mailto:sametanaz.tr@gmail.com)

Project Link: [https://github.com/sametanaz/metropol-reklam-site](https://github.com/sametanaz/metropol-reklam-site)
- Prisma ORM
- Cloudinary (Media Storage)

### DevOps & Tools
- ESLint & Prettier
- Git Version Control
- GitHub Actions (CI/CD)
- Vercel (Hosting)

## 📁 Project Structure

```
├── components/            # React Components
│   ├── admin/            # Admin panel components
│   ├── auth/             # Authentication components
│   ├── layouts/          # Page layouts
│   └── ui/               # General UI components
│
├── lib/                  # Helper functions
│   ├── db.js            # Database connection
│   ├── email.js         # Email service
│   └── auth/            # Authentication operations
│
├── pages/               # Next.js pages
│   ├── api/            # API Routes
│   ├── admin/          # Admin pages
│   └── customer/       # Customer pages
│
├── prisma/             # Database schemas
│   └── migrations/     # DB migrations
│
├── public/             # Static files
│
├── styles/            # CSS modules
│
└── utils/             # Helper functions
```

## ⚙️ Installation

1. Clone the project:
```bash
git clone https://github.com/username/metropol-reklam-site.git
cd metropol-reklam-site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environmental variables:
```bash
cp .env.example .env
```

4. Prepare the database:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```



## ⚡ Performance Optimizations

- Image optimization and WebP format usage
- Code splitting and lazy loading
- Server-side rendering for SEO-critical pages
- Static generation for unchanging content
- CDN delivery for static assets
- Minified CSS and JavaScript
- Optimized font loading
- Responsive image delivery
- Input validation
- XSS protection
- SQL injection protection
- Secure password hashing
- JWT token security

## 🚀 Deployment

The website is deployed on Vercel with continuous integration from the GitHub repository. For production deployment:

```bash
# Build the production version
npm run build

# Start the production server
npm start
```

## 📱 Responsive Design

The website is fully responsive across all device sizes:
- Mobile-first approach
- Adaptive layouts for tablets and desktop
- Touch-friendly navigation
- Optimized media for different screen sizes
- Responsive typography system

## 🌐 SEO Considerations

- Semantic HTML structure
- Proper heading hierarchy
- Meta descriptions and titles
- Open Graph and Twitter card metadata
- Structured data (JSON-LD)
- XML sitemap generation
- Optimized image alt texts
- Performance optimization for Core Web Vitals

## 📧 Contact

For questions about this project, please contact:

Samet Anaz - [sametanaz.tr@gmail.com](mailto:sametanaz.tr@gmail.com)

Project Link: [https://github.com/sametanaz/metropol-reklam-site](https://github.com/sametanaz/metropol-reklam-site)
