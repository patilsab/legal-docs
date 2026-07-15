import Link from 'next/link';

export const metadata = {
  title: 'Legal Blog - Tips, Guides and Updates | LegalDocs',
  description: 'Stay informed with the latest legal tips, state law updates, and document guides.',
};

const blogPosts = [
  { slug: 'understanding-eviction-laws-by-state', title: 'Understanding Eviction Laws by State', category: 'Landlord-Tenant', readTime: '12 min read', date: 'January 15, 2024', icon: '\u{1f3e0}', excerpt: 'Learn about eviction notice requirements, tenant rights, and landlord obligations across all 50 US states.' },
  { slug: 'how-to-write-a-lease-agreement', title: 'How to Write a Lease Agreement', category: 'Landlord-Tenant', readTime: '10 min read', date: 'January 12, 2024', icon: '\u{1f4cb}', excerpt: 'Everything you need to know about creating a legally binding residential lease agreement.' },
  { slug: 'power-of-attorney-explained', title: 'Power of Attorney Explained', category: 'Estate Planning', readTime: '15 min read', date: 'January 10, 2024', icon: '\u2696\ufe0f', excerpt: 'Understand the different types of power of attorney, when you need one, and how to create a valid POA.' },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Legal Blog</h1>
          <p className="mt-4 text-lg text-blue-100">Expert tips, guides, and updates on legal documents</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
              <div className="p-6">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{post.category}</span>
                <h2 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-blue-600">{post.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>{post.date}</span><span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
