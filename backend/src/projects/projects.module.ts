import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectTask } from '../tasks/task.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectTask])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
