# STATE — fix-useSearchParams-suspense

Branch: not yet created
Worktree: not yet created
Planner: gpt-5.4
Executor: not yet assigned

---

# Mission

Wrap `useSearchParams()` in a `Suspense` boundary in `app/blog/[slug]/page.tsx` to fix the Next.js build error: "useSearchParams() should be wrapped in a suspense boundary".

This must resolve the prerender error that occurs during `npm run build`.

---

# Feature Type

- [x] bug fix  
- [ ] new feature  
- [ ] refactor (approved)  
- [ ] performance improvement  
- [ ] infrastructure  
- [ ] security  

---

# Change Level

- [x] L1 — local low-risk  
- [ ] L2 — bounded standard change  
- [ ] L3 — structural or sensitive  

Reason: single file, one specific fix, no architecture or security surface changes.

---

# Acceptance Criteria

- [ ] The build error on `/blog/[slug]` prerender is resolved
- [ ] `npm run build` completes successfully
- [ ] The blog pages render correctly at runtime with dynamic slugs
- [ ] No regression on other pages

---

# Scope Contract

## Allowed Areas

- `app/blog/[slug]/page.tsx`

## Forbidden Areas

- Any other file in `app/blog/**`
- `app/api/**`
- `app/contact/**`
- `app/services/**`
- `app/page.tsx`
- `package.json`
- `next.config.js`
- `.opencode/**`

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
- [ ] doc (optional for trivial bugfix)
- [x] qa
- [x] review
- [ ] release (merge-only)

---

# Blast Radius

- [x] localized (single module)  
- [ ] multi-module  
- [ ] cross-system  
- [ ] unknown  

Reason: only one file in a single route module.

---

# Architectural Constraints

- Preserve existing page structure and data fetching logic.
- Do not add new dependencies.
- Do not change the blog route path or dynamic segment pattern.

---

# Parallel Safety Check

- No active worktrees conflict with this fix
- No shared interfaces or schemas affected

---

# Security Surface Check

No auth, secrets, network, or trust surface changes.

---

# Execution Plan

1. Identify the exact location where `useSearchParams()` is used in `app/blog/[slug]/page.tsx`
2. Wrap the component or the relevant part in a `Suspense` boundary
3. Provide a fallback UI while params load
4. Run build validation
5. Commit

---

# Drift / Replan Conditions

Stop and return to planner if:
- the fix requires additional files beyond allowed areas
- the fix expands into other route changes
- additional dependencies become necessary
- public contract impact changes to "yes"

---

# Known Preflight Risks

- None identified. Should be straightforward local fix.

---

# Definition of Done

✔ Build error resolved  
✔ QA passed  
✔ Review approved