import React from 'react'
import { Link } from 'react-router-dom'
import { billboardsRepo } from '../modules/data/billboardsRepo'
import bill1 from '../assets/images/bill1.jpeg'
import bill2 from '../assets/images/bill2.jpeg'
import bill3 from '../assets/images/bill3.jpeg'
import bill4 from '../assets/images/bill4.jpeg'
import bill5 from '../assets/images/bill5.jpeg'

const Billboards: React.FC = () => {
  const available = billboardsRepo.findAvailable();
  const rwf = new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF' });

  return (
    <section id="billboards" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Available Billboards
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Browse a selection of live listings. Explore the marketplace for more.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {available.map((b, idx) => (
            <div
              key={b.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden border-b border-gray-100">
                <img src={[bill1, bill2, bill3, bill4, bill5][idx % 5]} alt={b.code} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-sky-600 transition-colors">
                      {b.code}
                    </h3>
                    <p className="text-gray-600 text-sm">{b.location.city} • {b.location.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sky-700 font-semibold">{rwf.format(b.pricePerMonth)}/mo</div>
                    <div className={
                      'text-xs inline-block mt-1 px-2 py-0.5 rounded ' +
                      (b.status === 'available' ? 'bg-green-50 text-green-700' : b.status === 'occupied' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700')
                    }>
                      {b.status}
                    </div>
                  </div>
                </div>
                <div className="text-gray-700 text-sm md:text-base mb-4">
                  <p>Size: {b.size}</p>
                  <p>Type: {b.type}</p>
                </div>
                <div className="flex gap-2 flex-wrap mb-6">
                  {b.tags?.map(t => (
                    <span key={t} className="text-xs bg-sky-50 text-sky-700 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to="/marketplace"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white px-6 py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105 shadow-md"
                >
                  Explore More
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Billboards
