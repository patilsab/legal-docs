import { MetadataRoute } from 'next';
import { US_STATES } from '@/lib/state-engine';

const DOCUMENT_TYPES = [
  'eviction-notice', 'lease-agreement', 'power-of-attorney', 'divorce-papers',
  'last-will', 'bill-of-sale', 'promissory-note', 'nda', 'rental-application',
  'living-will', 'child-custody', 'separation-agreement', 'purchase-agreement',
  'affidavit', 'cease-desist', 'medical-authorization', 'residential-lease',
  'quitclaim-deed', 'loan-agreement', 'business-plan', 'llc-operating-agreement',
  'employment-contract', 'revocable-living-trust', 'commercial-lease',
  'prenuptial-agreement', 'pour-over-will', 'durable-power-of-attorney',
  'medical-power-of-attorney', 'advance-healthcare-directive', 'irrevocable-trust',
  'warranty-deed', 'contract-for-deed', 'easement-agreement', 'complaint',
  'answer', 'discovery', 'summary-judgment',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://legal-docs-patilsabs-projects.vercel.app';
  const pages: MetadataRoute.Sitemap = [];

  // Static pages
  pages.push({ url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 });
  pages.push({ url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  pages.push({ url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
  pages.push({ url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 });
  pages.push({ url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 });

  // Document pages
  for (const doc of DOCUMENT_TYPES) {
    pages.push({ url: `${baseUrl}/${doc}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 });
  }

  // State pages
  for (const state of US_STATES) {
    if (state.abbr === 'DC') continue;
    const slug = state.name.toLowerCase().replace(/\s+/g, '-');
    pages.push({ url: `${baseUrl}/state/${slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  }

  // Doc + State pages
  for (const doc of DOCUMENT_TYPES) {
    for (const state of US_STATES) {
      if (state.abbr === 'DC') continue;
      const slug = state.name.toLowerCase().replace(/\s+/g, '-');
      pages.push({ url: `${baseUrl}/${doc}/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 });
    }
  }

  return pages;
}
