import Link from "next/link";

const documentTypes = [
  { slug: "eviction-notice", title: "Eviction Notice", description: "State-specific eviction notices with proper notice periods.", icon: "📋" },
  { slug: "lease-agreement", title: "Lease Agreement", description: "Residential and commercial lease agreements.", icon: "📝" },
  { slug: "power-of-attorney", title: "Power of Attorney", description: "General and special power of attorney forms.", icon: "⚖️" },
  { slug: "bill-of-sale", title: "Bill of Sale", description: "Vehicle, boat, and general bill of sale templates.", icon: "🚗" },
  { slug: "last-will", title: "Last Will and Testament", description: "Create your will with state-specific requirements.", icon: "📜" },
  { slug: "nda", title: "Non-Disclosure Agreement", description: "Protect your confidential information.", icon: "🔒" },
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {documentTypes.map((doc) => (
              <Link key={doc.slug} href={`/${doc.slug}`} className="group rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="text-3xl">{doc.icon}</div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-primary-600">{doc.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{doc.description}</p>
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
          <h2 className="mb-4 text-2xl font-bold text-gray-900">About LegalDocs</h2>
          <div className="space-y-4 text-gray-600">
            <p>LegalDocs provides free, state-specific legal document templates for all 50 US states. Our interactive form builder lets you fill out documents online and download them as PDFs.</p>
            <p>Whether you need an eviction notice in California, a lease agreement in Texas, or a power of attorney in New York, we have templates tailored to your state&apos;s specific legal requirements.</p>
            <p><strong>Important:</strong> These templates are for informational purposes only. Always consult with a licensed attorney for legal advice specific to your situation.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
