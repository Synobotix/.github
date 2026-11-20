"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Footer from "@/app/components/Footer";
import { trackEvent } from "@/lib/track";
import { useScrollReveal } from "@/app/components/useScrollReveal";

const CONTACT_PATH = "/contact";

const FILTERS = ["ALL", "EDGE AI", "HIL"] as const;

type Role = {
  code: string;
  title: string;
  track: (typeof FILTERS)[number];
  mode: string;
  stack: string;
  seats: string;
  level: string;
  start: string;
  comp: string;
  bonus: string;
  travel: string;
  summary: string;
  owns: string[];
  bar: string[];
};

const ROLES: Role[] = [
  {
    code: "EDGE-01",
    title: "Senior Edge AI Engineer",
    track: "EDGE AI",
    mode: "Remote (EU) · embedded",
    stack: "ROS 2 · Orin · TensorRT",
    seats: "1 seat",
    level: "Senior",
    start: "Nov 2026",
    comp: "$75k / yr",
    bonus: "10%",
    travel: "60 days / yr",
    summary:
      "An integrator has a detection stack that works in the lab and misses its latency budget by 3× on Orin NX once the enclosure is thermally soaked. You own the perception path for the program: architecture, training, validation against the physical task, and the measured number we put in front of their review board.",
    owns: [
      "The end-to-end latency budget, measured per stage on the client hardware at the deployed power envelope.",
      "Model architecture and training strategy, chosen against the physical task, not a leaderboard.",
      "The quantisation and graph work that gets the path inside its budget without losing the behaviour.",
      "A repeatable acceptance test their engineers can re-run after we are gone.",
    ],
    bar: [
      "You have taken a learned policy from a notebook onto real hardware in a real environment.",
      "ROS 2 internals: DDS tuning, executors, zero-copy transport, and you profile before you optimise.",
      "You can sit in front of a safety reviewer and defend a decision in writing.",
    ],
  },
  {
    code: "HIL-01",
    title: "HIL Validation Engineer",
    track: "HIL",
    mode: "Hybrid · Toulouse + sites",
    stack: "HIL bench · PX4 · Python",
    seats: "1 seat",
    level: "Senior",
    start: "Jan 2027",
    comp: "$60k / yr",
    bonus: "5%",
    travel: "0 days / yr",
    summary:
      "Every program we run ends on a hardware-in-the-loop bench that the client keeps. You build it: rate limits, joint envelopes, fail-safe states, watchdogs, and the recorded evidence that lets a safety authority sign off. When a demonstrator is grounded, it is because your bench said so.",
    owns: [
      "The HIL rig and test suite, handed over as something the client can run without us.",
      "Envelope checks around the learned policy: rate limits, joint limits, watchdog, defined fail-safe state.",
      "Recorded, replayable evidence for every actuation decision, months after the demonstration.",
      "The written spec a safety reviewer reads and agrees with before anything moves.",
    ],
    bar: [
      "You have grounded something you built, on purpose, with evidence.",
      "Fluent with bench instrumentation and timing under load, not just unit tests in CI.",
      "You write test plans that someone else can execute exactly.",
    ],
  },
  {
    code: "EDGE-02",
    title: "Senior Edge AI Engineer",
    track: "EDGE AI",
    mode: "Remote (EU / NA)",
    stack: "TensorRT · CUDA · quant",
    seats: "1 seat",
    level: "Senior",
    start: "Dec 2026",
    comp: "$75k / yr",
    bonus: "5%",
    travel: "0 days / yr",
    summary:
      "This is the Milestone Sprint seat: a client\u2019s model already works somewhere and now has to hold on the machine, under load, in front of a customer. You take one named problem (optimisation, safety wrapper, HIL validation) and close it in a month with artefacts they keep.",
    owns: [
      "An instrumented baseline on the client hardware before a single change is made.",
      "Quantisation and graph surgery to a stated budget, with the accuracy cost written down.",
      "The deterministic fallback when inference degrades, drops out, or is simply late.",
      "A handover doc that lets their engineers repeat all of it.",
    ],
    bar: [
      "You have cut a real inference path to a hard budget and can show the before and after traces.",
      "Comfortable at the edge of the toolchain: custom kernels, plugin layers, engine builds that misbehave.",
      "You are happy to work in a month-long fixed scope and stop when it is closed.",
    ],
  },
  ];

