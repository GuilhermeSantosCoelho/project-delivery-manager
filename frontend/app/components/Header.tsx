'use client';

import { useState } from 'react';
import { FolderKanban, Plus } from 'lucide-react';
import { NewProjectModal } from './NewProjectModal';
import { NewTaskModal } from './NewTaskModal';

export function Header() {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  return (
    <>
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderKanban size={22} className="text-zinc-700 dark:text-zinc-300" />
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Project Delivery Manager
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowProjectModal(true)}
              className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Plus size={16} />
              New Project
            </button>
            <button
              onClick={() => setShowTaskModal(true)}
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <Plus size={16} />
              New Task
            </button>
          </div>
        </div>
      </header>

      {showProjectModal && (
        <NewProjectModal onClose={() => setShowProjectModal(false)} />
      )}
      {showTaskModal && (
        <NewTaskModal onClose={() => setShowTaskModal(false)} />
      )}
    </>
  );
}
