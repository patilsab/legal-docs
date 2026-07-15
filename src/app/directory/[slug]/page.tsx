import Link from 'next/link';
import { notFound } from 'next/navigation';

const states: Record<string, { name: string; abbr: string; attorneys: number; legalAid: number; barAssociation: string; legalAidOrgs: string[]; courts: string[]; resources: string[] }> = {
  'alabama': { name: 'Alabama', abbr: 'AL', attorneys: 2450, legalAid: 12, barAssociation: 'Alabama State Bar', legalAidOrgs: ['Legal Services Alabama', 'Alabama Legal Aid Society'], courts: ['Alabama Supreme Court', 'Court of Civil Appeals', 'Circuit Courts (41 circuits)'], resources: ['Alabama Law Help', 'Alabama State Bar', 'Alabama Legal Aid'] },
  'alaska': { name: 'Alaska', abbr: 'AK', attorneys: 1800, legalAid: 8, barAssociation: 'Alaska Bar Association', legalAidOrgs: ['Alaska Legal Services', 'Alaska Public Defender Agency'], courts: ['Alaska Supreme Court', 'Court of Appeals', 'Superior Court (4 judicial districts)'], resources: ['Alaska Courts Self-Help', 'Alaska Bar Association'] },
  'arizona': { name: 'Arizona', abbr: 'AZ', attorneys: 8500, legalAid: 15, barAssociation: 'State Bar of Arizona', legalAidOrgs: ['Arizona Legal Aid', 'Community Legal Services', 'DNA-Peoples Legal Services'], courts: ['Arizona Supreme Court', 'Court of Appeals', 'Superior Court (15 counties)'], resources: ['Arizona Legal Help', 'State Bar of Arizona'] },
  'california': { name: 'California', abbr: 'CA', attorneys: 170000, legalAid: 45, barAssociation: 'State Bar of California', legalAidOrgs: ['Legal Aid Foundation of Los Angeles', 'Bay Area Legal Aid', 'California Rural Legal Assistance', 'Legal Services of Northern California'], courts: ['California Supreme Court', 'Court of Appeal (6 districts)', 'Superior Court (58 counties)'], resources: ['California Courts Self-Help Center', 'State Bar Lawyer Referral', 'California Legal Aid'] },
  'colorado': { name: 'Colorado', abbr: 'CO', attorneys: 23000, legalAid: 14, barAssociation: 'Colorado Bar Association', legalAidOrgs: ['Colorado Legal Services', 'Community Economic Defense Project'], courts: ['Colorado Supreme Court', 'Court of Appeals', 'District Courts (22 districts)'], resources: ['Colorado Courts Self-Help', 'Colorado Bar Association'] },
  'connecticut': { name: 'Connecticut', abbr: 'CT', attorneys: 21000, legalAid: 12, barAssociation: 'Connecticut Bar Association', legalAidOrgs: ['Statewide Legal Services', 'Connecticut Legal Services'], courts: ['Connecticut Supreme Court', 'Appellate Court', 'Superior Court (13 districts)'], resources: ['Connecticut Courts', 'Connecticut Bar Association'] },
  'delaware': { name: 'Delaware', abbr: 'DE', attorneys: 3200, legalAid: 6, barAssociation: 'Delaware State Bar Association', legalAidOrgs: ['Community Legal Aid Society', 'Legal Aid Society of Delaware'], courts: ['Delaware Supreme Court', 'Court of Chancery', 'Superior Court (3 counties)'], resources: ['Delaware Courts', 'Delaware State Bar'] },
  'florida': { name: 'Florida', abbr: 'FL', attorneys: 72000, legalAid: 32, barAssociation: 'The Florida Bar', legalAidOrgs: ['Florida Legal Services', 'Legal Aid Society of the Orange County Bar', 'Bay Area Legal Services', 'Community Legal Services of Mid-Florida'], courts: ['Florida Supreme Court', 'District Courts of Appeal (5)', 'Circuit Courts (20 circuits)'], resources: ['Florida Courts Self-Help', 'The Florida Bar', 'Florida Legal Aid'] },
  'georgia': { name: 'Georgia', abbr: 'GA', attorneys: 35000, legalAid: 22, barAssociation: 'State Bar of Georgia', legalAidOrgs: ['Georgia Legal Services', 'Atlanta Legal Aid', 'Georgia Public Defender Council'], courts: ['Georgia Supreme Court', 'Court of Appeals', 'Superior Courts (49 circuits)'], resources: ['Georgia Courts Self-Help', 'State Bar of Georgia'] },
  'hawaii': { name: 'Hawaii', abbr: 'HI', attorneys: 3500, legalAid: 8, barAssociation: 'Hawaii State Bar Association', legalAidOrgs: ['Legal Aid Society of Hawaii', 'Hawaii Appleseed Center'], courts: ['Hawaii Supreme Court', 'Intermediate Court of Appeals', 'Circuit Courts (4 circuits)'], resources: ['Hawaii Courts', 'Hawaii State Bar'] },
  'idaho': { name: 'Idaho', abbr: 'ID', attorneys: 3800, legalAid: 8, barAssociation: 'Idaho State Bar', legalAidOrgs: ['Idaho Legal Aid Services', 'Idaho Volunteer Lawyers Program'], courts: ['Idaho Supreme Court', 'Court of Appeals', 'District Courts (7 districts)'], resources: ['Idaho Courts', 'Idaho State Bar'] },
  'illinois': { name: 'Illinois', abbr: 'IL', attorneys: 62000, legalAid: 28, barAssociation: 'Illinois State Bar Association', legalAidOrgs: ['Legal Aid Chicago', 'Prairie State Legal Services', 'Legal Assistance Foundation', 'Land of Lincoln Legal Aid'], courts: ['Illinois Supreme Court', 'Appellate Court (5 districts)', 'Circuit Courts (24 circuits)'], resources: ['Illinois Courts Self-Help', 'Illinois State Bar', 'Illinois Legal Aid Online'] },
  'indiana': { name: 'Indiana', abbr: 'IN', attorneys: 16000, legalAid: 14, barAssociation: 'Indiana State Bar Association', legalAidOrgs: ['Indiana Legal Services', 'Indiana Volunteer Lawyers Program'], courts: ['Indiana Supreme Court', 'Court of Appeals', 'Circuit/District Courts (91 counties)'], resources: ['Indiana Courts', 'Indiana State Bar'] },
  'iowa': { name: 'Iowa', abbr: 'IA', attorneys: 7200, legalAid: 10, barAssociation: 'Iowa State Bar Association', legalAidOrgs: ['Iowa Legal Aid', 'Iowa Volunteer Lawyers Project'], courts: ['Iowa Supreme Court', 'Court of Appeals', 'District Courts (8 districts)'], resources: ['Iowa Courts', 'Iowa State Bar'] },
  'kansas': { name: 'Kansas', abbr: 'KS', attorneys: 7500, legalAid: 10, barAssociation: 'Kansas Bar Association', legalAidOrgs: ['Kansas Legal Services', 'Washburn Law Project'], courts: ['Kansas Supreme Court', 'Court of Appeals', 'District Courts (31 districts)'], resources: ['Kansas Courts', 'Kansas Bar Association'] },
  'kentucky': { name: 'Kentucky', abbr: 'KY', attorneys: 11000, legalAid: 12, barAssociation: 'Kentucky Bar Association', legalAidOrgs: ['Legal Aid Society', 'Appalachian Citizens Law Center'], courts: ['Kentucky Supreme Court', 'Court of Appeals', 'Circuit Courts (57 circuits)'], resources: ['Kentucky Courts', 'Kentucky Bar Association'] },
  'louisiana': { name: 'Louisiana', abbr: 'LA', attorneys: 22000, legalAid: 14, barAssociation: 'Louisiana State Bar Association', legalAidOrgs: ['Southeast Louisiana Legal Services', 'Acadiana Legal Service Corporation'], courts: ['Louisiana Supreme Court', 'Courts of Appeal (5 circuits)', 'District Courts (42 districts)'], resources: ['Louisiana Courts', 'Louisiana State Bar'] },
  'maine': { name: 'Maine', abbr: 'ME', attorneys: 4500, legalAid: 8, barAssociation: 'Maine State Bar Association', legalAidOrgs: ['Pine Tree Legal Assistance', 'Maine Volunteer Lawyers Project'], courts: ['Maine Supreme Judicial Court', 'Superior Court', 'District Courts (7 districts)'], resources: ['Maine Courts', 'Maine State Bar'] },
  'maryland': { name: 'Maryland', abbr: 'MD', attorneys: 40000, legalAid: 18, barAssociation: 'Maryland State Bar Association', legalAidOrgs: ['Legal Aid Bureau', 'Public Justice Center', 'Maryland Volunteer Lawyers Service'], courts: ['Maryland Supreme Court', 'Court of Special Appeals', 'Circuit Courts (8 circuits)'], resources: ['Maryland Courts', 'Maryland State Bar'] },
  'massachusetts': { name: 'Massachusetts', abbr: 'MA', attorneys: 43000, legalAid: 20, barAssociation: 'Massachusetts Bar Association', legalAidOrgs: ['Greater Boston Legal Services', 'Massachusetts Legal Aid', 'Community Legal Aid'], courts: ['Massachusetts Supreme Judicial Court', 'Appeals Court', 'Superior Courts (14 counties)'], resources: ['Massachusetts Courts', 'Massachusetts Bar'] },
  'michigan': { name: 'Michigan', abbr: 'MI', attorneys: 35000, legalAid: 20, barAssociation: 'State Bar of Michigan', legalAidOrgs: ['Legal Aid and Defender Association', 'Michigan Legal Services'], courts: ['Michigan Supreme Court', 'Court of Appeals', 'Circuit Courts (57 circuits)'], resources: ['Michigan Courts', 'State Bar of Michigan'] },
  'minnesota': { name: 'Minnesota', abbr: 'MN', attorneys: 27000, legalAid: 16, barAssociation: 'Minnesota State Bar Association', legalAidOrgs: ['Legal Aid Service of Minnesota', 'Mid-Minnesota Legal Aid'], courts: ['Minnesota Supreme Court', 'Court of Appeals', 'District Courts (10 judicial districts)'], resources: ['Minnesota Courts', 'Minnesota State Bar'] },
  'mississippi': { name: 'Mississippi', abbr: 'MS', attorneys: 5500, legalAid: 8, barAssociation: 'Mississippi Bar', legalAidOrgs: ['Mississippi Center for Legal Services', 'North Mississippi Rural Legal Services'], courts: ['Mississippi Supreme Court', 'Court of Appeals', 'Chancery/Circuit Courts (22 districts)'], resources: ['Mississippi Courts', 'Mississippi Bar'] },
  'missouri': { name: 'Missouri', abbr: 'MO', attorneys: 24000, legalAid: 14, barAssociation: 'The Missouri Bar', legalAidOrgs: ['Legal Services of Eastern Missouri', 'Legal Aid of Western Missouri'], courts: ['Missouri Supreme Court', 'Court of Appeals (3 districts)', 'Circuit Courts (45 circuits)'], resources: ['Missouri Courts', 'The Missouri Bar'] },
  'montana': { name: 'Montana', abbr: 'MT', attorneys: 3200, legalAid: 6, barAssociation: 'State Bar of Montana', legalAidOrgs: ['Montana Legal Services', 'Montana Indian Law Project'], courts: ['Montana Supreme Court', 'District Courts (22 districts)'], resources: ['Montana Courts', 'State Bar of Montana'] },
  'nebraska': { name: 'Nebraska', abbr: 'NE', attorneys: 4200, legalAid: 8, barAssociation: 'Nebraska State Bar Association', legalAidOrgs: ['Legal Aid of Nebraska', 'Nebraska Volunteer Lawyers Project'], courts: ['Nebraska Supreme Court', 'Court of Appeals', 'District Courts (12 districts)'], resources: ['Nebraska Courts', 'Nebraska State Bar'] },
  'nevada': { name: 'Nevada', abbr: 'NV', attorneys: 8500, legalAid: 10, barAssociation: 'State Bar of Nevada', legalAidOrgs: ['Nevada Legal Services', 'Washoe Legal Services'], courts: ['Nevada Supreme Court', 'Court of Appeals', 'District Courts (11 districts)'], resources: ['Nevada Courts', 'State Bar of Nevada'] },
  'new-hampshire': { name: 'New Hampshire', abbr: 'NH', attorneys: 4000, legalAid: 6, barAssociation: 'New Hampshire Bar Association', legalAidOrgs: ['New Hampshire Legal Assistance', 'NH Bar Pro Bono'], courts: ['New Hampshire Supreme Court', 'Superior Court (10 counties)'], resources: ['New Hampshire Courts', 'NH Bar Association'] },
  'new-jersey': { name: 'New Jersey', abbr: 'NJ', attorneys: 43000, legalAid: 22, barAssociation: 'New Jersey State Bar Association', legalAidOrgs: ['Legal Services of New Jersey', 'Central Jersey Legal Services'], courts: ['New Jersey Supreme Court', 'Superior Court (Appellate Division)', 'Law/Chancery Divisions'], resources: ['New Jersey Courts', 'NJ State Bar'] },
  'new-mexico': { name: 'New Mexico', abbr: 'NM', attorneys: 4500, legalAid: 10, barAssociation: 'State Bar of New Mexico', legalAidOrgs: ['New Mexico Legal Aid', 'DNA Peoples Legal Services'], courts: ['New Mexico Supreme Court', 'Court of Appeals', 'District Courts (13 districts)'], resources: ['New Mexico Courts', 'State Bar of NM'] },
  'new-york': { name: 'New York', abbr: 'NY', attorneys: 180000, legalAid: 52, barAssociation: 'New York State Bar Association', legalAidOrgs: ['Legal Aid Society', 'Legal Services NYC', 'Legal Services of Central New York', 'Neighborhood Defender Service'], courts: ['New York Court of Appeals', 'Supreme Court (Appellate Division)', 'Supreme Court (Trial Level)'], resources: ['NY Courts Self-Help', 'New York State Bar', 'NYC Bar Association'] },
  'north-carolina': { name: 'North Carolina', abbr: 'NC', attorneys: 28000, legalAid: 16, barAssociation: 'North Carolina Bar Association', legalAidOrgs: ['Legal Aid of North Carolina', 'Pisgah Legal Services'], courts: ['North Carolina Supreme Court', 'Court of Appeals', 'Superior Courts (48 districts)'], resources: ['North Carolina Courts', 'NC Bar Association'] },
  'north-dakota': { name: 'North Dakota', abbr: 'ND', attorneys: 1800, legalAid: 4, barAssociation: 'State Bar Association of North Dakota', legalAidOrgs: ['Legal Services of North Dakota'], courts: ['North Dakota Supreme Court', 'District Courts (8 judicial districts)'], resources: ['North Dakota Courts', 'State Bar of ND'] },
  'ohio': { name: 'Ohio', abbr: 'OH', attorneys: 42000, legalAid: 22, barAssociation: 'Ohio State Bar Association', legalAidOrgs: ['Legal Aid Society of Cleveland', 'Ohio Legal Aid', 'Legal Aid of Western Ohio'], courts: ['Ohio Supreme Court', 'Courts of Appeals (12 districts)', 'Court of Common Pleas (88 counties)'], resources: ['Ohio Courts', 'Ohio State Bar', 'Ohio Legal Aid'] },
  'oklahoma': { name: 'Oklahoma', abbr: 'OK', attorneys: 11000, legalAid: 10, barAssociation: 'Oklahoma Bar Association', legalAidOrgs: ['Legal Aid Services of Oklahoma', 'Oklahoma Indian Legal Services'], courts: ['Oklahoma Supreme Court', 'Court of Criminal Appeals', 'District Courts (77 districts)'], resources: ['Oklahoma Courts', 'Oklahoma Bar'] },
  'oregon': { name: 'Oregon', abbr: 'OR', attorneys: 13000, legalAid: 12, barAssociation: 'Oregon State Bar', legalAidOrgs: ['Legal Aid Services of Oregon', 'Oregon Law Center'], courts: ['Oregon Supreme Court', 'Court of Appeals', 'Circuit Courts (27 circuits)'], resources: ['Oregon Courts', 'Oregon State Bar'] },
  'pennsylvania': { name: 'Pennsylvania', abbr: 'PA', attorneys: 48000, legalAid: 24, barAssociation: 'Pennsylvania Bar Association', legalAidOrgs: ['Community Legal Aid', 'Legal Aid of Southeastern PA', 'Regional Housing Legal Services'], courts: ['Pennsylvania Supreme Court', 'Superior Court', 'Common Pleas Courts (67 counties)'], resources: ['Pennsylvania Courts', 'PA Bar Association'] },
  'rhode-island': { name: 'Rhode Island', abbr: 'RI', attorneys: 3500, legalAid: 6, barAssociation: 'Rhode Island Bar Association', legalAidOrgs: ['Rhode Island Legal Services', 'RI Volunteer Lawyers Project'], courts: ['Rhode Island Supreme Court', 'Family/District Courts'], resources: ['Rhode Island Courts', 'RI Bar Association'] },
  'south-carolina': { name: 'South Carolina', abbr: 'SC', attorneys: 12000, legalAid: 10, barAssociation: 'South Carolina Bar', legalAidOrgs: ['South Carolina Legal Services', 'Charleston Legal Access'], courts: ['South Carolina Supreme Court', 'Court of Appeals', 'Circuit Courts (16 circuits)'], resources: ['South Carolina Courts', 'SC Bar'] },
  'south-dakota': { name: 'South Dakota', abbr: 'SD', attorneys: 2000, legalAid: 4, barAssociation: 'State Bar of South Dakota', legalAidOrgs: ['Dakota Plains Legal Services', 'South Dakota Legal Aid'], courts: ['South Dakota Supreme Court', 'Circuit Courts (7 circuits)'], resources: ['South Dakota Courts', 'State Bar of SD'] },
  'tennessee': { name: 'Tennessee', abbr: 'TN', attorneys: 18000, legalAid: 14, barAssociation: 'Tennessee Bar Association', legalAidOrgs: ['Legal Aid Society of Middle Tennessee', 'Appalachian Citizens Law Center'], courts: ['Tennessee Supreme Court', 'Court of Appeals', 'Circuit/District Courts (31 districts)'], resources: ['Tennessee Courts', 'Tennessee Bar'] },
  'texas': { name: 'Texas', abbr: 'TX', attorneys: 92000, legalAid: 38, barAssociation: 'State Bar of Texas', legalAidOrgs: ['Texas RioGrande Legal Aid', 'Lone Star Legal Aid', 'Legal Aid of NorthWest Texas', 'Texas Legal Aid'], courts: ['Texas Supreme Court', 'Court of Appeals (14 courts)', 'District Courts (254 counties)'], resources: ['Texas Law Help', 'State Bar of Texas', 'Texas Legal Services Center'] },
  'utah': { name: 'Utah', abbr: 'UT', attorneys: 8000, legalAid: 8, barAssociation: 'Utah State Bar', legalAidOrgs: ['Utah Legal Services', 'Utah Volunteer Lawyers Program'], courts: ['Utah Supreme Court', 'Court of Appeals', 'District Courts (8 districts)'], resources: ['Utah Courts', 'Utah State Bar'] },
  'vermont': { name: 'Vermont', abbr: 'VT', attorneys: 2200, legalAid: 4, barAssociation: 'Vermont Bar Association', legalAidOrgs: ['Legal Services Law Line of Vermont'], courts: ['Vermont Supreme Court', 'Superior Courts (14 units)'], resources: ['Vermont Courts', 'Vermont Bar'] },
  'virginia': { name: 'Virginia', abbr: 'VA', attorneys: 35000, legalAid: 18, barAssociation: 'Virginia State Bar', legalAidOrgs: ['Legal Aid Society of Roanoke Valley', 'Virginia Legal Aid Society'], courts: ['Virginia Supreme Court', 'Court of Appeals', 'Circuit Courts (31 circuits)'], resources: ['Virginia Courts', 'Virginia State Bar'] },
  'washington': { name: 'Washington', abbr: 'WA', attorneys: 38000, legalAid: 20, barAssociation: 'Washington State Bar Association', legalAidOrgs: ['Northwest Justice Project', 'Columbia Legal Services'], courts: ['Washington Supreme Court', 'Court of Appeals (3 divisions)', 'Superior Courts (39 counties)'], resources: ['Washington Courts', 'Washington State Bar'] },
  'west-virginia': { name: 'West Virginia', abbr: 'WV', attorneys: 4500, legalAid: 8, barAssociation: 'West Virginia State Bar', legalAidOrgs: ['West Virginia Legal Aid Society', 'Mountain State Justice'], courts: ['West Virginia Supreme Court', 'Circuit Courts (31 circuits)'], resources: ['West Virginia Courts', 'WV State Bar'] },
  'wisconsin': { name: 'Wisconsin', abbr: 'WI', attorneys: 21000, legalAid: 14, barAssociation: 'State Bar of Wisconsin', legalAidOrgs: ['Legal Action of Wisconsin', 'Wisconsin Judicare'], courts: ['Wisconsin Supreme Court', 'Court of Appeals (4 districts)', 'Circuit Courts (69 counties)'], resources: ['Wisconsin Courts', 'State Bar of Wisconsin'] },
  'wyoming': { name: 'Wyoming', abbr: 'WY', attorneys: 1500, legalAid: 4, barAssociation: 'Wyoming State Bar', legalAidOrgs: ['Wyoming Legal Aid'], courts: ['Wyoming Supreme Court', 'District Courts (9 districts)'], resources: ['Wyoming Courts', 'Wyoming State Bar'] },
};

