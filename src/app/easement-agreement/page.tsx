"use client"

import { generatePdf } from "@/lib/pdf-builder"
import { useState } from "react"
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine"

type FormData = {
  grantorName: string
  grantorAddress: string
  granteeName: string
  granteeAddress: string
  propertyAddress: string
  propertyLegalDescription: string
  easementAreaDescription: string
  easementType: string
  purpose: string
  duration: string
  widthDimensions: string
  locationDescription: string
  consideration: string
  maintenance: string
  insurance: string
  state: StateAbbr
}

const faqs = [
  {
    q: "What is an Easement?",
    a: "An easement is a non-possessory right to use someone else's land for a specific purpose. The grantor keeps ownership; the grantee gets limited use rights. Common: utility lines, driveways, pathways, drainage."
  },
  {
    q: "What are the main types of easements?",
    a: "(1) Appurtenant - benefits adjacent land, runs with the land (transfers with property). (2) In Gross - benefits a person/entity, not land (e.g., utility companies). (3) Prescriptive - acquired by open, notorious, continuous use. (3) By Necessity - landlocked parcel access."
  },
  {
    q: "What is the difference between exclusive and non-exclusive?",
    a: "Exclusive: only grantee can use the easement area. Non-exclusive: grantor can also use it (most common). Non-exclusive preserves more rights for the landowner."
  },
  {
    q: "How long does an easement last?",
    a: "Perpetual (forever) unless specified otherwise. Can be for a term of years, until a condition occurs, or until abandonment. Most real estate easements are perpetual and run with the land."
  },
  {
    q: "Who maintains the easement area?",
    a: "Negotiable. Usually grantee maintains for their use; grantor maintains surrounding area. Agreement should specify: who mows, repairs, clears snow, pays for improvements. Default: grantee maintains for their use."
  },
  {
    q: "Can an easement be terminated?",
    a: "Yes: by agreement, abandonment (non-use + intent), merger (same owner acquires both parcels), expiration of term, condemnation, or court order. Abandonment requires non-use PLUS intent to abandon."
  },
]

