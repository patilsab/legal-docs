'use client';

import { useState } from 'react';
import { generatePdf } from '@/lib/pdf-builder';

const states = [
  { name: 'California', abbr: 'CA', note: 'California has specific anti-SLAPP statutes (CCP §425.16) that may limit defamation claims. IP enforcement follows federal and state law under Cal. Civ. Code §3344 for right of publicity.' },
  { name: 'Texas', abbr: 'TX', note: 'Texas Civil Practice & Remedies Code Ch. 73 governs defamation claims. Anti-SLAPP protections apply under §27.001 et seq. IP claims may involve the Texas Uniform Trade Secrets Act.' },
  { name: 'Florida', abbr: 'FL', note: 'Florida Statute §768.295 limits defamation actions against landlords. Florida\'s anti-SLAPP law (§768.295) provides protections. IP enforcement includes state trademark and copyright provisions.' },
  { name: 'New York', abbr: 'NY', note: 'New York has strong protections for defamation under NY Civil Rights Law §§50-51. The state follows the "actual malice" standard for public figures. IP claims fall under NY General Business Law §360-l.' },
  { name: 'Illinois', abbr: 'IL', note: 'Illinois has a constitutionally-based SLAPP statute (735 ILCS 112). Defamation is governed by common law with specific statutory elements. IP claims follow the Illinois Trademark Act and state copyright provisions.' },
];

type FormData = {
  senderName: string;
  senderAddress: string;
  recipientName: string;
  recipientAddress: string;
  violationDescription: string;
  dateOfViolation: string;
  actionDemanded: string;
  deadlineDate: string;
};

export default function CeaseDesistPage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    senderName: '',
    senderAddress: '',
    recipientName: '',
    recipientAddress: '',
    violationDescription: '',
    dateOfViolation: '',
    actionDemanded: '',
    deadlineDate: '',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownload = async () => {
    await generatePdf({
      title: 'Cease and Desist Letter',
      state: selectedState.name,
      sections: [
        {
          heading: 'Sender Information',
          fields: [
            { label: 'Sender Name', value: formData.senderName },
            { label: 'Sender Address', value: formData.senderAddress },
          ],
        },
        {
          heading: 'Recipient Information',
          fields: [
            { label: 'Recipient Name', value: formData.recipientName },
            { label: 'Recipient Address', value: formData.recipientAddress },
          ],
        },
        {
          heading: 'Violation Details',
          fields: [
            { label: 'Description of Violation', value: formData.violationDescription },
            { label: 'Date of Violation', value: formData.dateOfViolation },
            { label: 'Action Demanded', value: formData.actionDemanded },
            { label: 'Deadline', value: formData.deadlineDate },
          ],
        },
      ],
      fileName: 'cease-and-desist-letter.pdf',
    });
  };

  const faqs = [
    {
      q: 'What is a cease and desist letter?',
      a: 'A cease and desist letter is a formal document that demands an individual or entity stop engaging in a specific activity, such as copyright infringement, defamation, harassment, or other illegal conduct. It serves as a first step before potential legal action.',
    },
    {
      q: 'Is a cease and desist letter legally binding?',
      a: 'A cease and desist letter itself is not a legally binding order. However, it serves as formal notice that you are aware of the violation and may take legal action. Failing to respond to a legitimate cease and desist can strengthen a court case against you.',
    },
    {
      q: 'How long do I have to respond to a cease and desist?',
      a: 'The typical response window is 10 to 30 days, depending on the nature of the claim and state law. Always check the deadline specified in the letter and consult with an attorney to understand your obligations and rights.',
    },
    {
      q: 'What happens if I ignore a cease and desist?',
      a: 'Ignoring a cease and desist letter may lead to the sender filing a lawsuit seeking injunctive relief, monetary damages, or both. Courts may view continued violations after receiving notice more harshly.',
    },
    {
      q: 'Should I send a cease and desist myself or through an attorney?',
      a: 'While you can send a cease and desist yourself, sending it through an attorney adds credibility and ensures legal compliance. An attorney can properly frame the demands and increase the likelihood of a favorable outcome.',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/cease-desist" className="hover:text-primary-600">Cease and Desist</a>
        <span className="mx-2">/</span>
        <span>{selectedState.name}</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">
        Free Cease and Desist Letter Template | LegalDocs
      </h1>

      {/* Disclaimer */}
      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This template is for informational purposes only and does not constitute legal advice. Cease and desist requirements vary by state and the nature of the violation. Consult with a licensed attorney to ensure your letter is legally effective and appropriate for your situation.
      </div>

      {/* State Selector */}
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

      {/* State Legal Note */}
      <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
        <strong>{selectedState.name} ({selectedState.abbr}) Law Notes:</strong> {selectedState.note}
      </div>

      {/* Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleDownload(); }} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sender Name</label>
            <input
              type="text"
              value={formData.senderName}
              onChange={(e) => handleChange('senderName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Your full legal name or company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
            <input
              type="text"
              value={formData.recipientName}
              onChange={(e) => handleChange('recipientName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Name of the person or entity"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sender Address</label>
            <textarea
              value={formData.senderAddress}
              onChange={(e) => handleChange('senderAddress', e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="123 Main St, City, State ZIP"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipient Address</label>
            <textarea
              value={formData.recipientAddress}
              onChange={(e) => handleChange('recipientAddress', e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="456 Oak Ave, City, State ZIP"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description of Violation</label>
          <textarea
            value={formData.violationDescription}
            onChange={(e) => handleChange('violationDescription', e.target.value)}
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Describe in detail the specific actions that constitute the violation (e.g., unauthorized use of copyrighted material, defamatory statements, trademark infringement, harassment, etc.)"
          />
          <p className="mt-1 text-xs text-gray-400">Be specific and factual. Include dates, locations, and any evidence you have.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Violation</label>
            <input
              type="date"
              value={formData.dateOfViolation}
              onChange={(e) => handleChange('dateOfViolation', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline for Compliance</label>
            <input
              type="date"
              value={formData.deadlineDate}
              onChange={(e) => handleChange('deadlineDate', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            <p className="mt-1 text-xs text-gray-400">Typical deadline: 10-30 days from the date of the letter.</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Action Demanded</label>
          <textarea
            value={formData.actionDemanded}
            onChange={(e) => handleChange('actionDemanded', e.target.value)}
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Specify exactly what actions you demand (e.g., cease all use of the copyrighted material, remove defamatory content, stop using the trademark, etc.)"
          />
          <p className="mt-1 text-xs text-gray-400">Clearly state the specific actions you require and any remedies you seek.</p>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700"
        >
          Download PDF
        </button>
      </form>

      {/* Legal Notes */}
      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">{selectedState.name} Cease and Desist Legal Notes</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>&bull; <strong>State Law:</strong> {selectedState.abbr} has specific statutes governing the types of violations you may address in a cease and desist letter.</li>
          <li>&bull; <strong>Evidence:</strong> Document all evidence of the violation before sending. Courts consider the specificity and credibility of claims.</li>
          <li>&bull; <strong>Delivery:</strong> Send via certified mail with return receipt requested to establish proof of delivery.</li>
          <li>&bull; <strong>Attorney Review:</strong> Have an attorney review your letter to ensure compliance with {selectedState.name} law and maximize legal impact.</li>
          <li>&bull; <strong>Follow-Up:</strong> If the recipient does not comply, you may need to file for an injunction or pursue other legal remedies.</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-6">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-900">{faq.q}</h3>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}