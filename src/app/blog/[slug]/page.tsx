import Link from 'next/link';
import { notFound } from 'next/navigation';

const blogPosts: Record<string, { title: string; category: string; date: string; readTime: string; icon: string; content: string }> = {
  'understanding-eviction-laws-by-state': {
    title: 'Understanding Eviction Laws by State',
    category: 'Landlord-Tenant',
    date: 'January 15, 2024',
    readTime: '12 min read',
    icon: '\u{1f3e0}',
    content: 'Eviction laws vary significantly from state to state. This guide covers key aspects across all 50 US states.',
  },
  'how-to-write-a-lease-agreement': {
    title: 'How to Write a Lease Agreement',
    category: 'Landlord-Tenant',
    date: 'January 12, 2024',
    readTime: '10 min read',
    icon: '\u{1f4cb}',
    content: 'A well-written lease agreement protects both landlords and tenants. This guide walks you through creating one.',
  },
  'power-of-attorney-explained': {
    title: 'Power of Attorney Explained',
    category: 'Estate Planning',
    date: 'January 10, 2024',
    readTime: '15 min read',
    icon: '\u2696\ufe0f',
    content: 'A power of attorney is a legal document that grants one person authority to act on behalf of another.',
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: 'Not Found' };
  return { title: `${post.title} | LegalDocs Blog`, description: post.content };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
        </div>
      </div>
      <article className="mx-auto max-w-4xl px-4 py-12">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">{post.category}</span>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">{post.title}</h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <span>{post.date}</span><span>\u2022</span><span>{post.readTime}</span>
        </div>
        <div className="mt-8 text-lg text-gray-700 leading-relaxed">{post.content}</div>
        <div className="mt-12 rounded-xl bg-blue-50 p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900">Need a Legal Document?</h2>
          <p className="mt-2 text-gray-600">Create a free, state-specific legal document template.</p>
          <Link href="/" className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white">Browse Documents</Link>
        </div>
      </article>
    </div>
  );
}
