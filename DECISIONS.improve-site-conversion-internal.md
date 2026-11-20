# DECISIONS - improve-site-conversion-internal

## D-001 - Localize homepage conversion copy inside the page component

Date: 2026-04-25
Task: T-001
Status: Applied
Related files: app/page.tsx

### Context

The homepage required a major conversion-focused rewrite, but the current task was intentionally bounded to the homepage itself.

### Options considered

- Option A: update the shared translation file immediately during T-001
- Option B: keep the new homepage conversion copy local to `app/page.tsx` and leave translation-system cleanup for the next task

### Decision

Selected Option B.

### Why

This keeps T-001 atomic and confined to the homepage surface while preserving the existing CTA tracking and avoiding a premature multi-file copy migration.

### Impact

- homepage copy is immediately improved
- translation harmonization remains explicitly scheduled for T-002
- no public contract or architecture surface changes

### ADR check

ADR required: no

### Follow-up

T-002 should align shared translation content with the new homepage messaging where appropriate.

### Commit

c213340

## D-002 - Keep offer-page localization logic local to the component

Date: 2026-04-25
Task: T-003
Status: Applied
Related files: app/services/[slug]/ServiceDetailContent.tsx

### Context

The offer-detail rewrite needed a few new section headings and objection labels, but the current task was bounded to the offer pages and not to a full translation-schema redesign.

### Options considered

- Option A: extend the shared translation contract with more offer-page-specific keys immediately
- Option B: derive a minimal localized label inside the component from existing language context

### Decision

Selected Option B.

### Why

This kept T-003 inside the current page scope and avoided a wider translation-API expansion during the offer-page rewrite.

### Impact

- offer pages gained localized section labels without changing the shared translation shape again
- translation-contract cleanup can still happen later if these labels become reused elsewhere

### ADR check

ADR required: no

### Follow-up

If the same labels are reused on other pages, promote them into `translations.ts` in a future bounded task.

### Commit

3095842

## D-003 - Treat global lint failures as pre-existing out of scope debt

Date: 2026-04-25
Task: T-004
Status: Applied
Related files: TODO.improve-site-conversion-internal.md, MEMORY.md

### Context

Final validation required an honest assessment of build and lint readiness. `npm run build` passed, but `npm run lint` still fails on unrelated existing files outside the allowed areas.

### Options considered

- Option A: expand scope and fix all repo-wide lint debt
- Option B: document the global lint failures as pre-existing out-of-scope debt and rely on targeted validation for touched files plus successful production build

### Decision

Selected Option B.

### Why

The active contract forbids opportunistic refactors and unrelated fixes. The changed marketing-page files were already linted directly, and the production build succeeded in the feature worktree.

### Impact

- QA/review can distinguish feature evidence from historical repo debt
- no scope drift into unrelated modules

### ADR check

ADR required: no

### Follow-up

If the repository wants green global lint, create a separate bounded cleanup feature.

### Commit

d7c7cca
