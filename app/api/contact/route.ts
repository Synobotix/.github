import { NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";

const resendApiKey = process.env.RESEND_API_KEY;
const contactToEmail = process.env.CONTACT_TO_EMAIL ?? "contact@synobotix.com";
const contactFromEmail = process.env.CONTACT_FROM_EMAIL ?? "Synobotix <onboarding@resend.dev>";

type ContactPayload = {
  nom?: string;
  email?: string;
  entreprise?: string;
  telephone?: string;
  projet?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value?: string) {
  return value?.trim() ?? "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  if (!resendApiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as ContactPayload;

  const nom = sanitize(body.nom);
  const email = sanitize(body.email);
  const entreprise = sanitize(body.entreprise);
  const telephone = sanitize(body.telephone);
  const projet = sanitize(body.projet);
  const message = sanitize(body.message);

  const safeNom = escapeHtml(nom);
  const safeEmail = escapeHtml(email);
  const safeEntreprise = escapeHtml(entreprise || "Non renseignée");
  const safeTelephone = escapeHtml(telephone || "Non renseigné");
  const safeProjet = escapeHtml(projet || "Non renseigné");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  if (!nom || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        reply_to: email,
        subject: `[Synobotix] Nouvelle demande - ${projet || "Contact"}`,
        text: [
          `Nom: ${nom}`,
          `Email: ${email}`,
          `Entreprise: ${entreprise || "Non renseignée"}`,
          `Téléphone: ${telephone || "Non renseigné"}`,
          `Projet: ${projet || "Non renseigné"}`,
          "",
          "Message:",
          message,
        ].join("\n"),
        html: `
          <h2>Nouvelle demande de contact</h2>
          <p><strong>Nom :</strong> ${safeNom}</p>
          <p><strong>Email :</strong> ${safeEmail}</p>
          <p><strong>Entreprise :</strong> ${safeEntreprise}</p>
          <p><strong>Téléphone :</strong> ${safeTelephone}</p>
          <p><strong>Projet :</strong> ${safeProjet}</p>
          <hr />
          <p><strong>Message :</strong></p>
          <p>${safeMessage}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Resend API error", errorBody);
      throw new Error("Resend request failed");
    }

    const ph = getPostHogClient();
    ph.identify({
      distinctId: email,
      properties: { name: nom, email, company: entreprise || null },
    });
    ph.capture({
      distinctId: email,
      event: "contact_email_sent",
      properties: { projet, entreprise: entreprise || null },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error", error);

    const ph = getPostHogClient();
    ph.capture({
      distinctId: email || "anonymous",
      event: "contact_email_failed",
      properties: { projet },
    });

    return NextResponse.json(
      { error: "Unable to send message." },
      { status: 500 },
    );
  }
}
