"use client";

import { useState } from "react";
import { generatePdf, PdfSection } from "@/lib/pdf-builder";

const states = [
  {
    name: "California",
    abbreviation: "CA",
    notes: "California requires specific disclosures regarding community property division. Spousal support may be temporary or permanent. Courts consider factors listed in Family Code Section 4320.",
    spousalSupportInfo: "CA uses a formula-based guideline for temporary spousal support. Permanent support considers standard of living, earning capacity, and duration of marriage.",
  },
  {
    name: "Texas",
    abbreviation: "TX",
    notes: "Texas is a community property state. All property acquired during the marriage is presumed community property and subject to division. Spousal support (alimony) is limited in duration and amount.",
    spousalSupportInfo: "TX limits spousal maintenance to the lesser of $5,000/month or 20% of the obligor's average monthly gross income, with duration tied to marriage length.",
  },
  {
    name: "Florida",
    abbreviation: "FL",
    notes: "Florida follows equitable distribution for property division. Courts consider contributions of each spouse, economic circumstances, and duration of marriage.",
    spousalSupportInfo: "FL alimony types include bridge-the-gap, rehabilitative, durational, and permanent. Duration of marriage (short: <7 years, moderate: 7-17, long: 17+) affects the type and duration of alimony.",
  },
  {
    name: "New York",
    abbreviation: "NY",
    notes: "New York follows equitable distribution, considering factors like income, property, and earning capacity at time of divorce. Marital fault may be considered.",
    spousalSupportInfo: "NY uses statutory guidelines based on income differential. Maintenance duration is 15-30% of the lesser of 15-30 years of marriage depending on length.",
  },
  {
    name: "Illinois",
    abbreviation: "IL",
    notes: "Illinois uses a formula-based approach for maintenance (spousal support). Property is divided equitably based on factors in the Illinois Marriage and Dissolution of Marriage Act.",
    spousalSupportInfo: "IL maintenance is calculated as: (33.33% of payor's income) - (25% of payee's income), capped at 40% of combined income. Duration = length of marriage × multiplier.",
  },
];

type FormData = {
  spouse1Name: string;
  spouse2Name: string;
  marriageDate: string;
  separationDate: string;
  propertyDivision: string;
  spousalSupportAmount: string;
  custodyArrangement: string;
  childSupportAmount: string;
  effectiveDate: string;
};

