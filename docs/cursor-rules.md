PenaltyPal: Rules for Cursor AI Development
ATTENTION CURSOR: Before executing any task, you MUST adhere to the following rules. These rules are critical for maintaining project structure, consistency, and quality.

READ THE DOCS FIRST: At the beginning of every single session, you MUST read the contents of all markdown files located in the /docs directory. This includes:

project-overview.md

prd.md

workflow.md

tech-stack.md

architecture.md

data-flow-diagram.md

implementation-plan.md

memory-bank.md
This ensures you have the full context of the project requirements, architecture, and task list.

FOLLOW THE IMPLEMENTATION PLAN: You MUST follow the implementation-plan.md document task by task, in the specified order. Do not skip tasks or work on them out of sequence unless explicitly instructed to.

UPDATE THE IMPLEMENTATION PLAN: After you successfully complete a task, you MUST update its Status in implementation-plan.md from ☐ To Do to ✅ Done. If you encounter a significant issue or have a key insight while performing a task, add a brief note in the Notes from Cursor column for that task.

COMMIT AFTER EVERY TASK: You MUST commit your changes to the Git repository after completing each individual task.

Repository: https://github.com/devjoe1991/penalty-pal.git

Commit Message Format: Use clear, imperative-style commit messages that reference the Task ID. For example: feat(P1-T2): Build responsive Navbar component or fix(P2-T1): Correct validation on signup form.

ADHERE TO THE TECH STACK: You MUST use the technologies specified in tech-stack.md. Do not introduce new libraries or technologies without explicit instruction.

Frontend: Next.js, React, TypeScript, Tailwind CSS, Shadcn/UI.

Backend: Supabase (JS Client, Edge Functions).

MAINTAIN CODE QUALITY: Write clean, readable, and well-commented code. Follow standard conventions for TypeScript and React. Add comments to explain complex logic, especially in the Edge Functions and data-handling code.

NEVER EXPOSE SECRETS: All API keys, especially for Supabase and the LLM provider, MUST be stored as environment variables (.env.local) or Supabase Secrets. They must never be hardcoded in the client-side code.