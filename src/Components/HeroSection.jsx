import React from 'react'


const HeroSection = () => {
  return (
    <section id="home" className="flex items-center justify-center min-h-screen pt-24">
      <div className="bg-black/50 p-8 rounded-2xl text-white max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              Connect. Advertise. Grow.
            </h1>
       <p className="text-lg mb-6">
        Discover available billboards across Rwanda and connect directly with billboard owners.
       </p>
       <div className="flex gap-4 justify-center">
        <a 
          href="#billboards" 
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('billboards')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-sky-600 hover:bg-sky-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300"
        >
          Explore Billboards
        </a>
        <a 
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-white text-sky-600 border border-sky-600 px-6 py-3 rounded-xl font-semibold hover:bg-sky-100 transition-all duration-300"
        >
          Get in Touch
        </a>
       </div>
        </div>
    </section>
  )
}

export default HeroSection
