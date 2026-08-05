# AGENTS.md

Guidance for AI coding agents working in this repo. This is a **front-end-only mock** of the "Assign Resources" screen (Step 3 of the Order-to-Delivery journey). No backend exists or should be created.

## Project

- React + Vite + Ant Design (antd v6)
- Purpose: clickable UI/UX demo for a Dispatch Console screen where a dispatcher assigns a vehicle + driver to a planned trip
- Full requirements live in `SPEC.md` — read it before making structural changes

## Commands

```
npm install        # install deps
npm run dev         # start local dev server
npm run build        # production build, must pass before considering a task done
npm run lint          # lint, must pass before considering a task done
```

If any of these differ once the project is scaffolded (e.g. pnpm/yarn instead of npm), update this section — don't guess at commands.

## Boundaries

- **No backend calls, no API clients, no fetch/axios usage.** All data comes from static fixtures in `src/data/`. If a task seems to require a real endpoint, stop and flag it instead of inventing one.
- **Do not add a state management library** (Redux, Zustand, etc.). Use local `useState` only — do not use `useReducer`, even for the assignment flow's multi-step state. Model flow state as a simple string/enum status field (e.g. `'idle' | 'ready' | 'validating' | 'assigned' | 'error'`) updated via plain `setState` calls.
- **Do not persist state** (no localStorage/sessionStorage/cookies). Refresh should reset to fixture defaults — this is intentional, not a bug to fix.
- Don't touch `SPEC.md` unless explicitly asked to revise scope.

## Theming

- All colors come from the Ant Design `ConfigProvider` theme in `src/theme/themeConfig.ts`. Never hardcode hex values in components — reference theme tokens instead.
- Brand primary: `#F49400`. Do not change without explicit instruction.

## Code style

- Functional components + hooks only, no class components.
- One component per file, matching filename to component name.
- Co-locate a component's mock-data type imports from `src/types/`, not inline duplicate interfaces.
- Example of an acceptable component shape:

```tsx
// src/components/trip-queue/TripCard.tsx
import { Card, Tag } from "antd";
import type { Trip } from "../../types";

interface TripCardProps {
    trip: Trip;
    selected: boolean;
    onSelect: (id: string) => void;
}

export function TripCard({ trip, selected, onSelect }: TripCardProps) {
    return (
        <Card
            hoverable
            onClick={() => onSelect(trip.id)}
            style={{ borderColor: selected ? "var(--ant-color-primary)" : undefined }}
        >
            {/* ... */}
        </Card>
    );
}
```

## File structure

See `SPEC.md` §7 for the intended folder layout. Keep new files inside that structure rather than inventing parallel conventions (e.g. don't add a `src/views/` folder alongside `src/pages/`).

## What "done" looks like for a task

- `npm run build` and `npm run lint` both pass
- No console errors in the browser on load or during the assign flow
- Matches the interaction flow and states described in `SPEC.md` §5 and §8 (idle, ready, validating, success, and — if implemented — conflict/error states)

## When unsure

If a requirement isn't covered by `SPEC.md`, don't invent product behavior — leave a `// TODO:` comment describing the ambiguity and proceed with the simplest reasonable interpretation.

<!-- antd-cli setup start -->

## Ant Design CLI Skill

Use the shared Ant Design skill at `.agents/skills/antd/SKILL.md` before working on Ant Design code in this repository.

The skill teaches agents when and how to call `@ant-design/cli` commands such as `antd info`, `antd doc`, `antd demo`, `antd token`, `antd semantic`, and `antd changelog`.

<!-- antd-cli setup end -->
