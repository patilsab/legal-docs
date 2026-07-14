"use client";

import { generatePdf } from "@/lib/pdf-builder";
import { useState } from "react";
import { US_STATES, getStateLegalNotes, getStateName, type StateAbbr } from "@/lib/state-engine";

type FormData = {
  grantorName: string;
  grantorAddress: string;
  granteeName: string;
  granteeAddress: string;
  propertyAddress: string;
  propertyDescription: string;
  consideration: string;
  state: StateAbbr;
};

const faqs = [
  {
    q: "What is a quitclaim deed?",
    a: "A quitclaim deed is a legal document used to transfer whatever interest a person (grantor) has in a property to another person (grantee) without any warranties or guarantees about the title. It transfers only the grantor's interest, if any."
  },
  {
    q: "When is a quitclaim deed typically used?",
    a: "Quitclaim deeds are commonly used for: transferring property between family members, adding/removing a spouse from title after marriage/divorce, transferring property to a trust or LLC, clearing up title defects, and gifting property. They are rarely used for traditional real estate sales."
  },
  {
    q: "Does a quitclaim deed guarantee clear title?",
    a: "No. Unlike a warranty deed, a quitclaim deed provides NO warranties. The grantee receives only whatever interest the grantor actually has, which could be nothing. There is no protection against liens, encumbrances, or competing claims."
  },
  {
    q: "Is a quitclaim deed revocable?",
    a: "Once a quitclaim deed is delivered and recorded, it is generally irrevocable. The grantor cannot unilaterally take back the property. To reverse the transfer, the grantee would need to execute a new deed transferring the property back."
  },
  {
    q: "Does a quitclaim deed need to be notarized?",
    a: "Yes, in virtually all states, a quitclaim deed must be signed by the grantor in the presence of a notary public to be valid and recordable. Some states also require witness signatures."
  },
  {
    q: "What is the difference between a quitclaim deed and a warranty deed?",
    a: "A warranty deed guarantees the grantor has clear title and will defend against any claims. A quitclaim deed transfers only whatever interest the grantor has, with no guarantees. Warranty deeds are standard for real estate sales; quitclaim deeds are for transfers between known parties."
  },
];

export default function QuitclaimDeedPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    grantorName: "",
    grantorAddress: "",
    granteeName: "",
    granteeAddress: "",
    propertyAddress: "",
    propertyDescription: "",
    consideration: "",
    state: "CA",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "state") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${getStateName(selectedState)} Quitclaim Deed`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Grantor (Current Owner)", fields: [
          { label: "Full Legal Name", value: formData.grantorName },
          { label: "Current Address", value: formData.grantorAddress },
        ]},
        { heading: "Grantee (New Owner)", fields: [
          { label: "Full Legal Name", value: formData.granteeName },
          { label: "Current Address", value: formData.granteeAddress },
        ]},
        { heading: "Property Information", fields: [
          { label: "Property Address", value: formData.propertyAddress },
          { label: "Legal Description", value: formData.propertyDescription },
          { label: "Consideration", value: formData.consideration || "$10.00 and other valuable consideration" },
        ]},
      ],
      fileName: "quitclaim-deed.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/quitclaim-deed" className="hover:text-primary-600">Quitclaim Deed</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Quitclaim Deed
      </h1>
      <p className="mt-2 text-gray-600">
        Create a quitclaim deed to transfer property interest in {getStateName(selectedState)}. Fill in the details below and download your customized template.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This quitclaim deed template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Quitclaim deeds transfer property without warranties. Real estate laws vary significantly by state.
        You should consult with a licensed attorney in your jurisdiction before using this template.
        LegalDocs is not a law firm and does not provide legal representation.
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">Select Your State</label>
        <select
          value={selectedState}
          onChange={handleChange}
          name="state"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
        >
          {US_STATES.map((state) => (
            <option key={state.abbr} value={state.abbr}>
              {state.name} ({state.abbr})
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="grantorName" className="block text-sm font-medium text-gray-700">
              Grantor Full Legal Name
            </label>
            <input
              id="grantorName"
              name="grantorName"
              type="text"
              value={formData.grantorName}
              onChange={handleChange}
              placeholder="e.g., Jane Elizabeth Doe"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="granteeName" className="block text-sm font-medium text-gray-700">
              Grantee Full Legal Name
            </label>
            <input
              id="granteeName"
              name="granteeName"
              type="text"
              value={formData.granteeName}
              onChange={handleChange}
              placeholder="e.g., John Robert Smith"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="grantorAddress" className="block text-sm font-medium text-gray-700">
              Grantor Current Address
            </label>
            <textarea
              id="grantorAddress"
              name="grantorAddress"
              value={formData.grantorAddress}
              onChange={handleChange}
              placeholder="e.g., 123 Main Street, Springfield, IL 62701"
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="granteeAddress" className="block text-sm font-medium text-gray-700">
              Grantee Current Address
            </label>
            <textarea
              id="granteeAddress"
              name="granteeAddress"
              value={formData.granteeAddress}
              onChange={handleChange}
              placeholder="e.g., 456 Oak Avenue, Springfield, IL 62701"
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700">
              Property Address
            </label>
            <input
              id="propertyAddress"
              name="propertyAddress"
              type="text"
              value={formData.propertyAddress}
              onChange={handleChange}
              placeholder="e.g., 789 Elm Street, Springfield, IL 62701"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="propertyDescription" className="block text-sm font-medium text-gray-700">
              Legal Property Description
            </label>
            <textarea
              id="propertyDescription"
              name="propertyDescription"
              value={formData.propertyDescription}
              onChange={handleChange}
              placeholder="e.g., Lot 12, Block 3, Oakwood Subdivision, according to the plat recorded in Book 45, Page 12, Sangamon County Records"
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="consideration" className="block text-sm font-medium text-gray-700">
              Consideration (Optional)
            </label>
            <input
              id="consideration"
              name="consideration"
              type="text"
              value={formData.consideration}
              onChange={handleChange}
              placeholder="e.g., $10.00 and other valuable consideration"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Quitclaim Deed
          </button>
        </div>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">
          {getStateName(selectedState)} Quitclaim Deed Requirements
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Key legal requirements for quitclaim deeds in {getStateName(selectedState)}:
        </p>
        <ul className="mt-4 space-y-3">
          {getStateLegalNotes("quitclaim-deed", selectedState).map((note, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-700">
              <span className="mr-2 mt-0.5 text-primary-600">●</span>
              {note}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Quitclaim Deeds
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
