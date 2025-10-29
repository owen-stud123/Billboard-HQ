import React, { useMemo, useState } from 'react';
import { billboardsRepo } from '../data/billboardsRepo';
import { bidsRepo } from '../data/bidsRepo';
import type { Billboard } from '../data/types';
import bill1 from '../../assets/images/bill1.jpeg';
import bill2 from '../../assets/images/bill2.jpeg';
import bill3 from '../../assets/images/bill3.jpeg';
import bill4 from '../../assets/images/bill4.jpeg';
import bill5 from '../../assets/images/bill5.jpeg';

const CityFilter: React.FC<{ city: string; setCity: (v: string)=>void; cities: string[] }> = ({ city, setCity, cities }) => (
  <select className="border rounded px-3 py-2" value={city} onChange={(e)=>setCity(e.target.value)}>
    <option value="">All cities</option>
    {cities.map(c => <option key={c} value={c}>{c}</option>)}
  </select>
);

const TypeFilter: React.FC<{ type: string; setType: (v: string)=>void }> = ({ type, setType }) => (
  <select className="border rounded px-3 py-2" value={type} onChange={(e)=>setType(e.target.value)}>
    <option value="">All types</option>
    <option value="static">Static</option>
    <option value="digital">Digital</option>
  </select>
);

const Marketplace: React.FC = () => {
  const all = billboardsRepo.all();
  const [q, setQ] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [bidAmount, setBidAmount] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<Record<string, string>>({});
  const [showBid, setShowBid] = useState<Record<string, boolean>>({});
  const [showContact, setShowContact] = useState<Record<string, boolean>>({});
  const rwf = new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF' });

  const cities = useMemo(()=>Array.from(new Set(all.map(b=>b.location.city))), [all]);

  const available = useMemo(()=>
    billboardsRepo.findAvailable()
      .filter(b => !q || b.location.address.toLowerCase().includes(q.toLowerCase()) || b.code.toLowerCase().includes(q.toLowerCase()))
      .filter(b => !city || b.location.city === city)
      .filter(b => !type || b.type === type as Billboard['type'])
  , [q, city, type]);

  const submitBid = (b: Billboard) => {
    const v = Number(bidAmount[b.id]);
    if (!Number.isFinite(v) || v <= 0) { alert('Please enter a valid amount'); return; }
    bidsRepo.create({
      id: `bid-${Date.now()}`,
      billboardId: b.id,
      companyId: 'guest-company',
      amount: v,
      createdAt: new Date().toISOString(),
      status: 'open',
    });
    setShowBid(s => ({ ...s, [b.id]: false }));
    setBidAmount(s => ({ ...s, [b.id]: '' }));
    alert('Bid submitted! The owner will review it.');
  };

  const submitContact = (b: Billboard) => {
    const text = (message[b.id] ?? '').trim();
    if (text.length < 3) { alert('Please enter a message'); return; }
    // In a real app this would POST to an API. We avoid console logs as requested.
    setShowContact(s => ({ ...s, [b.id]: false }));
    setMessage(s => ({ ...s, [b.id]: '' }));
    alert('Message sent. We will get back to you soon.');
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 flex flex-wrap gap-3 items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Available Billboards</h1>
          <div className="flex gap-3 items-center">
            <input className="border rounded px-3 py-2" placeholder="Search code or address" value={q} onChange={(e)=>setQ(e.target.value)} />
            <CityFilter city={city} setCity={setCity} cities={cities} />
            <TypeFilter type={type} setType={setType} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {available.map((b, idx) => (
            <div key={b.id} className="bg-white rounded-xl shadow hover:shadow-lg transition border overflow-hidden">
              <div className="h-40 w-full overflow-hidden">
                <img src={[bill1, bill2, bill3, bill4, bill5][idx % 5]} alt={b.code} className="w-full h-40 object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{b.code}</h3>
                    <p className="text-sm text-gray-500">{b.location.city} • {b.location.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-indigo-600 font-semibold">{rwf.format(b.pricePerMonth)}/mo</div>
                    <div className={
                      'text-xs inline-block mt-1 px-2 py-0.5 rounded ' +
                      (b.status === 'available' ? 'bg-green-50 text-green-700' : b.status === 'occupied' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700')
                    }>
                      {b.status}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>Size: {b.size}</p>
                  <p>Type: {b.type}</p>
                  <div className="flex gap-2 flex-wrap">
                    {b.tags?.map(t => <span key={t} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{t}</span>)}
                  </div>
                </div>

                <div className="flex gap-3 mb-3">
                  <button onClick={()=>setShowContact(s=>({...s, [b.id]: !s[b.id]}))} className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm">Contact</button>
                  {b.biddingEnabled && (
                    <button onClick={()=>setShowBid(s=>({...s, [b.id]: !s[b.id]}))} className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm">Place bid</button>
                  )}
                </div>

                {showContact[b.id] && (
                  <div className="mb-3 border rounded p-3">
                    <textarea
                      value={message[b.id] ?? ''}
                      onChange={(e)=>setMessage(s=>({...s, [b.id]: e.target.value}))}
                      className="w-full border rounded px-3 py-2 text-sm mb-2"
                      placeholder="Your message"
                    />
                    <div className="flex gap-2">
                      <button onClick={()=>submitContact(b)} className="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-700 text-white text-sm">Send</button>
                      <button onClick={()=>setShowContact(s=>({...s, [b.id]: false}))} className="px-3 py-1.5 rounded border text-sm">Cancel</button>
                    </div>
                  </div>
                )}

                {showBid[b.id] && (
                  <div className="border rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-sm text-gray-600" htmlFor={`bid-${b.id}`}>Bid (RWF/mo):</label>
                      <input
                        id={`bid-${b.id}`}
                        type="number"
                        min="1"
                        value={bidAmount[b.id] ?? ''}
                        onChange={(e)=>setBidAmount(s=>({...s, [b.id]: e.target.value}))}
                        className="border rounded px-2 py-1 text-sm w-40"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=>submitBid(b)} className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm">Submit bid</button>
                      <button onClick={()=>setShowBid(s=>({...s, [b.id]: false}))} className="px-3 py-1.5 rounded border text-sm">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {available.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No billboards match your filters.</div>
        )}
      </div>
    </section>
  );
};

export default Marketplace;
