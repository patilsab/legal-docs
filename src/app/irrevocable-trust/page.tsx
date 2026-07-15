"use client"

import { generatePdf } from "@/lib/pdf-builder"
import { useState } from "react"
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine"

type FormData = {
  grantorName: string
  grantorAddress: string
  state: StateAbbr
  trustName: string
  trustDate: string
  trustType: string
  trusteeName: string
  trusteeAddress: string
  successorTrustee1: string
  successorTrustee1Address: string
  successorTrustee2: string
  successorTrustee2Address: string
  beneficiary1Name: string
  beneficiary1Relationship: string
  beneficiary1Share: string
  beneficiary1Distribution: string
  beneficiary2Name: string
  beneficiary2Relationship: string
  beneficiary2Share: string
  beneficiary2Distribution: string
  beneficiary3Name: string
  beneficiary3Relationship: string
  beneficiary3Share: string
  beneficiary3Distribution: string
  trustAssets: string
  spendthrift: string
  trusteePowers: string
  governingLaw: string
  revocation: string
}

const faqs = [
  {
    q: "What is an Irrevocable Trust?",
    a: "An Irrevocable Trust cannot be modified, amended, or revoked by the grantor after creation (with very limited exceptions). The grantor permanently gives up control. Used for: estate tax reduction, Medicaid planning, asset protection, charitable giving, special needs planning."
  },
  {
    q: "How is it different from a Revocable Living Trust?",
    a: "Revocable = you keep control, can change anytime, no tax benefit, no asset protection. Irrevocable = you give up control, generally cannot change, potential estate tax benefits, asset protection, Medicaid planning. Irrevocable is a completed gift for tax purposes."
  },
  {
    q: "What are common types of Irrevocable Trusts?",
    a: "ILIT (Irrevocable Life Insurance Trust) - holds life insurance outside estate. Medicaid Asset Protection Trust - for long-term care eligibility. Charitable Remainder Trust - income to you, remainder to charity. Special Needs Trust - for disabled beneficiary. GRAT/QPRT - estate tax planning. Dynasty Trust - multi-generational."
  },
  {
    q: "Can an Irrevocable Trust ever be changed?",
    a: "Limited options: (1) All beneficiaries consent + court approval. (2) Trust protector provisions. (3) Decanting (pour assets into new trust) - some states. (4) Judicial modification for changed circumstances. Very difficult compared to revocable trust."
  },
  {
    q: "What are the tax implications?",
    a: "Grantor makes completed gift - uses lifetime exemption ($13.61M in 2024). Trust gets own EIN, files Form 1041. Income distributed to beneficiaries taxed to them. Undistributed income taxed at trust rates (compressed brackets). Can be grantor trust for income tax if designed correctly."
  },
  {
    q: "Who should be trustee?",
    a: "NOT the grantor (would make it grantor trust with estate inclusion). Independent trustee: trusted family member, professional (trust company, attorney, CPA), or co-trustees. Must be someone who will follow trust terms faithfully."
  },
]

