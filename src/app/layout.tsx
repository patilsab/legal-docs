import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "LegalDocs - Free Legal Document Templates for All 50 US States",
  description: "Download free, state-specific legal document templates. Eviction notices, lease agreements, power of attorney, divorce papers, and more. Fill out online, download as PDF.",
  keywords: ["legal documents", "legal templates", "eviction notice", "lease agreement", "power of attorney", "divorce papers", "last will", "bill of sale", "promissory note", "NDA", "free legal forms", "US legal documents"],
  openGraph: { title: "LegalDocs - Free Legal Document Templates", description: "Download free, state-specific legal document templates for all 50 US states.", url: "https://legal-docs-patilsabs-projects.vercel.app", siteName: "LegalDocs", locale: "en_US", type: "website" },
};

const navItems = [
  { href: "/eviction-notice", label: "Eviction Notice" },
  { href: "/lease-agreement", label: "Lease Agreement" },
  { href: "/divorce-papers", label: "Divorce Papers" },
  { href: "/last-will", label: "Last Will" },
  { href: "/power-of-attorney", label: "Power of Attorney" },
  { href: "/promissory-note", label: "Promissory Note" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm">LD</div>
              <span className="text-xl font-bold text-gray-900">Legal<span className="text-blue-600">Docs</span></span>
            </a>
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">{item.label}</a>
              ))}
              <a href="/" className="ml-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">All Types →</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-xs">LD</div>
                  <span className="text-lg font-bold text-gray-900">Legal<span className="text-blue-600">Docs</span></span>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">Free legal document templates for all 50 US states. Fill out online, download as PDF.</p>
                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">50 States</span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Free</span>
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Documents</h4>
                <ul className="space-y-2.5 text-sm text-gray-600">
                  <li><a href="/eviction-notice" className="transition hover:text-blue-600">Eviction Notice</a></li>
                  <li><a href="/lease-agreement" className="transition hover:text-blue-600">Lease Agreement</a></li>
                  <li><a href="/power-of-attorney" className="transition hover:text-blue-600">Power of Attorney</a></li>
                  <li><a href="/last-will" className="transition hover:text-blue-600">Last Will</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Company</h4>
                <ul className="space-y-2.5 text-sm text-gray-600">
                  <li><a href="/about-us" className="transition hover:text-blue-600">About Us</a></li>
                  <li><a href="/contact-us" className="transition hover:text-blue-600">Contact Us</a></li>
                  <li><a href="/terms-and-conditions" className="transition hover:text-blue-600">Terms and Conditions</a></li>
                  <li><a href="/privacy-policy" className="transition hover:text-blue-600">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Legal</h4>
                <p className="text-sm leading-relaxed text-gray-600">Templates are for informational purposes only and do not constitute legal advice.</p>
                <a href="/contact-us" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-700">Get in touch →</a>
              </div>
            </div>
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
              <p className="text-sm text-gray-500">© 2024 LegalDocs. All rights reserved.</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <a href="/terms-and-conditions" className="transition hover:text-gray-900">Terms</a>
                <a href="/privacy-policy" className="transition hover:text-gray-900">Privacy</a>
                <a href="/about-us" className="transition hover:text-gray-900">About</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
