import { notFound } from 'next/navigation';
import Link from 'next/link';
import { US_STATES, getStateBySlug, getStateName } from '@/lib/state-engine';

const DOCUMENT_TYPES = [
  { slug: 'eviction-notice', title: 'Eviction Notice', category: 'Landlord-Tenant' },
  { slug: 'lease-agreement', title: 'Lease Agreement', category: 'Landlord-Tenant' },
  { slug: 'power-of-attorney', title: 'Power of Attorney', category: 'Estate Planning' },
  { slug: 'divorce-papers', title: 'Divorce Papers', category: 'Family Law' },
  { slug: 'last-will', title: 'Last Will & Testament', category: 'Estate Planning' },
  { slug: 'bill-of-sale', title: 'Bill of Sale', category: 'General' },
  { slug: 'promissory-note', title: 'Promissory Note', category: 'Financial' },
  { slug: 'nda', title: 'Non-Disclosure Agreement', category: 'Business' },
  { slug: 'rental-application', title: 'Rental Application', category: 'Landlord-Tenant' },
  { slug: 'living-will', title: 'Living Will', category: 'Healthcare' },
  { slug: 'child-custody', title: 'Child Custody Agreement', category: 'Family Law' },
  { slug: 'separation-agreement', title: 'Separation Agreement', category: 'Family Law' },
  { slug: 'purchase-agreement', title: 'Purchase Agreement', category: 'Real Estate' },
  { slug: 'affidavit', title: 'Affidavit', category: 'General' },
  { slug: 'cease-desist', title: 'Cease & Desist', category: 'General' },
  { slug: 'medical-authorization', title: 'Medical Authorization', category: 'Healthcare' },
  { slug: 'residential-lease', title: 'Residential Lease Agreement', category: 'Landlord-Tenant' },
  { slug: 'quitclaim-deed', title: 'Quitclaim Deed', category: 'Real Estate' },
  { slug: 'loan-agreement', title: 'Loan Agreement', category: 'Financial' },
  { slug: 'business-plan', title: 'Business Plan Template', category: 'Business' },
  { slug: 'llc-operating-agreement', title: 'LLC Operating Agreement', category: 'Business' },
  { slug: 'employment-contract', title: 'Employment Contract', category: 'Employment' },
  { slug: 'revocable-living-trust', title: 'Revocable Living Trust', category: 'Estate Planning' },
  { slug: 'commercial-lease', title: 'Commercial Lease Agreement', category: 'Real Estate' },
  { slug: 'prenuptial-agreement', title: 'Prenuptial Agreement', category: 'Family Law' },
  { slug: 'pour-over-will', title: 'Pour-Over Will', category: 'Estate Planning' },
  { slug: 'durable-power-of-attorney', title: 'Durable Power of Attorney', category: 'Estate Planning' },
  { slug: 'medical-power-of-attorney', title: 'Medical Power of Attorney', category: 'Healthcare' },
  { slug: 'advance-healthcare-directive', title: 'Advance Healthcare Directive', category: 'Healthcare' },
  { slug: 'irrevocable-trust', title: 'Irrevocable Trust', category: 'Estate Planning' },
  { slug: 'warranty-deed', title: 'Warranty Deed', category: 'Real Estate' },
  { slug: 'contract-for-deed', title: 'Contract for Deed', category: 'Real Estate' },
  { slug: 'easement-agreement', title: 'Easement Agreement', category: 'Real Estate' },
  { slug: 'complaint', title: 'Complaint (Civil)', category: 'Litigation' },
  { slug: 'answer', title: 'Answer (Civil)', category: 'Litigation' },
  { slug: 'discovery', title: 'Discovery Request', category: 'Litigation' },
  { slug: 'summary-judgment', title: 'Motion for Summary Judgment', category: 'Litigation' },
];

