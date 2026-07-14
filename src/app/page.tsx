import Link from "next/link";

const documentTypes = [
  { slug: "eviction-notice", title: "Eviction Notice", description: "State-specific eviction notices with proper notice periods and legal requirements.", icon: "📋", cpc: "$25-60" },
  { slug: "lease-agreement", title: "Lease Agreement", description: "Residential lease agreements tailored to your state's landlord-tenant laws.", icon: "📝", cpc: "$20-45" },
  { slug: "power-of-attorney", title: "Power of Attorney", description: "General, special, and medical power of attorney forms.", icon: "⚖️", cpc: "$20-50" },
  { slug: "divorce-papers", title: "Divorce Papers", description: "Divorce petition, settlement agreement, and custody forms.", icon: "💔", cpc: "$40-80" },
  { slug: "last-will", title: "Last Will and Testament", description: "Create your will with state-specific requirements and executor designation.", icon: "📜", cpc: "$30-70" },
  { slug: "bill-of-sale", title: "Bill of Sale", description: "Vehicle, boat, and general bill of sale templates for your state.", icon: "🚗", cpc: "$15-30" },
  { slug: "promissory-note", title: "Promissory Note", description: "Loan agreements with interest rates, repayment terms, and late fees.", icon: "💰", cpc: "$20-50" },
  { slug: "nda", title: "Non-Disclosure Agreement", description: "Protect your confidential business and personal information.", icon: "🔒", cpc: "$15-35" },
];

const topStates = ["California", "Texas", "Florida", "New York", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"];

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Free Legal Document Templates</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
            State-specific templates for all 50 US states. Fill out online, download as PDF. No signup required.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Popular Document Types</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {documentTypes.map((doc) => (
              <Link key={doc.slug} href={`/${doc.slug}`} className="group rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="text-3xl">{doc.icon}</div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-primary-600">{doc.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{doc.description}</p>
                <span className="mt-3 inline-block rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700">Free Template</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Browse by State</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {topStates.map((state) => (
              <Link key={state} href={`/state/${state.toLowerCase().replace(/ /g, "-")}`} className="rounded-lg border bg-white p-4 text-center font-medium text-gray-700 transition hover:border-primary-500 hover:text-primary-600">
                {state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Use LegalDocs?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">✓</div>
              <div>
                <h3 className="font-semibold text-gray-900">State-Specific Templates</h3>
                <p className="text-sm text-gray-600">Every template is tailored to your state&apos;s specific legal requirements and notice periods.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">✓</div>
              <div>
                <h3 className="font-semibold text-gray-900">Interactive Form Builder</h3>
                <p className="text-sm text-gray-600">Fill out documents online with our guided forms. No more handwriting or messy PDFs.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">✓</div>
              <div>
                <h3 className="font-semibold text-gray-900">100% Free</h3>
                <p className="text-sm text-gray-600">No signup, no credit card, no hidden fees. Download and print immediately.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">✓</div>
              <div>
                <h3 className="font-semibold text-gray-900">Instant PDF Download</h3>
                <p className="text-sm text-gray-600">Generate a professional PDF in seconds, ready for printing or filing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">8 Document Types Across All 50 States</h2>
          <p className="mt-4 text-gray-600">
            From eviction notices to divorce papers, we provide free, state-specific legal document templates.
            Our interactive form builders make it easy to fill out and download professional documents.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            <strong>Disclaimer:</strong> These templates are for informational purposes only and do not constitute legal advice.
            Always consult with a licensed attorney for legal advice specific to your situation.
          </p>
        </div>
      </section>
    </div>
  );
}
