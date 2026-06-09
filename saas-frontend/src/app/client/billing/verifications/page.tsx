"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function VerificationsPage() {
  const [verifications, setVerifications] = useState([
    { id: 'VER-001', studentName: 'John Doe', invoiceId: 'INV-2026-002', amount: 'NPR 2,000', uploadedAt: '2026-06-09 10:15 AM', status: 'PENDING', receiptUrl: '#' }
  ]);
  const [selectedVerif, setSelectedVerif] = useState<any>(null);

  const handleApprove = () => {
    setVerifications(verifications.map(v => 
      v.id === selectedVerif.id ? { ...v, status: 'APPROVED' } : v
    ));
    setSelectedVerif(null);
  };

  const handleReject = () => {
    setVerifications(verifications.map(v => 
      v.id === selectedVerif.id ? { ...v, status: 'REJECTED' } : v
    ));
    setSelectedVerif(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Voucher Verifications</h2>
          <p className="text-slate-500">Verify manual bank deposits and eSewa receipts uploaded by students.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search invoice or student..." 
            className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-brand-primary"
          />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Uploaded At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verifications.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-semibold text-slate-800">{v.studentName}</TableCell>
                <TableCell className="font-mono text-slate-500">{v.invoiceId}</TableCell>
                <TableCell className="font-bold text-slate-700">{v.amount}</TableCell>
                <TableCell className="text-slate-500">{v.uploadedAt}</TableCell>
                <TableCell>
                  {v.status === 'PENDING' ? (
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">Requires Action</span>
                  ) : v.status === 'APPROVED' ? (
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">Approved</span>
                  ) : (
                    <span className="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">Rejected</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedVerif(v)}
                    className="text-brand-primary"
                  >
                    View Receipt
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <Modal isOpen={!!selectedVerif} onClose={() => setSelectedVerif(null)} title="Verify Payment Receipt">
        {selectedVerif && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Student</p>
                <p className="text-sm font-bold text-slate-800">{selectedVerif.studentName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Invoice Amount</p>
                <p className="text-sm font-bold text-slate-800">{selectedVerif.amount}</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl bg-white h-64 flex flex-col items-center justify-center text-slate-400">
              <FileText className="w-12 h-12 mb-2 text-slate-300" />
              <p>Uploaded Receipt Preview</p>
              <p className="text-xs mt-1">(Image/PDF viewer will render here)</p>
            </div>

            {selectedVerif.status === 'PENDING' && (
              <div className="pt-4 flex justify-between border-t border-slate-100 mt-6">
                <Button variant="ghost" onClick={handleReject} className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2">
                  <XCircle size={16} /> Reject (Invalid)
                </Button>
                <Button onClick={handleApprove} className="bg-emerald-500 hover:bg-emerald-600 gap-2">
                  <CheckCircle size={16} /> Approve Payment
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
