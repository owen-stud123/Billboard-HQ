import React from 'react'

const Home = () => {
  return (
    <div className="w-full">
  <h1 className="text-3xl font-bold text-[#23332e]">Admin</h1>
  <p className="mt-2 text-gray-600">Manage your billboards effectively.</p>

  {/* Info Card */}
  <div className="mt-6 bg-white shadow-md rounded-xl p-6">
    <h5 className="text-xl font-semibold mb-6 text-gray-800">Info</h5>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 text-sm">
      <div className="font-medium text-gray-500">Full Name :</div>
      <div className="font-semibold text-gray-800">Admin</div>

      <div className="font-medium text-gray-500">Mobile :</div>
      <div className="font-semibold text-gray-800">+ 250 780 1234</div>

      <div className="font-medium text-gray-500">E-mail :</div>
      <div className="font-semibold text-gray-800">billboard@gmail.com</div>

      <div className="font-medium text-gray-500">Location :</div>
      <div className="font-semibold text-gray-800">
        kigali, Rwanda
      </div>
    </div>
  </div>
  <div className='mt-6 bg-white shadow-md rounded-xl p-6'>
    <h5 className="text-xl font-semibold mb-6 text-gray-800">About</h5>

    <div>
      <p className='font-sans text-gray-800 text-sm'>Our billboard advertising platform bridges the gap between businesses and billboard owners, 
         making outdoor advertising easier, smarter and more accessible. Companies can browse available billboard spaces across different regions, 
         compare pricing and locations and quickly connect with billboard managers to secure advertising placements.
         Billboard owners gain powerful tools to manage and monitor their inventory in real-time. From location tracking and occupancy status to contract duration and client history.
         When an advertising contract ends, the billboard automatically switches back to “Available,” ensuring smooth and efficient turnover.
         To maximize opportunity, billboards in high-demand areas also feature a bidding option, 
         allowing companies to compete for premium advertising spots and owners to earn greater value from strategic locations.
         We are transforming the future of outdoor advertising by promoting transparency, efficiency and growth for both businesses and billboard operators.
      </p>
    </div>
  </div>
</div>

  )
}

export default Home
