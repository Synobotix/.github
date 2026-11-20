"use client";

import { useState } from "react";
import { ArrowRight, MapPin, Clock, CheckCircle2 } from "lucide-react";
import Footer from "@/app/components/Footer";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { useScrollReveal } from "@/app/components/useScrollReveal";
import { API_BASE_URL, trackEvent } from "@/lib/track";
import posthog from "posthog-js";

function getInitialProject() {
  if (typeof window === "undefined") {
    return "milestone-sprint";
  }

  const projet = new URLSearchParams(window.location.search).get("projet");

  return projet && ["milestone-sprint", "tactical-retainer", "not-sure", "autre"].includes(projet)
    ? projet
    : "milestone-sprint";
}

function L(en: string, fr: string, isFr: boolean) {
  return isFr ? fr : en;
}

export default function ContactPage() {
  const { t, locale } = useLanguage();
  const isFr = locale === "fr";
  const [initialProject] = useState(getInitialProject);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    entreprise: "",
    telephone: "",
    projet: initialProject,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useScrollReveal(".syn-section", ".syn-contact-hero");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to send message.");
      }

      setStatus("success");
      trackEvent({ event: "contact_form_submit", source: "contact_page" });
      posthog.identify(formData.email, {
        name: formData.nom,
        email: formData.email,
        company: formData.entreprise || null,
      });
      setFormData({
        nom: "",
        email: "",
        entreprise: "",
        telephone: "",
        projet: initialProject,
        message: "",
      });
    } catch {
      setStatus("error");
      const msg = L(
        "An error occurred. You can also write to us directly by email.",
        "Une erreur est survenue. Vous pouvez aussi nous écrire directement par email.",
        isFr,
      );
      setErrorMessage(msg);
      posthog.capture("contact_form_error", { projet: formData.projet });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="syn-site">
      <section className="syn-about-hero syn-contact-hero">
        <div className="syn-about-hero-inner">
          <p className="syn-about-eyebrow">{L("/ CONTACT", "/ CONTACT", isFr)}</p>
          <h1>
            {t.contact.title} <span>{isFr ? "jalon." : "milestone."}</span>
          </h1>
          <p className="syn-about-hero-copy">{t.contact.subtitle}</p>
        </div>
        <svg className="syn-about-svg" viewBox="0 0 1280 200" preserveAspectRatio="none" aria-hidden="true">
          <path className="syn-about-dash" d="M0 128 L120 128 L150 86 L220 86 L250 144 L340 144 L372 70 L460 70 L492 136 L580 136 L612 92 L700 92 L732 148 L820 148 L852 100 L940 100 L972 140 L1060 140 L1092 88 L1180 88 L1212 132 L1280 132" />
          <path className="syn-about-base" d="M0 160 L140 160 L180 138 L320 138 L360 164 L520 164 L560 142 L700 142 L740 168 L900 168 L940 146 L1080 146 L1120 172 L1280 172" />
        </svg>
      </section>

      <section className="syn-section">
        <div className="syn-contact-grid">
          <div className="syn-contact-info">
            <div className="syn-contact-card">
              <i><MapPin size={18} /></i>
              <div>
                <h3>{t.contact.location}</h3>
                <p>{t.contact.locationValue}</p>
              </div>
            </div>
            <div className="syn-contact-card">
              <i><Clock size={18} /></i>
              <div>
                <h3>{t.contact.availability}</h3>
                <p>{t.contact.availabilityValue}</p>
              </div>
            </div>
            <div className="syn-contact-card syn-contact-card--accent">
              <i><CheckCircle2 size={18} /></i>
              <div>
                <h3>{t.contact.freeDiagnostic}</h3>
                <p>{t.contact.freeDiagnosticDesc}</p>
              </div>
            </div>
          </div>

          <div className="syn-form">
            {status === "success" ? (
              <div className="syn-form-success">
                <i><CheckCircle2 size={32} /></i>
                <h3>{t.contact.form.success}</h3>
                <p>{t.contact.form.successDesc}</p>
                <button type="button" onClick={() => setStatus("idle")}>
                  {t.contact.form.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {status === "error" && (
                  <div className="syn-form-error">{errorMessage}</div>
                )}

                <div className="syn-form-grid">
                  <div className="syn-field">
                    <label htmlFor="nom">
                      {t.contact.form.name} <em>{t.contact.form.required}</em>
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder={t.contact.form.namePlaceholder}
                    />
                  </div>

                  <div className="syn-field">
                    <label htmlFor="email">
                      {t.contact.form.email} <em>{t.contact.form.required}</em>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                  </div>

                  <div className="syn-field">
                    <label htmlFor="entreprise">{t.contact.form.company}</label>
                    <input
                      type="text"
                      id="entreprise"
                      name="entreprise"
                      value={formData.entreprise}
                      onChange={handleChange}
                      placeholder={t.contact.form.companyPlaceholder}
                    />
                  </div>

                  <div className="syn-field">
                    <label htmlFor="telephone">{t.contact.form.phone}</label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder={t.contact.form.phonePlaceholder}
                    />
                  </div>

                  <div className="syn-field syn-field--full">
                    <label htmlFor="projet">{t.contact.form.projectType}</label>
                    <select
                      id="projet"
                      name="projet"
                      value={formData.projet}
                      onChange={handleChange}
                    >
                      <option value="milestone-sprint">{t.contact.form.projects.packEssentiel}</option>
                      <option value="tactical-retainer">{t.contact.form.projects.packAvance}</option>
                      <option value="not-sure">{t.contact.form.projects.consulting}</option>
                      <option value="autre">{t.contact.form.projects.other}</option>
                    </select>
                  </div>

                  <div className="syn-field syn-field--full">
                    <label htmlFor="message">
                      {t.contact.form.message} <em>{t.contact.form.required}</em>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.contact.form.messagePlaceholder}
                    />
                  </div>
                </div>

                <button type="submit" className="syn-button" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>{t.contact.form.sending}</>
                  ) : (
                    <>
                      {t.contact.form.submit} <ArrowRight size={15} />
                    </>
                  )}
                </button>

                <p className="syn-form-note">{t.contact.form.privacyNote}</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}