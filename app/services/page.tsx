"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { OFFRES_DATA, type Offre } from "@/data/offres";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { trackEvent } from "@/lib/track";
import { useScrollReveal } from "@/app/components/useScrollReveal";
import Footer from "@/app/components/Footer";

const calendlyUrl = "https://calendly.com/remiboivin021/diagnostic";

const sprintBadge = "FIXED SCOPE";
const sprintBadgeFr = "PÉRIMÈTRE FIXE";
const sprintLabel = "SPRINT · 48H TO START";
const sprintLabelFr = "SPRINT · DÉMARRAGE 48H";
const retainerBadge = "ONGOING";
const retainerBadgeFr = "EN CONTINU";
const retainerLabel = "RETAINER · MIN 6 MONTHS";
const retainerLabelFr = "RETAINER · MIN. 6 MOIS";

function getLocalizedOffre(offre: Offre, locale: string) {
  const isEn = locale === "en";
  return {
    slug: offre.slug,
    nom: isEn && offre.nomEn ? offre.nomEn : offre.nom,
    tagline: isEn && offre.taglineEn ? offre.taglineEn : offre.tagline,
    description: isEn && offre.descriptionEn ? offre.descriptionEn : offre.description,
    prix: isEn && offre.prixEn ? offre.prixEn : offre.prix,
    priceUnit: isEn && offre.priceUnitEn ? offre.priceUnitEn : offre.priceUnit,
    priceNote: isEn && offre.priceNoteEn ? offre.priceNoteEn : offre.priceNote,
    capacityNote: isEn && offre.capacityNoteEn ? offre.capacityNoteEn : offre.capacityNote,
    highlight: offre.highlight,
    cta: isEn && offre.ctaEn ? offre.ctaEn : offre.cta,
    features: offre.features.map((f) => ({
      text: isEn && f.textEn ? f.textEn : f.text,
    })),
  };
}

