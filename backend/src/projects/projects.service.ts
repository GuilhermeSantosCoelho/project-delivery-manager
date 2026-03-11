import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
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
