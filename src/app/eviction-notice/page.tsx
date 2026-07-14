'use client';

import { generatePdf } from '@/lib/pdf-builder';

import { useState } from 'react';

const states = [
  { name: 'California', noticePeriods: ['3-Day', '30-Day', '60-Day'] },
  { name: 'Texas', noticePeriods: ['3-Day', '30-Day'] },
  { name: 'Florida', noticePeriods: ['3-Day', '7-Day', '15-Day', '30-Day'] },
  { name: 'New York', noticePeriods: ['14-Day', '30-Day'] },
  { name: 'Illinois', noticePeriods: ['5-Day', '10-Day', '30-Day'] },
];

type FormData = {
  tenantName: string;
  propertyAddress: string;
  noticeType: string;
  date: string;
};

export default function EvictionNoticePage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    tenantName: '',
    propertyAddress: '',
    noticeType: states[0].noticePeriods[0],
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${selectedState.name} Eviction Notice`,
      state: selectedState.name,
      sections: [
        { heading: 'Tenant Information', fields: [
          { label: 'Tenant Name', value: formData.tenantName },
        ]},
        { heading: 'Property Information', fields: [
          { label: 'Property Address', value: formData.propertyAddress },
        ]},
        { heading: 'Notice Details', fields: [
          { label: 'Notice Type', value: formData.noticeType },
          { label: 'Date', value: formData.date },
        ]},
      ],
      fileName: 'eviction-notice.pdf',
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/eviction-notice" className="hover:text-primary-600">Eviction Notice</a>
        <span className="mx-2">/</span>
        <span>{selectedState.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">{selectedState.name} Eviction Notice Template</h1>
      
      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This template is for informational purposes only. Eviction laws vary by state and county. Consult with a licensed attorney before using this notice.
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">Select Your State</label>
        <select
          value={selectedState.name}
          onChange={(e) => {
            const state = states.find(s => s.name === e.target.value);
            if (state) {
              setSelectedState(state);
              setFormData({ ...formData, noticeType: state.noticePeriods[0] });
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {states.map((state) => (
            <option key={state.name} value={state.name}>{state.name}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Notice Type</label>
          <select
            value={formData.noticeType}
            onChange={(e) => setFormData({ ...formData, noticeType: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {selectedState.noticePeriods.map((period) => (
              <option key={period} value={period}>{period} Notice to Vacate</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tenant Name</label>
          <input type="text" value={formData.tenantName} onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="John Smith" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Property Address</label>
          <input type="text" value={formData.propertyAddress} onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="123 Main St, Los Angeles, CA 90001" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>

        <button type="submit" className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700">
          Download PDF
        </button>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">{selectedState.name} Eviction Laws</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>&bull; <strong>Notice Period:</strong> {selectedState.noticePeriods[0]} minimum</li>
          <li>&bull; <strong>Service Method:</strong> Personal delivery or posted on premises</li>
          <li>&bull; <strong>Court Filing Required:</strong> Yes, after notice period expires</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900">How much notice must I give a tenant in {selectedState.name}?</h3>
            <p className="mt-2 text-gray-600">In {selectedState.name}, the minimum notice period depends on the reason for eviction. For non-payment of rent, a {selectedState.noticePeriods[0]} notice is typically required.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Can I evict a tenant without going to court?</h3>
            <p className="mt-2 text-gray-600">No. In {selectedState.name}, you must file an eviction lawsuit after the notice period expires. Self-help evictions are illegal.</p>
          </div>
        </div>
      </div>
    </div>
  );
}