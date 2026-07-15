'use client';

import { generatePdf } from '@/lib/pdf-builder';

import { useState } from 'react';

const states = [
  { name: 'California', maxInterest: '10% (usury limit)', statute: 'Cal. Civ. Code § 1916-1', enforceable: true, witnessRequired: false },
  { name: 'Texas', maxInterest: '10% (usury limit)', statute: 'Tex. Fin. Code § 304.001', enforceable: true, witnessRequired: false },
  { name: 'Florida', maxInterest: '18% (usury limit)', statute: 'Fla. Stat. § 687.01', enforceable: true, witnessRequired: false },
  { name: 'New York', maxInterest: '16% (usury limit)', statute: 'N.Y. Gen. Oblig. Law § 5-501', enforceable: true, witnessRequired: false },
  { name: 'Illinois', maxInterest: '9% (usury limit)', statute: '815 ILCS 205/2', enforceable: true, witnessRequired: false },
];

type FormData = {
  lenderName: string;
  lenderAddress: string;
  borrowerName: string;
  borrowerAddress: string;
  loanAmount: string;
  interestRate: string;
  repaymentType: string;
  paymentDueDate: string;
  lateFee: string;
  lateFeePercent: string;
  effectiveDate: string;
  maturityDate: string;
  secured: boolean;
  collateralDescription: string;
};

