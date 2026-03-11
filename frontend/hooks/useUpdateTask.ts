import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '@/lib/api';

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: string;
}

async function updateTask(id: string, input: UpdateTaskInput) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...input }: UpdateTaskInput & { id: string }) =>
      updateTask(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['project-tasks'] });
    },
  });
}
