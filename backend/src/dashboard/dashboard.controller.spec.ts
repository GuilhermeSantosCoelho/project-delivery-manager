import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [DashboardService],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSummary', () => {
    it('should return dashboard summary metrics', () => {
      const result = controller.getSummary();
      expect(result).toHaveProperty('totalProjects');
      expect(result).toHaveProperty('openTasks');
      expect(result).toHaveProperty('tasksDueThisWeek');
      expect(typeof result.totalProjects).toBe('number');
    });
  });

  describe('getProjects', () => {
    it('should return active and at-risk projects', () => {
      const projects = controller.getProjects();
      expect(Array.isArray(projects)).toBe(true);
      projects.forEach((p) => {
        expect(p.status).not.toBe('completed');
        expect(p).toHaveProperty('id');
        expect(p).toHaveProperty('name');
        expect(p).toHaveProperty('status');
      });
    });
  });

  describe('getUpcomingTasks', () => {
    it('should return tasks sorted with overdue first', () => {
      const tasks = controller.getUpcomingTasks();
      expect(Array.isArray(tasks)).toBe(true);
      if (tasks.length > 1) {
        const firstOverdueIndex = tasks.findIndex((t) => t.isOverdue);
        const firstNotOverdueIndex = tasks.findIndex((t) => !t.isOverdue);
        if (firstOverdueIndex !== -1 && firstNotOverdueIndex !== -1) {
          expect(firstOverdueIndex).toBeLessThan(firstNotOverdueIndex);
        }
      }
    });

    it('should include required task fields', () => {
      const tasks = controller.getUpcomingTasks();
      tasks.forEach((t) => {
        expect(t).toHaveProperty('id');
        expect(t).toHaveProperty('title');
        expect(t).toHaveProperty('project');
        expect(t).toHaveProperty('dueDate');
        expect(t).toHaveProperty('isOverdue');
      });
    });
  });
});
