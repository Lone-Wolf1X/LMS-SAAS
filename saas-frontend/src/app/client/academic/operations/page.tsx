"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, MapPin, CheckSquare } from 'lucide-react';

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState('attendance');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Daily Operations</h2>
          <p className="text-slate-500">Manage daily attendance and view class timetables.</p>
        </div>
      </div>

      <div className="flex space-x-1 mb-6 bg-slate-200/50 p-1 rounded-xl inline-flex">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'attendance' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <CheckSquare size={16} /> Attendance
        </button>
        <button
          onClick={() => setActiveTab('timetable')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'timetable' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Calendar size={16} /> Timetable
        </button>
      </div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {activeTab === 'attendance' ? (
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Mark Attendance - CS101 (Today)</h3>
              <Button>Save Register</Button>
            </div>
            <div className="space-y-3">
              {['John Doe', 'Jane Smith', 'Alice Johnson'].map((name, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="font-medium text-slate-700">{name}</span>
                  <div className="flex space-x-2">
                    <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">Present</button>
                    <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-white text-slate-500 border border-slate-200 hover:bg-slate-50">Absent</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Weekly Timetable</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { day: 'Monday', time: '09:00 AM - 10:30 AM', course: 'Computer Science 101', room: 'Room 402' },
                { day: 'Tuesday', time: '11:00 AM - 12:30 PM', course: 'Advanced Mathematics', room: 'Room 305' },
              ].map((schedule, i) => (
                <div key={i} className="p-5 border border-brand-primary/20 bg-brand-primary/5 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-brand-primary">{schedule.day}</span>
                    <span className="text-sm font-medium text-slate-500 flex items-center gap-1"><Clock size={14} /> {schedule.time}</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-lg mb-1">{schedule.course}</h4>
                  <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={14} /> {schedule.room}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
