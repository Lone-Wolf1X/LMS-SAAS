"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, DownloadCloud, Users, Calendar, CheckSquare, Menu, X, LogOut, Building, BookOpen, Banknote, Calculator, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'IT Dashboard', href: '/client', icon: LayoutDashboard, section: 'IT Admin' },
  { name: 'Ops Admins', href: '/client/admins', icon: Users, section: 'IT Admin' },
  { name: 'OTA Updater', href: '/client/updater', icon: DownloadCloud, section: 'IT Admin' },
  { name: 'Billing Settings', href: '/client/settings/billing', icon: Settings, section: 'IT Admin' },
  { name: 'HRMS Dashboard', href: '/client/hrms', icon: Users, section: 'HR & Finance' },
  { name: 'Salary Config', href: '/client/hrms/salary', icon: Calculator, section: 'HR & Finance' },
  { name: 'Voucher Verifications', href: '/client/billing/verifications', icon: Banknote, section: 'HR & Finance' },
  { name: 'Academic HQ', href: '/client/academic', icon: Building, section: 'LMS/SIS' },
  { name: 'User Directory', href: '/client/academic/users', icon: Users, section: 'LMS/SIS' },
  { name: 'Course Catalog', href: '/client/academic/courses', icon: BookOpen, section: 'LMS/SIS' },
  { name: 'Operations', href: '/client/academic/operations', icon: Calendar, section: 'LMS/SIS' },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300">
      <div className="flex items-center justify-center h-20 border-b border-white/10 px-6">
        <Building className="text-emerald-400 w-8 h-8 mr-3" />
        <span className="text-xl font-bold text-white tracking-wider">Client Node</span>
      </div>
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="mb-6">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">IT Admin</p>
          <div className="space-y-1">
            {navItems.filter(item => item.section === 'IT Admin').map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== '/client');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg transition-all duration-200 group relative",
                    isActive 
                      ? "bg-emerald-500/10 text-white" 
                      : "hover:bg-white/5 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="client-active-nav"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={cn("w-5 h-5 mr-3", isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-white")} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">HR & Finance</p>
          <div className="space-y-1 mb-6">
            {navItems.filter(item => item.section === 'HR & Finance').map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== '/client/hrms');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg transition-all duration-200 group relative",
                    isActive 
                      ? "bg-emerald-500/10 text-white" 
                      : "hover:bg-white/5 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="client-active-nav"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={cn("w-5 h-5 mr-3", isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-white")} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">LMS & SIS</p>
          <div className="space-y-1">
            {navItems.filter(item => item.section === 'LMS/SIS').map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== '/client/academic');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg transition-all duration-200 group relative",
                    isActive 
                      ? "bg-emerald-500/10 text-white" 
                      : "hover:bg-white/5 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="client-active-nav"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={cn("w-5 h-5 mr-3", isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-white")} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      <div className="p-4 border-t border-white/10">
        <button className="flex items-center w-full px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 shadow-2xl z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-slate-900 z-40 md:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 z-10 sticky top-0">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 rounded-md text-slate-500 hover:bg-slate-100 mr-4"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-slate-800">
              {navItems.find(item => pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== '/client' && item.href !== '/client/academic'))?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
              License Active
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold border border-slate-300">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
