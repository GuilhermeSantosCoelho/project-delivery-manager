import { useQuery } from '@tanstack/react-query';
import { fetchJson } from '@/lib/api';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  status: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export function useTasks() {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: () => fetchJson<Task[]>('/tasks'),
  });
}
