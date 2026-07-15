import Link from 'next/link';
import { notFound } from 'next/navigation';

const guides: Record<string, { name: string; abbr: string; icon: string; topics: string[]; content: string }> = {
  'california': { name: 'California', abbr: 'CA', icon: '\u{1f334}', topics: ['Rent Control', 'Employment Law', 'Business Regulations'], content: 'California has some of the most comprehensive tenant protections in the US, including rent control in certain cities.' },
  'texas': { name: 'Texas', abbr: 'TX', icon: '\u2b50', topics: ['Property Tax', 'Business Friendly', 'No State Income Tax'], content: 'Texas is known for its business-friendly environment with no state income tax and relatively low regulations.' },
  'florida': { name: 'Florida', abbr: 'FL', icon: '\u{1f30a}', topics: ['Homestead Exemption', 'Probate', 'No State Income Tax'], content: 'Florida offers strong homestead protections and no state income tax, making it attractive for retirees.' },
  'new-york': { name: 'New York', abbr: 'NY', icon: '\u{1f5fd}', topics: ['Rent Stabilization', 'Employment Law', 'Business Regulations'], content: 'New York has strict rent stabilization laws in NYC and comprehensive employment protections.' },
  'illinois': { name: 'Illinois', abbr: 'IL', icon: '\u{1f3d9}\ufe0f', topics: ['Chicago RLTO', 'Property Tax', 'Business Law'], content: 'Illinois, particularly Chicago, has the Residential Landlord Tenant Ordinance (RLTO) with strong tenant protections.' },
};

export async function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) return { title: 'Not Found' };
  return { title: `${guide.name} Law Guide | LegalDocs`, description: `Comprehensive guide to ${guide.name} legal requirements.` };
}

export default async function GuideStatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link><span className="mx-2">/</span>
            <Link href="/guides" className="hover:text-blue-600">Guides</Link><span className="mx-2">/</span>
            <span className="text-gray-900">{guide.name}</span>
          </nav>
        </div>
      </div>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="text-5xl mb-4">{guide.icon}</div>
          <h1 className="text-3xl font-bold text-white">{guide.name} Law Guide</h1>
          <p className="mt-2 text-blue-100">Comprehensive legal requirements and regulations</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {guide.topics.map((topic) => (
              <span key={topic} className="rounded-full bg-white/20 px-3 py-1 text-sm text-white">{topic}</span>
            ))}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Overview of {guide.name} Law</h2>
          <p className="mb-6 text-lg text-gray-700">{guide.content}</p>
          <h3 className="mb-3 text-xl font-bold text-gray-900">Key Legal Topics in {guide.name}</h3>
          <ul className="mb-6 space-y-2">
            {guide.topics.map((topic) => (
              <li key={topic} className="flex items-center gap-2 text-gray-700"><span className="text-blue-600">\u25cf</span>{topic}</li>
            ))}
          </ul>
          <h3 className="mb-3 text-xl font-bold text-gray-900">Legal Documents for {guide.name}</h3>
          <p className="mb-4 text-gray-700">Browse our free, state-specific legal document templates customized for {guide.name} law.</p>
          <Link href="/" className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">Browse Documents</Link>
        </div>
        <div className="mt-8 rounded-xl bg-blue-50 p-6">
          <h3 className="mb-3 text-lg font-bold text-gray-900">Related Resources</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/directory" className="rounded-lg bg-white px-4 py-2 text-sm text-gray-700 shadow-sm hover:shadow-md">Legal Directory</Link>
            <Link href="/blog" className="rounded-lg bg-white px-4 py-2 text-sm text-gray-700 shadow-sm hover:shadow-md">Legal Blog</Link>
            <Link href="/guides" className="rounded-lg bg-white px-4 py-2 text-sm text-gray-700 shadow-sm hover:shadow-md">All State Guides</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
