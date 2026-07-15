import Link from 'next/link';
import { notFound } from 'next/navigation';
import { US_STATES, getStateLegalNotes } from '@/lib/state-engine';

const DOCUMENT_TYPES = [
  { slug: 'eviction-notice', title: 'Eviction Notice', description: 'State-specific eviction notices with required notice periods and legal requirements.', icon: '🏠', category: 'Landlord-Tenant' },
  { slug: 'lease-agreement', title: 'Lease Agreement', description: 'Residential lease agreements with rent terms, deposits, and tenant obligations.', icon: '📋', category: 'Landlord-Tenant' },
  { slug: 'power-of-attorney', title: 'Power of Attorney', description: 'Authorize someone to act on your behalf for financial, medical, or legal matters.', icon: '⚖️', category: 'Estate Planning' },
  { slug: 'divorce-papers', title: 'Divorce Papers', description: 'Divorce petition templates with grounds, custody, and property division.', icon: '📑', category: 'Family Law' },
  { slug: 'last-will', title: 'Last Will & Testament', description: 'Plan your estate with executor, beneficiary, and asset distribution details.', icon: '📜', category: 'Estate Planning' },
  { slug: 'bill-of-sale', title: 'Bill of Sale', description: 'Document the sale of personal property including vehicles and valuables.', icon: '💰', category: 'General' },
  { slug: 'promissory-note', title: 'Promissory Note', description: 'Formal loan agreements with interest rates, payment terms, and security.', icon: '📝', category: 'Financial' },
  { slug: 'nda', title: 'Non-Disclosure Agreement', description: 'Protect confidential information with binding NDA templates.', icon: '🔒', category: 'Business' },
  { slug: 'rental-application', title: 'Rental Application', description: 'Screen potential tenants with comprehensive rental application forms.', icon: '🏡', category: 'Landlord-Tenant' },
  { slug: 'living-will', title: 'Living Will', description: 'Advance directives for healthcare decisions when you cannot communicate.', icon: '🏥', category: 'Healthcare' },
  { slug: 'child-custody', title: 'Child Custody Agreement', description: 'Custody arrangements, visitation schedules, and child support terms.', icon: '👨‍👩‍👧', category: 'Family Law' },
  { slug: 'separation-agreement', title: 'Separation Agreement', description: 'Legal separation terms including property, support, and custody.', icon: '📄', category: 'Family Law' },
  { slug: 'purchase-agreement', title: 'Purchase Agreement', description: 'Real estate purchase contracts with contingencies and closing terms.', icon: '🏠', category: 'Real Estate' },
  { slug: 'affidavit', title: 'Affidavit', description: 'Sworn legal statements with notary requirements by state.', icon: '✍️', category: 'General' },
  { slug: 'cease-desist', title: 'Cease & Desist', description: 'Demand letters for harassment, defamation, or intellectual property violations.', icon: '⛔', category: 'General' },
  { slug: 'medical-authorization', title: 'Medical Authorization', description: 'HIPAA-compliant medical records release forms.', icon: '🩺', category: 'Healthcare' },
  { slug: 'residential-lease', title: 'Residential Lease Agreement', description: 'Full residential lease with state-specific terms, rent, deposits, and legal compliance.', icon: '🏘️', category: 'Landlord-Tenant' },
  { slug: 'quitclaim-deed', title: 'Quitclaim Deed', description: 'Transfer property interest without warranties.', icon: '📝', category: 'Real Estate' },
  { slug: 'loan-agreement', title: 'Loan Agreement', description: 'Comprehensive loan contracts with interest, repayment schedules, and default provisions.', icon: '💳', category: 'Financial' },
  { slug: 'business-plan', title: 'Business Plan Template', description: 'Professional business plan with market analysis, financials, and funding strategy.', icon: '📊', category: 'Business' },
  { slug: 'llc-operating-agreement', title: 'LLC Operating Agreement', description: 'Complete LLC agreement with member rights, management structure, and tax elections.', icon: '🏢', category: 'Business' },
  { slug: 'employment-contract', title: 'Employment Contract', description: 'Professional employment agreements with compensation, benefits, and legal protections.', icon: '👔', category: 'Employment' },
  { slug: 'revocable-living-trust', title: 'Revocable Living Trust', description: 'Avoid probate and plan for incapacity with a comprehensive living trust.', icon: '🏛️', category: 'Estate Planning' },
  { slug: 'commercial-lease', title: 'Commercial Lease Agreement', description: 'Office, retail, and industrial leases with CAM, TI allowances, and escalations.', icon: '🏢', category: 'Real Estate' },
  { slug: 'prenuptial-agreement', title: 'Prenuptial Agreement', description: 'Protect assets and define spousal support before marriage.', icon: '💍', category: 'Family Law' },
  { slug: 'pour-over-will', title: 'Pour-Over Will', description: 'Direct remaining assets into your living trust.', icon: '📜', category: 'Estate Planning' },
  { slug: 'durable-power-of-attorney', title: 'Durable Power of Attorney', description: 'Financial authority that survives incapacity.', icon: '⚖️', category: 'Estate Planning' },
  { slug: 'medical-power-of-attorney', title: 'Medical Power of Attorney', description: 'Designate someone to make healthcare decisions when you cannot.', icon: '🏥', category: 'Healthcare' },
  { slug: 'advance-healthcare-directive', title: 'Advance Healthcare Directive', description: 'Combine living will and medical POA for comprehensive healthcare planning.', icon: '📋', category: 'Healthcare' },
  { slug: 'irrevocable-trust', title: 'Irrevocable Trust', description: 'Protect assets from creditors and estate taxes with a permanent trust.', icon: '🏛️', category: 'Estate Planning' },
  { slug: 'warranty-deed', title: 'Warranty Deed', description: 'Full title protection for real estate transfers.', icon: '🏠', category: 'Real Estate' },
  { slug: 'contract-for-deed', title: 'Contract for Deed', description: 'Seller-financed real estate purchase with installment payments.', icon: '📄', category: 'Real Estate' },
  { slug: 'easement-agreement', title: 'Easement Agreement', description: 'Grant or restrict property access rights.', icon: '📝', category: 'Real Estate' },
  { slug: 'complaint', title: 'Complaint (Civil)', description: 'File a civil lawsuit with proper legal allegations.', icon: '⚖️', category: 'Litigation' },
  { slug: 'answer', title: 'Answer (Civil)', description: 'Respond to a civil lawsuit with defenses.', icon: '📋', category: 'Litigation' },
  { slug: 'discovery', title: 'Discovery Request', description: 'Interrogatories, requests for production, and deposition notices.', icon: '🔍', category: 'Litigation' },
  { slug: 'summary-judgment', title: 'Motion for Summary Judgment', description: 'Request court judgment without trial.', icon: '⚖️', category: 'Litigation' },
];