export default function PromissoryNotePage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    lenderName: '',
    lenderAddress: '',
    borrowerName: '',
    borrowerAddress: '',
    loanAmount: '',
    interestRate: '5',
    repaymentType: 'monthly',
    paymentDueDate: '',
    lateFee: '25',
    lateFeePercent: '5',
    effectiveDate: new Date().toISOString().split('T')[0],
    maturityDate: '',
    secured: false,
    collateralDescription: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${selectedState.name} Promissory Note`,
      state: selectedState.name,
      sections: [
        { heading: 'Lender Information', fields: [
          { label: 'Lender Name', value: formData.lenderName },
          { label: 'Lender Address', value: formData.lenderAddress },
        ]},
        { heading: 'Borrower Information', fields: [
          { label: 'Borrower Name', value: formData.borrowerName },
          { label: 'Borrower Address', value: formData.borrowerAddress },
        ]},
        { heading: 'Loan Terms', fields: [
          { label: 'Principal Amount', value: `$${formData.loanAmount}` },
          { label: 'Interest Rate', value: `${formData.interestRate}%` },
          { label: 'Repayment Type', value: formData.repaymentType.replace(/_/g, ' ') },
          { label: 'Payment Due', value: formData.paymentDueDate ? `${formData.paymentDueDate}th of month` : 'N/A' },
          { label: 'Late Fee', value: `$${formData.lateFee}` },
          { label: 'Effective Date', value: formData.effectiveDate },
          { label: 'Maturity Date', value: formData.maturityDate || 'N/A' },
          { label: 'Secured', value: formData.secured ? 'Yes' : 'No' },
        ]},
      ],
      fileName: 'promissory-note.pdf',
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/promissory-note" className="hover:text-primary-600">Promissory Note</a>
        <span className="mx-2">/</span>
        <a href={`/promissory-note/${selectedState.name.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{selectedState.name}</a>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">{selectedState.name} Promissory Note Template</h1>

      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This template is for informational purposes only. Interest rates above the state maximum may be unenforceable. Consult with an attorney for large loans or complex financial arrangements.
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

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Lender Information</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Lender Full Name</label>
              <input type="text" value={formData.lenderName} onChange={(e) => setFormData({ ...formData, lenderName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="John Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lender Address</label>
              <input type="text" value={formData.lenderAddress} onChange={(e) => setFormData({ ...formData, lenderAddress: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="123 Main St, City, State" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Borrower Information</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Borrower Full Name</label>
              <input type="text" value={formData.borrowerName} onChange={(e) => setFormData({ ...formData, borrowerName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Borrower Address</label>
              <input type="text" value={formData.borrowerAddress} onChange={(e) => setFormData({ ...formData, borrowerAddress: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="456 Oak Ave, City, State" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Loan Details</h3>
          <div className="mt-3 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Principal Loan Amount ($)</label>
                <input type="number" value={formData.loanAmount} onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="10000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
                <input type="number" step="0.1" min="0" max="40" value={formData.interestRate} onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="5.0" />
                <p className="mt-1 text-xs text-gray-500">Max in {selectedState.name}: {selectedState.maxInterest}</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Repayment Type</label>
                <select value={formData.repaymentType} onChange={(e) => setFormData({ ...formData, repaymentType: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                  <option value="lump_sum">Lump Sum (single payment)</option>
                  <option value="monthly">Monthly Installments</option>
                  <option value="biweekly">Bi-Weekly Installments</option>
                  <option value="weekly">Weekly Installments</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Due Date</label>
                <select value={formData.paymentDueDate} onChange={(e) => setFormData({ ...formData, paymentDueDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                  <option value="">Select day of month</option>
                  <option value="1">1st of each month</option>
                  <option value="5">5th of each month</option>
                  <option value="10">10th of each month</option>
                  <option value="15">15th of each month</option>
                  <option value="20">20th of each month</option>
                  <option value="25">25th of each month</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Late Fee ($)</label>
                <input type="number" value={formData.lateFee} onChange={(e) => setFormData({ ...formData, lateFee: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="25" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Late Fee Grace Period (days)</label>
                <input type="number" value={formData.lateFeePercent} onChange={(e) => setFormData({ ...formData, lateFeePercent: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="5" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Effective Date</label>
                <input type="date" value={formData.effectiveDate} onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Maturity Date (loan due)</label>
                <input type="date" value={formData.maturityDate} onChange={(e) => setFormData({ ...formData, maturityDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <input type="checkbox" id="secured" checked={formData.secured}
              onChange={(e) => setFormData({ ...formData, secured: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <label htmlFor="secured" className="ml-2 text-sm font-medium text-gray-700">This is a secured promissory note (backed by collateral)</label>
          </div>
          {formData.secured && (
            <div className="ml-6">
              <label className="block text-sm font-medium text-gray-700">Collateral Description</label>
              <input type="text" value={formData.collateralDescription} onChange={(e) => setFormData({ ...formData, collateralDescription: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="2019 Honda Civic, VIN: 1HGBH41JXMN109186" />
            </div>
          )}
        </div>

        <button type="submit" className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700">
          Download Promissory Note
        </button>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">{selectedState.name} Legal Notes</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>&bull; <strong>Usury Limit:</strong> {selectedState.maxInterest}</li>
          <li>&bull; <strong>Applicable Statute:</strong> {selectedState.statute}</li>
          <li>&bull; <strong>Enforceable:</strong> {selectedState.enforceable ? 'Yes, with proper documentation' : 'Consult an attorney'}</li>
          <li>&bull; <strong>Collection Cost Clause:</strong> Interest above {selectedState.maxInterest} may be unenforceable</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900">What is a promissory note?</h3>
            <p className="mt-2 text-gray-600">A promissory note is a written promise to pay a specific amount of money to a lender by a certain date. It outlines the loan amount, interest rate, repayment schedule, and consequences of default.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">What is the maximum interest rate in {selectedState.name}?</h3>
            <p className="mt-2 text-gray-600">In {selectedState.name}, the maximum enforceable interest rate is {selectedState.maxInterest}. Lending at rates above this limit is considered usury and the loan may not be enforceable. {selectedState.name} Statute: {selectedState.statute}.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Do I need a notary for a promissory note?</h3>
            <p className="mt-2 text-gray-600">In most cases, notarization is not required for a promissory note to be valid in {selectedState.name}. However, notarizing the document adds authenticity and can help in court proceedings if the borrower defaults.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">What happens if the borrower doesn&apos;t pay?</h3>
            <p className="mt-2 text-gray-600">If a borrower defaults, the lender can pursue legal action to collect the debt. The promissory note serves as evidence of the debt in court. Many notes include a clause for the borrower to pay collection costs and attorney fees.</p>
          </div>
        </div>
      </div>
    </div>
  );
}