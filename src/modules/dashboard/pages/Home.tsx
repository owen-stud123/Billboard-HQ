import React from 'react';
import { contractsRepo } from '../../data/contractsRepo';
import { billboardsRepo } from '../../data/billboardsRepo';
import { bidsRepo } from '../../data/bidsRepo';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const palette = { indigo: '#667eea' };

function useStats() {
  const boards = billboardsRepo.all();
  const contracts = contractsRepo.all();
  const bids = bidsRepo.all();
  const total = boards.length;
  const occupied = boards.filter(b => b.status === 'occupied').length;
  const occupancy = total ? Math.round((occupied / total) * 100) : 0;
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  return { total, occupancy, activeContracts, openBids: bids.filter(b=>b.status==='open').length };
}

function monthlyRevenue() {
  const c = contractsRepo.all();
  const now = new Date();
  return Array.from({length:6}).map((_,i)=>{
    const d = new Date(now.getFullYear(), now.getMonth()-(5-i), 1);
    const mm = d.getMonth();
    const yy = d.getFullYear();
    const active = c.filter(x => new Date(x.startDate) <= new Date(yy, mm+1, 0) && new Date(x.endDate) >= new Date(yy, mm, 1) && x.status==='active');
    return { m: d.toLocaleString('default',{month:'short'}), revenue: active.reduce((s,x)=>s+x.monthlyRate,0) };
  });
}

const Home: React.FC = () => {
  const stats = useStats();
  const revenue = monthlyRevenue();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border shadow-sm">
          <div className="text-sm text-gray-500">Total billboards</div>
          <div className="text-2xl font-semibold">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl p-5 border shadow-sm">
          <div className="text-sm text-gray-500">Occupancy</div>
          <div className="text-2xl font-semibold">{stats.occupancy}%</div>
        </div>
        <div className="bg-white rounded-xl p-5 border shadow-sm">
          <div className="text-sm text-gray-500">Active contracts</div>
          <div className="text-2xl font-semibold">{stats.activeContracts}</div>
        </div>
        <div className="bg-white rounded-xl p-5 border shadow-sm">
          <div className="text-sm text-gray-500">Open bids</div>
          <div className="text-2xl font-semibold">{stats.openBids}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border shadow-sm">
        <div className="mb-3 font-semibold">Monthly revenue</div>
        <div style={{width:'100%', height:260}}>
          <ResponsiveContainer>
            <AreaChart data={revenue}>
              <XAxis dataKey="m" /><YAxis /><Tooltip />
              <Area dataKey="revenue" type="monotone" stroke={palette.indigo} fill={palette.indigo} fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
