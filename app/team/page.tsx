"use client";

import { ArrowRight } from "lucide-react";
import Footer from "@/app/components/Footer";
import { trackEvent } from "@/lib/track";
import { useScrollReveal } from "@/app/components/useScrollReveal";
import { useLanguage } from "@/app/i18n/LanguageContext";

const calendlyUrl = "https://calendly.com/remiboivin021/diagnostic";

const stats = [
  ["3", "", "SENIOR ENGINEERS"],
  ["0", "", "JUNIORS OR SUBCONTRACTORS"],
];

const values = [
  ["Embedded in your team", "Your repo, your standups, your review board. We work inside your process rather than around it."],
  ["Built to leave", "Every engagement ends with your engineers able to rebuild, retrain and redeploy without us. Teaching is part of the deliverable."],
  ["Write it down or it did not happen", "If it is not written and tested, it is not shipped. A safety reviewer has to be able to read the envelope spec and agree with it."],
];

const members = [
  { name: "Rémi Boivin", role: "FOUNDER · EDGE AI & SAFETY" },
  { name: "Jonathan R.", role: "TECH LEAD" },
  { name: null, role: "VALIDATION · HIL & PX4" },
  { name: null, role: "DEPLOYMENT · CUDA & QUANTISATION" },
];

const frenchValues: Record<string, string> = {
  "Embedded in your team": "Intégrés à votre équipe",
  "Built to leave": "Conçus pour partir",
  "Write it down or it did not happen": "Écrit ou ça n'a pas eu lieu",
};
const frenchValueTexts: Record<string, string> = {
  "Embedded in your team": "Votre repo, vos standups, votre revue. Nous travaillons à l'intérieur de votre process plutôt qu'à côté.",
  "Built to leave": "Chaque engagement se termine avec vos ingénieurs capables de reconstruire, réentraîner et redéployer sans nous. Transmettre fait partie du livrable.",
  "Write it down or it did not happen": "Si ce n'est pas écrit et testé, ce n'est pas livré. Un relecteur sûreté doit pouvoir lire la spec d'enveloppe et l'accepter.",
};

function L(en: string, fr: string, isFr: boolean) {
  return isFr ? fr : en;
}

export default function TeamPage() {
  const { locale } = useLanguage();
  const isFr = locale === "fr";

  const trackBook = () => trackEvent({ event: "calendly_click", href: calendlyUrl, source: "team_cta" });

  useScrollReveal(".syn-site", ".syn-about-hero");

  return (
    <main className="syn-site">
      <section className="syn-about-hero">
        <div className="syn-about-hero-inner">
          <p className="syn-about-eyebrow">{L("/ TEAM · WHO WE ARE", "/ ÉQUIPE · QUI NOUS SOMMES", isFr)}</p>
          <h1>
            {isFr ? (<>
              {"Une petite agence de"}
              <br />
              {"roboticien senior."}
            </>) : (<>
              {"A small agency of senior"}
              <br />
              {"robotics "}<span>engineers.</span>
            </>)}
          </h1>
          <p className="syn-about-hero-copy">{L(
            "No pyramid, no bench of juniors learning your stack on your budget. You get engineers who have shipped physical systems, working directly with your team and answering to your program lead.",
            "Pas de pyramide, pas de banc de juniors qui apprennent votre stack sur votre budget. Vous obtenez des ingénieurs qui ont livré des systèmes physiques, travaillant directement avec votre équipe et répondant à votre chef de programme.",
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
        <p className="syn-eyebrow">WHO WE ARE</p>
        <h2 className="syn-title">A small agency of senior robotics engineers</h2>
        <p className="syn-intro">{L(
          "No pyramid, no bench of juniors learning your stack on your budget. You get engineers who have shipped physical systems, working directly with your team and answering to your program lead.",
          "Pas de pyramide, pas de banc de juniors qui apprennent votre stack sur votre budget. Vous obtenez des ingénieurs qui ont livré des systèmes physiques, travaillant directement avec votre équipe et répondant à votre chef de programme.",
          isFr,
        )}</p>
        <div className="syn-team-values">
          {values.map(([title, text], index) => (
            <article key={title} className={index === 0 ? "syn-team-values--accent" : ""}>
              <h3>{L(title, frenchValues[title] ?? title, isFr)}</h3>
              <p>{L(text, frenchValueTexts[title] ?? text, isFr)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="syn-section syn-section--alt">
        <p className="syn-eyebrow">{L("THE ENGINEERS", "LES INGÉNIEURS", isFr)}</p>
        <h2 className="syn-title">{L("Named on the program, start to handover", "Nommés sur le programme, du début à la passation", isFr)}</h2>
        <p className="syn-intro">{L(
          "Two engineers, one rule: the people you meet are the people who do the work. No delivery managers, no utilisation targets, no anonymous handoffs.",
          "Deux ingénieurs, une règle : les personnes que vous rencontrez sont celles qui font le travail. Pas de chef de projet, pas d'objectifs d'utilisation, pas de passation anonyme.",
          isFr,
        )}</p>
        <div className="syn-team-grid">
          {members.map((member, index) => (
            <article key={index}>
              <div className="syn-team-avatar">{member.name ? member.name.split(" ").map((n) => n[0]).join("") : "—"}</div>
              <b>{member.name ?? L("Reserved for the mission", "Réservé pour la mission", isFr)}</b>
              <span>{L(member.role, member.role, isFr)}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="syn-about-cta">
        <div className="syn-about-sweep" />
        <div className="syn-about-cta-inner">
          <div>
            <h2>{L("Meet the engineers before you sign.", "Rencontrez les ingénieurs avant de signer.", isFr)}</h2>
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
