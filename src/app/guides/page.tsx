import Link from 'next/link';

export const metadata = {
  title: 'State Law Guides - Legal Requirements by State | LegalDocs',
  description: 'Comprehensive guides to state-specific legal requirements for all 50 US states.',
};

const guides = [
  { slug: 'california', name: 'California', abbr: 'CA', icon: '🌴', topics: ['Rent Control', 'Employment Law', 'Business Regulations'] },
  { slug: 'texas', name: 'Texas', abbr: 'TX', icon: '⭐', topics: ['Property Tax', 'Business Friendly', 'No State Income Tax'] },
  { slug: 'florida', name: 'Florida', abbr: 'FL', icon: '🌊', topics: ['Homestead Exemption', 'Probate', 'No State Income Tax'] },
  { slug: 'new-york', name: 'New York', abbr: 'NY', icon: '🗽', topics: ['Rent Stabilization', 'Employment Law', 'Business Regulations'] },
  { slug: 'illinois', name: 'Illinois', abbr: 'IL', icon: '🏙️', topics: ['Chicago RLTO', 'Property Tax', 'Business Law'] },
  { slug: 'pennsylvania', name: 'Pennsylvania', abbr: 'PA', icon: '🔔', topics: ['Probate', 'Property Tax', 'Business Law'] },
  { slug: 'ohio', name: 'Ohio', abbr: 'OH', icon: '🌰', topics: ['Business Friendly', 'Probate', 'Property Tax'] },
  { slug: 'georgia', name: 'Georgia', abbr: 'GA', icon: '🍑', topics: ['Business Law', 'Probate', 'Property Tax'] },
  { slug: 'north-carolina', name: 'North Carolina', abbr: 'NC', icon: '🌲', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'michigan', name: 'Michigan', abbr: 'MI', icon: '🚗', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'new-jersey', name: 'New Jersey', abbr: 'NJ', icon: '🏖️', topics: ['Property Tax', 'Business Law', 'Probate'] },
  { slug: 'virginia', name: 'Virginia', abbr: 'VA', icon: '🏛️', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'washington', name: 'Washington', abbr: 'WA', icon: '🌲', topics: ['No State Income Tax', 'Business Law', 'Property Tax'] },
  { slug: 'arizona', name: 'Arizona', abbr: 'AZ', icon: '🌵', topics: ['Business Friendly', 'Property Tax', 'Probate'] },
  { slug: 'massachusetts', name: 'Massachusetts', abbr: 'MA', icon: '📚', topics: ['Education', 'Business Law', 'Property Tax'] },
  { slug: 'tennessee', name: 'Tennessee', abbr: 'TN', icon: '🎸', topics: ['No State Income Tax', 'Business Law', 'Property Tax'] },
  { slug: 'indiana', name: 'Indiana', abbr: 'IN', icon: '🏁', topics: ['Business Friendly', 'Property Tax', 'Probate'] },
  { slug: 'maryland', name: 'Maryland', abbr: 'MD', icon: '🦀', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'missouri', name: 'Missouri', abbr: 'MO', icon: 'Gateway', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'wisconsin', name: 'Wisconsin', abbr: 'WI', icon: '🧀', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'colorado', name: 'Colorado', abbr: 'CO', icon: '🏔️', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'minnesota', name: 'Minnesota', abbr: 'MN', icon: '❄️', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'south-carolina', name: 'South Carolina', abbr: 'SC', icon: '🌴', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'alabama', name: 'Alabama', abbr: 'AL', icon: '🦅', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'louisiana', name: 'Louisiana', abbr: 'LA', icon: '⚜️', topics: ['Civil Law', 'Business Law', 'Property Tax'] },
  { slug: 'kentucky', name: 'Kentucky', abbr: 'KY', icon: '🏇', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'oregon', name: 'Oregon', abbr: 'OR', icon: '🌲', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'oklahoma', name: 'Oklahoma', abbr: 'OK', icon: ' Native', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'connecticut', name: 'Connecticut', abbr: 'CT', icon: '🍂', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'utah', name: 'Utah', abbr: 'UT', icon: '🏜️', topics: ['Business Friendly', 'Property Tax', 'Probate'] },
  { slug: 'iowa', name: 'Iowa', abbr: 'IA', icon: '🌽', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'nevada', name: 'Nevada', abbr: 'NV', icon: '🎰', topics: ['No State Income Tax', 'Business Law', 'Property Tax'] },
  { slug: 'arkansas', name: 'Arkansas', abbr: 'AR', icon: '💎', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'mississippi', name: 'Mississippi', abbr: 'MS', icon: '🎵', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'kansas', name: 'Kansas', abbr: 'KS', icon: '🌾', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'new-mexico', name: 'New Mexico', abbr: 'NM', icon: '🌶️', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'nebraska', name: 'Nebraska', abbr: 'NE', icon: '🌽', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'idaho', name: 'Idaho', abbr: 'ID', icon: '🥔', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'west-virginia', name: 'West Virginia', abbr: 'WV', icon: '⛰️', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'hawaii', name: 'Hawaii', abbr: 'HI', icon: '🌺', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'new-hampshire', name: 'New Hampshire', abbr: 'NH', icon: '🍂', topics: ['No State Income Tax', 'Business Law', 'Property Tax'] },
  { slug: 'maine', name: 'Maine', abbr: 'ME', icon: '🦞', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'montana', name: 'Montana', abbr: 'MT', icon: '🏔️', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'rhode-island', name: 'Rhode Island', abbr: 'RI', icon: '⚓', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'delaware', name: 'Delaware', abbr: 'DE', icon: '🏛️', topics: ['Corporate Law', 'Business Law', 'Property Tax'] },
  { slug: 'south-dakota', name: 'South Dakota', abbr: 'SD', icon: '🏔️', topics: ['No State Income Tax', 'Business Law', 'Property Tax'] },
  { slug: 'north-dakota', name: 'North Dakota', abbr: 'ND', icon: ' oil', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'alaska', name: 'Alaska', abbr: 'AK', icon: '🐻', topics: ['No State Income Tax', 'Business Law', 'Property Tax'] },
  { slug: 'vermont', name: 'Vermont', abbr: 'VT', icon: '🍁', topics: ['Business Law', 'Property Tax', 'Probate'] },
  { slug: 'wyoming', name: 'Wyoming', abbr: 'WY', icon: '🤠', topics: ['No State Income Tax', 'Business Law', 'Property Tax'] },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">State Law Guides</h1>
          <p className="mt-4 text-lg text-blue-100">Comprehensive guides to legal requirements in all 50 US states</p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="text-3xl">{guide.icon}</div>
              <h2 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-blue-600">{guide.name}</h2>
              <p className="text-sm text-gray-600">{guide.abbr}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {guide.topics.map((topic) => (
                  <span key={topic} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{topic}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Need State-Specific Legal Documents?</h2>
          <p className="mt-2 text-blue-100">Browse our free legal document templates customized for each state.</p>
          <Link href="/" className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50">
            Browse Documents
          </Link>
        </div>
      </section>
    </div>
  );
}
