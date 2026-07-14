"use client";

import { generatePdf } from "@/lib/pdf-builder";
import { useState } from "react";
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine";

type FormData = {
  party1Name: string;
  party1Address: string;
  party2Name: string;
  party2Address: string;
  state: StateAbbr;
  marriageDate: string;
  marriageLocation: string;
  party1Assets: string;
  party1Debts: string;
  party2Assets: string;
  party2Debts: string;
  separateProperty: string;
  maritalProperty: string;
  spousalSupport: string;
  propertyDivision: string;
  debtResponsibility: string;
  inheritanceRights: string;
  businessInterests: string;
  retirementAccounts: string;
  lifeInsurance: string;
  disputeResolution: string;
  sunsetClause: string;
};

const faqs = [
  {
    q: "What is a Prenuptial Agreement?",
    a: "A Prenuptial Agreement (prenup) is a contract signed before marriage that defines how assets, debts, and spousal support will be handled in case of divorce or death. It allows couples to override default state laws on property division and alimony."
  },
  {
    q: "Are Prenuptial Agreements enforceable in all states?",
    a: "Yes, all 50 states recognize prenups, but requirements vary. Most require: full financial disclosure, voluntary signing (no coercion), each party has independent legal counsel (or waives in writing), and terms aren't unconscionable. Some states have specific timing requirements (e.g., CA requires 7-day waiting period)."
  },
  {
    q: "What CANNOT be included in a prenup?",
    a: "Child custody and child support provisions are generally unenforceable - courts decide based on the child's best interests at time of divorce. Personal lifestyle clauses (frequency of visits to in-laws, weight limits, etc.) are often unenforceable. Illegal provisions are void."
  },
  {
    q: "Do both parties need lawyers?",
    a: "Most states strongly recommend (and some require) each party to have independent legal counsel. This proves the agreement was entered voluntarily with full understanding. At minimum, both parties should sign written waivers if declining counsel."
  },
  {
    q: "Can a prenup be modified after marriage?",
    a: "Yes, through a Postnuptial Agreement. Same requirements apply: full disclosure, voluntary, in writing, signed by both. Some states require additional formalities for postnups."
  },
  {
    q: "What is a sunset clause?",
    a: "A sunset clause automatically expires the prenup after a certain period (e.g., 10 years) or upon a specific event (e.g., birth of first child). This can make the agreement more palatable and shows good faith."
  },
];

