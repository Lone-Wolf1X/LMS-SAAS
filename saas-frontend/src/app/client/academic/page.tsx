"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, CalendarDays, BookOpen } from 'lucide-react';

export default function AcademicDashboardPage() {
  const stats = [
    { title: 'Total Students', value: 1240, icon: Users, color: 'bg-blue-500' },
    { title: 'Total Teachers', value: 85, icon: GraduationCap, color: 'bg-emerald-500' },
    { title: 'Active Courses', value: 42, icon: BookOpen, color: 'bg-purple-500' },
    { title: 'Today\'s Classes', value: 112, icon: CalendarDays, color: 'bg-amber-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Academic Operations</h2>
        <p className="text-slate-500">Manage students, courses, and daily operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5 }}
            className="glass p-6 rounded-2xl flex items-center space-x-4"
          >
            <div className={`p-4 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-slate-200 rounded-xl text-left hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
              <Users className="w-6 h-6 text-emerald-500 mb-2" />
              <div className="font-semibold text-slate-800">Enroll Student</div>
              <div className="text-xs text-slate-500 mt-1">Add new admission to SIS</div>
            </button>
            <button className="p-4 border border-slate-200 rounded-xl text-left hover:bg-blue-50 hover:border-blue-200 transition-colors">
              <CalendarDays className="w-6 h-6 text-blue-500 mb-2" />
              <div className="font-semibold text-slate-800">Mark Attendance</div>
              <div className="text-xs text-slate-500 mt-1">Update daily attendance</div>
            </button>
          </div>
        </div>
        
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Enrollments</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                    JS
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">John Smith</p>
                    <p className="text-xs text-slate-500">Computer Science 101</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
