"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OFFRES_DATA } from "@/data/offres";
import { trackEvent } from "@/lib/track";
import { useScrollReveal } from "@/app/components/useScrollReveal";
import Footer from "@/app/components/Footer";
import PipelineSchema from "@/app/components/PipelineSchema";

const calendlyUrl = "https://calendly.com/remiboivin021/diagnostic";
const offre = OFFRES_DATA.find((o) => o.slug === "tactical-retainer")!;

const workstreams: [string, string, string, boolean?][] = [
  ["01", "Model development", "Data strategy, architecture, training and evaluation against the physical task, not a benchmark."],
  ["02", "On board deployment", "Embedded compute, real power and thermal envelope, reproducible builds from source."],
  ["03", "Deterministic safety layer", "A hand written envelope around the learned policy, specified so your safety reviewer can read it and agree.", true],
  ["04", "Team and handover", "Hiring profiles, review rituals and the internal capability to keep shipping once we step back."],
];

const stats: [string, string, boolean?][] = [
  ["2 to 4", "NAMED SENIOR ENGINEERS"],
  ["Monthly", "ROADMAP AND DEMO CADENCE"],
  ["On board", "EVERY MILESTONE RUNS ON HARDWARE", true],
  ["6 months", "MINIMUM TERM, 60 DAY NOTICE"],
];

const steps: [string, string, string][] = [
  ["01", "Roadmap, agreed in writing", "Objectives, owners and the measurable exit condition for the month."],
  ["02", "Build inside your process", "Your repo, your standups, your review board. Commits land where your team can read them."],
  ["03", "Validate on the machine", "Hardware in the loop, thermally soaked, at the deployed power budget. Not a laptop demo."],
  ["04", "Transfer, then reset the scope", "Walkthrough with your engineers, artefacts handed over, next month scoped from what we learned."],
];

const handedOver = [
  "Trained model plus the training and evaluation pipeline that reproduces it",
  "Deployment image for the target board, built from source, reproducibly",
  "Safety layer specification a reviewer can read line by line",
  "HIL test suite and replayable logs of every validation run",
  "Hiring profiles and onboarding notes for the team that takes it over",
];

const quarters = [
  {
    label: "MONTH 01 · FOUNDATION",
    title: "Architecture and data strategy",
    body: "We take the requirement apart: the task the machine has to perform, the sensors it has, the compute it will carry and the review it has to pass. Then we write the system design and the data plan against it.",
    exit: "Signed system design, a data plan with sources identified, an instrumented baseline on the real board and a written definition of what \"good enough\" means for this program.",
  },
  {
    label: "MONTH 02 · FIRST POLICY ON BOARD",
    title: "A policy your machine actually runs",
    body: "First trained policy, first deployment onto embedded compute, first honest numbers under load. We would rather show you a narrow capability that holds than a broad one that only works on the bench.",
    exit: "Policy running on the target board inside the power and thermal envelope, tail latency measured, evaluation suite green and reproducible by your team.",
  },
  {
    label: "MONTH 03 · ENVELOPE AND HANDOVER",
    title: "Envelope, evidence, and your engineers",
    body: "The deterministic safety layer goes in and gets its specification. In parallel, your engineers start driving: they retrain, redeploy and break it while we are still in the room.",
    exit: "Safety wrapper with a written spec and a defined fail safe state, HIL suite handed over, and at least one of your engineers able to run the whole loop unassisted.",
  },
];

const sectors: [string, string][] = [
  ["UAS and drones", "On board perception and autonomy inside a tight power budget."],
  ["Ground robotics", "Manipulation and navigation with bounded, reviewable behaviour."],
  ["Industrial cells", "Vision guided automation that has to hold a cycle time."],
  ["Defence and dual use", "Export control aware engagements, artefacts built for review."],
];

const governance: [string, string][] = [
  ["IP", "Full assignment of code, weights and specs to you, engagement by engagement."],
  ["SAFETY EVIDENCE", "Envelope specification, fail safe definition and replayable validation logs."],
  ["DATA HANDLING", "Your data stays in your infrastructure. Training runs where you allow them to run."],
  ["EXPORT CONTROL", "Dual use aware staffing and documentation, confirmed against the applicable regime on a call."],
  ["EXIT", "After the 6 month minimum, stop with 60 days notice. Handover pack is produced continuously, not at the end."],
];

const faqs: [string, string][] = [
  ["Can we start with one month?", "The minimum is six months, because the first months buy design rather than a running system. If you want a single month of work with a hard deliverable, that is a Milestone Sprint."],
  ["Who owns the model?", "You do, including weights, training code and the safety layer. We keep no runtime licence and charge nothing per unit shipped."],
  ["Do you work on our hardware?", "Yes, and we would rather have two units of it on our bench from week one. Where that is impossible we build a representative HIL rig and say clearly what it does not cover."],
  ["What if we have no ML engineers?", "That is the normal case. Standing up that team is part of the engagement: profiles, screening, interviews and onboarding onto the system we built together."],
  ["How is progress reported?", "Weekly written note, monthly demo on hardware, and a running artefact repository your program lead can read without us in the room."],
  ["Will you tell us to stop?", "If the requirement cannot be met inside your envelope, yes, in writing, with what would have to change. We would rather lose the month than the reference."],
];

