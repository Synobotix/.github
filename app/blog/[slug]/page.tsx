import { fetchAPI } from "@/lib/wp";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const GET_POST_BY_SLUG = `
  query GetPostBySlug($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      title
      content
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

const GET_ALL_SLUGS = `
  query GetAllSlugs {
    posts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

// Required by the static export (GitHub Pages); harmless on the server build.
export async function generateStaticParams() {
  try {
    const data = await fetchAPI(GET_ALL_SLUGS);
    return (data?.posts?.nodes ?? []).map((n: { slug: string }) => ({ slug: n.slug }));
  } catch {
    return [];
  }
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchAPI(GET_POST_BY_SLUG, {
    variables: {
      id: slug,
      idType: "SLUG",
    },
  });
  const post = data?.post;

  if (!post) {
    return {
      title: "Blog article not found | Synobotix",
    };
  }

  const title = `${stripHtml(post.title)} | Synobotix`;
  const description = stripHtml(post.excerpt || post.content || "").slice(0, 155);

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://synobotix.com/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : undefined,
    },
  };
}

// On définit le type des params comme une Promise
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  
  // ÉTAPE CRUCIALE : On attend que les params soient résolus
  const { slug } = await params;

  const data = await fetchAPI(GET_POST_BY_SLUG, {
    variables: {
      id: slug, // Maintenant slug contient bien la valeur
      idType: "SLUG",
    },
  });

  const post = data?.post;

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: stripHtml(post.title),
    datePublished: post.date,
    image: post.featuredImage?.node?.sourceUrl,
    author: {
      "@type": "Organization",
      name: "Synobotix",
      url: "https://synobotix.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Synobotix",
      logo: {
        "@type": "ImageObject",
        url: "https://synobotix.com/logo.svg",
      },
    },
    mainEntityOfPage: `https://synobotix.com/blog/${slug}`,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/blog" className="text-slate-400 hover:text-white flex items-center gap-2 transition text-sm font-medium w-max">
            <ArrowLeft size={16} /> Retour aux articles
          </Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-blue-400 font-mono mb-6">
            <Calendar size={16} />
            <time>
              {new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8" dangerouslySetInnerHTML={{ __html: post.title }} />
          
          {post.featuredImage?.node?.sourceUrl && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-800">
              <img 
                src={post.featuredImage.node.sourceUrl} 
                alt={post.featuredImage.node.altText || stripHtml(post.title)}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        <div 
          className="prose prose-invert prose-lg prose-slate max-w-none 
                     prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  );
}
