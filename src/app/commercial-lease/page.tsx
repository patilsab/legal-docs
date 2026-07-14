"use client";

import { generatePdf } from "@/lib/pdf-builder";
import { useState } from "react";
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine";

type FormData = {
  propertyAddress: string;
  propertyDescription: string;
  leaseStartDate: string;
  leaseEndDate: string;
  baseRent: string;
  rentFrequency: string;
  securityDeposit: string;
  rentEscalation: string;
  operatingExpenses: string;
  camCharges: string;
  useClause: string;
  improvements: string;
  parking: string;
  subletting: string;
  defaultProvisions: string;
  insurance: string;
};

const faqs = [
  {
    q: "What is a Commercial Lease Agreement?",
    a: "A Commercial Lease Agreement is a legally binding contract between a landlord and business tenant for the rental of commercial property (office, retail, industrial, warehouse). Unlike residential leases, commercial leases have fewer consumer protections and are highly negotiable."
  },
  {
    q: "What are the main types of commercial leases?",
    a: "Gross Lease: Tenant pays base rent, landlord pays all operating expenses. Net Lease (NNN): Tenant pays base rent + pro-rata share of taxes, insurance, maintenance. Modified Gross: Hybrid where some expenses are shared. Percentage Lease: Base rent + % of tenant's gross sales (common in retail)."
  },
  {
    q: "What is CAM (Common Area Maintenance)?",
    a: "CAM charges cover shared property expenses: parking lot maintenance, landscaping, security, common area utilities, property management fees, and administrative costs. Tenants pay their pro-rata share based on leased square footage. Annual reconciliation is standard."
  },
  {
    q: "What are Tenant Improvements (TI)?",
    a: "TI are customizations to the space for the tenant's business needs (walls, HVAC, electrical, finishes). Landlords often provide a TI allowance ($/sq ft). Improvements typically become landlord property at lease end unless otherwise negotiated."
  },
  {
    q: "How do rent escalations work?",
    a: "Common methods: Fixed percentage (e.g., 3% annually), CPI/COLA adjustments, stepped rents (set increases at specific intervals), or fair market value resets at renewal. Escalations protect landlord against inflation; caps protect tenant."
  },
  {
    q: "What happens if a commercial tenant defaults?",
    a: "Landlord remedies: lockout (in some states), acceleration of future rent, draw on security deposit, sue for damages, terminate lease, re-let space and charge difference. Commercial evictions are faster than residential in most states. Personal guarantees are common."
  },
];

