// Fixed: multiline strings use template literals (backticks)
'use client';

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
  defendantAddress: string;
  defendantAttorney: string;
  generalDenial: string;
  specificDenials: string;
  affirmativeDefenses: string;
  counterclaims: string;
  crossClaims: string;
  thirdPartyClaims: string;
  juryDemand: string;
  prayerForRelief: string;
  verification: string;
};

const faqs = [
  {
    q: "What is an Answer to a Complaint?",
    a: "An Answer is the defendant's formal written response to the plaintiff's Complaint. It must admit, deny, or state lack of knowledge for each numbered allegation, assert affirmative defenses, and may include counterclaims, cross-claims, or third-party claims. Must be filed within the time limit (21 days federal, varies by state)."
  },
  {
    q: "What are the three possible responses to each allegation?",
    a: "(1) Admit - the allegation is true. (2) Deny - the allegation is false. (3) Lack knowledge/information sufficient to form a belief - you don't know if it's true or false (treated as a denial). You must respond to EVERY numbered paragraph."
  },
  {
    q: "What are affirmative defenses?",
    a: "Affirmative defenses are 'new matter' that, if true, defeat the plaintiff's claim even if all allegations are true. Common: statute of limitations, statute of frauds, waiver, estoppel, laches, accord and satisfaction, release, res judicata, collateral estoppel, failure to state a claim, failure to mitigate damages, unclean hands, contributory/comparative negligence. MUST be pleaded or they're waived (FRCP 8(c))."
  },
  {
    q: "What's the difference between counterclaims, cross-claims, and third-party claims?",
    a: "Counterclaim: defendant's claim against plaintiff (compulsory if same transaction, permissive if not). Cross-claim: claim against co-party (co-defendant) arising from same transaction. Third-party claim: defendant brings in new party (third-party defendant) who may be liable to defendant for all/part of plaintiff's claim (impleader)."
  },
  {
    q: "Can I file a motion to dismiss instead of an Answer?",
    a: "Yes, under FRCP 12(b) (or state equivalent), you can move to dismiss for: lack of jurisdiction, improper venue, insufficient process, failure to state a claim, etc. Filing a motion to dismiss typically tolls the time to answer. If denied, you must then file an answer within 14 days (federal). Some defenses (jurisdiction, venue) are waived if not raised in first response."
  },
  {
    q: "What is a general denial?",
    a: "A general denial denies all allegations in the complaint. Some states allow it for certain case types (e.g., CA allows general denial in limited civil cases < $25k). Federal courts and most states require specific responses to each numbered paragraph. General denial alone may be insufficient."
  },
];