export default function PrenuptialAgreementPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    party1Name: "",
    party1Address: "",
    party2Name: "",
    party2Address: "",
    state: "CA",
    marriageDate: "",
    marriageLocation: "",
    party1Assets: "",
    party1Debts: "",
    party2Assets: "",
    party2Debts: "",
    separateProperty: "Each party retains their pre-marital assets, inheritances, and gifts as separate property.",
    maritalProperty: "All assets acquired during marriage are marital property subject to equitable division.",
    spousalSupport: "Each party waives all rights to spousal support/alimony.",
    propertyDivision: "Marital property divided equitably (not necessarily equally) based on contributions and needs.",
    debtResponsibility: "Pre-marital debts remain separate. Marital debts divided proportionally.",
    inheritanceRights: "Each party retains inheritance rights in the other's estate unless waived in writing.",
    businessInterests: "Pre-marital business interests remain separate. Appreciation during marriage may be marital property.",
    retirementAccounts: "Pre-marital retirement balances separate. Contributions during marriage marital property.",
    lifeInsurance: "Each party may maintain life insurance for the other's benefit as agreed.",
    disputeResolution: "Mediation required before litigation. Each party bears own attorney fees.",
    sunsetClause: "This agreement expires on the 10th wedding anniversary unless renewed in writing.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "state") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${getStateName(selectedState)} Prenuptial Agreement`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Party One", fields: [
          { label: "Full Legal Name", value: formData.party1Name },
          { label: "Address", value: formData.party1Address },
        ]},
        { heading: "Party Two", fields: [
          { label: "Full Legal Name", value: formData.party2Name },
          { label: "Address", value: formData.party2Address },
        ]},
        { heading: "Marriage Information", fields: [
          { label: "Anticipated Marriage Date", value: formData.marriageDate },
          { label: "Marriage Location (City, State)", value: formData.marriageLocation },
        ]},
        { heading: "Financial Disclosure", fields: [
          { label: "Party One Assets", value: formData.party1Assets },
          { label: "Party One Debts", value: formData.party1Debts },
          { label: "Party Two Assets", value: formData.party2Assets },
          { label: "Party Two Debts", value: formData.party2Debts },
        ]},
        { heading: "Property Provisions", fields: [
          { label: "Separate Property", value: formData.separateProperty },
          { label: "Marital Property", value: formData.maritalProperty },
          { label: "Property Division", value: formData.propertyDivision },
          { label: "Debt Responsibility", value: formData.debtResponsibility },
        ]},
        { heading: "Support & Inheritance", fields: [
          { label: "Spousal Support", value: formData.spousalSupport },
          { label: "Inheritance Rights", value: formData.inheritanceRights },
          { label: "Business Interests", value: formData.businessInterests },
          { label: "Retirement Accounts", value: formData.retirementAccounts },
          { label: "Life Insurance", value: formData.lifeInsurance },
        ]},
        { heading: "General Provisions", fields: [
          { label: "Dispute Resolution", value: formData.disputeResolution },
          { label: "Sunset Clause", value: formData.sunsetClause },
        ]},
      ],
      fileName: "prenuptial-agreement.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/prenuptial-agreement" className="hover:text-primary-600">Prenuptial Agreement</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Prenuptial Agreement
      </h1>
      <p className="mt-2 text-gray-600">
        Create a comprehensive prenuptial agreement for {getStateName(selectedState)}. Define property rights, spousal support, and financial protections before marriage.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This prenuptial agreement template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Prenuptial agreements have serious legal consequences and must meet strict state requirements.
        Both parties should consult independent licensed attorneys in your jurisdiction before signing.
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
          <h2 className="text-xl font-bold text-gray-900">1. Party Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="party1Name" className="block text-sm font-medium text-gray-700">Party One Full Legal Name</label>
              <input id="party1Name" name="party1Name" type="text" value={formData.party1Name} onChange={handleChange} placeholder="e.g., Jane Elizabeth Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="party1Address" className="block text-sm font-medium text-gray-700">Party One Address</label>
              <input id="party1Address" name="party1Address" type="text" value={formData.party1Address} onChange={handleChange} placeholder="e.g., 123 Main St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="party2Name" className="block text-sm font-medium text-gray-700">Party Two Full Legal Name</label>
              <input id="party2Name" name="party2Name" type="text" value={formData.party2Name} onChange={handleChange} placeholder="e.g., John Robert Smith" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="party2Address" className="block text-sm font-medium text-gray-700">Party Two Address</label>
              <input id="party2Address" name="party2Address" type="text" value={formData.party2Address} onChange={handleChange} placeholder="e.g., 456 Oak Ave, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Marriage Details</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="marriageDate" className="block text-sm font-medium text-gray-700">Anticipated Marriage Date</label>
              <input id="marriageDate" name="marriageDate" type="date" value={formData.marriageDate} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="marriageLocation" className="block text-sm font-medium text-gray-700">Marriage Location</label>
              <input id="marriageLocation" name="marriageLocation" type="text" value={formData.marriageLocation} onChange={handleChange} placeholder="e.g., Chicago, Illinois" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Financial Disclosure (Required for Enforceability)</h2>
          <p className="mt-2 text-sm text-gray-500">Full and fair disclosure is required in most states. Attach schedules if needed.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="party1Assets" className="block text-sm font-medium text-gray-700">Party One Assets</label>
              <textarea id="party1Assets" name="party1Assets" value={formData.party1Assets} onChange={handleChange} rows={3} placeholder="e.g., Home: $450k, 401k: $120k, Savings: $50k, Car: $30k, Jewelry: $15k" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="party1Debts" className="block text-sm font-medium text-gray-700">Party One Debts</label>
              <textarea id="party1Debts" name="party1Debts" value={formData.party1Debts} onChange={handleChange} rows={3} placeholder="e.g., Student loans: $45k, Credit cards: $5k, Car loan: $18k" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="party2Assets" className="block text-sm font-medium text-gray-700">Party Two Assets</label>
              <textarea id="party2Assets" name="party2Assets" value={formData.party2Assets} onChange={handleChange} rows={3} placeholder="e.g., Home: $380k, IRA: $95k, Savings: $40k, Business interest: $200k" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="party2Debts" className="block text-sm font-medium text-gray-700">Party Two Debts</label>
              <textarea id="party2Debts" name="party2Debts" value={formData.party2Debts} onChange={handleChange} rows={3} placeholder="e.g., Mortgage: $280k, Business loan: $75k" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Property & Debt Provisions</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="separateProperty" className="block text-sm font-medium text-gray-700">Separate Property</label>
              <textarea id="separateProperty" name="separateProperty" value={formData.separateProperty} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="maritalProperty" className="block text-sm font-medium text-gray-700">Marital Property</label>
              <textarea id="maritalProperty" name="maritalProperty" value={formData.maritalProperty} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="propertyDivision" className="block text-sm font-medium text-gray-700">Property Division on Divorce</label>
              <textarea id="propertyDivision" name="propertyDivision" value={formData.propertyDivision} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="debtResponsibility" className="block text-sm font-medium text-gray-700">Debt Responsibility</label>
              <textarea id="debtResponsibility" name="debtResponsibility" value={formData.debtResponsibility} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Support, Inheritance & Special Assets</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="spousalSupport" className="block text-sm font-medium text-gray-700">Spousal Support / Alimony</label>
              <textarea id="spousalSupport" name="spousalSupport" value={formData.spousalSupport} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="inheritanceRights" className="block text-sm font-medium text-gray-700">Inheritance Rights</label>
              <textarea id="inheritanceRights" name="inheritanceRights" value={formData.inheritanceRights} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="businessInterests" className="block text-sm font-medium text-gray-700">Business Interests</label>
              <textarea id="businessInterests" name="businessInterests" value={formData.businessInterests} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="retirementAccounts" className="block text-sm font-medium text-gray-700">Retirement Accounts</label>
              <textarea id="retirementAccounts" name="retirementAccounts" value={formData.retirementAccounts} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="lifeInsurance" className="block text-sm font-medium text-gray-700">Life Insurance</label>
              <textarea id="lifeInsurance" name="lifeInsurance" value={formData.lifeInsurance} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">6. General Provisions</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="disputeResolution" className="block text-sm font-medium text-gray-700">Dispute Resolution</label>
              <textarea id="disputeResolution" name="disputeResolution" value={formData.disputeResolution} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="sunsetClause" className="block text-sm font-medium text-gray-700">Sunset Clause (Optional)</label>
              <textarea id="sunsetClause" name="sunsetClause" value={formData.sunsetClause} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Prenuptial Agreement
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Prenuptial Agreements
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