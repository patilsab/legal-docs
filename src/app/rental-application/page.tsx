'use client';

import { useState } from 'react';
import { generatePdf } from '@/lib/pdf-builder';

const states = [
  { name: 'California', note: 'California requires landlords to provide written reasons for denial within 30 days. Fair housing protections are extensive, covering source of income and gender identity.' },
  { name: 'Texas', note: 'Texas follows federal Fair Housing Act requirements. Landlords may ask about income but must treat all applicants equally regardless of race, religion, or family status.' },
  { name: 'Florida', note: 'Florida fair housing laws protect against discrimination based on sexual orientation and gender identity. Source of income is not a protected class.' },
  { name: 'New York', note: 'New York City has strong tenant protections including source of income discrimination laws. Landlords cannot refuse Section 8 or similar vouchers.' },
  { name: 'Illinois', note: 'Illinois has statewide fair housing protections. Chicago adds additional protections for source of income and criminal history screening.' },
];

type FormData = {
  applicantName: string;
  dob: string;
  ssnLast4: string;
  currentAddress: string;
  employer: string;
  employerAddress: string;
  monthlyIncome: string;
  references: string;
  pets: boolean;
  numberOfOccupants: string;
  vehicles: string;
};

export default function RentalApplicationPage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    applicantName: '',
    dob: '',
    ssnLast4: '',
    currentAddress: '',
    employer: '',
    employerAddress: '',
    monthlyIncome: '',
    references: '',
    pets: false,
    numberOfOccupants: '',
    vehicles: '',
  });

  const handleDownload = async () => {
    await generatePdf({
      title: 'Rental Application',
      state: selectedState.name,
      sections: [
        { heading: 'Applicant Information', fields: [
          { label: 'Full Name', value: formData.applicantName },
          { label: 'Date of Birth', value: formData.dob },
          { label: 'SSN Last 4', value: formData.ssnLast4 },
          { label: 'Current Address', value: formData.currentAddress },
        ]},
        { heading: 'Employment Information', fields: [
          { label: 'Employer', value: formData.employer },
          { label: 'Employer Address', value: formData.employerAddress },
          { label: 'Monthly Income', value: `$${formData.monthlyIncome}` },
        ]},
        { heading: 'Additional Details', fields: [
          { label: 'Pets', value: formData.pets ? 'Yes' : 'No' },
          { label: 'Number of Occupants', value: formData.numberOfOccupants },
          { label: 'Vehicles', value: formData.vehicles },
          { label: 'References', value: formData.references },
        ]},
      ],
      fileName: 'rental-application.pdf',
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/rental-application" className="hover:text-primary-600">Rental Application</a>
        <span className="mx-2">/</span>
        <span>{selectedState.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        Free Rental Application Template | LegalDocs
      </h1>

      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This rental application template is for informational purposes only and does not constitute legal advice. Rental laws vary by state and locality. Consult with a licensed landlord-tenant attorney for advice specific to your situation.
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
        <strong>{selectedState.name} Fair Housing Note:</strong> {selectedState.note}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleDownload(); }} className="mt-8 space-y-6">
        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Applicant Information</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Legal Name</label>
              <input type="text" value={formData.applicantName} onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="John Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SSN Last 4 Digits</label>
              <input type="password" maxLength={4} value={formData.ssnLast4} onChange={(e) => setFormData({ ...formData, ssnLast4: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="1234" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Address</label>
              <input type="text" value={formData.currentAddress} onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="123 Main St, City, State ZIP" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Employment Information</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Employer</label>
              <input type="text" value={formData.employer} onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="Company Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employer Address</label>
              <input type="text" value={formData.employerAddress} onChange={(e) => setFormData({ ...formData, employerAddress: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="456 Work Blvd, City, State" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Income ($)</label>
              <input type="number" value={formData.monthlyIncome} onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="5000" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Additional Information</h3>
          <div className="mt-3 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Occupants</label>
                <input type="number" min="1" value={formData.numberOfOccupants} onChange={(e) => setFormData({ ...formData, numberOfOccupants: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicles</label>
                <input type="text" value={formData.vehicles} onChange={(e) => setFormData({ ...formData, vehicles: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="2023 Honda Civic - ABC 1234" />
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="pets" checked={formData.pets}
                onChange={(e) => setFormData({ ...formData, pets: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="pets" className="ml-2 text-sm font-medium text-gray-700">
                I have pets (service animals and emotional support animals may be exempt from no-pet policies)
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Personal References</label>
              <textarea value={formData.references} onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" rows={4}
                placeholder="Reference 1: Name, Phone, Relationship&#10;Reference 2: Name, Phone, Relationship&#10;Reference 3: Name, Phone, Relationship" />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700">
          Download Rental Application PDF
        </button>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">Legal Notes</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>&bull; Landlords must comply with the federal Fair Housing Act and state-specific fair housing laws.</li>
          <li>&bull; In {selectedState.name}, landlords may not discriminate based on protected classes.</li>
          <li>&bull; Background and credit checks typically require applicant consent.</li>
          <li>&bull; Application fees should be reasonable and reflect actual screening costs.</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900">What information can a landlord ask on a rental application?</h3>
            <p className="mt-2 text-gray-600">Landlords may typically ask for personal identification, income verification, employment history, rental history, references, and consent for background/credit checks. In {selectedState.name}, certain inquiries may be restricted by fair housing laws.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Can a landlord deny my application based on criminal history?</h3>
            <p className="mt-2 text-gray-600">Rules vary by jurisdiction. Some states and cities restrict the use of criminal records in tenant screening. In {selectedState.name}, landlords must follow applicable fair housing guidelines when making denial decisions.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Is there a limit on rental application fees?</h3>
            <p className="mt-2 text-gray-600">Some states cap application fees to cover only the actual cost of screening. Check {selectedState.name} landlord-tenant law for specific limits. Fees should be disclosed upfront and receipts provided.</p>
          </div>
        </div>
      </div>
    </div>
  );
}