"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/track";
import { useScrollReveal } from "@/app/components/useScrollReveal";
import Footer from "@/app/components/Footer";
import PipelineSchema from "@/app/components/PipelineSchema";

const calendlyUrl = "https://calendly.com/remiboivin021/diagnostic";

const capability = [
  ["01", "Model development", "Data strategy, architecture, training and evaluation, built against the physical task rather than a leaderboard."],
  ["02", "On-board deployment", "Onto embedded compute inside the real power, thermal and latency envelope, reproducibly and from source."],
  ["03", "Deterministic safety layer", "A hand-written envelope around the learned policy, specified so a safety reviewer can read it and agree."],
  ["04", "Team and handover", "Hiring profiles, review rituals and the internal capability to keep shipping once we step back."],
];

const pipeline = [
  ["STAGE 01", "Sensor intake", "Timestamped, rate bounded, dropped frames explicitly accounted for."],
  ["STAGE 02", "Policy inference", "Running inside a fixed compute budget, with tail latency instrumented."],
  ["STAGE 03 · DETERMINISTIC", "Safety wrapper", "Envelope checks, rate limits, watchdog, defined fail safe state. No learning inside this box."],
  ["STAGE 04", "Actuation and log", "Every decision replayable on the HIL bench, months later."],
];

const teamValues = [
  ["Embedded in your team", "Your repo, your standups, your review board. We work inside your process rather than around it."],
  ["Built to leave", "Every engagement ends with your engineers able to rebuild, retrain and redeploy without us."],
];

function ExternalButton({ children, secondary = false, onClick }: { children: React.ReactNode; secondary?: boolean; onClick?: () => void }) {
  return <a href={calendlyUrl} target="_blank" rel="noreferrer" onClick={onClick} className={`syn-button ${secondary ? "syn-button--secondary" : ""}`}>{children}</a>;
}

