import Link from 'next/link';
import { notFound } from 'next/navigation';

const states: Record<string, { name: string; abbr: string; attorneys: number; legalAid: number; barAssociation: string; legalAidOrgs: string[] }> = {
  'alabama': { name: 'Alabama', abbr: 'AL', attorneys: 2450, legalAid: 12, barAssociation: 'Alabama State Bar', legalAidOrgs: ['Legal Services Alabama', 'Alabama Legal Aid'] },
  'alaska': { name: 'Alaska', abbr: 'AK', attorneys: 1800, legalAid: 8, barAssociation: 'Alaska Bar Association', legalAidOrgs: ['Alaska Legal Services', 'Alaska Public Defender'] },
  'arizona': { name: 'Arizona', abbr: 'AZ', attorneys: 8500, legalAid: 15, barAssociation: 'State Bar of Arizona', legalAidOrgs: ['Arizona Legal Aid', 'Community Legal Services'] },
  'california': { name: 'California', abbr: 'CA', attorneys: 170000, legalAid: 45, barAssociation: 'State Bar of California', legalAidOrgs: ['Legal Aid Foundation', 'Bay Area Legal Aid'] },
  'florida': { name: 'Florida', abbr: 'FL', attorneys: 72000, legalAid: 32, barAssociation: 'The Florida Bar', legalAidOrgs: ['Florida Legal Services', 'Legal Aid Society'] },
  'georgia': { name: 'Georgia', abbr: 'GA', attorneys: 35000, legalAid: 22, barAssociation: 'State Bar of Georgia', legalAidOrgs: ['Georgia Legal Services', 'Atlanta Legal Aid'] },
  'illinois': { name: 'Illinois', abbr: 'IL', attorneys: 62000, legalAid: 28, barAssociation: 'Illinois State Bar Association', legalAidOrgs: ['Legal Aid Chicago', 'Prairie State Legal Services'] },
  'new-york': { name: 'New York', abbr: 'NY', attorneys: 180000, legalAid: 52, barAssociation: 'New York State Bar Association', legalAidOrgs: ['Legal Aid Society', 'Legal Services NYC'] },
  'texas': { name: 'Texas', abbr: 'TX', attorneys: 92000, legalAid: 38, barAssociation: 'State Bar of Texas', legalAidOrgs: ['Texas RioGrande Legal Aid', 'Lone Star Legal Aid'] },
  'ohio': { name: 'Ohio', abbr: 'OH', attorneys: 42000, legalAid: 22, barAssociation: 'Ohio State Bar Association', legalAidOrgs: ['Legal Aid Society of Cleveland', 'Ohio Legal Aid'] },
};

export async function generateStaticParams() {
  return Object.keys(states).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const state = states[slug];
  if (!state) return { title: 'Not Found' };
  return { title: `Legal Services in ${state.name} | LegalDocs Directory`, description: `Find attorneys and legal resources in ${state.name}.` };
}

export default async function DirectoryStatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const state = states[slug];
  if (!state) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link><span className="mx-2">/</span>
            <Link href="/directory" className="hover:text-blue-600">Directory</Link><span className="mx-2">/</span>
            <span className="text-gray-900">{state.name}</span>
          </nav>
        </div>
      </div>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl font-bold text-white">Legal Services in {state.name}</h1>
          <p className="mt-2 text-blue-100">{state.attorneys.toLocaleString()} attorneys and {state.legalAid} legal aid organizations</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">{state.barAssociation}</h2>
            <p className="mb-4 text-gray-600">Find licensed attorneys in {state.name} through the state bar association.</p>
            <a href="#" className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Find an Attorney</a>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Legal Aid Organizations</h2>
            <ul className="space-y-2">
              {state.legalAidOrgs.map((org) => (
                <li key={org} className="flex items-center gap-2 text-gray-700"><span className="text-green-500">\u2713</span>{org}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 rounded-xl bg-blue-50 p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Free Legal Documents for {state.name}</h2>
          <p className="mb-4 text-gray-600">Browse our free, state-specific legal document templates for {state.name}.</p>
          <Link href="/" className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Browse Documents</Link>
        </div>
      </div>
    </div>
  );
}
