import React from 'react';
import upscaleLogo from '../assets/images/UPSCALE-logo.png';
import allianceLogo from '../assets/images/aliancemedia logo.png';
import limelightLogo from '../assets/images/limelightmedialogo.png';

const companies = [
  {
    name: "Upscale Media Africa",
    website: "https://upscalemedia.africa/",
    logo: upscaleLogo,
    description: "Innovative outdoor advertising across Africa.",
  },
  {
    name: "Alliance Media",
    website: "https://www.alliancemedia.com/",
    logo: allianceLogo,
    description: "Africa's largest outdoor advertising company.",
  },
  {
    name: "Limelight Media",
    website: "https://limelightmedia.co.ke/hoardings-services",
    logo: limelightLogo,
    description: "Leading billboard and digital display specialists.",
  },
];

const Billboards = () => {
  return (
    <section id="billboards" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Billboard Advertising Companies
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with leading outdoor advertising partners across Africa
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <div
              key={company.name}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Logo Container - Fixed height with proper image handling */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 flex items-center justify-center h-48 border-b border-gray-100">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="max-w-full max-h-full object-contain w-auto h-auto"
                  style={{ maxHeight: '120px' }}
                />
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors duration-300">
                  {company.name}
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-6">
                  {company.description}
                </p>

                {/* Learn More Button */}
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Learn More
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Billboards;
