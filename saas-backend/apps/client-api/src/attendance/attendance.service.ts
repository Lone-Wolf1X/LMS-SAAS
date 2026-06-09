import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async markAttendance(studentId: string, courseId: string, date: Date, status: string): Promise<Attendance> {
    const attendanceRecord = this.attendanceRepository.create({
      student: { id: studentId },
      course: { id: courseId },
      date,
      status,
    });
    return this.attendanceRepository.save(attendanceRecord);
  }

  async getAttendanceForStudent(studentId: string): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: { student: { id: studentId } },
      relations: ['course'],
    });
  }

  async getAttendanceForCourse(courseId: string, date: Date): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: { course: { id: courseId }, date },
      relations: ['student'],
    });
  }
}
