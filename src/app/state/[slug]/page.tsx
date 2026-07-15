import Link from "next/link";

const stateData: Record<string, { name: string }> = {
  alabama: { name: "Alabama" },
  alaska: { name: "Alaska" },
  arizona: { name: "Arizona" },
  arkansas: { name: "Arkansas" },
  california: { name: "California" },
  colorado: { name: "Colorado" },
  connecticut: { name: "Connecticut" },
  delaware: { name: "Delaware" },
  florida: { name: "Florida" },
  georgia: { name: "Georgia" },
  hawaii: { name: "Hawaii" },
  idaho: { name: "Idaho" },
  illinois: { name: "Illinois" },
  indiana: { name: "Indiana" },
  iowa: { name: "Iowa" },
  kansas: { name: "Kansas" },
  kentucky: { name: "Kentucky" },
  louisiana: { name: "Louisiana" },
  maine: { name: "Maine" },
  maryland: { name: "Maryland" },
  massachusetts: { name: "Massachusetts" },
  michigan: { name: "Michigan" },
  minnesota: { name: "Minnesota" },
  mississippi: { name: "Mississippi" },
  missouri: { name: "Missouri" },
  montana: { name: "Montana" },
  nebraska: { name: "Nebraska" },
  nevada: { name: "Nevada" },
  "new-hampshire": { name: "New Hampshire" },
  "new-jersey": { name: "New Jersey" },
  "new-mexico": { name: "New Mexico" },
  "new-york": { name: "New York" },
  "north-carolina": { name: "North Carolina" },
  "north-dakota": { name: "North Dakota" },
  ohio: { name: "Ohio" },
  oklahoma: { name: "Oklahoma" },
  oregon: { name: "Oregon" },
  pennsylvania: { name: "Pennsylvania" },
  "rhode-island": { name: "Rhode Island" },
  "south-carolina": { name: "South Carolina" },
  "south-dakota": { name: "South Dakota" },
  tennessee: { name: "Tennessee" },
  texas: { name: "Texas" },
  utah: { name: "Utah" },
  vermont: { name: "Vermont" },
  virginia: { name: "Virginia" },
  washington: { name: "Washington" },
  "west-virginia": { name: "West Virginia" },
  wisconsin: { name: "Wisconsin" },
  wyoming: { name: "Wyoming" }
};

const documentTypes = [
  { slug: "eviction-notice", title: "Eviction Notice" },
  { slug: "lease-agreement", title: "Lease Agreement" },
  { slug: "power-of-attorney", title: "Power of Attorney" },
  { slug: "divorce-papers", title: "Divorce Papers" },
  { slug: "last-will", title: "Last Will & Testament" },
  { slug: "bill-of-sale", title: "Bill of Sale" },
  { slug: "promissory-note", title: "Promissory Note" },
  { slug: "nda", title: "Non-Disclosure Agreement" },
  { slug: "rental-application", title: "Rental Application" },
  { slug: "living-will", title: "Living Will" },
  { slug: "child-custody", title: "Child Custody Agreement" },
  { slug: "separation-agreement", title: "Separation Agreement" },
  { slug: "purchase-agreement", title: "Purchase Agreement" },
  { slug: "affidavit", title: "Affidavit" },
  { slug: "cease-desist", title: "Cease & Desist" },
  { slug: "medical-authorization", title: "Medical Authorization" },
  // Phase 1
  { slug: "residential-lease", title: "Residential Lease Agreement" },
  { slug: "quitclaim-deed", title: "Quitclaim Deed" },
  { slug: "loan-agreement", title: "Loan Agreement" },
  { slug: "business-plan", title: "Business Plan Template" },
  // Phase 2
  { slug: "llc-operating-agreement", title: "LLC Operating Agreement" },
  { slug: "employment-contract", title: "Employment Contract" },
  // Phase 3
  { slug: "revocable-living-trust", title: "Revocable Living Trust" },
  { slug: "commercial-lease", title: "Commercial Lease Agreement" },
  { slug: "prenuptial-agreement", title: "Prenuptial Agreement" },
  // Phase 4
  { slug: "pour-over-will", title: "Pour-Over Will" },
  { slug: "durable-power-of-attorney", title: "Durable Power of Attorney" },
  { slug: "medical-power-of-attorney", title: "Medical Power of Attorney" },
  { slug: "advance-healthcare-directive", title: "Advance Healthcare Directive" },
  // Phase 5
  { slug: "irrevocable-trust", title: "Irrevocable Trust" },
  { slug: "warranty-deed", title: "Warranty Deed" },
  { slug: "contract-for-deed", title: "Contract for Deed" },
  { slug: "easement-agreement", title: "Easement Agreement" },
];

export default async function StatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const state = stateData[slug] || { name: slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <span>{state.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">Legal Document Templates for {state.name}</h1>
      <p className="mt-4 text-gray-600">Browse free, state-specific legal document templates for {state.name}.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {documentTypes.map((doc) => (
          <Link key={doc.slug} href={`/${doc.slug}/${slug}`} className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md">
            <h2 className="text-lg font-semibold text-gray-900">{doc.title}</h2>
            <p className="mt-2 text-sm text-gray-600">Free {state.name} template - fill out online, download as PDF</p>
          </Link>
        ))}
      </div>
    </div>
  );
}