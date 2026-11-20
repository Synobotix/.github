# STATE.update-offers-content

## Mission

Remplacer le contenu textuel des offres existantes dans `data/offres.ts` et `app/services/[slug]/ServiceDetailContent.tsx` par les nouvelles offres définies dans `synobotix-offers/`, tout en conservant les slugs, routes, structure de données et comportement existants.

Mapping offre source → slug destination :
- `tier-1-field-ready-protocol.md` → slug `quick-win` (Tier 1, première offre)
- `tier-2-precision-performance-suite.md` → slug `demo-credible` (Tier 2, deuxième offre)
- `tier-3-industrial-scaling-system.md` → slug `demo-secured` (Tier 3, troisième offre)
- `physical-ai-integration-sprint.md` → slug `integration-ia` (offre consulting Physical AI)

L'offre `prototypage` reste inchangée.

## Feature Type

- Type: `standard feature`
- Change Level: `L1`
- Flow: `triage -> planner -> preflight -> coder -> qa -> review -> doc -> release`

## Acceptance Criteria

1. Les 3 offres "demo" et l'offre "integration-ia" affichent les nouveaux noms, taglines, descriptions et prix exacts
2. Les features listées pour chaque offre correspondent au contenu des fichiers markdown source
3. Le pricing display fonctionne correctement (plus de suffixe "K€" pour les nouveaux prix exacts en €)
4. Les slugs d'URL restent inchangés (`quick-win`, `demo-credible`, `demo-secured`, `integration-ia`)
5. Les pages détail (`/services/[slug]`) affichent le contenu mis à jour (idealFor, outcomes, objections)
6. La version anglaise est cohérente avec la française
7. `npm run build` passe
8. Aucune régression sur l'offre `prototypage` (inchangée)

## Scope Contract

### Allowed Areas

- `data/offres.ts` — mise à jour des noms, taglines, descriptions, prix, features, metadescriptions
- `app/services/[slug]/ServiceDetailContent.tsx` — mise à jour des contenus per-slug (idealFor, outcomes, objections)
- `app/i18n/translations.ts` — ajustement mineur des suffixes de prix si nécessaire
- `app/sitemap.ts` — inchangé (slugs stables)

### Forbidden Areas

- `.opencode/` — interdit
- `app/services/page.tsx` — ne pas modifier la structure/layout de la page (seulement le contenu data-driven)
- `app/services/[slug]/page.tsx` — ne pas modifier le server component
- `app/services/layout.tsx` — interdit
- `app/` hors services — interdit
- `data/` hors `offres.ts` — interdit
- `package.json`, `lockfiles`, `Dockerfile`, configs — interdit
- Routes, navigation, architecture — interdit
- Tout ce qui n'est pas listé dans Allowed Areas

## Public Contract Impact

- **Contract impact**: `non` — les slugs, routes et types de données restent inchangés
- **Surfaces affected**: aucune
- **Migration needed**: `non`
- **ADR required**: `non`

## Required Gates

- governance: `no`
- architect: `no`
- architect-security: `no`
- security: `no`
- adr: `no`
- doc: `no`
- qa: `yes`
- review: `yes`
- release: `yes`

## Blast Radius

- Classification: `localized` (limité à `data/offres.ts`, `ServiceDetailContent.tsx`, potentiellement `translations.ts`)
- Raison: Changement de contenu textuel uniquement. Aucun changement structurel, de type, de route ou de contrat.

## Parallel / Collision Risk

- Parallel risk: `none` (aucune feature active en parallèle)
- Shared surfaces: aucune
- Escalation needed: `no`

## Execution Plan

1. Mettre à jour `data/offres.ts` : remplacer les 4 offres ciblées (quick-win, demo-credible, demo-secured, integration-ia) avec les nouveaux contenus des fichiers markdown
2. Mettre à jour `app/services/[slug]/ServiceDetailContent.tsx` : remplacer les contenus per-slug (idealFor, outcomes, objections) pour les 4 slugs concernés
3. Ajuster `app/i18n/translations.ts` : mettre à jour les suffixes/descriptions de prix si nécessaire
4. Valider : `npm run build`
5. Commit atomique

## Drift Conditions

Conditions qui déclenchent un retour au planner :
- Ajout/suppression d'offres (changement du nombre d'offres)
- Changement de slugs ou de routes
- Modification de la structure de données `Offre` ou `OffreFeature`
- Modification de fichiers en dehors des Allowed Areas
- Impossibilité de build
- Champ de portée qui s'élargit au-delà du remplacement de contenu textuel
