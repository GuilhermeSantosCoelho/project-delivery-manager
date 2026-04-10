'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useTasks, Task } from '@/hooks/useTasks';
import { useDeleteTask } from '@/hooks/useDeleteTask';
import { EditTaskModal } from './EditTaskModal';

const statusStyles: Record<string, string> = {
  todo: 'bg-zinc-100 text-zinc-500',
  'in-progress': 'bg-amber-100 text-amber-700',
  done: 'bg-emerald-100 text-emerald-700',
};

function statusLabel(status: string) {
  if (status === 'in-progress') return 'In Progress';
  if (status === 'todo') return 'To Do';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function TasksList() {
  const { data: tasks, isLoading, isError } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { mutate: deleteTask } = useDeleteTask();

  function handleDelete(task: Task) {
    if (window.confirm(`Delete "${task.title}"?`)) {
      deleteTask(task.id);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-14 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-sm text-zinc-400">Unable to load tasks.</p>;
  }

  if (!tasks || tasks.length === 0) {
    return <p className="text-sm text-zinc-400">No tasks found.</p>;
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
              <th className="px-5 py-3 text-left font-medium text-zinc-600 dark:text-zinc-400">
                Title
              </th>
              <th className="px-5 py-3 text-left font-medium text-zinc-600 dark:text-zinc-400">
                Status
              </th>
              <th className="px-5 py-3 text-left font-medium text-zinc-600 dark:text-zinc-400">
                Due Date
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-5 py-3 font-medium text-zinc-800 dark:text-zinc-100">
                  {task.title}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[task.status] ?? 'bg-zinc-100 text-zinc-500'}`}
                  >
                    {statusLabel(task.status)}
                  </span>
                </td>
                <td className="px-5 py-3 text-zinc-500">
                  {task.dueDate ?? '—'}
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                      aria-label="Edit task"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(task)}
                      className="rounded-md p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950 dark:hover:text-red-400"
                      aria-label="Delete task"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </>
  );
}
