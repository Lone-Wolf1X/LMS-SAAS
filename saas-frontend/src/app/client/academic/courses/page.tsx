"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { BookOpen, PlusCircle, CheckCircle, Clock } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState([
    { id: 'CS-101', name: 'Introduction to Computer Science', instructor: 'Dr. Alan Turing', department: 'Computer Science', credits: 4, status: 'APPROVED' },
    { id: 'ME-201', name: 'Thermodynamics', instructor: 'Prof. Newton', department: 'Mechanical Engg', credits: 3, status: 'PENDING_APPROVAL' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    courseId: '',
    name: '',
    department: 'Computer Science',
    credits: 3
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setCourses([...courses, {
      ...formData,
      id: formData.courseId,
      instructor: 'Current Teacher', // Mock current user
      status: 'PENDING_APPROVAL'
    }]);
    setIsModalOpen(false);
    setFormData({ courseId: '', name: '', department: 'Computer Science', credits: 3 });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Course Management</h2>
          <p className="text-slate-500">Teachers: Propose new courses. Ops Admin: Review and approve.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-purple-600 hover:bg-purple-500 text-white">
          <PlusCircle size={18} />
          Propose New Course
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
              <TableHead>Course Code</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-mono font-bold text-brand-primary">{course.id}</TableCell>
                <TableCell className="font-semibold text-slate-800 flex items-center gap-2">
                  <BookOpen size={16} className="text-slate-400" />
                  {course.name}
                </TableCell>
                <TableCell className="text-slate-600">{course.department}</TableCell>
                <TableCell className="text-slate-600">{course.instructor}</TableCell>
                <TableCell className="text-slate-600">{course.credits}</TableCell>
                <TableCell>
                  {course.status === 'APPROVED' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <CheckCircle size={12} /> Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      <Clock size={12} /> Pending Ops Admin
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Propose New Course">
        <form className="space-y-4" onSubmit={handleCreate}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Course Code</label>
              <input 
                type="text" 
                value={formData.courseId}
                onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. CS-301"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Credits</label>
              <input 
                type="number" 
                min="1" max="6"
                value={formData.credits}
                onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course Title</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <select 
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Mechanical Engg">Mechanical Engg</option>
              <option value="Electrical Engg">Electrical Engg</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-500">Submit Proposal</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
