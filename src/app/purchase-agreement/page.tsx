"use client";

import { useState } from "react";
import { generatePdf, PdfSection } from "@/lib/pdf-builder";

const states = [
  {
    name: "California",
    abbreviation: "CA",
    notes: "California requires a Natural Hazard Disclosure Statement. Seller must provide a Transfer Disclosure Statement (TDS). Lead-based paint disclosures required for pre-1978 homes. Statewide buyer advisory recommended.",
    escrowInfo: "CA typically uses title/escrow companies for closing. Escrow usually takes 30-60 days. The California Association of Realtors (CAR) purchase agreement is the industry standard.",
  },
  {
    name: "Texas",
    abbreviation: "TX",
    notes: "Texas uses the TREC (Texas Real Estate Commission) promulgated forms for most residential transactions. Seller is generally not required to make repairs. Title insurance is typically purchased by the seller.",
    escrowInfo: "TX closings are typically handled by title companies. The standard Texas contract allows 10-14 days for inspection contingency. Financing contingency is negotiable.",
  },
  {
    name: "Florida",
    abbreviation: "FL",
    notes: "Florida requires a seller disclosure of known defects. Lead-based paint disclosure required for pre-1978 homes. Radon testing is recommended. Florida has specific requirements for condominium purchases.",
    escrowInfo: "FL closings can be handled by title companies, attorneys, or both (varies by county). Florida is an attorney closing state in some counties. Closing typically takes 30-45 days.",
  },
  {
    name: "New York",
    abbreviation: "NY",
    notes: "New York requires a property condition disclosure statement or a $500 credit to the buyer. Attorney review period is standard in NY contracts. Lead paint disclosure required for pre-1978 homes.",
    escrowInfo: "NY closings typically require attorney involvement. The attorney review period is usually 3 business days. Title insurance is generally purchased by the buyer. Closing typically takes 60-90 days.",
  },
  {
    name: "Illinois",
    abbreviation: "ILL",
    notes: "Illinois requires a Residential Real Property Disclosure Act disclosure. Lead-based paint disclosure required for pre-1978 homes. Radon testing disclosures may be required depending on the county.",
    escrowInfo: "IL closings are typically handled by title companies. The standard Illinois contract allows for attorney review. Closing typically takes 30-45 days. Cook County has additional transfer tax requirements.",
  },
];

type FormData = {
  sellerName: string;
  buyerName: string;
  propertyAddress: string;
  purchasePrice: string;
  earnestMoney: string;
  closingDate: string;
  financingType: string;
  inspectionContingency: boolean;
  contingencies: string;
};

