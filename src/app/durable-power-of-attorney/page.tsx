"use client"

import { generatePdf } from "@/lib/pdf-builder"
import { useState } from "react"
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine"

type FormData = {
  principalName: string
  principalAddress: string
  state: StateAbbr
  agentName: string
  agentAddress: string
  agentPhone: string
  alternateAgentName: string
  alternateAgentAddress: string
  alternateAgentPhone: string
  effectiveDate: string
  durability: string
  powers: string
  gifting: string
  compensation: string
  thirdPartyReliance: string
  termination: string
}

const faqs = [
  {
    q: "What is a Durable Power of Attorney?",
    a: "A Durable Power of Attorney (DPOA) is a legal document where you (the principal) appoint someone (the agent/attorney-in-fact) to manage your financial affairs. 'Durable' means it remains effective even if you become incapacitated. Without 'durable' language, a POA terminates upon incapacity."
  },
  {
    q: "When does it become effective?",
    a: "Two options: (1) Immediately upon signing - agent can act right away. (2) Springing - only effective upon your incapacity (requires doctor certification). Immediate is more common and avoids delays. Some states (FL, NY) restrict springing POAs."
  },
  {
    q: "What powers can I grant?",
    a: "Broad or limited. Common powers: real estate, banking, investments, taxes, insurance, business operations, gifts, trusts, benefits, digital assets. You can customize. Most states have statutory short forms with checkboxes. Granting gifting power requires specific language."
  },
  {
    q: "Can my agent make gifts?",
    a: "Only if you specifically authorize it. Gifting power is useful for Medicaid planning or annual gift tax exclusions ($18,000/year per recipient in 2024). Without explicit authorization, agents generally cannot make gifts. Specify limits (e.g., 'annual exclusion gifts to descendants')."
  },
  {
    q: "Can I revoke a Durable POA?",
    a: "Yes, as long as you have capacity. Execute a written revocation, notify agent and third parties (banks, etc.), and record if real estate involved. A new POA typically revokes prior ones. Incapacity = cannot revoke. Springing POA can be revoked before it springs."
  },
  {
    q: "What if my agent abuses their power?",
    a: "Agent has fiduciary duty. You can: revoke POA, demand accounting, sue for breach of fiduciary duty. Courts can remove agents. Some states allow family to petition for review. Choose agent carefully - this is the most important decision."
  },
]

export default function DurablePowerOfAttorneyPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA")
  const [formData, setFormData] = useState<FormData>({
    principalName: "",
    principalAddress: "",
    state: "CA",
    agentName: "",
    agentAddress: "",
    agentPhone: "",
    alternateAgentName: "",
    alternateAgentAddress: "",
    alternateAgentPhone: "",
    effectiveDate: "",
    durability: "immediate",
    powers: "full",
    gifting: "authorized",
    compensation: "none",
    thirdPartyReliance: "authorized",
    termination: "incapacity_death_revocation",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "state") setSelectedState(value as StateAbbr)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await generatePdf({
      title: `${getStateName(selectedState)} Durable Power of Attorney (Financial)`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Principal", fields: [
          { label: "Full Legal Name", value: formData.principalName },
          { label: "Address", value: formData.principalAddress },
        ]},
        { heading: "Agent (Attorney-in-Fact)", fields: [
          { label: "Full Legal Name", value: formData.agentName },
          { label: "Address", value: formData.agentAddress },
          { label: "Phone", value: formData.agentPhone },
        ]},
        { heading: "Alternate Agent", fields: [
          { label: "Full Legal Name", value: formData.alternateAgentName },
          { label: "Address", value: formData.alternateAgentAddress },
          { label: "Phone", value: formData.alternateAgentPhone },
        ]},
        { heading: "Effectiveness & Durability", fields: [
          { label: "Effective", value: formData.effectiveDate === "immediate" ? "Immediately upon execution" : "Upon disability/incapacity (springing)" },
          { label: "Durability", value: formData.durability === "durable" ? "Remains effective during incapacity" : "Terminates upon incapacity" },
        ]},
        { heading: "Powers Granted", fields: [
          { label: "Scope", value: formData.powers === "full" ? "All powers per state statutory form" : "Limited (specify in attachment)" },
          { label: "Gifting Authority", value: formData.gifting === "authorized" ? "Authorized (annual exclusion gifts to descendants)" : "Not authorized" },
          { label: "Agent Compensation", value: formData.compensation === "reasonable" ? "Reasonable compensation allowed" : "No compensation" },
          { label: "Third Party Reliance", value: formData.thirdPartyReliance === "authorized" ? "Third parties may rely without liability" : "Standard reliance" },
        ]},
        { heading: "Termination", fields: [
          { label: "Termination Events", value: formData.termination },
        ]},
      ],
      fileName: "durable-power-of-attorney.pdf",
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/durable-power-of-attorney" className="hover:text-primary-600">Durable Power of Attorney</a>
        <span className="mx-2">/</span>
        <a href={`/durable-power-of-attorney/${getStateName(selectedState).toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{getStateName(selectedState)}</a>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Durable Power of Attorney (Financial)
      </h1>
      <p className="mt-2 text-gray-600">
        Appoint an agent to manage your financial affairs. Remains effective during incapacity.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This durable power of attorney template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        POA requirements vary significantly by state (witnesses, notarization, statutory forms).
        Some states require specific statutory forms. Agent selection is critical - choose someone you trust completely.
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
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Primary Agent</h2>
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
          <h2 className="text-xl font-bold text-gray-900">3. Alternate Agent (Successor)</h2>
          <p className="mt-2 text-sm text-gray-500">Optional but recommended. Acts if primary agent cannot/will not serve.</p>
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
          <h2 className="text-xl font-bold text-gray-900">4. Effectiveness & Durability</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="effectiveDate" className="block text-sm font-medium text-gray-700">When Effective</label>
              <select id="effectiveDate" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="immediate">Immediately upon execution</option>
                <option value="springing">Upon my disability/incapacity (springing)</option>
              </select>
            </div>
            <div>
              <label htmlFor="durability" className="block text-sm font-medium text-gray-700">Durability</label>
              <select id="durability" name="durability" value={formData.durability} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="durable">Durable - remains effective during incapacity</option>
                <option value="nondurable">Non-durable - terminates upon incapacity</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Powers Granted</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="powers" className="block text-sm font-medium text-gray-700">Scope of Authority</label>
              <select id="powers" name="powers" value={formData.powers} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="full">Full statutory powers (all categories per state law)</option>
                <option value="limited">Limited (attach specific powers)</option>
              </select>
            </div>
            <div>
              <label htmlFor="gifting" className="block text-sm font-medium text-gray-700">Gifting Authority</label>
              <select id="gifting" name="gifting" value={formData.gifting} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="authorized">Authorized - annual exclusion gifts to descendants</option>
                <option value="not_authorized">Not authorized</option>
                <option value="custom">Custom (specify limits)</option>
              </select>
            </div>
            <div>
              <label htmlFor="compensation" className="block text-sm font-medium text-gray-700">Agent Compensation</label>
              <select id="compensation" name="compensation" value={formData.compensation} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="none">No compensation</option>
                <option value="reasonable">Reasonable compensation</option>
                <option value="custom">Custom amount</option>
              </select>
            </div>
            <div>
              <label htmlFor="thirdPartyReliance" className="block text-sm font-medium text-gray-700">Third Party Reliance</label>
              <select id="thirdPartyReliance" name="thirdPartyReliance" value={formData.thirdPartyReliance} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="authorized">Authorized - third parties may rely without liability</option>
                <option value="standard">Standard reliance</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">6. Termination</h2>
          <div className="mt-4">
            <label htmlFor="termination" className="block text-sm font-medium text-gray-700">Termination Events</label>
            <select id="termination" name="termination" value={formData.termination} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
              <option value="incapacity_death_revocation">Upon my incapacity (if springing), death, or written revocation</option>
              <option value="death_revocation">Upon my death or written revocation (immediate POA)</option>
              <option value="custom">Custom termination date/event</option>
            </select>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Durable Power of Attorney
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Durable Power of Attorney
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