"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Building2, UserPlus, CheckCircle, Copy, Receipt } from 'lucide-react';

export default function TenantsPage() {
  const [tenants, setTenants] = useState([
    { id: 'TNT-001', name: 'Global Tech University', registrationNo: 'REG-10492', status: 'ACTIVE', onboardedAt: '2026-05-10' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newCredentials, setNewCredentials] = useState({ username: '', password: '', tenantId: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    registrationNo: '',
    contactEmail: ''
  });

  const handleOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate backend onboarding process
    const newId = `TNT-00${tenants.length + 2}`;
    setTenants([...tenants, {
      id: newId,
      name: formData.name,
      registrationNo: formData.registrationNo,
      status: 'ACTIVE',
      onboardedAt: new Date().toISOString().split('T')[0]
    }]);
    
    // Generate credentials
    const username = `itadmin@${formData.name.toLowerCase().replace(/\s+/g, '')}.edu`;
    const password = Math.random().toString(36).slice(-8) + "Aa1!";
    
    setNewCredentials({ username, password, tenantId: newId });
    setIsModalOpen(false);
    setShowSuccess(true);
    setFormData({ name: '', registrationNo: '', contactEmail: '' });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tenants & Onboarding</h2>
          <p className="text-slate-500">Onboard new colleges/universities and manage their billing.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-brand-primary">
          <Building2 size={18} />
          Onboard New Client
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
              <TableHead>Tenant ID</TableHead>
              <TableHead>Institution Name</TableHead>
              <TableHead>Registration No.</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Onboarded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell className="font-mono text-sm text-slate-500">{tenant.id}</TableCell>
                <TableCell className="font-bold text-slate-800">{tenant.name}</TableCell>
                <TableCell className="text-slate-600">{tenant.registrationNo}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    {tenant.status}
                  </span>
                </TableCell>
                <TableCell className="text-slate-500">{tenant.onboardedAt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-brand-primary hover:bg-brand-primary/10">Manage</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Onboarding Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Onboard New Client">
        <form className="space-y-4" onSubmit={handleOnboard}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Institution Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Govt. Registration No. / AICTE No.</label>
            <input 
              type="text" 
              value={formData.registrationNo}
              onChange={(e) => setFormData({...formData, registrationNo: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Primary Contact Email</label>
            <input 
              type="email" 
              value={formData.contactEmail}
              onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary"
              required 
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Onboard & Generate Invoice</Button>
          </div>
        </form>
      </Modal>

      {/* Success & Credentials Modal */}
      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Client Onboarded Successfully">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Tenant Initialized</h3>
          <p className="text-slate-500 text-sm">Invoice generated. Share these IT Admin credentials securely with the client.</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-500">Tenant ID</span>
            <span className="font-mono text-slate-800 font-bold">{newCredentials.tenantId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-500">IT Admin Username</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-800">{newCredentials.username}</span>
              <button onClick={() => handleCopy(newCredentials.username)} className="text-slate-400 hover:text-brand-primary"><Copy size={14}/></button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-500">Temp Password</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-800">{newCredentials.password}</span>
              <button onClick={() => handleCopy(newCredentials.password)} className="text-slate-400 hover:text-brand-primary"><Copy size={14}/></button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button variant="secondary" className="gap-2" onClick={() => setShowSuccess(false)}>
            <Receipt size={16} /> View Invoice
          </Button>
          <Button onClick={() => setShowSuccess(false)}>Done</Button>
        </div>
      </Modal>

    </div>
  );
}
