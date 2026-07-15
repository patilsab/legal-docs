"use client"

import { generatePdf } from "@/lib/pdf-builder"
import { useState } from "react"
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine"

type FormData = {
  declarantName: string
  declarantAddress: string
  declarantDOB: string
  state: StateAbbr
  agentName: string
  agentAddress: string
  agentPhone: string
  alternateAgentName: string
  alternateAgentAddress: string
  alternateAgentPhone: string
  lifeSupport: string
  artificialNutrition: string
  painRelief: string
  organDonation: string
  autopsy: string
  burialCremation: string
  organDonationDetails: string
  physician: string
  hIPAA: string
  pregnancy: string
  additionalInstructions: string
}

const faqs = [
  {
    q: "What is an Advance Healthcare Directive?",
    a: "An Advance Healthcare Directive (also called Advance Directive or Healthcare Directive) combines a Living Will (your end-of-life wishes) with a Medical Power of Attorney (appointing an agent). It's the comprehensive document for healthcare planning."
  },
  {
    q: "Do I need both a Living Will and Medical POA?",
    a: "This document includes both. The Living Will portion states your wishes for end-of-life care. The Medical POA portion appoints an agent to make decisions not covered by your written wishes. Having both in one document is ideal."
  },
  {
    q: "What if I'm pregnant?",
    a: "Many states have laws that override advance directives during pregnancy to preserve fetal life. The document includes a pregnancy provision, but state law may control. Discuss with your attorney."
  },
  {
    q: "Can I refuse artificial nutrition/hydration?",
    a: "Yes, in most states you can refuse feeding tubes and IV fluids in your Living Will. Some states require specific language. This document includes explicit options for artificial nutrition and hydration."
  },
  {
    q: "How often should I update this?",
    a: "Review every 1-2 years or after major life events: marriage, divorce, birth of child, death of agent, diagnosis of serious illness, moving to another state. Some states require re-execution after certain periods."
  },
  {
    q: "Does this work in other states?",
    a: "Most states honor out-of-state directives if validly executed where created. However, it's best to execute a new one if you move. Some states have reciprocity laws."
  },
]

