// Fixed: multiline strings use template literals
"use client";

import { generatePdf } from "@/lib/pdf-builder";
import { useState } from "react";
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine";

type FormData = {
  courtName: string;
  courtCounty: string;
  courtState: StateAbbr;
  caseNumber: string;
  plaintiffName: string;
  plaintiffAddress: string;
  plaintiffAttorney: string;
  defendantName: string;
  defendantAddress: string;
  defendantAttorney: string;
  jurisdiction: string;
  venue: string;
  causesOfAction: string;
  facts: string;
  damages: string;
  juryDemand: string;
  verification: string;
};

const faqs = [
  {
    q: "What is a Civil Complaint?",
    a: "A Complaint is the initial pleading filed by a plaintiff to start a civil lawsuit. It sets forth the court's jurisdiction, venue, the parties, factual allegations, legal claims (causes of action), and the relief sought (damages, injunction, etc.)."
  },
  {
    q: "What must be included in a Complaint?",
    a: "Under FRCP Rule 8 (and state equivalents): (1) Short statement of jurisdiction, (2) Short statement of claim showing entitlement to relief, (3) Demand for judgment. Also: parties' names/addresses, factual allegations numbered, each cause of action separately stated, prayer for relief."
  },
  {
    q: "What is 'Notice Pleading' vs 'Fact Pleading'?",
    a: "Federal courts and most states use 'notice pleading' - only need enough facts to give defendant fair notice of the claim. Some states (NY, CA for certain claims) require 'fact pleading' - more detailed factual allegations. Know your jurisdiction's standard."
  },
  {
    q: "How many causes of action should I include?",
    a: "Include every viable legal theory supported by the facts. Common: breach of contract, negligence, fraud, statutory violations, unjust enrichment, quantum meruit. Plead in the alternative (e.g., 'breach of contract OR quantum meruit'). Courts allow alternative pleading."
  },
  {
    q: "What is a verification?",
    a: "A sworn statement (under penalty of perjury) by the plaintiff that the factual allegations are true to their knowledge. Required in some states (CA, NY) for certain case types (e.g., family law, collection cases). Federal courts generally don't require verification."
  },
  {
    q: "What happens after filing a Complaint?",
    a: "Plaintiff must serve defendant with summons and complaint within the time limit (90 days federal, varies by state). Defendant must respond (answer or motion to dismiss) within 21 days (federal) or state deadline. Case then proceeds to scheduling conference, discovery, etc."
  },
];

