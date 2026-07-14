'use client';

import { useState } from 'react';
import { generatePdf } from '@/lib/pdf-builder';

const states = [
  { name: 'California', note: 'California advance directives are governed by the Probate Code §4701. A witnessed directive or one notarized is valid. The POLST form is also recognized.' },
  { name: 'Texas', note: 'Texas advance directives require either notarization or two adult witnesses. The directive becomes effective only when the declarant is unable to communicate decisions.' },
  { name: 'Florida', note: 'Florida requires the living will to be signed in the presence of two witnesses. The Sunshine State has specific statutory language under Florida Statute §765.' },
  { name: 'New York', note: 'New York recognizes written advance directives. A health care proxy (HIPAA-compliant) is the primary mechanism. Living wills are honored under common law.' },
  { name: 'Illinois', note: 'Illinois advance directives are governed by the Health Care Surrogate Act. A written declaration must be signed by the declarant and one witness or notarized.' },
];

type FormData = {
  declarantName: string;
  agentName: string;
  agentRelationship: string;
  treatmentWishes: string;
  organDonation: string;
  specificInstructions: string;
};

export default function LivingWillPage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    declarantName: '',
    agentName: '',
    agentRelationship: '',
    treatmentWishes: 'full',
    organDonation: 'no',
    specificInstructions: '',
  });

  const handleDownload = async () => {
    await generatePdf({
      title: 'Living Will (Advance Directive)',
      state: selectedState.name,
      sections: [
        { heading: 'Declarant Information', fields: [
          { label: 'Declarant Name', value: formData.declarantName },
        ]},
        { heading: 'Health Care Agent', fields: [
          { label: 'Agent Name', value: formData.agentName },
          { label: 'Relationship', value: formData.agentRelationship },
        ]},
        { heading: 'Wishes and Directives', fields: [
          { label: 'Life-Sustaining Treatment', value: formData.treatmentWishes === 'full' ? 'Full Treatment' : formData.treatmentWishes === 'limited' ? 'Limited Treatment' : 'Comfort Care Only' },
          { label: 'Organ Donation', value: formData.organDonation === 'yes' ? 'Yes' : 'No' },
          { label: 'Specific Instructions', value: formData.specificInstructions },
        ]},
      ],
      fileName: 'living-will-advance-directive.pdf',
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/living-will" className="hover:text-primary-600">Living Will</a>
        <span className="mx-2">/</span>
        <span>{selectedState.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        Free Living Will (Advance Directive) Template | LegalDocs
      </h1>

      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This advance directive template is for informational purposes only and does not constitute legal advice. Advance directive requirements vary by state. Consult with a licensed attorney or estate planning professional for advice specific to your situation.
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">Select Your State</label>
        <select
          value={selectedState.name}
          onChange={(e) => {
            const state = states.find(s => s.name === e.target.value);
            if (state) setSelectedState(state);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {states.map((state) => (
            <option key={state.name} value={state.name}>{state.name}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
        <strong>{selectedState.name} Advance Directive Law:</strong> {selectedState.note}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleDownload(); }} className="mt-8 space-y-6">
        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Declarant Information</h3>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">Your Full Legal Name</label>
            <input type="text" value={formData.declarantName} onChange={(e) => setFormData({ ...formData, declarantName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="Jane Doe" />
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Health Care Agent</h3>
          <p className="mt-1 text-sm text-gray-500">Designate a trusted person to make medical decisions if you are unable to do so.</p>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Agent Full Name</label>
              <input type="text" value={formData.agentName} onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Relationship to You</label>
              <input type="text" value={formData.agentRelationship} onChange={(e) => setFormData({ ...formData, agentRelationship: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="Spouse, Child, Sibling, Friend" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Wishes for Life-Sustaining Treatment</h3>
          <div className="mt-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select your wishes</label>
              <select value={formData.treatmentWishes} onChange={(e) => setFormData({ ...formData, treatmentWishes: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <option value="full">Full Treatment — I want all life-sustaining treatments to be provided</option>
                <option value="limited">Limited Treatment — I want some life-sustaining treatments but not aggressive interventions</option>
                <option value="comfort">Comfort Care Only — I want only pain management and comfort measures</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Organ Donation</label>
              <div className="mt-2 flex gap-6">
                <label className="flex items-center">
                  <input type="radio" name="organDonation" value="yes" checked={formData.organDonation === 'yes'}
                    onChange={(e) => setFormData({ ...formData, organDonation: e.target.value })}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-700">Yes, I wish to donate</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="organDonation" value="no" checked={formData.organDonation === 'no'}
                    onChange={(e) => setFormData({ ...formData, organDonation: e.target.value })}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-700">No, I do not wish to donate</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Specific Instructions or Additional Wishes</label>
              <textarea value={formData.specificInstructions} onChange={(e) => setFormData({ ...formData, specificInstructions: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" rows={4}
                placeholder="Describe any specific medical preferences, religious or cultural considerations, or other instructions for your health care agent..." />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700">
          Download Living Will PDF
        </button>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">Legal Notes</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>&bull; In {selectedState.name}, advance directives must meet specific legal requirements to be valid.</li>
          <li>&bull; Provide copies to your health care agent, physician, and hospital.</li>
          <li>&bull; You may revoke this directive at any time by notifying your agent or provider.</li>
          <li>&bull; Review and update your directive periodically, especially after major life events.</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900">What is a living will?</h3>
            <p className="mt-2 text-gray-600">A living will, also called an advance directive, is a legal document that specifies your wishes regarding medical treatment if you become unable to communicate those decisions. It typically covers life-sustaining treatments, pain management, and end-of-life care preferences.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Is a living will the same as a last will and testament?</h3>
            <p className="mt-2 text-gray-600">No. A living will addresses your medical care wishes during your lifetime when you cannot communicate. A last will and testament (or &quot;last will&quot;) distributes your assets after death. Both are important estate planning documents.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">How do I make my living will valid in {selectedState.name}?</h3>
            <p className="mt-2 text-gray-600">In {selectedState.name}, advance directives generally require the declarant&apos;s signature and may require witnesses or notarization. Check {selectedState.name} statute requirements to ensure your document is legally binding.</p>
          </div>
        </div>
      </div>
    </div>
  );
}