export async function generateStaticParams() {
  return DOCUMENT_TYPES.map(d => ({ doc: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }) {
  const { doc: docSlug } = await params;
  const doc = DOCUMENT_TYPES.find(d => d.slug === docSlug);
  if (!doc) return { title: 'Not Found' };
  return {
    title: `${doc.title} - All 50 States | LegalDocs`,
    description: `Browse ${doc.title.toLowerCase()} templates for all 50 US states. Find state-specific legal requirements and download free templates.`,
  };
}

export default async function DocPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc: docSlug } = await params;
  const doc = DOCUMENT_TYPES.find(d => d.slug === docSlug);
  if (!doc) notFound();

  const states = US_STATES.filter(s => s.abbr !== 'DC').map(s => ({
    name: s.name,
    abbr: s.abbr,
    slug: s.name.toLowerCase().replace(/\s+/g, '-'),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{doc.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="text-4xl mb-4 block">{doc.icon}</span>
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm text-white mb-4">{doc.category}</span>
          <h1 className="text-3xl font-bold text-white md:text-4xl">{doc.title} - All 50 States</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">{doc.description}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="rounded-lg bg-white/20 px-4 py-2 text-sm text-white">✅ 50 States Available</span>
            <span className="rounded-lg bg-white/20 px-4 py-2 text-sm text-white">✅ Free Templates</span>
            <span className="rounded-lg bg-white/20 px-4 py-2 text-sm text-white">✅ State-Specific Laws</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Disclaimer */}
        <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          <strong>⚠ Legal Disclaimer:</strong> These templates are for informational purposes only and do not constitute legal advice. Consult a licensed attorney in your state before use.
        </div>

        {/* States Grid */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Select Your State</h2>
          <p className="mb-6 text-gray-600">Choose a state to view {doc.title.toLowerCase()} requirements and create your document.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {states.map((state) => (
            <Link
              key={state.abbr}
              href={`/${doc.slug}/${state.slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{state.abbr}</div>
              <div className="text-sm text-gray-600">{state.name}</div>
              <div className="mt-3 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                View {doc.title} →
              </div>
            </Link>
          ))}
        </div>

        {/* About Section */}
        <div className="mt-12 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">About {doc.title}</h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">{doc.description}</p>
          
          <div className="prose prose-gray max-w-none space-y-4">
            <h3 className="text-xl font-bold text-gray-900">What is a {doc.title}?</h3>
            <p className="text-gray-700">A {doc.title.toLowerCase()} is a legally binding document used in the United States to establish rights, obligations, and agreements between parties. This type of document is governed by state-specific laws and regulations, which vary from state to state. Understanding the legal requirements in your jurisdiction is essential to ensure your {doc.title.toLowerCase()} is valid and enforceable.</p>
            
            <h3 className="text-xl font-bold text-gray-900">Why You Need a {doc.title}</h3>
            <p className="text-gray-700">Having a properly drafted {doc.title.toLowerCase()} is essential for protecting your interests and ensuring legal compliance. Without a valid {doc.title.toLowerCase()}, you may face disputes, legal complications, or financial losses. A well-drafted document clearly outlines the rights and responsibilities of all parties, reducing the risk of misunderstandings and conflicts.</p>
            
            <h3 className="text-xl font-bold text-gray-900">Key Components</h3>
            <p className="text-gray-700">A comprehensive {doc.title.toLowerCase()} should include the following essential components:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Identification of Parties:</strong> Full legal names and contact information of all parties involved</li>
              <li><strong>Purpose and Scope:</strong> Clear description of the document&apos;s purpose and the agreement being made</li>
              <li><strong>Terms and Conditions:</strong> Detailed terms, timelines, and obligations of each party</li>
              <li><strong>Legal Disclosures:</strong> State-specific disclosures required by law</li>
              <li><strong>Signatures:</strong> Proper execution with required witnesses or notarization</li>
              <li><strong>Governing Law:</strong> Specification of which state&apos;s laws apply to the document</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900">State-Specific Requirements</h3>
            <p className="text-gray-700">Each state has unique requirements for {doc.title.toLowerCase()} documents. These may include specific language requirements, mandatory disclosures, notarization requirements, and filing procedures. Select your state above to view the specific requirements and legal notes that apply to your jurisdiction.</p>
            
            <h3 className="text-xl font-bold text-gray-900">How to Use Our {doc.title} Templates</h3>
            <p className="text-gray-700">Our {doc.title.toLowerCase()} templates are designed to be easy to use while meeting all legal requirements. Follow these steps to create your document:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Select your state from the options above</li>
              <li>Review the state-specific legal requirements and notes</li>
              <li>Fill out the interactive form with your information</li>
              <li>Download the PDF for printing or signing</li>
              <li>Have the document reviewed by a licensed attorney before use</li>
            </ol>
            
            <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">Is a {doc.title.toLowerCase()} legally binding?</h4>
                <p className="mt-2 text-gray-700">Yes, a properly drafted and executed {doc.title.toLowerCase()} is legally binding in all 50 US states, provided it meets the specific requirements of the state where it is created and executed.</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">Do I need a lawyer to create a {doc.title.toLowerCase()}?</h4>
                <p className="mt-2 text-gray-700">While not required, it is highly recommended to have a qualified attorney review your {doc.title.toLowerCase()} to ensure it complies with state-specific laws and protects your interests.</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">How long does a {doc.title.toLowerCase()} remain valid?</h4>
                <p className="mt-2 text-gray-700">The validity period depends on the type of document and state law. Some documents have specific expiration dates, while others remain valid until terminated or modified by the parties.</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900">Can a {doc.title.toLowerCase()} be modified after signing?</h4>
                <p className="mt-2 text-gray-700">Most {doc.title.toLowerCase()} documents can be modified if all parties agree to the changes. Modifications should be documented in writing and executed with the same formalities as the original document.</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900">Important Disclaimers</h3>
            <p className="text-gray-700">The {doc.title.toLowerCase()} templates and information provided on this website are for informational purposes only and do not constitute legal advice. We are not a law firm and do not provide legal representation. You should consult with a licensed attorney in your jurisdiction before using any legal document.</p>
            <p className="text-gray-700">Laws vary by state and change frequently. While we strive to keep our templates up-to-date, we cannot guarantee that they reflect the most current legal requirements in your state. Always verify that your document complies with current state and local laws.</p>
          </div>
        </div>

        {/* Related Documents */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Related Documents</h2>
          <div className="flex flex-wrap gap-2">
            {DOCUMENT_TYPES.filter(d => d.category === doc.category && d.slug !== doc.slug).slice(0, 5).map(d => (
              <Link
                key={d.slug}
                href={`/${d.slug}`}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:border-blue-300 hover:text-blue-600 transition"
              >
                {d.icon} {d.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