export default function ComplaintPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    courtName: "",
    courtCounty: "",
    courtState: "CA",
    caseNumber: "",
    plaintiffName: "",
    plaintiffAddress: "",
    plaintiffAttorney: "",
    defendantName: "",
    defendantAddress: "",
    defendantAttorney: "",
    jurisdiction: "Diversity jurisdiction under 28 U.S.C. § 1332 / Federal question under 28 U.S.C. § 1331",
    venue: "Venue is proper under 28 U.S.C. § 1391 because defendant resides in this district / substantial events occurred here",
    causesOfAction: `1. Breach of Contract
2. Negligence
3. Fraud / Misrepresentation
4. Unjust Enrichment
5. Quantum Meruit`,
    facts: `1. Plaintiff and Defendant entered into a written agreement on [date]...
2. Plaintiff performed all obligations under the agreement...
3. Defendant failed to perform [specific breach]...
4. As a result, Plaintiff suffered damages...`,
    damages: "Compensatory damages in an amount to be proven at trial, but not less than $75,000; consequential damages; attorney fees and costs; pre- and post-judgment interest; such other relief as the Court deems just.",
    juryDemand: "Plaintiff demands a trial by jury on all issues so triable.",
    verification: "I, [Plaintiff Name], declare under penalty of perjury that the foregoing is true and correct to the best of my knowledge.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "courtState") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${getStateName(selectedState)} Civil Complaint`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Caption", fields: [
          { label: "Court", value: formData.courtName },
          { label: "County", value: formData.courtCounty },
          { label: "State", value: getStateName(formData.courtState) },
          { label: "Case Number", value: formData.caseNumber || "[To be assigned]" },
        ]},
        { heading: "Parties", fields: [
          { label: "Plaintiff", value: formData.plaintiffName },
          { label: "Plaintiff Address", value: formData.plaintiffAddress },
          { label: "Plaintiff Attorney", value: formData.plaintiffAttorney },
          { label: "Defendant", value: formData.defendantName },
          { label: "Defendant Address", value: formData.defendantAddress },
          { label: "Defendant Attorney", value: formData.defendantAttorney },
        ]},
        { heading: "Jurisdiction & Venue", fields: [
          { label: "Jurisdiction", value: formData.jurisdiction },
          { label: "Venue", value: formData.venue },
        ]},
        { heading: "Causes of Action", fields: [
          { label: "Claims", value: formData.causesOfAction },
        ]},
        { heading: "Factual Allegations", fields: [
          { label: "Facts", value: formData.facts },
        ]},
        { heading: "Damages & Relief", fields: [
          { label: "Damages Sought", value: formData.damages },
          { label: "Jury Demand", value: formData.juryDemand },
        ]},
        { heading: "Verification", fields: [
          { label: "Verification", value: formData.verification },
        ]},
      ],
      fileName: "civil-complaint.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/complaint" className="hover:text-primary-600">Civil Complaint</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Civil Complaint
      </h1>
      <p className="mt-2 text-gray-600">
        Create a civil complaint to initiate a lawsuit in {getStateName(selectedState)}. Includes jurisdiction, claims, facts, and damages.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This complaint template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Pleading standards vary by jurisdiction and case type. Improper pleading can result in dismissal.
        You must consult with a licensed attorney in your jurisdiction before filing.
        LegalDocs is not a law firm and does not provide legal representation.
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">Select Your State</label>
        <select
          value={selectedState}
          onChange={handleChange}
          name="courtState"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
        >
          {US_STATES.map((state) => (
            <option key={state.abbr} value={state.abbr}>
              {state.name} ({state.abbr})
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">1. Court & Case Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="courtName" className="block text-sm font-medium text-gray-700">Court Name</label>
              <input id="courtName" name="courtName" type="text" value={formData.courtName} onChange={handleChange} placeholder="e.g., Superior Court of California / U.S. District Court for the Northern District of California" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="courtCounty" className="block text-sm font-medium text-gray-700">County</label>
              <input id="courtCounty" name="courtCounty" type="text" value={formData.courtCounty} onChange={handleChange} placeholder="e.g., San Francisco" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="caseNumber" className="block text-sm font-medium text-gray-700">Case Number</label>
              <input id="caseNumber" name="caseNumber" type="text" value={formData.caseNumber} onChange={handleChange} placeholder="e.g., 24-CV-01234 (leave blank if not yet assigned)" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Parties</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="plaintiffName" className="block text-sm font-medium text-gray-700">Plaintiff Name</label>
              <input id="plaintiffName" name="plaintiffName" type="text" value={formData.plaintiffName} onChange={handleChange} placeholder="e.g., Jane Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="plaintiffAddress" className="block text-sm font-medium text-gray-700">Plaintiff Address</label>
              <input id="plaintiffAddress" name="plaintiffAddress" type="text" value={formData.plaintiffAddress} onChange={handleChange} placeholder="e.g., 123 Main St, San Francisco, CA 94102" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="plaintiffAttorney" className="block text-sm font-medium text-gray-700">Plaintiff Attorney (Name, Bar #, Firm, Contact)</label>
              <input id="plaintiffAttorney" name="plaintiffAttorney" type="text" value={formData.plaintiffAttorney} onChange={handleChange} placeholder="e.g., John Smith, Bar #123456, Smith & Associates, (415) 555-0123" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="defendantName" className="block text-sm font-medium text-gray-700">Defendant Name</label>
              <input id="defendantName" name="defendantName" type="text" value={formData.defendantName} onChange={handleChange} placeholder="e.g., Acme Corporation" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="defendantAddress" className="block text-sm font-medium text-gray-700">Defendant Address</label>
              <input id="defendantAddress" name="defendantAddress" type="text" value={formData.defendantAddress} onChange={handleChange} placeholder="e.g., 100 Business Park Dr, Los Angeles, CA 90001" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="defendantAttorney" className="block text-sm font-medium text-gray-700">Defendant Attorney (If Known)</label>
              <input id="defendantAttorney" name="defendantAttorney" type="text" value={formData.defendantAttorney} onChange={handleChange} placeholder="e.g., Jane Roe, Bar #654321, Roe Law Group, (213) 555-0123" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Jurisdiction & Venue</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="jurisdiction" className="block text-sm font-medium text-gray-700">Jurisdictional Basis</label>
              <textarea id="jurisdiction" name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="venue" className="block text-sm font-medium text-gray-700">Venue</label>
              <textarea id="venue" name="venue" value={formData.venue} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Causes of Action</h2>
          <p className="mt-2 text-sm text-gray-500">List each claim separately. Number each cause of action. Plead in the alternative where appropriate.</p>
          <div className="mt-4">
            <label htmlFor="causesOfAction" className="block text-sm font-medium text-gray-700">Causes of Action</label>
            <textarea id="causesOfAction" name="causesOfAction" value={formData.causesOfAction} onChange={handleChange} rows={6} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Factual Allegations</h2>
          <p className="mt-2 text-sm text-gray-500">Number each paragraph. Be concise but include all facts supporting each element of each claim.</p>
          <div className="mt-4">
            <label htmlFor="facts" className="block text-sm font-medium text-gray-700">Facts</label>
            <textarea id="facts" name="facts" value={formData.facts} onChange={handleChange} rows={8} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">6. Damages & Relief</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="damages" className="block text-sm font-medium text-gray-700">Damages Sought</label>
              <textarea id="damages" name="damages" value={formData.damages} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="juryDemand" className="block text-sm font-medium text-gray-700">Jury Demand</label>
              <select id="juryDemand" name="juryDemand" value={formData.juryDemand} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="Plaintiff demands a trial by jury on all issues so triable.">Demand Jury Trial</option>
                <option value="Plaintiff waives right to jury trial.">Waive Jury Trial (Bench Trial)</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">7. Verification</h2>
          <p className="mt-2 text-sm text-gray-500">Required in some states (CA, NY) for certain case types. Check local rules.</p>
          <div className="mt-4">
            <label htmlFor="verification" className="block text-sm font-medium text-gray-700">Verification</label>
            <textarea id="verification" name="verification" value={formData.verification} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Civil Complaint
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Civil Complaints
        </h2>
        <div className="mt-6 space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0">
              <h3 className="font-semibold text-gray-900">{faq.q}</h3>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}