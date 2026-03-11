'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  'at-risk': 'bg-amber-100 text-amber-700',
  completed: 'bg-zinc-100 text-zinc-500',
};

function statusLabel(status: string) {
  if (status === 'at-risk') return 'At Risk';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function ProjectsList() {
  const { data: projects, isLoading, isError } = useProjects();

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
    return <p className="text-sm text-zinc-400">Unable to load projects.</p>;
  }

  if (!projects || projects.length === 0) {
    return <p className="text-sm text-zinc-400">No projects found.</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              <span className="font-medium text-zinc-800 dark:text-zinc-100">
                {project.name}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[project.status] ?? 'bg-zinc-100 text-zinc-500'}`}
                >
                  {statusLabel(project.status)}
                </span>
                <ChevronRight size={16} className="text-zinc-400" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
