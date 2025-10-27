import react from 'react'
import Navbar from './Components/Navbar.jsx'
import HeroSection from './Components/HeroSection.jsx';
import Services from './Components/Services.jsx';
import Billboards from './Components/Billboards.jsx';
import Contact from './Components/Contact.jsx';

function App() {

  return (
      <div>
        <Navbar />
        <HeroSection />
        <Services />
        <Billboards />
        <Contact />
      </div>
  );
}

export default App
