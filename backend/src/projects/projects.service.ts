import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';
import { ProjectTask } from '../tasks/task.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(ProjectTask)
    private readonly tasksRepository: Repository<ProjectTask>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  findTasksByProject(id: string): Promise<ProjectTask[]> {
    return this.tasksRepository.find({ where: { projectId: id } });
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create({
      name: dto.name,
      description: dto.description ?? null,
      status: dto.status ?? 'active',
    });
    return this.projectsRepository.save(project);
  }
}
