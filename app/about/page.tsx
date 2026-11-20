"use client";

import { ArrowRight } from "lucide-react";
import Footer from "@/app/components/Footer";
import { trackEvent } from "@/lib/track";
import { useScrollReveal } from "@/app/components/useScrollReveal";
import { useLanguage } from "@/app/i18n/LanguageContext";

const calendlyUrl = "https://calendly.com/remiboivin021/diagnostic";

const stats = [
  ["94", "ms", "VLA p99, ORIN NX"],
  ["4.4", "×", "MEDIAN SPEEDUP"],
  ["2", "yrs", "FOUNDER XP IN EDGE AI"],
];

const chips = ["ROS 2", "TensorRT", "CUDA", "Jetson Orin", "HIL rigs", "SORA"];

const principles = [
  ["01", "Latency is a safety property", "A loop you cannot bound is a hazard you cannot document. We treat p99 as a requirement with a number next to it, agreed before work starts."],
  ["02", "Determinism over cleverness", "The supervisor is deliberately dumb: a finite state machine, fully testable, independent of the policy it guards. Boring is the feature."],
  ["03", "Measure on the target", "Workstation numbers are marketing. Every figure we publish comes off the deployed board, thermally soaked, at the duty cycle you actually run."],
  ["04", "Hand back the toolchain", "Engagements end with your team able to re-run the benchmarks and rebuild every artifact without us in the room."],
];

const engagements = [
  ["2025", "Industrial manipulator", "tier-1 automotive", "VLA policy taken from 412ms to 94ms p99; safety wrapper validated against the internal FSM specification.", "4.4×"],
  ["2024", "UAS inspection platform", "EU integrator", "An unstable prototype rebuilt into a ministry-grade demonstrator in four weeks. Outcome: a two-year contract.", "4 wk"],
];

function L(en: string, fr: string, isFr: boolean) {
  return isFr ? fr : en;
}