export default function PurchaseAgreementPage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    sellerName: "",
    buyerName: "",
    propertyAddress: "",
    purchasePrice: "",
    earnestMoney: "",
    closingDate: "",
    financingType: "conventional",
    inspectionContingency: true,
    contingencies: "",
  });

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownload = async () => {
    await generatePdf({
      title: "Real Estate Purchase Agreement",
      state: selectedState.name,
      sections: [
        {
          heading: "Seller Information",
          fields: [{ label: "Full Name", value: formData.sellerName }],
        },
        {
          heading: "Buyer Information",
          fields: [{ label: "Full Name", value: formData.buyerName }],
        },
        {
          heading: "Property Details",
          fields: [
            { label: "Property Address", value: formData.propertyAddress },
          ],
        },
        {
          heading: "Purchase Terms",
          fields: [
            { label: "Purchase Price", value: formData.purchasePrice ? "$" + formData.purchasePrice : "" },
            { label: "Earnest Money Deposit", value: formData.earnestMoney ? "$" + formData.earnestMoney : "" },
            { label: "Closing Date", value: formData.closingDate },
            { label: "Financing Type", value: formData.financingType.charAt(0).toUpperCase() + formData.financingType.slice(1) },
          ],
        },
        {
          heading: "Contingencies",
          fields: [
            { label: "Inspection Contingency", value: formData.inspectionContingency ? "Yes" : "No" },
            { label: "Additional Contingencies", value: formData.contingencies || "None specified" },
          ],
        },
      ],
      fileName: "purchase-agreement.pdf",
    });
  };

  const faqs = [
    {
      q: "What is a real estate purchase agreement?",
      a: "A purchase agreement is a legally binding contract between a buyer and seller that outlines the terms and conditions of a real estate transaction. It specifies the purchase price, closing date, contingencies, and other key terms.",
    },
    {
      q: "What contingencies should I include in " + selectedState + "?",
      a: "Common contingencies include inspection, financing, appraisal, and sale of buyer's current home. In " + selectedState + ", review the standard contingencies outlined in state-specific contract forms and consult with your real estate agent about which protections apply to your situation.",
    },
    {
      q: "How much earnest money deposit is typical?",
      a: "Earnest money typically ranges from 1-3% of the purchase price, though this varies by market. In competitive markets like " + selectedState + ", higher deposits may strengthen your offer. The deposit is held in escrow and applied to the purchase at closing.",
    },
    {
      q: "Can I back out of a purchase agreement after signing?",
      a: "You can withdraw within the contingency period if a contingency is not met (e.g., inspection fails, financing is denied). After contingencies expire, backing out may result in losing your earnest money deposit. Consult with your attorney for guidance.",
    },
    {
      q: "What is the typical closing timeline in " + selectedState + "?",
      a: "Closing timelines vary by state and deal complexity. In " + selectedState + ", " + selectedState.escrowInfo + ".",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/purchase-agreement" className="hover:text-primary-600">Purchase Agreement</a>
        <span className="mx-2">/</span>
        <a href={`/purchase-agreement/${selectedState.name.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{selectedState.name}</a>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">{selectedState.name} Free Purchase Agreement Template</h1>

      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This template is for informational purposes only and does not constitute legal advice. Real estate transactions involve significant legal and financial consequences. Consult with a licensed real estate attorney in {selectedState.name} before signing any purchase agreement.
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">Select Your State</label>
        <select
          value={selectedState.name}
          onChange={(e) => {
            const state = states.find((s) => s.name === e.target.value);
            if (state) setSelectedState(state);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {states.map((state) => (
            <option key={state.name} value={state.name}>
              {state.name} ({state.abbreviation})
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleDownload(); }} className="mt-8 space-y-6">
        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Seller Information</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Seller Full Name</label>
              <input
                type="text"
                value={formData.sellerName}
                onChange={(e) => handleChange("sellerName", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="John Smith"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Buyer Information</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Buyer Full Name</label>
              <input
                type="text"
                value={formData.buyerName}
                onChange={(e) => handleChange("buyerName", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Jane Doe"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Property Details</h3>
          <div className="mt-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Address</label>
              <input
                type="text"
                value={formData.propertyAddress}
                onChange={(e) => handleChange("propertyAddress", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="123 Main Street, City, State ZIP"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Purchase Terms</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Purchase Price ($)</label>
              <input
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => handleChange("purchasePrice", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="450000"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Earnest Money Deposit ($)</label>
              <input
                type="number"
                value={formData.earnestMoney}
                onChange={(e) => handleChange("earnestMoney", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="5000"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Closing Date</label>
              <input
                type="date"
                value={formData.closingDate}
                onChange={(e) => handleChange("closingDate", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Financing Type</label>
              <select
                value={formData.financingType}
                onChange={(e) => handleChange("financingType", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="cash">Cash</option>
                <option value="conventional">Conventional</option>
                <option value="fha">FHA</option>
                <option value="va">VA</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Contingencies</h3>
          <div className="mt-3 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inspectionContingency"
                checked={formData.inspectionContingency}
                onChange={(e) => handleChange("inspectionContingency", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="inspectionContingency" className="ml-2 text-sm font-medium text-gray-700">
                Inspection Contingency (allows buyer to conduct home inspection and negotiate repairs or withdraw)
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Contingencies</label>
              <textarea
                value={formData.contingencies}
                onChange={(e) => handleChange("contingencies", e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="List any additional contingencies, e.g.: Financing contingency, appraisal contingency, sale of buyer's current home, specific repair requirements, HOA document review period."
              />
              <p className="mt-1 text-xs text-gray-400">Common contingencies: financing, appraisal, sale of current home, HOA review, radon/lead inspection.</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700"
        >
          Download Purchase Agreement PDF
        </button>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">{selectedState.name} Requirements</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>&bull; <strong>Disclosures:</strong> {selectedState.notes}</li>
          <li>&bull; <strong>Closing Process:</strong> {selectedState.escrowInfo}</li>
          <li>&bull; <strong>Title Insurance:</strong> Typically required by lender</li>
          <li>&bull; <strong>Home Inspection:</strong> Recommended within 10-14 days of contract execution</li>
        </ul>
      </div>

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