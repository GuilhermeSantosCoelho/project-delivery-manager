import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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

  async update(id: string, dto: UpdateTaskDto): Promise<ProjectTask> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description ?? null;
    if (dto.dueDate !== undefined) task.dueDate = dto.dueDate ?? null;
    if (dto.status !== undefined) task.status = dto.status;
    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    await this.tasksRepository.remove(task);
  }
}
