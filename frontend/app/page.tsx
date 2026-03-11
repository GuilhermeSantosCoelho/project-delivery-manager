const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'at-risk' | 'completed';
}

interface UpcomingTask {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  isOverdue: boolean;
}

interface DashboardSummary {
  totalProjects: number;
  openTasks: number;
  tasksDueThisWeek: number;
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

const statusStyles: Record<Project['status'], string> = {
  active: 'bg-emerald-100 text-emerald-700',
  'at-risk': 'bg-amber-100 text-amber-700',
  completed: 'bg-zinc-100 text-zinc-500',
};

export default async function HomePage() {
  const [summary, projects, tasks] = await Promise.all([
    fetchJson<DashboardSummary>('/dashboard/summary'),
    fetchJson<Project[]>('/projects'),
    fetchJson<UpcomingTask[]>('/dashboard/tasks/upcoming'),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Project Delivery Manager
          </h1>
          <div className="flex gap-3">
            <a
              href="/projects/new"
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              + New Project
            </a>
            <a
              href="/tasks/new"
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              + New Task
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        {/* Summary metrics */}
        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
            Overview
          </h2>
          {summary ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MetricCard label="Total Projects" value={summary.totalProjects} />
              <MetricCard label="Open Tasks" value={summary.openTasks} />
              <MetricCard
                label="Due This Week"
                value={summary.tasksDueThisWeek}
                highlight={summary.tasksDueThisWeek > 0}
              />
            </div>
          ) : (
            <p className="text-sm text-zinc-400">Unable to load summary.</p>
          )}
        </section>

        {/* Active projects */}
        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
            Active Projects
          </h2>
          {projects && projects.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <span className="font-medium text-zinc-800 dark:text-zinc-100">
                      {project.name}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[project.status]}`}
                    >
                      {project.status === 'at-risk' ? 'At Risk' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-zinc-400">
              {projects === null ? 'Unable to load projects.' : 'No active projects.'}
            </p>
          )}
        </section>

        {/* Upcoming / overdue tasks */}
        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
            Upcoming Deadlines
          </h2>
          {tasks && tasks.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <div>
                      <p className="font-medium text-zinc-800 dark:text-zinc-100">
                        {task.title}
                      </p>
                      <p className="text-sm text-zinc-500">{task.project}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${task.isOverdue ? 'text-red-600' : 'text-zinc-600 dark:text-zinc-400'}`}
                      >
                        {task.isOverdue ? 'Overdue' : `Due ${task.dueDate}`}
                      </p>
                      {task.isOverdue && (
                        <p className="text-xs text-zinc-400">{task.dueDate}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-zinc-400">
              {tasks === null ? 'Unable to load tasks.' : 'No upcoming deadlines.'}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

function MetricCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm text-zinc-500">{label}</p>
      <p
        className={`mt-1 text-3xl font-bold ${highlight ? 'text-amber-600' : 'text-zinc-900 dark:text-zinc-50'}`}
      >
        {value}
      </p>
    </div>
  );
}
