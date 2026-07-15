import Link from 'next/link';

export const metadata = {
  title: 'Legal Services Directory - Find Attorneys by State | LegalDocs',
  description: 'Find qualified attorneys, legal aid organizations, and court resources in all 50 US states.',
};

const states = [
  { name: 'Alabama', abbr: 'AL', slug: 'alabama', attorneys: 2450, legalAid: 12 },
  { name: 'Alaska', abbr: 'AK', slug: 'alaska', attorneys: 1800, legalAid: 8 },
  { name: 'Arizona', abbr: 'AZ', slug: 'arizona', attorneys: 8500, legalAid: 15 },
  { name: 'Arkansas', abbr: 'AR', slug: 'arkansas', attorneys: 3200, legalAid: 10 },
  { name: 'California', abbr: 'CA', slug: 'california', attorneys: 170000, legalAid: 45 },
  { name: 'Colorado', abbr: 'CO', slug: 'colorado', attorneys: 22000, legalAid: 18 },
  { name: 'Connecticut', abbr: 'CT', slug: 'connecticut', attorneys: 18000, legalAid: 14 },
  { name: 'Delaware', abbr: 'DE', slug: 'delaware', attorneys: 3500, legalAid: 6 },
  { name: 'Florida', abbr: 'FL', slug: 'florida', attorneys: 72000, legalAid: 32 },
  { name: 'Georgia', abbr: 'GA', slug: 'georgia', attorneys: 35000, legalAid: 22 },
  { name: 'Hawaii', abbr: 'HI', slug: 'hawaii', attorneys: 4200, legalAid: 8 },
  { name: 'Idaho', abbr: 'ID', slug: 'idaho', attorneys: 3800, legalAid: 7 },
  { name: 'Illinois', abbr: 'IL', slug: 'illinois', attorneys: 62000, legalAid: 28 },
  { name: 'Indiana', abbr: 'IN', slug: 'indiana', attorneys: 18000, legalAid: 16 },
  { name: 'Iowa', abbr: 'IA', slug: 'iowa', attorneys: 6500, legalAid: 10 },
  { name: 'Kansas', abbr: 'KS', slug: 'kansas', attorneys: 7200, legalAid: 9 },
  { name: 'Kentucky', abbr: 'KY', slug: 'kentucky', attorneys: 9500, legalAid: 12 },
  { name: 'Louisiana', abbr: 'LA', slug: 'louisiana', attorneys: 12000, legalAid: 14 },
  { name: 'Maine', abbr: 'ME', slug: 'maine', attorneys: 3800, legalAid: 8 },
  { name: 'Maryland', abbr: 'MD', slug: 'maryland', attorneys: 28000, legalAid: 18 },
  { name: 'Massachusetts', abbr: 'MA', slug: 'massachusetts', attorneys: 45000, legalAid: 22 },
  { name: 'Michigan', abbr: 'MI', slug: 'michigan', attorneys: 38000, legalAid: 20 },
  { name: 'Minnesota', abbr: 'MN', slug: 'minnesota', attorneys: 25000, legalAid: 16 },
  { name: 'Mississippi', abbr: 'MS', slug: 'mississippi', attorneys: 4500, legalAid: 8 },
  { name: 'Missouri', abbr: 'MO', slug: 'missouri', attorneys: 16000, legalAid: 14 },
  { name: 'Montana', abbr: 'MT', slug: 'montana', attorneys: 3200, legalAid: 6 },
  { name: 'Nebraska', abbr: 'NE', slug: 'nebraska', attorneys: 4800, legalAid: 8 },
  { name: 'Nevada', abbr: 'NV', slug: 'nevada', attorneys: 8500, legalAid: 10 },
  { name: 'New Hampshire', abbr: 'NH', slug: 'new-hampshire', attorneys: 3800, legalAid: 6 },
  { name: 'New Jersey', abbr: 'NJ', slug: 'new-jersey', attorneys: 42000, legalAid: 24 },
  { name: 'New Mexico', abbr: 'NM', slug: 'new-mexico', attorneys: 4500, legalAid: 10 },
  { name: 'New York', abbr: 'NY', slug: 'new-york', attorneys: 180000, legalAid: 52 },
  { name: 'North Carolina', abbr: 'NC', slug: 'north-carolina', attorneys: 28000, legalAid: 18 },
  { name: 'North Dakota', abbr: 'ND', slug: 'north-dakota', attorneys: 2200, legalAid: 4 },
  { name: 'Ohio', abbr: 'OH', slug: 'ohio', attorneys: 42000, legalAid: 22 },
  { name: 'Oklahoma', abbr: 'OK', slug: 'oklahoma', attorneys: 11000, legalAid: 12 },
  { name: 'Oregon', abbr: 'OR', slug: 'oregon', attorneys: 12000, legalAid: 14 },
  { name: 'Pennsylvania', abbr: 'PA', slug: 'pennsylvania', attorneys: 55000, legalAid: 26 },
  { name: 'Rhode Island', abbr: 'RI', slug: 'rhode-island', attorneys: 4200, legalAid: 6 },
  { name: 'South Carolina', abbr: 'SC', slug: 'south-carolina', attorneys: 10000, legalAid: 10 },
  { name: 'South Dakota', abbr: 'SD', slug: 'south-dakota', attorneys: 2200, legalAid: 4 },
  { name: 'Tennessee', abbr: 'TN', slug: 'tennessee', attorneys: 14000, legalAid: 14 },
  { name: 'Texas', abbr: 'TX', slug: 'texas', attorneys: 92000, legalAid: 38 },
  { name: 'Utah', abbr: 'UT', slug: 'utah', attorneys: 6500, legalAid: 10 },
  { name: 'Vermont', abbr: 'VT', slug: 'vermont', attorneys: 2200, legalAid: 6 },
  { name: 'Virginia', abbr: 'VA', slug: 'virginia', attorneys: 32000, legalAid: 20 },
  { name: 'Washington', abbr: 'WA', slug: 'washington', attorneys: 32000, legalAid: 18 },
  { name: 'West Virginia', abbr: 'WV', slug: 'west-virginia', attorneys: 4500, legalAid: 8 },
  { name: 'Wisconsin', abbr: 'WI', slug: 'wisconsin', attorneys: 16000, legalAid: 14 },
  { name: 'Wyoming', abbr: 'WY', slug: 'wyoming', attorneys: 2200, legalAid: 4 },
];

