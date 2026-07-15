"use client"

import { generatePdf } from "@/lib/pdf-builder"
import { useState } from "react"
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine"

type FormData = {
  grantorName: string
  grantorAddress: string
  grantorMaritalStatus: string
  granteeName: string
  granteeAddress: string
  granteeMaritalStatus: string
  propertyAddress: string
  propertyLegalDescription: string
  consideration: string
  state: StateAbbr
  warrantyType: string
}

const faqs = [
  {
    q: "What is a Warranty Deed?",
    a: "A Warranty Deed is a legal document that transfers ownership of real property from a grantor (seller) to a grantee (buyer) with certain guarantees. The grantor warrants that they hold clear title to the property and have the right to convey it, and that the property is free from encumbrances except as stated."
  },
  {
    q: "What is the difference between a General Warranty Deed and a Special Warranty Deed?",
    a: "A General Warranty Deed warrants against all title defects, even those that arose before the grantor owned the property. A Special Warranty Deed (or Limited Warranty Deed) only warrants against defects that arose during the grantor's ownership period. General provides more protection."
  },
  {
    q: "What covenants are included in a General Warranty Deed?",
    a: "Six traditional covenants: (1) Covenant of Seisin - grantor owns the property; (2) Covenant of Right to Convey - grantor has right to transfer; (3) Covenant Against Encumbrances - no liens/encumbrances except stated; (4) Covenant of Quiet Enjoyment - grantee won't be disturbed; (5) Covenant of Warranty - grantor will defend title; (6) Covenant of Further Assurances - grantor will execute additional documents if needed."
  },
  {
    q: "Does a Warranty Deed need to be notarized?",
    a: "Yes, in virtually all states, a deed must be signed by the grantor in the presence of a notary public to be valid and recordable. Some states also require witness signatures in addition to notarization."
  },
  {
    q: "What happens after signing a Warranty Deed?",
    a: "The deed should be recorded in the county recorder's office where the property is located. Recording provides constructive notice to the world and protects the grantee's interest against subsequent claims. The grantee typically pays recording fees."
  },
  {
    q: "Can a Warranty Deed be used to add someone to title?",
    a: "Yes, a property owner can use a Warranty Deed to convey an interest to themselves and another person as joint tenants or tenants in common. However, this may have gift tax implications and should be discussed with a tax advisor."
  },
]

export default function WarrantyDeedPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA")
  const [formData, setFormData] = useState<FormData>({
    grantorName: "",
    grantorAddress: "",
    grantorMaritalStatus: "",
    granteeName: "",
    granteeAddress: "",
    granteeMaritalStatus: "",
    propertyAddress: "",
    propertyLegalDescription: "",
    consideration: "$10.00 and other valuable consideration",
    state: "CA",
    warrantyType: "general",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "state") setSelectedState(value as StateAbbr)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await generatePdf({
      title: `${getStateName(selectedState)} ${formData.warrantyType === "general" ? "General" : "Special"} Warranty Deed`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Grantor (Seller)", fields: [
          { label: "Full Legal Name", value: formData.grantorName },
          { label: "Address", value: formData.grantorAddress },
          { label: "Marital Status", value: formData.grantorMaritalStatus },
        ]},
        { heading: "Grantee (Buyer)", fields: [
          { label: "Full Legal Name", value: formData.granteeName },
          { label: "Address", value: formData.granteeAddress },
          { label: "Marital Status", value: formData.granteeMaritalStatus },
        ]},
        { heading: "Property Information", fields: [
          { label: "Property Address", value: formData.propertyAddress },
          { label: "Legal Description", value: formData.propertyLegalDescription },
          { label: "Consideration", value: formData.consideration },
        ]},
        { heading: "Deed Type", fields: [
          { label: "Warranty Type", value: formData.warrantyType === "general" ? "General Warranty Deed" : "Special (Limited) Warranty Deed" },
        ]},
      ],
      fileName: "warranty-deed.pdf",
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/warranty-deed" className="hover:text-primary-600">Warranty Deed</a>
        <span className="mx-2">/</span>
        <a href={`/warranty-deed/${getStateName(selectedState).toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{getStateName(selectedState)}</a>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Warranty Deed
      </h1>
      <p className="mt-2 text-gray-600">
        Create a {" "}{formData.warrantyType === "general" ? "General" : "Special"}{" "}
        Warranty Deed to transfer real property in {getStateName(selectedState)} with full warranties.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This warranty deed template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Real estate conveyances have serious legal and tax consequences. Deed requirements vary by state and county.
        You must consult with a licensed attorney and/or title company in your jurisdiction before using.
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

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Warranty Type</label>
        <select
          value={formData.warrantyType}
          onChange={handleChange}
          name="warrantyType"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
        >
          <option value="general">General Warranty Deed (Full Warranties)</option>
          <option value="special">Special (Limited) Warranty Deed</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">1. Grantor Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="grantorName" className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input id="grantorName" name="grantorName" type="text" value={formData.grantorName} onChange={handleChange} placeholder="e.g., Jane Elizabeth Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="grantorAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="grantorAddress" name="grantorAddress" type="text" value={formData.grantorAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="grantorMaritalStatus" className="block text-sm font-medium text-gray-700">Marital Status</label>
              <select id="grantorMaritalStatus" name="grantorMaritalStatus" value={formData.grantorMaritalStatus} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Grantee Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="granteeName" className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input id="granteeName" name="granteeName" type="text" value={formData.granteeName} onChange={handleChange} placeholder="e.g., John Robert Smith" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="granteeAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="granteeAddress" name="granteeAddress" type="text" value={formData.granteeAddress} onChange={handleChange} placeholder="e.g., 456 Oak Ave, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="granteeMaritalStatus" className="block text-sm font-medium text-gray-700">Marital Status</label>
              <select id="granteeMaritalStatus" name="granteeMaritalStatus" value={formData.granteeMaritalStatus} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
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
            <div>
              <label htmlFor="consideration" className="block text-sm font-medium text-gray-700">Consideration</label>
              <input id="consideration" name="consideration" type="text" value={formData.consideration} onChange={handleChange} placeholder="e.g., $10.00 and other valuable consideration" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Warranty Deed
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Warranty Deeds
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