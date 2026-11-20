"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CircleHelp, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { trackEvent } from "@/lib/track";

const configYaml = `# ros2_kinematic_guard: deterministic command validation layer
# Sits between an AI/planner output and the low-level controller.
# All limits are hard constraints; violations trigger fallback, not warnings.

ros2_kinematic_guard:
  ros__parameters:

    topics:
      input_topic: "/cmd_vel_proposed"     # AI/VLA planner output
      output_topic: "/cmd_vel_safe"        # validated command forwarded to controller
      status_topic: "/safety_status"       # latched: OK | REJECTED | WATCHDOG_TRIGGERED

    kinematic_limits:
      max_linear_velocity_mps: 1.5         # m/s, robot frame, forward axis
      max_angular_velocity_rps: 1.2        # rad/s, yaw
      max_linear_acceleration_mps2: 2.0
      max_angular_acceleration_rps2: 3.0

    geofence:
      frame_id: "map"
      type: "box"
      min_x_m: -8.0
      max_x_m: 8.0
      min_y_m: -5.0
      max_y_m: 5.0

    staleness:
      max_command_age_ms: 150              # reject any proposed command older than this

    watchdog:
      deadline_ms: 200                     # no valid input within this window -> fallback
      fallback_mode: "hold_zero_velocity"  # options: hold_zero_velocity | last_known_safe`;

const content = {
  fr: {
    kicker: "PREUVE TECHNIQUE",
    title: "Le pattern que j'implémente sur votre hardware",
    subtitle: "Open source, benchmarké, vérifiable par vous.",
    intro:
      "ros2_kinematic_guard est une vraie couche de sécurité ROS2, open source, pas un schéma. Il intercepte les commandes générées par une IA, les valide contre des limites cinématiques et un geofence, et force un fallback déterministe en cas de violation ou de timeout. Chaque chiffre ci-dessous vient d'un script que n'importe qui peut lancer : ./benchmark.sh. Lisez le code avant de nous engager pour construire la version spécifique à votre hardware.",
    benchmarkTitle: "Benchmarks publiés",
    benchmarkNote: "Reproduisez ces chiffres vous-même : git clone → ./benchmark.sh → comparez.",
    benchmarkPending: "Ces chiffres n'existent que lorsque l'artefact est réellement construit et exécuté, aucun chiffre n'est inventé ici. La méthodologie et les seuils cibles sont documentés dans le repo.",
    metrics: [
      { label: "Latence de commutation p50", note: "objectif : sous la latence cible de l'application" },
      { label: "Latence de commutation p95", note: "mesuré sous charge, 10 000+ échantillons" },
      { label: "Latence de commutation p99", note: "pire cas mesuré, conditions thermiques réelles" },
      { label: "Temps de déclenchement watchdog", note: "moyenne sur 100+ essais" },
    ],
    configTitle: "La config, pas juste le concept",
    configNote: "Ceci est la config réelle du nœud. Pas de valeurs par défaut cachées, pas de boîte noire.",
    notTitle: "Ce que ce n'est pas",
    notBody:
      "Ce nœud de référence n'a ni perception, ni planificateur, ni driver matériel, c'est le pattern de filtrage, dimensionné pour être lisible de bout en bout en une seule session. Votre hardware, votre enveloppe de sécurité et vos modes de panne sont différents : c'est exactement l'objet de l'audit.",
    licenseNote: "Licence Apache-2.0, le patent grant explicite compte pour un pattern de sûreté robotique.",
    repoPending: "Le repo public sera lié ici dès sa publication, avec les premiers benchmarks exécutés.",
    ctaTitle: "C'est le pattern. Votre hardware, votre enveloppe, vos modes de panne sont différents.",
    ctaDesc: "C'est exactement l'objet de l'audit de faisabilité.",
    ctaButton: "Réserver l'audit de faisabilité",
    faqLink: "Voir la FAQ",
  },
  en: {
    kicker: "TECHNICAL PROOF",
    title: "The pattern I run against your hardware",
    subtitle: "Open source, benchmarked, yours to verify.",
    intro:
      "ros2_kinematic_guard is a real, open-source ROS2 safety layer, not a diagram. It intercepts AI-generated commands, validates them against hard kinematic and geofence limits, and forces a deterministic fallback on violation or timeout. Every number below comes from a script anyone can run: ./benchmark.sh. Read the code before you hire us to build the version specific to your hardware.",
    benchmarkTitle: "Published benchmarks",
    benchmarkNote: "Reproduce these numbers yourself: git clone → ./benchmark.sh → compare.",
    benchmarkPending: "These numbers only exist once the artifact is actually built and run, nothing here is invented. The methodology and target thresholds are documented in the repo.",
    metrics: [
      { label: "Commutation latency p50", note: "target: under the application's latency budget" },
      { label: "Commutation latency p95", note: "measured under load, 10,000+ samples" },
      { label: "Commutation latency p99", note: "worst case measured, real thermal conditions" },
      { label: "Watchdog trigger time", note: "mean over 100+ trials" },
    ],
    configTitle: "The config, not just the concept",
    configNote: "This is the actual node config. No hidden defaults, no black box.",
    notTitle: "What this isn't",
    notBody:
      "This reference node has no perception, no planner, no hardware driver, it's the filter pattern, sized to be readable end-to-end in one sitting. Your hardware, your safety envelope, your failure modes are different, that's exactly what the audit is for.",
    licenseNote: "Apache-2.0 licensed, the explicit patent grant matters for a safety-critical robotics pattern.",
    repoPending: "The public repo will be linked here once published, along with the first executed benchmarks.",
    ctaTitle: "This is the pattern. Your hardware, your envelope, your failure modes are different.",
    ctaDesc: "That's exactly what the feasibility audit is for.",
    ctaButton: "Book the Feasibility Audit",
    faqLink: "View FAQ",
  },
};

