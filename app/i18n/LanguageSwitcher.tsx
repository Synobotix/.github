"use client";

import { useLanguage } from "./LanguageContext";
import { Globe } from "lucide-react";
import posthog from "posthog-js";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const handleSwitch = () => {
    const nextLocale = locale === "fr" ? "en" : "fr";
    posthog.capture("language_switched", { from_locale: locale, to_locale: nextLocale });
    setLocale(nextLocale);
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
      title={locale === "fr" ? "Switch to English" : "Passer en français"}
    >
      <Globe size={18} />
      <span className="uppercase">{locale}</span>
    </button>
  );
}