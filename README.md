# Billboard HQ

A modern, full-featured billboard advertising management platform with an integrated admin dashboard and marketplace. Built with React 19, TypeScript, Vite, and Tailwind CSS.

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Features

### Main Website
- **Responsive Landing Page** - Modern design with smooth scrolling and elegant animations
- **Hero Section** - Eye-catching introduction with call-to-action using React Typed
- **Services Showcase** - Comprehensive display of billboard advertising services
- **Billboard Gallery** - Interactive showcase of available billboard locations
- **Contact Form** - Streamlined client communication system
- **Footer** - Professional footer with company information

### Admin Dashboard
- **Authentication System** - Secure login with protected routes and role management
- **Dashboard Overview** - Real-time statistics and interactive analytics
  - Total billboards count with status breakdown
  - Active campaigns tracking and monitoring
  - Revenue monitoring with monthly trends
  - Pending requests and bid management
- **Advanced Analytics** - Powered by amCharts 5 and Recharts
  - Revenue trend charts (30-day view)
  - Occupancy rate visualization
  - Status distribution pie charts
  - Contract lifecycle tracking
- **Billboard Management** - Complete CRUD operations
  - Add, edit, and delete billboards
  - Status tracking (Available, Occupied, Pending)
  - Location and pricing management
  - Bulk edit functionality
- **Bids & Contracts Management**
  - Review and manage incoming bids
  - Accept/reject bids with automatic contract creation
  - Contact inquiries management
  - Contract status tracking
- **Modern UI/UX** - Purple gradient theme with smooth animations and transitions

### Marketplace
- **Public Billboard Browser** - Browse available billboards without authentication
- **Advanced Filtering** - Filter by city, type (static/digital), and search by location
- **Bidding System** - Submit bids for available billboards
- **Contact Owners** - Send inquiries directly to billboard owners
- **Real-time Availability** - Live status updates for billboard inventory

---

## Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/owen-stud123/Billboard-HQ.git
   cd "Billboard HQ"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - **Main Site**: `http://localhost:5173/`
   - **Marketplace**: `http://localhost:5173/marketplace`
   - **Dashboard**: `http://localhost:5173/dashboard/login`

---

## Dashboard Access

**Demo Credentials:**
```
Email: owner@example.com 
Password: password
```

> **Note:** This is a demo authentication system using localStorage for development purposes.

---

## Tech Stack

### Core Technologies
- **Frontend Framework:** React 19.1.1
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite 7.1.7
- **Routing:** React Router DOM 7.9.4
- **Styling:** Tailwind CSS 3.4.18 + PostCSS + Autoprefixer

### UI & Visualization
- **Charts & Analytics:** amCharts 5.14.3, Recharts 3.3.0
- **Icons:** React Icons 5.5.0
- **Animations:** React Typed 2.0.12

### Development Tools
- **Linting:** ESLint 9.36.0
- **React Plugins:** 
  - @vitejs/plugin-react 5.0.4
  - eslint-plugin-react-hooks
  - eslint-plugin-react-refresh

---

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## Roadmap

### Current Features 
- Responsive landing page with modern design
- Public marketplace with filtering and search
- Admin dashboard with authentication
- Protected routes and role-based access
- Billboard CRUD operations with modals
- Advanced analytics dashboard with interactive charts
- Bids and contracts management system
- Real-time statistics and metrics
- Status tracking (Available, Occupied, Pending)
- 30-day trend analysis

### Planned Features
- Backend API integration (Express.js/Node.js)
- Real authentication (JWT/OAuth)
- Database integration (MongoDB/PostgreSQL)
- Image upload for billboards (Cloudinary/AWS S3)
- Payment integration (Stripe/PayPal)
- Email notifications system
- Advanced user management
- Reporting and export functionality (PDF/Excel)
- Dark/Light theme toggle
- Multi-language support
- Mobile app (React Native)

---

## Authors

**Owen**
- GitHub: [@owen-stud123](https://github.com/owen-stud123)

**Gadiella**
- GitHub: [@Gisabo-Gadiella](https://github.com/Gisabo-Gadiella)

---

<div align="center">
  <p>Made by Owen & Gadiella</p>
  <p>Star this repo if you find it helpful!</p>
</div>

