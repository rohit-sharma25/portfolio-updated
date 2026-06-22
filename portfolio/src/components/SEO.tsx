import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = 'https://rohit-sharma.dev';
const DEFAULT_TITLE = 'Rohit Sharma - AI Engineer & Full Stack Architect';
const DEFAULT_DESCRIPTION =
  'Building intelligent digital products that solve real-world problems. AI-powered systems, modern web applications, and scalable products by Rohit Sharma.';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl = BASE_URL,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  jsonLd,
}: SEOProps) {
  const fullTitle = title ? `${title} | Rohit Sharma` : DEFAULT_TITLE;

  return (
    <Helmet>
      {/* Standard meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Rohit Sharma Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Rohit Sharma" />
      <meta name="keywords" content="AI Engineer, Full Stack Developer, Machine Learning, RAG, NLP, React, TypeScript, Python, Portfolio" />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

/** Structured data for the Person/Profile page */
export function personStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rohit Sharma',
    givenName: 'Rohit',
    familyName: 'Sharma',
    jobTitle: 'AI Engineer & Full Stack Architect',
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    sameAs: [
      'https://github.com/rohit-sharma25',
      'https://www.linkedin.com/in/rohit-sharma225/',
      'https://www.instagram.com/rohiittt.s/',
    ],
    email: 'rohit.sharma.rnks@gmail.com',
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Full Stack Development',
      'RAG Pipelines',
      'Natural Language Processing',
      'System Architecture',
      'Product Development',
    ],
  };
}
