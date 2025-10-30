import React, { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import { billboardsRepo } from '../../data/billboardsRepo';
import { contractsRepo } from '../../data/contractsRepo';

function getMonthlySeries() {
  const now = new Date();
  const series = [] as Array<{ date: number; occupancy: number; revenue: number; started: number; ended: number }>;
  const months = Array.from({ length: 30 }).map((_, i) => new Date(now.getFullYear(), now.getMonth(), now.getDate() - (29 - i)));
  const all = contractsRepo.all();
  const bCount = billboardsRepo.all().length || 1;
  
  for (const d of months) {
    const active = all.filter(c => 
      new Date(c.startDate) <= d && 
      new Date(c.endDate) >= d && 
      c.status === 'active'
    );
    const revenue = active.reduce((s, c) => s + c.monthlyRate, 0);
    const occupancy = Math.round((active.length / bCount) * 100);
    
    series.push({ 
      date: d.getTime(),
      occupancy, 
      revenue, 
      started: Math.floor(Math.random() * 3),
      ended: Math.floor(Math.random() * 2)
    });
  }
  return series;
}

function getStatusDist() {
  const all = billboardsRepo.all();
  const counts = { available: 0, occupied: 0, pending: 0 } as Record<string, number>;
  for (const b of all) counts[b.status] = (counts[b.status] || 0) + 1;
  return [
    { category: 'Available', value: counts['available'], color: am5.color(0x0284c7) },
    { category: 'Occupied', value: counts['occupied'], color: am5.color(0x667eea) },
    { category: 'Pending', value: counts['pending'], color: am5.color(0xf6ad55) },
  ];
}


const Analytics: React.FC = () => {
  const revenueChartRef = useRef<HTMLDivElement>(null);
  const occupancyChartRef = useRef<HTMLDivElement>(null);
  const statusChartRef = useRef<HTMLDivElement>(null);

  // Summary metrics
  const totalBillboards = billboardsRepo.all().length;
  const activeContracts = contractsRepo.all().filter(c => c.status === 'active').length;
  const monthly = getMonthlySeries();
  const totalRevenue = monthly.reduce((sum, m) => sum + m.revenue, 0);
  const avgOccupancy = Math.round(monthly.reduce((s, m) => s + m.occupancy, 0) / monthly.length);
  const rwf = new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF' });

  useEffect(() => {
    // Monthly Revenue Chart (Column Chart)
    if (revenueChartRef.current) {
      const root = am5.Root.new(revenueChartRef.current);

      const myTheme = am5.Theme.new(root);
      myTheme.rule("AxisLabel", ["minor"]).setAll({
        dy: 1
      });

      root.setThemes([
        am5themes_Animated.new(root),
        myTheme,
        am5themes_Responsive.new(root)
      ]);

      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
          paddingLeft: 0
        })
      );

      const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomX"
      }));
      cursor.lineY.set("visible", false);

      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0,
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true,
            minorLabelsEnabled: true
          }),
          tooltip: am5.Tooltip.new(root, {})
        })
      );

      xAxis.set("minorDateFormats", {
        day: "dd",
        month: "MM"
      });

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        })
      );

      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Revenue",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "revenue",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "Rwf {valueY}"
          })
        })
      );

      series.columns.template.setAll({
        strokeOpacity: 0,
        fill: am5.color(0x764ba2),
        fillOpacity: 0.9
      });

      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));

      const data = getMonthlySeries();
      series.data.setAll(data);

      series.appear(1000);
      chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, []);

  useEffect(() => {
    // Occupancy Rate Chart (Smoothed Line Chart)
    if (occupancyChartRef.current) {
      const root = am5.Root.new(occupancyChartRef.current);

      root.setThemes([
        am5themes_Animated.new(root),
        am5themes_Responsive.new(root)
      ]);

      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
          paddingLeft: 0
        })
      );

      const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
      }));
      cursor.lineY.set("visible", false);

      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0.5,
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 80,
            minorGridEnabled: true,
            pan: "zoom"
          }),
          tooltip: am5.Tooltip.new(root, {})
        })
      );

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 1,
          renderer: am5xy.AxisRendererY.new(root, {
            pan: "zoom"
          })
        })
      );

      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: "Occupancy",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "occupancy",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}%"
          })
        })
      );

      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.2
      });

      series.strokes.template.setAll({
        strokeWidth: 2,
        stroke: am5.color(0x667eea)
      });

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Circle.new(root, {
            radius: 4,
            strokeWidth: 2,
            fill: am5.color(0x667eea)
          })
        });
      });

      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));

      const data = getMonthlySeries();
      series.data.setAll(data);

      series.appear(1000);
      chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, []);

  useEffect(() => {
    // Billboard Status Pie Chart
    if (statusChartRef.current) {
      const root = am5.Root.new(statusChartRef.current);

      root.setThemes([
        am5themes_Animated.new(root),
        am5themes_Responsive.new(root)
      ]);

      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout
        })
      );

      const series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category"
        })
      );

      series.slices.template.setAll({
        strokeWidth: 2,
        stroke: am5.color(0xffffff)
      });

      series.labels.template.setAll({
        text: "{category}: {value}",
        fontSize: 12
      });

      const data = getStatusDist();
      series.data.setAll(data);

      series.slices.template.adapters.add("fill", (fill, target) => {
        const dataItem = target.dataItem as any;
        return dataItem?.dataContext?.color || fill;
      });

      series.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, []);

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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Monthly Revenue</h3>
            <p className="text-sm text-gray-500">Last 30 days revenue trend</p>
          </div>
          <div ref={revenueChartRef} style={{ width: '100%', height: '350px' }}></div>
        </div>

        {/* Occupancy Rate Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Occupancy Rate</h3>
            <p className="text-sm text-gray-500">Billboard occupancy percentage</p>
          </div>
          <div ref={occupancyChartRef} style={{ width: '100%', height: '350px' }}></div>
        </div>

        {/* Billboard Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Billboard Status</h3>
            <p className="text-sm text-gray-500">Current status distribution</p>
          </div>
          <div ref={statusChartRef} style={{ width: '100%', height: '350px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
