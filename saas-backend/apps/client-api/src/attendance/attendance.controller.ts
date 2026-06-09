import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('mark')
  markAttendance(
    @Body('studentId') studentId: string,
    @Body('courseId') courseId: string,
    @Body('date') date: string,
    @Body('status') status: string,
  ) {
    return this.attendanceService.markAttendance(studentId, courseId, new Date(date), status);
  }

  @Get('student/:studentId')
  getAttendanceForStudent(@Param('studentId') studentId: string) {
    return this.attendanceService.getAttendanceForStudent(studentId);
  }

  @Get('course/:courseId')
  getAttendanceForCourse(
    @Param('courseId') courseId: string,
    @Query('date') date: string,
  ) {
    return this.attendanceService.getAttendanceForCourse(courseId, new Date(date));
  }
}
