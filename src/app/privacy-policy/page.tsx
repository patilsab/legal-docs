import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | LegalDocs',
  description: 'Privacy policy for LegalDocs free legal document templates.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Privacy Policy</span>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6">
          <p className="text-gray-600"><strong>Last Updated:</strong> January 1, 2024</p>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="text-gray-700">LegalDocs collects minimal information to provide our services:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Form Data:</strong> Information you enter into our document builders is processed locally in your browser and is not stored on our servers.</li>
              <li><strong>Usage Data:</strong> We may collect anonymous usage statistics to improve our services.</li>
              <li><strong>Cookies:</strong> We use essential cookies to maintain your session preferences.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700">We use collected information to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Provide and maintain our services</li>
              <li>Improve user experience</li>
              <li>Analyze usage patterns</li>
              <li>Detect and prevent abuse</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Security</h2>
            <p className="text-gray-700">We implement appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
            <p className="text-gray-700">We may use third-party services such as Vercel for hosting and analytics. These services may collect information as described in their respective privacy policies.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Children's Privacy</h2>
            <p className="text-gray-700">Our services are not directed to individuals under 13. We do not knowingly collect personal information from children under 13.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Changes to This Policy</h2>
            <p className="text-gray-700">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact Us</h2>
            <p className="text-gray-700">If you have any questions about this Privacy Policy, please <Link href="/contact-us" className="text-blue-600 hover:underline">contact us</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