export async function generateStaticParams() {
  return Object.keys(states).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const state = states[slug];
  if (!state) return { title: 'Not Found' };
  return { title: `Legal Services in ${state.name} | LegalDocs Directory`, description: `Find attorneys, legal aid organizations, and court resources in ${state.name}. ${state.attorneys.toLocaleString()} attorneys listed.` };
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
          <p className="mt-2 text-blue-100">{state.attorneys.toLocaleString()} attorneys and {state.legalAid} legal aid organizations serving {state.name} residents</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">{state.barAssociation}</h2>
            <p className="mb-4 text-gray-600">Find licensed attorneys in {state.name} through the state bar association. The bar association provides lawyer referral services, client protection funds, and attorney discipline information. All listed attorneys have passed the bar examination and maintain active licenses.</p>
            <ul className="mb-4 space-y-2">
              <li className="text-sm text-gray-700">{state.attorneys.toLocaleString()} licensed attorneys</li>
              <li className="text-sm text-gray-700">Lawyer referral services available</li>
              <li className="text-sm text-gray-700">Client protection fund</li>
              <li className="text-sm text-gray-700">Attorney discipline information</li>
            </ul>
            <a href="#" className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Find an Attorney in {state.name}</a>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Legal Aid Organizations</h2>
            <p className="mb-4 text-gray-600">Free or low-cost legal services for qualifying individuals in {state.name}. Eligibility is typically based on income level (usually below 200% of the federal poverty line) and case type. Contact each organization directly to determine eligibility.</p>
            <ul className="space-y-3">
              {state.legalAidOrgs.map((org) => (
                <li key={org} className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">&#10003;</span>
                  <span className="text-gray-700">{org}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Courts in {state.name}</h2>
            <p className="mb-4 text-gray-600">{state.name} court system handles civil and criminal cases at various levels. Understanding the court structure helps when filing documents or responding to legal actions.</p>
            <ul className="space-y-2">
              {state.courts.map((court) => (
                <li key={court} className="flex items-center gap-2 text-gray-700">
                  <span className="text-blue-600">&#9679;</span>{court}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Additional Resources</h2>
            <p className="mb-4 text-gray-600">Helpful resources for finding legal information and assistance in {state.name}.</p>
            <ul className="space-y-2">
              {state.resources.map((resource) => (
                <li key={resource} className="flex items-center gap-2 text-gray-700">
                  <span className="text-blue-600">&#9679;</span>{resource}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 rounded-xl bg-blue-50 p-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Free Legal Documents for {state.name}</h2>
          <p className="mb-4 text-gray-600">Browse our free, state-specific legal document templates customized for {state.name} law. Each template includes state-specific legal requirements, compliance information, and proper formatting. All documents can be filled out online and downloaded as PDF.</p>
          <Link href="/" className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Browse Documents for {state.name}</Link>
        </div>
      </div>
    </div>
  );
}
