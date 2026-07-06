# Artometrics — Claude Code

See @AGENTS.md for project overview, routing, content schemas, stack, and contributor guardrails.
See @README.md for setup, commands, and content workflows.

## Quick commands

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server |
| `npm run build` | Production build (run after collection/config changes) |
| `npm run sync:articles` | Sync GitHub Quarto repos → blog markdown + chart assets |

## Guardrails

- Use `@/` imports for `src/` (e.g. `@/layouts/BaseLayout.astro`).
- **Never rename** `src/components/fundations/` — imports depend on this spelling.
- Keep diffs minimal; no drive-by refactors or unrequested dependencies.
- Public copy must be **Artometrics**-branded, not Lexington/Hemingway demo text.
- Do not widen Zod schemas in `src/content.config.ts` without updating all consumers.

## Cursor + Claude Code

This repo is configured for both **Cursor** (`.cursor/rules/`, Cloud Agents) and **Claude Code** (this file, `.claude/`).

- **Cursor Agent:** Use the Cursor chat/agent panel for in-editor work and PRs.
- **Claude Code extension:** Install “Claude Code” in Cursor (`Ctrl+Shift+X`), open via the spark icon or `Ctrl+Shift+P` → “Claude Code: Open in New Tab”. Sign in with `/login` on first use.
- **Claude Code terminal:** From the repo root, run `claude` in Cursor’s integrated terminal (requires the CLI on `PATH`; see below).

Scoped rules live in `.claude/rules/` (content, pages, astro config). Cursor equivalents are in `.cursor/rules/`.
