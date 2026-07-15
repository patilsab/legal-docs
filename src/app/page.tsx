import Link from "next/link";

const documentTypes = [
  { slug: "eviction-notice", title: "Eviction Notice", description: "State-specific eviction notices with required notice periods and legal requirements.", icon: "🏠", category: "Landlord-Tenant" },
  { slug: "lease-agreement", title: "Lease Agreement", description: "Residential lease agreements with rent terms, deposits, and tenant obligations.", icon: "📋", category: "Landlord-Tenant" },
  { slug: "power-of-attorney", title: "Power of Attorney", description: "Authorize someone to act on your behalf for financial, medical, or legal matters.", icon: "⚖️", category: "Estate Planning" },
  { slug: "divorce-papers", title: "Divorce Papers", description: "Divorce petition templates with grounds, custody, and property division.", icon: "📑", category: "Family Law" },
  { slug: "last-will", title: "Last Will & Testament", description: "Plan your estate with executor, beneficiary, and asset distribution details.", icon: "📜", category: "Estate Planning" },
  { slug: "bill-of-sale", title: "Bill of Sale", description: "Document the sale of personal property including vehicles and valuables.", icon: "💰", category: "General" },
  { slug: "promissory-note", title: "Promissory Note", description: "Formal loan agreements with interest rates, payment terms, and security.", icon: "📝", category: "Financial" },
  { slug: "nda", title: "Non-Disclosure Agreement", description: "Protect confidential information with binding NDA templates.", icon: "🔒", category: "Business" },
  { slug: "rental-application", title: "Rental Application", description: "Screen potential tenants with comprehensive rental application forms.", icon: "🏡", category: "Landlord-Tenant" },
  { slug: "living-will", title: "Living Will", description: "Advance directives for healthcare decisions when you cannot communicate.", icon: "🏥", category: "Healthcare" },
  { slug: "child-custody", title: "Child Custody Agreement", description: "Custody arrangements, visitation schedules, and child support terms.", icon: "👨‍👩‍👧", category: "Family Law" },
  { slug: "separation-agreement", title: "Separation Agreement", description: "Legal separation terms including property, support, and custody.", icon: "📄", category: "Family Law" },
  { slug: "purchase-agreement", title: "Purchase Agreement", description: "Real estate purchase contracts with contingencies and closing terms.", icon: "🏠", category: "Real Estate" },
  { slug: "affidavit", title: "Affidavit", description: "Sworn legal statements with notary requirements by state.", icon: "✍️", category: "General" },
  { slug: "cease-desist", title: "Cease & Desist", description: "Demand letters for harassment, defamation, or intellectual property violations.", icon: "⛔", category: "General" },
  { slug: "medical-authorization", title: "Medical Authorization", description: "HIPAA-compliant medical records release forms.", icon: "🩺", category: "Healthcare" },
  { slug: "residential-lease", title: "Residential Lease Agreement", description: "Full residential lease with state-specific terms, rent, deposits, and legal compliance.", icon: "🏘️", category: "Landlord-Tenant" },
  { slug: "quitclaim-deed", title: "Quitclaim Deed", description: "Transfer property interest without warranties. For family transfers, trusts, and title corrections.", icon: "📝", category: "Real Estate" },
  { slug: "loan-agreement", title: "Loan Agreement", description: "Comprehensive loan contracts with interest, repayment schedules, and default provisions.", icon: "💳", category: "Financial" },
  { slug: "business-plan", title: "Business Plan Template", description: "Professional business plan with market analysis, financials, and funding strategy.", icon: "📊", category: "Business" },
  { slug: "llc-operating-agreement", title: "LLC Operating Agreement", description: "Complete LLC agreement with member rights, management structure, and tax elections.", icon: "🏢", category: "Business" },
  { slug: "employment-contract", title: "Employment Contract", description: "Professional employment agreements with compensation, benefits, and legal protections.", icon: "👔", category: "Employment" },
  { slug: "revocable-living-trust", title: "Revocable Living Trust", description: "Avoid probate and plan for incapacity with a comprehensive living trust.", icon: "🏛️", category: "Estate Planning" },
  { slug: "commercial-lease", title: "Commercial Lease Agreement", description: "Office, retail, and industrial leases with CAM, TI allowances, and escalations.", icon: "🏢", category: "Real Estate" },
  { slug: "prenuptial-agreement", title: "Prenuptial Agreement", description: "Protect assets and define spousal support before marriage with full financial disclosure.", icon: "💍", category: "Family Law" },
  { slug: "pour-over-will", title: "Pour-Over Will", description: "Direct remaining assets into your living trust for seamless estate transfer.", icon: "📜", category: "Estate Planning" },
  { slug: "durable-power-of-attorney", title: "Durable Power of Attorney", description: "Financial authority that survives incapacity. Essential for estate planning.", icon: "⚖️", category: "Estate Planning" },
  { slug: "medical-power-of-attorney", title: "Medical Power of Attorney", description: "Designate someone to make healthcare decisions when you cannot.", icon: "🏥", category: "Healthcare" },
  { slug: "advance-healthcare-directive", title: "Advance Healthcare Directive", description: "Combine living will and medical POA for comprehensive healthcare planning.", icon: "📋", category: "Healthcare" },
  { slug: "irrevocable-trust", title: "Irrevocable Trust", description: "Protect assets from creditors and estate taxes with a permanent trust.", icon: "🏛️", category: "Estate Planning" },
  { slug: "warranty-deed", title: "Warranty Deed", description: "Full title protection for real estate transfers with guaranteed ownership.", icon: "🏠", category: "Real Estate" },
  { slug: "contract-for-deed", title: "Contract for Deed", description: "Seller-financed real estate purchase with installment payments.", icon: "📄", category: "Real Estate" },
  { slug: "easement-agreement", title: "Easement Agreement", description: "Grant or restrict property access rights for utilities, driveways, or paths.", icon: "📝", category: "Real Estate" },
  { slug: "complaint", title: "Complaint (Civil)", description: "File a civil lawsuit with proper legal allegations and causes of action.", icon: "⚖️", category: "Litigation" },
  { slug: "answer", title: "Answer (Civil)", description: "Respond to a civil lawsuit with defenses and counterclaims.", icon: "📋", category: "Litigation" },
  { slug: "discovery", title: "Discovery Request", description: "Interrogatories, requests for production, and deposition notices.", icon: "🔍", category: "Litigation" },
  { slug: "summary-judgment", title: "Motion for Summary Judgment", description: "Request court judgment without trial when no genuine disputes exist.", icon: "⚖️", category: "Litigation" },
];



