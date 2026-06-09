"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ShieldAlert, UserPlus, Mail } from 'lucide-react';

export default function AdminsPage() {
  const [admins, setAdmins] = useState([
    { id: 'ADM-101', name: 'Principal Desk', email: 'principal@college.edu', role: 'OPS_ADMIN', status: 'ACTIVE' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    departmentScope: 'ALL'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setAdmins([...admins, {
      id: `ADM-${Math.floor(Math.random() * 900) + 100}`,
      name: formData.name,
      email: formData.email,
      role: 'OPS_ADMIN',
      status: 'ACTIVE'
    }]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', departmentScope: 'ALL' });
    alert("Operational Admin credentials sent via email.");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Operational Admins</h2>
          <p className="text-slate-500">IT Admin: Create and manage accounts that will handle academic operations.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-slate-800 hover:bg-slate-700">
          <ShieldAlert size={18} />
          Create Ops Admin
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
              <TableHead>Admin ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>System Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell className="font-mono text-sm text-slate-500">{admin.id}</TableCell>
                <TableCell className="font-bold text-slate-800">{admin.name}</TableCell>
                <TableCell className="text-slate-600 flex items-center gap-2">
                  <Mail size={14} className="text-slate-400" /> {admin.email}
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full border border-purple-200">
                    {admin.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    {admin.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">Revoke</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Operational Admin">
        <form className="space-y-4" onSubmit={handleCreate}>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800 mb-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <p>Operational Admins will have access to the LMS/SIS core to manage students, teachers, and courses. They cannot access IT updates or licensing.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Official Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department Scope</label>
            <select 
              value={formData.departmentScope}
              onChange={(e) => setFormData({...formData, departmentScope: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800"
            >
              <option value="ALL">All Departments (Master Admin)</option>
              <option value="CS">Computer Science Only</option>
              <option value="MECH">Mechanical Engg Only</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-slate-800 hover:bg-slate-700">Create & Send Credentials</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