const practiceAreas = [
  { name: 'Family Law', icon: '👨‍👩‍👧', description: 'Divorce, custody, adoption' },
  { name: 'Real Estate', icon: '🏠', description: 'Property transactions, disputes' },
  { name: 'Business Law', icon: '💼', description: 'Formation, contracts, disputes' },
  { name: 'Estate Planning', icon: '📜', description: 'Wills, trusts, probate' },
  { name: 'Criminal Defense', icon: '⚖️', description: 'Felony, misdemeanor defense' },
  { name: 'Immigration', icon: '🌍', description: 'Visas, green cards, citizenship' },
  { name: 'Personal Injury', icon: '🏥', description: 'Accidents, malpractice' },
  { name: 'Employment Law', icon: '👔', description: 'Discrimination, wage disputes' },
];

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Legal Services Directory</h1>
          <p className="mt-4 text-lg text-blue-100">Find qualified attorneys and legal resources in all 50 US states</p>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">Browse by Practice Area</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {practiceAreas.map((area) => (
            <div key={area.name} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="text-3xl">{area.icon}</div>
              <h3 className="mt-3 font-semibold text-gray-900">{area.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* State Directory */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">Find Legal Services by State</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {states.map((state) => (
            <Link
              key={state.abbr}
              href={`/directory/${state.slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600">{state.name}</h3>
                  <p className="text-sm text-gray-600">{state.abbr}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>{state.attorneys.toLocaleString()} attorneys</div>
                  <div>{state.legalAid} legal aid orgs</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Need Legal Help?</h2>
          <p className="mt-2 text-blue-100">Browse our free legal document templates or find an attorney in your state.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/" className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50">
              Browse Templates
            </Link>
            <Link href="/contact-us" className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
