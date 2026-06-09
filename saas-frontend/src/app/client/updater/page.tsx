"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { DownloadCloud, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { clientApi } from '@/lib/api';

export default function UpdaterPage() {
  const [isChecking, setIsChecking] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);

  const checkForUpdates = () => {
    setIsChecking(true);
    // Simulate API call to HQ
    setTimeout(() => {
      setIsChecking(false);
      setUpdateAvailable({
        version: '1.0.6',
        description: 'New timetable UI enhancements and bug fixes.',
        size: '12 MB',
      });
    }, 1500);
  };

  const applyUpdate = () => {
    setIsUpdating(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUpdateProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUpdating(false);
          setUpdateAvailable(null);
          alert('Update applied successfully. System rebooting...');
        }, 500);
      }
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">OTA Updater</h2>
        <p className="text-slate-500">Check for system updates and apply them over-the-air.</p>
      </div>

      <div className="glass p-8 rounded-2xl text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-primary/10 text-brand-primary mb-6">
          <DownloadCloud size={40} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">System Version 1.0.5</h3>
        <p className="text-slate-500 mb-8">Last checked: Today at 09:00 AM</p>

        {!updateAvailable && !isUpdating && (
          <Button 
            size="lg" 
            onClick={checkForUpdates} 
            isLoading={isChecking}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {isChecking ? 'Checking HQ...' : 'Check for Updates'}
          </Button>
        )}

        {updateAvailable && !isUpdating && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-primary/5 border border-brand-primary/20 rounded-xl p-6 text-left"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-800 flex items-center">
                  <AlertTriangle className="text-brand-accent mr-2 w-5 h-5" />
                  Update Available: v{updateAvailable.version}
                </h4>
                <p className="text-slate-600 mt-2">{updateAvailable.description}</p>
                <p className="text-sm text-slate-400 mt-4">Download Size: {updateAvailable.size}</p>
              </div>
              <Button size="lg" onClick={applyUpdate} className="bg-emerald-500 hover:bg-emerald-400 shrink-0">
                Download & Apply
              </Button>
            </div>
          </motion.div>
        )}

        {isUpdating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-left"
          >
            <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
              <span>Downloading & Applying Patch...</span>
              <span>{updateProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <motion.div 
                className="bg-brand-primary h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${updateProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center animate-pulse">
              Please do not power off the system or close this window.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
