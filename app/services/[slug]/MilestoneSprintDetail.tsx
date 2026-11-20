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
const offre = OFFRES_DATA.find((o) => o.slug === "milestone-sprint")!;

const deliverables: [string, string, string, boolean?][] = [
  ["01", "Instrumented baseline", "Where your model actually stands on your board: tail latency, memory, power, thermal behaviour under real sensor load."],
  ["02", "Optimization to a budget", "Graph and runtime work, quantization where accuracy allows it, measured against the budget written into the scope."],
  ["03", "Deterministic safety wrapper", "Envelope checks, rate limits, watchdog and a defined fail safe state, with a specification your reviewer can read.", true],
  ["04", "HIL validation and handover", "A test suite on the bench, replayable logs, and a recorded walkthrough so your engineers can rerun all of it."],
];

const stats: [string, string, boolean?][] = [
  ["48 h", "TECHNICAL AUDIT BEFORE SCOPE"],
  ["4 weeks", "ONE NAMED PROBLEM, CLOSED OUT"],
  ["Fixed", "PRICE AGREED BEFORE WE START", true],
  ["1 target", "BOARD AND BUDGET, WRITTEN DOWN"],
];

const steps: [string, string, string][] = [
  ["01", "48 hour audit", "You send the model, the board and the requirement. We come back with the bottleneck, the realistic target and what it will take."],
  ["02", "Scope and fixed price", "One page: the problem, the exit condition, the artefacts, the price. Work outside it is a change order at €750 excl. VAT per day, never a surprise."],
  ["03", "Four weeks on the bench", "Weekly written note with the current numbers. Every claim reproducible on the hardware, never on a laptop."],
  ["04", "Close out and handover", "Published benchmarks, wrapper spec, HIL suite and a recorded walkthrough. Then we step back, or you continue on a retainer."],
];

const handedOver = [
  "Optimized model plus the conversion and build pipeline that produced it",
  "Before and after benchmarks on your board, with the method written out",
  "Accuracy delta per optimization step, so you can accept or reject each one",
  "Safety wrapper source and specification, with the fail safe state defined",
  "HIL test suite, replayable logs and a recorded handover session",
];

const weeks = [
  {
    label: "WEEK 01 · BASELINE",
    title: "Honest numbers on your board",
    body: "Your model on the target hardware under real sensor load, instrumented end to end. We separate what the model costs from what the pipeline around it costs, which is where half of these programs find their answer.",
    exit: "Reproducible baseline with tail latency, memory, power and thermal behaviour recorded, plus a ranked list of where the time actually goes.",
  },
  {
    label: "WEEK 02 · OPTIMIZATION",
    title: "Work down to the budget",
    body: "Graph and runtime work first, then quantization only as far as your accuracy tolerance allows. Each step is measured and reversible, and you see the accuracy cost before it is kept.",
    exit: "Target budget met on hardware, or a written statement of the gap with the accuracy tradeoff quantified at each step.",
  },
  {
    label: "WEEK 03 · SAFETY WRAPPER",
    title: "A deterministic envelope around the policy",
    body: "The learned policy proposes, a hand written layer decides what the actuators may do. No learning inside that box, and every rule in it written down in language a safety reviewer reads once and agrees with.",
    exit: "Wrapper integrated in your stack with envelope checks, rate limits, watchdog and a defined fail safe state, plus its specification.",
  },
  {
    label: "WEEK 04 · VALIDATION",
    title: "Proof, then handover",
    body: "Hardware in the loop runs at the deployed power budget, thermally soaked, with fault injection on the sensor path. Your engineers drive the last runs while we are still in the room.",
    exit: "Published benchmarks, HIL suite and replayable logs handed over, and one of your engineers able to rerun the whole chain unassisted.",
  },
];

const sectors: [string, string][] = [
  ["Latency and throughput", "A policy that has to close the control loop inside a fixed budget."],
  ["Memory and power", "A model that does not fit the board, or eats the flight time."],
  ["Safety layer review", "Nothing bounds what the machine may do if the policy goes wrong."],
  ["Due diligence", "An investor or a customer wants the claims verified on hardware."],
];

const governance: [string, string][] = [
  ["IP", "Full assignment of code, weights and specs to you at the end of the sprint."],
  ["BENCHMARK METHOD", "Published with the numbers: load, thermal state, power budget, sample size."],
  ["SAFETY EVIDENCE", "Envelope specification, fail safe definition and replayable validation logs."],
  ["DATA HANDLING", "Your data stays in your infrastructure. Training and profiling run where you allow them."],
  ["EXPORT CONTROL", "Dual use aware staffing and documentation, confirmed against the applicable regime on a call."],
];