export default function AnswerPage() {
  const [selectedState, setSelectedState] = useState<StateAbbr>("CA");
  const [formData, setFormData] = useState<FormData>({
    courtName: "",
    courtCounty: "",
    courtState: "CA",
    caseNumber: "",
    plaintiffName: "",
    defendantName: "",
    defendantAddress: "",
    defendantAttorney: "",
    generalDenial: "Defendant generally denies each and every allegation of the Complaint not expressly admitted herein.",
    specificDenials: `1. Defendant admits the allegations in paragraph 1.
2. Defendant denies the allegations in paragraph 2.
3. Defendant lacks knowledge or information sufficient to form a belief as to the truth of the allegations in paragraph 3, and on that basis denies them.
[Continue for each numbered paragraph of the Complaint]`,
    affirmativeDefenses: `FIRST AFFIRMATIVE DEFENSE: Statute of Limitations
The claims are barred by the applicable statute of limitations.

SECOND AFFIRMATIVE DEFENSE: Failure to State a Claim
The Complaint fails to state facts sufficient to constitute a cause of action.

THIRD AFFIRMATIVE DEFENSE: Statute of Frauds
Any alleged agreement is unenforceable under the Statute of Frauds.

FOURTH AFFIRMATIVE DEFENSE: Waiver / Estoppel
Plaintiff waived/is estopped from asserting the claims.

FIFTH AFFIRMATIVE DEFENSE: Failure to Mitigate Damages
Plaintiff failed to take reasonable steps to mitigate damages.

SIXTH AFFIRMATIVE DEFENSE: Contributory / Comparative Negligence
Any damages were caused by plaintiff's own negligence.

SEVENTH AFFIRMATIVE DEFENSE: Unclean Hands
Plaintiff comes to court with unclean hands.

EIGHTH AFFIRMATIVE DEFENSE: Accord and Satisfaction / Release
The claims have been fully satisfied and/or released.

NINTH AFFIRMATIVE DEFENSE: Res Judicata / Collateral Estoppel
The claims are barred by prior adjudication.

TENTH AFFIRMATIVE DEFENSE: Reservation of Rights
Defendant reserves the right to assert additional defenses as discovery proceeds.`,
    counterclaims: `COUNTERCLAIM 1: Breach of Contract
[If applicable, state counterclaim against plaintiff here with same particularity as a complaint]`,
    crossClaims: `CROSS-CLAIM: [If applicable, claim against co-defendant]`,
    thirdPartyClaims: `THIRD-PARTY CLAIM: [If applicable, claim against third-party defendant for contribution/indemnity]`,
    juryDemand: "Defendant demands a trial by jury on all issues so triable.",
    prayerForRelief: `WHEREFORE, Defendant prays for judgment:
1. That Plaintiff take nothing by this Complaint;
2. That the Complaint be dismissed with prejudice;
3. That Defendant recover costs of suit and attorney fees;
4. That Defendant recover on any counterclaims asserted;
5. For such other and further relief as the Court deems just and proper.`,
    verification: "I, [Defendant Name], declare under penalty of perjury that the foregoing is true and correct to the best of my knowledge.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "courtState") setSelectedState(value as StateAbbr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generatePdf({
      title: `${getStateName(selectedState)} Answer to Complaint`,
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
          { label: "Defendant Address", value: formData.defendantAddress },
          { label: "Defendant Attorney", value: formData.defendantAttorney },
        ]},
        { heading: "General Denial", fields: [
          { label: "General Denial", value: formData.generalDenial },
        ]},
        { heading: "Specific Responses to Allegations", fields: [
          { label: "Specific Denials/Admissions", value: formData.specificDenials },
        ]},
        { heading: "Affirmative Defenses", fields: [
          { label: "Affirmative Defenses", value: formData.affirmativeDefenses },
        ]},
        { heading: "Counterclaims, Cross-Claims & Third-Party Claims", fields: [
          { label: "Counterclaims", value: formData.counterclaims },
          { label: "Cross-Claims", value: formData.crossClaims },
          { label: "Third-Party Claims", value: formData.thirdPartyClaims },
        ]},
        { heading: "Jury Demand & Prayer", fields: [
          { label: "Jury Demand", value: formData.juryDemand },
          { label: "Prayer for Relief", value: formData.prayerForRelief },
        ]},
        { heading: "Verification", fields: [
          { label: "Verification", value: formData.verification },
        ]},
      ],
      fileName: "answer-to-complaint.pdf",
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/answer" className="hover:text-primary-600">Answer to Complaint</a>
        <span className="mx-2">/</span>
        <span>{getStateName(selectedState)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        {getStateName(selectedState)} Answer to Civil Complaint
      </h1>
      <p className="mt-2 text-gray-600">
        Create a formal answer responding to a civil complaint. Includes denials, affirmative defenses, counterclaims, and jury demand.
      </p>

      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong className="font-semibold">⚠ Disclaimer:</strong> This answer template is provided for
        informational and educational purposes only. It does not constitute legal advice.
        Procedural rules and deadlines vary by jurisdiction. Failure to timely answer can result in default judgment.
        You must consult with a licensed attorney in your jurisdiction before filing.
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
          <h2 className="text-xl font-bold text-gray-900">2. Parties</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="plaintiffName" className="block text-sm font-medium text-gray-700">Plaintiff Name</label>
              <input id="plaintiffName" name="plaintiffName" type="text" value={formData.plaintiffName} onChange={handleChange} placeholder="e.g., Jane Doe" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="defendantName" className="block text-sm font-medium text-gray-700">Defendant Name</label>
              <input id="defendantName" name="defendantName" type="text" value={formData.defendantName} onChange={handleChange} placeholder="e.g., Acme Corporation" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="defendantAddress" className="block text-sm font-medium text-gray-700">Defendant Address</label>
              <input id="defendantAddress" name="defendantAddress" type="text" value={formData.defendantAddress} onChange={handleChange} placeholder="e.g., 100 Business Park Dr, Los Angeles, CA 90001" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="defendantAttorney" className="block text-sm font-medium text-gray-700">Defendant Attorney (Name, Bar #, Firm, Contact)</label>
              <input id="defendantAttorney" name="defendantAttorney" type="text" value={formData.defendantAttorney} onChange={handleChange} placeholder="e.g., John Smith, Bar #123456, Smith Law Group, (213) 555-0123" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">3. General Denial</h2>
          <p className="mt-2 text-sm text-gray-500">Some jurisdictions allow a general denial. Federal courts require specific responses to each paragraph.</p>
          <div className="mt-4">
            <label htmlFor="generalDenial" className="block text-sm font-medium text-gray-700">General Denial</label>
            <textarea id="generalDenial" name="generalDenial" value={formData.generalDenial} onChange={handleChange} rows={2} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">4. Specific Responses to Each Numbered Paragraph</h2>
          <p className="mt-2 text-sm text-gray-500">Respond to EVERY numbered paragraph: Admit, Deny, or Lack Knowledge. Use numbering matching the Complaint.</p>
          <div className="mt-4">
            <label htmlFor="specificDenials" className="block text-sm font-medium text-gray-700">Specific Denials/Admissions</label>
            <textarea id="specificDenials" name="specificDenials" value={formData.specificDenials} onChange={handleChange} rows={8} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">5. Affirmative Defenses (FRCP 8(c) / State Equivalents)</h2>
          <p className="mt-2 text-sm text-gray-500">MUST be pleaded or WAIVED. List each separately. Common: statute of limitations, failure to state claim, statute of frauds, waiver, estoppel, laches, accord & satisfaction, release, res judicata, collateral estoppel, failure to mitigate, contributory negligence, unclean hands.</p>
          <div className="mt-4">
            <label htmlFor="affirmativeDefenses" className="block text-sm font-medium text-gray-700">Affirmative Defenses</label>
            <textarea id="affirmativeDefenses" name="affirmativeDefenses" value={formData.affirmativeDefenses} onChange={handleChange} rows={10} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">6. Counterclaims, Cross-Claims & Third-Party Claims</h2>
          <p className="mt-2 text-sm text-gray-500">Counterclaim: vs Plaintiff. Cross-claim: vs Co-defendant. Third-party claim: vs New party (impleader). Compulsory if same transaction (FRCP 13(a)).</p>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="counterclaims" className="block text-sm font-medium text-gray-700">Counterclaims</label>
              <textarea id="counterclaims" name="counterclaims" value={formData.counterclaims} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="crossClaims" className="block text-sm font-medium text-gray-700">Cross-Claims</label>
              <textarea id="crossClaims" name="crossClaims" value={formData.crossClaims} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="thirdPartyClaims" className="block text-sm font-medium text-gray-700">Third-Party Claims (Impleader)</label>
              <textarea id="thirdPartyClaims" name="thirdPartyClaims" value={formData.thirdPartyClaims} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">7. Jury Demand & Prayer for Relief</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="juryDemand" className="block text-sm font-medium text-gray-700">Jury Demand</label>
              <select id="juryDemand" name="juryDemand" value={formData.juryDemand} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required>
                <option value="Defendant demands a trial by jury on all issues so triable.">Demand Jury Trial</option>
                <option value="Defendant waives right to jury trial.">Waive Jury Trial (Bench Trial)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="prayerForRelief" className="block text-sm font-medium text-gray-700">Prayer for Relief</label>
              <textarea id="prayerForRelief" name="prayerForRelief" value={formData.prayerForRelief} onChange={handleChange} rows={5} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none" required />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-gray-900">8. Verification</h2>
          <p className="mt-2 text-sm text-gray-500">Required in some states for certain case types. Check local rules.</p>
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
            📄 Download PDF Answer to Complaint
          </button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions About Answers to Complaints
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