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
  movingParty: string;
  opposingParty: string;
  legalStandard: string;
  undisputedFacts: string;
  argument: string;
  conclusion: string;
  evidence: string;
  declaration: string;
};

const faqs = [
  {
    q: "What is a Motion for Summary Judgment?",
    a: "A motion asking the court to decide the case (or specific claims) without trial because there are no genuine disputes of material fact and the moving party is entitled to judgment as a matter of law. FRCP 56 / State equivalents."
  },
  {
    q: "When can I file a motion for summary judgment?",
    a: "After adequate time for discovery (typically 30-90 days before trial). Federal: any time until 30 days after close of discovery. Some states require notice of intent. Check local rules and scheduling order deadlines."
  },
  {
    q: "What is the legal standard?",
    a: "Federal: 'No genuine dispute as to any material fact and the movant is entitled to judgment as a matter of law.' FRCP 56(a). Moving party bears initial burden. If movant meets burden, non-movant must show specific facts creating genuine dispute. All inferences drawn in favor of non-movant."
  },
  {
    q: "What evidence can I cite?",
    a: "Depositions, documents, interrogatory answers, admissions, affidavits/declarations, stipulations. Must be admissible or reducible to admissible form at trial. Hearsay in affidavit must be based on personal knowledge and admissible at trial. FRCP 56(c)."
  },
  {
    q: "What is a 'Statement of Undisputed Material Facts'?",
    a: "Required in most jurisdictions. Numbered paragraphs with citation to evidence (e.g., 'Defendant signed contract on 1/1/23. Exh. A (Dep. at 12:3-5).'). Opposing party must respond to EACH fact with admit/deny and citation. Uncontroverted facts = deemed admitted."
  },
  {
    q: "What happens if summary judgment is denied?",
    a: "Case proceeds to trial on remaining issues. Partial summary judgment can narrow issues. Denial is generally not appealable until final judgment (interlocutory). Can renew at trial (Rule 50 motion)."
  },
];

