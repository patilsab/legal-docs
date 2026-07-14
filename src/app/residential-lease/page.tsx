"use client";

import { generatePdf } from "@/lib/pdf-builder";
import { useState } from "react";
import { US_STATES, getStateLegalNotes, getStateName, type StateAbbr } from "@/lib/state-engine";

type FormData = {
  landlordName: string;
  tenantName: string;
  propertyAddress: string;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: string;
  securityDeposit: string;
  state: StateAbbr;
};

const faqs = [
  {
    q: "What is a residential lease agreement?",
    a: "A residential lease agreement is a legally binding contract between a landlord and a tenant that outlines the terms and conditions of renting a residential property. It specifies the rent amount, lease duration, security deposit, and rules for living in the property."
  },
  {
    q: "Is a written lease agreement required by law?",
    a: "While most states allow oral leases for terms under one year, a written lease is strongly recommended. Written agreements protect both parties by clearly documenting the terms of the tenancy and reducing the risk of disputes."
  },
  {
    q: "What should be included in a lease agreement?",
    a: "A comprehensive lease agreement should include: names of landlord and tenant, property address, lease term dates, rent amount and due date, security deposit details, maintenance responsibilities, rules about pets and alterations, and termination procedures."
  },
  {
    q: "Can a landlord increase rent during the lease term?",
    a: "Generally, no. Rent is fixed for the duration of the lease term unless the lease includes a specific clause allowing mid-term rent adjustments. After the lease expires, the landlord may increase rent for a renewal, subject to applicable state or local rent control laws."
  },
  {
    q: "What happens if a tenant breaks the lease early?",
    a: "Breaking a lease early typically results in financial penalties. The tenant may be responsible for remaining rent, reletting fees, or forfeiting the security deposit. Some states allow early termination for specific reasons such as military deployment, domestic violence, or uninhabitable conditions."
  },
  {
    q: "How much can a landlord charge for a security deposit?",
    a: "Security deposit limits vary by state. For example, California limits deposits to 2 months' rent (unfurnished) or 3 months' rent (furnished), New York caps it at one month, while Texas has no statutory limit. Always check your state's specific laws for current requirements."
  },
];

export default function ResidentialLeasePage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    landlordName: "",
    tenantName: "",
    propertyAddress: "",
    leaseStartDate: "",
    leaseEndDate: "",
    monthlyRent: "",
    securityDeposit: "",
    state: "CA",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "state") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${getStateName(selectedState)} Residential Lease Agreement`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Party Information", fields: [
          { label: "Landlord Name", value: formData.landlordName },
          { label: "Tenant Name", value: formData.tenantName },
        ]},
        { heading: "Property Information", fields: [
          { label: "Property Address", value: formData.propertyAddress },
        ]},
        { heading: "Lease Terms", fields: [
          { label: "Lease Start Date", value: formData.leaseStartDate },
          { label: "Lease End Date", value: formData.leaseEndDate },
          { label: "Monthly Rent", value: `$${formData.monthlyRent}` },
          { label: "Security Deposit", value: `$${formData.securityDeposit}` },
        ]},
      ],
      fileName: "residential-lease-agreement.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/residential-lease" className="hover:text-primary-600">Residential Lease Agreement</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Residential Lease Agreement
      </h1>
      <p className="mt-2 text-gray-600">
        Create a professional residential lease agreement tailored to {getStateName(selectedState)} law. Fill in the details below and download your customized template.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This lease agreement template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Landlord-tenant laws vary by state, county, and municipality. You should consult with
        a licensed attorney in your jurisdiction before using this template. LegalDocs is not
        a law firm and does not provide legal representation.
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
            <label htmlFor="landlordName" className="block text-sm font-medium text-gray-700">
              Landlord Name
            </label>
            <input
              id="landlordName"
              name="landlordName"
              type="text"
              value={formData.landlordName}
              onChange={handleChange}
              placeholder="e.g., Jane Doe"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700">
              Tenant Name
            </label>
            <input
              id="tenantName"
              name="tenantName"
              type="text"
              value={formData.tenantName}
              onChange={handleChange}
              placeholder="e.g., John Smith"
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
              placeholder="e.g., 456 Oak Avenue, Suite 2B, Los Angeles, CA 90001"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="leaseStartDate" className="block text-sm font-medium text-gray-700">
              Lease Start Date
            </label>
            <input
              id="leaseStartDate"
              name="leaseStartDate"
              type="date"
              value={formData.leaseStartDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="leaseEndDate" className="block text-sm font-medium text-gray-700">
              Lease End Date
            </label>
            <input
              id="leaseEndDate"
              name="leaseEndDate"
              type="date"
              value={formData.leaseEndDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">
              Monthly Rent Amount ($)
            </label>
            <input
              id="monthlyRent"
              name="monthlyRent"
              type="number"
              min="0"
              step="0.01"
              value={formData.monthlyRent}
              onChange={handleChange}
              placeholder="e.g., 1500.00"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="securityDeposit" className="block text-sm font-medium text-gray-700">
              Security Deposit Amount ($)
            </label>
            <input
              id="securityDeposit"
              name="securityDeposit"
              type="number"
              min="0"
              step="0.01"
              value={formData.securityDeposit}
              onChange={handleChange}
              placeholder="e.g., 3000.00"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Lease Agreement
          </button>
        </div>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">
          {getStateName(selectedState)} Lease-Specific Legal Notes
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Key legal requirements for residential leases in {getStateName(selectedState)}:
        </p>
        <ul className="mt-4 space-y-3">
          {getStateLegalNotes("residential-lease", selectedState).map((note, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-700">
              <span className="mr-2 mt-0.5 text-primary-600">●</span>
              {note}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Lease Agreements
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