export default function Home() {
  const trackContact = () => trackEvent({ event: "contact_page_view", source: "homepage" });

  useScrollReveal(".syn-site");

  return (
    <main className="syn-site">
      <section className="syn-hero">
        <div>
          <p className="syn-eyebrow">EDGE AI ENGINEERING · UAS &amp; GROUND ROBOTICS</p>
          <h1>Autonomy that ships<br />on <span>your machine</span>,<br />not in a notebook.</h1>
          <p className="syn-hero-copy">Synobotix is an engineering agency for physical AI. We develop the perception and decision models behind real robots, deploy them on embedded compute, and bound them with a deterministic safety layer your integrator and your review board can both sign off on.</p>
          <p className="syn-hero-copy">Come to us with a model that has to hold on real hardware, or with nothing but the requirement. There is a track for each.</p>
          <div className="syn-actions">
            <ExternalButton onClick={trackContact}>BOOK A TECHNICAL REVIEW <ArrowRight size={15} /></ExternalButton>
            <a href="#engagements" className="syn-button syn-button--secondary">COMPARE THE TWO TRACKS</a>
          </div>
          <p className="syn-note">Senior engineers only · Embedded with your team · Fixed scope milestones</p>
        </div>

        <div className="syn-hero-tracks">
          <article className="syn-hero-track syn-hero-track--accent">
            <div><strong><i />TACTICAL RETAINER</strong><small>OUR MAIN ENGAGEMENT</small></div>
            <h2>You have a requirement. You need the model and a team around it.</h2>
            <p>We architect the system, build the model end to end, and stand up the engineering team that owns it after we step back.</p>
          </article>
          <article className="syn-hero-track">
            <div><strong>MILESTONE SPRINT</strong><small>4 WEEKS</small></div>
            <h2>You have a model. It has to hold on the board you ship.</h2>
            <p>One named problem: optimization, safety wrapper and hardware-in-the-loop validation, closed out in a month with artefacts you keep.</p>
          </article>
        </div>
      </section>

      <section className="syn-stack">
        <p>WORKING<br />STACK</p>
        {["PYTORCH", "ROS 2", "JETSON ORIN", "TENSORRT", "PX4 / MAVLINK", "HIL BENCH"].map((item) => <span key={item}>{item}</span>)}
      </section>

      <section className="syn-section" id="capability">
        <p className="syn-eyebrow">CAPABILITY</p>
        <h2 className="syn-title">The whole path, not one slice of it</h2>
        <p className="syn-intro">Optimization is one stage out of four. Most programs need at least two of them, and the hard part sits in the handoffs between them, which is exactly where an outside vendor usually drops the ball.</p>
        <div className="syn-capability-grid">
          {capability.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="syn-section syn-section--alt" id="engagements">
        <p className="syn-eyebrow">TWO TRACKS</p>
        <h2 className="syn-title">Pick the one that matches where you are</h2>
        <p className="syn-intro">Most programs run as a Tactical Retainer: it is where we do our best work, because the model, the deployment and the team all move together. A Milestone Sprint is the right call when the model already exists and one hard problem is in the way.</p>
        <div className="syn-offer-grid">
          <article className="syn-offer syn-offer--accent">
            <div className="syn-offer-top"><strong>TACTICAL RETAINER <b>MOST PROGRAMS</b></strong><small>ONGOING · DEDICATED SQUAD</small></div>
            <h3>Build the model and the team that owns it</h3>
            <p>For programs starting from a requirement. We assemble a squad on your problem, ship in monthly increments, and transfer the capability as we go.</p>
            <ul><li>System architecture and data strategy</li><li>Model built, trained and validated end to end</li><li>Named senior engineers, monthly roadmap</li><li>Hiring support and capability transfer</li></ul>
            <div className="syn-offer-foot"><p className="syn-price">$64,997.75 <span>/ MONTH</span></p><small>USD · TACTICAL RETAINER</small><ExternalButton onClick={trackContact}>DISCUSS A RETAINER <ArrowRight size={15} /></ExternalButton></div>
          </article>
          <article className="syn-offer">
            <div className="syn-offer-top"><strong>MILESTONE SPRINT</strong><small>4 WEEKS · FIXED SCOPE</small></div>
            <h3>Make an existing model production real</h3>
            <p>For teams whose model already works somewhere and now has to run on the machine, under load, in front of a customer or a reviewer.</p>
            <ul><li>Instrumented baseline on your hardware</li><li>Quantization and graph work to a stated budget</li><li>Deterministic safety wrapper and written spec</li><li>HIL test suite and recorded handover</li></ul>
            <div className="syn-offer-foot"><p className="syn-price">$18,753.53 <span>/ WEEK</span></p><small>USD · FIXED SCOPE SPRINT</small><Link href="/services/milestone-sprint" className="syn-button syn-button--secondary">SCOPE A SPRINT <ArrowRight size={15} /></Link></div>
          </article>
        </div>
      </section>

      <section className="syn-section" id="safety">
        <p className="syn-eyebrow">THE SAFETY LAYER</p>
        <h2 className="syn-title">A stochastic policy inside a deterministic envelope</h2>
        <p className="syn-intro">The learned policy proposes. A hand-written, fully testable layer decides what the actuators are allowed to do. That boundary is what turns “the AI drove it” into something you can put in a document and defend.</p>
        <div className="syn-pipeline">
          {pipeline.map(([stage, title, text], index) => <article className={index === 2 ? "syn-pipeline--accent" : ""} key={stage}><span>{stage}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <p className="syn-figure-note">FIG. 1 · REFERENCE PIPELINE. STAGE 03 IS THE ARTEFACT MOST PROGRAMS ARE MISSING.</p>
      </section>

      <section className="syn-case" id="work">
        <article className="syn-case-story">
          <p className="syn-eyebrow">SELECTED WORK · ANONYMIZED</p>
          <h2>From requirement to demonstrator for a UGV integrator</h2>
          <p><b>The situation.</b> A ground robotics integrator had a manipulation requirement, no model, and a customer demonstration eleven weeks out. Nothing in the stack bounded what the arm could do if a policy went wrong.</p>
          <p><b>What we did.</b> Two of our engineers embedded with their team: architecture and data strategy first, then the policy itself, then a deterministic wrapper with explicit joint envelopes, rate limits and a defined fail-safe pose. Validated on a HIL bench they kept.</p>
          <p><b>Where it landed.</b> A demonstrator that ran the full customer script on board, a wrapper spec their safety reviewer could read, and two of their own engineers able to retrain and redeploy it without us.</p>
          <div className="syn-tags"><span>RETAINER · 5 MONTHS</span><span>MODEL BUILT IN HOUSE</span><span>CAPABILITY TRANSFERRED</span></div>
          <Link href="/portfolio" className="syn-button">READ THE FULL CASE STUDY <ArrowRight size={15} /></Link>
        </article>
        <aside className="syn-case-proof">
          <PipelineSchema />
        </aside>
      </section>

      <section className="syn-section syn-section--alt" id="team">
        <p className="syn-eyebrow">WHO WE ARE</p>
        <h2 className="syn-title">A small agency of senior robotics engineers</h2>
        <p className="syn-intro">No pyramid, no bench of juniors learning your stack on your budget. You get engineers who have shipped physical systems, working directly with your team and answering to your program lead.</p>
        <div className="syn-team-values">{teamValues.map(([title, text], index) => <article key={title} className={index === 0 ? "syn-team-values--accent" : ""}><h3>{title}</h3><p>{text}</p></article>)}</div>
        <Link href="/team" className="syn-button syn-button--secondary">MEET THE ENGINEERS <ArrowRight size={15} /></Link>
      </section>

      <section className="syn-contact" id="contact">
        <h2>Tell us what the machine has to do</h2>
        <p>Send the requirement, the target platform and the date you are working to. You will get a straight answer within two working days: the right track, what it would take, and what it would cost.</p>
        <div><ExternalButton onClick={trackContact}>BOOK A TECHNICAL REVIEW <ArrowRight size={15} /></ExternalButton></div>
        <small>SYNOBOTIX.COM · EDGE AI ENGINEERING FOR PHYSICAL ROBOTICS</small>
      </section>

      <Footer />
    </main>
  );
}