export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 md:py-28">
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
            Free for all 50 US states
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Legal Document Templates
            <span className="block text-blue-200">Made Simple</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 md:text-xl">
            Create professional legal documents in minutes. State-specific templates for eviction notices, lease agreements, wills, and 34 more document types.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#documents" className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50 hover:shadow-xl">
              Browse Documents
            </a>
            <a href="/about-us" className="rounded-xl border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Learn More
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-2"><span className="text-green-400">✓</span> 37 Document Types</div>
            <div className="flex items-center gap-2"><span className="text-green-400">✓</span> All 50 States</div>
            <div className="flex items-center gap-2"><span className="text-green-400">✓</span> Free to Use</div>
            <div className="flex items-center gap-2"><span className="text-green-400">✓</span> Download as PDF</div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center"><div className="text-3xl font-bold text-gray-900">37</div><div className="text-sm text-gray-600">Document Types</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-gray-900">50</div><div className="text-sm text-gray-600">US States</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-gray-900">1,850</div><div className="text-sm text-gray-600">Unique Pages</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-gray-900">100%</div><div className="text-sm text-gray-600">Free to Use</div></div>
          </div>
        </div>
      </section>

      <section id="documents" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Choose a Document Type</h2>
            <p className="mt-3 text-lg text-gray-600">Select from our comprehensive library of legal document templates</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {documentTypes.map((doc) => (
              <Link key={doc.slug} href={`/${doc.slug}`} className="card-hover group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl transition group-hover:bg-blue-100">{doc.icon}</div>
                <h3 className="mb-1 font-semibold text-gray-900 transition group-hover:text-blue-600">{doc.title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-gray-600 line-clamp-2">{doc.description}</p>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">{doc.category}</span>
                  <span className="text-sm font-medium text-blue-600 opacity-0 transition group-hover:opacity-100">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-gray-300">Browse our complete library of legal document templates for all 50 US states.</p>
          <a href="#documents" className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500">Browse All Documents</a>
        </div>
      </section>
    </div>
  );
}