export default function AboutPage() {
  const { locale } = useLanguage();
  const isFr = locale === "fr";

  const trackBook = () => trackEvent({ event: "calendly_click", href: calendlyUrl, source: "about_cta" });

  useScrollReveal(".syn-services", ".syn-about-hero");

  return (
    <main className="syn-site">
      <section className="syn-about-hero">
        <div className="syn-about-hero-inner">
          <p className="syn-about-eyebrow">{L("/ ABOUT SYNOBOTIX", "/ À PROPOS DE SYNOBOTIX", isFr)}</p>
          <h1>
            {isFr ? (<>
              {"Les modèles n'échouent pas sur le benchmark."}
              <br />
              {"Ils échouent à "}<span>94 millisecondes.</span>
            </>) : (<>
              {"Models don't fail on the benchmark."}
              <br />
              {"They fail at "}<span>94 milliseconds.</span>
            </>)}
          </h1>
          <p className="syn-about-hero-copy">{L(
            "We are an edge AI engineering firm working at the seam between learned policy and physical actuation: inference optimization, deterministic safety wrappers, and the hardware-in-the-loop evidence that lets someone sign off on both.",
            "Nous sommes un bureau d'ingénierie Edge AI, à la couture entre la politique apprise et l'action physique : optimisation d'inférence, wrappers de sécurité déterministes, et la preuve hardware-in-the-loop qui permet de signer les deux.",
            isFr,
          )}</p>
        </div>
        <svg className="syn-about-svg" viewBox="0 0 1280 200" preserveAspectRatio="none" aria-hidden="true">
          <path className="syn-about-dash" d="M0 150 L80 150 L110 108 L160 108 L180 165 L240 165 L270 80 L320 80 L350 148 L420 148 L450 95 L510 95 L540 166 L600 166 L630 92 L700 92 L728 146 L798 146 L824 112 L900 112 L928 160 L1000 160 L1028 100 L1100 100 L1128 142 L1280 142" />
          <path className="syn-about-base" d="M0 185 L120 185 L160 163 L280 163 L320 189 L460 189 L500 157 L640 157 L680 183 L820 183 L860 161 L1000 161 L1040 187 L1180 187 L1220 163 L1280 163" />
        </svg>
      </section>

      <section className="syn-stats syn-about-stats">
        {stats.map(([value, unit, label]) => (
          <div key={label}>
            <p>{value}<span>{unit}</span></p>
            <p>{label}</p>
          </div>
        ))}
      </section>

      <section className="syn-section">
        <div className="syn-about-origin">
          <div>
            <p className="syn-about-eyebrow">{L("/ WHERE THIS CAME FROM", "/ D'OÙ ÇA VIENT", isFr)}</p>
            <h2>{L("Two years of watching good models fail on the floor.", "Deux ans à voir de bons modèles échouer sur le terrain.", isFr)}</h2>
          </div>
          <div className="syn-about-origin-copy">
            <p>{L(
              "I started Synobotix because of a pattern I kept meeting from the inside: a perception stack that demoed beautifully, then drifted to 400ms under load, then could not be certified because nobody could put a bound on it.",
              "J'ai fondé Synobotix parce qu'un schéma ne cessait de revenir de l'intérieur : une stack de perception qui démontre magnifiquement, dérive vers 400ms sous charge, puis ne peut pas être certifiée parce que personne ne peut la borner.",
              isFr,
            )}</p>
            <p>{L(
              "I built the firm around that gap. Not the research, not the product. The engineering in between: quantization that survives validation, kernels fused against a real thermal envelope, and control paths that degrade to a known state rather than to whatever the network last emitted.",
              "J'ai monté le bureau autour de cet écart. Pas la recherche, pas le produit. L'ingénierie entre les deux : quantification qui survit à la validation, kernels fusionnés contre une vraie enveloppe thermique, et des chemins de contrôle qui dégradent vers un état connu au lieu de répéter la dernière sortie du réseau.",
              isFr,
            )}</p>
            <div className="syn-about-chips">
              {chips.map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="syn-section syn-section--alt">
        <p className="syn-about-eyebrow">{L("/ HOW WE ENGINEER", "/ COMMENT NOUS TRAVAILLONS", isFr)}</p>
        <div className="syn-about-principles-grid">
          {principles.map(([number, title, text]) => (
            <article className="syn-about-principle" key={number}>
              <div><span>{number}</span><h3>{L(title, frenchPrinciples[number] ?? title, isFr)}</h3></div>
              <p>{L(text, frenchPrincipleTexts[number] ?? text, isFr)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="syn-section">
        <div className="syn-about-engagements">
          <div className="syn-about-eng-head">
            <p className="syn-about-eyebrow" style={{ marginBottom: 0 }}>{L("/ SELECTED ENGAGEMENTS", "/ ENGAGEMENTS SÉLECTIONNÉS", isFr)}</p>
            <small>{L("WORK PRIOR TO FOUNDING · CLIENT NAMES UNDER NDA", "MISSIONS AVANT LA CRÉATION · NOMS CLIENTS SOUS NDA", isFr)}</small>
          </div>
          {engagements.map(([year, client, tag, desc, metric]) => (
            <div className="syn-about-eng-row" key={year}>
              <span className="syn-about-eng-year">{year}</span>
              <span className="syn-about-eng-client">{L(client, frenchClients[year] ?? client, isFr)}<small>{L(tag, frenchTags[year] ?? tag, isFr)}</small></span>
              <span className="syn-about-eng-desc">{L(desc, frenchEngagementTexts[year] ?? desc, isFr)}</span>
              <span className="syn-about-eng-metric">{metric}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="syn-about-cta">
        <div className="syn-about-sweep" />
        <div className="syn-about-cta-inner">
          <div>
            <h2>{L("Bring us the loop you can't bound.", "Apportez-nous la boucle que vous ne pouvez pas borner.", isFr)}</h2>
            <p>{L(
              "Thirty minutes with the engineer who would do the work. You leave with a feasibility read and a latency target: deck optional, usually absent.",
              "Trente minutes avec l'ingénieur qui ferait le travail. Vous repartez avec une lecture de faisabilité et une cible de latence : deck optionnel, généralement absent.",
              isFr,
            )}</p>
          </div>
          <div className="syn-about-cta-side">
            <a href={calendlyUrl} target="_blank" rel="noreferrer" className="syn-button" onClick={trackBook}>{L("BOOK A TECHNICAL CALL", "RÉSERVER UN APPEL TECHNIQUE", isFr)} <ArrowRight size={15} /></a>
            <small>Nice / Sophia Antipolis, FR</small>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const frenchPrinciples: Record<string, string> = {
  "01": "La latence est une propriété de sûreté",
  "02": "Le déterminisme avant l'ingéniosité",
  "03": "Mesurer sur la cible",
  "04": "Rendre la toolchain",
};
const frenchPrincipleTexts: Record<string, string> = {
  "01": "Une boucle que l'on ne peut pas borner est un danger que l'on ne peut pas documenter. Nous traitons le p99 comme une exigence chiffrée, validée avant de commencer.",
  "02": "Le superviseur est volontairement simple : une machine à états finis, entièrement testable, indépendante de la politique qu'elle surveille. L'ennui est une fonctionnalité.",
  "03": "Les chiffres de workstation sont du marketing. Chaque chiffre publié sort de la carte déployée, en régime thermique, au duty cycle réel.",
  "04": "Les engagements se terminent avec votre équipe capable de relancer les benchmarks et de reconstruire chaque artefact sans nous.",
};
const frenchClients: Record<string, string> = {
  "2025": "Manipulateur industriel",
  "2024": "Plateforme d'inspection UAS",
};
const frenchTags: Record<string, string> = {
  "2025": "automotive tier-1",
  "2024": "intégrateur EU",
};
const frenchEngagementTexts: Record<string, string> = {
  "2025": "Politique VLA passée de 412ms à 94ms p99 ; wrapper de sécurité validé contre la spec FSM interne.",
  "2024": "Un prototype instable reconstruit en démonstrateur standard ministère en quatre semaines. Résultat : un contrat de deux ans.",
};