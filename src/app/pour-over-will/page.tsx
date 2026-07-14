"use client"

import { generatePdf } from "@/lib/pdf-builder"
import { useState } from "react"
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine"

type FormData = {
  testatorName: string
  testatorAddress: string
  state: StateAbbr
  spouseName: string
  children: string
  executorName: string
  executorAddress: string
  alternateExecutorName: string
  alternateExecutorAddress: string
  trustName: string
  trustDate: string
  guardianName: string
  guardianAddress: string
  alternateGuardianName: string
  alternateGuardianAddress: string
  specificBequests: string
  personalPropertyMemorandum: string
  digitalAssets: string
}

const faqs = [
  {
    q: "What is a Pour-Over Will?",
    a: "A Pour-Over Will is used with a Revocable Living Trust. It directs that any assets not already in the trust at death 'pour over' into the trust, so they're distributed according to the trust terms. It acts as a safety net for assets you forgot to transfer to the trust during life."
  },
  {
    q: "Does a Pour-Over Will avoid probate?",
    a: "No. Assets passing through the Pour-Over Will still go through probate first, then transfer to the trust. The advantage is unified administration - all assets ultimately distributed per the trust terms. To fully avoid probate, you must fund the trust during life."
  },
  {
    q: "What happens if I don't have a Pour-Over Will with my trust?",
    a: "Assets outside the trust at death pass by intestacy (state default laws), not according to your trust. They may go to relatives you didn't intend. A Pour-Over Will ensures your trust controls all assets."
  },
  {
    q: "Can I name guardians for minor children in a Pour-Over Will?",
    a: "Yes. Like any will, you can nominate guardians for minor children. The court gives strong weight to your nomination. This is a critical reason to have a Pour-Over Will even with a trust."
  },
  {
    q: "Do I need to update my Pour-Over Will when I update my trust?",
    a: "Generally yes, if the changes affect distribution or beneficiaries. But the Pour-Over Will simply references the trust, so minor trust amendments may not require will updates. Keep both current."
  },
  {
    q: "Can a Pour-Over Will handle digital assets?",
    a: "Yes. Include a specific clause granting your executor/trustee authority over digital assets (social media, crypto, emails, domains). Reference a digital asset memorandum for details."
  },
]

