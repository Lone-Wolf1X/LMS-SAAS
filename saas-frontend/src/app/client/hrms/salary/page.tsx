"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { PlusCircle, Info, Calculator, Percent } from 'lucide-react';

export default function SalaryStructurePage() {
  const [components, setComponents] = useState([
    { id: 1, name: 'Basic Salary', type: 'EARNING', calculation: 'FIXED', value: '100%', isTaxable: true },
    { id: 2, name: 'Dearness Allowance (DA)', type: 'EARNING', calculation: 'PERCENTAGE', value: '10% of Basic', isTaxable: true },
    { id: 3, name: 'Provident Fund (PF)', type: 'DEDUCTION', calculation: 'PERCENTAGE', value: '10% of Basic', isTaxable: false },
    { id: 4, name: 'TDS (Nepal Tax Slab)', type: 'DEDUCTION', calculation: 'SLAB_BASED', value: 'Dynamic (1%, 10%, 20%)', isTaxable: false },
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Global Salary Structure Config</h2>
          <p className="text-slate-500">Define Earnings and Deductions to compute Net Salary accurately.</p>
        </div>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white">
          <PlusCircle size={18} /> Add Component
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl overflow-hidden shadow-sm border border-slate-200"
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Component Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Calculation</TableHead>
                  <TableHead>Value/Rule</TableHead>
                  <TableHead className="text-center">Taxable?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {components.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell className="font-bold text-slate-800">{comp.name}</TableCell>
                    <TableCell>
                      {comp.type === 'EARNING' ? (
                        <span className="px-2 py-1 text-xs font-bold rounded-md bg-emerald-100 text-emerald-700">Earnings (+)</span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-bold rounded-md bg-red-100 text-red-700">Deduction (-)</span>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">
                      <div className="flex items-center gap-1.5">
                        {comp.calculation === 'PERCENTAGE' ? <Percent size={14} className="text-slate-400"/> : <Calculator size={14} className="text-slate-400" />}
                        {comp.calculation}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium">{comp.value}</TableCell>
                    <TableCell className="text-center text-slate-600">{comp.isTaxable ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </div>

        <div>
          <div className="glass p-6 rounded-2xl border border-blue-100 bg-blue-50/30">
            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-3">
              <Info size={20} className="text-blue-500" />
              Nepal Tax Compliance
            </h3>
            <p className="text-sm text-blue-800 mb-4 leading-relaxed">
              As per Nepal's Inland Revenue Department (IRD), TDS (Tax Deducted at Source) slabs apply progressively to the taxable income.
            </p>
            <div className="space-y-2 text-sm text-blue-900/80">
              <div className="flex justify-between border-b border-blue-200/50 pb-1">
                <span>Upto NPR 500,000 (Single)</span>
                <span className="font-bold">1%</span>
              </div>
              <div className="flex justify-between border-b border-blue-200/50 pb-1">
                <span>NPR 500,000 to 700,000</span>
                <span className="font-bold">10%</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>NPR 700,000 to 1,000,000</span>
                <span className="font-bold">20%</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-6 bg-white text-blue-700 border-blue-200 hover:bg-blue-100">
              Update Tax Slabs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
