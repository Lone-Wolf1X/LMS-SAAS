"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, CreditCard, Banknote, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function BillingSettingsPage() {
  const [settings, setSettings] = useState({
    manualEnabled: true,
    onlineEnabled: false,
    currency: 'NPR',
    bankDetails: 'Bank of Kathmandu\nA/C: 1234567890\nBranch: Thamel'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Billing settings updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Billing Settings</h2>
        <p className="text-slate-500">Configure how your institution collects fees from students.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Settings size={20} className="text-brand-primary" />
            Payment Modes
          </h3>
          
          <div className="space-y-4">
            {/* Manual Settlement */}
            <div className={`p-4 border rounded-xl flex items-start justify-between transition-colors ${settings.manualEnabled ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-200'}`}>
              <div className="flex gap-3">
                <Banknote className={`w-6 h-6 ${settings.manualEnabled ? 'text-brand-primary' : 'text-slate-400'}`} />
                <div>
                  <h4 className="font-semibold text-slate-800">Manual Settlement (Bank Voucher)</h4>
                  <p className="text-sm text-slate-500 mt-1">Students upload a photo/PDF of their bank deposit or eSewa transfer. Ops Admin verifies it manually.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-1">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.manualEnabled}
                  onChange={() => setSettings({...settings, manualEnabled: !settings.manualEnabled})}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>

            {settings.manualEnabled && (
              <div className="ml-9 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <label className="block text-sm font-medium text-slate-700 mb-1">Institution Bank Details (shown to students)</label>
                <textarea 
                  rows={3}
                  value={settings.bankDetails}
                  onChange={(e) => setSettings({...settings, bankDetails: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-brand-primary focus:border-brand-primary text-sm"
                />
              </div>
            )}

            {/* Online Payment */}
            <div className={`p-4 border rounded-xl flex items-start justify-between transition-colors ${settings.onlineEnabled ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-200 opacity-60'}`}>
              <div className="flex gap-3">
                <CreditCard className={`w-6 h-6 ${settings.onlineEnabled ? 'text-brand-primary' : 'text-slate-400'}`} />
                <div>
                  <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                    Online Payment Gateway
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full uppercase tracking-wider">Coming Soon</span>
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">Direct integration with Fonepay, Khalti, or eSewa API for instant verification.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-not-allowed mt-1">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  disabled
                  checked={settings.onlineEnabled}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg">Save Settings</Button>
        </div>
      </form>
    </div>
  );
}
