"use client";

import { generatePdf } from "@/lib/pdf-builder";
import { useState } from "react";
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine";

type FormData = {
  employerName: string;
  employerAddress: string;
  employeeName: string;
  employeeAddress: string;
  state: StateAbbr;
  jobTitle: string;
  department: string;
  startDate: string;
  employmentType: string;
  compensationType: string;
  salary: string;
  payFrequency: string;
  hoursPerWeek: string;
  benefits: string;
  probationPeriod: string;
  terminationNotice: string;
  confidentiality: string;
  nonCompete: string;
  ipAssignment: string;
};

const faqs = [
  {
    q: "What is an Employment Contract?",
    a: "An Employment Contract is a legally binding agreement between an employer and employee that outlines the terms and conditions of employment. It covers compensation, duties, benefits, termination procedures, and legal protections for both parties."
  },
  {
    q: "Is an Employment Contract required by law?",
    a: "Most states don't require written employment contracts (at-will employment is the default). However, written contracts are strongly recommended for executive roles, specialized positions, and to override at-will status. Some states require written notice of certain terms."
  },
  {
    q: "At-will vs Contract employment - what's the difference?",
    a: "At-will: either party can terminate anytime, for any legal reason. Contract employment: specifies duration, termination grounds, and notice requirements. Employment contracts override at-will presumption and provide more job security."
  },
  {
    q: "What should be included in compensation terms?",
    a: "Base salary/hourly rate, pay frequency, overtime eligibility, bonus/commission structure, equity/stock options, raise review schedule, and deductions. Be specific to avoid disputes."
  },
  {
    q: "Are non-compete clauses enforceable?",
    a: "Enforceability varies widely by state. CA, ND, OK generally prohibit non-competes. Other states enforce if reasonable in duration (6-24 months), geographic scope, and protects legitimate business interests. Several states (CO, IL, ME, MD, NH, OR, RI, WA, DC) have salary thresholds."
  },
  {
    q: "What's the difference between exempt and non-exempt employees?",
    a: "Exempt (salaried): not entitled to overtime, must meet FLSA duties test and salary threshold ($684/week federal). Non-exempt (hourly): entitled to overtime (1.5x) for hours over 40/week. Misclassification can result in significant liability."
  },
];

