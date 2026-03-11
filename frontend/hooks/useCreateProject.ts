import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '@/lib/api';

export interface CreateProjectInput {
  name: string;
  description?: string;
  status?: string;
}

async function createProject(input: CreateProjectInput) {
  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
