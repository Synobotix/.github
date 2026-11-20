# AGENTS.md

## Identity

- Repository name: `synobotix`
- Product identity: site vitrine d'un bureau d'études embarqué nommé Synobotix
- Primary goal: présenter les offres/services, publier du contenu marketing/blog, et convertir les visiteurs en prises de contact / rendez-vous
- Primary deployment target: application Next.js déployée en production et packagée via Docker
- Primary stack: Next.js App Router, React, TypeScript, Node.js, Tailwind CSS

## Architecture Triggers

Escalate to architecture-oriented planning/review before coding if a change touches any of the following:

- route structure or major navigation model across the public marketing site
- data sourcing boundaries between the Next.js app and external content sources
- Docker/runtime packaging strategy beyond a bounded local fix
- build pipeline semantics, CI/CD semantics, or deployment topology
- introduction/removal/renaming of major app directories or module boundaries
- broad refactors spanning multiple public pages, shared components, or API routes

## Security Triggers

Escalate to security review before coding if a change touches any of the following:

- `RESEND_API_KEY`, contact email routing, or other secret handling
- request validation/sanitization for `/api/contact` or `/api/track`
- third-party network integrations (WordPress API, Resend, Google Analytics, Calendly embeds/scripts)
- dependency additions/upgrades affecting runtime behavior or trust boundaries
- environment variable contracts used in production deployment
- anything that could expose user data, lead data, or tracking data improperly

## System Invariants

The following repository invariants must remain true unless explicitly replanned and approved:

- public marketing pages and routes remain stable and do not regress unexpectedly
- `npm run build` must succeed for production readiness

- no secrets are committed to the repository
- contact form and Calendly CTA flows must not be broken by unrelated changes
- blog integration via WordPress must remain operational unless explicitly in scope
- bounded marketing-page changes must preserve behavior outside the approved scope

## Forbidden Areas

The following areas are sensitive and must not be changed without explicit contract approval:

- `.opencode/_*.md`
- `.opencode/skills/**`
- secret-bearing local environment files and credentials
- dependency manifests for unrelated work (`package.json`, lockfile) unless the active STATE explicitly allows it
- broad application refactors outside the current `STATE.<slug>.md`
- deployment/runtime contract changes outside the approved feature scope

Anything not explicitly allowed by the active `STATE.<slug>.md` is treated as forbidden for execution.

## Runtime Contract

- Runtime: Node.js running the Next.js application server in production
- Build contract: `npm run build` must produce a valid production build
- Deployment contract: Docker multi-stage build must continue to be supportable from repository sources
- Content contract: external blog/content may be sourced from `NEXT_PUBLIC_WORDPRESS_API_URL`
- Contact contract: `/api/contact` depends on Resend/contact environment variables and must keep functioning if untouched by scope
- Tracking contract: CTA interactions may emit client-side tracking events and `/api/track` accepts tracking payloads

## Public Contracts

Current public/operational contracts in this repository:

| Surface | Contract |
| --- | --- |
| Public pages | Stable marketing routes such as `/`, `/about`, `/services`, `/portfolio`, `/contact`, `/blog`, and legal pages remain reachable unless explicitly replanned |
| Dynamic marketing content | `/services/[slug]` and `/blog/[slug]` continue to resolve expected content without unrelated contract changes |
| Contact API | `POST /api/contact` accepts lead/contact payload fields and returns JSON success or error responses |
| Tracking API | `POST /api/track` accepts tracking payloads with at least `event` and returns JSON responses |
| Environment variables | Production/runtime expects valid values for WordPress API, Resend, and analytics-related configuration where applicable |

## Operating Rule

Use `.opencode/_constitution.md` as the immutable source of truth for repository governance. If any instruction conflicts with the constitution, the constitution wins.
