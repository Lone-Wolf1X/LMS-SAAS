import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
  ) {}

  create(teacherData: Partial<Teacher>): Promise<Teacher> {
    const teacher = this.teachersRepository.create(teacherData);
    return this.teachersRepository.save(teacher);
  }

  findAll(): Promise<Teacher[]> {
    return this.teachersRepository.find();
  }

  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.teachersRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new NotFoundException(`Teacher #${id} not found`);
    }
    return teacher;
  }

  async update(id: string, updateData: Partial<Teacher>): Promise<Teacher> {
    const teacher = await this.findOne(id);
    const updatedTeacher = this.teachersRepository.merge(teacher, updateData);
    return this.teachersRepository.save(updatedTeacher);
  }

  async remove(id: string): Promise<void> {
    const teacher = await this.findOne(id);
    await this.teachersRepository.remove(teacher);
  }
}
