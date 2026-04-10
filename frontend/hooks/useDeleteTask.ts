import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '@/lib/api';

async function deleteTask(id: string) {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['project-tasks'] });
    },
  });
}
