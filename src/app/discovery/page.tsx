// Fixed: multiline strings use template literals
"use client";

import { generatePdf } from "@/lib/pdf-builder";
import { useState } from "react";
import { US_STATES, getStateName, type StateAbbr } from "@/lib/state-engine";

type FormData = {
  courtName: string;
  courtCounty: string;
  courtState: StateAbbr;
  caseNumber: string;
  plaintiffName: string;
  defendantName: string;
  propoundingParty: string;
  respondingParty: string;
  requestType: string;
  requests: string;
  definitions: string;
  instructions: string;
  objections: string;
  verification: string;
};

const faqs = [
  {
    q: "What are the main types of discovery?",
    a: "1. Interrogatories (written questions, answered under oath). 2. Requests for Production of Documents (RFP) - demand for documents, ESI, tangible things. 3. Requests for Admission (RFA) - ask party to admit/deny specific facts. 4. Depositions (oral/written) - sworn testimony. 5. Subpoenas (to non-parties). 6. Physical/mental exams (Rule 35)."
  },
  {
    q: "What are the limits on interrogatories?",
    a: "FRCP 33: 25 interrogatories per party (including subparts). Some states have different limits (CA: 35 form + 35 special). Court can grant leave for more. Must be answered separately and fully under oath within 30 days (federal)."
  },
  {
    q: "What can be requested in Requests for Production?",
    a: "Any designated documents, ESI (emails, texts, databases, metadata), or tangible things in the party's possession, custody, or control. Includes: contracts, emails, financial records, policies, photos, videos, social media, inspection of premises. Must be described with reasonable particularity."
  },
  {
    q: "What are Requests for Admission?",
    a: "RFA asks party to admit/deny specific facts, application of law to fact, or genuineness of documents. Admitted facts are CONCLUSIVELY established. Denied facts must be denied specifically or with explanation. Failure to respond = ADMITTED. Can move for summary judgment on admitted facts. FRCP 36."
  },
  {
    q: "What are common objections to discovery?",
    a: "Overbroad/unduly burdensome, vague/ambiguous, irrelevant/not proportional, privileged (attorney-client, work product), trade secret/confidential, compound/conjunctive, assumes facts not in evidence, calls for legal conclusion, not reasonably calculated to lead to admissible evidence (old standard - now 'proportional to needs of case'). Must state objections with specificity."
  },
  {
    q: "What is the meet-and-confer requirement?",
    a: "Before filing motion to compel, parties MUST meet and confer in good faith to resolve discovery disputes. FRCP 37(a)(1), local rules. Failure can result in sanctions. Document your meet-and-confer efforts in detail."
  },
];