export default function AdvanceHealthcareDirectivePage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA")
  const [formData, setFormData] = useState<FormData>({
    declarantName: "",
    declarantAddress: "",
    declarantDOB: "",
    state: "CA",
    agentName: "",
    agentAddress: "",
    agentPhone: "",
    alternateAgentName: "",
    alternateAgentAddress: "",
    alternateAgentPhone: "",
    lifeSupport: "withhold",
    artificialNutrition: "withhold",
    painRelief: "full",
    organDonation: "yes",
    autopsy: "family_decides",
    burialCremation: "cremation",
    organDonationDetails: "All usable organs and tissues",
    physician: "",
    hIPAA: "authorized",
    pregnancy: "standard",
    additionalInstructions: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "state") setSelectedState(value as StateAbbr)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await generatePdf({
      title: `${getStateName(selectedState)} Advance Healthcare Directive`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Declarant", fields: [
          { label: "Full Legal Name", value: formData.declarantName },
          { label: "Address", value: formData.declarantAddress },
          { label: "Date of Birth", value: formData.declarantDOB },
        ]},
        { heading: "Part I: Medical Power of Attorney - Agent", fields: [
          { label: "Primary Agent Name", value: formData.agentName },
          { label: "Agent Address", value: formData.agentAddress },
          { label: "Agent Phone", value: formData.agentPhone },
          { label: "Alternate Agent Name", value: formData.alternateAgentName },
          { label: "Alternate Agent Address", value: formData.alternateAgentAddress },
          { label: "Alternate Agent Phone", value: formData.alternateAgentPhone },
        ]},
        { heading: "Part II: Living Will - End-of-Life Decisions", fields: [
          { label: "Life-Sustaining Treatment", value: formData.lifeSupport === "withhold" ? "Withhold/withdraw" : formData.lifeSupport === "full" ? "Provide all" : "Provide for trial period" },
          { label: "Artificial Nutrition & Hydration", value: formData.artificialNutrition === "withhold" ? "Withhold/withdraw" : "Provide" },
          { label: "Pain Relief", value: formData.painRelief === "full" ? "Maximum comfort even if may hasten death" : "Standard" },
        ]},
        { heading: "Part III: Post-Death Wishes", fields: [
          { label: "Organ/Tissue Donation", value: formData.organDonation === "yes" ? "Yes - " + formData.organDonationDetails : "No" },
          { label: "Autopsy", value: formData.autopsy },
          { label: "Burial/Cremation", value: formData.burialCremation },
        ]},
        { heading: "Part IV: General Provisions", fields: [
          { label: "HIPAA Authorization", value: formData.hIPAA === "authorized" ? "Agent has full access to medical records" : "Limited access" },
          { label: "Pregnancy Provision", value: formData.pregnancy === "standard" ? "Directive may not be honored during pregnancy per state law" : "Other" },
          { label: "Preferred Physician", value: formData.physician || "None specified" },
          { label: "Additional Instructions", value: formData.additionalInstructions || "None" },
        ]},
      ],
      fileName: "advance-healthcare-directive.pdf",
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/advance-healthcare-directive" className="hover:text-primary-600">Advance Healthcare Directive</a>
        <span className="mx-2">/</span>
        <a href={`/advance-healthcare-directive/${getStateName(selectedState).toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{getStateName(selectedState)}</a>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Advance Healthcare Directive
      </h1>
      <p className="mt-2 text-gray-600">
        Comprehensive document combining Living Will + Medical Power of Attorney.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This advance healthcare directive template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Requirements vary by state (witnesses, notarization, statutory forms, pregnancy provisions).
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
          <h2 className="text-xl font-bold text-gray-900">1. Declarant Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="declarantName" className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input id="declarantName" name="declarantName" type="text" value={formData.declarantName} onChange={handleChange} placeholder="e.g., Jane Elizabeth Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="declarantAddress" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="declarantAddress" name="declarantAddress" type="text" value={formData.declarantAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="declarantDOB" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input id="declarantDOB" name="declarantDOB" type="date" value={formData.declarantDOB} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Part I: Medical Power of Attorney - Agent</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="agentName" className="block text-sm font-medium text-gray-700">Primary Agent Name</label>
              <input id="agentName" name="agentName" type="text" value={formData.agentName} onChange={handleChange} placeholder="e.g., John Robert Smith" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="agentAddress" className="block text-sm font-medium text-gray-700">Agent Address</label>
              <input id="agentAddress" name="agentAddress" type="text" value={formData.agentAddress} onChange={handleChange} placeholder="e.g., 456 Oak Ave, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="agentPhone" className="block text-sm font-medium text-gray-700">Agent Phone</label>
              <input id="agentPhone" name="agentPhone" type="tel" value={formData.agentPhone} onChange={handleChange} placeholder="e.g., (555) 123-4567" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="alternateAgentName" className="block text-sm font-medium text-gray-700">Alternate Agent Name</label>
              <input id="alternateAgentName" name="alternateAgentName" type="text" value={formData.alternateAgentName} onChange={handleChange} placeholder="e.g., Robert James Wilson" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="alternateAgentAddress" className="block text-sm font-medium text-gray-700">Alternate Agent Address</label>
              <input id="alternateAgentAddress" name="alternateAgentAddress" type="text" value={formData.alternateAgentAddress} onChange={handleChange} placeholder="e.g., 789 Pine Rd, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="alternateAgentPhone" className="block text-sm font-medium text-gray-700">Alternate Agent Phone</label>
              <input id="alternateAgentPhone" name="alternateAgentPhone" type="tel" value={formData.alternateAgentPhone} onChange={handleChange} placeholder="e.g., (555) 987-6543" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Part II: Living Will - Life-Sustaining Treatment</h2>
          <p className="mt-2 text-sm text-gray-500">If I have a terminal condition or am permanently unconscious with no reasonable hope of recovery:</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="lifeSupport" className="block text-sm font-medium text-gray-700">Life-Sustaining Treatment</label>
              <select id="lifeSupport" name="lifeSupport" value={formData.lifeSupport} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="withhold">Withhold/withdraw life-sustaining treatment</option>
                <option value="full">Provide all life-sustaining treatment</option>
                <option value="trial">Provide for trial period, then reassess</option>
              </select>
            </div>
            <div>
              <label htmlFor="artificialNutrition" className="block text-sm font-medium text-gray-700">Artificial Nutrition & Hydration</label>
              <select id="artificialNutrition" name="artificialNutrition" value={formData.artificialNutrition} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="withhold">Withhold/withdraw feeding tubes & IV fluids</option>
                <option value="provide">Provide artificial nutrition/hydration</option>
              </select>
            </div>
            <div>
              <label htmlFor="painRelief" className="block text-sm font-medium text-gray-700">Pain Relief</label>
              <select id="painRelief" name="painRelief" value={formData.painRelief} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="full">Maximum comfort, even if may hasten death</option>
                <option value="standard">Standard medical practice</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Part III: Post-Death Wishes</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="organDonation" className="block text-sm font-medium text-gray-700">Organ/Tissue Donation</label>
              <select id="organDonation" name="organDonation" value={formData.organDonation} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="yes">Yes, I authorize donation</option>
                <option value="no">No, I do not authorize donation</option>
              </select>
            </div>
            <div>
              <label htmlFor="organDonationDetails" className="block text-sm font-medium text-gray-700">Donation Details</label>
              <input id="organDonationDetails" name="organDonationDetails" type="text" value={formData.organDonationDetails} onChange={handleChange} placeholder="e.g., All usable organs and tissues for transplant/therapy/research" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="autopsy" className="block text-sm font-medium text-gray-700">Autopsy</label>
              <select id="autopsy" name="autopsy" value={formData.autopsy} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="family_decides">Family/agent decides</option>
                <option value="yes">Yes, authorize autopsy</option>
                <option value="no">No, do not authorize autopsy</option>
              </select>
            </div>
            <div>
              <label htmlFor="burialCremation" className="block text-sm font-medium text-gray-700">Disposition of Remains</label>
              <select id="burialCremation" name="burialCremation" value={formData.burialCremation} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="cremation">Cremation</option>
                <option value="burial">Traditional burial</option>
                <option value="donation">Donation to science</option>
                <option value="family_decides">Family/agent decides</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Part IV: General Provisions</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="hIPAA" className="block text-sm font-medium text-gray-700">HIPAA Authorization</label>
              <select id="hIPAA" name="hIPAA" value={formData.hIPAA} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="authorized">Agent has full access to all medical records</option>
                <option value="limited">Limited access only</option>
              </select>
            </div>
            <div>
              <label htmlFor="pregnancy" className="block text-sm font-medium text-gray-700">Pregnancy Provision</label>
              <select id="pregnancy" name="pregnancy" value={formData.pregnancy} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="standard">Directive may not be honored during pregnancy per state law</option>
                <option value="override">My directive applies even during pregnancy (where legally permissible)</option>
              </select>
            </div>
            <div>
              <label htmlFor="physician" className="block text-sm font-medium text-gray-700">Preferred Physician</label>
              <input id="physician" name="physician" type="text" value={formData.physician} onChange={handleChange} placeholder="e.g., Dr. Jane Smith, (555) 123-4567" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="additionalInstructions" className="block text-sm font-medium text-gray-700">Additional Instructions</label>
              <textarea id="additionalInstructions" name="additionalInstructions" value={formData.additionalInstructions} onChange={handleChange} rows={4} placeholder="Any other wishes, religious/spiritual considerations, specific conditions..." className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Advance Healthcare Directive
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Advance Healthcare Directives
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