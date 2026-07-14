"use client";

import { generatePdf } from "@/lib/pdf-builder";
import { useState } from "react";
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine";

type FormData = {
  llcName: string;
  state: StateAbbr;
  principalOffice: string;
  registeredAgent: string;
  registeredAgentAddress: string;
  formationDate: string;
  purpose: string;
  duration: string;
  member1Name: string;
  member1Address: string;
  member1Capital: string;
  member1Percentage: string;
  member2Name: string;
  member2Address: string;
  member2Capital: string;
  member2Percentage: string;
  managementType: string;
  managerName: string;
  fiscalYearEnd: string;
  taxClassification: string;
};

const faqs = [
  {
    q: "What is an LLC Operating Agreement?",
    a: "An LLC Operating Agreement is a legal document that outlines the ownership structure, member roles, and operating procedures of a Limited Liability Company. It governs the internal operations of the LLC and helps maintain limited liability protection."
  },
  {
    q: "Is an LLC Operating Agreement required by law?",
    a: "Most states don't legally require an operating agreement, but it's strongly recommended. Without one, your LLC defaults to state statutes which may not suit your business. Some states (CA, NY, MO, ME, DE) require written operating agreements."
  },
  {
    q: "Single-member vs Multi-member LLC - what's different?",
    a: "Single-member LLCs have simpler agreements (one owner). Multi-member LLCs need detailed provisions for profit/loss allocation, voting rights, capital contributions, transfer restrictions, and dispute resolution among members."
  },
  {
    q: "Member-managed vs Manager-managed - which should I choose?",
    a: "Member-managed: all owners participate in daily operations (common for small LLCs). Manager-managed: designated managers run the business (better for passive investors or larger LLCs). This choice affects voting rights and authority."
  },
  {
    q: "How are LLC profits and losses allocated?",
    a: "By default, allocations follow ownership percentages. However, operating agreements can specify different allocations (special allocations) if they have substantial economic effect. Consult a tax advisor for complex allocations."
  },
  {
    q: "Can an Operating Agreement be amended?",
    a: "Yes. Most agreements specify amendment procedures (typically majority or supermajority vote). Amendments should be in writing, signed by all members, and kept with the original agreement."
  },
];