export default function SeparationAgreementPage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    spouse1Name: "",
    spouse2Name: "",
    marriageDate: "",
    separationDate: "",
    propertyDivision: "",
    spousalSupportAmount: "",
    custodyArrangement: "",
    childSupportAmount: "",
    effectiveDate: new Date().toISOString().split("T")[0],
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownload = async () => {
    await generatePdf({
      title: "Separation Agreement",
      state: selectedState.name,
      sections: [
        {
          heading: "Spouse 1 Information",
          fields: [{ label: "Full Name", value: formData.spouse1Name }],
        },
        {
          heading: "Spouse 2 Information",
          fields: [{ label: "Full Name", value: formData.spouse2Name }],
        },
        {
          heading: "Marriage Details",
          fields: [
            { label: "Marriage Date", value: formData.marriageDate },
            { label: "Separation Date", value: formData.separationDate },
            { label: "Effective Date", value: formData.effectiveDate },
          ],
        },
        {
          heading: "Property Division",
          fields: [
            { label: "Division Terms", value: formData.propertyDivision || "Not specified" },
          ],
        },
        {
          heading: "Spousal Support",
          fields: [
            { label: "Monthly Amount", value: formData.spousalSupportAmount || "None" },
          ],
        },
        {
          heading: "Child Custody",
          fields: [
            { label: "Arrangement", value: formData.custodyArrangement || "Not specified" },
            { label: "Child Support Amount", value: formData.childSupportAmount || "None" },
          ],
        },
      ],
      fileName: "separation-agreement.pdf",
    });
  };

  const faqs = [
    {
      q: "What is a separation agreement?",
      a: "A separation agreement is a legally binding document that outlines the terms and conditions under which a married couple agrees to live separately. It covers property division, spousal support, child custody, and other critical matters.",
    },
    {
      q: "Is a separation agreement legally binding in " + selectedState + "?",
      a: "Yes, a separation agreement is generally enforceable in " + selectedState + " as long as it is signed voluntarily by both parties, is not unconscionable, and is properly notarized. It is recommended to have an attorney review the document.",
    },
    {
      q: "Do we need to file the separation agreement with the court?",
      a: "While filing is not always required, filing the agreement with the court makes it enforceable as a court order. In " + selectedState + ", filing can simplify enforcement if one party fails to comply with the terms.",
    },
    {
      q: "Can a separation agreement be modified?",
      a: "Modifications require mutual written consent of both parties or a court order. Some agreements include provisions that allow modification under specific circumstances. Consult with a family law attorney in " + selectedState + " for guidance.",
    },
    {
      q: "How does a separation agreement differ from a divorce?",
      a: "A separation agreement allows couples to live apart and define terms of separation without legally dissolving the marriage. A divorce legally terminates the marriage. Separation may be a step before or alternative to divorce.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/separation-agreement" className="hover:text-primary-600">Separation Agreement</a>
        <span className="mx-2">/</span>
        <a href={`/separation-agreement/${selectedState.name.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{selectedState.name}</a>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">{selectedState.name} Free Separation Agreement Template</h1>

      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This template is for informational purposes only and does not constitute legal advice. Separation agreements involve complex legal rights and obligations. Consult with a licensed family law attorney in {selectedState.name} before signing any agreement.
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">Select Your State</label>
        <select
          value={selectedState.name}
          onChange={(e) => {
            const state = states.find((s) => s.name === e.target.value);
            if (state) setSelectedState(state);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {states.map((state) => (
            <option key={state.name} value={state.name}>
              {state.name} ({state.abbreviation})
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleDownload(); }} className="mt-8 space-y-6">
        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Spouse 1 Information</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={formData.spouse1Name}
                onChange={(e) => handleChange("spouse1Name", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Jane Smith"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Spouse 2 Information</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={formData.spouse2Name}
                onChange={(e) => handleChange("spouse2Name", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="John Smith"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Marriage Details</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Marriage Date</label>
              <input
                type="date"
                value={formData.marriageDate}
                onChange={(e) => handleChange("marriageDate", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Separation Date</label>
              <input
                type="date"
                value={formData.separationDate}
                onChange={(e) => handleChange("separationDate", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Effective Date</label>
              <input
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => handleChange("effectiveDate", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Property Division</h3>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">Property Division Terms</label>
            <textarea
              value={formData.propertyDivision}
              onChange={(e) => handleChange("propertyDivision", e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Describe how marital property and debts will be divided between spouses. Include specific assets, real property, vehicles, bank accounts, retirement accounts, and debts."
            />
            <p className="mt-1 text-xs text-gray-400">Be specific about assets and debts to avoid future disputes.</p>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Spousal Support</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Monthly Support Amount ($)</label>
              <input
                type="number"
                value={formData.spousalSupportAmount}
                onChange={(e) => handleChange("spousalSupportAmount", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="0"
                min="0"
              />
            </div>
            <div className="flex items-center rounded-md bg-blue-50 p-3 text-xs text-blue-700">
              {selectedState.spousalSupportInfo}
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Child Custody & Support</h3>
          <div className="mt-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Custody Arrangement</label>
              <textarea
                value={formData.custodyArrangement}
                onChange={(e) => handleChange("custodyArrangement", e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Describe the custody arrangement, including: legal custody (joint/sole), physical custody (primary/visitation schedule), holiday and vacation schedules, decision-making authority for education and healthcare."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Monthly Child Support Amount ($)</label>
              <input
                type="number"
                value={formData.childSupportAmount}
                onChange={(e) => handleChange("childSupportAmount", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="0"
                min="0"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700"
        >
          Download Separation Agreement PDF
        </button>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">{selectedState.name} Legal Requirements</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>&bull; <strong>Notarization:</strong> Recommended for enforceability; required in some counties</li>
          <li>&bull; <strong>Filing:</strong> Not required to be valid, but filing with the court enhances enforceability</li>
          <li>&bull; <strong>Waiting Period:</strong> {selectedState.notes}</li>
          <li>&bull; <strong>Spousal Support:</strong> {selectedState.spousalSupportInfo}</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-6">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-900">{faq.q}</h3>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}