export default function EmploymentContractPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    employerName: "",
    employerAddress: "",
    employeeName: "",
    employeeAddress: "",
    state: "CA",
    jobTitle: "",
    department: "",
    startDate: "",
    employmentType: "full-time",
    compensationType: "salary",
    salary: "",
    payFrequency: "biweekly",
    hoursPerWeek: "40",
    benefits: "Health insurance, 401(k), PTO per company policy",
    probationPeriod: "90",
    terminationNotice: "14",
    confidentiality: "Employee agrees to maintain confidentiality of all proprietary information, trade secrets, and confidential business data during and after employment.",
    nonCompete: "Employee agrees not to compete with Employer within 50 miles for 12 months after termination (subject to state law enforceability).",
    ipAssignment: "All inventions, innovations, and intellectual property created during employment related to Employer's business belong to Employer.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "state") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${getStateName(selectedState)} Employment Contract`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Employer Information", fields: [
          { label: "Company Name", value: formData.employerName },
          { label: "Company Address", value: formData.employerAddress },
        ]},
        { heading: "Employee Information", fields: [
          { label: "Employee Name", value: formData.employeeName },
          { label: "Employee Address", value: formData.employeeAddress },
        ]},
        { heading: "Position Details", fields: [
          { label: "Job Title", value: formData.jobTitle },
          { label: "Department", value: formData.department },
          { label: "Start Date", value: formData.startDate },
          { label: "Employment Type", value: formData.employmentType === "full-time" ? "Full-Time" : formData.employmentType === "part-time" ? "Part-Time" : "Contract" },
        ]},
        { heading: "Compensation", fields: [
          { label: "Compensation Type", value: formData.compensationType === "salary" ? "Salary (Exempt)" : "Hourly (Non-Exempt)" },
          { label: "Amount", value: `$${formData.salary}` },
          { label: "Pay Frequency", value: formData.payFrequency },
          { label: "Hours Per Week", value: formData.hoursPerWeek },
        ]},
        { heading: "Benefits & Policies", fields: [
          { label: "Benefits", value: formData.benefits },
          { label: "Probation Period", value: `${formData.probationPeriod} days` },
          { label: "Termination Notice", value: `${formData.terminationNotice} days` },
        ]},
        { heading: "Legal Provisions", fields: [
          { label: "Confidentiality", value: formData.confidentiality },
          { label: "Non-Compete", value: formData.nonCompete },
          { label: "IP Assignment", value: formData.ipAssignment },
        ]},
      ],
      fileName: "employment-contract.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/employment-contract" className="hover:text-primary-600">Employment Contract</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Employment Contract
      </h1>
      <p className="mt-2 text-gray-600">
        Create a professional employment agreement for {getStateName(selectedState)}. Covers compensation, benefits, termination, and legal protections.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This employment contract template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Employment laws vary significantly by state and locality. You should consult with a licensed attorney
        in your jurisdiction before using this template. LegalDocs is not a law firm
        and does not provide legal representation.
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
          <h2 className="text-xl font-bold text-gray-900">1. Employer & Employee Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="employerName" className="block text-sm font-medium text-gray-700">Employer/Company Name</label>
              <input id="employerName" name="employerName" type="text" value={formData.employerName} onChange={handleChange} placeholder="e.g., Acme Solutions LLC" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="employerAddress" className="block text-sm font-medium text-gray-700">Employer Address</label>
              <input id="employerAddress" name="employerAddress" type="text" value={formData.employerAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Suite 100, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">Employee Name</label>
              <input id="employeeName" name="employeeName" type="text" value={formData.employeeName} onChange={handleChange} placeholder="e.g., Jane Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="employeeAddress" className="block text-sm font-medium text-gray-700">Employee Address</label>
              <input id="employeeAddress" name="employeeAddress" type="text" value={formData.employeeAddress} onChange={handleChange} placeholder="e.g., 456 Oak Ave, Springfield, IL 62701" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Position & Employment Terms</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
              <input id="jobTitle" name="jobTitle" type="text" value={formData.jobTitle} onChange={handleChange} placeholder="e.g., Senior Software Engineer" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <input id="department" name="department" type="text" value={formData.department} onChange={handleChange} placeholder="e.g., Engineering" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Employment Type</label>
              <select id="employmentType" name="employmentType" value={formData.employmentType} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract/Fixed-Term</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Compensation</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="compensationType" className="block text-sm font-medium text-gray-700">Compensation Type</label>
              <select id="compensationType" name="compensationType" value={formData.compensationType} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="salary">Salary (Exempt)</option>
                <option value="hourly">Hourly (Non-Exempt)</option>
              </select>
            </div>
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Annual Salary / Hourly Rate ($)</label>
              <input id="salary" name="salary" type="number" min="0" step="0.01" value={formData.salary} onChange={handleChange} placeholder="e.g., 85000 or 45.00" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="payFrequency" className="block text-sm font-medium text-gray-700">Pay Frequency</label>
              <select id="payFrequency" name="payFrequency" value={formData.payFrequency} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-Weekly</option>
                <option value="semimonthly">Semi-Monthly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700">Hours Per Week</label>
              <input id="hoursPerWeek" name="hoursPerWeek" type="number" min="0" max="80" value={formData.hoursPerWeek} onChange={handleChange} placeholder="e.g., 40" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Benefits & Termination</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">Benefits</label>
              <textarea id="benefits" name="benefits" value={formData.benefits} onChange={handleChange} rows={3} placeholder="e.g., Health insurance, 401(k) matching, PTO, dental, vision, life insurance" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="probationPeriod" className="block text-sm font-medium text-gray-700">Probation Period (Days)</label>
              <input id="probationPeriod" name="probationPeriod" type="number" min="0" max="365" value={formData.probationPeriod} onChange={handleChange} placeholder="e.g., 90" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="terminationNotice" className="block text-sm font-medium text-gray-700">Termination Notice (Days)</label>
              <input id="terminationNotice" name="terminationNotice" type="number" min="0" max="180" value={formData.terminationNotice} onChange={handleChange} placeholder="e.g., 14" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Legal Provisions</h2>
          <p className="mt-2 text-sm text-gray-500">Review and customize these clauses for your jurisdiction. Non-compete enforceability varies significantly by state.</p>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="confidentiality" className="block text-sm font-medium text-gray-700">Confidentiality Clause</label>
              <textarea id="confidentiality" name="confidentiality" value={formData.confidentiality} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="nonCompete" className="block text-sm font-medium text-gray-700">Non-Compete Clause</label>
              <textarea id="nonCompete" name="nonCompete" value={formData.nonCompete} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="ipAssignment" className="block text-sm font-medium text-gray-700">Intellectual Property Assignment</label>
              <textarea id="ipAssignment" name="ipAssignment" value={formData.ipAssignment} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Employment Contract
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Employment Contracts
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