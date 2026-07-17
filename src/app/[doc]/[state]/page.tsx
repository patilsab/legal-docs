import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { US_STATES, getStateBySlug, getStateName, getStateLegalNotes } from '@/lib/state-engine';

const DOCUMENT_TYPES = [
  { slug: 'eviction-notice', title: 'Eviction Notice', category: 'Landlord-Tenant' },
  { slug: 'lease-agreement', title: 'Lease Agreement', category: 'Landlord-Tenant' },
  { slug: 'power-of-attorney', title: 'Power of Attorney', category: 'Estate Planning' },
  { slug: 'divorce-papers', title: 'Divorce Papers', category: 'Family Law' },
  { slug: 'last-will', title: 'Last Will & Testament', category: 'Estate Planning' },
  { slug: 'bill-of-sale', title: 'Bill of Sale', category: 'General' },
  { slug: 'promissory-note', title: 'Promissory Note', category: 'Financial' },
  { slug: 'nda', title: 'Non-Disclosure Agreement', category: 'Business' },
  { slug: 'rental-application', title: 'Rental Application', category: 'Landlord-Tenant' },
  { slug: 'living-will', title: 'Living Will', category: 'Healthcare' },
  { slug: 'child-custody', title: 'Child Custody Agreement', category: 'Family Law' },
  { slug: 'separation-agreement', title: 'Separation Agreement', category: 'Family Law' },
  { slug: 'purchase-agreement', title: 'Purchase Agreement', category: 'Real Estate' },
  { slug: 'affidavit', title: 'Affidavit', category: 'General' },
  { slug: 'cease-desist', title: 'Cease & Desist', category: 'General' },
  { slug: 'medical-authorization', title: 'Medical Authorization', category: 'Healthcare' },
  { slug: 'residential-lease', title: 'Residential Lease Agreement', category: 'Landlord-Tenant' },
  { slug: 'quitclaim-deed', title: 'Quitclaim Deed', category: 'Real Estate' },
  { slug: 'loan-agreement', title: 'Loan Agreement', category: 'Financial' },
  { slug: 'business-plan', title: 'Business Plan Template', category: 'Business' },
  { slug: 'llc-operating-agreement', title: 'LLC Operating Agreement', category: 'Business' },
  { slug: 'employment-contract', title: 'Employment Contract', category: 'Employment' },
  { slug: 'revocable-living-trust', title: 'Revocable Living Trust', category: 'Estate Planning' },
  { slug: 'commercial-lease', title: 'Commercial Lease Agreement', category: 'Real Estate' },
  { slug: 'prenuptial-agreement', title: 'Prenuptial Agreement', category: 'Family Law' },
  { slug: 'pour-over-will', title: 'Pour-Over Will', category: 'Estate Planning' },
  { slug: 'durable-power-of-attorney', title: 'Durable Power of Attorney', category: 'Estate Planning' },
  { slug: 'medical-power-of-attorney', title: 'Medical Power of Attorney', category: 'Healthcare' },
  { slug: 'advance-healthcare-directive', title: 'Advance Healthcare Directive', category: 'Healthcare' },
  { slug: 'irrevocable-trust', title: 'Irrevocable Trust', category: 'Estate Planning' },
  { slug: 'warranty-deed', title: 'Warranty Deed', category: 'Real Estate' },
  { slug: 'contract-for-deed', title: 'Contract for Deed', category: 'Real Estate' },
  { slug: 'easement-agreement', title: 'Easement Agreement', category: 'Real Estate' },
  { slug: 'complaint', title: 'Complaint (Civil)', category: 'Litigation' },
  { slug: 'answer', title: 'Answer (Civil)', category: 'Litigation' },
  { slug: 'discovery', title: 'Discovery Request', category: 'Litigation' },
  { slug: 'summary-judgment', title: 'Motion for Summary Judgment', category: 'Litigation' },
];

function getAllStates() {
  return US_STATES.map(s => ({ name: s.name, abbr: s.abbr, slug: s.name.toLowerCase().replace(/\s+/g, '-') }));
}

function parseMarkdownSections(rawMarkdown: string): { h: string; c: string }[] {
  const sections: { h: string; c: string }[] = [];
  const lines = rawMarkdown.split('\n');
  let currentHeading = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^\*\*(.+?)\*\*\s*$/);
    if (headingMatch) {
      if (currentHeading) {
        sections.push({ h: currentHeading, c: currentContent.join('\n').trim() });
      }
      currentHeading = headingMatch[1];
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }
  if (currentHeading) {
    sections.push({ h: currentHeading, c: currentContent.join('\n').trim() });
  }
  return sections;
}

