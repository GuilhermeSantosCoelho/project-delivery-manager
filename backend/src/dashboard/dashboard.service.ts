import { Injectable } from '@nestjs/common';

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'at-risk' | 'completed';
}

export interface UpcomingTask {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  isOverdue: boolean;
}

export interface DashboardSummary {
  totalProjects: number;
  openTasks: number;
  tasksDueThisWeek: number;
}

@Injectable()
export class DashboardService {
  private readonly projects: Project[] = [
    { id: '1', name: 'Project Alpha', status: 'active' },
    { id: '2', name: 'Project Beta', status: 'at-risk' },
    { id: '3', name: 'Project Gamma', status: 'completed' },
  ];

  private readonly tasks: UpcomingTask[] = [
    {
      id: '1',
      title: 'Implement authentication',
      project: 'Project Alpha',
      dueDate: '2026-03-12',
      isOverdue: false,
    },
    {
      id: '2',
      title: 'Fix production bug',
      project: 'Project Beta',
      dueDate: '2026-03-08',
      isOverdue: true,
    },
    {
      id: '3',
      title: 'Write API documentation',
      project: 'Project Alpha',
      dueDate: '2026-03-14',
      isOverdue: false,
    },
  ];

  getSummary(): DashboardSummary {
    const today = new Date('2026-03-10');
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + 7);

    const openTasks = this.tasks.length;
    const tasksDueThisWeek = this.tasks.filter((t) => {
      const due = new Date(t.dueDate);
      return due >= today && due <= weekEnd;
    }).length;

    return {
      totalProjects: this.projects.length,
      openTasks,
      tasksDueThisWeek,
    };
  }

  getProjects(): Project[] {
    return this.projects.filter((p) => p.status !== 'completed');
  }

  getUpcomingTasks(): UpcomingTask[] {
    return [...this.tasks].sort((a, b) => {
      if (a.isOverdue !== b.isOverdue) return a.isOverdue ? -1 : 1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }
}
