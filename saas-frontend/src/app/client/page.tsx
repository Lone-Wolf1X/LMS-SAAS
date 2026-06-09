"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Link as LinkIcon, Database, HardDrive, Cpu } from 'lucide-react';
import { clientApi } from '@/lib/api';

export default function ClientDashboardPage() {
  const [stats] = useState({
    licenseStatus: 'Valid',
    licenseExpiry: '2027-06-05',
    hqConnection: 'Connected',
    uptime: '15d 4h 23m',
    version: '1.0.5',
    storageUsed: '45%',
  });

  const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }: any) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-2xl flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <h4 className="text-slate-500 font-medium mb-1">{title}</h4>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      {subtitle && <p className="text-sm text-slate-400 mt-2">{subtitle}</p>}
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">IT Status Dashboard</h2>
        <p className="text-slate-500">Monitor local instance health, connection to HQ, and license status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="License Status" 
          value={stats.licenseStatus} 
          subtitle={`Expires: ${stats.licenseExpiry}`}
          icon={ShieldCheck} 
          colorClass="bg-emerald-500" 
        />
        <StatCard 
          title="HQ Connection" 
          value={stats.hqConnection} 
          subtitle="Ping: 45ms"
          icon={LinkIcon} 
          colorClass="bg-blue-500" 
        />
        <StatCard 
          title="Current Version" 
          value={`v${stats.version}`} 
          subtitle="Latest patch applied"
          icon={Activity} 
          colorClass="bg-brand-primary" 
        />
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-4 mt-10">Server Health</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-4 bg-slate-100 rounded-full text-slate-500">
            <Cpu size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">CPU Usage</p>
            <p className="text-xl font-bold text-slate-800">12%</p>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-4 bg-slate-100 rounded-full text-slate-500">
            <Database size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Memory Usage</p>
            <p className="text-xl font-bold text-slate-800">2.4 GB / 8 GB</p>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-center space-x-4">
          <div className="p-4 bg-slate-100 rounded-full text-slate-500">
            <HardDrive size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Storage Used</p>
            <p className="text-xl font-bold text-slate-800">{stats.storageUsed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
