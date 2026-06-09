"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle, Clock, AlertCircle, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function StudentBillingPage() {
  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-001', title: 'Fall Semester Fee', amount: 'NPR 45,000', dueDate: '2026-07-01', status: 'UNPAID' },
    { id: 'INV-2026-002', title: 'Library Fee', amount: 'NPR 2,000', dueDate: '2026-05-01', status: 'VERIFICATION_PENDING' },
    { id: 'INV-2025-010', title: 'Spring Semester Fee', amount: 'NPR 45,000', dueDate: '2025-12-01', status: 'PAID' },
  ]);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedInvoice) return;

    // Simulate upload
    setInvoices(invoices.map(inv => 
      inv.id === selectedInvoice ? { ...inv, status: 'VERIFICATION_PENDING' } : inv
    ));
    setUploadModalOpen(false);
    setFile(null);
    alert('Voucher uploaded successfully. Awaiting admin verification.');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PAID': return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1 w-fit"><CheckCircle size={14}/> Paid</span>;
      case 'UNPAID': return <span className="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full flex items-center gap-1 w-fit"><AlertCircle size={14}/> Unpaid</span>;
      case 'VERIFICATION_PENDING': return <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full flex items-center gap-1 w-fit"><Clock size={14}/> Pending Verification</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8 px-4">
        <h2 className="text-3xl font-bold text-slate-800">My Fees & Billing</h2>
        <p className="text-slate-500 mt-2">View your invoices and upload payment vouchers.</p>
      </div>

      <div className="px-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 flex gap-4">
          <Receipt className="w-8 h-8 text-blue-500 shrink-0" />
          <div>
            <h4 className="font-bold text-blue-900">How to pay?</h4>
            <p className="text-sm text-blue-800 mt-1">
              Please transfer the due amount to the college bank account or via eSewa. Take a screenshot or picture of the deposit slip and click "Upload Voucher" below.
            </p>
            <div className="mt-3 p-3 bg-white/60 rounded-md text-sm font-mono text-slate-700">
              Bank of Kathmandu<br/>
              A/C: 1234567890<br/>
              Name: Global Tech University
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {invoices.map((inv) => (
            <motion.div 
              key={inv.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-200/60 shadow-sm"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-sm text-slate-500">{inv.id}</span>
                  {getStatusBadge(inv.status)}
                </div>
                <h3 className="text-lg font-bold text-slate-800">{inv.title}</h3>
                <p className="text-sm text-slate-500">Due Date: {inv.dueDate}</p>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                <div className="text-xl font-black text-slate-800">{inv.amount}</div>
                {inv.status === 'UNPAID' && (
                  <Button 
                    onClick={() => { setSelectedInvoice(inv.id); setUploadModalOpen(true); }}
                    className="bg-brand-primary whitespace-nowrap"
                  >
                    Upload Voucher
                  </Button>
                )}
                {inv.status === 'VERIFICATION_PENDING' && (
                  <Button variant="secondary" disabled className="whitespace-nowrap">
                    Under Review
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal isOpen={uploadModalOpen} onClose={() => { setUploadModalOpen(false); setFile(null); }} title={`Upload Payment Voucher`}>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4">
            <p className="text-sm text-slate-600">Uploading voucher for <span className="font-bold text-slate-800">{selectedInvoice}</span></p>
          </div>
          
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 bg-slate-50 relative hover:bg-slate-100 transition-colors cursor-pointer">
            <input 
              type="file" 
              accept="image/*,.pdf" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
              required
            />
            {file ? (
              <div className="text-center">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="font-semibold text-slate-700">{file.name}</p>
                <p className="text-xs text-slate-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <>
                <UploadCloud size={32} className="mb-2 text-slate-400" />
                <p className="text-sm font-medium">Click or drag receipt image here</p>
                <p className="text-xs mt-1">JPG, PNG, or PDF</p>
              </>
            )}
          </div>
          
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => { setUploadModalOpen(false); setFile(null); }}>Cancel</Button>
            <Button type="submit" disabled={!file}>Submit for Verification</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
