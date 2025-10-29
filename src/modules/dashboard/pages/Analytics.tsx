import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  Tooltip, ResponsiveContainer, XAxis, YAxis, Legend, CartesianGrid, Label
} from 'recharts';
import { billboardsRepo } from '../../data/billboardsRepo';
import { contractsRepo } from '../../data/contractsRepo';

// --- Color Palette
const palette = {
  indigo: '#667eea',
  purple: '#764ba2',
  sky: '#0284c7',
  green: '#48bb78',
  orange: '#f6ad55',
  red: '#f56565',
};

// --- Compute monthly metrics
function getMonthlySeries() {
  const now = new Date();
  const series = [] as Array<{ m: string; occupancy: number; revenue: number; started: number; ended: number }>;
  const months = Array.from({ length: 6 }).map((_, i) =>
    new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
  );

  contractsRepo.sweepExpired();
  const all = contractsRepo.all();
  const bCount = billboardsRepo.all().length || 1;

  for (const d of months) {
    const mm = d.getMonth();
    const yy = d.getFullYear();
    const active = all.filter(
      c =>
        new Date(c.startDate) <= new Date(yy, mm + 1, 0) &&
        new Date(c.endDate) >= new Date(yy, mm, 1) &&
        c.status === 'active'
    );
    const started = all.filter(
      c => new Date(c.startDate).getMonth() === mm && new Date(c.startDate).getFullYear() === yy
    ).length;
    const ended = all.filter(
      c =>
        new Date(c.endDate).getMonth() === mm &&
        new Date(c.endDate).getFullYear() === yy &&
        c.status !== 'cancelled'
    ).length;
    const revenue = active.reduce((s, c) => s + c.monthlyRate, 0);
    const occupancy = Math.round((active.length / bCount) * 100);
    series.push({ m: d.toLocaleString('default', { month: 'short' }), occupancy, revenue, started, ended });
  }
  return series;
}

// --- Billboard status distribution
function getStatusDist() {
  const all = billboardsRepo.all();
  const counts = { available: 0, occupied: 0, pending: 0 } as Record<string, number>;
  for (const b of all) counts[b.status] = (counts[b.status] || 0) + 1;
  return [
    { name: 'Available', value: counts['available'], color: palette.sky },
    { name: 'Occupied', value: counts['occupied'], color: palette.indigo },
    { name: 'Pending', value: counts['pending'], color: palette.orange },
  ];
}

const Analytics: React.FC = () => {
  const monthly = getMonthlySeries();
  const status = getStatusDist();
  const rwf = new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF' });

  // --- Summary numbers
  const totalBillboards = billboardsRepo.all().length;
  const activeContracts = contractsRepo.all().filter(c => c.status === 'active').length;
  const totalRevenue = monthly.reduce((sum, m) => sum + m.revenue, 0);
  const avgOccupancy = Math.round(monthly.reduce((s, m) => s + m.occupancy, 0) / monthly.length);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Analytics Dashboard</h2>
          <p className="text-gray-500 text-sm">Overview of billboard performance</p>
        </div>
        <select className="border border-gray-300 rounded px-3 py-1 text-sm mt-3 sm:mt-0">
          <option>All Time</option>
          <option>6 Months</option>
          <option>3 Months</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Total Billboards</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalBillboards}</h3>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Active Contracts</p>
          <h3 className="text-2xl font-bold text-indigo-600 mt-1">{activeContracts}</h3>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h3 className="text-2xl font-bold text-green-600 mt-1">{rwf.format(totalRevenue)}</h3>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Average Occupancy</p>
          <h3 className="text-2xl font-bold text-purple-600 mt-1">{avgOccupancy}%</h3>
        </div>
      </div>

      {/* Charts Section 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-1">Occupancy Rate</h4>
          <p className="text-gray-500 text-sm mb-2">Share of billboards with an active contract each month</p>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={monthly} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="m" />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(value) => `${value as number}%`} />
                <Legend />
                <Area name="Occupancy" type="monotone" dataKey="occupancy" stroke={palette.indigo} fill={palette.indigo} fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-1">Monthly Revenue</h4>
          <p className="text-gray-500 text-sm mb-2">Sum of monthly rates from active contracts</p>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={monthly} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="m" />
                <YAxis tickFormatter={(v) => rwf.format(v as number)} />
                <Tooltip formatter={(v) => rwf.format(v as number)} />
                <Legend />
                <Bar name="Revenue" dataKey="revenue" fill={palette.purple} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Section 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-1">Contracts Started vs Ended</h4>
          <p className="text-gray-500 text-sm mb-2">Count of contracts that began or ended each month</p>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={monthly} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="m" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line dataKey="started" name="Started" stroke={palette.sky} strokeWidth={2} dot={false} />
                <Line dataKey="ended" name="Ended" stroke={palette.orange} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-1">Billboard Status</h4>
          <p className="text-gray-500 text-sm mb-2">Current distribution of billboard availability</p>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Tooltip formatter={(v) => String(v)} />
                <Legend />
                <Pie data={status} dataKey="value" nameKey="name" outerRadius={90} label>
                  {status.map((s, i) => (
                    <Cell key={i} fill={s.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
