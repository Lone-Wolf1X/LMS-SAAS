"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calculator, FileSpreadsheet, ArrowRight, Wallet } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';

export default function HRMSDashboardPage() {
  const [employees] = useState([
    { id: 'EMP-001', name: 'Dr. Alan Turing', designation: 'HOD, Computer Science', baseSalary: 'NPR 120,000', status: 'ACTIVE' },
    { id: 'EMP-002', name: 'Prof. Newton', designation: 'Senior Lecturer', baseSalary: 'NPR 85,000', status: 'ACTIVE' },
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">HRMS & Payroll Dashboard</h2>
        <p className="text-slate-500">Manage employee salaries, generate payslips, and execute monthly payroll.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div whileHover={{ y: -5 }} className="glass p-6 rounded-2xl border border-indigo-100 flex items-center justify-between group cursor-pointer">
          <div>
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Calculator size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Tax Slabs & Structure</h3>
            <p className="text-sm text-slate-500 mt-1">Configure Allowances and Tax Deductions (TDS, PF)</p>
          </div>
          <ArrowRight className="text-indigo-300 group-hover:text-indigo-600 transition-colors" />
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="glass p-6 rounded-2xl border border-emerald-100 flex items-center justify-between group cursor-pointer">
          <div>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <Wallet size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Execute Payroll</h3>
            <p className="text-sm text-slate-500 mt-1">Run monthly salary calculation for all active staff</p>
          </div>
          <ArrowRight className="text-emerald-300 group-hover:text-emerald-600 transition-colors" />
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="glass p-6 rounded-2xl border border-blue-100 flex items-center justify-between group cursor-pointer">
          <div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <FileSpreadsheet size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Payslip Archive</h3>
            <p className="text-sm text-slate-500 mt-1">View and download historical generated payslips</p>
          </div>
          <ArrowRight className="text-blue-300 group-hover:text-blue-600 transition-colors" />
        </motion.div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-4 mt-10">Employee Directory (Payroll Focus)</h3>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Emp ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Base Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell className="font-mono text-sm text-slate-500">{emp.id}</TableCell>
                <TableCell className="font-bold text-slate-800">{emp.name}</TableCell>
                <TableCell className="text-slate-600">{emp.designation}</TableCell>
                <TableCell className="font-bold text-emerald-600">{emp.baseSalary}</TableCell>
                <TableCell>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    {emp.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-indigo-600">Edit Structure</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
