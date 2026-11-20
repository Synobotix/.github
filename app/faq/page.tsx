"use client";

import Link from "next/link";
import { ArrowLeft, CircleHelp } from "lucide-react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import posthog from "posthog-js";

export default function FaqPage() {
  const { t, locale } = useLanguage();

  const faqs = [
    {
      q: locale === "fr" ? "Pourquoi votre prix reflète-t-il des semaines et pas un taux horaire ?" : "Why does your price reflect weeks, not an hourly rate?",
      a: locale === "fr"
        ? "Parce que vous ne louez pas des heures, vous louez l'absence de montée en compétence. Un nouvel ingénieur senior met 3 à 6 mois à devenir productif sur votre stack ; nos ingénieurs démarrent dès le premier jour de l'audit sous 48h. Le prix reflète le résultat livré en semaines, pas un taux horaire."
        : "Because you're not renting hours, you're renting the absence of ramp-up. A new senior hire takes 3-6 months to reach working fluency on your stack. Our engineers start on day one of the 48-hour audit. The price reflects the outcome delivered in weeks, not an hourly rate.",
    },
    {
      q: locale === "fr" ? "Que se passe-t-il si un ingénieur est indisponible en cours de Sprint ou de Retainer ?" : "What happens if an engineer is unavailable mid-Sprint or mid-Retainer?",
      a: locale === "fr"
        ? "Contrairement à un prestataire solo, l'indisponibilité d'un membre de l'équipe ne bloque pas votre Sprint : la continuité est assurée en interne, sans passation externe et sans jour non facturé perdu de votre côté."
        : "Unlike a solo freelancer, one engineer's unavailability doesn't block your Sprint: continuity is handled internally, with no external handoff and no lost billed day on your side.",
    },
    {
      q: locale === "fr" ? "Que se passe-t-il si mon besoin dépasse ce qu'un Sprint peut livrer ?" : "What if my need exceeds what one Sprint can deliver?",
      a: locale === "fr"
        ? "Nous vous le disons directement. C'est le principe. Les Milestone Sprints sont volontairement cadrés sur un résultat unique. Si votre besoin dépasse réellement ce périmètre, soit on enchaîne plusieurs Sprints, soit on dimensionne un Tactical Retainer, et nous vous l'annonçons plutôt que de sur-promettre."
        : "We'll tell you directly. That's the deal. Milestone Sprints are deliberately scoped to one bounded outcome. If your need genuinely exceeds that scope, we either sequence multiple Sprints or size a Tactical Retainer instead, and we'll say so rather than overcommitting.",
    },
    {
      q: locale === "fr" ? "Comment garantissez-vous la continuité si un projet s'étend sur plusieurs mois ?" : "How do you guarantee continuity on a project spanning several months?",
      a: locale === "fr"
        ? "Chaque livrable inclut le code source, les données de benchmark et un contrat d'interface documenté : la connaissance n'est jamais concentrée dans une seule tête. Si un ingénieur change de rôle sur le projet, la transition ne repart jamais de zéro."
        : "Every deliverable ships with source code, benchmark data, and a documented interface contract: knowledge is never concentrated in a single head. If an engineer's role on the project changes, the transition never starts from zero.",
    },
    {
      q: locale === "fr" ? "Pouvez-vous vraiment livrer une validation de sûreté critique dans ce délai ?" : "Can you really deliver safety-critical validation in this timeframe?",
      a: locale === "fr"
        ? "Pas à l'aveugle. C'est pourquoi le calendrier de sûreté critique ne fait jamais partie du démarrage 48h. L'audit détermine d'abord le périmètre réel et classe les risques ; l'engagement de date pour le travail critique arrive après, sous forme de plage, jamais avant sous forme de promesse."
        : "Not blind. That's why the safety-critical timeline is never part of the 48-hour start. The audit determines the real scope and risk classification first; the committed date range for critical work comes after, never promised before.",
    },
    {
      q: locale === "fr" ? "Est-ce que la qualité baisse si vous prenez plus de clients ?" : "Does quality drop as you take on more clients?",
      a: locale === "fr"
        ? "Non. Nous scalons en ajoutant des ingénieurs seniors supplémentaires, jamais des juniors ni de la sous-traitance. Le nombre de clients change, notre niveau d'exigence non."
        : "No, we scale by adding more senior engineers, never juniors or subcontractors. The number of clients changes, our bar for the work doesn't.",
    },
    {
      q: locale === "fr" ? "Faut-il déjà avoir un modèle IA fonctionnel ?" : "Do we need to already have a working AI model?",
      a: locale === "fr"
        ? "Oui. Nous partons de votre modèle VLA/LLM existant pour l'optimiser et l'intégrer. Nous ne formons pas de modèles : nous les rendons exploitables et sûrs sur du hardware physique."
        : "Yes. We start from your existing VLA/LLM model to optimize and integrate it. We don't train models: we make them field-deployable and safe on physical hardware.",
    },
    {
      q: locale === "fr" ? "Quel hardware supportez-vous ?" : "What hardware do you support?",
      a: locale === "fr"
        ? "NVIDIA Jetson, NPUs, TPUs, et toute plateforme Edge. L'optimisation est adaptée à votre cible matérielle spécifique, le wrapper de sécurité open-source publié sur la page Preuve montre la méthodologie exacte."
        : "NVIDIA Jetson, NPUs, TPUs, and any edge platform. Optimization is adapted to your specific hardware target, the open-source safety wrapper on the Proof page shows the exact methodology.",
    },
  ];

  const qapageJsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qapageJsonLd) }}
      />
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition text-sm font-medium">
            <ArrowLeft size={16} /> {t.nav.backToSite}
          </Link>
          <div className="text-white font-bold tracking-wider">SYNOBOTIX</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            {locale === "fr" ? "Questions fréquentes" : "Frequently Asked Questions"}
          </h1>
          <p className="text-xl text-slate-400">
            {locale === "fr"
              ? "Les questions techniques et commerciales qu'on nous pose avant de s'engager, et les réponses directes."
              : "The technical and commercial questions we get asked before people commit, and the direct answers."}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-start gap-3 mb-3">
                <CircleHelp className="mt-1 shrink-0 text-blue-400" size={18} />
                <h3 className="text-white font-bold">{faq.q}</h3>
              </div>
              <p className="ml-7 text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 bg-slate-900 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">
            {locale === "fr" ? "Vous avez une autre question ?" : "Do you have another question?"}
          </h3>
          <p className="text-slate-400 mb-6">
            {locale === "fr"
              ? "Réservez un diagnostic technique de 30 minutes pour en parler directement."
              : "Book a 30-minute technical diagnostic to talk it through directly."}
          </p>
          <Link
            href="/contact"
            onClick={() => posthog.capture("faq_contact_clicked")}
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {locale === "fr" ? "Nous contacter" : "Contact us"}
          </Link>
        </div>
      </main>
    </div>
  );
}
