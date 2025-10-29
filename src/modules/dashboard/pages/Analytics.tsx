import React from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';
import { billboardsRepo } from '../../data/billboardsRepo';
import { contractsRepo } from '../../data/contractsRepo';

const palette = {
  indigo: '#667eea',
  purple: '#764ba2',
  sky: '#0284c7',
  green: '#48bb78',
  orange: '#f6ad55',
  red: '#f56565',
};

function getMonthlySeries() {
  const now = new Date();
  const series = [] as Array<{ m: string; occupancy: number; revenue: number; started: number; ended: number }>;
  const months = Array.from({ length: 6 }).map((_, i) => new Date(now.getFullYear(), now.getMonth() - (5 - i), 1));
  const all = contractsRepo.all();
  const bCount = billboardsRepo.all().length || 1;
  for (const d of months) {
    const mm = d.getMonth();
    const yy = d.getFullYear();
    const active = all.filter(c => new Date(c.startDate) <= new Date(yy, mm + 1, 0) && new Date(c.endDate) >= new Date(yy, mm, 1) && c.status === 'active');
    const started = all.filter(c => new Date(c.startDate).getMonth() === mm && new Date(c.startDate).getFullYear() === yy).length;
    const ended = all.filter(c => new Date(c.endDate).getMonth() === mm && new Date(c.endDate).getFullYear() === yy && c.status !== 'cancelled').length;
    const revenue = active.reduce((s, c) => s + c.monthlyRate, 0);
    const occupancy = Math.round((active.length / bCount) * 100);
    series.push({ m: d.toLocaleString('default', { month: 'short' }), occupancy, revenue, started, ended });
  }
  return series;
}

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

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div className="header-left">
          <h3>Analytics</h3>
          <p className="breadcrumb">Overview</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h4>Occupancy rate</h4>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={monthly}>
                <XAxis dataKey="m" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="occupancy" stroke={palette.indigo} fill={palette.indigo} fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-card">
          <h4>Monthly revenue</h4>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={monthly}>
                <XAxis dataKey="m" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill={palette.purple} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h4>Contracts started vs ended</h4>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={monthly}>
                <XAxis dataKey="m" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="started" name="Started" stroke={palette.sky} />
                <Line dataKey="ended" name="Ended" stroke={palette.orange} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-card">
          <h4>Billboard status</h4>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Tooltip />
                <Pie data={status} dataKey="value" nameKey="name" outerRadius={90} label>
                  {status.map((s, i) => <Cell key={i} fill={s.color} />)}
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
