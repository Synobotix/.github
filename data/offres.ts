export type OffreFeature = {
  text: string;
  detail?: string; // Optionnel : pour afficher plus d'info au survol/clic
  textEn?: string;
  detailEn?: string;
};

export type Offre = {
  slug: string; // L'identifiant dans l'URL
  nom: string;
  nomEn?: string;
  tagline: string;
  taglineEn?: string;
  description: string;
  descriptionEn?: string;
  prix: string; // EUR display price (EU market)
  prixEn?: string; // USD display price (US market)
  priceUnit: string; // e.g. "/ sprint de 4 semaines"
  priceUnitEn?: string; // e.g. "/ 4-week sprint"
  priceNote: string; // fixed-price scope, payment and entry terms
  priceNoteEn?: string;
  capacityNote: string; // entry conditions and staffing guarantee
  capacityNoteEn?: string;
  features: OffreFeature[];
  highlight: boolean;
  cta: string;
  ctaEn?: string;
  metadescription: string;
  metadescriptionEn?: string;
  category: "sprint" | "retainer";
};

export const OFFRES_DATA: Offre[] = [
  {
    slug: "milestone-sprint",
    nom: "Milestone Sprint",
    nomEn: "Milestone Sprint",
    tagline: "Quatre semaines, un périmètre fixe, un prix connu d'avance.",
    taglineEn: "Four weeks, a fixed scope, a price you know upfront.",
    description:
      "Pour une startup robotique dont le modèle fonctionne déjà quelque part et doit maintenant tourner sur la vraie machine, sous charge, devant un client ou un relecteur. Tout commence par l'audit de faisabilité (48 heures, 4 000 € HT) : mesure de référence sur votre matériel, décision écrite (go, go avec réserves, no-go), périmètre gelé et critères de recette chiffrés. Le sprint de quatre semaines tient ensuite ces critères, au prix fixe.",
    descriptionEn:
      "For a robotics startup whose model already works somewhere and now has to run on the real machine, under load, in front of a customer or a reviewer. It starts with the feasibility audit (48 hours, $4,640 excl. VAT): a baseline measured on your hardware, a written decision (go, go with reservations, no-go), a frozen scope and quantified acceptance criteria. The four-week sprint then delivers against those criteria, at a fixed price.",
    prix: "65 000 €",
    prixEn: "$75,400",
    priceUnit: "/ sprint de 4 semaines",
    priceUnitEn: "/ 4-week sprint",
    priceNote:
      "HT. Prix fixe valable uniquement sur le périmètre validé par l'audit. Paiement 50 % à la commande, 50 % à la recette. Hors périmètre : avenant à 750 € HT par jour. L'audit de faisabilité (4 000 € HT, 48 heures) est déduit du sprint signé sous 30 jours.",
    priceNoteEn:
      "Excl. VAT. Fixed price, valid only on the scope validated by the audit. Payment 50% at order, 50% at acceptance. Out of scope: change order at $870 excl. VAT per day. The feasibility audit ($4,640 excl. VAT, 48 hours) is deducted from a sprint signed within 30 days.",
    capacityNote:
      "Ingénieurs seniors uniquement. Conditions d'entrée : accès au matériel et aux données dès le premier jour, interlocuteur technique sous 24 heures, build reproductible.",
    capacityNoteEn:
      "Senior engineers only. Entry conditions: access to hardware and data from day one, a technical contact within 24 hours, a reproducible build.",
    highlight: true,
    cta: "Réserver l'audit de faisabilité",
    ctaEn: "Book the Feasibility Audit",
    metadescription:
      "Audit de faisabilité en 48 h puis Milestone Sprint de 4 semaines à prix fixe : quantification à un budget écrit, enveloppe de sûreté déterministe, tests HIL et passation enregistrée.",
    metadescriptionEn:
      "48-hour feasibility audit followed by a fixed-price 4-week Milestone Sprint: quantization to a written budget, deterministic safety envelope, HIL tests and a recorded handoff.",
    category: "sprint",
    features: [
      {
        text: "Audit de faisabilité en 48 h",
        detail: "Mesure de référence sur votre matériel, décision écrite (go, go avec réserves, no-go), périmètre gelé et critères de recette chiffrés.",
        textEn: "48-Hour Feasibility Audit",
        detailEn: "A baseline measured on your hardware, a written decision (go, go with reservations, no-go), a frozen scope and quantified acceptance criteria.",
      },
      {
        text: "Quantification et travail sur le graphe",
        detail: "Optimisation jusqu'au budget de calcul défini par écrit (latence, mémoire, énergie), avec suivi hebdomadaire des jours consommés.",
        textEn: "Quantization & Graph Optimization",
        detailEn: "Optimization down to the compute budget defined in writing (latency, memory, energy), with weekly tracking of days consumed.",
      },
      {
        text: "Enveloppe de sûreté déterministe",
        detail: "Garde-fou déterministe spécifié par écrit : filtrage des commandes IA, limites de zone, repli watchdog en cas de dépassement ou de timeout.",
        textEn: "Deterministic Safety Envelope",
        detailEn: "A deterministic guard specified in writing: filtering of AI commands, geofencing, and a watchdog fallback on violation or timeout.",
      },
      {
        text: "Tests HIL et recette chiffrée",
        detail: "Suite de tests Hardware-in-the-Loop et rapport de performance mesuré, que vous pouvez reproduire, face aux critères de recette fixés par l'audit.",
        textEn: "HIL Tests & Quantified Acceptance",
        detailEn: "A Hardware-in-the-Loop test suite and a measured performance report you can reproduce, against the acceptance criteria set by the audit.",
      },
      {
        text: "Passation enregistrée",
        detail: "Branche de code livrée, contrat d'interface documenté, registre de risques et session de passation enregistrée.",
        textEn: "Recorded Handoff",
        detailEn: "Delivered working branch, documented interface contract, risk register and a recorded handoff session.",
      },
    ],
  },
  {
    slug: "tactical-retainer",
    nom: "Tactical Retainer",
    nomEn: "Tactical Retainer",
    tagline: "Une équipe dédiée d'ingénieurs seniors nommés, mois après mois.",
    taglineEn: "A dedicated team of named senior engineers, month after month.",
    description:
      "Pour les programmes qui partent d'un besoin et non d'un modèle existant, ou qui doivent construire en continu sur l'IA embarquée sans passer des mois à recruter. Nous concevons l'architecture et la stratégie de données, construisons, entraînons et validons le modèle de bout en bout sur une feuille de route mensuelle, puis faisons monter votre équipe en compétence. Un contrat « construire, opérer, transférer ».",
    descriptionEn:
      "For programs that start from a need rather than an existing model, or that must keep building on embedded AI without spending months recruiting. We design the architecture and data strategy, build, train and validate the model end to end on a monthly roadmap, then upskill your team. A \"build, operate, transfer\" contract.",
    prix: "56 000 €",
    prixEn: "$64,960",
    priceUnit: "/ mois",
    priceUnitEn: "/ month",
    priceNote:
      "HT, équipe dédiée. Durée minimale de 6 mois, préavis de résiliation de 60 jours, facturation mensuelle d'avance. Livraison par jalons vérifiables, pas un forfait d'heures.",
    priceNoteEn:
      "Excl. VAT, dedicated team. 6-month minimum term, 60-day termination notice, billed monthly in advance. Delivery by verifiable milestones, not a block of hours.",
    capacityNote:
      "Ingénieurs seniors nommés, sans juniors ni sous-traitance. Accès au matériel et aux données dès le premier jour.",
    capacityNoteEn:
      "Named senior engineers, no juniors, no subcontracting. Access to hardware and data from day one.",
    highlight: false,
    cta: "Réserver un appel de cadrage retainer",
    ctaEn: "Book a Retainer Scoping Call",
    metadescription:
      "Tactical Retainer : équipe dédiée d'ingénieurs seniors nommés, 6 mois minimum, facturation mensuelle. Architecture, perception, optimisation edge et transfert de compétence.",
    metadescriptionEn:
      "Tactical Retainer: a dedicated team of named senior engineers, 6-month minimum, billed monthly. Architecture, perception, edge optimization and skills transfer.",
    category: "retainer",
    features: [
      {
        text: "Architecture et stratégie de données",
        detail: "Choix des capteurs, des cibles de calcul, du pipeline de données et des métriques qui font foi.",
        textEn: "Architecture & Data Strategy",
        detailEn: "Choice of sensors, compute targets, data pipeline and the metrics that count.",
      },
      {
        text: "Modèle construit, entraîné et validé",
        detail: "Développement de bout en bout sur une feuille de route mensuelle, avec perception et fusion multi-capteurs validées sur la vraie machine.",
        textEn: "Model Built, Trained & Validated",
        detailEn: "End-to-end development on a monthly roadmap, with perception and multi-sensor fusion validated on the real machine.",
      },
      {
        text: "Ingénieurs seniors nommés",
        detail: "Ce sont nos ingénieurs seniors qui écrivent le code, prennent les décisions d'architecture et en portent la responsabilité, jamais une revue du travail d'un junior ou d'un sous-traitant.",
        textEn: "Named Senior Engineers",
        detailEn: "Our senior engineers write the code, make the architecture calls and own the outcome, never a review of work delegated to a junior or subcontractor.",
      },
      {
        text: "Transfert de compétence",
        detail: "Documentation, aide à vos recrutements et passation progressive de la capacité à votre équipe.",
        textEn: "Skills Transfer",
        detailEn: "Documentation, help with your hiring, and a gradual handover of the capability to your team.",
      },
      {
        text: "Continuité garantie",
        detail: "La continuité ne dépend jamais d'une seule personne : chaque livrable inclut un contrat d'interface documenté, donc un changement d'ingénieur sur le projet ne repart jamais de zéro.",
        textEn: "Guaranteed Continuity",
        detailEn: "Continuity never depends on a single person: every deliverable ships with a documented interface contract, so a change of engineer on the project never starts from zero.",
      },
    ],
  },
];