function ExternalButton({ children, secondary = false, source }: { children: React.ReactNode; secondary?: boolean; source: string }) {
  return (
    <a
      href={calendlyUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent({ event: "calendly_click", href: calendlyUrl, source })}
      className={`syn-button ${secondary ? "syn-button--secondary" : ""}`}
    >
      {children}
    </a>
  );
}

export default function TacticalRetainerContent() {
  const [month, setMonth] = useState(0);
  useScrollReveal(".syn-site");

  return (
    <main className="syn-site">
      <div className="syn-breadcrumb">
        <Link href="/">HOME</Link> / <Link href="/services">SERVICES</Link> / <span>TACTICAL RETAINER</span>
      </div>

      <section className="syn-hero">
        <div>
          <p className="syn-eyebrow">OUR MAIN ENGAGEMENT</p>
          <h1>We build the model,<br />then <span>the team</span><br />that owns it.</h1>
          <p className="syn-hero-copy">The Tactical Retainer is for programs that start from a requirement, not from a checkpoint. We put senior engineers on your problem, architect the system, build and validate the model end to end, bound it with a deterministic safety layer, and leave your own engineers able to carry it.</p>
          <p className="syn-hero-copy">Monthly commitment, monthly roadmap, no open ended discovery. If a Milestone Sprint is the better fit, we will say so on the first call.</p>
          <div className="syn-actions">
            <ExternalButton source="tactical_retainer_hero">DISCUSS A RETAINER <ArrowRight size={15} /></ExternalButton>
            <Link href="/services/milestone-sprint" className="syn-button syn-button--secondary">COMPARE WITH THE SPRINT</Link>
          </div>
          <p className="syn-note">Senior engineers · Your repo, your standups · Capability transfer written into the scope</p>
        </div>

        <div className="syn-workstreams">
          <div className="syn-workstreams-head">
            <span>WHAT THE RETAINER COVERS</span>
            <span>04 WORKSTREAMS</span>
          </div>
          <div>
            {workstreams.map(([number, title, text, accent]) => (
              <div key={number} className={`syn-workstream ${accent ? "syn-workstream--accent" : ""}`}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="syn-stats">
        {stats.map(([value, label, accent]) => (
          <div key={label}>
            <p className={accent ? "is-accent" : ""}>{value}</p>
            <p>{label}</p>
          </div>
        ))}
      </div>

      <section className="syn-section">
        <p className="syn-eyebrow">HOW IT RUNS</p>
        <h2 className="syn-title">A month is a unit of delivered work</h2>
        <p className="syn-intro">No retainer that bills for availability. Each month opens with a written roadmap you approve and closes with something running on the target machine, plus the artefacts that prove it.</p>
        <div className="syn-runs-grid">
          <div className="syn-steps">
            {steps.map(([number, title, text]) => (
              <div key={number} className="syn-step">
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
          <div>
            <p className="syn-checklist-head">WHAT LANDS IN YOUR HANDS</p>
            <div className="syn-checklist">
              {handedOver.map((item) => (
                <div key={item} className="syn-checklist-item"><span>✓</span><p>{item}</p></div>
              ))}
            </div>
            <div className="syn-callout">
              <p>IP AND OWNERSHIP</p>
              <p>Everything we write for you is yours: code, weights, specs and benches. No runtime licence, no vendor lock, no per unit fee.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="syn-section syn-section--alt">
        <p className="syn-eyebrow">THE FIRST QUARTER</p>
        <h2 className="syn-title">What the first three months look like</h2>
        <p className="syn-intro">A typical shape for a program starting from a requirement. Yours gets rewritten against your target platform and date on the first call.</p>
        <div className="syn-tabs">
          {quarters.map((q, index) => (
            <button key={q.label} type="button" className={`syn-tab ${month === index ? "is-active" : ""}`} onClick={() => setMonth(index)}>
              <span>{q.label}</span>
              <i />
            </button>
          ))}
        </div>
        <div className="syn-tab-panel">
          <div className="syn-tab-grid">
            <div><h3>{quarters[month].title}</h3><p>{quarters[month].body}</p></div>
            <div className="syn-exit"><p>EXIT CONDITION</p><p>{quarters[month].exit}</p></div>
          </div>
        </div>
        <p className="syn-tab-footnote">AFTER MONTH 03 THE RETAINER GOES ROLLING: SCOPE IS RESET EVERY MONTH AND YOU CAN STOP AT ANY MONTH BOUNDARY.</p>
      </section>

      <section className="syn-section">
        <p className="syn-eyebrow">FIT</p>
        <h2 className="syn-title">Right for you, or not</h2>
        <div className="syn-fit-grid">
          <div className="syn-fit-card syn-fit-card--accent">
            <p>TAKE THE RETAINER IF</p>
            <div className="syn-fit-list">
              <p>You have a requirement and a date, and no model yet.</p>
              <p>Perception or decision making is on your roadmap but not in your team.</p>
              <p>You intend to own this capability internally, not rent it forever.</p>
              <p>Someone will have to sign off on what the machine is allowed to do.</p>
            </div>
          </div>
          <div className="syn-fit-card syn-fit-card--alt">
            <p>TAKE THE SPRINT INSTEAD IF</p>
            <div className="syn-fit-list">
              <p>The model exists and works somewhere already.</p>
              <p>One named problem is in the way: latency, memory, a missing safety wrapper.</p>
              <p>You need it closed out in four weeks against a fixed price.</p>
              <p>Your team is already capable and just needs one gap filled.</p>
            </div>
            <Link href="/services/milestone-sprint" className="syn-button syn-button--secondary" style={{ display: "inline-flex", marginTop: 20 }}>SEE THE MILESTONE SPRINT <ArrowRight size={15} /></Link>
          </div>
        </div>
        <div className="syn-sector-grid">
          {sectors.map(([title, text]) => (
            <article key={title}><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="syn-case">
        <article className="syn-case-story">
          <p className="syn-eyebrow">PROOF · ANONYMIZED</p>
          <h2>Five months, from requirement to demonstrator</h2>
          <p><b>The situation.</b> A ground robotics integrator had a manipulation requirement, no model, and a customer demonstration eleven weeks out.</p>
          <p><b>What we did.</b> Two engineers embedded with their team: architecture and data strategy, then the policy, then a deterministic wrapper with explicit joint envelopes and a defined fail safe pose.</p>
          <p><b>Where it landed.</b> A demonstrator that ran the full customer script on board, a wrapper spec their safety reviewer could read, and two of their engineers able to retrain and redeploy without us.</p>
          <div className="syn-tags"><span>RETAINER · 5 MONTHS</span><span>MODEL BUILT IN HOUSE</span><span>CAPABILITY TRANSFERRED</span></div>
          <Link href="/portfolio" className="syn-button">READ THE FULL CASE STUDY <ArrowRight size={15} /></Link>
        </article>
        <aside className="syn-case-proof">
          <PipelineSchema />
        </aside>
      </section>

      <section className="syn-section">
        <p className="syn-eyebrow">COMMERCIALS</p>
        <h2 className="syn-title">One monthly rate, everything in it</h2>
        <p className="syn-intro">Squad size and target platform set the rate. Travel to your site and bench hardware are quoted separately and at cost.</p>
        <div className="syn-pricing-grid">
          <div className="syn-pricing-card syn-pricing-card--accent">
            <p>CORE SQUAD</p>
            <div className="syn-pricing-figure">{offre.prixEn}<span>{offre.priceUnitEn}</span></div>
            <p className="syn-pricing-note">{offre.priceNoteEn}</p>
            <p className="syn-pricing-desc">Two senior engineers, monthly roadmap and demo, full artefact set. Six month minimum, 60 day termination notice, billed monthly in advance.</p>
          </div>
          <div className="syn-pricing-card syn-pricing-card--alt">
            <p>EXTENDED SQUAD</p>
            <div className="syn-pricing-figure">Scoped<span>ON THE FIRST CALL</span></div>
            <p className="syn-pricing-note">SIZED TO YOUR PROGRAM</p>
            <p className="syn-pricing-desc">Three to four engineers across perception, embedded and safety, for programs running two workstreams in parallel.</p>
          </div>
          <div className="syn-pricing-card syn-pricing-card--alt">
            <p>ADD ONS</p>
            <div className="syn-pricing-addons">
              <span>HIL bench build and commissioning</span>
              <span>Safety layer review for an existing stack</span>
              <span>Hiring support: profiles, screening, technical interviews</span>
              <span>Technical due diligence for your investors</span>
            </div>
          </div>
        </div>
      </section>

      <section className="syn-section syn-section--alt">
        <p className="syn-eyebrow">GOVERNANCE</p>
        <h2 className="syn-title">Built for the people who have to approve it</h2>
        <div className="syn-governance-grid">
          {governance.map(([title, text]) => (
            <div key={title}><h3>{title}</h3><p>{text}</p></div>
          ))}
        </div>
        <Link href="/contact" className="syn-button syn-button--secondary" style={{ display: "inline-flex", marginTop: 22 }}>ASK A COMPLIANCE QUESTION <ArrowRight size={15} /></Link>
      </section>

      <section className="syn-section">
        <p className="syn-eyebrow">QUESTIONS WE GET</p>
        <div className="syn-faq-grid">
          {faqs.map(([q, a]) => (
            <div key={q}><h3>{q}</h3><p>{a}</p></div>
          ))}
        </div>
      </section>

      <section className="syn-contact">
        <h2>Bring us the requirement, not the solution</h2>
        <p>Send what the machine has to do, the target platform and the date you are working to. Within two working days you get a straight answer: retainer or sprint, the shape of the first quarter, and what it would cost.</p>
        <div>
          <ExternalButton source="tactical_retainer_bottom">DISCUSS A RETAINER <ArrowRight size={15} /></ExternalButton>
        </div>
        <small>SYNOBOTIX.COM · EDGE AI ENGINEERING FOR PHYSICAL ROBOTICS</small>
      </section>

      <Footer />
    </main>
  );
}
