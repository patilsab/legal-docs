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
            <span className="rounded-lg bg-white/20 px-4 py-2 text-sm">✅ 41 Document Types</span>
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