export default function IrrevocableTrustPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA")
  const [formData, setFormData] = useState<FormData>({
    grantorName: "",
    grantorAddress: "",
    state: "CA",
    trustName: "",
    trustDate: "",
    trustType: "general",
    trusteeName: "",
    trusteeAddress: "",
    successorTrustee1: "",
    successorTrustee1Address: "",
    successorTrustee2: "",
    successorTrustee2Address: "",
    beneficiary1Name: "",
    beneficiary1Relationship: "",
    beneficiary1Share: "",
    beneficiary1Distribution: "health_education_maintenance_support",
    beneficiary2Name: "",
    beneficiary2Relationship: "",
    beneficiary2Share: "",
    beneficiary2Distribution: "health_education_maintenance_support",
    beneficiary3Name: "",
    beneficiary3Relationship: "",
    beneficiary3Share: "",
    beneficiary3Distribution: "health_education_maintenance_support",
    trustAssets: "",
    spendthrift: "included",
    trusteePowers: "full_statutory",
    governingLaw: "",
    revocation: "irrevocable",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "state") setSelectedState(value as StateAbbr)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await generatePdf({
      title: `${getStateName(selectedState)} Irrevocable Trust`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Grantor", fields: [
          { label: "Full Legal Name", value: formData.grantorName },
          { label: "Address", value: formData.grantorAddress },
        ]},
        { heading: "Trust Information", fields: [
          { label: "Trust Name", value: formData.trustName },
          { label: "Trust Date", value: formData.trustDate },
          { label: "Trust Type", value: formData.trustType === "general" ? "General Irrevocable Trust" : formData.trustType === "ilip" ? "ILIT (Life Insurance Trust)" : formData.trustType === "medicaid" ? "Medicaid Asset Protection Trust" : formData.trustType === "special_needs" ? "Special Needs Trust" : formData.trustType === "charitable" ? "Charitable Remainder Trust" : "Other" },
          { label: "Governing Law", value: formData.governingLaw || getStateName(selectedState) },
        ]},
        { heading: "Trustees", fields: [
          { label: "Initial Trustee", value: formData.trusteeName },
          { label: "Trustee Address", value: formData.trusteeAddress },
          { label: "First Successor Trustee", value: formData.successorTrustee1 },
          { label: "First Successor Trustee Address", value: formData.successorTrustee1Address },
          { label: "Second Successor Trustee", value: formData.successorTrustee2 },
          { label: "Second Successor Trustee Address", value: formData.successorTrustee2Address },
        ]},
        { heading: "Beneficiaries", fields: [
          { label: "Beneficiary 1", value: `${formData.beneficiary1Name} (${formData.beneficiary1Relationship}) - ${formData.beneficiary1Share}` },
          { label: "Beneficiary 1 Distribution", value: formData.beneficiary1Distribution },
          ...(formData.beneficiary2Name ? [
            { label: "Beneficiary 2", value: `${formData.beneficiary2Name} (${formData.beneficiary2Relationship}) - ${formData.beneficiary2Share}` },
            { label: "Beneficiary 2 Distribution", value: formData.beneficiary2Distribution },
          ] : []),
          ...(formData.beneficiary3Name ? [
            { label: "Beneficiary 3", value: `${formData.beneficiary3Name} (${formData.beneficiary3Relationship}) - ${formData.beneficiary3Share}` },
            { label: "Beneficiary 3 Distribution", value: formData.beneficiary3Distribution },
          ] : []),
        ]},
        { heading: "Trust Assets", fields: [
          { label: "Initial Trust Assets", value: formData.trustAssets },
        ]},
        { heading: "Key Provisions", fields: [
          { label: "Spendthrift Clause", value: formData.spendthrift === "included" ? "Included - protects from beneficiary creditors" : "Not included" },
          { label: "Trustee Powers", value: formData.trusteePowers === "full_statutory" ? "Full statutory powers" : "Limited" },
          { label: "Revocation", value: "Irrevocable - cannot be revoked by Grantor" },
        ]},
      ],
      fileName: "irrevocable-trust.pdf",
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/irrevocable-trust" className="hover:text-primary-600">Irrevocable Trust</a>
        <span className="mx-2">/</span>
        <a href={`/irrevocable-trust/${getStateName(selectedState).toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{getStateName(selectedState)}</a>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Irrevocable Trust
      </h1>
      <p className="mt-2 text-gray-600">
        Create an irrevocable trust for estate tax planning, asset protection, Medicaid planning, or charitable giving.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This irrevocable trust template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Irrevocable trusts have permanent, significant tax and legal consequences. Cannot be easily modified.
        Grantor gives up control permanently. Gift tax, estate tax, income tax, and Medicaid implications are complex.
        You MUST consult with a licensed estate planning attorney and tax advisor before creating.
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
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Trust Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="trustName" className="block text-sm font-medium text-gray-700">Trust Name</label>
              <input id="trustName" name="trustName" type="text" value={formData.trustName} onChange={handleChange} placeholder="e.g., The Doe Family Irrevocable Trust" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="trustDate" className="block text-sm font-medium text-gray-700">Trust Date</label>
              <input id="trustDate" name="trustDate" type="date" value={formData.trustDate} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="trustType" className="block text-sm font-medium text-gray-700">Trust Type</label>
              <select id="trustType" name="trustType" value={formData.trustType} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="general">General Irrevocable Trust</option>
                <option value="ilip">ILIT (Irrevocable Life Insurance Trust)</option>
                <option value="medicaid">Medicaid Asset Protection Trust</option>
                <option value="special_needs">Special Needs Trust</option>
                <option value="charitable">Charitable Remainder Trust</option>
                <option value="dynasty">Dynasty Trust</option>
                <option value="grantor_retained">GRAT / QPRT</option>
              </select>
            </div>
            <div>
              <label htmlFor="governingLaw" className="block text-sm font-medium text-gray-700">Governing Law (State)</label>
              <input id="governingLaw" name="governingLaw" type="text" value={formData.governingLaw} onChange={handleChange} placeholder={getStateName(selectedState)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Trustees</h2>
          <p className="mt-2 text-sm text-gray-500">Grantor should NOT serve as trustee (would cause estate inclusion). Use independent trustee.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="trusteeName" className="block text-sm font-medium text-gray-700">Initial Trustee Name</label>
              <input id="trusteeName" name="trusteeName" type="text" value={formData.trusteeName} onChange={handleChange} placeholder="e.g., Robert James Wilson (or Trust Company)" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="trusteeAddress" className="block text-sm font-medium text-gray-700">Trustee Address</label>
              <input id="trusteeAddress" name="trusteeAddress" type="text" value={formData.trusteeAddress} onChange={handleChange} placeholder="e.g., 789 Pine Rd, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="successorTrustee1" className="block text-sm font-medium text-gray-700">First Successor Trustee</label>
              <input id="successorTrustee1" name="successorTrustee1" type="text" value={formData.successorTrustee1} onChange={handleChange} placeholder="e.g., Mary Jane Smith" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="successorTrustee1Address" className="block text-sm font-medium text-gray-700">First Successor Trustee Address</label>
              <input id="successorTrustee1Address" name="successorTrustee1Address" type="text" value={formData.successorTrustee1Address} onChange={handleChange} placeholder="e.g., 321 Elm St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="successorTrustee2" className="block text-sm font-medium text-gray-700">Second Successor Trustee</label>
              <input id="successorTrustee2" name="successorTrustee2" type="text" value={formData.successorTrustee2} onChange={handleChange} placeholder="e.g., Trust Company" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="successorTrustee2Address" className="block text-sm font-medium text-gray-700">Second Successor Trustee Address</label>
              <input id="successorTrustee2Address" name="successorTrustee2Address" type="text" value={formData.successorTrustee2Address} onChange={handleChange} placeholder="e.g., Trust Company Address" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Beneficiaries</h2>
          <p className="mt-2 text-sm text-gray-500">Shares should total 100%. HEMS = Health, Education, Maintenance, Support standard.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="beneficiary1Name" className="block text-sm font-medium text-gray-700">Beneficiary 1 Name</label>
              <input id="beneficiary1Name" name="beneficiary1Name" type="text" value={formData.beneficiary1Name} onChange={handleChange} placeholder="e.g., Jane Doe Jr." className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="beneficiary1Relationship" className="block text-sm font-medium text-gray-700">Relationship</label>
              <input id="beneficiary1Relationship" name="beneficiary1Relationship" type="text" value={formData.beneficiary1Relationship} onChange={handleChange} placeholder="e.g., Daughter" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="beneficiary1Share" className="block text-sm font-medium text-gray-700">Share %</label>
              <input id="beneficiary1Share" name="beneficiary1Share" type="text" value={formData.beneficiary1Share} onChange={handleChange} placeholder="e.g., 50%" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="beneficiary1Distribution" className="block text-sm font-medium text-gray-700">Distribution Standard</label>
              <select id="beneficiary1Distribution" name="beneficiary1Distribution" value={formData.beneficiary1Distribution} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="health_education_maintenance_support">HEMS (Health, Education, Maintenance, Support)</option>
                <option value="discretionary">Trustee discretion</option>
                <option value="age_based">At specific ages (e.g., 1/3 at 25, 1/3 at 30, 1/3 at 35)</option>
                <option value="income_only">Income only, principal at age</option>
              </select>
            </div>
            <div>
              <label htmlFor="beneficiary2Name" className="block text-sm font-medium text-gray-700">Beneficiary 2 Name (Optional)</label>
              <input id="beneficiary2Name" name="beneficiary2Name" type="text" value={formData.beneficiary2Name} onChange={handleChange} placeholder="e.g., John Doe III" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="beneficiary2Relationship" className="block text-sm font-medium text-gray-700">Relationship</label>
              <input id="beneficiary2Relationship" name="beneficiary2Relationship" type="text" value={formData.beneficiary2Relationship} onChange={handleChange} placeholder="e.g., Son" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="beneficiary2Share" className="block text-sm font-medium text-gray-700">Share %</label>
              <input id="beneficiary2Share" name="beneficiary2Share" type="text" value={formData.beneficiary2Share} onChange={handleChange} placeholder="e.g., 25%" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="beneficiary2Distribution" className="block text-sm font-medium text-gray-700">Distribution Standard</label>
              <select id="beneficiary2Distribution" name="beneficiary2Distribution" value={formData.beneficiary2Distribution} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="health_education_maintenance_support">HEMS (Health, Education, Maintenance, Support)</option>
                <option value="discretionary">Trustee discretion</option>
                <option value="age_based">At specific ages</option>
                <option value="income_only">Income only</option>
              </select>
            </div>
            <div>
              <label htmlFor="beneficiary3Name" className="block text-sm font-medium text-gray-700">Beneficiary 3 Name (Optional)</label>
              <input id="beneficiary3Name" name="beneficiary3Name" type="text" value={formData.beneficiary3Name} onChange={handleChange} placeholder="e.g., Grandchild" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="beneficiary3Relationship" className="block text-sm font-medium text-gray-700">Relationship</label>
              <input id="beneficiary3Relationship" name="beneficiary3Relationship" type="text" value={formData.beneficiary3Relationship} onChange={handleChange} placeholder="e.g., Grandchild" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="beneficiary3Share" className="block text-sm font-medium text-gray-700">Share %</label>
              <input id="beneficiary3Share" name="beneficiary3Share" type="text" value={formData.beneficiary3Share} onChange={handleChange} placeholder="e.g., 25%" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="beneficiary3Distribution" className="block text-sm font-medium text-gray-700">Distribution Standard</label>
              <select id="beneficiary3Distribution" name="beneficiary3Distribution" value={formData.beneficiary3Distribution} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="health_education_maintenance_support">HEMS (Health, Education, Maintenance, Support)</option>
                <option value="discretionary">Trustee discretion</option>
                <option value="age_based">At specific ages</option>
                <option value="income_only">Income only</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Trust Assets & Provisions</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="trustAssets" className="block text-sm font-medium text-gray-700">Initial Trust Assets</label>
              <textarea id="trustAssets" name="trustAssets" value={formData.trustAssets} onChange={handleChange} rows={4} placeholder="e.g., Life insurance policy on Grantor ($1M), brokerage account ending in 1234, real property at 123 Main St..." className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="spendthrift" className="block text-sm font-medium text-gray-700">Spendthrift Clause</label>
              <select id="spendthrift" name="spendthrift" value={formData.spendthrift} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="included">Included - protects from beneficiary creditors</option>
                <option value="not_included">Not included</option>
              </select>
            </div>
            <div>
              <label htmlFor="trusteePowers" className="block text-sm font-medium text-gray-700">Trustee Powers</label>
              <select id="trusteePowers" name="trusteePowers" value={formData.trusteePowers} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="full_statutory">Full statutory powers</option>
                <option value="limited">Limited (specify in attachment)</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">6. Key Provisions</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="revocation" className="block text-sm font-medium text-gray-700">Revocation</label>
              <input id="revocation" name="revocation" type="text" value={formData.revocation} onChange={handleChange} placeholder="Irrevocable - cannot be revoked by Grantor" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Irrevocable Trust
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Irrevocable Trusts
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