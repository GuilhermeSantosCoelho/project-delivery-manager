import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ProjectTask } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(ProjectTask)
    private readonly tasksRepository: Repository<ProjectTask>,
  ) {}

  findAll(): Promise<ProjectTask[]> {
    return this.tasksRepository.find({ relations: ['project'] });
  }

  async create(dto: CreateTaskDto): Promise<ProjectTask> {
    const task = this.tasksRepository.create({
      title: dto.title,
      projectId: dto.projectId,
      description: dto.description ?? null,
      dueDate: dto.dueDate ?? null,
      status: dto.status ?? 'todo',
    });
    return this.tasksRepository.save(task);
  }
}