const STACK = ["PYTORCH", "ROS 2", "JETSON ORIN", "TENSORRT", "PX4 / MAVLINK", "HIL BENCH"];

const WHY = [
  ["01", "Close to the program", "You work directly with the client's team from scoping to handover. No anonymous delivery, no interposed layers."],
  ["02", "The whole path, not a slice", "Data strategy through on-board deployment and the safety layer. You will not be handed someone else's model to tune forever."],
  ["03", "Hardware, weekly", "Orin benches, HIL rigs, real arms and airframes. Latency is measured on the deployed power budget, thermally soaked."],
  ["04", "No pyramid above you", "Two engineers, no delivery managers, no utilisation targets. Scope decisions are made by whoever is holding the hardware."],
] as const;

const RULES = [
  ["Close to the client, not a bench", "You work directly with the client's team on one program at a time. You are not a pool to be reassigned when something else needs coverage."],
  ["Embedded in their team", "Their repo, their stand-ups, their review board. We work inside the client's process rather than around it."],
  ["Built to leave", "Every engagement ends with their engineers able to retrain and redeploy without us. Teaching is part of the deliverable, not a favour."],
  ["Write it down or it did not happen", "A safety reviewer has to be able to read the envelope spec and agree with it. If it is not written and tested, it is not shipped."],
] as const;

const STEPS = [
  ["STEP 01", "One problem, one link", "No cover letter. The hardest thing you personally made work on hardware, and how you proved it."],
  ["STEP 02", "45 minutes with two engineers", "Both of them will be on a program with you. There is no screening layer to get past."],
  ["STEP 03", "A paid half-day probe", "A real anonymised trace that missed its budget. Paid at the senior day rate whatever the outcome."],
  ["STEP 04", "Offer, or a written no", "Every candidate who reaches step 02 gets reasons in writing. We ask for the same courtesy."],
] as const;

const COMP = [
  ["$75k", "SENIOR BASE / YEAR", true],
  ["5–10%", "PROGRAM COMPLETION BONUS", false],
  ["60 days", "BETWEEN PROGRAMS, PAID", false],
  ["€ 0,000", "HARDWARE BUDGET / YEAR", false],
] as const;