export default function PourOverWillPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA")
  const [formData, setFormData] = useState<FormData>({
    testatorName: "",
    testatorAddress: "",
    state: "CA",
    spouseName: "",
    children: "",
    executorName: "",
    executorAddress: "",
    alternateExecutorName: "",
    alternateExecutorAddress: "",
    trustName: "",
    trustDate: "",
    guardianName: "",
    guardianAddress: "",
    alternateGuardianName: "",
    alternateGuardianAddress: "",
    specificBequests: "",
    personalPropertyMemorandum: "",
    digitalAssets: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "state") setSelectedState(value as StateAbbr)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await generatePdf({
      title: `${getStateName(selectedState)} Pour-Over Will`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Testator Information", fields: [
          { label: "Full Legal Name", value: formData.testatorName },
          { label: "Address", value: formData.testatorAddress },
          { label: "Spouse", value: formData.spouseName || "None" },
          { label: "Children", value: formData.children || "None" },
        ]},
        { heading: "Executor", fields: [
          { label: "Primary Executor", value: formData.executorName },
          { label: "Executor Address", value: formData.executorAddress },
          { label: "Alternate Executor", value: formData.alternateExecutorName },
          { label: "Alternate Executor Address", value: formData.alternateExecutorAddress },
        ]},
        { heading: "Trust Information", fields: [
          { label: "Trust Name", value: formData.trustName },
          { label: "Trust Date", value: formData.trustDate },
        ]},
        { heading: "Guardians for Minor Children", fields: [
          { label: "Primary Guardian", value: formData.guardianName },
          { label: "Guardian Address", value: formData.guardianAddress },
          { label: "Alternate Guardian", value: formData.alternateGuardianName },
          { label: "Alternate Guardian Address", value: formData.alternateGuardianAddress },
        ]},
        { heading: "Specific Bequests", fields: [
          { label: "Specific Gifts", value: formData.specificBequests || "None" },
        ]},
        { heading: "Personal Property Memorandum", fields: [
          { label: "Memorandum Reference", value: formData.personalPropertyMemorandum || "None" },
        ]},
        { heading: "Digital Assets", fields: [
          { label: "Digital Assets Clause", value: formData.digitalAssets },
        ]},
      ],
      fileName: "pour-over-will.pdf",
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/pour-over-will" className="hover:text-primary-600">Pour-Over Will</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Pour-Over Will
      </h1>
      <p className="mt-2 text-gray-600">
        Create a pour-over will for {getStateName(selectedState)}. Works with your revocable living trust to capture any assets not transferred during life.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This pour-over will template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        A pour-over will must be executed with the formalities required by your state (witnesses, notarization).
        It works with a revocable living trust - ensure your trust exists and is properly funded.
        You must consult with a licensed attorney in your jurisdiction before executing.
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
          <h2 className="text-xl font-bold text-gray-900">1. Testator Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="testatorName" className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input id="testatorName" name="testatorName" type="text" value={formData.testatorName} onChange={handleChange} placeholder="e.g., Jane Elizabeth Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="testatorAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="testatorAddress" name="testatorAddress" type="text" value={formData.testatorAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="spouseName" className="block text-sm font-medium text-gray-700">Spouse Name (if applicable)</label>
              <input id="spouseName" name="spouseName" type="text" value={formData.spouseName} onChange={handleChange} placeholder="e.g., John Robert Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="children" className="block text-sm font-medium text-gray-700">Children (names & birth years)</label>
              <textarea id="children" name="children" value={formData.children} onChange={handleChange} rows={2} placeholder="e.g., Jane Doe Jr. (2010), John Doe III (2013)" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Executor (Personal Representative)</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="executorName" className="block text-sm font-medium text-gray-700">Primary Executor Name</label>
              <input id="executorName" name="executorName" type="text" value={formData.executorName} onChange={handleChange} placeholder="e.g., Jane Elizabeth Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="executorAddress" className="block text-sm font-medium text-gray-700">Executor Address</label>
              <input id="executorAddress" name="executorAddress" type="text" value={formData.executorAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="alternateExecutorName" className="block text-sm font-medium text-gray-700">Alternate Executor Name</label>
              <input id="alternateExecutorName" name="alternateExecutorName" type="text" value={formData.alternateExecutorName} onChange={handleChange} placeholder="e.g., Robert James Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="alternateExecutorAddress" className="block text-sm font-medium text-gray-700">Alternate Executor Address</label>
              <input id="alternateExecutorAddress" name="alternateExecutorAddress" type="text" value={formData.alternateExecutorAddress} onChange={handleChange} placeholder="e.g., 456 Oak Ave, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Trust Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="trustName" className="block text-sm font-medium text-gray-700">Trust Name</label>
              <input id="trustName" name="trustName" type="text" value={formData.trustName} onChange={handleChange} placeholder="e.g., The Jane Elizabeth Doe Revocable Living Trust" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="trustDate" className="block text-sm font-medium text-gray-700">Trust Date</label>
              <input id="trustDate" name="trustDate" type="date" value={formData.trustDate} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Guardians for Minor Children</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">Primary Guardian</label>
              <input id="guardianName" name="guardianName" type="text" value={formData.guardianName} onChange={handleChange} placeholder="e.g., Robert James Smith" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="guardianAddress" className="block text-sm font-medium text-gray-700">Guardian Address</label>
              <input id="guardianAddress" name="guardianAddress" type="text" value={formData.guardianAddress} onChange={handleChange} placeholder="e.g., 789 Pine Rd, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="alternateGuardianName" className="block text-sm font-medium text-gray-700">Alternate Guardian</label>
              <input id="alternateGuardianName" name="alternateGuardianName" type="text" value={formData.alternateGuardianName} onChange={handleChange} placeholder="e.g., Mary Jane Wilson" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="alternateGuardianAddress" className="block text-sm font-medium text-gray-700">Alternate Guardian Address</label>
              <input id="alternateGuardianAddress" name="alternateGuardianAddress" type="text" value={formData.alternateGuardianAddress} onChange={handleChange} placeholder="e.g., 321 Elm St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Specific Bequests</h2>
          <div className="mt-4">
            <label htmlFor="specificBequests" className="block text-sm font-medium text-gray-700">Specific Gifts (optional)</label>
            <textarea id="specificBequests" name="specificBequests" value={formData.specificBequests} onChange={handleChange} rows={4} placeholder="e.g., My diamond ring to my daughter Jane; $10,000 to St. Jude Hospital; my 1965 Mustang to my son John" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">6. Personal Property Memorandum</h2>
          <div className="mt-4">
            <label htmlFor="personalPropertyMemorandum" className="block text-sm font-medium text-gray-700">Reference to Separate Memorandum</label>
            <textarea id="personalPropertyMemorandum" name="personalPropertyMemorandum" value={formData.personalPropertyMemorandum} onChange={handleChange} rows={3} placeholder="e.g., I may leave a separate written memorandum distributing tangible personal property. That memorandum is incorporated by reference." className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">7. Digital Assets</h2>
          <div className="mt-4">
            <label htmlFor="digitalAssets" className="block text-sm font-medium text-gray-700">Digital Assets Authorization</label>
            <textarea id="digitalAssets" name="digitalAssets" value={formData.digitalAssets} onChange={handleChange} rows={4} placeholder="e.g., I authorize my executor to access, manage, and distribute all my digital assets including social media accounts, email, cryptocurrency, domain names, cloud storage, and online financial accounts." className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Pour-Over Will
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Pour-Over Wills
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