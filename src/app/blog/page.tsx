import Link from 'next/link';

export const metadata = {
  title: 'Legal Blog - Tips, Guides & Updates | LegalDocs',
  description: 'Stay informed with the latest legal tips, state law updates, and document guides from LegalDocs experts.',
};

const blogPosts = [
  {
    slug: 'understanding-eviction-laws-by-state',
    title: 'Understanding Eviction Laws by State: A Comprehensive Guide',
    excerpt: 'Learn about eviction notice requirements, tenant rights, and landlord obligations across all 50 US states.',
    category: 'Landlord-Tenant',
    readTime: '12 min read',
    date: 'January 15, 2024',
    icon: '🏠',
  },
  {
    slug: 'how-to-write-a-lease-agreement',
    title: 'How to Write a Lease Agreement: Step-by-Step Guide',
    excerpt: 'Everything you need to know about creating a legally binding residential lease agreement.',
    category: 'Landlord-Tenant',
    readTime: '10 min read',
    date: 'January 12, 2024',
    icon: '📋',
  },
  {
    slug: 'power-of-attorney-explained',
    title: 'Power of Attorney Explained: Types, Requirements & How to Get One',
    excerpt: 'Understand the different types of power of attorney, when you need one, and how to create a valid POA.',
    category: 'Estate Planning',
    readTime: '15 min read',
    date: 'January 10, 2024',
    icon: '⚖️',
  },
  {
    slug: 'estate-planning-101',
    title: 'Estate Planning 101: What Every Adult Needs to Know',
    excerpt: 'From wills to trusts, learn the essentials of estate planning and protect your family\'s future.',
    category: 'Estate Planning',
    readTime: '14 min read',
    date: 'January 8, 2024',
    icon: '📜',
  },
  {
    slug: 'divorce-process-by-state',
    title: 'The Divorce Process by State: What to Expect',
    excerpt: 'A state-by-state breakdown of divorce requirements, timelines, and legal considerations.',
    category: 'Family Law',
    readTime: '18 min read',
    date: 'January 5, 2024',
    icon: '📑',
  },
  {
    slug: 'small-business-legal-essentials',
    title: 'Small Business Legal Essentials: Documents Every Startup Needs',
    excerpt: 'Protect your business with these essential legal documents and agreements.',
    category: 'Business',
    readTime: '11 min read',
    date: 'January 3, 2024',
    icon: '💼',
  },
  {
    slug: 'real-estate-closing-checklist',
    title: 'Real Estate Closing Checklist: What You Need to Know',
    excerpt: 'Navigate the closing process with confidence using this comprehensive checklist.',
    category: 'Real Estate',
    readTime: '13 min read',
    date: 'December 28, 2023',
    icon: '🏠',
  },
  {
    slug: 'healthcare-directives-explained',
    title: 'Healthcare Directives Explained: Your Right to Choose',
    excerpt: 'Understand advance directives, living wills, and medical power of attorney.',
    category: 'Healthcare',
    readTime: '9 min read',
    date: 'December 25, 2023',
    icon: '🏥',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Legal Blog</h1>
          <p className="mt-4 text-lg text-blue-100">Expert tips, guides, and updates on legal documents and state laws</p>
        </div>
      </section>

      {/* Blog Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  {post.icon}
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{post.category}</span>
                <h2 className="mt-3 text-lg font-bold text-gray-900 transition group-hover:text-blue-600">{post.title}</h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
