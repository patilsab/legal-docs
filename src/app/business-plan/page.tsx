"use client";

import { generatePdf } from "@/lib/pdf-builder";
import { useState } from "react";
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine";

type FormData = {
  businessName: string;
  businessAddress: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  executiveSummary: string;
  businessDescription: string;
  missionStatement: string;
  productsServices: string;
  targetMarket: string;
  marketingStrategy: string;
  competitiveAnalysis: string;
  operationalPlan: string;
  managementTeam: string;
  startupCosts: string;
  revenueModel: string;
  financialProjections: string;
  fundingRequest: string;
  state: StateAbbr;
};

const faqs = [
  {
    q: "What is a business plan?",
    a: "A business plan is a comprehensive document that outlines your business goals, strategies, target market, financial projections, and operational plans. It serves as a roadmap for your business and is often required when seeking funding from investors or lenders."
  },
  {
    q: "Do I need a business plan for a small business?",
    a: "While not legally required, a business plan is highly recommended even for small businesses. It helps clarify your vision, identify potential challenges, set measurable goals, and demonstrates professionalism to potential partners, lenders, and investors."
  },
  {
    q: "How long should a business plan be?",
    a: "Traditional business plans range from 20-50 pages. However, lean startup plans can be as short as 1-2 pages. The length depends on your audience: banks and investors typically expect comprehensive plans, while internal plans can be more concise."
  },
  {
    q: "What financial projections should I include?",
    a: "Include startup costs, revenue model, profit & loss projections (1-3 years), cash flow statement, balance sheet, break-even analysis, and funding requirements. Be realistic and base projections on market research and comparable businesses."
  },
  {
    q: "How often should I update my business plan?",
    a: "Review and update your business plan at least annually, or whenever significant changes occur: new products/services, market shifts, funding rounds, leadership changes, or major financial milestones. A business plan is a living document."
  },
  {
    q: "What is the executive summary and why is it important?",
    a: "The executive summary is a 1-2 page overview of your entire business plan. It's often the only section investors read initially. Write it last but place it first. It should capture your mission, problem/solution, target market, business model, traction, team, and financial highlights."
  },
];

