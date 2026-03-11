import { Header } from './components/Header';
import { ProjectsList } from './components/ProjectsList';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

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

export default async function HomePage() {
  const [summary, tasks] = await Promise.all([
    fetchJson<DashboardSummary>('/dashboard/summary'),
    fetchJson<UpcomingTask[]>('/dashboard/tasks/upcoming'),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />

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

        {/* Projects — fetched client-side via TanStack Query */}
        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
            Projects
          </h2>
          <ProjectsList />
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