export default function ProofPage() {
  const { t, locale } = useLanguage();
  const c = content[locale === "fr" ? "fr" : "en"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-blue-600">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition text-sm font-medium">
            <ArrowLeft size={16} /> {t.nav.backToSite}
          </Link>
          <div className="text-white font-bold tracking-wider">SYNOBOTIX</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-16 max-w-3xl">
          <div className="text-sm font-mono text-blue-400 mb-4">{c.kicker}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            {c.title}
          </h1>
          <p className="text-xl text-blue-300 mb-6">{c.subtitle}</p>
          <p className="text-slate-400 leading-relaxed">{c.intro}</p>
          <p className="mt-6 text-sm text-slate-500 italic">{c.repoPending}</p>
        </div>

        {/* Benchmark table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">{c.benchmarkTitle}</h2>
          <p className="text-sm text-slate-500 mb-6">{c.benchmarkNote}</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead className="bg-slate-900">
                <tr>
                  <th className="text-left px-6 py-3 text-slate-400 font-medium">{locale === "fr" ? "Métrique" : "Metric"}</th>
                  <th className="text-left px-6 py-3 text-slate-400 font-medium">Gazebo (sim)</th>
                  <th className="text-left px-6 py-3 text-slate-400 font-medium">Jetson Orin Nano</th>
                </tr>
              </thead>
              <tbody>
                {c.metrics.map((m) => (
                  <tr key={m.label} className="border-t border-slate-800">
                    <td className="px-6 py-4 text-white font-medium">
                      {m.label}
                      <div className="text-xs text-slate-500 font-normal mt-1">{m.note}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">–</td>
                    <td className="px-6 py-4 text-slate-500">–</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">{c.benchmarkPending}</p>
        </section>

        {/* Config snippet */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">{c.configTitle}</h2>
          <p className="text-sm text-slate-500 mb-6">{c.configNote}</p>
          <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 text-xs leading-6 text-slate-300">
            <code>{configYaml}</code>
          </pre>
          <p className="text-xs text-slate-500 mt-4 flex items-center gap-2">
            <ShieldCheck size={14} className="shrink-0" /> {c.licenseNote}
          </p>
        </section>

        {/* What this isn't */}
        <section className="mb-16 rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <h2 className="text-xl font-bold text-white mb-3">{c.notTitle}</h2>
          <p className="text-slate-400">{c.notBody}</p>
        </section>

        {/* CTA */}
        <div className="text-center rounded-3xl border border-slate-800 bg-slate-900 p-10">
          <h3 className="text-2xl font-bold text-white mb-4">{c.ctaTitle}</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">{c.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/remiboivin021/diagnostic"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ event: "calendly_click", href: "https://calendly.com/remiboivin021/diagnostic", source: "proof_cta" })}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap"
            >
              {c.ctaButton} <ArrowRight size={18} />
            </a>
            <Link href="/faq" className="border border-slate-700 text-slate-300 px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition flex items-center gap-2 whitespace-nowrap">
              {c.faqLink} <CircleHelp size={18} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