export default function DiscoveryPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    courtName: "",
    courtCounty: "",
    courtState: "CA",
    caseNumber: "",
    plaintiffName: "",
    defendantName: "",
    propoundingParty: "",
    respondingParty: "",
    requestType: "interrogatories",
    requests: `INTERROGATORY NO. 1:
State the full name, address, and telephone number of each person who prepared or assisted in preparing the responses to these interrogatories.

INTERROGATORY NO. 2:
Identify each person having knowledge of the facts alleged in the Complaint/Answer, and for each such person, state the subject matter of their knowledge.

INTERROGATORY NO. 3:
Identify all documents, electronically stored information, and tangible things that support your claims/defenses.

INTERROGATORY NO. 4:
State the factual basis for each affirmative defense asserted in your Answer.

INTERROGATORY NO. 5:
Identify all expert witnesses you intend to call at trial, and for each, state the subject matter, substance of opinions, and grounds for opinions.

INTERROGATORY NO. 6:
Describe in detail the nature and extent of damages you claim, including the method of calculation.

INTERROGATORY NO. 7:
Identify all insurance policies that may provide coverage for the claims in this action.

INTERROGATORY NO. 8:
State whether you have communicated with any party or witness regarding this litigation, and if so, identify the persons, dates, and substance of communications.

INTERROGATORY NO. 9:
Identify all prior lawsuits or claims you have filed or that have been filed against you in the past 10 years.

INTERROGATORY NO. 10:
If you contend that any document requested is privileged, provide a privilege log identifying each document, the privilege claimed, and the basis for the claim.`,
    definitions: `DEFINITIONS:
1. "Document" means any writing, recording, or compilation of information, however stored, including electronic.
2. "Communication" means any oral, written, or electronic transmission of information.
3. "Identify" means: for persons - name, address, phone, employer, title; for documents - author, recipients, date, subject, location.
4. "You/Your" means the responding party and its agents, employees, attorneys, representatives.
5. "Relating to" means concerning, referring to, describing, evidencing, or constituting.
6. "Concerning" means relating to, referring to, describing, evidencing, or constituting.
7. "Including" means including without limitation.
8. "And/Or" shall be construed disjunctively or conjunctively as necessary to make the request inclusive.`,
    instructions: `INSTRUCTIONS:
1. These requests are continuing - supplement responses as new information becomes available.
2. Answer each request separately and fully under oath.
3. If you object, state the specific objection and answer to the extent not objectionable.
4. For each document withheld on privilege grounds, provide a privilege log.
5. Produce documents as they are kept in the usual course of business or organized to correspond to request categories.
6. ESI shall be produced in native format or reasonably usable form with metadata preserved.
7. "Identify" requires full identifying information as defined.
8. These requests encompass all information in your possession, custody, or control, including that of your agents, employees, attorneys, and representatives.`,
    objections: `GENERAL OBJECTIONS:
1. Overbroad and unduly burdensome.
2. Vague and ambiguous.
3. Seeks information protected by attorney-client privilege / work product doctrine.
4. Not proportional to the needs of the case.
5. Seeks information not within responding party's possession, custody, or control.
6. Compound and conjunctive.
7. Assumes facts not in evidence.

[Specific objections to individual requests should be inserted here]`,
    verification: `I, [Name], declare under penalty of perjury that the foregoing responses are true and correct to the best of my knowledge, information, and belief.`,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "courtState") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${getStateName(selectedState)} Discovery Requests`,
      state: getStateName(selectedState),
      sections: [
        { heading: "Caption", fields: [
          { label: "Court", value: formData.courtName },
          { label: "County", value: formData.courtCounty },
          { label: "State", value: getStateName(formData.courtState) },
          { label: "Case Number", value: formData.caseNumber },
        ]},
        { heading: "Parties", fields: [
          { label: "Plaintiff", value: formData.plaintiffName },
          { label: "Defendant", value: formData.defendantName },
        ]},
        { heading: "Discovery Information", fields: [
          { label: "Propounding Party", value: formData.propoundingParty },
          { label: "Responding Party", value: formData.respondingParty },
          { label: "Request Type", value: formData.requestType.charAt(0).toUpperCase() + formData.requestType.slice(1) },
        ]},
        { heading: "Definitions", fields: [
          { label: "Definitions", value: formData.definitions },
        ]},
        { heading: "Instructions", fields: [
          { label: "Instructions", value: formData.instructions },
        ]},
        { heading: "Requests", fields: [
          { label: "Requests", value: formData.requests },
        ]},
        { heading: "Objections", fields: [
          { label: "Objections", value: formData.objections },
        ]},
        { heading: "Verification", fields: [
          { label: "Verification", value: formData.verification },
        ]},
      ],
      fileName: "discovery-requests.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/discovery" className="hover:text-primary-600">Discovery Requests</a>
        <span className="mx-2">/</span>
        <a href={`/discovery/${getStateName(selectedState).toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary-600">{getStateName(selectedState)}</a>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Discovery Requests
      </h1>
      <p className="mt-2 text-gray-600">
        Create Interrogatories, Requests for Production, Requests for Admission, or Combined Discovery.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This discovery template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Discovery rules (limits, timing, format) vary significantly by jurisdiction.
        You must consult with a licensed attorney in your jurisdiction before serving.
        LegalDocs is not a law firm and does not provide legal representation.
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">Select Your State</label>
        <select
          value={selectedState}
          onChange={handleChange}
          name="courtState"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
        >
          {US_STATES.map((state) => (
            <option key={state.abbr} value={state.abbr}>
              {state.name} ({state.abbr})
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Discovery Type</label>
        <select
          value={formData.requestType}
          onChange={handleChange}
          name="requestType"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
        >
          <option value="interrogatories">Interrogatories (Written Questions)</option>
          <option value="production">Requests for Production of Documents</option>
          <option value="admission">Requests for Admission</option>
          <option value="combined">Combined Discovery Set</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">1. Caption</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="courtName" className="block text-sm font-medium text-gray-700">Court Name</label>
              <input id="courtName" name="courtName" type="text" value={formData.courtName} onChange={handleChange} placeholder="e.g., Superior Court of California / U.S. District Court" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="courtCounty" className="block text-sm font-medium text-gray-700">County</label>
              <input id="courtCounty" name="courtCounty" type="text" value={formData.courtCounty} onChange={handleChange} placeholder="e.g., San Francisco" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="caseNumber" className="block text-sm font-medium text-gray-700">Case Number</label>
              <input id="caseNumber" name="caseNumber" type="text" value={formData.caseNumber} onChange={handleChange} placeholder="e.g., 24-CV-01234" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">2. Parties</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="plaintiffName" className="block text-sm font-medium text-gray-700">Plaintiff</label>
              <input id="plaintiffName" name="plaintiffName" type="text" value={formData.plaintiffName} onChange={handleChange} placeholder="e.g., Jane Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="defendantName" className="block text-sm font-medium text-gray-700">Defendant</label>
              <input id="defendantName" name="defendantName" type="text" value={formData.defendantName} onChange={handleChange} placeholder="e.g., Acme Corporation" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="propoundingParty" className="block text-sm font-medium text-gray-700">Propounding Party (Who is serving these requests?)</label>
              <input id="propoundingParty" name="propoundingParty" type="text" value={formData.propoundingParty} onChange={handleChange} placeholder="e.g., Defendant Acme Corporation" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="respondingParty" className="block text-sm font-medium text-gray-700">Responding Party (Who must respond?)</label>
              <input id="respondingParty" name="respondingParty" type="text" value={formData.respondingParty} onChange={handleChange} placeholder="e.g., Plaintiff Jane Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Definitions</h2>
          <p className="mt-2 text-sm text-gray-500">Standard definitions applied to all requests. Customize for your case.</p>
          <div className="mt-4">
            <label htmlFor="definitions" className="block text-sm font-medium text-gray-700">Definitions</label>
            <textarea id="definitions" name="definitions" value={formData.definitions} onChange={handleChange} rows={6} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Instructions</h2>
          <p className="mt-2 text-sm text-gray-500">Standard instructions for responding party.</p>
          <div className="mt-4">
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
            <textarea id="instructions" name="instructions" value={formData.instructions} onChange={handleChange} rows={6} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Requests</h2>
          <p className="mt-2 text-sm text-gray-500">Number each request. For Interrogatories: ask specific questions. For RFP: describe categories with particularity. For RFA: state each fact to be admitted/denied separately.</p>
          <div className="mt-4">
            <label htmlFor="requests" className="block text-sm font-medium text-gray-700">Requests</label>
            <textarea id="requests" name="requests" value={formData.requests} onChange={handleChange} rows={12} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">6. General Objections</h2>
          <p className="mt-2 text-sm text-gray-500">Standard objections. Specific objections to individual requests should be noted in the response.</p>
          <div className="mt-4">
            <label htmlFor="objections" className="block text-sm font-medium text-gray-700">Objections</label>
            <textarea id="objections" name="objections" value={formData.objections} onChange={handleChange} rows={6} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">7. Verification</h2>
          <p className="mt-2 text-sm text-gray-500">Responses to Interrogatories and RFAs must be verified under oath.</p>
          <div className="mt-4">
            <label htmlFor="verification" className="block text-sm font-medium text-gray-700">Verification</label>
            <textarea id="verification" name="verification" value={formData.verification} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Discovery Requests
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Discovery
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