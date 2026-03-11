import { useQuery } from '@tanstack/react-query';
import { fetchJson } from '@/lib/api';

export interface Project {
  id: string;
  name: string;
  status: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => fetchJson<Project[]>('/projects'),
  });
}
