'use client';

import { useState } from 'react';

const states = [
  { 
    abbr: 'CA', 
    name: 'California', 
    note: 'California POAs must be notarized and signed by the principal. For real estate, a separate deed or transfer document may be required. Medical POA follows the California Probate Code §4701.',
    ageRequirement: '18 or older',
    witnesses: '2 witnesses required for healthcare POA',
  },
  { 
    abbr: 'TX', 
    name: 'Texas', 
    note: 'Texas POAs must be signed before a notary public. For real estate transactions, the POA must be recorded with the county clerk. Texas follows the Uniform Power of Attorney Act (Tex. Prop. Code §1201).',
    ageRequirement: '18 or older',
    witnesses: '2 witnesses required',
  },
  { 
    abbr: 'FL', 
    name: 'Florida', 
    note: 'Florida requires POAs to be signed before two witnesses and notarized. For real estate, the POA must be recorded. Florida follows the Uniform Power of Attorney Act (Fla. Stat. §709).',
    ageRequirement: '18 or older',
    witnesses: '2 witnesses and notary required',
  },
  { 
    abbr: 'NY', 
    name: 'New York', 
    note: 'New York POAs must be signed before a notary public and two witnesses. The POA must include a statutory short form for general POA. Medical POA follows NY Public Health Law §2985.',
    ageRequirement: '18 or older',
    witnesses: '2 witnesses and notary required',
  },
  { 
    abbr: 'IL', 
    name: 'Illinois', 
    note: 'Illinois POAs must be signed before a notary public. For real estate, the POA must be recorded with the county recorder. Illinois follows the Illinois Power of Attorney Act (755 ILCS 45).',
    ageRequirement: '18 or older',
    witnesses: '2 witnesses required',
  },
];

type FormData = {
  principalName: string;
  agentName: string;
  principalAddress: string;
  effectiveDate: string;
  expirationDate: string;
  powersGranted: string[];
};

