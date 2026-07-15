"use client";

import { generatePdf } from "@/lib/pdf-builder";
import { useState } from "react";
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine";

type FormData = {
  grantorName: string;
  grantorAddress: string;
  state: StateAbbr;
  trustName: string;
  trusteeName: string;
  trusteeAddress: string;
  successorTrustee1: string;
  successorTrustee1Address: string;
  successorTrustee2: string;
  successorTrustee2Address: string;
  beneficiary1Name: string;
  beneficiary1Relationship: string;
  beneficiary1Share: string;
  beneficiary2Name: string;
  beneficiary2Relationship: string;
  beneficiary2Share: string;
  beneficiary3Name: string;
  beneficiary3Relationship: string;
  beneficiary3Share: string;
  pourOverWill: string;
  trustAssets: string;
  governingLaw: string;
};

const faqs = [
  {
    q: "What is a Revocable Living Trust?",
    a: "A Revocable Living Trust is a legal entity you create during your lifetime to hold and manage your assets. You (the grantor) can modify or revoke it at any time while you're alive and competent. It avoids probate for assets titled in the trust's name."
  },
  {
    q: "How is it different from a Will?",
    a: "A Will only takes effect after death and must go through probate court. A Living Trust takes effect immediately, avoids probate, provides privacy (not public record), and allows seamless transition if you become incapacitated. You still need a Pour-Over Will as a safety net."
  },
  {
    q: "Do I lose control of my assets?",
    a: "No. As grantor and initial trustee, you retain full control. You can buy, sell, or remove assets from the trust at any time. The trust uses your Social Security number for tax purposes - no separate tax return needed while you're alive."
  },
  {
    q: "What assets should go into the trust?",
    a: "Real estate, bank accounts, investments, business interests, and valuable personal property. Retirement accounts (IRA, 401k) and life insurance typically pass by beneficiary designation, not through the trust. Consult an estate planning attorney for your specific situation."
  },
  {
    q: "What is a Pour-Over Will?",
    a: "A Pour-Over Will catches any assets not transferred to the trust during your lifetime and 'pours' them into the trust at death. It's an essential companion document to ensure all assets are distributed according to your trust terms."
  },
  {
    q: "Can a Revocable Living Trust protect assets from creditors?",
    a: "No. Because you retain control and can revoke the trust, assets in a revocable trust are generally accessible to your creditors during your lifetime. For creditor protection, irrevocable trusts or other strategies are needed. Consult an asset protection attorney."
  },
];