export default function EasementAgreementPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA")
  const [formData, setFormData] = useState<FormData>({
    grantorName: "",
    grantorAddress: "",
    granteeName: "",
    granteeAddress: "",
    propertyAddress: "",
    propertyLegalDescription: "",
    easementAreaDescription: "",
    easementType: "non_exclusive",
    purpose: "Ingress, egress, and utilities",
    duration: "perpetual",
    widthDimensions: "",
    locationDescription: "",
    consideration: "$10.00 and other valuable consideration",
    maintenance: "Grantee maintains easement area for their use; Grantor maintains surrounding property",
    insurance: "Grantee carries general liability insurance naming Grantor as additional insured",
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
      title: `${getStateName(selectedState)} Easement Agreement`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Grantor", fields: [
          { label: "Full Legal Name", value: formData.grantorName },
          { label: "Address", value: formData.grantorAddress },
        ]},
        { heading: "Grantee", fields: [
          { label: "Full Legal Name", value: formData.granteeName },
          { label: "Address", value: formData.granteeAddress },
        ]},
        { heading: "Property", fields: [
          { label: "Property Address", value: formData.propertyAddress },
          { label: "Legal Description", value: formData.propertyLegalDescription },
        ]},
        { heading: "Easement Details", fields: [
          { label: "Easement Area", value: formData.easementAreaDescription },
          { label: "Type", value: formData.easementType === "exclusive" ? "Exclusive" : "Non-Exclusive" },
          { label: "Purpose", value: formData.purpose },
          { label: "Duration", value: formData.duration === "perpetual" ? "Perpetual (runs with the land)" : `Term: ${formData.duration}` },
          { label: "Width/Dimensions", value: formData.widthDimensions },
          { label: "Location Description", value: formData.locationDescription },
          { label: "Consideration", value: formData.consideration },
        ]},
        { heading: "Maintenance & Insurance", fields: [
          { label: "Maintenance", value: formData.maintenance },
          { label: "Insurance", value: formData.insurance },
        ]},
      ],
      fileName: "easement-agreement.pdf",
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/easement-agreement" className="hover:text-primary-600">Easement Agreement</a>
        <span className="mx-2">/</span>
        <a href={`/easement-agreement/${getStateName(selectedState).toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{getStateName(selectedState)}</a>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Easement Agreement
      </h1>
      <p className="mt-2 text-gray-600">
        Grant or receive rights to use property for access, utilities, drainage, or other purposes.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This easement agreement template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Easements affect property rights permanently. Recording requirements, survey needs, and title implications
        vary by state. You must consult with a licensed attorney and title company before executing.
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
          <h2 className="text-xl font-bold text-gray-900">1. Grantor (Property Owner)</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="grantorName" className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input id="grantorName" name="grantorName" type="text" value={formData.grantorName} onChange={handleChange} placeholder="e.g., Jane Elizabeth Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="grantorAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="grantorAddress" name="grantorAddress" type="text" value={formData.grantorAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Grantee (Easement Holder)</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="granteeName" className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input id="granteeName" name="granteeName" type="text" value={formData.granteeName} onChange={handleChange} placeholder="e.g., John Robert Smith" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="granteeAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="granteeAddress" name="granteeAddress" type="text" value={formData.granteeAddress} onChange={handleChange} placeholder="e.g., 456 Oak Ave, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
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
          <h2 className="text-xl font-bold text-gray-900">4. Easement Details</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="easementAreaDescription" className="block text-sm font-medium text-gray-700">Easement Area Description</label>
              <textarea id="easementAreaDescription" name="easementAreaDescription" value={formData.easementAreaDescription} onChange={handleChange} rows={3} placeholder="e.g., A 20-foot wide strip along the north boundary for driveway and utility access" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="easementType" className="block text-sm font-medium text-gray-700">Easement Type</label>
              <select id="easementType" name="easementType" value={formData.easementType} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="non_exclusive">Non-Exclusive (Grantor may also use)</option>
                <option value="exclusive">Exclusive (Only Grantee may use)</option>
              </select>
            </div>
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Purpose</label>
              <select id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="Ingress, egress, and utilities">Ingress, egress, and utilities</option>
                <option value="Driveway access only">Driveway access only</option>
                <option value="Utility lines">Utility lines (electric, gas, water, sewer)</option>
                <option value="Drainage">Drainage/stormwater</option>
                <option value="Pedestrian pathway">Pedestrian pathway</option>
                <option value="Custom">Custom (specify below)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="customPurpose" className="block text-sm font-medium text-gray-700">Custom Purpose (if selected above)</label>
              <input id="customPurpose" name="customPurpose" type="text" value={formData.purpose === "Custom" ? formData.purpose : ""} onChange={handleChange} placeholder="e.g., Solar access, septic drain field, conservation" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
              <select id="duration" name="duration" value={formData.duration} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="perpetual">Perpetual (runs with the land)</option>
                <option value="term">Term of years (specify below)</option>
                <option value="conditional">Until condition occurs (specify below)</option>
              </select>
            </div>
            <div>
              <label htmlFor="widthDimensions" className="block text-sm font-medium text-gray-700">Width/Dimensions</label>
              <input id="widthDimensions" name="widthDimensions" type="text" value={formData.widthDimensions} onChange={handleChange} placeholder="e.g., 20 feet wide, 150 feet long" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="locationDescription" className="block text-sm font-medium text-gray-700">Location Description</label>
              <textarea id="locationDescription" name="locationDescription" value={formData.locationDescription} onChange={handleChange} rows={3} placeholder="e.g., Beginning at the NW corner of Lot 12, thence East 20 feet along the north boundary..." className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="consideration" className="block text-sm font-medium text-gray-700">Consideration</label>
              <input id="consideration" name="consideration" type="text" value={formData.consideration} onChange={handleChange} placeholder="e.g., $10.00 and other valuable consideration" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Maintenance & Insurance</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="maintenance" className="block text-sm font-medium text-gray-700">Maintenance Responsibilities</label>
              <textarea id="maintenance" name="maintenance" value={formData.maintenance} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="insurance" className="block text-sm font-medium text-gray-700">Insurance Requirements</label>
              <textarea id="insurance" name="insurance" value={formData.insurance} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Easement Agreement
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Easements
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