export default function CommercialLeasePage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    propertyAddress: "",
    propertyDescription: "",
    leaseStartDate: "",
    leaseEndDate: "",
    baseRent: "",
    rentFrequency: "monthly",
    securityDeposit: "",
    rentEscalation: "3% annually on anniversary date",
    operatingExpenses: "NNN - Tenant pays pro-rata share of taxes, insurance, maintenance",
    camCharges: "Tenant pays pro-rata share of CAM expenses with annual reconciliation",
    useClause: "General office/retail use consistent with zoning",
    improvements: "Landlord provides TI allowance per schedule. Improvements become landlord property at lease end.",
    parking: "Per attached parking schedule",
    subletting: "Not permitted without landlord prior written consent, not to be unreasonably withheld",
    defaultProvisions: "Rent: 10-day cure after written notice. Other defaults: 30-day cure. Landlord may: accelerate rent, terminate, draw on deposit, recover attorney fees.",
    insurance: "Tenant: $1M general liability, $500k property on improvements, workers comp. Landlord: building insurance. Mutual waiver of subrogation.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "state") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${getStateName(selectedState)} Commercial Lease Agreement`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Premises", fields: [
          { label: "Property Address", value: formData.propertyAddress },
          { label: "Premises Description", value: formData.propertyDescription },
        ]},
        { heading: "Lease Term", fields: [
          { label: "Commencement Date", value: formData.leaseStartDate },
          { label: "Expiration Date", value: formData.leaseEndDate },
        ]},
        { heading: "Base Rent", fields: [
          { label: "Base Rent", value: `$${formData.baseRent} ${formData.rentFrequency}` },
          { label: "Rent Escalation", value: formData.rentEscalation },
          { label: "Security Deposit", value: `$${formData.securityDeposit}` },
        ]},
        { heading: "Additional Rent", fields: [
          { label: "Operating Expenses", value: formData.operatingExpenses },
          { label: "CAM Charges", value: formData.camCharges },
        ]},
        { heading: "Use & Operations", fields: [
          { label: "Permitted Use", value: formData.useClause },
          { label: "Tenant Improvements", value: formData.improvements },
          { label: "Parking", value: formData.parking },
          { label: "Subletting/Assignment", value: formData.subletting },
        ]},
        { heading: "Default & Insurance", fields: [
          { label: "Default Provisions", value: formData.defaultProvisions },
          { label: "Insurance Requirements", value: formData.insurance },
        ]},
      ],
      fileName: "commercial-lease-agreement.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/commercial-lease" className="hover:text-primary-600">Commercial Lease</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Commercial Lease Agreement
      </h1>
      <p className="mt-2 text-gray-600">
        Create a comprehensive commercial lease for {getStateName(selectedState)}. Covers office, retail, industrial, and warehouse spaces with NNN, gross, and modified gross options.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This commercial lease template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Commercial leases are complex, highly negotiable, and have significant financial implications.
        Both parties should consult with licensed attorneys in your jurisdiction before signing.
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
          <h2 className="text-xl font-bold text-gray-900">1. Premises</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700">Property Address</label>
              <input id="propertyAddress" name="propertyAddress" type="text" value={formData.propertyAddress} onChange={handleChange} placeholder="e.g., 789 Commerce Way, Suite 100, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="propertyDescription" className="block text-sm font-medium text-gray-700">Premises Description</label>
              <textarea id="propertyDescription" name="propertyDescription" value={formData.propertyDescription} onChange={handleChange} rows={3} placeholder="e.g., Suite 100, approx. 2,500 rentable sq ft, including 2 private offices, conference room, reception, kitchenette, 2 ADA restrooms" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Lease Term</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="leaseStartDate" className="block text-sm font-medium text-gray-700">Commencement Date</label>
              <input id="leaseStartDate" name="leaseStartDate" type="date" value={formData.leaseStartDate} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="leaseEndDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
              <input id="leaseEndDate" name="leaseEndDate" type="date" value={formData.leaseEndDate} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Base Rent</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="baseRent" className="block text-sm font-medium text-gray-700">Base Rent Amount</label>
              <input id="baseRent" name="baseRent" type="number" min="0" step="0.01" value={formData.baseRent} onChange={handleChange} placeholder="e.g., 5000.00" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="rentFrequency" className="block text-sm font-medium text-gray-700">Frequency</label>
              <select id="rentFrequency" name="rentFrequency" value={formData.rentFrequency} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <div>
              <label htmlFor="securityDeposit" className="block text-sm font-medium text-gray-700">Security Deposit</label>
              <input id="securityDeposit" name="securityDeposit" type="number" min="0" step="0.01" value={formData.securityDeposit} onChange={handleChange} placeholder="e.g., 15000.00" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="rentEscalation" className="block text-sm font-medium text-gray-700">Rent Escalation</label>
              <input id="rentEscalation" name="rentEscalation" type="text" value={formData.rentEscalation} onChange={handleChange} placeholder="e.g., 3% annually on anniversary date, or CPI adjustment" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Additional Rent (Operating Expenses & CAM)</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="operatingExpenses" className="block text-sm font-medium text-gray-700">Operating Expenses</label>
              <input id="operatingExpenses" name="operatingExpenses" type="text" value={formData.operatingExpenses} onChange={handleChange} placeholder="e.g., NNN - Tenant pays pro-rata share of taxes, insurance, maintenance" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="camCharges" className="block text-sm font-medium text-gray-700">CAM Charges</label>
              <input id="camCharges" name="camCharges" type="text" value={formData.camCharges} onChange={handleChange} placeholder="e.g., Tenant pays pro-rata share of CAM expenses with annual reconciliation" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Use, Improvements & Operations</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="useClause" className="block text-sm font-medium text-gray-700">Permitted Use</label>
              <input id="useClause" name="useClause" type="text" value={formData.useClause} onChange={handleChange} placeholder="e.g., General office use for software development and administrative purposes" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="improvements" className="block text-sm font-medium text-gray-700">Tenant Improvements</label>
              <textarea id="improvements" name="improvements" value={formData.improvements} onChange={handleChange} rows={3} placeholder="e.g., Landlord provides $20/sf TI allowance. Improvements become landlord property at lease end. Plans require landlord approval." className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="parking" className="block text-sm font-medium text-gray-700">Parking</label>
              <input id="parking" name="parking" type="text" value={formData.parking} onChange={handleChange} placeholder="e.g., 5 reserved spaces in lot, 2 visitor spaces" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="subletting" className="block text-sm font-medium text-gray-700">Subletting / Assignment</label>
              <input id="subletting" name="subletting" type="text" value={formData.subletting} onChange={handleChange} placeholder="e.g., Not permitted without landlord's prior written consent, not to be unreasonably withheld" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">6. Default & Insurance</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="defaultProvisions" className="block text-sm font-medium text-gray-700">Default Provisions</label>
              <textarea id="defaultProvisions" name="defaultProvisions" value={formData.defaultProvisions} onChange={handleChange} rows={3} placeholder="e.g., Rent: 10-day cure period after written notice. Other: 30-day cure. Landlord may: accelerate rent, terminate lease, draw on deposit, recover attorney fees." className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="insurance" className="block text-sm font-medium text-gray-700">Insurance Requirements</label>
              <textarea id="insurance" name="insurance" value={formData.insurance} onChange={handleChange} rows={3} placeholder="e.g., Tenant: $1M general liability, $500k property on improvements, workers comp. Landlord: building insurance. Mutual waiver of subrogation." className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Commercial Lease Agreement
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Commercial Leases
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