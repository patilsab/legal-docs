'use client';

import { useState } from 'react';
import { generatePdf } from '@/lib/pdf-builder';

const states = [
  { name: 'California', abbr: 'CA', note: 'California Confidentiality of Medical Information Act (CMIA) provides stricter protections than federal HIPAA. CA Health & Safety Code §123110 requires specific written authorization with enumerated elements.' },
  { name: 'Texas', abbr: 'TX', note: 'Texas Medical Records Privacy Act (Tex. Health & Safety Code §181) provides HIPAA-equivalent protections. Texas requires specific consent elements and allows patients to restrict disclosures.' },
  { name: 'Florida', abbr: 'FL', note: 'Florida Health Privacy Act (Fla. Stat. §381.004) supplements HIPAA with state-specific protections. Florida requires detailed authorization forms for release of medical records.' },
  { name: 'New York', abbr: 'NY', note: 'New York Public Health Law §4410 and Mental Hygiene Law §33.13 govern medical records disclosure. NY HIPAA implementations include specific state-mandated authorization elements and time limits.' },
  { name: 'Illinois', abbr: 'IL', note: 'Illinois Mental Health and Developmental Disabilities Confidentiality Act (740 ILCS 110) provides additional protections. Illinois requires specific authorization language and patient consent forms.' },
];

type FormData = {
  patientName: string;
  patientDOB: string;
  providerName: string;
  providerAddress: string;
  recordsRequested: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  purposeOfDisclosure: string;
  authorizedPerson: string;
  expirationDate: string;
};