export default function LLCOperatingAgreementPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    llcName: "",
    state: "CA",
    principalOffice: "",
    registeredAgent: "",
    registeredAgentAddress: "",
    formationDate: "",
    purpose: "Any lawful purpose",
    duration: "Perpetual",
    member1Name: "",
    member1Address: "",
    member1Capital: "",
    member1Percentage: "",
    member2Name: "",
    member2Address: "",
    member2Capital: "",
    member2Percentage: "",
    managementType: "member-managed",
    managerName: "",
    fiscalYearEnd: "December 31",
    taxClassification: "partnership",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "state") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isSingleMember = !formData.member2Name.trim();
    
    await generatePdf({
      title: `${getStateName(selectedState)} LLC Operating Agreement`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Company Information", fields: [
          { label: "LLC Name", value: formData.llcName },
          { label: "State of Formation", value: getStateName(selectedState) },
          { label: "Principal Office", value: formData.principalOffice },
          { label: "Registered Agent", value: formData.registeredAgent },
          { label: "Registered Agent Address", value: formData.registeredAgentAddress },
          { label: "Formation Date", value: formData.formationDate },
          { label: "Business Purpose", value: formData.purpose },
          { label: "Duration", value: formData.duration },
        ]},
        { heading: "Members", fields: [
          { label: "Member 1 Name", value: formData.member1Name },
          { label: "Member 1 Address", value: formData.member1Address },
          { label: "Member 1 Capital Contribution", value: `$${formData.member1Capital}` },
          { label: "Member 1 Ownership %", value: `${formData.member1Percentage}%` },
          ...(formData.member2Name ? [
            { label: "Member 2 Name", value: formData.member2Name },
            { label: "Member 2 Address", value: formData.member2Address },
            { label: "Member 2 Capital Contribution", value: `$${formData.member2Capital}` },
            { label: "Member 2 Ownership %", value: `${formData.member2Percentage}%` },
          ] : []),
        ]},
        { heading: "Management & Operations", fields: [
          { label: "Management Structure", value: formData.managementType === "member-managed" ? "Member-Managed" : "Manager-Managed" },
          { label: "Manager Name", value: formData.managerName || "N/A" },
          { label: "Fiscal Year End", value: formData.fiscalYearEnd },
          { label: "Tax Classification", value: formData.taxClassification === "partnership" ? "Partnership (Default)" : formData.taxClassification === "scorp" ? "S-Corporation" : "C-Corporation" },
        ]},
      ],
      fileName: "llc-operating-agreement.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/llc-operating-agreement" className="hover:text-primary-600">LLC Operating Agreement</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} LLC Operating Agreement
      </h1>
      <p className="mt-2 text-gray-600">
        Create a comprehensive LLC operating agreement for {getStateName(selectedState)}. Supports single and multi-member LLCs.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This LLC operating agreement template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        LLC laws vary significantly by state. You should consult with a licensed attorney
        in your jurisdiction before using this template. LegalDocs is not a law firm
        and does not provide legal representation.
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
          <h2 className="text-xl font-bold text-gray-900">1. LLC Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="llcName" className="block text-sm font-medium text-gray-700">LLC Name</label>
              <input id="llcName" name="llcName" type="text" value={formData.llcName} onChange={handleChange} placeholder="e.g., Acme Solutions LLC" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="principalOffice" className="block text-sm font-medium text-gray-700">Principal Office Address</label>
              <input id="principalOffice" name="principalOffice" type="text" value={formData.principalOffice} onChange={handleChange} placeholder="e.g., 123 Main St, Suite 100, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="registeredAgent" className="block text-sm font-medium text-gray-700">Registered Agent Name</label>
              <input id="registeredAgent" name="registeredAgent" type="text" value={formData.registeredAgent} onChange={handleChange} placeholder="e.g., Jane Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="registeredAgentAddress" className="block text-sm font-medium text-gray-700">Registered Agent Address</label>
              <input id="registeredAgentAddress" name="registeredAgentAddress" type="text" value={formData.registeredAgentAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="formationDate" className="block text-sm font-medium text-gray-700">Formation Date</label>
              <input id="formationDate" name="formationDate" type="date" value={formData.formationDate} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Business Purpose</label>
              <input id="purpose" name="purpose" type="text" value={formData.purpose} onChange={handleChange} placeholder="e.g., Any lawful purpose" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
              <input id="duration" name="duration" type="text" value={formData.duration} onChange={handleChange} placeholder="e.g., Perpetual" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Members</h2>
          <p className="mt-2 text-sm text-gray-500">For single-member LLCs, leave Member 2 fields blank.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="member1Name" className="block text-sm font-medium text-gray-700">Member 1 Name</label>
              <input id="member1Name" name="member1Name" type="text" value={formData.member1Name} onChange={handleChange} placeholder="e.g., Jane Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="member1Address" className="block text-sm font-medium text-gray-700">Member 1 Address</label>
              <input id="member1Address" name="member1Address" type="text" value={formData.member1Address} onChange={handleChange} placeholder="e.g., 123 Main St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="member1Capital" className="block text-sm font-medium text-gray-700">Member 1 Capital Contribution ($)</label>
              <input id="member1Capital" name="member1Capital" type="number" min="0" step="0.01" value={formData.member1Capital} onChange={handleChange} placeholder="e.g., 10000.00" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="member1Percentage" className="block text-sm font-medium text-gray-700">Member 1 Ownership %</label>
              <input id="member1Percentage" name="member1Percentage" type="number" min="0" max="100" step="0.01" value={formData.member1Percentage} onChange={handleChange} placeholder="e.g., 100" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="member2Name" className="block text-sm font-medium text-gray-700">Member 2 Name (Optional)</label>
              <input id="member2Name" name="member2Name" type="text" value={formData.member2Name} onChange={handleChange} placeholder="e.g., John Smith" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="member2Address" className="block text-sm font-medium text-gray-700">Member 2 Address (Optional)</label>
              <input id="member2Address" name="member2Address" type="text" value={formData.member2Address} onChange={handleChange} placeholder="e.g., 456 Oak Ave, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="member2Capital" className="block text-sm font-medium text-gray-700">Member 2 Capital Contribution ($)</label>
              <input id="member2Capital" name="member2Capital" type="number" min="0" step="0.01" value={formData.member2Capital} onChange={handleChange} placeholder="e.g., 5000.00" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="member2Percentage" className="block text-sm font-medium text-gray-700">Member 2 Ownership %</label>
              <input id="member2Percentage" name="member2Percentage" type="number" min="0" max="100" step="0.01" value={formData.member2Percentage} onChange={handleChange} placeholder="e.g., 0" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Management & Tax</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="managementType" className="block text-sm font-medium text-gray-700">Management Structure</label>
              <select id="managementType" name="managementType" value={formData.managementType} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="member-managed">Member-Managed (All members manage)</option>
                <option value="manager-managed">Manager-Managed (Designated manager)</option>
              </select>
            </div>
            <div>
              <label htmlFor="managerName" className="block text-sm font-medium text-gray-700">Manager Name (If Manager-Managed)</label>
              <input id="managerName" name="managerName" type="text" value={formData.managerName} onChange={handleChange} placeholder="e.g., Jane Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="fiscalYearEnd" className="block text-sm font-medium text-gray-700">Fiscal Year End</label>
              <input id="fiscalYearEnd" name="fiscalYearEnd" type="text" value={formData.fiscalYearEnd} onChange={handleChange} placeholder="e.g., December 31" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="taxClassification" className="block text-sm font-medium text-gray-700">Tax Classification</label>
              <select id="taxClassification" name="taxClassification" value={formData.taxClassification} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="partnership">Partnership (Default for Multi-Member)</option>
                <option value="scorp">S-Corporation (File Form 2553)</option>
                <option value="ccorp">C-Corporation (File Form 8832)</option>
                <option value="disregarded">Disregarded Entity (Single-Member Default)</option>
              </select>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF LLC Operating Agreement
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About LLC Operating Agreements
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