export default function RevocableLivingTrustPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    grantorName: "",
    grantorAddress: "",
    state: "CA",
    trustName: "",
    trusteeName: "",
    trusteeAddress: "",
    successorTrustee1: "",
    successorTrustee1Address: "",
    successorTrustee2: "",
    successorTrustee2Address: "",
    beneficiary1Name: "",
    beneficiary1Relationship: "",
    beneficiary1Share: "",
    beneficiary2Name: "",
    beneficiary2Relationship: "",
    beneficiary2Share: "",
    beneficiary3Name: "",
    beneficiary3Relationship: "",
    beneficiary3Share: "",
    pourOverWill: "Yes, I have a Pour-Over Will",
    trustAssets: "Real estate, bank accounts, investments, personal property",
    governingLaw: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "state") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${getStateName(selectedState)} Revocable Living Trust`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Grantor Information", fields: [
          { label: "Grantor Full Legal Name", value: formData.grantorName },
          { label: "Grantor Address", value: formData.grantorAddress },
        ]},
        { heading: "Trust Information", fields: [
          { label: "Trust Name", value: formData.trustName || `${formData.grantorName} Revocable Living Trust` },
          { label: "Governing Law", value: formData.governingLaw || getStateName(selectedState) },
        ]},
        { heading: "Trustees", fields: [
          { label: "Initial Trustee", value: formData.trusteeName },
          { label: "Initial Trustee Address", value: formData.trusteeAddress },
          { label: "First Successor Trustee", value: formData.successorTrustee1 },
          { label: "First Successor Trustee Address", value: formData.successorTrustee1Address },
          { label: "Second Successor Trustee", value: formData.successorTrustee2 || "N/A" },
          { label: "Second Successor Trustee Address", value: formData.successorTrustee2Address || "N/A" },
        ]},
        { heading: "Beneficiaries", fields: [
          { label: "Beneficiary 1 Name", value: formData.beneficiary1Name },
          { label: "Beneficiary 1 Relationship", value: formData.beneficiary1Relationship },
          { label: "Beneficiary 1 Share", value: formData.beneficiary1Share },
          ...(formData.beneficiary2Name ? [
            { label: "Beneficiary 2 Name", value: formData.beneficiary2Name },
            { label: "Beneficiary 2 Relationship", value: formData.beneficiary2Relationship },
            { label: "Beneficiary 2 Share", value: formData.beneficiary2Share },
          ] : []),
          ...(formData.beneficiary3Name ? [
            { label: "Beneficiary 3 Name", value: formData.beneficiary3Name },
            { label: "Beneficiary 3 Relationship", value: formData.beneficiary3Relationship },
            { label: "Beneficiary 3 Share", value: formData.beneficiary3Share },
          ] : []),
        ]},
        { heading: "Trust Assets & Provisions", fields: [
          { label: "Initial Trust Assets", value: formData.trustAssets },
          { label: "Pour-Over Will", value: formData.pourOverWill },
        ]},
      ],
      fileName: "revocable-living-trust.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/revocable-living-trust" className="hover:text-primary-600">Revocable Living Trust</a>
        <span className="mx-2">/</span>
        <a href={`/revocable-living-trust/${getStateName(selectedState).toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{getStateName(selectedState)}</a>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Revocable Living Trust
      </h1>
      <p className="mt-2 text-gray-600">
        Create a comprehensive revocable living trust for {getStateName(selectedState)}. Avoid probate, maintain privacy, and plan for incapacity.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This revocable living trust template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Estate planning laws vary significantly by state. Trusts have serious tax and legal implications.
        You should consult with a licensed estate planning attorney in your jurisdiction before using this template.
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

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">1. Grantor & Trust Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="grantorName" className="block text-sm font-medium text-gray-700">Grantor Full Legal Name</label>
              <input id="grantorName" name="grantorName" type="text" value={formData.grantorName} onChange={handleChange} placeholder="e.g., Jane Elizabeth Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="grantorAddress" className="block text-sm font-medium text-gray-700">Grantor Address</label>
              <input id="grantorAddress" name="grantorAddress" type="text" value={formData.grantorAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="trustName" className="block text-sm font-medium text-gray-700">Trust Name</label>
              <input id="trustName" name="trustName" type="text" value={formData.trustName} onChange={handleChange} placeholder="e.g., The Jane Elizabeth Doe Revocable Living Trust" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="governingLaw" className="block text-sm font-medium text-gray-700">Governing Law (State)</label>
              <input id="governingLaw" name="governingLaw" type="text" value={formData.governingLaw} onChange={handleChange} placeholder={getStateName(selectedState)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Trustees</h2>
          <p className="mt-2 text-sm text-gray-500">You will typically serve as the initial trustee. Name successors to take over if you become incapacitated or pass away.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="trusteeName" className="block text-sm font-medium text-gray-700">Initial Trustee Name</label>
              <input id="trusteeName" name="trusteeName" type="text" value={formData.trusteeName} onChange={handleChange} placeholder="e.g., Jane Elizabeth Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="trusteeAddress" className="block text-sm font-medium text-gray-700">Initial Trustee Address</label>
              <input id="trusteeAddress" name="trusteeAddress" type="text" value={formData.trusteeAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="successorTrustee1" className="block text-sm font-medium text-gray-700">First Successor Trustee</label>
              <input id="successorTrustee1" name="successorTrustee1" type="text" value={formData.successorTrustee1} onChange={handleChange} placeholder="e.g., John Robert Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="successorTrustee1Address" className="block text-sm font-medium text-gray-700">First Successor Trustee Address</label>
              <input id="successorTrustee1Address" name="successorTrustee1Address" type="text" value={formData.successorTrustee1Address} onChange={handleChange} placeholder="e.g., 456 Oak Ave, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="successorTrustee2" className="block text-sm font-medium text-gray-700">Second Successor Trustee (Optional)</label>
              <input id="successorTrustee2" name="successorTrustee2" type="text" value={formData.successorTrustee2} onChange={handleChange} placeholder="e.g., Mary Jane Smith" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="successorTrustee2Address" className="block text-sm font-medium text-gray-700">Second Successor Trustee Address</label>
              <input id="successorTrustee2Address" name="successorTrustee2Address" type="text" value={formData.successorTrustee2Address} onChange={handleChange} placeholder="e.g., 789 Elm St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Beneficiaries</h2>
          <p className="mt-2 text-sm text-gray-500">List who receives trust assets after your death. Shares should total 100%.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="beneficiary1Name" className="block text-sm font-medium text-gray-700">Beneficiary 1 Name</label>
              <input id="beneficiary1Name" name="beneficiary1Name" type="text" value={formData.beneficiary1Name} onChange={handleChange} placeholder="e.g., John Robert Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="beneficiary1Relationship" className="block text-sm font-medium text-gray-700">Relationship</label>
              <input id="beneficiary1Relationship" name="beneficiary1Relationship" type="text" value={formData.beneficiary1Relationship} onChange={handleChange} placeholder="e.g., Son" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="beneficiary1Share" className="block text-sm font-medium text-gray-700">Share %</label>
              <input id="beneficiary1Share" name="beneficiary1Share" type="text" value={formData.beneficiary1Share} onChange={handleChange} placeholder="e.g., 50%" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="beneficiary2Name" className="block text-sm font-medium text-gray-700">Beneficiary 2 Name (Optional)</label>
              <input id="beneficiary2Name" name="beneficiary2Name" type="text" value={formData.beneficiary2Name} onChange={handleChange} placeholder="e.g., Mary Jane Smith" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="beneficiary2Relationship" className="block text-sm font-medium text-gray-700">Relationship</label>
              <input id="beneficiary2Relationship" name="beneficiary2Relationship" type="text" value={formData.beneficiary2Relationship} onChange={handleChange} placeholder="e.g., Daughter" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="beneficiary2Share" className="block text-sm font-medium text-gray-700">Share %</label>
              <input id="beneficiary2Share" name="beneficiary2Share" type="text" value={formData.beneficiary2Share} onChange={handleChange} placeholder="e.g., 30%" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="beneficiary3Name" className="block text-sm font-medium text-gray-700">Beneficiary 3 Name (Optional)</label>
              <input id="beneficiary3Name" name="beneficiary3Name" type="text" value={formData.beneficiary3Name} onChange={handleChange} placeholder="e.g., Robert James Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="beneficiary3Relationship" className="block text-sm font-medium text-gray-700">Relationship</label>
              <input id="beneficiary3Relationship" name="beneficiary3Relationship" type="text" value={formData.beneficiary3Relationship} onChange={handleChange} placeholder="e.g., Grandson" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="beneficiary3Share" className="block text-sm font-medium text-gray-700">Share %</label>
              <input id="beneficiary3Share" name="beneficiary3Share" type="text" value={formData.beneficiary3Share} onChange={handleChange} placeholder="e.g., 20%" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Trust Assets & Pour-Over Will</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="trustAssets" className="block text-sm font-medium text-gray-700">Initial Trust Assets (Description)</label>
              <textarea id="trustAssets" name="trustAssets" value={formData.trustAssets} onChange={handleChange} rows={3} placeholder="e.g., Real estate at 123 Main St, bank accounts at Chase ending in 1234, investment account at Vanguard, personal property" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="pourOverWill" className="block text-sm font-medium text-gray-700">Pour-Over Will Status</label>
              <select id="pourOverWill" name="pourOverWill" value={formData.pourOverWill} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="Yes, I have a Pour-Over Will">Yes, I have a Pour-Over Will</option>
                <option value="No, I will create one separately">No, I will create one separately</option>
                <option value="Not applicable">Not applicable</option>
              </select>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Revocable Living Trust
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Revocable Living Trusts
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