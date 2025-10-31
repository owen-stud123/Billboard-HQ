import React, { type JSX } from 'react';
import { FaMapMarkedAlt, FaHandshake, FaChartLine, FaBullhorn } from 'react-icons/fa';

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <FaMapMarkedAlt />,
    title: "Billboard Discovery",
    description: "Browse and discover available billboards across Rwanda with detailed location information and photos.",
  },
  {
    icon: <FaHandshake />,
    title: "Direct Connection",
    description: "Connect directly with billboard owners without intermediaries for transparent negotiations.",
  },
  {
    icon: <FaChartLine />,
    title: "Analytics Dashboard",
    description: "Track your advertising campaigns in real-time and track their performance.",
  },
  {
    icon: <FaBullhorn />,
    title: "Easy Management",
    description: "Manage multiple billboard campaigns from a single, user-friendly dashboard.",
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-[#000300] to-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to launch successful billboard advertising campaigns
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 hover:from-sky-900 hover:to-sky-800 transition-all duration-300 transform hover:-translate-y-2 shadow-xl hover:shadow-2xl border border-gray-700 hover:border-sky-500"
            >
              {/* Icon */}
              <div className="text-5xl text-[#25fcb8] mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <a
            href="#billboards"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('billboards')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block bg-[#25fcb8] hover:bg-[#1fdb9f] text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;