// Form fields per document type
const FORM_FIELDS: Record<string, { label: string; type: string; placeholder?: string; required?: boolean }[]> = {
  'eviction-notice': [
    { label: 'Landlord Name', type: 'text', placeholder: 'Full legal name', required: true },
    { label: 'Tenant Name', type: 'text', placeholder: 'Full legal name', required: true },
    { label: 'Property Address', type: 'text', placeholder: 'Street address, city, state, zip', required: true },
    { label: 'Lease Violation', type: 'select', placeholder: 'Select violation type', required: true },
    { label: 'Notice Period (Days)', type: 'number', placeholder: '3, 5, 7, 14, or 30', required: true },
    { label: 'Date of Violation', type: 'date', required: true },
    { label: 'Amount Owed (if applicable)', type: 'text', placeholder: '$0.00' },
  ],
  'lease-agreement': [
    { label: 'Landlord Name', type: 'text', placeholder: 'Full legal name or company', required: true },
    { label: 'Tenant Name', type: 'text', placeholder: 'Full legal name', required: true },
    { label: 'Property Address', type: 'text', placeholder: 'Street address, unit number', required: true },
    { label: 'Lease Start Date', type: 'date', required: true },
    { label: 'Lease End Date', type: 'date', required: true },
    { label: 'Monthly Rent', type: 'text', placeholder: '$0.00', required: true },
    { label: 'Security Deposit', type: 'text', placeholder: '$0.00', required: true },
    { label: 'Late Fee', type: 'text', placeholder: '$0.00' },
  ],
  'power-of-attorney': [
    { label: 'Principal Name', type: 'text', placeholder: 'Your full legal name', required: true },
    { label: 'Agent Name', type: 'text', placeholder: 'Agent full legal name', required: true },
    { label: 'Agent Address', type: 'text', placeholder: 'Agent address', required: true },
    { label: 'POA Type', type: 'select', placeholder: 'Select type', required: true },
    { label: 'Effective Date', type: 'date', required: true },
    { label: 'Powers Granted', type: 'textarea', placeholder: 'Describe specific powers...', required: true },
  ],
  'last-will': [
    { label: 'Testator Name', type: 'text', placeholder: 'Your full legal name', required: true },
    { label: 'Executor Name', type: 'text', placeholder: 'Executor full legal name', required: true },
    { label: 'Executor Address', type: 'text', placeholder: 'Executor address', required: true },
    { label: 'Beneficiary Name', type: 'text', placeholder: 'Beneficiary full legal name', required: true },
    { label: 'Beneficiary Relationship', type: 'text', placeholder: 'e.g., spouse, child', required: true },
    { label: 'Specific Bequests', type: 'textarea', placeholder: 'List specific items and who gets them...' },
  ],
  'bill-of-sale': [
    { label: 'Seller Name', type: 'text', placeholder: 'Full legal name', required: true },
    { label: 'Buyer Name', type: 'text', placeholder: 'Full legal name', required: true },
    { label: 'Item Description', type: 'textarea', placeholder: 'Detailed description of item(s)', required: true },
    { label: 'Sale Price', type: 'text', placeholder: '$0.00', required: true },
    { label: 'Sale Date', type: 'date', required: true },
    { label: 'Item Condition', type: 'select', placeholder: 'Select condition', required: true },
  ],
  'promissory-note': [
    { label: 'Lender Name', type: 'text', placeholder: 'Full legal name', required: true },
    { label: 'Borrower Name', type: 'text', placeholder: 'Full legal name', required: true },
    { label: 'Loan Amount', type: 'text', placeholder: '$0.00', required: true },
    { label: 'Interest Rate (%)', type: 'text', placeholder: 'e.g., 5.0', required: true },
    { label: 'Payment Due Date', type: 'date', required: true },
    { label: 'Payment Frequency', type: 'select', placeholder: 'Select frequency', required: true },
  ],
  'nda': [
    { label: 'Disclosing Party', type: 'text', placeholder: 'Full legal name or company', required: true },
    { label: 'Receiving Party', type: 'text', placeholder: 'Full legal name or company', required: true },
    { label: 'Confidential Information', type: 'textarea', placeholder: 'Describe what information is confidential', required: true },
    { label: 'Duration (Years)', type: 'number', placeholder: 'e.g., 2', required: true },
    { label: 'Effective Date', type: 'date', required: true },
  ],
};

// Default form fields for document types not specifically defined
const DEFAULT_FORM_FIELDS = [
  { label: 'Party 1 Name', type: 'text', placeholder: 'Full legal name', required: true },
  { label: 'Party 2 Name', type: 'text', placeholder: 'Full legal name', required: true },
  { label: 'Subject Matter', type: 'textarea', placeholder: 'Describe the subject of this document', required: true },
  { label: 'Effective Date', type: 'date', required: true },
  { label: 'Additional Terms', type: 'textarea', placeholder: 'Any additional terms or conditions...' },
];

