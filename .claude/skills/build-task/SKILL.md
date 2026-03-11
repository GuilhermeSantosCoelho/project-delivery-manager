---
name: build-task
description: Fetches one task from the Linear todo column that has the label "CLAUDE", fills its description if empty, implements it in backend and frontend, then opens a PR with a description of the changes. Use when the user wants to build a Linear task end-to-end or says "build a task from Linear", "pick a task from todo", or "implement next Linear task".
---

# Build Task from Linear

End-to-end workflow: get one todo task from Linear **that has the label "CLAUDE"** → ensure it has a description → **set status to "In progress"** → implement it (backend + frontend) → open a PR → **set status to "Code Review"**.

## Prerequisites

- **Linear**: API key or token available (e.g. `LINEAR_API_KEY`). Use Linear’s GraphQL API for issues and cycles/views.
- **Repo**: Backend and frontend both in this workspace (e.g. `backend/` and a frontend app). Default branch and PR target (e.g. `main`) should be known.

If the user has not set up Linear auth or project/team IDs, ask for:
- How they authenticate with Linear (API key, env var name).
- Which Linear team and (if used) which board/cycle/view corresponds to the “todo” column.

---

## Workflow

### 1. Get one task from the todo column (label "CLAUDE" only)

- Query Linear for issues in the **Todo** state (or the column that the user considers “todo”).
- **Restrict to issues that have the label "CLAUDE"** (exact name). Ignore tasks without this label.
- Filter to the relevant team/project and (if applicable) cycle/board.
- **Pick a single task** (e.g. first by priority or creation date, or let the user choose).
- If no todo task exists, stop and report that there’s nothing to build (no todo task with label "CLAUDE").

**What you need from the task**

- Issue identifier (e.g. `PROJ-123`).
- Title.
- Description (may be empty).
- Acceptance criteria or subtasks, if present.

**Linear GraphQL (conceptual)**

- Use `issues` query with filters: (1) state = Todo; (2) label = "CLAUDE" (e.g. `labels: { name: { eq: "CLAUDE" } }`). Use the exact state name for Todo in their workspace if different; e.g. `state: { name: { eq: "Todo" } }` (or the exact state name for “todo” in their workspace).
- Request: `id`, `identifier`, `title`, `description`, `url`, and any custom fields needed for “todo” vs other columns.

---

### 2. Ensure the task has a description

- If the task **has no description** (or it’s empty/whitespace):
  - **Fill the description** in Linear via the API (e.g. `issueUpdate` mutation, `description` field).
  - Base the text on: title, any acceptance criteria, and the intended scope (backend + frontend). Keep it concise and actionable.
- If the task **already has a description**, improve the description with all things that is necessary to build the task.

---

### 3. Set the task status to "In progress"

- **Before building**, update the Linear issue so its state is **"In progress"** (or the exact state name used in their workspace for work-in-progress).
- Use the Linear API: e.g. `issueUpdate` mutation with `stateId` set to the ID of the "In progress" state (query workflow states first if needed, or use state name).
- This marks the task as being worked on.

---

### 4. Build the task in the project

- **Backend** (e.g. NestJS under `backend/`):
  - Add or change modules, controllers, services, DTOs, and tests as needed.
  - Follow existing patterns (see `CLAUDE.md` and project layout). Run tests and fix any failures.
- **Frontend** (if present in the repo):
  - Add or change components, pages, API calls, and state as needed to satisfy the task.
  - Follow existing patterns and styling. Ensure the feature is wired to the new/updated backend where relevant.
- Prefer **small, focused commits** (e.g. one or a few per area: backend, frontend, tests) so the PR stays reviewable.

**Checklist before opening the PR**

- [ ] Backend implementation and tests pass (e.g. `pnpm run test` in `backend/`).
- [ ] Frontend runs and the new/updated flow works with the backend.
- [ ] No unrelated changes; only what the task requires.

---

### 5. Open a new PR and set the description

- Create a **new branch** from the default branch (e.g. `main`), name it by the task (e.g. `PROJ-123-short-title` or `linear/PROJ-123`).
- **Open a Pull Request** (GitHub/GitLab/etc.) targeting the default branch.
- **Set the PR description** to summarize the changes:
  - **Title**: Can mirror the Linear task title, e.g. `[PROJ-123] Title`.
  - **Body**:
    - Short summary of what was implemented (backend + frontend).
    - Link to the Linear issue (use the issue `url` from step 1).
    - List of main changes (e.g. new endpoints, new UI, migrations if any).
    - Any follow-ups or known limitations, if relevant.

**Example PR description**

```markdown
## Summary
Implements [PROJ-123](<linear-issue-url>): [Task title].

## Changes
- **Backend**: …
- **Frontend**: …

## How to verify
- …
```

---

### 6. Set the task status to "Code Review"

- **After the PR is open**, update the Linear issue so its state is **"Code Review"** (or the exact state name used in their workspace).
- Use the Linear API: e.g. `issueUpdate` mutation with `stateId` set to the ID of the "Code Review" state.
- This marks the task as ready for review.

---

## Task progress checklist

Copy and tick off as you go:

```
- [ ] 1. Fetch one todo task from Linear (must have label "CLAUDE")
- [ ] 2. If description empty → fill it in Linear
- [ ] 3. Set task status to "In progress" in Linear
- [ ] 4. Implement backend (and tests)
- [ ] 5. Implement frontend (if applicable)
- [ ] 6. Run tests and sanity-check
- [ ] 7. Create branch and open PR with description of changes
- [ ] 8. Set task status to "Code Review" in Linear
```

---

## Notes

- **One task per run**: This skill is for **one** task from the todo column per invocation. For multiple tasks, the user can run it again or ask for a batch workflow.
- **Label "CLAUDE"**: Only tasks that have the label **CLAUDE** (exact name) are considered. Tasks without this label are ignored.
- **Todo column**: “Todo” is the state/column where the user wants to pull from; the exact state name may vary (e.g. “Backlog”, “To Do”). Use the filter that matches their board.
- **Status updates**: Set the task to **"In progress"** before building and to **"Code Review"** after opening the PR. Use the exact state names from their Linear workflow if different.
