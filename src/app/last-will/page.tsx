'use client';

import { generatePdf } from '@/lib/pdf-builder';

import { useState } from 'react';

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming',
];

type FormData = {
  testatorName: string;
  executorName: string;
  executorContact: string;
  beneficiaryNames: string;
  specificBequests: string;
  propertyAddress: string;
  date: string;
  state: string;
};

export default function LastWillPage() {
  const [selectedState, setSelectedState] = useState('California');
  const [formData, setFormData] = useState<FormData>({
    testatorName: '',
    executorName: '',
    executorContact: '',
    beneficiaryNames: '',
    specificBequests: '',
    propertyAddress: '',
    date: new Date().toISOString().split('T')[0],
    state: 'California',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${selectedState} Last Will and Testament`,
      state: selectedState,
      sections: [
        { heading: 'Testator Information', fields: [
          { label: 'Testator Name', value: formData.testatorName },
        ]},
        { heading: 'Executor Information', fields: [
          { label: 'Executor Name', value: formData.executorName },
          { label: 'Executor Contact', value: formData.executorContact },
        ]},
        { heading: 'Estate Details', fields: [
          { label: 'Beneficiaries', value: formData.beneficiaryNames },
          { label: 'Specific Bequests', value: formData.specificBequests },
          { label: 'Property Address', value: formData.propertyAddress },
          { label: 'Date', value: formData.date },
        ]},
      ],
      fileName: 'last-will.pdf',
    });
  };

  const faqs = [
    {
      q: 'What is a Last Will and Testament?',
      a: 'A Last Will and Testament is a legal document that specifies how your assets and property should be distributed after your death. It also allows you to name a guardian for minor children and designate an executor to manage your estate.',
    },
    {
      q: 'Do I need a lawyer to create a valid will?',
      a: 'While it is not legally required to have a lawyer draft your will, consulting an attorney is strongly recommended. Most states require the will to be signed by at least two witnesses, and some require notarization.',
    },
    {
      q: 'What happens if I die without a will?',
      a: 'If you die without a valid will (intestate), your assets will be distributed according to your state\'s intestacy laws. Typically, your spouse and children inherit first. The court will appoint an administrator to manage your estate.',
    },
    {
      q: 'Can I change my will after signing it?',
      a: 'Yes. You can create a codicil (an amendment to your will) or draft an entirely new will. Any changes must be signed and witnessed according to your state\'s laws to be legally valid.',
    },
    {
      q: 'How often should I update my will?',
      a: 'You should review and update your will after major life events such as marriage, divorce, birth of a child, acquisition of significant assets, or the death of a beneficiary or executor.',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/last-will" className="hover:text-primary-600">Last Will and Testament</a>
        <span className="mx-2">/</span>
        <a href={`/last-will/${selectedState.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{selectedState}</a>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">
        {selectedState} Last Will and Testament Template
      </h1>

      {/* Disclaimer */}
      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This template is for informational purposes only and does not constitute legal advice. Wills are governed by state-specific laws regarding execution, witnesses, and notarization. Always consult a licensed attorney in your state to ensure your will is legally valid and meets all formal requirements.
      </div>

      {/* State Selector */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">Select Your State</label>
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            handleChange('state', e.target.value);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Testator Name (Your Full Legal Name)</label>
          <input
            type="text"
            value={formData.testatorName}
            onChange={(e) => handleChange('testatorName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="John A. Smith"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Executor Name</label>
            <input
              type="text"
              value={formData.executorName}
              onChange={(e) => handleChange('executorName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Jane B. Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Executor Contact</label>
            <input
              type="text"
              value={formData.executorContact}
              onChange={(e) => handleChange('executorContact', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Phone or email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Beneficiary Name(s)</label>
          <input
            type="text"
            value={formData.beneficiaryNames}
            onChange={(e) => handleChange('beneficiaryNames', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Jane Smith, Robert Smith (comma-separated)"
          />
          <p className="mt-1 text-xs text-gray-400">Separate multiple beneficiaries with commas.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Specific Bequests</label>
          <textarea
            value={formData.specificBequests}
            onChange={(e) => handleChange('specificBequests', e.target.value)}
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="e.g., I leave my Rolex watch to my son, Robert Smith. I leave $10,000 to the American Red Cross. I leave the remainder of my estate to my wife, Jane Smith."
          />
          <p className="mt-1 text-xs text-gray-400">Describe specific items, amounts, or assets and who should receive them.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Property Address</label>
          <input
            type="text"
            value={formData.propertyAddress}
            onChange={(e) => handleChange('propertyAddress', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="123 Main St, Los Angeles, CA 90001"
          />
          <p className="mt-1 text-xs text-gray-400">Primary property address to be included in the will.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700"
        >
          Download PDF
        </button>
      </form>

      {/* FAQ Section */}
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