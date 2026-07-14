'use client';

import { useState } from 'react';
import { generatePdf } from '@/lib/pdf-builder';

const states = [
  { name: 'California', note: 'California uses a &quot;best interest of the child&quot; standard. Joint custody is strongly favored. Courts consider the child&apos;s health, safety, and welfare, plus the ability of each parent to provide care.' },
  { name: 'Texas', note: 'Texas presumes that joint managing conservatorship (joint custody) is in the child&apos;s best interest. The primary consideration is the best interest of the child under Texas Family Code §153.002.' },
  { name: 'Florida', note: 'Florida courts encourage shared parental responsibility. The best interest of the child standard considers factors like the moral fitness and mental health of each parent under Florida Statute §61.13.' },
  { name: 'New York', note: 'New York follows the &quot;best interest of the child&quot; standard. Courts consider parental ability, home environment, and the child&apos;s wishes if mature enough. Joint custody is available but not presumed.' },
  { name: 'Illinois', note: 'Illinois uses the &quot;best interest of the child&quot; standard under the Illinois Marriage and Dissolution of Marriage Act. The law presumes both parents are fit and joint custody is appropriate.' },
];

type FormData = {
  parent1Name: string;
  parent2Name: string;
  childNames: string;
  custodyType: string;
  visitationSchedule: string;
  childSupportAmount: string;
  healthInsuranceResponsibility: string;
  holidaySchedule: string;
};

export default function ChildCustodyPage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    parent1Name: '',
    parent2Name: '',
    childNames: '',
    custodyType: 'joint',
    visitationSchedule: '',
    childSupportAmount: '',
    healthInsuranceResponsibility: '',
    holidaySchedule: '',
  });

  const handleDownload = async () => {
    await generatePdf({
      title: 'Child Custody Agreement',
      state: selectedState.name,
      sections: [
        { heading: 'Parent Information', fields: [
          { label: 'Parent 1', value: formData.parent1Name },
          { label: 'Parent 2', value: formData.parent2Name },
          { label: 'Child(ren)', value: formData.childNames },
        ]},
        { heading: 'Custody Arrangement', fields: [
          { label: 'Custody Type', value: formData.custodyType === 'sole' ? 'Sole Custody' : formData.custodyType === 'joint' ? 'Joint Custody' : 'Structured Custody' },
          { label: 'Visitation Schedule', value: formData.visitationSchedule },
          { label: 'Child Support Amount', value: formData.childSupportAmount ? `$${formData.childSupportAmount}/month` : '' },
          { label: 'Health Insurance Responsibility', value: formData.healthInsuranceResponsibility },
          { label: 'Holiday Schedule', value: formData.holidaySchedule },
        ]},
      ],
      fileName: 'child-custody-agreement.pdf',
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/child-custody" className="hover:text-primary-600">Child Custody Agreement</a>
        <span className="mx-2">/</span>
        <span>{selectedState.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">
        Free Child Custody Agreement Template | LegalDocs
      </h1>

      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This child custody agreement template is for informational purposes only and does not constitute legal advice. Child custody laws vary significantly by state. This template does not replace a court order. Consult with a licensed family law attorney for advice specific to your situation.
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
        <strong>{selectedState.name} Custody Law:</strong> <span dangerouslySetInnerHTML={{ __html: selectedState.note }} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleDownload(); }} className="mt-8 space-y-6">
        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Parent Information</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Parent 1 Full Name</label>
              <input type="text" value={formData.parent1Name} onChange={(e) => setFormData({ ...formData, parent1Name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="Jane Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Parent 2 Full Name</label>
              <input type="text" value={formData.parent2Name} onChange={(e) => setFormData({ ...formData, parent2Name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="John Smith" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Child(ren) Name(s) and Date(s) of Birth</label>
              <textarea value={formData.childNames} onChange={(e) => setFormData({ ...formData, childNames: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" rows={3}
                placeholder="Child 1: Name, DOB&#10;Child 2: Name, DOB" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Custody Arrangement</h3>
          <div className="mt-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Custody Type</label>
              <select value={formData.custodyType} onChange={(e) => setFormData({ ...formData, custodyType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <option value="sole">Sole Custody — One parent has primary legal and physical custody</option>
                <option value="joint">Joint Custody — Both parents share legal and/or physical custody</option>
                <option value="structured">Structured Custody — Custom arrangement with detailed provisions</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Visitation Schedule</label>
              <textarea value={formData.visitationSchedule} onChange={(e) => setFormData({ ...formData, visitationSchedule: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" rows={4}
                placeholder="Example: Parent 2 has visitation every other weekend (Friday 6pm to Sunday 6pm) and Wednesday evenings (5pm to 8pm)..." />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Child Support Amount ($/month)</label>
                <input type="number" value={formData.childSupportAmount} onChange={(e) => setFormData({ ...formData, childSupportAmount: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="1500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Health Insurance Responsibility</label>
                <input type="text" value={formData.healthInsuranceResponsibility} onChange={(e) => setFormData({ ...formData, healthInsuranceResponsibility: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="Parent 1 (via employer)" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Holiday Schedule</label>
              <textarea value={formData.holidaySchedule} onChange={(e) => setFormData({ ...formData, holidaySchedule: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" rows={4}
                placeholder="Example: Thanksgiving — alternating years, odd years with Parent 1, even years with Parent 2.&#10;Christmas — December 24-25 with Parent 1 in odd years, Parent 2 in even years..." />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700">
          Download Child Custody Agreement PDF
        </button>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">Legal Notes</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>&bull; In {selectedState.name}, courts prioritize the best interest of the child in all custody decisions.</li>
          <li>&bull; A written agreement should be filed with the court to be legally enforceable.</li>
          <li>&bull; Child support is typically calculated based on both parents&apos; income and the number of children.</li>
          <li>&bull; Both parents have a legal obligation to support their children financially.</li>
          <li>&bull; Custody arrangements can be modified by the court if there is a substantial change in circumstances.</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900">What is the difference between sole and joint custody?</h3>
            <p className="mt-2 text-gray-600">Sole custody means one parent has primary legal and/or physical custody of the child, making major decisions on their behalf. Joint custody means both parents share decision-making authority and/or physical time with the child. In {selectedState.name}, courts generally prefer arrangements that allow both parents meaningful involvement.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">How is child support calculated?</h3>
            <p className="mt-2 text-gray-600">Child support is typically calculated using state guidelines that consider each parent&apos;s income, the number of children, and the custody arrangement. In {selectedState.name}, courts use a formula based on combined parental income and parenting time allocation.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Can a custody agreement be changed?</h3>
            <p className="mt-2 text-gray-600">Yes. Custody orders can be modified if there is a material change in circumstances. Either parent can petition the court for a modification. The court will evaluate whether the change is in the best interest of the child.</p>
          </div>
        </div>
      </div>
    </div>
  );
}