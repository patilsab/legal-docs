import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | LegalDocs',
  description: 'Get in touch with LegalDocs for questions, feedback, or support.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Contact Us</span>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-6">We'd love to hear from you! Whether you have a question about our templates, need support, or want to provide feedback, please don't hesitate to reach out.</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">support@legaldocs.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Response Time</h3>
                  <p className="text-gray-600">We typically respond within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">Subject</label>
                <select id="subject" name="subject" required className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="legal">Legal Question</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows={4} required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"></textarea>
              </div>
              <button type="submit" className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 rounded-xl border border-yellow-200 bg-yellow-50 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">⚠ Important Notice</h2>
          <p className="text-gray-700">LegalDocs is not a law firm and does not provide legal advice. Please do not send confidential or time-sensitive information through this contact form. For legal advice, please consult with a licensed attorney in your jurisdiction.</p>
        </div>
      </div>
    </div>
  );
}
