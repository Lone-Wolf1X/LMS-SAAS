"use client";

import React, { useEffect, useState } from 'react';
import { centralApi } from '@/lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Plus, Key, Copy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LicensesPage() {
  const [licenses, setLicenses] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mock initial fetch
  useEffect(() => {
    // In a real app, this would be: centralApi.get('/licenses').then(...)
    setLicenses([
      { id: '1', key: 'LMS-5B3A-9F21', customerId: 'CUST-001', validityDays: 365, isActive: true, createdAt: new Date().toISOString() },
      { id: '2', key: 'LMS-8C2B-4E10', customerId: 'CUST-002', validityDays: 30, isActive: false, createdAt: new Date().toISOString() },
    ]);
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">License Management</h2>
          <p className="text-slate-500">Generate and revoke client node licenses.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus size={18} />
          Generate New License
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>License Key</TableHead>
              <TableHead>Customer ID</TableHead>
              <TableHead>Validity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Generated On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {licenses.map((license) => (
              <TableRow key={license.id}>
                <TableCell className="font-mono font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Key size={14} className="text-brand-primary" />
                    {license.key}
                  </div>
                </TableCell>
                <TableCell>{license.customerId}</TableCell>
                <TableCell>{license.validityDays} Days</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    license.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {license.isActive ? 'Active' : 'Revoked'}
                  </span>
                </TableCell>
                <TableCell className="text-slate-500">
                  {new Date(license.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCopy(license.key, license.id)}
                    className="text-slate-500 hover:text-brand-primary"
                  >
                    {copiedId === license.id ? <CheckCircle size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {licenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  No licenses found. Generate one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate License">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Customer ID</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
              placeholder="e.g. CUST-1042"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Validity (Days)</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all">
              <option value="30">30 Days (Trial)</option>
              <option value="365">1 Year</option>
              <option value="1095">3 Years</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Generate Key</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
