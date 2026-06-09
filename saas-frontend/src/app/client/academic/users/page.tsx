"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Users, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UsersDirectoryPage() {
  const [activeTab, setActiveTab] = useState('students');
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Mock data based on tab
    if (activeTab === 'students') {
      setUsers([
        { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', roleId: 'STU-1001', status: 'ACTIVE' },
        { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', roleId: 'STU-1002', status: 'ACTIVE' },
      ]);
    } else {
      setUsers([
        { id: '1', firstName: 'Dr. Alan', lastName: 'Turing', email: 'alan@university.edu', roleId: 'EMP-001', status: 'ACTIVE' },
      ]);
    }
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Directory</h2>
          <p className="text-slate-500">Manage Students, Teachers, and Staff members.</p>
        </div>
        <Button className="gap-2">
          <UserPlus size={18} />
          Add {activeTab === 'students' ? 'Student' : 'Teacher'}
        </Button>
      </div>

      <div className="flex space-x-1 mb-6 bg-slate-200/50 p-1 rounded-xl inline-flex">
        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'students' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setActiveTab('teachers')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'teachers' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Teachers
        </button>
      </div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>{activeTab === 'students' ? 'Enrollment No.' : 'Employee ID'}</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-semibold text-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell className="text-slate-600">{user.email}</TableCell>
                <TableCell className="font-mono text-slate-500">{user.roleId}</TableCell>
                <TableCell>
                  <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-brand-primary">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
