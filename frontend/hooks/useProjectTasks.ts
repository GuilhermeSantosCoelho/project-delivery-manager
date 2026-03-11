import { useQuery } from '@tanstack/react-query';
import { fetchJson } from '@/lib/api';

export interface ProjectTask {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  status: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export function useProjectTasks(id: string) {
  return useQuery<ProjectTask[]>({
    queryKey: ['project-tasks', id],
    queryFn: () => fetchJson<ProjectTask[]>(`/projects/${id}/tasks`),
    enabled: !!id,
  });
}
