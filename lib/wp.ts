const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
    console.log("ENV:", process.env.NEXT_PUBLIC_WP_API_URL)

  if (!API_URL) {
    throw new Error("L'URL de l'API WordPress n'est pas définie dans .env.local");
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
    // Revalidation toutes les 60 secondes (ISR) pour avoir un blog performant mais à jour
    next: { revalidate: 60 },
  });

const json = await res.json();

if (json.errors) {
  // Affiche l'erreur détaillée dans votre console terminal
  console.log("DÉTAILS ERREUR GRAPHQL:", JSON.stringify(json.errors, null, 2));
  throw new Error('Erreur WPGraphQL : regardez les logs du terminal');
}

  return json.data;
}