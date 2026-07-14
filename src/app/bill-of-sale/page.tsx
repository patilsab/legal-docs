'use client';

import { generatePdf } from '@/lib/pdf-builder';

import { useState } from 'react';

const states = [
  { name: 'California', notaryRequired: 'Over $500', titleRequired: 'Vehicles over 3 years', smogCert: true },
  { name: 'Texas', notaryRequired: 'Vehicles', titleRequired: 'All vehicles', smogCert: false },
  { name: 'Florida', notaryRequired: 'Not required', titleRequired: 'All vehicles', smogCert: false },
  { name: 'New York', notaryRequired: 'Not required', titleRequired: 'Vehicles over model year 1995', smogCert: false },
  { name: 'Illinois', notaryRequired: 'Not required', titleRequired: 'All vehicles', smogCert: true },
];

type FormData = {
  sellerName: string;
  sellerAddress: string;
  buyerName: string;
  buyerAddress: string;
  itemDescription: string;
  salePrice: string;
  dateOfSale: string;
  vehicleVin: string;
  odometerReading: string;
  asIs: boolean;
  paymentMethod: string;
};

export default function BillOfSalePage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    sellerName: '',
    sellerAddress: '',
    buyerName: '',
    buyerAddress: '',
    itemDescription: '',
    salePrice: '',
    dateOfSale: new Date().toISOString().split('T')[0],
    vehicleVin: '',
    odometerReading: '',
    asIs: true,
    paymentMethod: 'cash',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${selectedState.name} Bill of Sale`,
      state: selectedState.name,
      sections: [
        { heading: 'Seller Information', fields: [
          { label: 'Seller Name', value: formData.sellerName },
          { label: 'Seller Address', value: formData.sellerAddress },
        ]},
        { heading: 'Buyer Information', fields: [
          { label: 'Buyer Name', value: formData.buyerName },
          { label: 'Buyer Address', value: formData.buyerAddress },
        ]},
        { heading: 'Item Details', fields: [
          { label: 'Description', value: formData.itemDescription },
          { label: 'Sale Price', value: `$${formData.salePrice}` },
          { label: 'Date of Sale', value: formData.dateOfSale },
          { label: 'VIN', value: formData.vehicleVin || 'N/A' },
          { label: 'Odometer', value: formData.odometerReading ? `${formData.odometerReading} miles` : 'N/A' },
          { label: 'Payment Method', value: formData.paymentMethod },
          { label: 'Sold As-Is', value: formData.asIs ? 'Yes' : 'No' },
        ]},
      ],
      fileName: 'bill-of-sale.pdf',
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/bill-of-sale" className="hover:text-primary-600">Bill of Sale</a>
        <span className="mx-2">/</span>
        <span>{selectedState.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">{selectedState.name} Bill of Sale Template</h1>

      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This template is for informational purposes only. A bill of sale is a legal document that transfers ownership of personal property. Consult with an attorney for high-value transactions.
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
          <h3 className="font-semibold text-gray-900">Seller Information</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Seller Full Name</label>
              <input type="text" value={formData.sellerName} onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="John Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Seller Address</label>
              <input type="text" value={formData.sellerAddress} onChange={(e) => setFormData({ ...formData, sellerAddress: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="123 Main St, City, State" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Buyer Information</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Buyer Full Name</label>
              <input type="text" value={formData.buyerName} onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Buyer Address</label>
              <input type="text" value={formData.buyerAddress} onChange={(e) => setFormData({ ...formData, buyerAddress: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="456 Oak Ave, City, State" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Item Details</h3>
          <div className="mt-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Description</label>
              <input type="text" value={formData.itemDescription} onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="2019 Honda Civic, Blue, 4-door sedan" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Sale Price ($)</label>
                <input type="number" value={formData.salePrice} onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="15000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Sale</label>
                <input type="date" value={formData.dateOfSale} onChange={(e) => setFormData({ ...formData, dateOfSale: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Vehicle Information (if applicable)</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">VIN (Vehicle Identification Number)</label>
              <input type="text" value={formData.vehicleVin} onChange={(e) => setFormData({ ...formData, vehicleVin: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="1HGBH41JXMN109186" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Odometer Reading (miles)</label>
              <input type="number" value={formData.odometerReading} onChange={(e) => setFormData({ ...formData, odometerReading: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="45000" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select value={formData.paymentMethod} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
              <option value="cash">Cash</option>
              <option value="check">Check</option>
              <option value="bank_transfer">Bank Transfer / Wire</option>
              <option value="financing">Buyer Financing</option>
            </select>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="asIs" checked={formData.asIs}
              onChange={(e) => setFormData({ ...formData, asIs: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <label htmlFor="asIs" className="ml-2 text-sm font-medium text-gray-700">
              Item is sold &quot;AS IS&quot; — seller makes no warranties
            </label>
          </div>
        </div>

        <button type="submit" className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700">
          Download Bill of Sale
        </button>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">{selectedState.name} Requirements</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>&bull; <strong>Notary Required:</strong> {selectedState.notaryRequired}</li>
          <li>&bull; <strong>Title Transfer:</strong> {selectedState.titleRequired}</li>
          {selectedState.smogCert && <li>&bull; <strong>Smog Certification:</strong> Required for vehicle transfers</li>}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900">What is a bill of sale?</h3>
            <p className="mt-2 text-gray-600">A bill of sale is a legal document that records the transfer of ownership of personal property from a seller to a buyer. It serves as proof of purchase and includes details about the item, price, and parties involved.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Is a bill of sale required in {selectedState.name}?</h3>
            <p className="mt-2 text-gray-600">While not always legally required, a bill of sale is highly recommended for both parties. It protects the buyer from disputes about the item&apos;s condition and protects the seller from liability after the sale. {selectedState.name} may require specific documentation for vehicle transfers.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">What does &quot;AS IS&quot; mean?</h3>
            <p className="mt-2 text-gray-600">&quot;AS IS&quot; means the buyer accepts the item in its current condition with no warranties from the seller. The buyer assumes all risk for any defects or problems that exist at the time of sale.</p>
          </div>
        </div>
      </div>
    </div>
  );
}