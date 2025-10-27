# 🏢 Billboard HQ

A modern, full-featured billboard advertising management platform with an integrated admin dashboard. Built with React, Vite, and Tailwind CSS.

## ✨ Features

### 🌐 Main Website
- **Responsive Landing Page** - Modern design with smooth scrolling
- **Hero Section** - Eye-catching introduction with call-to-action
- **Services Showcase** - Display billboard advertising services
- **Billboard Gallery** - Showcase available billboard locations
- **Contact Form** - Easy client communication

### 📊 Admin Dashboard
- **Authentication System** - Secure login with protected routes
- **Dashboard Overview** - Real-time statistics and metrics
  - Total billboards count
  - Active campaigns tracking
  - Revenue monitoring
  - Pending requests management
- **Profile Management** - User profile and settings
- **Billboard Tables** - Inventory management with status tracking
- **Recent Activity Feed** - Monitor latest actions
- **Modern UI/UX** - Purple gradient theme with smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/owen-stud123/Productivity_webApp.git
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
   - Main Site: `http://localhost:5173/`
   - Dashboard: `http://localhost:5173/dashboard/login`

## 🔐 Dashboard Access

**Demo Credentials:**
```
Username: admin
Password: admin123
```

> ⚠️ **Note:** This is a demo authentication system using localStorage. For production, implement proper backend authentication with JWT or OAuth.

## 📁 Project Structure

```
Billboard HQ/
├── src/
│   ├── Components/          # Main website components
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Services.jsx
│   │   ├── Billboards.jsx
│   │   └── Contact.jsx
│   ├── dashboard/           # Dashboard feature
│   │   ├── dashboardcomponents/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DashboardHeader.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── dashboardlayout.jsx
│   │   │   └── dashboardStyles.css
│   │   ├── dashboardpages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Tables.jsx
│   │   └── DashboardApp.jsx
│   ├── App.jsx              # Main app router
│   ├── main.jsx
│   └── index.css
├── public/
└── package.json
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS + Custom CSS
- **Icons:** React Icons
- **Animations:** React Typed

## 📄 Available Scripts

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

## 🗺️ Roadmap

### Current Features ✅
- [x] Responsive landing page
- [x] Admin dashboard with authentication
- [x] Protected routes
- [x] Billboard inventory table
- [x] Statistics dashboard

### Planned Features 🚧
- [ ] Backend API integration
- [ ] Real authentication (JWT/OAuth)
- [ ] Billboard CRUD operations
- [ ] Advanced analytics with charts (Chart.js/Recharts)
- [ ] Client management system
- [ ] Campaign scheduling
- [ ] Image upload for billboards
- [ ] Payment integration
- [ ] Notifications system
- [ ] Dark/Light theme toggle

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Owen**
- GitHub: [@owen-stud123](https://github.com/owen-stud123)

## 📚 Documentation

For detailed dashboard documentation, see [DASHBOARD_README.md](./DASHBOARD_README.md)

---

Built with ❤️ using React + Vite
