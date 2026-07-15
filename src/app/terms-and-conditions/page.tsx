import Link from 'next/link';

export const metadata = {
  title: 'Terms and Conditions | LegalDocs',
  description: 'Terms and conditions for using LegalDocs free legal document templates.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Terms and Conditions</span>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
        <div className="prose prose-gray max-w-none space-y-6">
          <p className="text-gray-600"><strong>Last Updated:</strong> January 1, 2024</p>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700">By accessing and using LegalDocs (the "Website"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use this Website.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
            <p className="text-gray-700">LegalDocs provides free legal document templates for informational and educational purposes. Our templates are designed to help users understand common legal document structures and requirements.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Not Legal Advice</h2>
            <p className="text-gray-700">The templates and information provided on this Website are for informational purposes only and do not constitute legal advice. We are not a law firm and do not provide legal representation. You should consult with a licensed attorney in your jurisdiction before using any legal document.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. User Responsibilities</h2>
            <p className="text-gray-700">You are responsible for:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Ensuring that any documents you create using our templates comply with applicable laws</li>
              <li>Reviewing all documents with a qualified attorney before use</li>
              <li>Providing accurate information when using our form builders</li>
              <li>Maintaining the confidentiality of any accounts you create</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p className="text-gray-700">All content on this Website, including text, graphics, logos, and software, is the property of LegalDocs and is protected by copyright laws. You may use our templates for personal and commercial purposes, but you may not redistribute or sell our templates as-is.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-700">LegalDocs shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our templates or Website. We make no warranties about the accuracy, completeness, or reliability of our content.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Indemnification</h2>
            <p className="text-gray-700">You agree to indemnify and hold LegalDocs harmless from any claims, losses, or damages arising from your use of our templates or violation of these Terms.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to Terms</h2>
            <p className="text-gray-700">We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of the Website constitutes acceptance of any changes.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Governing Law</h2>
            <p className="text-gray-700">These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
            <p className="text-gray-700">If you have any questions about these Terms, please <Link href="/contact-us" className="text-blue-600 hover:underline">contact us</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
