#  Metropol Reklam Website

A modern and dynamic advertising agency website. Built with Next.js, Prisma ORM, and TailwindCSS.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Security](#security)
- [Deployment](#deployment)

## ✨ Features

### 🌐 General Features
- Responsive design
- Modern and interactive user interface
- SEO optimization
- Fast page loading times
- Custom 404 page
- Animated transitions and interactive elements

### 👥 User Management
- Secure authentication with NextAuth.js
- Multiple user roles (Admin/Customer)
- Secure password reset
- Session management
- User profile management

### 🔐 Admin Panel
- User statistics and management
- Content management system
- Performance metrics
- User activity logs
- Authorization system

### 🛠 Customer Portal
- Personalized dashboard
- Project tracking
- File management
- Communication system

### 📧 Communication System
- Automatic email notifications
- Contact form
- Real-time notifications

## 🏗 Architecture

### General Architecture
The website follows a component-based architecture using Next.js and React. Here's a high-level overview of how different parts of the application interact:

![General Architecture](/Assets/Diagrams/general-architecture.png)

### Detailed Component Architecture
This diagram shows the detailed relationships between components, including page sections, shared components, and how they interact with the backend services:

![Detailed Component Architecture](/Assets/Diagrams/general-diagram.png)

The architecture is designed to be:
- Modular and maintainable
- Easy to scale
- Performance optimized
- SEO friendly

Key architectural features:
- Component-based structure
- Centralized state management
- API-first approach
- Static and dynamic rendering optimization
- Efficient data fetching strategies

## 🔧 Technology Stack

### Frontend
- Next.js (React Framework)
- TailwindCSS (Styling)
- Framer Motion (Animations)
- React Icons
- SWR (Data Fetching)

### Backend
- Next.js API Routes
- Prisma ORM
- NextAuth.js (Authentication)
- Nodemailer (Email Service)

### Database & Storage
- PostgreSQL
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



### Authentication
- POST /api/auth/register
- POST /api/auth/signin
- POST /api/auth/change-password

### User Management
- GET /api/admin/users
- POST /api/admin/users
- PUT /api/admin/users/:id
- DELETE /api/admin/users/:id

### Contact
- POST /api/contact

## 🔒 Security

- CSRF protection
- Rate limiting
- Input validation
- XSS protection
- SQL injection protection
- Secure password hashing
- JWT token security

## 🚀 Deployment

1. Deploy via Vercel:
```bash
vercel
```

2. Production build:
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push your branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📝 License

MIT License. See the `LICENSE` file for more information.

## 📧 Contact
### Developer:
Samet Anaz - sametanaz.tr@gmail.com

Project Link: [https://github.com/sametanaz/metropol-reklam-site](https://github.com/username/metropol-reklam-site)
