# STATE — improve-site-conversion-internal

Branch: feature/improve-site-conversion-internal  
Worktree: C:/workspace/synobotix/.worktrees/improve-site-conversion  
Planner: gpt-5.4  
Executor: coder-agent  

---

# Mission

Improve website conversion by rewriting the homepage and offer-page messaging so visitors understand the target pain, the concrete outcomes, the offer differences, and the next action to take, with stronger repeated Calendly CTAs and objection-handling content.

This feature must deliver a bounded conversion-focused content and layout update for the public marketing pages only.

Out of scope:

- blog architecture or WordPress integration changes
- contact form or email backend changes
- analytics redesign beyond preserving existing tracked CTA clicks
- brand redesign, new dependencies, or component-library migration
- new legal/compliance pages
- unrelated refactors outside the approved marketing surfaces

---

# Feature Type

- [x] new feature  
- [ ] bug fix  
- [ ] refactor (approved)  
- [ ] performance improvement  
- [ ] infrastructure  
- [ ] security  

---

# Change Level

- [ ] L1 — local low-risk  
- [x] L2 — bounded standard change  
- [ ] L3 — structural or sensitive  

Reason: this is a bounded user-visible behavioral/content change across a small set of marketing pages, with no structural, security, or public contract redesign.

---

# Acceptance Criteria

- [ ] The homepage hero clearly states the target audience/problem, expected outcome, and provides a primary Calendly CTA plus a secondary offers CTA.
- [ ] The homepage includes conversion-focused sections for pain qualification, value proposition, offers, process, proof/credibility, FAQ, and a final CTA.
- [ ] Existing homepage Calendly and LinkedIn CTAs remain functional and tracked after the rewrite.
- [ ] The offers listing and offer detail pages use more conversion-oriented copy with clearer audience fit, outcomes, and repeated Calendly CTA entry points.
- [ ] The updated pages build successfully with the current Next.js setup and stay within the approved marketing-page scope.

---

# Scope Contract

## Allowed Areas

- `app/page.tsx`
- `app/services/page.tsx`
- `app/services/[slug]/ServiceDetailContent.tsx`
- `app/i18n/translations.ts`
- `data/offres.ts`
- `STATE.improve-site-conversion-internal.md`
- `TODO.improve-site-conversion-internal.md`
- `DECISIONS.improve-site-conversion-internal.md`
- `MEMORY.md`

---

## Forbidden Areas

- `app/blog/**`
- `app/contact/**`
- `app/api/**`
- `lib/wp.ts`
- `lib/track.ts`
- `.opencode/**`
- `package.json`
- `package-lock.json`
- `next.config.js`
- legal/privacy pages
- any dependency list, analytics implementation, or backend/email flow

Anything not explicitly allowed is forbidden unless planner updates this contract.

---

# Public Contract Impact

- [x] no
- [ ] yes — Rust API
- [ ] yes — CLI
- [ ] yes — config
- [ ] yes — file format / schema
- [ ] yes — pipeline semantics
- [ ] yes — external integration behavior

Migration needed: no  
ADR required: no

---

# Required Gates

- [ ] governance
- [ ] architect
- [ ] architect-security
- [ ] security
- [ ] adr
- [x] doc
- [x] qa
- [x] review
- [x] release

---

# Blast Radius Assessment

- [ ] localized (single module)  
- [x] multi-module  
- [ ] cross-system  
- [ ] unknown  

Reason: the change touches several user-facing marketing files, but stays within the website presentation layer.

---

# Architectural Constraints

- Preserve the current Next.js App Router structure and existing tracking endpoints/utilities.
- Do not introduce new dependencies, frameworks, or data-fetching patterns.
- Reuse existing styling conventions (Tailwind utility classes) and current page structure where practical.
- Keep CTA destinations aligned with existing Calendly and LinkedIn URLs already in use.
- Do not redesign non-marketing flows or alter backend/runtime semantics.

---

# Parallel Safety Check

Active worktrees checked:

- `main` at `C:/workspace/synobotix`
- `feature/fix-docker-next-config-copy` at `C:/workspace/wt-fix-docker-next-config-copy`
- `feature/improve-site-conversion` at `C:/workspace/wt-improve-site-conversion` (inaccessible external worktree; treated as stale and unused)

Collision assessment: none. The active Docker/config feature does not overlap with this marketing-page scope. The stale external worktree is not used for execution and does not change the approved file surfaces.

---

# Security Surface Check

No auth, secrets, dependencies, network surfaces, untrusted-input handling, or trust-boundary changes are expected in scope.

---

# Execution Plan (Planner Output)

1. Rewrite homepage copy/section structure to emphasize pain, value, proof, and repeated conversion CTAs.
2. Update translation content and offer data needed to support the new conversion-oriented messaging.
3. Refresh services listing and offer detail pages so each offer has clearer audience fit, outcomes, objection-handling support, and Calendly-driven calls to action.
4. Build the app and verify the updated marketing pages compile successfully without touching forbidden areas.

---

# Drift / Replan Conditions

Stop and return to planner if any of the following occur:

- the feature needs files outside Allowed Areas
- the work expands into analytics, form handling, blog integration, or backend changes
- a new dependency or architectural abstraction appears necessary
- public contract impact changes from “no” to any “yes”
- a security, architect, or ADR gate becomes necessary
- the rewrite requires a broader site-wide redesign beyond the bounded marketing pages in scope

---

# Known Preflight Risks

- Preflight repository prerequisites were initialized successfully in this worktree.
- No active preflight blocker remains.

---

# Definition of Done

✔ Acceptance criteria met  
✔ QA passed  
✔ Review approved  
✔ Docs updated  
✔ Release readiness confirmed  
