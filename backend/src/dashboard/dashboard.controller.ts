import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  getSummary() {
    return this.dashboardService.getSummary();
  }

  @Get('projects')
  getProjects() {
    return this.dashboardService.getProjects();
  }

  @Get('tasks/upcoming')
  getUpcomingTasks() {
    return this.dashboardService.getUpcomingTasks();
  }
}
