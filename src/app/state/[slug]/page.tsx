import Link from "next/link";

const stateData: Record<string, { name: string }> = {
  california: { name: "California" },
  texas: { name: "Texas" },
  florida: { name: "Florida" },
  "new-york": { name: "New York" },
  illinois: { name: "Illinois" },
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