const faqs: [string, string][] = [
  ["What do you need from us to start?", "The model and its evaluation set, the target board, access to hardware and data from day one, a technical contact who answers within 24 hours, and a reproducible build. Two units of the hardware on our bench makes week one twice as fast."],
  ["What if the bottleneck is not the model?", "That is a common outcome and the audit usually catches it. We rescope onto the real bottleneck before you sign, or tell you it is outside what we do."],
  ["Will you touch accuracy?", "Only inside a tolerance you set in the scope, and every step is measured against your own evaluation set so you can reject any of them."],
  ["Can the sprint be extended?", "It closes at week four by design. If more work is warranted we scope a second sprint or move to a retainer, as a new decision with a new price."],
  ["Who does the work?", "One or two senior engineers from our team. You meet them in the audit and they stay to the handover."],
  ["Can we publish the results?", "Yes, the benchmarks and the method are yours. We only reference your program publicly if you clear it in writing."],
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

export default function MilestoneSprintDetail() {
  const [week, setWeek] = useState(0);
  useScrollReveal(".syn-site");

  return (
    <main className="syn-site">
      <div className="syn-breadcrumb">
        <Link href="/">HOME</Link> / <Link href="/services">SERVICES</Link> / <span>MILESTONE SPRINT</span>
      </div>

      <section className="syn-hero">
        <div>
          <p className="syn-eyebrow">4 WEEKS · FIXED SCOPE, FIXED PRICE</p>
          <h1>Your model,<br /><span>production real</span><br />in one month.</h1>
          <p className="syn-hero-copy">The Milestone Sprint is for teams whose model already works somewhere and now has to hold on the machine they ship. One named problem, four weeks, a fixed price agreed before we start: instrumented baseline, optimization to a stated budget, a deterministic safety wrapper, and hardware in the loop validation you keep.</p>
          <p className="syn-hero-copy">We scope it in a 48 hour technical audit first. If the sprint cannot close the gap, we tell you before you commit and point you at the Tactical Retainer instead.</p>
          <div className="syn-actions">
            <ExternalButton source="milestone_sprint_hero">SCOPE A SPRINT <ArrowRight size={15} /></ExternalButton>
            <Link href="/services/tactical-retainer" className="syn-button syn-button--secondary">COMPARE WITH THE RETAINER</Link>
          </div>
          <p className="syn-note">48 hour audit before scope · Fixed price · Benchmarks published, good or bad</p>
        </div>

        <div className="syn-workstreams">
          <div className="syn-workstreams-head">
            <span>WHAT THE SPRINT COVERS</span>
            <span>04 DELIVERABLES</span>
          </div>
          <div>
            {deliverables.map(([number, title, text, accent]) => (
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
        <h2 className="syn-title">Scope first, then four weeks with no surprises</h2>
        <p className="syn-intro">The sprint only starts once the target is a number: a latency budget, a memory ceiling, a wrapper a named reviewer has to accept. Everything after that is engineering against that number, in the open, in your repo.</p>
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
              <p>IF WE MISS THE TARGET</p>
              <p>You get the numbers anyway, published as measured, plus a written account of what blocks the budget and what would have to change in the model or the hardware.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="syn-section syn-section--alt">
        <p className="syn-eyebrow">THE FOUR WEEKS</p>
        <h2 className="syn-title">Week by week, with an exit condition each</h2>
        <p className="syn-intro">A typical shape for an optimization and safety sprint. The audit rewrites it against your bottleneck before anything is signed.</p>
        <div className="syn-tabs">
          {weeks.map((w, index) => (
            <button key={w.label} type="button" className={`syn-tab ${week === index ? "is-active" : ""}`} onClick={() => setWeek(index)}>
              <span>{w.label}</span>
              <i />
            </button>
          ))}
        </div>
        <div className="syn-tab-panel">
          <div className="syn-tab-grid">
            <div><h3>{weeks[week].title}</h3><p>{weeks[week].body}</p></div>
            <div className="syn-exit"><p>EXIT CONDITION</p><p>{weeks[week].exit}</p></div>
          </div>
        </div>
        <p className="syn-tab-footnote">THE SPRINT ENDS AT WEEK 04. NO ROLLOVER, NO OPEN INVOICE. CONTINUING IS A SEPARATE DECISION.</p>
      </section>

      <section className="syn-section">
        <p className="syn-eyebrow">FIT</p>
        <h2 className="syn-title">Right for you, or not</h2>
        <div className="syn-fit-grid">
          <div className="syn-fit-card syn-fit-card--accent">
            <p>TAKE THE SPRINT IF</p>
            <div className="syn-fit-list">
              <p>The model exists and works somewhere already.</p>
              <p>One named problem is in the way: latency, memory, a missing safety wrapper.</p>
              <p>There is a demo, an audit or a customer date four to eight weeks out.</p>
              <p>Your team is capable and needs one gap filled, not a squad.</p>
            </div>
          </div>
          <div className="syn-fit-card syn-fit-card--alt">
            <p>TAKE THE RETAINER INSTEAD IF</p>
            <div className="syn-fit-list">
              <p>You have a requirement and a date, and no model yet.</p>
              <p>Perception or decision making is on your roadmap but not in your team.</p>
              <p>The work spans several months and several workstreams.</p>
              <p>You need the internal team stood up as well as the model built.</p>
            </div>
            <Link href="/services/tactical-retainer" className="syn-button syn-button--secondary" style={{ display: "inline-flex", marginTop: 20 }}>SEE THE TACTICAL RETAINER <ArrowRight size={15} /></Link>
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
          <h2>Four weeks to a demo that held</h2>
          <p><b>The situation.</b> A UAS team had a perception model that ran fine on a workstation and missed its control loop budget on the aircraft, with a customer flight three weeks out.</p>
          <p><b>What we did.</b> Instrumented the whole path first, found most of the loss outside the model, then reworked the graph and quantized what tolerance allowed. A deterministic wrapper went in behind it with a defined fail safe.</p>
          <p><b>Where it landed.</b> Budget met on the board with accuracy inside their tolerance, published benchmarks their customer could check, and a HIL suite the team kept using after the flight.</p>
          <div className="syn-tags"><span>SPRINT · 4 WEEKS</span><span>EXISTING MODEL</span><span>BENCHMARKS PUBLISHED</span></div>
        </article>
        <aside className="syn-case-proof">
          <PipelineSchema />
        </aside>
      </section>

      <section className="syn-section">
        <p className="syn-eyebrow">COMMERCIALS</p>
        <h2 className="syn-title">Fixed price, agreed before week one</h2>
        <p className="syn-intro">The 48 hour feasibility audit (€4,000 excl. VAT, deducted from a sprint signed within 30 days) freezes the real scope. Travel to your site and bench hardware are quoted separately and at cost.</p>
        <div className="syn-pricing-grid">
          <div className="syn-pricing-card syn-pricing-card--accent">
            <p>MILESTONE SPRINT</p>
            <div className="syn-pricing-figure">{offre.prixEn}<span>{offre.priceUnitEn}</span></div>
            <p className="syn-pricing-note">{offre.priceNoteEn}</p>
            <p className="syn-pricing-desc">One named problem closed out over four weeks: baseline, optimization, safety wrapper, HIL validation and full artefact set.</p>
          </div>
          <div className="syn-pricing-card syn-pricing-card--alt">
            <p>SECOND TARGET BOARD</p>
            <div className="syn-pricing-figure">Scoped<span>ON THE FIRST CALL</span></div>
            <p className="syn-pricing-note">SAME MODEL, NEW HARDWARE</p>
            <p className="syn-pricing-desc">Porting the same optimized model and safety wrapper to a second board, priced once we know the target.</p>
          </div>
          <div className="syn-pricing-card syn-pricing-card--alt">
            <p>ADD ONS</p>
            <div className="syn-pricing-addons">
              <span>HIL bench build and commissioning</span>
              <span>Safety layer review for an existing stack</span>
              <span>Technical due diligence for your investors</span>
              <Link href="/services/tactical-retainer" style={{ color: "var(--syn-red)" }}>Continue on a Tactical Retainer →</Link>
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
        <Link href="/contact" className="syn-button syn-button--secondary" style={{ display: "inline-flex", marginTop: 22 }}>ASK ABOUT A PROCUREMENT PACK <ArrowRight size={15} /></Link>
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
        <h2>Send the model and the budget it has to hit</h2>
        <p>Model, target board, the number you are missing and the date. Within 48 hours you get the bottleneck, a realistic target and a fixed price for the four weeks.</p>
        <div>
          <ExternalButton source="milestone_sprint_bottom">BOOK THE 48 HOUR AUDIT <ArrowRight size={15} /></ExternalButton>
        </div>
        <small>SYNOBOTIX.COM · EDGE AI ENGINEERING FOR PHYSICAL ROBOTICS</small>
      </section>

      <Footer />
    </main>
  );
}
