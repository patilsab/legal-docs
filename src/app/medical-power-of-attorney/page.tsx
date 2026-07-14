"use client"

import { generatePdf } from "@/lib/pdf-builder"
import { useState } from "react"
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine"

type FormData = {
  principalName: string
  principalAddress: string
  principalDOB: string
  state: StateAbbr
  agentName: string
  agentAddress: string
  agentPhone: string
  alternateAgentName: string
  alternateAgentAddress: string
  alternateAgentPhone: string
  effectiveDate: string
  lifeSustaining: string
  painManagement: string
  organDonation: string
  facilitySelection: string
  mentalHealth: string
  hIPAA: string
  physician: string
}

const faqs = [
  {
    q: "What is a Medical Power of Attorney?",
    a: "A Medical Power of Attorney (also called Healthcare Power of Attorney or Healthcare Proxy) appoints someone to make medical decisions for you if you are unable to. Unlike a Living Will (which states your wishes), this appoints a decision-maker who can interpret situations and work with doctors."
  },
  {
    q: "When does it take effect?",
    a: "Usually when your doctor determines you lack capacity to make healthcare decisions. You can also make it immediate. It ends at death or revocation."
  },
  {
    q: "What decisions can my agent make?",
    a: "All healthcare decisions: consent/refuse treatment, choose doctors/hospitals, access medical records, decide on life support, pain management, organ donation, facility placement, mental health treatment. You can limit powers."
  },
  {
    q: "How is this different from a Living Will?",
    a: "Living Will = your written wishes for end-of-life care. Medical POA = appoints a person to make decisions. You need both. The agent follows your Living Will but also handles situations not covered."
  },
  {
    q: "Can I appoint co-agents?",
    a: "Yes, but specify if they act jointly (must agree) or severally (can act independently). Joint can cause delays. Most people prefer primary + alternate."
  },
  {
    q: "Does my agent have access to my medical records?",
    a: "Yes, if you include HIPAA authorization. Your agent needs access to make informed decisions. Include explicit HIPAA waiver in the document."
  },
]

export default function MedicalPowerOfAttorneyPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA")
  const [formData, setFormData] = useState<FormData>({
    principalName: "",
    principalAddress: "",
    principalDOB: "",
    state: "CA",
    agentName: "",
    agentAddress: "",
    agentPhone: "",
    alternateAgentName: "",
    alternateAgentAddress: "",
    alternateAgentPhone: "",
    effectiveDate: "incapacity",
    lifeSustaining: "agent_decides",
    painManagement: "maximum_comfort",
    organDonation: "yes",
    facilitySelection: "agent_decides",
    mentalHealth: "authorized",
    hIPAA: "authorized",
    physician: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "state") setSelectedState(value as StateAbbr)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await generatePdf({
      title: `${getStateName(selectedState)} Medical Power of Attorney`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Principal", fields: [
          { label: "Full Legal Name", value: formData.principalName },
          { label: "Address", value: formData.principalAddress },
          { label: "Date of Birth", value: formData.principalDOB },
        ]},
        { heading: "Primary Agent", fields: [
          { label: "Full Legal Name", value: formData.agentName },
          { label: "Address", value: formData.agentAddress },
          { label: "Phone", value: formData.agentPhone },
        ]},
        { heading: "Alternate Agent", fields: [
          { label: "Full Legal Name", value: formData.alternateAgentName },
          { label: "Address", value: formData.alternateAgentAddress },
          { label: "Phone", value: formData.alternateAgentPhone },
        ]},
        { heading: "Effectiveness", fields: [
          { label: "Effective", value: formData.effectiveDate === "immediate" ? "Immediately" : "Upon incapacity" },
        ]},
        { heading: "Healthcare Decisions", fields: [
          { label: "Life-Sustaining Treatment", value: formData.lifeSustaining === "agent_decides" ? "Agent decides per my wishes" : formData.lifeSustaining === "full" ? "Full life support" : "No life support" },
          { label: "Pain Management", value: formData.painManagement === "maximum_comfort" ? "Maximum comfort even if hastens death" : "Standard medical practice" },
          { label: "Organ Donation", value: formData.organDonation === "yes" ? "Authorized" : "Not authorized" },
          { label: "Facility Selection", value: formData.facilitySelection },
          { label: "Mental Health Treatment", value: formData.mentalHealth === "authorized" ? "Agent authorized for mental health decisions" : "Not authorized" },
        ]},
        { heading: "HIPAA & Physician", fields: [
          { label: "HIPAA Authorization", value: formData.hIPAA === "authorized" ? "Agent may access all medical records" : "Limited access" },
          { label: "Preferred Physician", value: formData.physician || "None specified" },
        ]},
      ],
      fileName: "medical-power-of-attorney.pdf",
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/medical-power-of-attorney" className="hover:text-primary-600">Medical Power of Attorney</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Medical Power of Attorney
      </h1>
      <p className="mt-2 text-gray-600">
        Appoint a trusted agent to make healthcare decisions if you are unable to.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This medical power of attorney template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Requirements vary by state (witnesses, notarization, statutory forms).
        This works with an Advance Healthcare Directive / Living Will - you should have both.
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
          <h2 className="text-xl font-bold text-gray-900">1. Principal Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="principalName" className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input id="principalName" name="principalName" type="text" value={formData.principalName} onChange={handleChange} placeholder="e.g., Jane Elizabeth Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="principalAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="principalAddress" name="principalAddress" type="text" value={formData.principalAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="principalDOB" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input id="principalDOB" name="principalDOB" type="date" value={formData.principalDOB} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Primary Agent (Healthcare Proxy)</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="agentName" className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input id="agentName" name="agentName" type="text" value={formData.agentName} onChange={handleChange} placeholder="e.g., John Robert Smith" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="agentAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="agentAddress" name="agentAddress" type="text" value={formData.agentAddress} onChange={handleChange} placeholder="e.g., 456 Oak Ave, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="agentPhone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input id="agentPhone" name="agentPhone" type="tel" value={formData.agentPhone} onChange={handleChange} placeholder="e.g., (555) 123-4567" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Alternate Agent</h2>
          <p className="mt-2 text-sm text-gray-500">Acts if primary agent cannot/will not serve.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="alternateAgentName" className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input id="alternateAgentName" name="alternateAgentName" type="text" value={formData.alternateAgentName} onChange={handleChange} placeholder="e.g., Robert James Wilson" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="alternateAgentAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="alternateAgentAddress" name="alternateAgentAddress" type="text" value={formData.alternateAgentAddress} onChange={handleChange} placeholder="e.g., 789 Pine Rd, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="alternateAgentPhone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input id="alternateAgentPhone" name="alternateAgentPhone" type="tel" value={formData.alternateAgentPhone} onChange={handleChange} placeholder="e.g., (555) 987-6543" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. When Effective</h2>
          <div className="mt-4">
            <label htmlFor="effectiveDate" className="block text-sm font-medium text-gray-700">Effective</label>
            <select id="effectiveDate" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
              <option value="incapacity">Upon my incapacity (as determined by physician)</option>
              <option value="immediate">Immediately upon execution</option>
            </select>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Healthcare Decision Authority</h2>
          <p className="mt-2 text-sm text-gray-500">Specify your preferences to guide your agent.</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="lifeSustaining" className="block text-sm font-medium text-gray-700">Life-Sustaining Treatment</label>
              <select id="lifeSustaining" name="lifeSustaining" value={formData.lifeSustaining} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="agent_decides">Agent decides based on my known wishes/values</option>
                <option value="full">I want all life-sustaining treatment</option>
                <option value="none">I do NOT want life-sustaining treatment</option>
              </select>
            </div>
            <div>
              <label htmlFor="painManagement" className="block text-sm font-medium text-gray-700">Pain Management</label>
              <select id="painManagement" name="painManagement" value={formData.painManagement} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="maximum_comfort">Maximum comfort, even if may hasten death</option>
                <option value="standard">Standard medical practice</option>
              </select>
            </div>
            <div>
              <label htmlFor="organDonation" className="block text-sm font-medium text-gray-700">Organ/Tissue Donation</label>
              <select id="organDonation" name="organDonation" value={formData.organDonation} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="yes">Yes, I authorize donation</option>
                <option value="no">No, I do not authorize donation</option>
              </select>
            </div>
            <div>
              <label htmlFor="facilitySelection" className="block text-sm font-medium text-gray-700">Facility/Placement</label>
              <select id="facilitySelection" name="facilitySelection" value={formData.facilitySelection} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="agent_decides">Agent decides based on my best interests</option>
                <option value="home">Prefer home care if possible</option>
                <option value="facility">Facility care if medically necessary</option>
              </select>
            </div>
            <div>
              <label htmlFor="mentalHealth" className="block text-sm font-medium text-gray-700">Mental Health Treatment</label>
              <select id="mentalHealth" name="mentalHealth" value={formData.mentalHealth} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="authorized">Agent authorized for mental health decisions</option>
                <option value="not_authorized">Not authorized</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. HIPAA & Physician</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="hIPAA" className="block text-sm font-medium text-gray-700">HIPAA Authorization</label>
              <select id="hIPAA" name="hIPAA" value={formData.hIPAA} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="authorized">Authorized - agent may access all medical records</option>
                <option value="limited">Limited access only</option>
              </select>
            </div>
            <div>
              <label htmlFor="physician" className="block text-sm font-medium text-gray-700">Preferred Physician</label>
              <input id="physician" name="physician" type="text" value={formData.physician} onChange={handleChange} placeholder="e.g., Dr. Jane Smith, (555) 123-4567" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Medical Power of Attorney
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Medical Power of Attorney
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