import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  period: string;
  data: Array<{ date: string; value: number }>;

}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, period, data }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-neutral-900 pb-2">
            {value}
          </h5>
          <p className="text-base font-normal text-neutral-500">
            {title}
          </p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-emerald-500">
          {change}
          <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
          </svg>
        </div>
      </div>

      <div className="h-[120px] mt-4 mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FCD34D" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#FCD34D" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#F59E0B"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 border-t border-gray-200 mt-4">
        <div className="flex justify-between items-center pt-4">
          <button
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 text-center inline-flex items-center"
            type="button">
            {period}
            <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-amber-600 hover:text-amber-700 hover:bg-gray-100 px-3 py-2">
            View Report
            <svg className="w-2.5 h-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export const PerformanceOverview: React.FC = () => {
  const revenueData = [
    { date: '2024-01', value: 8500 },
    { date: '2024-02', value: 9200 },
    { date: '2024-03', value: 9800 },
    { date: '2024-04', value: 10500 },
    { date: '2024-05', value: 11200 },
    { date: '2024-06', value: 12500 }
  ];

  const orderData = [
    { date: '2024-01', value: 280 },
    { date: '2024-02', value: 300 },
    { date: '2024-03', value: 310 },
    { date: '2024-04', value: 325 },
    { date: '2024-05', value: 340 },
    { date: '2024-06', value: 350 }
  ];

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-neutral-900 mb-8">
        Performance Overview
      </h2> 
      <div className="grid lg:grid-cols-2 gap-6">
        <StatCard
          title="Total Revenue"
          value="$12,500"
          period="Last 30 Days"
          change="+15%"
          data={revenueData}
        />
        <StatCard
          title="Total Orders"
          value="350"
          period="Last 30 Days"
          change="+10%"
          data={orderData}
        />
      </div>
    </section>
  );
};
