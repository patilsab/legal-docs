import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: 'https://legal-docs-patilsabs-projects.vercel.app/sitemap.xml',
  };
}
