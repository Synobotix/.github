import { OFFRES_DATA, type Offre } from "@/data/offres";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import ServiceDetailContent from "./ServiceDetailContent";
import MilestoneSprintDetail from "./MilestoneSprintDetail";
import TacticalRetainerContent from "./TacticalRetainerContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const offre = OFFRES_DATA.find((o) => o.slug === slug);
  
  if (!offre) return { title: 'Offre non trouvée' };

  const isEn = slug.startsWith('-en') || slug.includes('-en');
  return {
    title: `${isEn ? offre.nomEn : offre.nom} | Synobotix Edge AI Engineering`,
    description: isEn && offre.metadescriptionEn ? offre.metadescriptionEn : offre.metadescription,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${isEn ? offre.nomEn : offre.nom} | Synobotix`,
      description: isEn && offre.metadescriptionEn ? offre.metadescriptionEn : offre.metadescription,
      url: `https://synobotix.com/services/${slug}`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return OFFRES_DATA.map((offre) => ({
    slug: offre.slug,
  }));
}

export default async function OffreDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offre = OFFRES_DATA.find((o) => o.slug === slug);

  if (!offre) {
    notFound();
  }

  const isEn = slug.startsWith('-en') || slug.includes('-en');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? offre.nomEn : offre.nom,
    provider: {
      '@type': 'Organization',
      name: 'Synobotix',
      url: 'https://synobotix.com',
    },
    description: isEn && offre.metadescriptionEn ? offre.metadescriptionEn : offre.metadescription,
    areaServed: ['US', 'FR', 'EU'],
    url: `https://synobotix.com/services/${slug}`,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://synobotix.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://synobotix.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isEn ? offre.nomEn : offre.nom,
        item: `https://synobotix.com/services/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {slug === "tactical-retainer" ? (
        <TacticalRetainerContent />
      ) : slug === "milestone-sprint" ? (
        <MilestoneSprintDetail />
      ) : (
        <ServiceDetailContent offre={offre} />
      )}
    </>
  );
}
