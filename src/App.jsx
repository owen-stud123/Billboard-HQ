import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar.jsx'
import HeroSection from './Components/HeroSection.jsx';
import Services from './Components/Services.jsx';
import Billboards from './Components/Billboards.jsx';
import Contact from './Components/Contact.jsx';
import DashboardApp from './dashboard/DashboardApp.jsx';
import Footer from './Components/Footer.jsx';

// Main Site Component
const MainSite = () => {
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
        
        {/* Dashboard Routes */}
        <Route path="/dashboard/*" element={<DashboardApp />} />
      </Routes>
    </Router>
  );
}

export default App
