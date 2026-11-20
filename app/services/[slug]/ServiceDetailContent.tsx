"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, CircleHelp, ShieldCheck, Target } from "lucide-react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import type { Offre } from "@/data/offres";
import { trackEvent } from "@/lib/track";
import posthog from "posthog-js";

interface ServiceDetailContentProps {
  offre: Offre;
}

const calendlyUrl = "https://calendly.com/remiboivin021/diagnostic";

const slugContent: Record<
  string,
  {
    idealFor: string[];
    outcomes: string[];
    objections: { q: string; a: string }[];
    idealForEn?: string[];
    outcomesEn?: string[];
    objectionsEn?: { q: string; a: string }[];
  }
> = {
  "milestone-sprint": {
    idealFor: [
      "Un jalon Edge AI bloque un jalon investisseur, client ou réglementaire, chaque semaine de retard a un coût direct.",
      "L'inférence de votre modèle VLA/LLM est trop lente sur le hardware cible (Jetson, NPU, TPU), et personne en interne ne sait pourquoi.",
      "Vous avez besoin d'une couche de sûreté déterministe avant qu'un système physique n'entre en zone de risque.",
      "Un audit externe précédent vous a donné un rapport de 40 pages sans plan d'action exploitable.",
      "Vous devez donner une date crédible à votre board cette semaine, pas dans deux mois.",
    ],
    idealForEn: [
      "A blocked Edge AI milestone is holding up an investor, client, or regulatory deadline, every week of delay has a direct cost.",
      "Your VLA/LLM model's inference is too slow on target hardware (Jetson, NPU, TPU), and no one in-house knows why.",
      "You need a deterministic safety layer before a physical system enters real risk.",
      "A previous external audit gave you a 40-page report with no actionable plan.",
      "You need to give your board a credible date this week, not in two months.",
    ],
    outcomes: [
      "Rapport d'audit écrit et plan cadré sous 48h : un diagnostic, pas un devis.",
      "Latence d'inférence mesurée, optimisée et documentée, méthodologie reproductible par votre équipe.",
      "Wrapper de sécurité déterministe et benchmarks HIL publiés (p50/p95/p99), prêts pour un investisseur ou un auditeur.",
      "Classification de risques écrite : vous répondez à « c'est sûr ? » avec des faits, pas une intuition.",
      "Handoff complet : code, contrat d'interface, registre de risques, votre équipe reprend la main sans dépendance cachée.",
    ],
    outcomesEn: [
      "A written audit report and a scoped plan within 48 hours: a diagnosis, not a quote.",
      "Measured, optimized, and documented inference latency, with a methodology your team can reproduce.",
      "A deterministic safety wrapper and published HIL benchmarks (p50/p95/p99), ready for an investor or an auditor.",
      "A written risk classification: you answer \"is it safe?\" with facts, not a gut feeling.",
      "A full handoff: code, interface contract, risk register, your team takes over with no hidden dependency.",
    ],
    objections: [
      {
        q: "Pourquoi le prix reflète-t-il des semaines et pas un taux horaire ?",
        a: "Vous ne payez pas des heures, vous payez l'absence de montée en compétence. Un senior externe met 3 à 6 mois à devenir productif sur votre stack. Nos ingénieurs démarrent dès le premier jour de l'audit. Le prix reflète le résultat livré en semaines, pas un taux horaire.",
      },
      {
        q: "Et si mon besoin dépasse ce qu'un Sprint peut livrer ?",
        a: "Nous vous le disons directement. C'est le principe. Le Sprint est volontairement cadré sur un résultat unique. Si votre besoin dépasse vraiment ce périmètre, on enchaîne plusieurs Sprints, ou on dimensionne un Tactical Retainer, et nous vous l'annonçons plutôt que de sur-promettre.",
      },
      {
        q: "Pouvez-vous vraiment livrer une validation de sûreté critique dans ce délai ?",
        a: "Pas à l'aveugle. C'est pourquoi le calendrier de sûreté critique ne fait pas partie des 48h. L'audit détermine d'abord le périmètre réel ; l'engagement de date arrive après, pas avant.",
      },
    ],
    objectionsEn: [
      {
        q: "Why does the price reflect weeks, not an hourly rate?",
        a: "You're not renting hours, you're renting the absence of ramp-up. A new senior hire takes 3-6 months to reach working fluency on your stack. Our engineers start on day one of the audit. The price reflects the outcome delivered in weeks, not an hourly rate.",
      },
      {
        q: "What if my need exceeds what one Sprint can deliver?",
        a: "We'll tell you directly. That's the deal. The Sprint is deliberately scoped to one bounded outcome. If your need genuinely exceeds that scope, we either sequence multiple Sprints or size a Tactical Retainer instead, and we'll say so rather than overcommitting.",
      },
      {
        q: "Can you really deliver safety-critical validation in this timeframe?",
        a: "Not blind. That's why the safety-critical timeline isn't part of the 48-hour start. The audit determines the real scope first; the committed date comes after, not before.",
      },
    ],
  },
  "tactical-retainer": {
    idealFor: [
      "Vous accélérez une roadmap Edge AI sans vouloir passer 6 à 9 mois à recruter un profil senior rare.",
      "Vous avez besoin d'une capacité continue, pas d'un projet qui s'arrête au premier livrable.",
      "La sûreté de fonctionnement de vos systèmes doit être revalidée à mesure que le produit évolue.",
      "Votre roadmap change plus vite que votre capacité de recrutement, vous avez besoin d'élasticité, pas d'un CDI.",
      "Vous voulez un seul point de contact technique sur plusieurs jalons, pas un nouveau prestataire à chaque fois.",
    ],
    idealForEn: [
      "You're accelerating an Edge AI roadmap without spending 6-9 months recruiting a rare senior profile.",
      "You need continuous engineering capacity, not a project that stops after the first deliverable.",
      "Your systems' safety posture needs to be re-validated as the product evolves.",
      "Your roadmap moves faster than your hiring pipeline, you need elasticity, not a full-time hire.",
      "You want one technical point of contact across multiple milestones, not a new vendor every time.",
    ],
    outcomes: [
      "Équipe dédiée d'ingénieurs seniors nommés, extensible selon la charge, sans juniors ni sous-traitance.",
      "Feuille de route mensuelle, jalons scopés et vérifiables : avancement visible, pas une facture surprise en fin de mois.",
      "Validation HIL à chaque jalon : la sûreté tient dans le temps, pas seulement au lancement.",
      "Roadmap technique vivante, révisée avec vous à chaque cycle, jamais figée en début de contrat.",
    ],
    outcomesEn: [
      "A dedicated team of named senior engineers, scalable with your load, no juniors, no subcontracting.",
      "Monthly roadmap, scoped and verifiable milestones: visible progress, not a surprise invoice at month's end.",
      "HIL validation at every milestone: safety holds up over time, not just at launch.",
      "A living technical roadmap, revisited with you every cycle, never frozen at contract signature.",
    ],
    objections: [
      {
        q: "Pourquoi pas simplement embaucher un ingénieur senior à temps plein ?",
        a: "Vous pouvez, mais un profil combinant Edge AI, C++ bas niveau et sûreté robotique se recrute rarement en moins de 6 à 9 mois. Le Tactical Retainer vous donne cette capacité tout de suite, sans risque de recrutement raté.",
      },
      {
        q: "Que se passe-t-il si l'ingénieur assigné est indisponible en cours de retainer ?",
        a: "La continuité est assurée en interne, sans passation silencieuse à un sous-traitant non vérifié. Le contrat prévoit en plus un préavis écrit pour toute interruption planifiée, avec le temps de vous organiser.",
      },
    ],
    objectionsEn: [
      {
        q: "Why not just hire a full-time senior engineer?",
        a: "You can, but a profile combining Edge AI, low-level C++, and robotics safety is rarely hired in under 6-9 months. The Tactical Retainer gives you that capacity immediately, with no failed-recruitment risk.",
      },
      {
        q: "What happens if the assigned engineer is unavailable mid-retainer?",
        a: "Continuity is handled internally, with no silent handoff to an unvetted subcontractor. The contract also includes a stated notice period for any planned interruption, with time to plan around it.",
      },
    ],
  },
};

