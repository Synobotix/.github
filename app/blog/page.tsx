"use client";

import Link from "next/link";
import { fetchAPI } from "@/lib/wp";
import { ArrowLeft, Calendar } from "lucide-react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { useEffect, useState } from "react";
import posthog from "posthog-js";

const GET_ALL_POSTS = `
  query GetAllPosts {
    posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export default function BlogIndex() {
  const { t, locale } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI(GET_ALL_POSTS).then((data: any) => {
      setPosts(data?.posts?.nodes || []);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition text-sm font-medium">
            <ArrowLeft size={16} /> {t.nav.backToSite}
          </Link>
          <div className="text-white font-bold tracking-wider">SYNOBOTIX/BLOG</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t.blog.title}</h1>
        <p className="text-xl text-slate-400 mb-16 max-w-2xl">
          {t.blog.subtitle}
        </p>

        {loading ? (
          <div className="text-center py-12 text-slate-500">
            {locale === "fr" ? "Chargement..." : "Loading..."}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            {locale === "fr" ? "Aucun article disponible." : "No articles available."}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                onClick={() => posthog.capture("blog_article_clicked", { article_slug: post.slug, article_title: post.title })}
                className="group flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition duration-300"
              >
                <div className="aspect-video bg-slate-800 relative overflow-hidden">
                  {post.featuredImage?.node?.sourceUrl ? (
                    <img 
                      src={post.featuredImage.node.sourceUrl} 
                      alt={post.featuredImage.node.altText || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-sm">
                      {`// NO_IMAGE`}
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-blue-400 font-mono mb-3">
                    <Calendar size={14} />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(locale === "fr" ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition" dangerouslySetInnerHTML={{ __html: post.title }} />
                  <div className="text-sm text-slate-400 line-clamp-3 mb-6" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  
                  <div className="mt-auto text-sm font-bold text-slate-300 group-hover:text-white flex items-center gap-2">
                    {t.blog.readArticle} <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}