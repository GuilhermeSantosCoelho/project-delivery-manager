'use client';

import Link from 'next/link';
import { use } from 'react';
import { ArrowLeft, ClipboardList } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { useProjectTasks } from '@/hooks/useProjectTasks';

const taskStatusStyles: Record<string, string> = {
  todo: 'bg-zinc-100 text-zinc-500',
  'in-progress': 'bg-amber-100 text-amber-700',
  done: 'bg-emerald-100 text-emerald-700',
};

function taskStatusLabel(status: string) {
  if (status === 'in-progress') return 'In Progress';
  if (status === 'todo') return 'To Do';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: tasks, isLoading: tasksLoading, isError } = useProjectTasks(id);

  const project = projects?.find((p) => p.id === id);

  if (projectsLoading || tasksLoading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 h-6 w-32 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="mb-8 h-8 w-56 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-12 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"
            />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <ClipboardList size={24} className="text-zinc-500" />
        <div>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {project?.name ?? 'Project'}
          </h2>
          {project?.status && (
            <p className="mt-0.5 text-sm capitalize text-zinc-500">
              {project.status}
            </p>
          )}
        </div>
      </div>

      {isError ? (
        <p className="text-sm text-zinc-400">Unable to load tasks.</p>
      ) : !tasks || tasks.length === 0 ? (
        <p className="text-sm text-zinc-400">No tasks found for this project.</p>
      ) : (
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
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${taskStatusStyles[task.status] ?? 'bg-zinc-100 text-zinc-500'}`}
                    >
                      {taskStatusLabel(task.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-zinc-500">
                    {task.dueDate ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