export default function BusinessPlanPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessAddress: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    executiveSummary: "",
    businessDescription: "",
    missionStatement: "",
    productsServices: "",
    targetMarket: "",
    marketingStrategy: "",
    competitiveAnalysis: "",
    operationalPlan: "",
    managementTeam: "",
    startupCosts: "",
    revenueModel: "",
    financialProjections: "",
    fundingRequest: "",
    state: "CA",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "state") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${formData.businessName || "Business"} - Business Plan`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Business Information", fields: [
          { label: "Business Name", value: formData.businessName },
          { label: "Business Address", value: formData.businessAddress },
          { label: "Owner Name", value: formData.ownerName },
          { label: "Owner Email", value: formData.ownerEmail },
          { label: "Owner Phone", value: formData.ownerPhone },
        ]},
        { heading: "Executive Summary", fields: [
          { label: "Summary", value: formData.executiveSummary },
        ]},
        { heading: "Business Description", fields: [
          { label: "Description", value: formData.businessDescription },
          { label: "Mission Statement", value: formData.missionStatement },
        ]},
        { heading: "Products & Services", fields: [
          { label: "Offerings", value: formData.productsServices },
        ]},
        { heading: "Market Analysis", fields: [
          { label: "Target Market", value: formData.targetMarket },
          { label: "Marketing Strategy", value: formData.marketingStrategy },
          { label: "Competitive Analysis", value: formData.competitiveAnalysis },
        ]},
        { heading: "Operations & Management", fields: [
          { label: "Operational Plan", value: formData.operationalPlan },
          { label: "Management Team", value: formData.managementTeam },
        ]},
        { heading: "Financial Plan", fields: [
          { label: "Startup Costs", value: formData.startupCosts },
          { label: "Revenue Model", value: formData.revenueModel },
          { label: "Financial Projections", value: formData.financialProjections },
          { label: "Funding Request", value: formData.fundingRequest },
        ]},
      ],
      fileName: "business-plan.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/business-plan" className="hover:text-primary-600">Business Plan</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Business Plan Template
      </h1>
      <p className="mt-2 text-gray-600">
        Create a professional business plan tailored for {getStateName(selectedState)}. Complete each section and download as PDF.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This business plan template is provided for
        informational and educational purposes only. It does not constitute legal, financial, or business advice.
        Business plan requirements vary by industry and investor/lender expectations. Consult with qualified
        professionals (attorneys, CPAs, business advisors) before making critical business decisions. LegalDocs
        is not a law firm and does not provide legal representation.
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">Select Your State</label>
        <select
          value={selectedState}
          onChange={handleChange}
          name="state"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
        >
          {US_STATES.map((state) => (
            <option key={state.abbr} value={state.abbr}>
              {state.name} ({state.abbr})
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">1. Business Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
              <input id="businessName" name="businessName" type="text" value={formData.businessName} onChange={handleChange} placeholder="e.g., Acme Solutions LLC" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700">Business Address</label>
              <input id="businessAddress" name="businessAddress" type="text" value={formData.businessAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Suite 100, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner Name</label>
              <input id="ownerName" name="ownerName" type="text" value={formData.ownerName} onChange={handleChange} placeholder="e.g., Jane Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700">Owner Email</label>
              <input id="ownerEmail" name="ownerEmail" type="email" value={formData.ownerEmail} onChange={handleChange} placeholder="jane@acmesolutions.com" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-700">Owner Phone</label>
              <input id="ownerPhone" name="ownerPhone" type="tel" value={formData.ownerPhone} onChange={handleChange} placeholder="(555) 123-4567" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Executive Summary</h2>
          <p className="mt-2 text-sm text-gray-500">Write this last but place it first. Summarize your mission, problem/solution, target market, business model, traction, team, and financial highlights.</p>
          <div className="mt-4">
            <label htmlFor="executiveSummary" className="block text-sm font-medium text-gray-700">Executive Summary</label>
            <textarea id="executiveSummary" name="executiveSummary" value={formData.executiveSummary} onChange={handleChange} rows={4} placeholder="Brief overview of your business..." className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Business Description</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700">Business Description</label>
              <textarea id="businessDescription" name="businessDescription" value={formData.businessDescription} onChange={handleChange} placeholder="What does your business do? What problem does it solve?" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="missionStatement" className="block text-sm font-medium text-gray-700">Mission Statement</label>
              <textarea id="missionStatement" name="missionStatement" value={formData.missionStatement} onChange={handleChange} placeholder="Your company's purpose and core values" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Products & Services</h2>
          <div className="mt-4">
            <label htmlFor="productsServices" className="block text-sm font-medium text-gray-700">Offerings</label>
            <textarea id="productsServices" name="productsServices" value={formData.productsServices} onChange={handleChange} placeholder="Describe your products/services, pricing, and unique value proposition" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Market Analysis</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="targetMarket" className="block text-sm font-medium text-gray-700">Target Market</label>
              <textarea id="targetMarket" name="targetMarket" value={formData.targetMarket} onChange={handleChange} placeholder="Who are your ideal customers? Demographics, psychographics, size" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="marketingStrategy" className="block text-sm font-medium text-gray-700">Marketing Strategy</label>
              <textarea id="marketingStrategy" name="marketingStrategy" value={formData.marketingStrategy} onChange={handleChange} placeholder="How will you reach and acquire customers?" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="competitiveAnalysis" className="block text-sm font-medium text-gray-700">Competitive Analysis</label>
              <textarea id="competitiveAnalysis" name="competitiveAnalysis" value={formData.competitiveAnalysis} onChange={handleChange} placeholder="Who are your competitors? What's your competitive advantage?" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">6. Operations & Management</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="operationalPlan" className="block text-sm font-medium text-gray-700">Operational Plan</label>
              <textarea id="operationalPlan" name="operationalPlan" value={formData.operationalPlan} onChange={handleChange} placeholder="Day-to-day operations, location, equipment, suppliers, processes" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="managementTeam" className="block text-sm font-medium text-gray-700">Management Team</label>
              <textarea id="managementTeam" name="managementTeam" value={formData.managementTeam} onChange={handleChange} placeholder="Key team members, roles, experience, advisors" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">7. Financial Plan</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="startupCosts" className="block text-sm font-medium text-gray-700">Startup Costs</label>
              <textarea id="startupCosts" name="startupCosts" value={formData.startupCosts} onChange={handleChange} placeholder="Equipment, licenses, marketing, legal, inventory, working capital" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="revenueModel" className="block text-sm font-medium text-gray-700">Revenue Model</label>
              <textarea id="revenueModel" name="revenueModel" value={formData.revenueModel} onChange={handleChange} placeholder="How will you make money? Pricing, sales channels, recurring vs. one-time" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="financialProjections" className="block text-sm font-medium text-gray-700">Financial Projections</label>
              <textarea id="financialProjections" name="financialProjections" value={formData.financialProjections} onChange={handleChange} placeholder="Revenue, expenses, profit/loss, cash flow for years 1-3" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="fundingRequest" className="block text-sm font-medium text-gray-700">Funding Request</label>
              <textarea id="fundingRequest" name="fundingRequest" value={formData.fundingRequest} onChange={handleChange} placeholder="How much funding needed? What for? Equity/debt terms offered" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📊 Download PDF Business Plan
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Business Plans
        </h2>
        <div className="mt-6 space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0">
              <h3 className="font-semibold text-gray-900">{faq.q}</h3>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}