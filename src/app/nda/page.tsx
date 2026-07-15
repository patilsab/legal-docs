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

const termOptions = ['6 Months', '1 Year', '2 Years', '3 Years', '5 Years', 'Indefinite'];

type FormData = {
  disclosingParty: string;
  receivingParty: string;
  effectiveDate: string;
  confidentialInfo: string;
  termDuration: string;
  state: string;
};

export default function NdaPage() {
  const [selectedState, setSelectedState] = useState('California');
  const [formData, setFormData] = useState<FormData>({
    disclosingParty: '',
    receivingParty: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    confidentialInfo: '',
    termDuration: '1 Year',
    state: 'California',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${selectedState} Non-Disclosure Agreement`,
      state: selectedState,
      sections: [
        { heading: 'Party Information', fields: [
          { label: 'Disclosing Party', value: formData.disclosingParty },
          { label: 'Receiving Party', value: formData.receivingParty },
        ]},
        { heading: 'Agreement Details', fields: [
          { label: 'Effective Date', value: formData.effectiveDate },
          { label: 'Confidential Information', value: formData.confidentialInfo },
          { label: 'Term Duration', value: formData.termDuration },
        ]},
      ],
      fileName: 'nda.pdf',
    });
  };

  const faqs = [
    {
      q: 'What is a Non-Disclosure Agreement (NDA)?',
      a: 'A Non-Disclosure Agreement is a legally binding contract in which one or more parties agree not to disclose confidential information shared during a business relationship. NDAs protect trade secrets, proprietary data, and sensitive business information.',
    },
    {
      q: 'When should I use an NDA?',
      a: 'You should use an NDA when sharing sensitive business information with employees, contractors, potential partners, investors, or anyone outside your organization. Common situations include business negotiations, hiring processes, and product development discussions.',
    },
    {
      q: 'What makes an NDA enforceable?',
      a: 'For an NDA to be enforceable, it must clearly define what constitutes confidential information, have a reasonable scope and duration, include proper consideration (something of value exchanged), and comply with your state\'s contract laws.',
    },
    {
      q: 'What happens if someone breaches an NDA?',
      a: 'If a party breaches an NDA, the disclosing party may seek injunctive relief (a court order to stop the disclosure), monetary damages for losses suffered, and potentially punitive damages depending on the severity of the breach and state law.',
    },
    {
      q: 'Can an NDA last forever?',
      a: 'While some NDAs specify indefinite duration, courts generally prefer reasonable time limits. An indefinite NDA may be unenforceable if a court determines the duration is unreasonable for the type of information being protected.',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/nda" className="hover:text-primary-600">NDA</a>
        <span className="mx-2">/</span>
        <a href={`/nda/${selectedState.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{selectedState}</a>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">
        {selectedState} Non-Disclosure Agreement Template
      </h1>

      {/* Disclaimer */}
      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This template is for informational purposes only and does not constitute legal advice. NDA requirements vary by state and the nature of the information being protected. Consult a licensed attorney to ensure your NDA is enforceable in your jurisdiction.
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Disclosing Party</label>
            <input
              type="text"
              value={formData.disclosingParty}
              onChange={(e) => handleChange('disclosingParty', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Company or individual sharing info"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Receiving Party</label>
            <input
              type="text"
              value={formData.receivingParty}
              onChange={(e) => handleChange('receivingParty', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Company or individual receiving info"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Effective Date</label>
            <input
              type="date"
              value={formData.effectiveDate}
              onChange={(e) => handleChange('effectiveDate', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Term Duration</label>
            <select
              value={formData.termDuration}
              onChange={(e) => handleChange('termDuration', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              {termOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description of Confidential Information</label>
          <textarea
            value={formData.confidentialInfo}
            onChange={(e) => handleChange('confidentialInfo', e.target.value)}
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="e.g., Trade secrets, customer lists, financial data, product designs, marketing strategies, source code, algorithms, business plans, and any other proprietary information shared between the parties."
          />
          <p className="mt-1 text-xs text-gray-400">Be as specific as possible about what information is considered confidential.</p>
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