export default function ServicesPage() {
  const { t, locale } = useLanguage();
  const fr = locale === "fr";
  const L = (en: string, frText: string) => (fr ? frText : en);

  useScrollReveal(".syn-services", ".syn-svc-hero");

  const stats = [
    { value: "48h", label: L("START → COSTED PLAN", "DÉMARRAGE → PLAN CADRÉ"), accent: false },
    { value: "200 ms", label: L("INFERENCE TARGET · P99", "CIBLE D'INFÉRENCE · P99"), accent: true },
    { value: "1 + 2", label: L("MAX TRACKS / TEAM, IN PARALLEL", "MAX TRACKS / ÉQUIPE, EN PARALLÈLE"), accent: false },
  ];

  const why = [
    [L("Fast start, honest dates", "Démarrage rapide, dates honnêtes"), t.services.whyChoose.delay],
    [L("Deterministic safety", "Sûreté déterministe"), t.services.whyChoose.security],
    [L("Direct access", "Accès direct"), t.services.whyChoose.success],
  ];

  const rules = [
    [L("Senior, only", "Senior uniquement"), L("Never a junior learning your stack on your budget. Never an unvetted subcontractor.", "Jamais un junior qui apprend votre stack à vos frais. Jamais un sous-traitant non vérifié.")],
    [L("Fast start, honest dates", "Démarrage rapide, dates honnêtes"), L("We start fast; we never commit a safety-critical date before seeing your code.", "Nous démarrons vite ; nous ne nous engageons jamais sur une date de sûreté critique avant d'avoir vu votre code.")],
    [L("Published evidence", "Preuves publiées"), L("Latency and safety proof you can reproduce: HIL reports, not screenshots.", "Des preuves de latence et de sûreté reproductibles : rapports HIL, pas des captures d'écran.")],
    [L("No sales layer", "Zéro couche de vente"), L("The engineers writing the code take your call. No account manager in between.", "Les ingénieurs qui écrivent le code répondent directement. Pas de chargé de compte entre nous.")],
  ];

  return (
    <main className="syn-services">
      <section className="syn-svc-hero">
        <div className="syn-svc-hero-grid">
          <div>
            <p className="syn-eyebrow">{L("ENGAGEMENT MODELS · FIXED SCOPE OR ONGOING", "MODÈLES D'ENGAGEMENT · CADRÉ OU CONTINU")}</p>
            <h1>{t.services.title}<br /><span>{L("We start fast. We commit honestly.", "On démarre vite. On s'engage honnêtement.")}</span></h1>
            <p className="syn-hero-copy syn-svc-hero-copy">{t.services.subtitle}</p>
            <div className="syn-actions">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent({ event: "calendly_click", href: calendlyUrl, source: "services_hero" })}
                className="syn-button"
              >
                {t.services.ctaButton} <ArrowRight size={15} />
              </a>
              <Link
                href="/contact"
                onClick={() => trackEvent({ event: "contact_page_view", source: "services_hero" })}
                className="syn-button syn-button--secondary"
              >
                {L("Ask a technical question", "Poser une question technique")}
              </Link>
            </div>
            <p className="syn-note">{L("Fixed-scope sprint · Monthly retainer · Safety verified, never promised blind", "Sprint cadré · Retainer mensuel · Sûreté vérifiée, jamais promise à l'aveugle")}</p>
          </div>

          <aside className="syn-svc-clocks">
            <div className="syn-svc-clock syn-svc-clock--hot">
              <p className="syn-svc-clock-head"><i />{L("START", "DÉMARRAGE")} <span>48H</span></p>
              <p className="syn-svc-clock-desc">{L("Audit, profiling and a written costed plan within two days.", "Audit, profilage et un plan écrit et costé sous deux jours.")}</p>
            </div>
            <div className="syn-svc-clock">
              <p className="syn-svc-clock-head">{L("SAFETY DATES", "DATES DE SÛRETÉ")} <span>{L("AFTER THE AUDIT", "APRÈS L'AUDIT")}</span></p>
              <p className="syn-svc-clock-desc">{L("Committed only once we've seen your code — never before.", "Engagées seulement une fois votre code vu — jamais avant.")}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="syn-stats" aria-label={L("Key figures", "Chiffres clés")}>
        {stats.map((s) => (
          <div key={s.label}>
            <p className={s.accent ? "is-accent" : ""}>{s.value}</p>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      <section className="syn-section" id="why">
        <p className="syn-eyebrow">{L("WHY THIS RIG", "POURQUOI CETTE CONFIGURATION")}</p>
        <h2 className="syn-title">{L("What these two tracks guarantee you", "Ce que ces deux modèles vous garantissent")}</h2>
        <p className="syn-intro">{L("What both models have in common: the start is fast, and the safety-critical dates are never promised before the audit.", "Ce que les deux modèles ont en commun : le démarrage est rapide, et les dates de sûreté critique ne sont jamais promises avant l'audit.")}</p>
        <div className="syn-svc-why">
          {why.map(([title, desc], index) => (
            <article key={title}><span>{`0${index + 1}`}</span><h3>{title}</h3><p>{desc}</p></article>
          ))}
        </div>
      </section>

      <section className="syn-section syn-section--alt" id="wait">
        <div className="syn-svc-wait">
          <div>
            <p className="syn-eyebrow">{L("COST OF WAITING", "COÛT DE L'ATTENTE")}</p>
            <h2 className="syn-title syn-svc-wait-h2">{L("The real cost is waiting", "Le vrai coût, c'est d'attendre")}</h2>
          </div>
          <div>
            <p className="syn-intro">{L("Every week an Edge AI milestone stays blocked has a direct cost: a delayed investor milestone, a hesitant client, a competitor pulling ahead. The feasibility audit exists to stop that bleeding in 48 hours, not a quarter.", "Chaque semaine où un jalon Edge AI reste bloqué a un coût direct : jalon investisseur repoussé, client qui hésite, concurrent qui avance. L'audit de faisabilité existe pour arrêter cette hémorragie en 48h, pas en trimestre.")}</p>
            <a href="#tracks" className="syn-svc-inline-link">{L("SEE THE TWO TRACKS", "VOIR LES DEUX MODÈLES")} <ArrowRight size={14} /></a>
          </div>
        </div>
      </section>

      <section className="syn-section" id="tracks">
        <p className="syn-eyebrow">{L("TWO TRACKS", "DEUX MODÈLES")}</p>
        <h2 className="syn-title">{L("Pick the one that matches where you are", "Choisissez selon l'état de votre jalon")}</h2>
        <p className="syn-intro">{L("A blocked milestone closed in a month, or reserved senior capacity over time. Both start from the same 48-hour audit.", "Un jalon bloqué débloqué en un mois, ou une capacité senior réservée dans la durée. Les deux démarrent du même audit 48h.")}</p>
        <div className="syn-offer-grid">
          {OFFRES_DATA.map((offre) => {
            const localized = getLocalizedOffre(offre, locale);
            const badge = fr ? (offre.category === "sprint" ? sprintBadgeFr : retainerBadgeFr) : (offre.category === "sprint" ? sprintBadge : retainerBadge);
            const label = fr ? (offre.category === "sprint" ? sprintLabelFr : retainerLabelFr) : (offre.category === "sprint" ? sprintLabel : retainerLabel);
            return (
              <article key={offre.slug} className={`syn-offer ${offre.highlight ? "syn-offer--accent" : ""}`}>
                <div className="syn-offer-top"><strong>{localized.nom} <b>{badge}</b></strong><small>{label}</small></div>
                <h3>{localized.tagline}</h3>
                <p>{localized.description}</p>
                <ul>
                  {localized.features.slice(0, 4).map((feature) => <li key={feature.text}>{feature.text}</li>)}
                </ul>
                <div className="syn-offer-foot">
                  <p className="syn-price">{localized.prix} <span>{localized.priceUnit}</span></p>
                  <small className="syn-svc-pricenote">{localized.priceNote}</small>
                  <p className="syn-svc-capacity"><ShieldCheck size={14} /> {localized.capacityNote}</p>
                  <div className="syn-svc-actions">
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent({ event: "calendly_click", href: calendlyUrl, source: `services_card_${offre.slug}` })}
                      className="syn-button"
                    >
                      {localized.cta} <ArrowRight size={15} />
                    </a>
                    <Link href={`/services/${offre.slug}`} className="syn-button syn-button--secondary">{t.services.learnMore}</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="syn-svc-rules" id="rules">
        <p className="syn-eyebrow">{L("RULES OF ENGAGEMENT", "RÈGLES D'ENGAGEMENT")}</p>
        <h2 className="syn-title">{L("What doesn't move, whichever track you pick", "Ce qui ne bouge pas, quel que soit le modèle")}</h2>
        <p className="syn-intro">{L("Everything else can be sized to the engagement. These four cannot.", "Tout le reste se dimensionne à l'engagement. Ces quatre-là, non.")}</p>
        <div className="syn-svc-rules-grid">
          {rules.map(([title, desc], index) => (
            <article key={title}><span>{`0${index + 1}`}</span><h3>{title}</h3><p>{desc}</p></article>
          ))}
        </div>
      </section>

      <section className="syn-contact" id="contact">
        <h2>{t.services.cta}</h2>
        <p>{L("Let's take 30 minutes on your technical context: blocked milestone, target hardware, goal timeline. A straight answer, no sales layer.", "Prenons 30 minutes sur votre contexte technique : jalon bloqué, hardware cible, calendrier visé. Une réponse droite, sans couche commerciale.")}</p>
        <div>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent({ event: "calendly_click", href: calendlyUrl, source: "services_bottom" })}
            className="syn-button"
          >
            {t.services.ctaButton} <ArrowRight size={15} />
          </a>
        </div>
        <small>{L("No sales team, no account manager. You talk directly to the engineers who do the work.", "Pas d'équipe commerciale, pas de chargé de compte. Vous parlez directement aux ingénieurs qui font le travail.")}</small>
      </section>

      <Footer />
    </main>
  );
}