export default function PowerOfAttorneyPage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    principalName: '',
    agentName: '',
    principalAddress: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    expirationDate: '',
    powersGranted: [],
  });

  const handlePowerChange = (power: string) => {
    const updated = formData.powersGranted.includes(power)
      ? formData.powersGranted.filter(p => p !== power)
      : [...formData.powersGranted, power];
    setFormData({ ...formData, powersGranted: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('PDF generation coming soon! Form data: ' + JSON.stringify(formData));
  };

  const powers = [
    { id: 'financial', label: 'Financial Decisions', desc: 'Manage bank accounts, investments, and tax matters' },
    { id: 'medical', label: 'Medical Decisions', desc: 'Make healthcare and treatment decisions' },
    { id: 'real-estate', label: 'Real Estate', desc: 'Buy, sell, or manage property on your behalf' },
    { id: 'business', label: 'Business Operations', desc: 'Run and manage business interests' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/power-of-attorney" className="hover:text-primary-600">Power of Attorney</a>
        <span className="mx-2">/</span>
        <span>{selectedState.name}</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900">Free Power of Attorney Template | LegalDocs</h1>
      <p className="mt-2 text-gray-600">
        Create a legally valid power of attorney for {selectedState.name}. Grant someone you trust the authority to act on your behalf.
      </p>

      {/* Yellow Disclaimer Box */}
      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This template is for informational purposes only and does not constitute legal advice. 
        Power of attorney laws vary by state and individual circumstances. Consult with a licensed attorney in {selectedState.name} 
        before using this document to ensure it meets your specific needs and complies with all applicable laws.
      </div>

      {/* State Selector */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">Select Your State</label>
        <select
          value={selectedState.abbr}
          onChange={(e) => {
            const state = states.find(s => s.abbr === e.target.value);
            if (state) setSelectedState(state);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {states.map((state) => (
            <option key={state.abbr} value={state.abbr}>{state.name}</option>
          ))}
        </select>
        <p className="mt-2 text-sm text-gray-500">{selectedState.note}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Principal Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Principal Name (Person Granting Authority)</label>
            <input
              type="text"
              value={formData.principalName}
              onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Jane Smith"
              required
            />
          </div>

          {/* Agent Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Agent Name (Person Receiving Authority)</label>
            <input
              type="text"
              value={formData.agentName}
              onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="John Smith"
              required
            />
          </div>
        </div>

        {/* Principal Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Principal Address</label>
          <input
            type="text"
            value={formData.principalAddress}
            onChange={(e) => setFormData({ ...formData, principalAddress: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="123 Main St, Los Angeles, CA 90001"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Effective Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Effective Date</label>
            <input
              type="date"
              value={formData.effectiveDate}
              onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          {/* Expiration Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiration Date (Optional)</label>
            <input
              type="date"
              value={formData.expirationDate}
              onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            <p className="mt-1 text-xs text-gray-500">Leave blank for a durable POA that remains in effect until revoked</p>
          </div>
        </div>

        {/* Powers Granted */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Powers Granted</label>
          <div className="mt-3 space-y-3">
            {powers.map((power) => (
              <label key={power.id} className="flex items-start gap-3 rounded-md border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.powersGranted.includes(power.id)}
                  onChange={() => handlePowerChange(power.id)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <span className="font-medium text-gray-900">{power.label}</span>
                  <p className="text-sm text-gray-500">{power.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* State Requirements Note */}
        <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800">
          <strong>{selectedState.name} Requirements:</strong>
          <ul className="mt-2 list-disc list-inside">
            <li>Age requirement: {selectedState.ageRequirement}</li>
            <li>Witnesses: {selectedState.witnesses}</li>
            <li>Must be signed by the principal</li>
          </ul>
        </div>

        {/* Download Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700"
        >
          Download PDF
        </button>
      </form>

      {/* State-Specific Information */}
      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">About Power of Attorney in {selectedState.name}</h2>
        <div className="mt-4 space-y-4 text-gray-600">
          <p>
            A Power of Attorney (POA) is a legal document that gives someone you trust (your agent) the authority to 
            make decisions and act on your behalf. In {selectedState.name}, POAs are governed by state-specific laws that 
            outline the requirements for validity.
          </p>
          <p>
            There are several types of POA available:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>General POA:</strong> Grants broad authority for financial and legal matters</li>
            <li><strong>Durable POA:</strong> Remains in effect if you become incapacitated</li>
            <li><strong>Springing POA:</strong> Takes effect only upon a specific event (e.g., incapacity)</li>
            <li><strong>Limited/Special POA:</strong> Grants authority for specific transactions only</li>
            <li><strong>Medical POA:</strong> Specifically for healthcare decisions</li>
          </ul>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900">What is a Power of Attorney?</h3>
            <p className="mt-2 text-gray-600">
              A Power of Attorney (POA) is a legal document that authorizes another person (called an agent or attorney-in-fact) 
              to act on your behalf for specific purposes. This can include managing finances, making medical decisions, or 
              handling real estate transactions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">What&apos;s the difference between a General and Durable POA?</h3>
            <p className="mt-2 text-gray-600">
              A General POA ends if you become mentally incapacitated, while a Durable POA remains in effect even if you 
              lose the ability to make decisions. In {selectedState.name}, if you want your POA to continue in case of 
              incapacity, you must specifically state it is &quot;durable&quot; in the document.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Can I revoke a Power of Attorney?</h3>
            <p className="mt-2 text-gray-600">
              Yes, you can revoke a POA at any time as long as you are mentally competent. To revoke in {selectedState.name}, 
              you should provide written notice to your agent and any third parties who have received the POA. It is recommended 
              to also revoke it in front of a notary public.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Does a POA need to be notarized in {selectedState.name}?</h3>
            <p className="mt-2 text-gray-600">
              {selectedState.witnesses}. While notarization is not always legally required for all types of POA in 
              {selectedState.name}, it is strongly recommended as it adds an extra layer of legal protection and 
              makes the document more widely accepted by banks and other institutions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">What happens if my agent abuses their power?</h3>
            <p className="mt-2 text-gray-600">
              If your agent acts outside the authority granted or misuses their position, you can revoke the POA immediately. 
              If you are incapacitated and unable to revoke, concerned parties can petition the court to have the agent removed 
              and potentially hold them legally and financially accountable.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Can I have more than one agent?</h3>
            <p className="mt-2 text-gray-600">
              Yes, you can appoint co-agents who must act together, or successor agents who step in if your primary agent 
              is unable or unwilling to serve. In {selectedState.name}, if you appoint co-agents, they generally must act 
              jointly unless the document specifies otherwise.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="mt-12 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Important:</strong> This document is provided as a template only and does not create an attorney-client 
        relationship. Laws governing power of attorney vary by state and may change. Always consult with a qualified 
        attorney in {selectedState.name} to ensure your POA meets all legal requirements and adequately protects your interests.
      </div>
    </div>
  );
}
