'use client';

import { useState } from 'react';

const states = [
  { name: 'California', residency: '6 months', waitingPeriod: '6 months', communityProperty: true },
  { name: 'Texas', residency: '6 months', waitingPeriod: '60 days', communityProperty: true },
  { name: 'Florida', residency: '6 months', waitingPeriod: '20 days', communityProperty: false },
  { name: 'New York', residency: '1 year', waitingPeriod: '6 months', communityProperty: false },
  { name: 'Illinois', residency: '90 days', waitingPeriod: '6 months', communityProperty: false },
];

type FormData = {
  petitionerName: string;
  respondentName: string;
  marriageDate: string;
  separationDate: string;
  groundsForDivorce: string;
  hasChildren: boolean;
  numberOfChildren: string;
  propertyAddress: string;
  spousalSupport: boolean;
};

export default function DivorcePapersPage() {
  const [selectedState, setSelectedState] = useState(states[0]);
  const [formData, setFormData] = useState<FormData>({
    petitionerName: '',
    respondentName: '',
    marriageDate: '',
    separationDate: '',
    groundsForDivorce: 'irreconcilable_differences',
    hasChildren: false,
    numberOfChildren: '0',
    propertyAddress: '',
    spousalSupport: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('PDF generation coming soon! Form data: ' + JSON.stringify(formData));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-primary-600">Home</a>
        <span className="mx-2">/</span>
        <a href="/divorce-papers" className="hover:text-primary-600">Divorce Papers</a>
        <span className="mx-2">/</span>
        <span>{selectedState.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">{selectedState.name} Divorce Papers Template</h1>

      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <strong>Important Disclaimer:</strong> These templates are for informational purposes only and do NOT constitute legal advice. Divorce proceedings are complex and vary significantly by state. You should consult with a licensed family law attorney before filing any divorce documents.
      </div>

      <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">
        <strong>Notice:</strong> Divorce filings require court submission and may involve mandatory waiting periods, mandatory disclosure requirements, and potential mandatory mediation. These forms are starting points only.
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
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Petitioner (Filing Party) Name</label>
            <input type="text" value={formData.petitionerName} onChange={(e) => setFormData({ ...formData, petitionerName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="Jane Smith" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Respondent (Other Party) Name</label>
            <input type="text" value={formData.respondentName} onChange={(e) => setFormData({ ...formData, respondentName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="John Smith" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Marriage</label>
            <input type="date" value={formData.marriageDate} onChange={(e) => setFormData({ ...formData, marriageDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Separation</label>
            <input type="date" value={formData.separationDate} onChange={(e) => setFormData({ ...formData, separationDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Grounds for Divorce</label>
          <select
            value={formData.groundsForDivorce}
            onChange={(e) => setFormData({ ...formData, groundsForDivorce: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="irreconcilable_differences">Irreconcilable Differences (No-Fault)</option>
            <option value="incompatible">Incompatible/Incurable Breakdown</option>
            <option value="adultery">Adultery</option>
            <option value="cruel_treatment">Cruel Treatment</option>
            <option value="desertion">Desertion/Abandonment</option>
            <option value="substance_abuse">Substance Abuse</option>
            <option value="felony_conviction">Felony Conviction</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Property Address (Marital Residence)</label>
          <input type="text" value={formData.propertyAddress} onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" placeholder="123 Main St, Los Angeles, CA 90001" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <input type="checkbox" id="hasChildren" checked={formData.hasChildren}
              onChange={(e) => setFormData({ ...formData, hasChildren: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <label htmlFor="hasChildren" className="ml-2 text-sm font-medium text-gray-700">Minor children from this marriage</label>
          </div>

          {formData.hasChildren && (
            <div className="ml-6">
              <label className="block text-sm font-medium text-gray-700">Number of Minor Children</label>
              <input type="number" min="1" max="20" value={formData.numberOfChildren}
                onChange={(e) => setFormData({ ...formData, numberOfChildren: e.target.value })}
                className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
            </div>
          )}

          <div className="flex items-center">
            <input type="checkbox" id="spousalSupport" checked={formData.spousalSupport}
              onChange={(e) => setFormData({ ...formData, spousalSupport: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <label htmlFor="spousalSupport" className="ml-2 text-sm font-medium text-gray-700">Requesting spousal support/alimony</label>
          </div>
        </div>

        <button type="submit" className="w-full rounded-md bg-primary-600 px-4 py-3 text-white font-medium hover:bg-primary-700">
          Download Divorce Papers
        </button>
      </form>

      <div className="mt-12 rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">{selectedState.name} Divorce Requirements</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>&bull; <strong>Residency Requirement:</strong> {selectedState.residency} minimum in {selectedState.name}</li>
          <li>&bull; <strong>Mandatory Waiting Period:</strong> {selectedState.waitingPeriod} from filing to finalization</li>
          <li>&bull; <strong>Community Property State:</strong> {selectedState.communityProperty ? 'Yes - marital property is split 50/50' : 'No - equitable distribution applies'}</li>
          <li>&bull; <strong>Court Appearance:</strong> Required in most contested cases</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900">How long does divorce take in {selectedState.name}?</h3>
            <p className="mt-2 text-gray-600">In {selectedState.name}, the minimum processing time is {selectedState.waitingPeriod} from filing. Uncontested divorces with no children may be finalized faster. Contested cases involving custody or significant assets can take 6-18 months or longer.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">How much does a divorce cost in {selectedState.name}?</h3>
            <p className="mt-2 text-gray-600">Filing fees in {selectedState.name} range from $200-$400. Uncontested divorces with an attorney may cost $1,500-$5,000. Contested divorces with full litigation can cost $15,000-$50,000+ per side.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Do I need a lawyer for divorce in {selectedState.name}?</h3>
            <p className="mt-2 text-gray-600">While not legally required, it is strongly recommended to consult with a family law attorney, especially if children, significant assets, or spousal support are involved. {selectedState.communityProperty ? 'As a community property state, property division rules are specific.' : 'Equitable distribution means assets are divided fairly, not necessarily equally.'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Can we file for divorce together?</h3>
            <p className="mt-2 text-gray-600">Yes. In {selectedState.name}, couples who agree on all terms can file a joint/uncontested divorce, which is faster and cheaper than a contested divorce. Both parties must fully disclose all assets and debts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
