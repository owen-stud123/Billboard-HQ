import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './pages/HeroSection'
import Services from './pages/Services'
import Billboards from './pages/Billboards'
import Contact from './pages/Contact'
import DashboardApp from './dashboard/DashboardApp'
import Marketplace from './modules/marketplace/Marketplace'
import Footer from './components/Footer'

// Main Site Component
const MainSite: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Services />
      <Billboards />
      <Contact />
      <Footer />
    </div>
  );
};

function App() {
  console.log('App rendering...');
  
  return (
    <Router>
      <Routes>
        {/* Main Website Routes */}
        <Route path="/" element={<MainSite />} />
        <Route path="/marketplace" element={
          <div>
            <Navbar />
            <Marketplace />
            <Footer />
          </div>
        } />

        {/* Dashboard Routes */}
        <Route path="/dashboard/*" element={<DashboardApp />} />
      </Routes>
    </Router>
  );
}

export default App
