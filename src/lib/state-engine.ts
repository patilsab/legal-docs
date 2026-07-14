export const US_STATES = [
  { name: "Alabama", abbr: "AL" },
  { name: "Alaska", abbr: "AK" },
  { name: "Arizona", abbr: "AZ" },
  { name: "Arkansas", abbr: "AR" },
  { name: "California", abbr: "CA" },
  { name: "Colorado", abbr: "CO" },
  { name: "Connecticut", abbr: "CT" },
  { name: "Delaware", abbr: "DE" },
  { name: "Florida", abbr: "FL" },
  { name: "Georgia", abbr: "GA" },
  { name: "Hawaii", abbr: "HI" },
  { name: "Idaho", abbr: "ID" },
  { name: "Illinois", abbr: "IL" },
  { name: "Indiana", abbr: "IN" },
  { name: "Iowa", abbr: "IA" },
  { name: "Kansas", abbr: "KS" },
  { name: "Kentucky", abbr: "KY" },
  { name: "Louisiana", abbr: "LA" },
  { name: "Maine", abbr: "ME" },
  { name: "Maryland", abbr: "MD" },
  { name: "Massachusetts", abbr: "MA" },
  { name: "Michigan", abbr: "MI" },
  { name: "Minnesota", abbr: "MN" },
  { name: "Mississippi", abbr: "MS" },
  { name: "Missouri", abbr: "MO" },
  { name: "Montana", abbr: "MT" },
  { name: "Nebraska", abbr: "NE" },
  { name: "Nevada", abbr: "NV" },
  { name: "New Hampshire", abbr: "NH" },
  { name: "New Jersey", abbr: "NJ" },
  { name: "New Mexico", abbr: "NM" },
  { name: "New York", abbr: "NY" },
  { name: "North Carolina", abbr: "NC" },
  { name: "North Dakota", abbr: "ND" },
  { name: "Ohio", abbr: "OH" },
  { name: "Oklahoma", abbr: "OK" },
  { name: "Oregon", abbr: "OR" },
  { name: "Pennsylvania", abbr: "PA" },
  { name: "Rhode Island", abbr: "RI" },
  { name: "South Carolina", abbr: "SC" },
  { name: "South Dakota", abbr: "SD" },
  { name: "Tennessee", abbr: "TN" },
  { name: "Texas", abbr: "TX" },
  { name: "Utah", abbr: "UT" },
  { name: "Vermont", abbr: "VT" },
  { name: "Virginia", abbr: "VA" },
  { name: "Washington", abbr: "WA" },
  { name: "West Virginia", abbr: "WV" },
  { name: "Wisconsin", abbr: "WI" },
  { name: "Wyoming", abbr: "WY" },
  { name: "District of Columbia", abbr: "DC" },
] as const;

export type StateAbbr = typeof US_STATES[number]["abbr"];

export const STATE_VARIANTS = {
  "residential-lease": [
    "CA", "NY", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI",
    "NJ", "VA", "WA", "AZ", "MA", "TN", "IN", "MO", "MD", "WI",
    "CO", "MN", "SC", "AL", "LA", "KY", "OR", "OK", "CT", "UT",
    "IA", "NV", "AR", "MS", "KS", "NM", "NE", "ID", "WV", "HI",
    "NH", "ME", "MT", "RI", "DE", "SD", "ND", "AK", "VT", "WY", "DC"
  ],
  "quitclaim-deed": [
    "CA", "NY", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI",
    "NJ", "VA", "WA", "AZ", "MA", "TN", "IN", "MO", "MD", "WI",
    "CO", "MN", "SC", "AL", "LA", "KY", "OR", "OK", "CT", "UT",
    "IA", "NV", "AR", "MS", "KS", "NM", "NE", "ID", "WV", "HI",
    "NH", "ME", "MT", "RI", "DE", "SD", "ND", "AK", "VT", "WY", "DC"
  ],
  "loan-agreement": [
    "CA", "NY", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI",
    "NJ", "VA", "WA", "AZ", "MA", "TN", "IN", "MO", "MD", "WI",
    "CO", "MN", "SC", "AL", "LA", "KY", "OR", "OK", "CT", "UT",
    "IA", "NV", "AR", "MS", "KS", "NM", "NE", "ID", "WV", "HI",
    "NH", "ME", "MT", "RI", "DE", "SD", "ND", "AK", "VT", "WY", "DC"
  ],
  "business-plan": US_STATES.map(s => s.abbr),
} as const;

