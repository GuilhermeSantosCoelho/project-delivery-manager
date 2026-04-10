import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ProjectTask } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<ProjectTask[]> {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() dto: CreateTaskDto): Promise<ProjectTask> {
    return this.tasksService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<ProjectTask> {
    return this.tasksService.update(id, dto);
  }
}
