"use client";

import React, { useEffect, useState } from 'react';
import { centralApi } from '@/lib/api';
import { Users, ServerCrash, CreditCard, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HQDashboardPage() {
  const [stats, setStats] = useState({
    activeTenants: 12,
    totalRevenue: 45000,
    criticalErrors: 3,
    activeLicenses: 15,
  });

  const StatCard = ({ title, value, icon: Icon, trend, colorClass }: any) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-2xl flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h4 className="text-slate-500 font-medium mb-1">{title}</h4>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
        <p className="text-slate-500">Monitor your entire SaaS ecosystem from one place.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Active Tenants" 
          value={stats.activeTenants} 
          icon={Users} 
          trend={12} 
          colorClass="bg-brand-primary" 
        />
        <StatCard 
          title="Monthly Revenue" 
          value={`$${stats.totalRevenue.toLocaleString()}`} 
          icon={CreditCard} 
          trend={8} 
          colorClass="bg-emerald-500" 
        />
        <StatCard 
          title="Active Licenses" 
          value={stats.activeLicenses} 
          icon={Activity} 
          trend={5} 
          colorClass="bg-blue-500" 
        />
        <StatCard 
          title="Client Telemetry Errors" 
          value={stats.criticalErrors} 
          icon={ServerCrash} 
          trend={-15} 
          colorClass="bg-red-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Tenant Activity</h3>
          <div className="flex items-center justify-center h-64 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
            <p className="text-slate-400">Chart rendering goes here (e.g. Recharts)</p>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-slate-800 mb-4">System Alerts</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-start p-3 bg-red-50 rounded-lg border border-red-100">
                <ServerCrash className="w-5 h-5 text-red-500 mr-3 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-800">Connection Timeout</h4>
                  <p className="text-xs text-red-600 mt-1">Tenant ID: 9f8a-4b2c failed to sync telemetry logs.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