export default function CareersPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");
  const [open, setOpen] = useState<string | null>("EDGE-01");

  useScrollReveal(".syn-careers", ".syn-careers-hero");

  const visible = ROLES.filter((r) => filter === "ALL" || r.track === filter);

  return (
    <main className="syn-careers">
      <section className="syn-careers-hero">
        <div className="syn-careers-hero-grid">
          <div>
            <p className="syn-eyebrow">CAREERS · SENIOR ENGINEERS</p>
            <h1>
              We add two<br />engineers a year.<br /><span>This may be one of them.</span>
            </h1>
            <p className="syn-hero-copy">
              Every engineer here works directly on a client program, embedded in their team and expected to leave
              them able to retrain the model without us. If you have taken a
               learned policy from a notebook onto real hardware and defended it to someone who could ground the machine,
               read on.
            </p>
            <div className="syn-actions">
              <a href="#seats" className="syn-button">SEE THE OPEN SEATS <ArrowRight size={15} /></a>
              <a href="#process" className="syn-button syn-button--secondary">READ THE BAR</a>
            </div>
          </div>
          <aside className="syn-careers-stats">
            <p className="syn-careers-stats-head"><i />3 OPEN · 3 SENIOR</p>
            <dl>
              <div><dt>APPLICATIONS / QUARTER</dt><dd>00 placeholder</dd></div>
              <div><dt>REACHING THE PROBE</dt><dd>00 placeholder</dd></div>
              <div><dt>OFFERS MADE</dt><dd>2</dd></div>
              <div className="syn-careers-stat-foot"><dt>TIME TO A DECISION</dt><dd className="is-hot">10 working days</dd></div>
            </dl>
          </aside>
        </div>
        <p className="syn-careers-note">SENIOR ENGINEERS ONLY · ON CLIENT PROGRAMS · NO BENCH TIME, EVER</p>
      </section>

      <section className="syn-stack">
        <p>WHAT YOU<br />WILL TOUCH</p>
        {STACK.map((item) => <span key={item}>{item}</span>)}
      </section>

      <section className="syn-section">
        <p className="syn-eyebrow">WHY THIS AND NOT A LAB</p>
        <h2 className="syn-title">Four things you get here that you do not get in a research group</h2>
        <p className="syn-intro">We are hired when a model has to hold on real hardware in front of a customer. That pressure is the perk.</p>
        <div className="syn-capability-grid">
          {WHY.map(([number, title, text]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="syn-section syn-section--alt" id="seats">
        <div className="syn-seats-head">
          <div>
            <p className="syn-eyebrow">OPEN SEATS</p>
            <h2 className="syn-title">Three seats. Expand one.</h2>
          </div>
          <div className="syn-seats-filter" role="group" aria-label="Filter seats by track">
            {FILTERS.map((label) => (
              <button
                key={label}
                type="button"
                aria-pressed={filter === label}
                className={filter === label ? "is-active" : ""}
                onClick={() => setFilter(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 26 }}>
          {visible.map((role) => {
            const isOpen = open === role.code;
            return (
              <div className="syn-seat" key={role.code}>
                <button
                  type="button"
                  className="syn-seat-row"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : role.code)}
                >
                  <p className="syn-seat-code">{role.code}</p>
                  <p className="syn-seat-title">{role.title}</p>
                  <p className="syn-seat-meta">{role.mode}</p>
                  <p className="syn-seat-stack">{role.stack}</p>
                  <p className="syn-seat-seats">{role.seats}</p>
                  <p className="syn-seat-sign">{isOpen ? "−" : "+"}</p>
                </button>

                {isOpen && (
                  <div className="syn-seat-panel">
                    <div className="syn-seat-main">
                      <p className="syn-seat-summary">{role.summary}</p>
                      <div className="syn-seat-label">WHAT YOU OWN</div>
                      <ul className="syn-seat-list">
                        {role.owns.map((line) => <li key={line}><i>›</i><span>{line}</span></li>)}
                      </ul>
                      <div className="syn-seat-label">THE BAR FOR THIS SEAT</div>
                      <ul className="syn-seat-list">
                        {role.bar.map((line) => <li key={line}><i>›</i><span>{line}</span></li>)}
                      </ul>
                    </div>
                    <div className="syn-seat-spec">
                      <div className="syn-seat-spec-label">SEAT SPEC</div>
                      <dl>
                        <div><dt>Level</dt><dd>{role.level}</dd></div>
                        <div><dt>Start</dt><dd>{role.start}</dd></div>
                        <div><dt>Base</dt><dd>{role.comp}</dd></div>
                        <div><dt>Program bonus</dt><dd>{role.bonus}</dd></div>
                        <div><dt>Travel</dt><dd>{role.travel}</dd></div>
                      </dl>
                      <a
                        className="syn-seat-cta"
                        href={CONTACT_PATH}
                        onClick={() => trackEvent({ event: "careers_apply_click", source: role.code })}
                      >
                        APPLY TO {role.code} <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="syn-careers-figure">FIG. 1: SEATS ARE CLOSED WHEN FILLED, NOT ROLLED OVER. FILTER AND EXPAND ARE LIVE.</p>
      </section>

      <section className="syn-people" id="process">
        <div className="syn-people-col">
          <p className="syn-eyebrow">HOW WE WORK</p>
          <h2>Four engineers, one rule</h2>
          <div className="syn-people-rule">
            {RULES.map(([title, text]) => (
              <div key={title}><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
        </div>
        <div className="syn-people-col">
          <p className="syn-eyebrow">SELECTION</p>
          <h2>Ten working days, four steps</h2>
          <div className="syn-selection-steps">
            {STEPS.map(([step, title, text], index) => (
              <div key={step} className={`syn-selection-step ${index === 3 ? "is-hot" : ""}`}>
                <span>{step}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
          <div className="syn-comp-grid">
            {COMP.map(([value, label, hot]) => (
              <div className="syn-comp" key={label}>
                <strong className={hot ? "is-hot" : ""}>{value}</strong>
                <small>{label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="syn-careers-cta">
        <h2>Tell us what you made hold on real hardware</h2>
        <p>One paragraph, one link, the seat code in the subject line. Straight answer within two working days.</p>
        <div>
          <a
            className="syn-button"
            href={CONTACT_PATH}
            onClick={() => trackEvent({ event: "careers_apply_click", source: "final_cta" })}
          >
            APPLY FOR A SEAT <ArrowRight size={15} />
          </a>
          <a className="syn-button syn-button--secondary" href={CONTACT_PATH}>
            ASK AN ENGINEER FIRST
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}