export default function MedicalAuthorizationPage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    patientDOB: '',
    providerName: '',
    providerAddress: '',
    recordsRequested: '',
    dateRangeStart: '',
    dateRangeEnd: '',
    purposeOfDisclosure: '',
    authorizedPerson: '',
    expirationDate: '',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownload = async () => {
    await generatePdf({
      title: 'Medical Records Authorization',
      state: selectedState.name,
      sections: [
        {
          heading: 'Patient Information',
          fields: [
            { label: 'Patient Name', value: formData.patientName },
            { label: 'Patient Date of Birth', value: formData.patientDOB },
          ],
        },
        {
          heading: 'Healthcare Provider',
          fields: [
            { label: 'Provider/Facility Name', value: formData.providerName },
            { label: 'Provider Address', value: formData.providerAddress },
          ],
        },
        {
          heading: 'Authorization Details',
          fields: [
            { label: 'Records Requested', value: formData.recordsRequested },
            { label: 'Date Range Start', value: formData.dateRangeStart },
            { label: 'Date Range End', value: formData.dateRangeEnd },
            { label: 'Purpose of Disclosure', value: formData.purposeOfDisclosure },
            { label: 'Authorized Person', value: formData.authorizedPerson },
            { label: 'Expiration Date', value: formData.expirationDate },
          ],
        },
      ],
      fileName: 'medical-records-authorization.pdf',
    });
  };

  const faqs = [
    {
      q: 'What is a medical records authorization?',
      a: 'A medical records authorization is a legal document that grants permission for a healthcare provider to share a patient\'s protected health information (PHI) with a designated person or entity. It is required under HIPAA and state privacy laws.',
    },
    {
      q: 'Do I need a medical authorization to access my own records?',
      a: 'Under HIPAA, patients have the right to access their own medical records without a formal authorization. However, you may need to submit a written request, and providers may charge a reasonable fee for copying.',
    },
    {
      q: 'How long is a medical authorization valid?',
      a: 'A medical authorization should specify an expiration date. Under HIPAA, an authorization is valid for one year unless a different timeframe is specified. Some states impose additional restrictions on authorization duration.',
    },
    {
      q: 'Can I revoke a medical records authorization?',
      a: 'Yes. Under HIPAA, you have the right to revoke your authorization at any time in writing. However, revocation does not affect any actions already taken in reliance on the authorization before you revoked it.',
    },
    {
      q: 'What information must a valid medical authorization include?',
      a: 'Under HIPAA, a valid authorization must include: (1) a description of the information to be used or disclosed, (2) the name or description of the person making the disclosure, (3) the name of the person who will receive the information, (4) the purpose of the disclosure, (5) an expiration date, and (6) the patient\'s signature.',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/medical-authorization" className="hover:text-primary-600">Medical Authorization</a>
        <span className="mx-2">/</span>
        <span>{selectedState.name}</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">
        Free Medical Records Authorization Template | LegalDocs
      </h1>

      {/* Disclaimer */}
      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This template is for informational purposes only and does not constitute legal advice. Medical records authorization requirements vary by state and are governed by HIPAA as well as state-specific privacy laws. Consult with a licensed attorney or your healthcare provider to ensure compliance with all applicable regulations.
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
        <strong>{selectedState.name} ({selectedState.abbr}) HIPAA/Privacy Notes:</strong> {selectedState.note}
      </div>

      {/* Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleDownload(); }} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input
              type="text"
              value={formData.patientName}
              onChange={(e) => handleChange('patientName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Full legal name of the patient"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Date of Birth</label>
            <input
              type="date"
              value={formData.patientDOB}
              onChange={(e) => handleChange('patientDOB', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Healthcare Provider / Facility Name</label>
            <input
              type="text"
              value={formData.providerName}
              onChange={(e) => handleChange('providerName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Hospital, clinic, or doctor's office"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Provider Address</label>
            <input
              type="text"
              value={formData.providerAddress}
              onChange={(e) => handleChange('providerAddress', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="123 Medical Center Dr, City, State ZIP"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Records Requested</label>
          <textarea
            value={formData.recordsRequested}
            onChange={(e) => handleChange('recordsRequested', e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Describe the specific records you need (e.g., discharge summaries, lab results, imaging studies, operative reports, consultation notes, prescription history, mental health records, etc.)"
          />
          <p className="mt-1 text-xs text-gray-400">Be as specific as possible to ensure you receive the correct records.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Range Start</label>
            <input
              type="date"
              value={formData.dateRangeStart}
              onChange={(e) => handleChange('dateRangeStart', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Range End</label>
            <input
              type="date"
              value={formData.dateRangeEnd}
              onChange={(e) => handleChange('dateRangeEnd', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Purpose of Disclosure</label>
            <select
              value={formData.purposeOfDisclosure}
              onChange={(e) => handleChange('purposeOfDisclosure', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">Select purpose...</option>
              <option value="Continuity of Care">Continuity of Care</option>
              <option value="Personal Use">Personal Use</option>
              <option value="Legal Proceedings">Legal Proceedings</option>
              <option value="Insurance Claim">Insurance Claim</option>
              <option value="Disability Benefits">Disability Benefits</option>
              <option value="Employment">Employment</option>
              <option value="School/Sports">School/Sports</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Authorized Person / Entity</label>
            <input
              type="text"
              value={formData.authorizedPerson}
              onChange={(e) => handleChange('authorizedPerson', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Name of person/entity authorized to receive records"
            />
            <p className="mt-1 text-xs text-gray-400">Who should receive the records? Leave blank for patient self-access.</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Authorization Expiration Date</label>
          <input
            type="date"
            value={formData.expirationDate}
            onChange={(e) => handleChange('expirationDate', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          <p className="mt-1 text-xs text-gray-400">Under HIPAA, authorizations are typically valid for one year. Set an appropriate expiration date.</p>
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
        <h2 className="text-xl font-bold text-gray-900">{selectedState.name} Medical Records Privacy Notes</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>&bull; <strong>HIPAA Compliance:</strong> All medical record disclosures must comply with the Health Insurance Portability and Accountability Act (HIPAA) and the {selectedState.name} Health Records Act.</li>
          <li>&bull; <strong>Patient Rights:</strong> Patients have the right to access, amend, and receive an accounting of disclosures of their protected health information.</li>
          <li>&bull; <strong>Authorization Required:</strong> Most disclosures of medical records require written authorization from the patient or their legal representative.</li>
          <li>&bull; <strong>Exceptions:</strong> Certain disclosures (e.g., treatment, payment, healthcare operations) may be made without explicit authorization under HIPAA.</li>
          <li>&bull; <strong>State Protections:</strong> {selectedState.name} may have additional protections beyond HIPAA for sensitive categories such as mental health, substance abuse, and HIV/AIDS records.</li>
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