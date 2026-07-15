"use client"

import { generatePdf } from "@/lib/pdf-builder"
import { useState } from "react"
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine"

type FormData = {
  sellerName: string
  sellerAddress: string
  buyerName: string
  buyerAddress: string
  propertyAddress: string
  propertyLegalDescription: string
  purchasePrice: string
  downPayment: string
  interestRate: string
  loanTermYears: string
  monthlyPayment: string
  balloonPayment: string
  state: StateAbbr
}

const faqs = [
  {
    q: "What is a Contract for Deed (Land Contract)?",
    a: "A Contract for Deed (also called Land Contract or Installment Contract) is a financing arrangement where the seller retains legal title until the buyer pays the full purchase price. The buyer gets equitable title and possession, making payments over time. When fully paid, the seller delivers a deed."
  },
  {
    q: "How does it differ from a traditional mortgage?",
    a: "With a mortgage, the buyer gets legal title immediately and the lender has a lien. With a Contract for Deed, the seller retains legal title until full payment. The buyer has equitable title and possession but cannot sell or refinance without seller cooperation. Fewer regulations but fewer buyer protections."
  },
  {
    q: "What happens if the buyer defaults?",
    a: "The seller can typically terminate the contract, keep payments made as liquidated damages, and reclaim possession. Many states require a foreclosure-like process rather than simple eviction. The buyer may have a right to cure within a statutory period."
  },
  {
    q: "Who pays property taxes and insurance?",
    a: "Typically the buyer pays property taxes, insurance, and maintenance during the contract term, even though the seller holds legal title. The contract should specify these obligations clearly."
  },
  {
    q: "Can the buyer sell or transfer their interest?",
    a: "Usually requires seller's written consent. Some contracts prohibit assignment entirely. If allowed, the buyer may sell their equitable interest, but the new buyer steps into the same contract terms."
  },
  {
    q: "What happens when the contract is paid in full?",
    a: "The seller must execute and deliver a deed (typically Warranty Deed) conveying legal title to the buyer. The deed should be recorded. The contract is then satisfied and released of record."
  },
]

export default function ContractForDeedPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA")
  const [formData, setFormData] = useState<FormData>({
    sellerName: "",
    sellerAddress: "",
    buyerName: "",
    buyerAddress: "",
    propertyAddress: "",
    propertyLegalDescription: "",
    purchasePrice: "",
    downPayment: "",
    interestRate: "",
    loanTermYears: "",
    monthlyPayment: "",
    balloonPayment: "",
    state: "CA",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "state") setSelectedState(value as StateAbbr)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await generatePdf({
      title: `${getStateName(selectedState)} Contract for Deed (Land Contract)`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Seller (Vendor)", fields: [
          { label: "Full Legal Name", value: formData.sellerName },
          { label: "Address", value: formData.sellerAddress },
        ]},
        { heading: "Buyer (Vendee)", fields: [
          { label: "Full Legal Name", value: formData.buyerName },
          { label: "Address", value: formData.buyerAddress },
        ]},
        { heading: "Property Information", fields: [
          { label: "Property Address", value: formData.propertyAddress },
          { label: "Legal Description", value: formData.propertyLegalDescription },
        ]},
        { heading: "Financial Terms", fields: [
          { label: "Purchase Price", value: `$${formData.purchasePrice}` },
          { label: "Down Payment", value: `$${formData.downPayment}` },
          { label: "Interest Rate", value: `${formData.interestRate}%` },
          { label: "Loan Term", value: `${formData.loanTermYears} years` },
          { label: "Monthly Payment", value: `$${formData.monthlyPayment}` },
          { label: "Balloon Payment", value: formData.balloonPayment || "None" },
        ]},
      ],
      fileName: "contract-for-deed.pdf",
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/contract-for-deed" className="hover:text-primary-600">Contract for Deed</a>
        <span className="mx-2">/</span>
        <a href={`/contract-for-deed/${getStateName(selectedState).toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{getStateName(selectedState)}</a>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Contract for Deed (Land Contract)
      </h1>
      <p className="mt-2 text-gray-600">
        Create a seller-financed land contract for {getStateName(selectedState)}. Seller retains title until full payment.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This contract for deed template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Seller-financing arrangements have significant legal, tax, and foreclosure implications that vary by state.
        Many states have specific statutory requirements for installment land contracts.
        You must consult with a licensed attorney in your jurisdiction before using.
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
          <h2 className="text-xl font-bold text-gray-900">1. Seller (Vendor) Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="sellerName" className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input id="sellerName" name="sellerName" type="text" value={formData.sellerName} onChange={handleChange} placeholder="e.g., Jane Elizabeth Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="sellerAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="sellerAddress" name="sellerAddress" type="text" value={formData.sellerAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Buyer (Vendee) Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input id="buyerName" name="buyerName" type="text" value={formData.buyerName} onChange={handleChange} placeholder="e.g., John Robert Smith" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="buyerAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="buyerAddress" name="buyerAddress" type="text" value={formData.buyerAddress} onChange={handleChange} placeholder="e.g., 456 Oak Ave, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Property Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700">Property Address</label>
              <input id="propertyAddress" name="propertyAddress" type="text" value={formData.propertyAddress} onChange={handleChange} placeholder="e.g., 789 Elm Street, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="propertyLegalDescription" className="block text-sm font-medium text-gray-700">Legal Description</label>
              <textarea id="propertyLegalDescription" name="propertyLegalDescription" value={formData.propertyLegalDescription} onChange={handleChange} rows={4} placeholder="e.g., Lot 12, Block 3, Oakwood Subdivision, according to the plat recorded in Book 45, Page 12, Sangamon County Records" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Financial Terms</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Purchase Price</label>
              <input id="purchasePrice" name="purchasePrice" type="number" min="0" step="0.01" value={formData.purchasePrice} onChange={handleChange} placeholder="e.g., 150000.00" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700">Down Payment</label>
              <input id="downPayment" name="downPayment" type="number" min="0" step="0.01" value={formData.downPayment} onChange={handleChange} placeholder="e.g., 15000.00" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
              <input id="interestRate" name="interestRate" type="number" min="0" max="30" step="0.125" value={formData.interestRate} onChange={handleChange} placeholder="e.g., 6.5" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="loanTermYears" className="block text-sm font-medium text-gray-700">Loan Term (Years)</label>
              <input id="loanTermYears" name="loanTermYears" type="number" min="1" max="30" value={formData.loanTermYears} onChange={handleChange} placeholder="e.g., 15" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="monthlyPayment" className="block text-sm font-medium text-gray-700">Monthly Payment</label>
              <input id="monthlyPayment" name="monthlyPayment" type="number" min="0" step="0.01" value={formData.monthlyPayment} onChange={handleChange} placeholder="e.g., 1265.79" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="balloonPayment" className="block text-sm font-medium text-gray-700">Balloon Payment (Optional)</label>
              <input id="balloonPayment" name="balloonPayment" type="text" value={formData.balloonPayment} onChange={handleChange} placeholder="e.g., $50,000 due at month 60, or 'None'" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Contract for Deed
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Contracts for Deed
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
  )
}