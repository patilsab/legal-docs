"use client";

import { useState } from "react";
import { generatePdf, PdfSection } from "@/lib/pdf-builder";

const states = [
  {
    name: "California",
    abbreviation: "CA",
    notaryInfo: "California requires notaries to use California-specific acknowledgment forms. Notaries must verify signer identity through personal knowledge or satisfactory evidence. Jurat requires the signer to sign in the notary's presence.",
    oathType: "Affidavits in California must include a jurat (notary block) where the signer swears or affirms the truth of the statement under penalty of perjury.",
  },
  {
    name: "Texas",
    abbreviation: "TX",
    notaryInfo: "Texas notaries may charge up to $6 per signature. Notary stamps or seals are not required but recommended. Texas recognizes both acknowledgments and jurats for affidavits.",
    oathType: "In Texas, affidavits must be sworn before a notary public. The notary administers an oath or affirmation and the signer signs in the notary's presence.",
  },
  {
    name: "Florida",
    abbreviation: "FL",
    notaryInfo: "Florida requires notaries to use the notary's official stamp or seal. Electronic notarization is permitted under Florida law. Notaries must maintain a journal of notarial acts.",
    oathType: "Florida affidavits require a jurat where the signer swears to the truth of the contents. The notary must personally witness the signing and administer an oath.",
  },
  {
    name: "New York",
    abbreviation: "NY",
    notaryInfo: "New York requires notaries to use a raised seal or ink stamp. Notaries must maintain a journal. New York permits electronic notarization for certain documents.",
    oathType: "New York affidavits are typically sworn before a notary public. The notary administers an oath of affirmation and the signer signs the document in the notary's presence.",
  },
  {
    name: "Illinois",
    abbreviation: "IL",
    notaryInfo: "Illinois requires notaries to use a seal or stamp. Notaries may charge up to $5 per signature. Illinois requires a journal for remote notarization. Notarization of acknowledgments requires personal appearance.",
    oathType: "In Illinois, affidavits must be sworn before a notary public or other authorized officer. The signer signs in the presence of the notary who administers the oath.",
  },
];

type FormData = {
  affiantName: string;
  affiantAddress: string;
  notaryState: string;
  notaryCounty: string;
  statementOfFacts: string;
  dateSworn: string;
};

export default function AffidavitPage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    affiantName: "",
    affiantAddress: "",
    notaryState: states[0].abbreviation,
    notaryCounty: "",
    statementOfFacts: "",
    dateSworn: new Date().toISOString().split("T")[0],
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownload = async () => {
    await generatePdf({
      title: "Affidavit",
      state: selectedState.name,
      sections: [
        {
          heading: "Affiant Information",
          fields: [
            { label: "Full Name", value: formData.affiantName },
            { label: "Address", value: formData.affiantAddress },
          ],
        },
        {
          heading: "Notarization Details",
          fields: [
            { label: "State", value: formData.notaryState },
            { label: "County", value: formData.notaryCounty },
            { label: "Date Sworn", value: formData.dateSworn },
          ],
        },
        {
          heading: "Statement of Facts",
          fields: [
            { label: "Affidavit Statement", value: formData.statementOfFacts || "(not provided)" },
          ],
        },
      ],
      fileName: "affidavit.pdf",
    });
  };

  const faqs = [
    {
      q: "What is an affidavit?",
      a: "An affidavit is a written statement of facts voluntarily made by an affiant under an oath or affirmation administered by a person authorized to do so (typically a notary public). It is a legally binding document and lying in an affidavit constitutes perjury.",
    },
    {
      q: "When is an affidavit needed?",
      a: "Affidavits are used in many situations, including court proceedings, real estate transactions, financial matters, immigration applications, employment verification, and any situation where a sworn written statement is required as evidence.",
    },
    {
      q: "What are the notary requirements in " + selectedState + "?",
      a: "In " + selectedState + ", " + selectedState.notaryInfo + " Ensure the document includes a proper jurat block for the notary to complete.",
    },
    {
      q: "Can I write my own affidavit?",
      a: "Yes, you can draft your own affidavit. The document must clearly state the facts, include a proper jurat (notary block), and be signed under oath before a notary public. However, for complex legal matters, it is advisable to have an attorney review or draft the affidavit.",
    },
    {
      q: "What happens if I lie in an affidavit?",
      a: "Making false statements in an affidavit constitutes perjury, which is a criminal offense. Penalties vary by state but can include fines and imprisonment. In " + selectedState + ", perjury is typically prosecuted as a felony.",
    },
    {
      q: "How long is an affidavit valid?",
      a: "An affidavit does not inherently expire. However, some institutions or courts may require a " + "recently" + " notarized affidavit (within 30-90 days). Check the specific requirements of the party requesting the affidavit.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/affidavit" className="hover:text-primary-600">Affidavit</a>
        <span className="mx-2">/</span>
        <a href={`/affidavit/${selectedState.name.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{selectedState.name}</a>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">{selectedState.name} Free Affidavit Template</h1>

      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This template is for informational purposes only and does not constitute legal advice. Affidavits are sworn legal documents. Lying under oath constitutes perjury. Consult with a licensed attorney in {selectedState.name} for legal advice specific to your situation.
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">Select Your State</label>
        <select
          value={selectedState.name}
          onChange={(e) => {
            const state = states.find((s) => s.name === e.target.value);
            if (state) {
              setSelectedState(state);
              handleChange("notaryState", state.abbreviation);
            }
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
          <h3 className="font-semibold text-gray-900">Affiant Information</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input
                type="text"
                value={formData.affiantName}
                onChange={(e) => handleChange("affiantName", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="John A. Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Address</label>
              <input
                type="text"
                value={formData.affiantAddress}
                onChange={(e) => handleChange("affiantAddress", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="123 Main Street, City, State ZIP"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Notarization Details</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                value={formData.notaryState}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-200 bg-gray-100 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">County</label>
              <input
                type="text"
                value={formData.notaryCounty}
                onChange={(e) => handleChange("notaryCounty", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="County name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date Sworn</label>
              <input
                type="date"
                value={formData.dateSworn}
                onChange={(e) => handleChange("dateSworn", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Statement of Facts</h3>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">Sworn Statement</label>
            <textarea
              value={formData.statementOfFacts}
              onChange={(e) => handleChange("statementOfFacts", e.target.value)}
              rows={10}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="STATE OF {selectedState.abbreviation}&#10;COUNTY OF ________&#10;&#10;I, [Affiant Name], being first duly sworn, depose and state as follows:&#10;&#10;1. [First fact]&#10;2. [Second fact]&#10;3. [Third fact]&#10;&#10;Further affiant sayeth not.&#10;&#10;____________________________&#10;Signature of Affiant&#10;&#10;Subscribed and sworn to before me this _____ day of __________, 20__&#10;&#10;____________________________&#10;Notary Public&#10;My commission expires: __________"
            />
            <p className="mt-1 text-xs text-gray-400">State each fact clearly and separately. Sign in the presence of a notary public. {selectedState.oathType}</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700"
        >
          Download Affidavit PDF
        </button>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">{selectedState.name} Notary Requirements</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>&bull; <strong>Notary Requirement:</strong> Affidavits must be sworn before a notary public</li>
          <li>&bull; <strong>Identification:</strong> Government-issued photo ID required</li>
          <li>&bull; <strong>Commission Expiry:</strong> Notary must have a valid, unexpired commission</li>
          <li>&bull; <strong>Notary Info:</strong> {selectedState.notaryInfo}</li>
          <li>&bull; <strong>Oath Type:</strong> {selectedState.oathType}</li>
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