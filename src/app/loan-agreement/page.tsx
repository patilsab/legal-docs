"use client";

import { generatePdf } from "@/lib/pdf-builder";
import { useState } from "react";
import { US_STATES, getStateLegalNotes, getStateName, type StateAbbr } from "@/lib/state-engine";

type FormData = {
  lenderName: string;
  lenderAddress: string;
  borrowerName: string;
  borrowerAddress: string;
  principalAmount: string;
  interestRate: string;
  loanStartDate: string;
  loanEndDate: string;
  paymentFrequency: string;
  paymentAmount: string;
  state: StateAbbr;
};

const faqs = [
  {
    q: "What is a loan agreement?",
    a: "A loan agreement is a legally binding contract between a lender and a borrower that formalizes the terms of a loan. It specifies the principal amount, interest rate, repayment schedule, and consequences of default."
  },
  {
    q: "Is a loan agreement the same as a promissory note?",
    a: "No. A promissory note is a simpler document where the borrower promises to repay. A loan agreement is more comprehensive, including detailed terms, covenants, representations, warranties, and default provisions. Loan agreements are used for larger or more complex loans."
  },
  {
    q: "What interest rate can I charge?",
    a: "Interest rates are governed by state usury laws, which set maximum allowable rates. These vary significantly by state and loan type (consumer vs. business). Charging above the legal limit can make the loan unenforceable or result in penalties. Always check your state's current usury statute."
  },
  {
    q: "What happens if the borrower defaults?",
    a: "Upon default, the lender typically has the right to accelerate the loan (demand immediate repayment of the full balance), charge late fees, and pursue collection through legal action. If the loan is secured, the lender may foreclose on or repossess the collateral."
  },
  {
    q: "Does a loan agreement need to be notarized?",
    a: "Notarization is not always legally required for a loan agreement to be valid, but it is strongly recommended. Notarization provides evidence of authentic signatures and makes the document more enforceable in court. Some states require notarization for loans secured by real estate."
  },
  {
    q: "Can a loan agreement be modified after signing?",
    a: "Yes, but modifications must be in writing and signed by both parties. Oral modifications are generally not enforceable. A written amendment or addendum should reference the original agreement, state the changes clearly, and be executed with the same formalities."
  },
];

export default function LoanAgreementPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    lenderName: "",
    lenderAddress: "",
    borrowerName: "",
    borrowerAddress: "",
    principalAmount: "",
    interestRate: "",
    loanStartDate: "",
    loanEndDate: "",
    paymentFrequency: "monthly",
    paymentAmount: "",
    state: "CA",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "state") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${getStateName(selectedState)} Loan Agreement`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Lender Information", fields: [
          { label: "Full Legal Name", value: formData.lenderName },
          { label: "Address", value: formData.lenderAddress },
        ]},
        { heading: "Borrower Information", fields: [
          { label: "Full Legal Name", value: formData.borrowerName },
          { label: "Address", value: formData.borrowerAddress },
        ]},
        { heading: "Loan Terms", fields: [
          { label: "Principal Amount", value: `$${formData.principalAmount}` },
          { label: "Annual Interest Rate", value: `${formData.interestRate}%` },
          { label: "Loan Start Date", value: formData.loanStartDate },
          { label: "Loan Maturity Date", value: formData.loanEndDate },
          { label: "Payment Frequency", value: formData.paymentFrequency },
          { label: "Payment Amount", value: `$${formData.paymentAmount}` },
        ]},
      ],
      fileName: "loan-agreement.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/loan-agreement" className="hover:text-primary-600">Loan Agreement</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Loan Agreement
      </h1>
      <p className="mt-2 text-gray-600">
        Create a comprehensive loan agreement for {getStateName(selectedState)}. Define terms, interest, and repayment schedule.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This loan agreement template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Usury laws and lending regulations vary by state. You should consult with a licensed attorney
        in your jurisdiction before using this template. LegalDocs is not a law firm and does not
        provide legal representation.
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
            <label htmlFor="lenderName" className="block text-sm font-medium text-gray-700">
              Lender Full Legal Name
            </label>
            <input
              id="lenderName"
              name="lenderName"
              type="text"
              value={formData.lenderName}
              onChange={handleChange}
              placeholder="e.g., Jane Doe"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="borrowerName" className="block text-sm font-medium text-gray-700">
              Borrower Full Legal Name
            </label>
            <input
              id="borrowerName"
              name="borrowerName"
              type="text"
              value={formData.borrowerName}
              onChange={handleChange}
              placeholder="e.g., John Smith"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="lenderAddress" className="block text-sm font-medium text-gray-700">
              Lender Address
            </label>
            <textarea
              id="lenderAddress"
              name="lenderAddress"
              value={formData.lenderAddress}
              onChange={handleChange}
              placeholder="e.g., 123 Main Street, Springfield, IL 62701"
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="borrowerAddress" className="block text-sm font-medium text-gray-700">
              Borrower Address
            </label>
            <textarea
              id="borrowerAddress"
              name="borrowerAddress"
              value={formData.borrowerAddress}
              onChange={handleChange}
              placeholder="e.g., 456 Oak Avenue, Springfield, IL 62701"
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="principalAmount" className="block text-sm font-medium text-gray-700">
              Principal Amount ($)
            </label>
            <input
              id="principalAmount"
              name="principalAmount"
              type="number"
              min="0"
              step="0.01"
              value={formData.principalAmount}
              onChange={handleChange}
              placeholder="e.g., 10000.00"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
              Annual Interest Rate (%)
            </label>
            <input
              id="interestRate"
              name="interestRate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={formData.interestRate}
              onChange={handleChange}
              placeholder="e.g., 5.5"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="loanStartDate" className="block text-sm font-medium text-gray-700">
              Loan Start Date
            </label>
            <input
              id="loanStartDate"
              name="loanStartDate"
              type="date"
              value={formData.loanStartDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="loanEndDate" className="block text-sm font-medium text-gray-700">
              Loan Maturity Date
            </label>
            <input
              id="loanEndDate"
              name="loanEndDate"
              type="date"
              value={formData.loanEndDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="paymentFrequency" className="block text-sm font-medium text-gray-700">
              Payment Frequency
            </label>
            <select
              id="paymentFrequency"
              name="paymentFrequency"
              value={formData.paymentFrequency}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
              required
            >
              <option value="monthly">Monthly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="weekly">Weekly</option>
              <option value="quarterly">Quarterly</option>
              <option value="lump-sum">Lump Sum at Maturity</option>
            </select>
          </div>

          <div>
            <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">
              Payment Amount ($)
            </label>
            <input
              id="paymentAmount"
              name="paymentAmount"
              type="number"
              min="0"
              step="0.01"
              value={formData.paymentAmount}
              onChange={handleChange}
              placeholder="e.g., 200.00"
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
            📄 Download PDF Loan Agreement
          </button>
        </div>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">
          {getStateName(selectedState)} Lending Legal Notes
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Key legal requirements for loan agreements in {getStateName(selectedState)}:
        </p>
        <ul className="mt-4 space-y-3">
          {getStateLegalNotes("loan-agreement", selectedState).map((note, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-700">
              <span className="mr-2 mt-0.5 text-primary-600">●</span>
              {note}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Loan Agreements
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
