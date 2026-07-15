import Link from 'next/link';
import { notFound } from 'next/navigation';

const blogPosts: Record<string, { title: string; category: string; date: string; readTime: string; content: string }> = {
  'understanding-eviction-laws-by-state': {
    title: 'Understanding Eviction Laws by State: A Comprehensive Guide',
    category: 'Landlord-Tenant',
    date: 'January 15, 2024',
    readTime: '12 min read',
    content: `Eviction laws vary significantly from state to state, making it essential for landlords and tenants to understand their specific jurisdiction requirements. This comprehensive guide covers the key aspects of eviction laws across all 50 US states.

## Why Eviction Laws Matter

Eviction laws protect both landlords and tenants by establishing clear procedures for removing a tenant from a rental property. Understanding these laws helps landlords avoid costly legal mistakes and ensures tenants know their rights. Without proper knowledge, landlords may face lawsuits, and tenants may be unfairly evicted.

## Key Elements of Eviction Laws

### Notice Requirements

Every state requires landlords to provide written notice before filing an eviction lawsuit. The notice period varies by state and by the reason for eviction:

- **3-Day Notice**: Most common for non-payment of rent in states like California, Texas, Florida, and New York. The tenant has three days to pay or vacate.
- **5-Day Notice**: Required in some states like Arizona, Colorado, and Washington. Provides a slightly longer cure period.
- **7-Day Notice**: Used for lease violations in states like Illinois, Pennsylvania, and Ohio. Gives tenants a week to correct the violation.
- **14-Day Notice**: Required for month-to-month termination in states like Massachusetts and Connecticut.
- **30-Day Notice**: Required for long-term tenants in many states. The specific timeframe varies by jurisdiction.

### Types of Eviction Notices

There are four main types of eviction notices that landlords may use:

1. **Pay or Quit Notice**: Used when a tenant fails to pay rent. The notice specifies the amount owed and gives the tenant a set time to pay or vacate.
2. **Cure or Quit Notice**: Used for lease violations other than non-payment. The notice describes the violation and gives the tenant time to fix it.
3. **Unconditional Quit Notice**: Used for serious violations like illegal activity or property damage. The tenant must vacate without the opportunity to cure.
4. **Notice to Vacate**: Used for month-to-month tenancy termination. The notice period varies by state.

### Tenant Rights During Eviction

Tenants have specific rights that vary by state but generally include:

- Right to proper written notice before eviction proceedings begin
- Right to cure violations within the notice period
- Right to legal representation in court
- Anti-retaliation protections (cannot be evicted for reporting code violations)
- Right to habitable premises (warranty of habitability)
- Right to proper service of all legal documents

## State-Specific Considerations

### California

California has some of the strongest tenant protections in the country:

- Security deposit limits: 2 months rent (unfurnished), 3 months (furnished)
- Just cause eviction required after 12 months of tenancy
- Rent control applies in certain cities (San Francisco, Los Angeles, Berkeley)
- Landlord must provide 24-hour notice before entry
- Statewide rent cap of 5% plus inflation (AB 1482)

### New York

New York has comprehensive tenant protections:

- Rent stabilization in NYC covering about 1 million apartments
- Good cause eviction law protects against unjust evictions
- Security deposit limited to 1 month rent
- Housing Stability and Tenant Protection Act (2019) strengthened protections

### Texas

Texas is more landlord-friendly:

- No rent control anywhere in the state
- 3-day notice for non-payment of rent
- Retaliatory eviction is prohibited
- Landlord can evict for any reason with proper notice
- No limit on security deposit amounts

### Florida

Florida has moderate protections:

- 3-day notice for non-payment of rent
- 7-day notice for lease violations
- No rent control at state level
- Landlord must give 12-hour notice for entry
- Retaliatory eviction is prohibited

### Illinois

Illinois has varying protections by city:

- 5-day notice for non-payment of rent
- Chicago RLTO provides additional tenant protections
- No statewide rent control
- Just cause eviction required in Chicago
- Security deposit interest required in Chicago

## Best Practices for Landlords

To avoid eviction disputes and legal issues:

1. Always provide written notice in the proper format
2. Document everything with photos, videos, and written records
3. Follow proper service procedures (certified mail, posting)
4. Keep accurate records of all communications and payments
5. Consult with a local attorney before filing any eviction action
6. Never engage in self-help evictions (changing locks, shutting off utilities)
7. Understand your local laws and ordinances

## Conclusion

Understanding your state eviction laws is crucial for both landlords and tenants. The penalties for improper eviction can be severe, including monetary damages and attorney fees. Always consult with a qualified attorney in your jurisdiction before proceeding with an eviction action.`,
  },
  'how-to-write-a-lease-agreement': {
    title: 'How to Write a Lease Agreement: Step-by-Step Guide',
    category: 'Landlord-Tenant',
    date: 'January 12, 2024',
    readTime: '10 min read',
    content: `A well-written lease agreement protects both landlords and tenants by clearly outlining the terms and conditions of the rental arrangement. This guide walks you through creating a comprehensive lease agreement.

## Why a Written Lease Matters

While some states allow oral leases for terms under one year, a written lease agreement provides numerous benefits:

- Clear documentation of all terms and conditions
- Legal protection for both parties in case of disputes
- Evidence that can be used in court proceedings
- Professional foundation for the landlord-tenant relationship
- Prevents misunderstandings about responsibilities

## Essential Components of a Lease Agreement

### 1. Parties and Property

Clearly identify all parties involved:

- Landlord full legal name and contact information
- Tenant full legal name and contact information
- Property address including unit number
- Description of included amenities and common areas
- Any restrictions on use of the property

### 2. Lease Term

Specify the duration of the tenancy:

- Start date and end date
- Type of tenancy (fixed-term or month-to-month)
- Renewal terms and conditions
- Early termination provisions and penalties
- Options to extend the lease

### 3. Rent and Payment Terms

Include comprehensive payment information:

- Monthly rent amount
- Due date (e.g., 1st of each month)
- Accepted payment methods (check, online, cash)
- Late fees and penalties for late payment
- Grace period if applicable
- Returned check fees

### 4. Security Deposit

Detail the security deposit requirements:

- Amount (check state limits)
- Holding requirements (separate account)
- Conditions for return
- Deduction criteria (damages, cleaning, unpaid rent)
- Timeline for return after move-out
- Interest requirements if applicable

### 5. Utilities and Services

Clarify responsibility for utilities:

- Which utilities are included in rent
- Which utilities are tenant responsibility
- How utilities are paid (directly to provider or through landlord)
- Responsibility for maintenance of utilities

### 6. Maintenance and Repairs

Define maintenance responsibilities:

- Landlord obligations for structural and major repairs
- Tenant responsibility for cleanliness and minor maintenance
- Process for reporting maintenance issues
- Emergency repair procedures
- Timeframe for landlord response

### 7. House Rules

Include policies for:

- Guest policies and overnight guest limits
- Noise levels and quiet hours
- Pet policies (breed restrictions, deposits)
- Smoking restrictions
- Parking rules and vehicle restrictions
- Trash and recycling procedures

## State-Specific Requirements

Each state has unique requirements for lease agreements:

- **California**: Requires lead paint disclosure, mold disclosure, and bed bug disclosure
- **New York**: Requires lead paint disclosure and must be in writing for terms over 1 year
- **Texas**: Requires specific language about landlord lien rights
- **Florida**: Requires mold disclosure in writing
- **Illinois**: Chicago RLTO requires specific disclosures

## Tips for a Strong Lease Agreement

1. Use clear, specific language that leaves no room for interpretation
2. Include all required disclosures for your state
3. Have the lease reviewed by a qualified attorney
4. Provide copies to all parties and keep originals in a safe place
5. Document the property condition at move-in with photos

## Conclusion

A comprehensive lease agreement is the foundation of a successful landlord-tenant relationship. Take the time to create a thorough document that protects both parties and complies with all state and local requirements.`,
  },
  'power-of-attorney-explained': {
    title: 'Power of Attorney Explained: Types, Requirements and How to Get One',
    category: 'Estate Planning',
    date: 'January 10, 2024',
    readTime: '15 min read',
    content: `A power of attorney (POA) is a legal document that grants one person the authority to act on behalf of another. Understanding the different types and requirements is essential for proper estate planning.

## What is a Power of Attorney?

A power of attorney allows you to designate someone you trust to make decisions on your behalf if you become unable to do so yourself. This can include financial, medical, or legal decisions. The person granting the power is called the principal, and the person receiving it is called the agent or attorney-in-fact.

## Types of Power of Attorney

### 1. General Power of Attorney

Grants broad authority for financial and legal matters. The agent can handle bank accounts, real estate, investments, and legal affairs. This type terminates if the principal becomes incapacitated.

### 2. Durable Power of Attorney

Remains effective even if the principal becomes incapacitated. This is essential for estate planning because it ensures someone can manage your affairs if you cannot. The word durable means the power continues despite incapacity.

### 3. Limited (Special) Power of Attorney

Grants authority for specific transactions or time periods. For example, you might give someone limited power to sign documents for a real estate closing or handle a specific business transaction.

### 4. Springing Power of Attorney

Becomes effective only upon a specified event, typically incapacity. This requires medical certification that the principal can no longer make decisions. Some states have specific requirements for springing POAs.

### 5. Medical Power of Attorney

Grants authority for healthcare decisions. Also known as healthcare proxy or healthcare power of attorney. This person can make medical decisions if you cannot communicate your wishes.

### 6. Financial Power of Attorney

Specifically for financial matters. Can be durable or non-durable. This agent can handle bank accounts, pay bills, manage investments, and file taxes.

## Legal Requirements

### Capacity

The principal must have legal capacity to create a POA:

- Must be of legal age (18 or older)
- Must be mentally competent
- Must be acting voluntarily without coercion

### Execution

Most states require:

- Written document (oral POAs are generally not valid)
- Principal signature
- Notarization (required in most states)
- Witness signatures (varies by state)

### Specific State Requirements

- **California**: Requires notarization
- **New York**: Requires notarization and two witnesses
- **Texas**: Requires notarization
- **Florida**: Requires notarization and two witnesses
- **Illinois**: Requires notarization

## Choosing an Agent

Select someone who:

- You trust completely with your financial and legal affairs
- Is financially responsible and organized
- Understands your wishes and values
- Is willing to serve as your agent
- Is accessible and responsive

## Revoking a Power of Attorney

You can revoke a POA at any time by:

- Executing a written revocation document
- Notifying the agent in writing
- Notifying third parties who may have relied on the POA
- Retrieving all copies of the original document
- Recording the revocation if the POA was recorded

## Common Uses

- Real estate transactions and closings
- Business management and operations
- Healthcare decisions during incapacity
- Financial management and bill paying
- Legal proceedings and court representation

## Conclusion

A power of attorney is a vital estate planning tool that everyone should consider. Consult with an attorney to create documents that meet your specific needs and comply with your state requirements.`,
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: 'Not Found' };
  return { title: `${post.title} | LegalDocs Blog`, description: post.content.substring(0, 160) };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
        </div>
      </div>
      <article className="mx-auto max-w-4xl px-4 py-12">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">{post.category}</span>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">{post.title}</h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <span>{post.date}</span>
          <span>&bull;</span>
          <span>{post.readTime}</span>
        </div>
        <div className="prose prose-lg prose-gray max-w-none mt-8">
          {post.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={i} className="text-xl font-bold text-gray-900 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={i} className="list-disc list-inside space-y-2 text-gray-700">
                  {paragraph.split('\n').map((item, j) => (
                    <li key={j}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.match(/^\d+\. /)) {
              return (
                <ol key={i} className="list-decimal list-inside space-y-2 text-gray-700">
                  {paragraph.split('\n').map((item, j) => (
                    <li key={j}>{item.replace(/^\d+\. /, '')}</li>
                  ))}
                </ol>
              );
            }
            return <p key={i} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>;
          })}
        </div>
        <div className="mt-12 rounded-xl bg-blue-50 p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900">Need a Legal Document?</h2>
          <p className="mt-2 text-gray-600">Create a free, state-specific legal document template in minutes.</p>
          <Link href="/" className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">Browse Documents</Link>
        </div>
      </article>
    </div>
  );
}
