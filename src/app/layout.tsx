import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LegalDocs - Free Legal Document Templates for All 50 US States",
  description:
    "Download free, state-specific legal document templates. Eviction notices, lease agreements, power of attorney, divorce papers, and more. Fill out online, download as PDF.",
  keywords: [
    "legal documents",
    "legal templates",
    "eviction notice",
    "lease agreement",
    "power of attorney",
    "divorce papers",
    "last will",
    "bill of sale",
    "promissory note",
    "NDA",
    "free legal forms",
    "US legal documents",
  ],
  openGraph: {
    title: "LegalDocs - Free Legal Document Templates",
    description:
      "Download free, state-specific legal document templates for all 50 US states.",
    url: "https://legaldocs.com",
    siteName: "LegalDocs",
    locale: "en_US",
    type: "website",
  },
};

const navItems = [
  { href: "/eviction-notice", label: "Eviction Notice" },
  { href: "/lease-agreement", label: "Lease Agreement" },
  { href: "/divorce-papers", label: "Divorce Papers" },
  { href: "/last-will", label: "Last Will" },
  { href: "/power-of-attorney", label: "Power of Attorney" },
  { href: "/promissory-note", label: "Promissory Note" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <a href="/" className="text-2xl font-bold text-primary-700">
              LegalDocs
            </a>
            <nav className="hidden gap-4 md:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-sm text-gray-600 hover:text-primary-600">
                  {item.label}
                </a>
              ))}
              <a href="/" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                All Types →
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t bg-gray-50 py-8">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">LegalDocs</h3>
                <p className="text-sm text-gray-600">Free legal document templates for all 50 US states. Fill out online, download as PDF.</p>
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Documents</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/eviction-notice" className="hover:text-primary-600">Eviction Notice</a></li>
                  <li><a href="/lease-agreement" className="hover:text-primary-600">Lease Agreement</a></li>
                  <li><a href="/power-of-attorney" className="hover:text-primary-600">Power of Attorney</a></li>
                  <li><a href="/last-will" className="hover:text-primary-600">Last Will</a></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Company</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/about-us" className="hover:text-primary-600">About Us</a></li>
                  <li><a href="/contact-us" className="hover:text-primary-600">Contact Us</a></li>
                  <li><a href="/terms-and-conditions" className="hover:text-primary-600">Terms & Conditions</a></li>
                  <li><a href="/privacy-policy" className="hover:text-primary-600">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Legal</h3>
                <p className="text-sm text-gray-600"><strong>Disclaimer:</strong> These templates are for informational purposes only and do not constitute legal advice.</p>
              </div>
            </div>
            <div className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
              <p>© 2024 LegalDocs. Free legal document templates for all 50 US states.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
