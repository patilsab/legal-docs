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
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
            <p>© 2024 LegalDocs. Free legal document templates for all 50 US states.</p>
            <p className="mt-2">
              <strong>Disclaimer:</strong> These templates are for informational purposes only and do not constitute legal advice.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
