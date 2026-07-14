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
            <p className="mt-2 text-sm text-gray-600">Free {state.name} template — fill out online, download as PDF</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