export async function generateStaticParams() {
  const params: { doc: string; state: string }[] = [];
  for (const doc of DOCUMENT_TYPES) {
    for (const state of US_STATES) {
      if (state.abbr === 'DC') continue;
      params.push({ doc: doc.slug, state: state.name.toLowerCase().replace(/\s+/g, '-') });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string; state: string }> }) {
  const { doc: docSlug, state: stateSlug } = await params;
  const sa = getStateBySlug(stateSlug);
  const doc = DOCUMENT_TYPES.find(d => d.slug === docSlug);
  if (!sa || !doc) return { title: 'Not Found' };
  const sn = getStateName(sa);
  return {
    title: `Create ${doc.title} in ${sn} | LegalDocs`,
    description: `Fill out and download a free ${doc.title.toLowerCase()} template for ${sn}. Customized to ${sn} state laws.`,
  };
}

export default async function DocStateFormPage({ params }: { params: Promise<{ doc: string; state: string }> }) {
  const { doc: docSlug, state: stateSlug } = await params;
  const sa = getStateBySlug(stateSlug);
  const doc = DOCUMENT_TYPES.find(d => d.slug === docSlug);
  if (!sa || !doc) notFound();
  const sn = getStateName(sa);
  const fields = FORM_FIELDS[docSlug] || DEFAULT_FORM_FIELDS;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${docSlug}`} className="hover:text-primary-600">{doc.title}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${docSlug}/${stateSlug}`} className="hover:text-primary-600">{sn}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Create Document</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-2xl font-bold text-white md:text-3xl">
            Create Your {doc.title}
          </h1>
          <p className="mt-2 text-blue-100">
            {sn}-specific {doc.title.toLowerCase()} template
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          {/* Disclaimer */}
          <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
            <strong>⚠ Disclaimer:</strong> This template is for informational purposes only. Consult a licensed attorney in {sn} before use.
          </div>

          <form id="doc-form" className="space-y-6">
            {/* State Display */}
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="text-sm font-medium text-gray-700">State</div>
              <div className="text-lg font-semibold text-gray-900">{sn}</div>
              <input type="hidden" name="state" value={sn} />
            </div>

            {/* Form Fields */}
            {fields.map((field, i) => (
              <div key={i}>
                <label htmlFor={field.label} className="mb-1 block text-sm font-medium text-gray-700">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.label}
                    name={field.label}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.label}
                    name={field.label}
                    required={field.required}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">{field.placeholder || 'Select...'}</option>
                    {field.label === 'Lease Violation' && (
                      <>
                        <option value="non-payment">Non-Payment of Rent</option>
                        <option value="late-payment">Late Payment</option>
                        <option value="lease-violation">Lease Violation</option>
                        <option value="property-damage">Property Damage</option>
                        <option value="unauthorized-occupants">Unauthorized Occupants</option>
                        <option value="illegal-activity">Illegal Activity</option>
                        <option value="nuisance">Nuisance</option>
                      </>
                    )}
                    {field.label === 'POA Type' && (
                      <>
                        <option value="general">General Power of Attorney</option>
                        <option value="durable">Durable Power of Attorney</option>
                        <option value="limited">Limited Power of Attorney</option>
                        <option value="springing">Springing Power of Attorney</option>
                        <option value="medical">Medical Power of Attorney</option>
                      </>
                    )}
                    {field.label === 'Payment Frequency' && (
                      <>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annually">Annually</option>
                        <option value="lump-sum">Lump Sum</option>
                      </>
                    )}
                    {field.label === 'Item Condition' && (
                      <>
                        <option value="new">New</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.label}
                    name={field.label}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                )}
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Generate {doc.title} PDF
              </button>
              <Link
                href={`/${docSlug}/${stateSlug}`}
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Back to {sn} Info
              </Link>
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
            <p className="font-medium text-gray-900 mb-2">How it works:</p>
            <ol className="list-inside list-decimal space-y-1">
              <li>Fill out the form above with your information</li>
              <li>Click "Generate PDF" to create your document</li>
              <li>Download the PDF for printing or signing</li>
              <li>Review with a licensed attorney before use</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