function loadAIContent(docSlug: string, stateSlug: string): string | null {
  try {
    const filePath = path.join(process.cwd(), 'public', 'content', `${docSlug}.json`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data: Record<string, any> = JSON.parse(raw);
    const stateData = data[stateSlug];
    if (!stateData) return null;
    if (typeof stateData === 'string') return stateData;
    if (stateData.rawMarkdown) return stateData.rawMarkdown;
    return null;
  } catch {
    return null;
  }
}

function getContent(docSlug: string, sn: string, sa: string) {
  const doc = DOCUMENT_TYPES.find(d => d.slug === docSlug);
  const title = doc?.title || docSlug;
  const notes = getStateLegalNotes(docSlug, sa as any);
  const S = sn;
  const stateSlug = S.toLowerCase().replace(/\s+/g, '-');

  // Try AI-generated content first
  const aiMarkdown = loadAIContent(docSlug, stateSlug);
  if (aiMarkdown) {
    const aiSections = parseMarkdownSections(aiMarkdown);
    const intro = aiSections.length > 0 ? aiSections[0].c : '';
    const contentSections = aiSections.length > 1 ? aiSections.slice(1).filter(s => s.c.length > 10) : aiSections;
    return {
      title: `${S} ${title} - Free Legal Template`,
      desc: `Free ${S} ${title.toLowerCase()} template with state-specific legal requirements for ${S} law.`,
      intro,
      sections: contentSections,
      isAIContent: true,
      notes,
      steps: [
        `Determine the type of ${title.toLowerCase()} needed for your situation`,
        `Research ${S} state requirements for this type of document`,
        'Gather all necessary information and documentation',
        'Draft the document using a template or attorney assistance',
        'Review the document for accuracy and completeness',
        'Have the document reviewed by a qualified attorney',
        'Execute the document with proper formalities (notarization, witnesses)',
        'Provide copies to all parties involved',
        'Store the original document in a safe location',
        'Keep records of all related communications and transactions',
      ],
      requirements: [
        'Full legal names and addresses of all parties',
        'Clear description of the subject matter',
        'Complete terms and conditions',
        'Signatures of all parties',
        `Compliance with ${S} state statutes`,
        'Notarization (if required)',
        'Witness signatures (if required)',
        'Required statutory disclosures',
      ],
      tips: [
        `Always use ${S}-specific templates or attorney-drafted documents`,
        'Use clear, specific language throughout the document',
        'Include all required legal disclosures and notices',
        'Have the document reviewed before signing',
        'Keep copies of all executed documents',
        `Consult with a ${S} attorney for complex situations`,
      ],
      faqs: [
        { q: `Is a ${title.toLowerCase()} legally binding in ${S}?`, a: `Yes, a properly drafted and executed ${title.toLowerCase()} is legally binding in ${S}, provided it meets all legal requirements under ${S} law.` },
        { q: `Do I need a lawyer for a ${title.toLowerCase()} in ${S}?`, a: `While not required, it is highly recommended to consult with a qualified ${S} attorney.` },
      ],
    };
  }

  return {
    title: `${S} ${title} - Free Legal Template`,
    desc: `Free ${S} ${title.toLowerCase()} template with state-specific legal requirements for ${S} law.`,
    intro: `A ${title.toLowerCase()} in ${S} is a legally binding document that establishes the rights and obligations of all parties involved under ${S} state law. This comprehensive guide covers everything you need to know about creating, executing, and enforcing a ${title.toLowerCase()} in ${S}, including the specific legal requirements, mandatory disclosures, and best practices that apply to this type of legal document within the state. Understanding the legal framework that governs ${title.toLowerCase()} documents in ${S} is essential for protecting your interests and ensuring that the document is enforceable in ${S} courts. ${S} has specific statutes and regulations that apply to this type of legal document, and failure to comply with these requirements can result in the document being deemed unenforceable or void. This guide provides detailed information about the legal requirements, key components, and practical considerations for creating a ${title.toLowerCase()} in ${S}.`,
    sections: [
      { h: `Understanding ${title} Documents in ${S}`, c: `A ${title.toLowerCase()} is a formal legal document that serves as evidence of an agreement or declaration between parties. In ${S}, this type of document is governed by state-specific statutes that outline the requirements for validity, execution, and enforcement. The primary purpose of a ${title.toLowerCase()} is to clearly document the terms and conditions agreed upon by the parties, establish the legal rights and obligations of each party, provide a framework for resolving disputes, and create a legally enforceable record of the agreement. ${S} law requires that certain elements be present in a valid ${title.toLowerCase()}, and the document must be executed in accordance with state requirements. The specific requirements vary depending on the type of document and the subject matter, but generally include proper identification of the parties, a clear description of the subject matter, the terms and conditions of the agreement, and the signatures of all parties. In ${S}, it is important to ensure that the ${title.toLowerCase()} complies with all applicable state statutes and local ordinances.` },
      { h: `Key Components of a ${S} ${title}`, c: `Every valid ${title.toLowerCase()} in ${S} should include the following essential components:\n\n**Identification of Parties** - The document must clearly identify all parties involved, including full legal names, addresses, and any relevant identification numbers. This ensures that all parties are properly identified and can be held accountable under the agreement.\n\n**Purpose and Subject Matter** - The document should clearly describe the purpose of the agreement and the subject matter involved. This includes a detailed description of the rights, obligations, and responsibilities of each party.\n\n**Terms and Conditions** - The document must include all terms and conditions agreed upon by the parties. This includes payment terms, timelines, performance requirements, and any other obligations.\n\n**Legal Disclosures** - ${S} requires certain disclosures to be included in legal documents. These may include statutory notices, warnings, and other required information.\n\n**Signatures and Execution** - The document must be signed by all parties in accordance with ${S} requirements. This may include notarization, witness signatures, or other execution formalities.\n\n**Governing Law** - The document should specify that ${S} law governs the agreement and identify the jurisdiction for any disputes.` },
      { h: `Legal Requirements Under ${S} Law`, c: `${S} has specific legal requirements that must be met for a ${title.toLowerCase()} to be valid and enforceable:\n\n**Statutory Compliance** - The document must comply with all applicable ${S} statutes. This includes meeting the specific requirements for the type of document, as well as general requirements for legal documents.\n\n**Capacity** - All parties must have the legal capacity to enter into the agreement. This means they must be of legal age, mentally competent, and not under duress or undue influence.\n\n**Consideration** - Most agreements in ${S} require consideration, which means something of value must be exchanged between the parties. This can be money, services, promises, or other forms of value.\n\n**Voluntary Consent** - All parties must enter into the agreement voluntarily. Consent obtained through fraud, coercion, or misrepresentation may invalidate the document.\n\n**Legal Purpose** - The purpose of the agreement must be legal and not against public policy. Agreements that involve illegal activities or violate public policy are void and unenforceable.\n\n**Execution Requirements** - ${S} may require specific execution formalities, such as notarization, witness signatures, or filing with a government office.` },
      { h: `Common Mistakes to Avoid in ${S}`, c: `When creating a ${title.toLowerCase()} in ${S}, avoid these common mistakes:\n\n**Using Generic Templates** - While templates provide a starting point, they may not comply with ${S}-specific requirements. Always customize the document to meet ${S} law.\n\n**Vague Language** - Ambiguous or vague language can lead to disputes and may make the document unenforceable. Use clear, specific language that leaves no room for interpretation.\n\n**Missing Essential Provisions** - Failing to include essential provisions, such as dispute resolution clauses or governing law provisions, can leave important issues unaddressed.\n\n**Improper Execution** - Failing to follow proper execution procedures, such as notarization or witness requirements, can invalidate the document.\n\n**Not Keeping Records** - Failing to maintain copies of all executed documents and related communications can make it difficult to enforce the agreement.\n\n**Ignoring State-Specific Requirements** - ${S} has unique requirements for this type of document. Ignoring these requirements can result in the document being unenforceable.` },
      { h: `Enforcement and Dispute Resolution in ${S}`, c: `Understanding how to enforce a ${title.toLowerCase()} in ${S} and resolve disputes is essential:\n\n**Mediation** - Many disputes can be resolved through mediation, which is a voluntary process where a neutral third party helps the parties reach a mutually acceptable resolution. Mediation is often faster and less expensive than litigation.\n\n**Arbitration** - Some agreements include arbitration clauses that require disputes to be resolved through binding arbitration rather than court litigation. Arbitration can be faster and more private than court proceedings.\n\n**Litigation** - If mediation and arbitration are unsuccessful, parties may need to pursue litigation in ${S} courts. The statute of limitations for filing a lawsuit varies depending on the type of claim.\n\n**Enforcement** - A valid ${title.toLowerCase()} can be enforced through ${S} courts. The court may order specific performance, damages, or other remedies depending on the nature of the breach.\n\n**Attorney's Fees** - Some agreements include provisions for attorney's fees, which may allow the prevailing party to recover their legal costs.` },
      { h: `When to Consult a ${S} Attorney`, c: `While this guide provides general information about ${title.toLowerCase()} documents in ${S}, consulting with a qualified attorney is recommended in the following situations:\n\n**Complex Transactions** - For complex transactions or significant financial commitments, an attorney can help ensure that the document protects your interests.\n\n**Disputed Terms** - If the parties cannot agree on certain terms, an attorney can help negotiate and draft provisions that address both parties' concerns.\n\n**State-Specific Requirements** - An attorney familiar with ${S} law can ensure compliance with all state-specific requirements.\n\n**Enforcement Concerns** - If you have concerns about enforceability, an attorney can review the document and suggest improvements.\n\n**Changes in Circumstances** - If your circumstances change after the document is executed, an attorney can advise on your options for modification or termination.` },
      { h: `Step-by-Step Guide to Creating a ${title} in ${S}`, c: `Creating a ${title.toLowerCase()} in ${S} requires careful attention to detail. Follow this comprehensive guide:\n\n**Step 1: Determine Your Needs** - Before drafting, assess your specific situation. Identify the parties involved, the subject matter, and the terms you want to include. Consider consulting with an attorney to ensure you are pursuing the right type of document for your needs.\n\n**Step 2: Research Requirements** - Every state has unique requirements for legal documents. Research the specific statutes and regulations that govern this type of document in ${S}. Pay attention to mandatory provisions and execution formalities.\n\n**Step 3: Gather Documentation** - Collect all necessary documentation, including identification documents, financial records, and any existing agreements. Having all information organized will make the drafting process smoother.\n\n**Step 4: Draft the Document** - Use a ${S}-specific template as a starting point, but customize it to reflect your particular circumstances. Ensure all blank fields are completed accurately and that the language is clear and unambiguous.\n\n**Step 5: Review for Compliance** - Carefully review the document to ensure it complies with all ${S} legal requirements. Check for mandatory provisions and proper formatting.\n\n**Step 6: Legal Review** - Have the document reviewed by a qualified ${S} attorney. An attorney can identify potential issues and ensure the document meets all legal requirements.\n\n**Step 7: Execution** - Execute the document in accordance with ${S} requirements. This may include signing in the presence of witnesses, having the document notarized, or filing with a government office.\n\n**Step 8: Distribution** - Provide copies of the executed document to all parties involved. Ensure each party understands their rights and obligations under the document.\n\n**Step 9: Storage** - Store the original document in a safe, secure location. Consider storing copies in multiple locations, including with your attorney and in a fireproof safe.\n\n**Step 10: Periodic Review** - Review the document periodically to ensure it still reflects your wishes and complies with current ${S} law. Update the document as circumstances change.` },
      { h: `Cost Considerations`, c: `Understanding the costs associated with creating this document in ${S} is important for budgeting:\n\n**Template Costs** - Many websites offer free or low-cost templates. While templates can be a cost-effective starting point, they may not comply with ${S}-specific requirements. Template costs typically range from free to $100.\n\n**Attorney Fees** - The cost of hiring an attorney varies depending on complexity. In ${S}, attorney fees typically range from $200 to $1,000 or more. Complex documents may cost more.\n\n**Notarization Costs** - If the document requires notarization, notary fees in ${S} typically range from $5 to $15 per signature.\n\n**Filing Fees** - Certain documents may require filing with a government office. Filing fees vary by document type and jurisdiction in ${S}.\n\n**Recording Fees** - If the document involves real estate, recording fees may apply. These fees vary by county in ${S}.\n\n**Cost vs. Value** - While it may be tempting to use the cheapest option, the cost of a poorly drafted document can far exceed the cost of proper legal representation.` },
      { h: `Important Statutes and Regulations`, c: `The following ${S} statutes and regulations may affect your document:\n\n**State Statutes** - ${S} has enacted specific statutes governing this type of document. These statutes outline the requirements for validity, execution, and enforcement. Failure to comply may result in the document being deemed unenforceable.\n\n**Court Decisions** - ${S} courts have interpreted these statutes through case law. Understanding relevant court decisions can help you draft a more effective document.\n\n**Administrative Regulations** - ${S} agencies may have adopted regulations that affect this type of document. These regulations may impose additional requirements.\n\n**Local Ordinances** - In addition to state law, local jurisdictions in ${S} may have ordinances that affect your document. Check with your local government for any applicable ordinances.\n\n**Federal Law** - Certain federal laws may also affect your document, particularly if it involves interstate commerce or federal agencies.\n\n**Updates and Changes** - ${S} law is subject to change. Stay informed about any updates to relevant statutes, regulations, and case law.` },
      { h: `Resources and Further Reading`, c: `For more information about this type of document in ${S}, consider the following resources:\n\n**${S} State Legislature** - The official website provides access to current statutes and proposed legislation. This is an authoritative source for ${S} law.\n\n**${S} Courts** - The court system website provides information about court procedures, forms, and legal resources.\n\n**Local Bar Association** - Your local bar association can provide referrals to qualified attorneys who specialize in this area of law.\n\n**Legal Aid Organizations** - If you cannot afford an attorney, ${S} legal aid organizations may provide free or low-cost legal assistance.\n\n**Law Libraries** - Public law libraries in ${S} offer access to legal resources and research assistance.\n\n**Online Legal Resources** - Websites such as Nolo and LegalZoom provide general legal information. However, these resources may not comply with ${S}-specific requirements.\n\n**${S} Attorney General** - The Attorney General office may provide consumer protection information and resources related to legal documents.` },
    ],
    faqs: [
      { q: `Is a ${title.toLowerCase()} legally binding in ${S}?`, a: `Yes, a properly drafted and executed ${title.toLowerCase()} is legally binding in ${S}, provided it meets all legal requirements under ${S} law. The document must be signed by all parties, contain lawful terms, and comply with applicable state statutes.` },
      { q: `Do I need a lawyer for a ${title.toLowerCase()} in ${S}?`, a: `While not required, it is highly recommended to consult with a qualified ${S} attorney. An attorney can ensure compliance with state-specific requirements and protect your interests.` },
      { q: `How long does a ${title.toLowerCase()} remain valid in ${S}?`, a: `The validity period depends on the type of document and its terms. Some documents have specific expiration dates, while others remain valid until terminated or modified by the parties.` },
      { q: `Can a ${title.toLowerCase()} be modified in ${S}?`, a: `Yes, most ${title.toLowerCase()} documents can be modified if all parties agree to the changes. Modifications should be documented in writing and executed with the same formalities as the original document.` },
    ],
    notes,
    steps: [
      `Determine the type of ${title.toLowerCase()} needed for your situation`,
      `Research ${S} state requirements for this type of document`,
      'Gather all necessary information and documentation',
      'Draft the document using a template or attorney assistance',
      'Review the document for accuracy and completeness',
      'Have the document reviewed by a qualified attorney',
      'Execute the document with proper formalities (notarization, witnesses)',
      'Provide copies to all parties involved',
      'Store the original document in a safe location',
      'Keep records of all related communications and transactions',
    ],
    requirements: [
      'Full legal names and addresses of all parties',
      'Clear description of the subject matter',
      'Complete terms and conditions',
      'Signatures of all parties',
      `Compliance with ${S} state statutes`,
      'Notarization (if required)',
      'Witness signatures (if required)',
      'Required statutory disclosures',
    ],
    tips: [
      `Always use ${S}-specific templates or attorney-drafted documents`,
      'Use clear, specific language throughout the document',
      'Include all required legal disclosures and notices',
      'Have the document reviewed before signing',
      'Keep copies of all executed documents',
      `Consult with a ${S} attorney for complex situations`,
      'Review and update documents periodically',
      'Document all communications related to the agreement',
    ],
  };
}

export async function generateStaticParams() {
  const params: { doc: string; state: string }[] = [];
  for (const doc of DOCUMENT_TYPES) {
    for (const state of US_STATES) {
      if (state.abbr === 'DC') continue;
      params.push({ doc: doc.slug, state: state.name.toLowerCase().replace(/\s+/g, '-') });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string; state: string }> }) {
  const { doc: docSlug, state: stateSlug } = await params;
  const sa = getStateBySlug(stateSlug);
  if (!sa) return { title: 'Not Found' };
  const sn = getStateName(sa);
  const c = getContent(docSlug, sn, sa);
  return { title: c.title, description: c.desc, keywords: `${sn} ${c.title}, free legal forms, legal document template` };
}

export default async function DocStatePage({ params }: { params: Promise<{ doc: string; state: string }> }) {
  const { doc: docSlug, state: stateSlug } = await params;
  const sa = getStateBySlug(stateSlug);
  if (!sa) notFound();
  const sn = getStateName(sa);
  const doc = DOCUMENT_TYPES.find(d => d.slug === docSlug);
  if (!doc) notFound();
  const c = getContent(docSlug, sn, sa);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/state/${stateSlug}`} className="hover:text-primary-600">{sn}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{doc.title}</span>
          </nav>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm text-white mb-4">{doc.category}</span>
          <h1 className="text-3xl font-bold text-white md:text-4xl">{c.title}</h1>
          <p className="mt-4 text-lg text-blue-100">{c.desc}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="rounded-lg bg-white/20 px-4 py-2 text-sm text-white">✅ {sn} Specific</span>
            <span className="rounded-lg bg-white/20 px-4 py-2 text-sm text-white">✅ Free to Use</span>
            <span className="rounded-lg bg-white/20 px-4 py-2 text-sm text-white">✅ PDF Download</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          <strong>⚠ Legal Disclaimer:</strong> This template is for informational purposes only and does not constitute legal advice. Consult a licensed attorney in {sn} before use.
        </div>
        <section className="mb-12"><p className="text-lg leading-relaxed text-gray-700">{c.intro}</p></section>
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">How to Create a {doc.title} in {sn}</h2>
          <ol className="space-y-3">{c.steps.map((s, i) => (<li key={i} className="flex items-start gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{i + 1}</span><span className="text-gray-700">{s}</span></li>))}</ol>
        </section>
        {c.sections.map((s, i) => (
          <section key={i} className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">{s.h}</h2>
            <div className="prose prose-gray max-w-none">{s.c.split('\n\n').filter((p: string) => p.trim()).map((p: string, j: number) => (<p key={j} className="mb-4 leading-relaxed text-gray-700">{p.split('\n').map((line: string, l: number) => (<span key={l}>{line.split('**').map((part: string, k: number) => k % 2 === 1 ? <strong key={k} className="font-semibold text-gray-900">{part}</strong> : part)}{l < p.split('\n').length - 1 && <br />}</span>))}</p>))}</div>
          </section>
        ))}
        <section className="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Requirements in {sn}</h2>
          <ul className="space-y-2">{c.requirements.map((r, i) => (<li key={i} className="flex items-start gap-2"><span className="mt-1 text-green-500">✓</span><span className="text-gray-700">{r}</span></li>))}</ul>
        </section>
        <section className="mb-10 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{sn}-Specific Legal Notes</h2>
          <ul className="space-y-3">{c.notes.map((n, i) => (<li key={i} className="flex items-start gap-2"><span className="mt-1 text-blue-600">●</span><span className="text-gray-700">{n}</span></li>))}</ul>
        </section>
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Tips for {sn} {doc.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">{c.tips.map((t, i) => (<div key={i} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"><div className="flex items-start gap-2"><span className="text-lg">💡</span><span className="text-gray-700">{t}</span></div></div>))}</div>
        </section>
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">{c.faqs.map((f, i) => (<details key={i} className="rounded-lg border border-gray-200 bg-white shadow-sm group"><summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:text-blue-600">{f.q}</summary><div className="border-t px-4 py-3 text-gray-700">{f.a}</div></details>))}</div>
        </section>
        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Ready to Create Your {doc.title}?</h2>
          <p className="mt-2 text-blue-100">Use our interactive form to create a customized {doc.title.toLowerCase()} for {sn}.</p>
          <Link href={`/${docSlug}/${stateSlug}/form`} className="mt-4 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50">Build Your {doc.title} →</Link>
        </div>
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Browse {doc.title} by State</h2>
          <div className="flex flex-wrap gap-2">{getAllStates().slice(0, 12).map(st => (<Link key={st.abbr} href={`/${docSlug}/${st.slug}`} className={`rounded-lg border px-3 py-1.5 text-sm transition ${st.abbr === sa ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'}`}>{st.name}</Link>))}<span className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-500">+ {getAllStates().length - 12} more</span></div>
        </section>
      </div>
    </div>
  );
}
