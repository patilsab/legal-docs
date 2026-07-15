import Link from 'next/link';

export const metadata = {
  title: 'About Us | LegalDocs',
  description: 'Learn about LegalDocs - free legal document templates for all 50 US states.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">About Us</span>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About LegalDocs</h1>
        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <p className="text-lg text-gray-700">LegalDocs is a free online platform that provides state-specific legal document templates for all 50 US states. Our mission is to make legal documents accessible to everyone, regardless of their background or financial resources.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h2>
            <p className="text-gray-700">We believe that everyone deserves access to quality legal document templates. Our goal is to provide comprehensive, easy-to-use templates that help individuals and businesses create legally sound documents without the high costs associated with traditional legal services.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>37 Document Types:</strong> From eviction notices to wills, we cover a wide range of legal documents.</li>
              <li><strong>50 State Coverage:</strong> Each template is customized to meet the specific legal requirements of your state.</li>
              <li><strong>Free to Use:</strong> All our templates are completely free, with no hidden fees or subscriptions.</li>
              <li><strong>PDF Download:</strong> Generate professional PDF documents ready for printing and signing.</li>
              <li><strong>Interactive Forms:</strong> Fill out forms online with our easy-to-use form builders.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Our Commitment</h2>
            <p className="text-gray-700">We are committed to providing accurate, up-to-date information about legal requirements in each state. However, we are not a law firm and do not provide legal advice. We always recommend consulting with a licensed attorney before using any legal document.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <p className="text-gray-700">Have questions or suggestions? We'd love to hear from you! Visit our <Link href="/contact-us" className="text-blue-600 hover:underline">contact page</Link> to get in touch.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