const defaultSlugContent = {
  idealFor: [
    "Un jalon d'ingénierie doit être débloqué rapidement.",
    "Vous voulez cadrer le bon niveau d'ambition avant de vous engager.",
  ],
  outcomes: [
    "Une trajectoire technique plus claire.",
    "Des livrables alignés avec votre enjeu réel.",
  ],
  objections: [
    {
      q: "Pouvez-vous adapter l'intervention au besoin exact ?",
      a: "Oui. Ces offres servent de cadre de décision ; l'accompagnement exact est ensuite calibré sur votre échéance et votre contexte.",
    },
  ],
};

export default function ServiceDetailContent({ offre }: ServiceDetailContentProps) {
  const { t, locale } = useLanguage();
  const isEnglish = locale === "en";
  const content = slugContent[offre.slug] ?? defaultSlugContent;

  const nom = isEnglish ? offre.nomEn ?? offre.nom : offre.nom;
  const tagline = isEnglish ? offre.taglineEn ?? offre.tagline : offre.tagline;
  const description = isEnglish ? offre.descriptionEn ?? offre.description : offre.description;
  const prix = isEnglish && offre.prixEn ? offre.prixEn : offre.prix;
  const priceUnit = isEnglish && offre.priceUnitEn ? offre.priceUnitEn : offre.priceUnit;
  const priceNote = isEnglish && offre.priceNoteEn ? offre.priceNoteEn : offre.priceNote;
  const capacityNote = isEnglish && offre.capacityNoteEn ? offre.capacityNoteEn : offre.capacityNote;
  const cta = isEnglish && offre.ctaEn ? offre.ctaEn : offre.cta;

  useEffect(() => {
    posthog.capture("service_detail_viewed", {
      service_slug: offre.slug,
      service_name: offre.nom,
      service_price: offre.prix,
      locale,
    });
  }, [offre.slug, offre.nom, offre.prix, locale]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-16 px-6 selection:bg-blue-600">
      <div className="max-w-5xl mx-auto">
        <Link href="/services" className="flex items-center gap-2 text-slate-500 hover:text-white transition mb-12 text-sm">
          <ArrowLeft size={16} /> {t.nav.backToSite}
        </Link>

        <header className="border-b border-slate-800 pb-12 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="max-w-3xl">
              <span className={`font-mono text-sm font-bold uppercase ${offre.highlight ? "text-blue-400" : "text-slate-500"}`}>
                {tagline}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-4">{nom}</h1>
              <p className="text-xl text-slate-400 mb-6">{description}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ event: "calendly_click", href: calendlyUrl, source: `detail_header_${offre.slug}` })}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700 transition"
                >
                  {cta}
                </a>
                <Link
                  href="/contact"
                  onClick={() => trackEvent({ event: "contact_page_view", source: `detail_header_${offre.slug}` })}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-4 font-bold text-slate-300 hover:bg-slate-900 transition"
                >
                  {t.nav.contact}
                </Link>
              </div>
            </div>

            <div className={`p-6 rounded-2xl text-center lg:text-right shrink-0 ${offre.highlight ? "bg-blue-600/10 border border-blue-500/30" : "bg-slate-900 border border-slate-800"}`}>
              <div className="text-slate-400 text-sm">{t.services.fixedPrice}</div>
              <div className="text-5xl font-extrabold text-white my-1">
                {prix}
                <span className="text-xl text-slate-500 font-medium ml-1">{priceUnit}</span>
              </div>
              <div className="text-slate-500 text-xs font-medium max-w-[220px]">{priceNote}</div>
              <div className="mt-3 flex items-center justify-center lg:justify-end gap-2 text-xs text-blue-300">
                <ShieldCheck size={14} className="shrink-0" /> {capacityNote}
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-12">
          <div className="space-y-12">
            <section className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h2 className="text-xl font-bold text-white mb-4">{t.services.startProject}</h2>
                <ul className="space-y-3">
                  {(isEnglish ? content.idealForEn ?? content.idealFor : content.idealFor).map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-300">
                      <Target size={18} className="text-blue-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h2 className="text-xl font-bold text-white mb-4">{isEnglish ? "Expected outcomes" : "Ce que cela change pour vous"}</h2>
                <ul className="space-y-3">
                  {(isEnglish ? content.outcomesEn ?? content.outcomes : content.outcomes).map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-300">
                      <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="text-blue-500" /> {t.services.technicalObjectives}
              </h2>
              <ul className="space-y-6">
                {offre.features.map((feature) => (
                  <li key={feature.text} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <div className="flex gap-3 items-center mb-2">
                      <CheckCircle2 size={20} className="text-blue-500 shrink-0" />
                      <h3 className="text-white font-bold">{isEnglish ? feature.textEn ?? feature.text : feature.text}</h3>
                    </div>
                    {feature.detail ? <p className="text-sm text-slate-400 pl-8">{isEnglish ? feature.detailEn ?? feature.detail : feature.detail}</p> : null}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-4">
                {isEnglish ? "How we scope the safety-critical timeline" : "Comment nous cadrons le calendrier de sûreté critique"}
              </h2>
              <div className="space-y-4 text-sm leading-6 text-slate-400">
                <p>
                  {isEnglish
                    ? "After the audit, you receive a written risk classification (which parts of your system are safety-relevant, and to what degree), a validation plan (what needs Hardware-in-the-Loop testing vs. simulation-only vs. code review, and why), and a committed date range, not a single optimistic date. Safety-critical work is not rushed to hit a marketing deadline."
                    : "Après l'audit, vous recevez une classification écrite des risques (quelles parties du système sont critiques pour la sûreté, et à quel degré), un plan de validation (ce qui nécessite du Hardware-in-the-Loop, de la simulation seule ou une revue de code, et pourquoi), et une plage de dates engagée, pas une date unique optimiste. Le travail de sûreté critique n'est jamais précipité pour tenir un délai marketing."}
                </p>
                <p>
                  {isEnglish
                    ? "This is the deliverable that turns \"48 hours\" from a slogan into a process: you're not buying a delivery date sight unseen, you're buying a fast, structured path to getting one."
                    : "C'est ce livrable qui transforme les « 48h » en processus plutôt qu'en slogan : vous n'achetez pas une date de livraison à l'aveugle, vous achetez un chemin rapide et structuré pour l'obtenir."}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <CircleHelp className="text-blue-500" /> {isEnglish ? "Frequently asked questions" : "Objections fréquentes"}
              </h2>
              <div className="space-y-4">
                {(isEnglish ? content.objectionsEn ?? content.objections : content.objections).map((item) => (
                  <div key={item.q} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <h3 className="text-white font-bold mb-2">{item.q}</h3>
                    <p className="text-sm text-slate-400">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 sticky top-10 space-y-6">
              <div>
                <CalendarDays className="text-blue-500 mb-4" size={32} />
                <h3 className="text-white font-bold mb-2">{isEnglish ? "Engagement starts within 48 hours" : "L'engagement démarre sous 48h"}</h3>
                <p className="text-sm text-slate-400">{priceNote}</p>
              </div>

              <div className="space-y-3">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ event: "calendly_click", href: calendlyUrl, source: `detail_sidebar_${offre.slug}` })}
                  className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-center hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  {cta}
                </a>
                <Link
                  href="/contact"
                  onClick={() => trackEvent({ event: "contact_page_view", source: `detail_sidebar_${offre.slug}` })}
                  className="w-full py-4 rounded-xl border border-slate-700 text-slate-300 font-bold text-center hover:bg-slate-800 transition flex items-center justify-center gap-2"
                >
                  {t.nav.contact}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
