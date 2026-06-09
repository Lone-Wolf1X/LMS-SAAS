"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { UploadCloud, FileArchive, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PatchesPage() {
  const [patches, setPatches] = useState([
    { id: '1', version: '1.0.5', description: 'Security hotfix for attendance module', status: 'RELEASED', date: '2026-06-05' },
    { id: '2', version: '1.0.6', description: 'New timetable UI enhancements', status: 'DRAFT', date: '2026-06-08' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Patch & Release Manager</h2>
          <p className="text-slate-500">Upload and deploy OTA updates to all client nodes.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-brand-accent hover:bg-yellow-500 text-white">
          <UploadCloud size={18} />
          Upload New Patch
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
              <TableHead>Version</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patches.map((patch) => (
              <TableRow key={patch.id}>
                <TableCell className="font-semibold text-slate-800">
                  <div className="flex items-center gap-2">
                    <FileArchive size={16} className="text-brand-secondary" />
                    v{patch.version}
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{patch.description}</TableCell>
                <TableCell>
                  {patch.status === 'RELEASED' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <CheckCircle size={12} /> Released
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock size={12} /> Draft
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-slate-500">{new Date(patch.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  {patch.status === 'DRAFT' && (
                    <Button variant="secondary" size="sm">Publish OTA</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload OTA Patch">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Version</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
              placeholder="e.g. 1.0.7"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Release Notes</label>
            <textarea 
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
              placeholder="Describe what's new or fixed..."
              required
            ></textarea>
          </div>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 bg-slate-50">
            <UploadCloud size={32} className="mb-2 text-slate-400" />
            <p className="text-sm font-medium">Drag & drop your patch (.zip) here</p>
            <p className="text-xs mt-1">or click to browse files</p>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Upload & Create Draft</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