export default function SummaryJudgmentPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    courtName: "",
    courtCounty: "",
    courtState: "CA",
    caseNumber: "",
    plaintiffName: "",
    defendantName: "",
    movingParty: "",
    opposingParty: "",
    legalStandard: `Federal Rule of Civil Procedure 56(a) provides that the court shall grant summary judgment if the movant shows that there is no genuine dispute as to any material fact and the movant is entitled to judgment as a matter of law. The moving party bears the initial burden of demonstrating the absence of a genuine issue of material fact. Celotex Corp. v. Catrett, 477 U.S. 317 (1986). Once the moving party meets this burden, the non-moving party must set forth specific facts showing a genuine issue for trial. Fed. R. Civ. P. 56(c)(1); Matsushita Elec. Indus. Co. v. Zenith Radio Corp., 475 U.S. 574 (1986). All inferences are drawn in favor of the non-moving party. Anderson v. Liberty Lobby, Inc., 477 U.S. 242 (1986).`,
    undisputedFacts: `UNDISPUTED MATERIAL FACTS:

1. On [date], Plaintiff and Defendant entered into a written contract. Exh. A (Contract).
2. Plaintiff performed all obligations under the contract. Exh. B (Plaintiff Decl. ¶¶ 3-5).
3. Defendant failed to pay the agreed amount of $[X] by the due date of [date]. Exh. C (Invoice); Exh. D (Def. Dep. 25:10-15).
4. Plaintiff made written demand for payment on [date]. Exh. E (Demand Letter).
5. Defendant has not paid any portion of the amount owed. Exh. F (Plaintiff Decl. ¶ 8).
6. The contract provides for attorney fees and costs to prevailing party. Exh. A § 12.`,
    argument: `I. NO GENUINE DISPUTE OF MATERIAL FACT EXISTS

A. Contract Formation and Terms
The parties entered into a valid, enforceable contract. [Cite evidence]. The terms are unambiguous.

B. Plaintiff's Performance
Plaintiff fully performed. [Cite evidence]. Defendant does not dispute performance.

C. Defendant's Breach
Defendant failed to pay. [Cite evidence]. No evidence of payment.

D. Damages
The amount owed is liquidated and certain: $[X]. [Cite evidence].

II. MOVING PARTY IS ENTITLED TO JUDGMENT AS A MATTER OF LAW

A. Breach of Contract Elements
1. Valid contract. 2. Plaintiff's performance. 3. Defendant's breach. 4. Damages. All satisfied.

B. Defendant's Affirmative Defenses Fail
[Address each defense - statute of limitations, waiver, estoppel, etc. with evidence showing they lack merit].

III. CONCLUSION
For the foregoing reasons, no genuine dispute of material fact exists and Moving Party is entitled to judgment as a matter of law.`,
    conclusion: `WHEREFORE, Moving Party respectfully requests that this Court:

1. GRANT this Motion for Summary Judgment in its entirety;
2. Enter judgment in favor of [Moving Party] and against [Opposing Party] in the amount of $[X];
3. Award attorney fees and costs pursuant to [contract provision/statute];
4. Award pre- and post-judgment interest at the legal rate;
5. Grant such other and further relief as the Court deems just and proper.`,
    evidence: `EXHIBIT LIST:

Exh. A - Contract dated [date]
Exh. B - Plaintiff Declaration
Exh. C - Invoice #[X] dated [date]
Exh. D - Defendant Deposition Transcript (excerpts)
Exh. E - Demand Letter dated [date]
Exh. F - Plaintiff Declaration (supplemental)
Exh. G - [Expert Report, if applicable]
Exh. H - [Business Records, emails, etc.]

[All exhibits must be authenticated and admissible. Attach as separate PDF files or combined with separation pages.]`,
    declaration: `I, [Attorney Name], declare:

1. I am an attorney licensed in [State], representing [Moving Party] in this action.
2. I have personal knowledge of the facts stated herein based on my review of the file, discovery responses, depositions, and documents.
3. The facts stated in the Statement of Undisputed Material Facts are true and correct to the best of my knowledge, information, and belief.
4. All exhibits referenced are true and correct copies of the originals in my possession.
5. I declare under penalty of perjury under the laws of [State] that the foregoing is true and correct.

Executed on [Date], at [City], [State].

_____________________________
[Attorney Name]
[Bar Number]`,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "courtState") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${getStateName(selectedState)} Motion for Summary Judgment`,
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
          { label: "Moving Party", value: formData.movingParty },
          { label: "Opposing Party", value: formData.opposingParty },
        ]},
        { heading: "Legal Standard", fields: [
          { label: "Standard", value: formData.legalStandard },
        ]},
        { heading: "Statement of Undisputed Material Facts", fields: [
          { label: "Facts", value: formData.undisputedFacts },
        ]},
        { heading: "Memorandum of Law / Argument", fields: [
          { label: "Argument", value: formData.argument },
        ]},
        { heading: "Conclusion & Prayer", fields: [
          { label: "Conclusion", value: formData.conclusion },
        ]},
        { heading: "Evidence & Exhibits", fields: [
          { label: "Exhibits", value: formData.evidence },
        ]},
        { heading: "Supporting Declaration", fields: [
          { label: "Declaration", value: formData.declaration },
        ]},
      ],
      fileName: "motion-summary-judgment.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/summary-judgment" className="hover:text-primary-600">Summary Judgment Motion</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Motion for Summary Judgment
      </h1>
      <p className="mt-2 text-gray-600">
        Create a complete motion for summary judgment with legal standard, undisputed facts, argument, and exhibits.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This summary judgment template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Summary judgment is a critical, case-dispositive motion with strict procedural requirements (formatting, page limits, separate statement of facts, evidence citation format, deadlines).
        You MUST consult with a licensed attorney in your jurisdiction before filing.
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
          <h2 className="text-xl font-bold text-gray-900">2. Parties & Motion Info</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="plaintiffName" className="block text-sm font-medium text-gray-700">Plaintiff</label>
              <input id="plaintiffName" name="plaintiffName" type="text" value={formData.plaintiffName} onChange={handleChange} placeholder="e.g., Jane Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="defendantName" className="block text-sm font-medium text-gray-700">Defendant</label>
              <input id="defendantName" name="defendantName" type="text" value={formData.defendantName} onChange={handleChange} placeholder="e.g., Acme Corporation" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="movingParty" className="block text-sm font-medium text-gray-700">Moving Party</label>
              <input id="movingParty" name="movingParty" type="text" value={formData.movingParty} onChange={handleChange} placeholder="e.g., Defendant Acme Corporation" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div>
              <label htmlFor="opposingParty" className="block text-sm font-medium text-gray-700">Opposing Party</label>
              <input id="opposingParty" name="opposingParty" type="text" value={formData.opposingParty} onChange={handleChange} placeholder="e.g., Plaintiff Jane Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. Legal Standard</h2>
          <p className="mt-2 text-sm text-gray-500">Insert applicable standard (FRCP 56 / State equivalent). Cite controlling authority.</p>
          <div className="mt-4">
            <label htmlFor="legalStandard" className="block text-sm font-medium text-gray-700">Legal Standard</label>
            <textarea id="legalStandard" name="legalStandard" value={formData.legalStandard} onChange={handleChange} rows={5} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Statement of Undisputed Material Facts</h2>
          <p className="mt-2 text-sm text-gray-500">Number each fact. Cite evidence for EVERY fact (e.g., 'Exh. A', 'Dep. at 12:3-5', 'Decl. ¶ 4'). Opposing party must respond to each.</p>
          <div className="mt-4">
            <label htmlFor="undisputedFacts" className="block text-sm font-medium text-gray-700">Undisputed Material Facts</label>
            <textarea id="undisputedFacts" name="undisputedFacts" value={formData.undisputedFacts} onChange={handleChange} rows={10} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Memorandum of Law / Argument</h2>
          <p className="mt-2 text-sm text-gray-500">Structure: I. No Genuine Dispute of Material Fact. II. Entitled to Judgment as Matter of Law. Address each claim/defense. Cite evidence for every factual assertion.</p>
          <div className="mt-4">
            <label htmlFor="argument" className="block text-sm font-medium text-gray-700">Argument</label>
            <textarea id="argument" name="argument" value={formData.argument} onChange={handleChange} rows={15} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">6. Conclusion & Prayer</h2>
          <div className="mt-4">
            <label htmlFor="conclusion" className="block text-sm font-medium text-gray-700">Conclusion & Prayer for Relief</label>
            <textarea id="conclusion" name="conclusion" value={formData.conclusion} onChange={handleChange} rows={8} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">7. Evidence & Exhibit List</h2>
          <p className="mt-2 text-sm text-gray-500">List all exhibits with descriptions. All must be authenticated and admissible (or reducible to admissible form).</p>
          <div className="mt-4">
            <label htmlFor="evidence" className="block text-sm font-medium text-gray-700">Exhibit List</label>
            <textarea id="evidence" name="evidence" value={formData.evidence} onChange={handleChange} rows={8} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">8. Supporting Declaration</h2>
          <p className="mt-2 text-sm text-gray-500">Attorney or party declaration authenticating exhibits and supporting facts.</p>
          <div className="mt-4">
            <label htmlFor="declaration" className="block text-sm font-medium text-gray-700">Declaration</label>
            <textarea id="declaration" name="declaration" value={formData.declaration} onChange={handleChange} rows={8} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            📄 Download PDF Motion for Summary Judgment
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Summary Judgment
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