export function getStateVariant(docType: string, state: StateAbbr): StateAbbr {
  const variants = STATE_VARIANTS[docType as keyof typeof STATE_VARIANTS] || US_STATES.map(s => s.abbr);
  return variants.includes(state) ? state : "CA";
}

export function getStateBySlug(slug: string): StateAbbr | null {
  const state = US_STATES.find(s => s.name.toLowerCase().replace(/\s+/g, "-") === slug);
  return state?.abbr || null;
}

export function getStateName(abbr: StateAbbr): string {
  return US_STATES.find(s => s.abbr === abbr)?.name || abbr;
}

export function getStateSlug(abbr: StateAbbr): string {
  return US_STATES.find(s => s.abbr === abbr)?.name.toLowerCase().replace(/\s+/g, "-") || abbr.toLowerCase();
}

// NO TYPE ANNOTATION - let TypeScript infer
const residentialLeaseNotes = {
  CA: [
    "Security deposits capped at 2 months rent (unfurnished) or 3 months (furnished) per CA Civil Code §1950.5",
    "Just Cause eviction protection required for most tenancies over 12 months (AB 1482)",
    "Landlord must provide 24-hour notice before entry (CA Civil Code §1954)",
    "Rent control applies in cities like LA, SF, Oakland, Berkeley, San Jose",
    "Late fees must be reasonable and specified in lease"
  ],
  NY: [
    "Security deposits limited to 1 month rent (NY General Obligations Law §7-103)",
    "Housing Stability & Tenant Protection Act (2019) strengthens rent stabilization",
    "Landlord must provide 24-hour written notice for entry (Real Property Law §235-f)",
    "NYC requires written lease for tenancies 12+ months",
    "Late fees capped at $50 or 5% of monthly rent, whichever is less"
  ],
  TX: [
    "No statutory limit on security deposits (TX Property Code §92.101)",
    "Landlord must return deposit within 30 days with itemized deductions",
    "No state rent control; cities cannot enact rent control (TX Local Gov Code §214.902)",
    "Landlord may enter with reasonable notice (typically 24 hours)",
    "Late fees must be reasonable and related to actual damages"
  ],
  FL: [
    "Security deposits must be held in separate account (FL Statute §83.49)",
    "Landlord has 15-60 days to return deposit with itemized statement",
    "No rent control at state level (FL Statute §125.0103)",
    "Landlord must give 12-hour notice for entry (FL Statute §83.53)",
    "Late fees allowed if specified in lease and reasonable"
  ],
  IL: [
    "Security deposit interest required for buildings with 25+ units (765 ILCS 710/)",
    "Chicago RLTO provides additional tenant protections",
    "Landlord must provide 2-day notice for entry (765 ILCS 705/5)",
    "No statewide rent control; Chicago has rent control ordinance",
    "Late fees must be reasonable and disclosed in lease"
  ],
};

export const DOCUMENT_STATE_NOTES = {
  "residential-lease": residentialLeaseNotes,
} as const;

export function getStateLegalNotes(docType: string, state: StateAbbr): string[] {
  const notes = (DOCUMENT_STATE_NOTES as Record<string, Record<string, string[]>>)[docType]?.[state];
  if (notes) return notes;
  return [
    "Consult local laws for state-specific requirements",
    "Security deposit limits and return timelines vary by state",
    "Landlord entry notice requirements differ by jurisdiction",
    "Rent control and late fee regulations vary locally"
  ];
}

export function getAllStateSlugs(docType: string): string[] {
  const variants = STATE_VARIANTS[docType as keyof typeof STATE_VARIANTS] || US_STATES.map(s => s.abbr);
  return variants.map(abbr => getStateSlug(abbr));
}
