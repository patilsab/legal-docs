import Link from "next/link";

const documentTypes = [
  { slug: "eviction-notice", title: "Eviction Notice", description: "State-specific eviction notices with required notice periods and legal requirements.", icon: "🏠" },
  { slug: "lease-agreement", title: "Lease Agreement", description: "Residential lease agreements with rent terms, deposits, and tenant obligations.", icon: "📋" },
  { slug: "power-of-attorney", title: "Power of Attorney", description: "Authorize someone to act on your behalf for financial, medical, or legal matters.", icon: "⚖️" },
  { slug: "divorce-papers", title: "Divorce Papers", description: "Divorce petition templates with grounds, custody, and property division.", icon: "📑" },
  { slug: "last-will", title: "Last Will & Testament", description: "Plan your estate with executor, beneficiary, and asset distribution details.", icon: "📜" },
  { slug: "bill-of-sale", title: "Bill of Sale", description: "Document the sale of personal property including vehicles and valuables.", icon: "💰" },
  { slug: "promissory-note", title: "Promissory Note", description: "Formal loan agreements with interest rates, payment terms, and security.", icon: "📝" },
  { slug: "nda", title: "Non-Disclosure Agreement", description: "Protect confidential information with binding NDA templates.", icon: "🔒" },
  { slug: "rental-application", title: "Rental Application", description: "Screen potential tenants with comprehensive rental application forms.", icon: "🏡" },
  { slug: "living-will", title: "Living Will", description: "Advance directives for healthcare decisions when you cannot communicate.", icon: "🏥" },
  { slug: "child-custody", title: "Child Custody Agreement", description: "Custody arrangements, visitation schedules, and child support terms.", icon: "👨‍👩‍👧" },
  { slug: "separation-agreement", title: "Separation Agreement", description: "Legal separation terms including property, support, and custody.", icon: "📄" },
  { slug: "purchase-agreement", title: "Purchase Agreement", description: "Real estate purchase contracts with contingencies and closing terms.", icon: "🏠" },
  { slug: "affidavit", title: "Affidavit", description: "Sworn legal statements with notary requirements by state.", icon: "✍️" },
  { slug: "cease-desist", title: "Cease & Desist", description: "Demand letters for harassment, defamation, or intellectual property violations.", icon: "⛔" },
  { slug: "medical-authorization", title: "Medical Authorization", description: "HIPAA-compliant medical records release forms.", icon: "🩺" },
  // Phase 1
  { slug: "residential-lease", title: "Residential Lease Agreement", description: "Full residential lease with state-specific terms, rent, deposits, and legal compliance.", icon: "🏘️" },
  { slug: "quitclaim-deed", title: "Quitclaim Deed", description: "Transfer property interest without warranties. For family transfers, trusts, and title corrections.", icon: "📝" },
  { slug: "loan-agreement", title: "Loan Agreement", description: "Comprehensive loan contracts with interest, repayment schedules, and default provisions.", icon: "💳" },
  { slug: "business-plan", title: "Business Plan Template", description: "Professional business plan with market analysis, financials, and funding strategy.", icon: "📊" },
  // Phase 2
  { slug: "llc-operating-agreement", title: "LLC Operating Agreement", description: "Complete LLC agreement with member rights, management structure, and tax elections.", icon: "🏢" },
  { slug: "employment-contract", title: "Employment Contract", description: "Professional employment agreements with compensation, benefits, and legal protections.", icon: "👔" },
];

const topStates = [
  { name: "California", abbr: "CA" },
  { name: "Texas", abbr: "TX" },
  { name: "Florida", abbr: "FL" },
  { name: "New York", abbr: "NY" },
  { name: "Illinois", abbr: "IL" },
  { name: "Pennsylvania", abbr: "PA" },
  { name: "Ohio", abbr: "OH" },
  { name: "Georgia", abbr: "GA" },
  { name: "North Carolina", abbr: "NC" },
  { name: "Michigan", abbr: "MI" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            <Link href="/" className="hover:text-primary-600">📄 LegalDocs</Link>
          </h1>
          <p className="mt-2 text-gray-600">Free legal document templates for every situation</p>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-12 text-center text-white shadow-xl">
          <h2 className="text-4xl font-bold">Free Legal Document Templates</h2>
          <p className="mt-4 text-xl text-blue-100">
            State-specific templates you can fill out and download as PDF.
            Professional forms for individuals and businesses.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <span className="rounded-lg bg-white/20 px-4 py-2 text-sm">✅ 20 Document Types</span>
            <span className="rounded-lg bg-white/20 px-4 py-2 text-sm">✅ All 50 States</span>
            <span className="rounded-lg bg-white/20 px-4 py-2 text-sm">✅ Download as PDF</span>
          </div>
        </div>
      </div>

      {/* Document Types Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">Choose a Document Type</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {documentTypes.map((doc) => (
            <Link
              key={doc.slug}
              href={`/${doc.slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="text-3xl">{doc.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                {doc.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{doc.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* State Navigation */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Browse by State</h2>
        <p className="mb-8 text-gray-600">Get state-specific legal templates with the correct requirements</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {topStates.map((state) => (
            <Link
              key={state.abbr}
              href={`/state/${state.name.toLowerCase().replace(/ /g, "-")}`}
              className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="text-lg font-bold text-gray-900">{state.abbr}</div>
              <div className="text-sm text-gray-600">{state.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-yellow-50 p-6 text-sm text-yellow-800">
          <strong>Legal Disclaimer:</strong> LegalDocs provides document templates for informational purposes only.
          These templates are not legal advice and should not be used as a substitute for professional legal counsel.
          Laws vary by state and change frequently. Always consult with a licensed attorney in your jurisdiction
          before using any legal document. By using our templates, you acknowledge that LegalDocs is not a law firm
          and does not provide legal representation.
        </div>
      </div>
    </div>
  );
}