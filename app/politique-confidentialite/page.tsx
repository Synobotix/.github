"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function PolitiqueConfidentialitePage() {
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
        <h1 className="text-4xl font-extrabold text-white mb-12">{t.privacy.title}</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.privacy.intro.title}</h2>
            <p className="text-slate-400">
              {t.privacy.intro.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.privacy.data.title}</h2>
            <p className="text-slate-400">
              {t.privacy.data.content}
            </p>
            <ul className="list-disc list-inside text-slate-400 mt-4 space-y-2">
              {t.privacy.data.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.privacy.purposes.title}</h2>
            <p className="text-slate-400">
              {t.privacy.purposes.content}
            </p>
            <ul className="list-disc list-inside text-slate-400 mt-4 space-y-2">
              {t.privacy.purposes.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.privacy.legalBasis.title}</h2>
            <p className="text-slate-400">
              {t.privacy.legalBasis.content}
            </p>
            <ul className="list-disc list-inside text-slate-400 mt-4 space-y-2">
              {t.privacy.legalBasis.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.privacy.retention.title}</h2>
            <p className="text-slate-400">
              {t.privacy.retention.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.privacy.rights.title}</h2>
            <p className="text-slate-400">
              {t.privacy.rights.content}
            </p>
            <ul className="list-disc list-inside text-slate-400 mt-4 space-y-2">
              {t.privacy.rights.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-400 mt-4">
              {t.privacy.rights.contact}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.privacy.security.title}</h2>
            <p className="text-slate-400">
              {t.privacy.security.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.privacy.cookies.title}</h2>
            <p className="text-slate-400">
              {t.privacy.cookies.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t.privacy.contact.title}</h2>
            <p className="text-slate-400">
              {t.privacy.contact.content}
            </p>
          </section>

          <section>
            <p className="text-slate-500 text-sm mt-12">
              {t.privacy.lastUpdate}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}