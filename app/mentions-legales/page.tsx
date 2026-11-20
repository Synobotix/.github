"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function MentionsLegalesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-600 selection:text-white">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition text-sm font-medium">
            <ArrowLeft size={16} /> {t.nav.backToSite}
          </Link>
          <div className="text-white font-bold tracking-wider">SYNOBOTIX</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-white mb-12">{t.legal.title}</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.legal.publisher.title}</h2>
            <p className="text-slate-400">
              {t.legal.publisher.content}<br />
              <strong className="text-white">{t.legal.publisher.name}</strong><br />
              {t.legal.publisher.desc}<br />
              {t.legal.publisher.country}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.legal.hosting.title}</h2>
            <p className="text-slate-400">
              {t.legal.hosting.content}<br />
              <strong className="text-white">{t.legal.hosting.name}</strong><br />
              {t.legal.hosting.address}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.legal.intellectualProperty.title}</h2>
            <p className="text-slate-400">
              {t.legal.intellectualProperty.content}
            </p>
            <p className="text-slate-400 mt-4">
              {t.legal.intellectualProperty.content2}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.legal.liability.title}</h2>
            <p className="text-slate-400">
              {t.legal.liability.content}
            </p>
            <p className="text-slate-400 mt-4">
              {t.legal.liability.content2}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.legal.links.title}</h2>
            <p className="text-slate-400">
              {t.legal.links.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.legal.law.title}</h2>
            <p className="text-slate-400">
              {t.legal.law.content}
            </p>
          </section>

          <section>
            <p className="text-slate-500 text-sm mt-12">
              {t.legal.lastUpdate}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}