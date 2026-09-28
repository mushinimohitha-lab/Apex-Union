import React, { useState } from 'react';
import {
  ScrollText,
  ShieldCheck,
  Scale,
  Building2,
  HeartHandshake,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  ChevronDown,
  ChevronUp,
  FileText,
  BadgeCheck,
  Gavel,
  Lock,
  Coins,
  CheckSquare,
  Sparkles,
  Award
} from 'lucide-react';
import { ApexUnionEmblem } from '../common/ApexUnionEmblem';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

export const LandingTermsAndCharter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'customer' | 'worker' | 'cooperative' | 'disclaimer'
  >('all');
  const [expandedClause, setExpandedClause] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [showPrintToast, setShowPrintToast] = useState(false);

  const toggleClause = (id: number) => {
    if (expandAll) {
      setExpandAll(false);
      setExpandedClause(null);
    } else {
      setExpandedClause(expandedClause === id ? null : id);
    }
  };

  const handlePrint = () => {
    setShowPrintToast(true);
    setTimeout(() => {
      window.print();
      setShowPrintToast(false);
    }, 400);
  };

  const termsData = [
    {
      id: 1,
      category: 'customer',
      badge: 'Customer Obligations',
      title: '1. Customer Responsibilities & Site Access Standards',
      summary:
        'Customers must ensure accurate physical addresses, safe domestic workspaces, and prompt service authorization.',
      details: [
        'Accurate Site Details: Provide verified residential or commercial address, phone contact, and clear description of the maintenance issue.',
        'Safe Working Premises: Ensure direct, hazard-free physical access to water mains, electrical switchboards, or appliance units during scheduled service windows.',
        'Mutual Dignity & Respect: Cooperative artisans are certified trade professionals. Verbal harassment, intimidation, or requesting hazardous non-standard modifications is strictly prohibited.',
        'Payment Transparency: Settle agreed cooperative tariffs promptly via online UPI, cooperative QR, or direct cash upon satisfactory task sign-off.'
      ],
      icon: UserCheck,
      color: 'border-blue-200 bg-blue-50/40 text-blue-900',
      iconColor: 'text-blue-600 bg-blue-100'
    },
    {
      id: 2,
      category: 'worker',
      badge: 'Worker Rights & Protection',
      title: '2. Worker Dignity, Fair Wage & 90% Direct Payout Guarantee',
      summary:
        'Guaranteed transparent remuneration without predatory algorithm bidding or hidden platform deductions.',
      details: [
        '90% Payout Protection: Minimum 90% of the customer service tariff is disbursed directly to the attending artisan or cooperative welfare account.',
        'Capped Administrative Overhead: Platform technological maintenance fees are strictly capped at 8%–10% to prevent aggregator extraction.',
        'Autonomous Shift Control: Workers determine their own availability and neighborhood service radius without algorithmic shadow-banning or penalization for resting.',
        'Healthcare & Solidarity Fund: A percentage of cooperative earnings is routed to member group accident cover and retirement patronage dividends.'
      ],
      icon: HeartHandshake,
      color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900',
      iconColor: 'text-emerald-600 bg-emerald-100'
    },
    {
      id: 3,
      category: 'cooperative',
      badge: 'Cooperative Standards',
      title: '3. Cooperative Obligations & Mandatory Trade Verification',
      summary:
        'Participating cooperatives authenticate National Trade Certificates (ITI) and maintain artisan accountability.',
      details: [
        'Pre-Onboarding Audit: Autonomous cooperatives must audit trade diplomas, apprenticeships, and police/character clearances before authorizing members.',
        'OCR Document Ingestion: The platform assists verification with optical character recognition, but formal accreditation approval is signed by the cooperative council.',
        'Equitable Workload Rotation: Cooperatives use the AI Workforce Allocation console to distribute assignments fairly among journeymen, avoiding overwork.',
        'Quality Oversight: Cooperatives appoint senior master craftsmen to investigate repeat service inquiries or customer discrepancies.'
      ],
      icon: Building2,
      color: 'border-indigo-200 bg-indigo-50/40 text-indigo-900',
      iconColor: 'text-indigo-600 bg-indigo-100'
    },
    {
      id: 4,
      category: 'customer',
      badge: 'Lifecycle & Cancellation',
      title: '4. Service Lifecycle, Dispatch & Fair Cancellation Policy',
      summary:
        'Defined transition stages with fair compensation rules protecting both customer convenience and worker transit.',
      details: [
        'Structured Stages: Workflows advance sequentially: REQUESTED → ACCEPTED → ON THE WAY → IN PROGRESS → COMPLETED.',
        'Zero-Fee Pre-Transit Cancellation: Customers may reschedule or cancel without charge while booking is in REQUESTED or ACCEPTED stage.',
        'Transit Compensation: If a booking is cancelled after the worker has departed (ON THE WAY stage), a nominal ₹50 travel compensation is credited to the artisan.',
        'Digital Tax Invoice: An official GST/cooperative voucher is generated immediately upon completion with an itemized labor fee breakdown.'
      ],
      icon: Clock,
      color: 'border-amber-200 bg-amber-50/40 text-amber-900',
      iconColor: 'text-amber-600 bg-amber-100'
    },
    {
      id: 5,
      category: 'disclaimer',
      badge: 'Platform Limitations',
      title: '5. Platform Intermediary Role & Limitation of Direct Liability',
      summary:
        'Apex Union functions as a digital federation platform and does not maintain an employer-employee relationship.',
      details: [
        'Digital Intermediary Status: Apex Union is a technology software platform connecting customers, cooperatives, and independent tradespeople.',
        'No Direct Employment: Apex Union does not directly employ individual workers. Artisans are members of their respective registered democratic societies.',
        'Warranty & Workmanship: Specific guarantees on installed hardware or plumbing fixtures are subject to manufacturer warranties and cooperative guild agreements.',
        'Evaluation Prototype Context: This application demonstrates domain algorithms, OCR extraction, and GPS tracking as working prototype workflows for academic evaluation.'
      ],
      icon: ShieldAlert,
      color: 'border-rose-200 bg-rose-50/40 text-rose-900',
      iconColor: 'text-rose-600 bg-rose-100'
    },
    {
      id: 6,
      category: 'disclaimer',
      badge: 'Safety & Redressal',
      title: '6. Safety Standards, Dispute Redressal & Arbitration',
      summary:
        'Multistep grievance resolution with senior union technician re-inspection and fee escrow guarantees.',
      details: [
        'Arbitration Board: Any customer complaint regarding workmanship is routed to the joint Cooperative Federation Arbitration Desk.',
        'Re-Inspection Protocol: If a fault persists within 72 hours, a senior union supervisor conducts a free second-look inspection.',
        'Account Security & Privacy: Phone numbers and coordinates are masked and protected in compliance with the Digital Personal Data Protection (DPDP) Act.',
        'Prohibited Behavior: Any circumvention of cooperative invoicing, off-platform cash bribes, or unsafe work environments results in platform exclusion.'
      ],
      icon: Gavel,
      color: 'border-purple-200 bg-purple-50/40 text-purple-900',
      iconColor: 'text-purple-600 bg-purple-100'
    }
  ];

  const filteredTerms = termsData.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="terms-and-conditions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 scroll-mt-24">
      {/* 1. Official Apex Union Seal & Charter Spotlight Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <ApexUnionEmblem size="lg" variant="gold" showText={false} />
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  The Apex Union Charter
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  APEX UNION DEMOCRATIC CHARTER
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-amber-400">APEX</strong> denotes the pinnacle of technical skill, ITI credential verification, and verified craftsmanship.{' '}
              <strong className="text-amber-400">UNION</strong> symbolizes democratic solidarity—workers, cooperatives, and citizens uniting on one transparent digital platform without corporate middleman exploitation.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-center">
                <Scale className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block">Democratic Vote</span>
                <span className="text-[10px] text-slate-400">1 Member = 1 Voice</span>
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-center">
                <Coins className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block">90% Fair Wage</span>
                <span className="text-[10px] text-slate-400">Direct Worker Payout</span>
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-center">
                <BadgeCheck className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block">ITI Certified</span>
                <span className="text-[10px] text-slate-400">Audit-Verified Trades</span>
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-center">
                <ShieldCheck className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block">Welfare Fund</span>
                <span className="text-[10px] text-slate-400">Health & Accident Cover</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-slate-900/90 rounded-2xl border border-slate-700 text-center space-y-3 shrink-0">
            <ApexUnionEmblem size="xl" variant="gold" showText={false} />
            <div>
              <p className="text-xs font-bold text-white font-mono">SEAL OF APEX UNION</p>
              <p className="text-[10px] text-slate-400">FED-COOP-2024-001</p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Constitutional Union Charter
            </span>
          </div>
        </div>
      </div>

      {/* 2. Terms and Conditions Main Section on First Page */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                <ScrollText className="w-3.5 h-3.5" />
                Legal Framework & Governance
              </span>
              <DemoIntegrationBadge status="implemented" label="Live Platform Terms" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              Terms & Conditions of Service
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Governing the rights, responsibilities, and mutual guarantees between customers, skilled workers, and participating labour cooperatives.
            </p>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <button
              onClick={() => setExpandAll(!expandAll)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {expandAll ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
              <span>{expandAll ? 'Collapse All' : 'Expand All Provisions'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print or Save Terms as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / PDF Terms</span>
            </button>

            <button
              onClick={() => setAcknowledged(!acknowledged)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                acknowledged
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>{acknowledged ? 'Terms Acknowledged ✓' : 'Acknowledge Terms'}</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs by Role */}
        <div className="flex items-center overflow-x-auto gap-1.5 text-xs font-semibold pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Clauses (6)', icon: ScrollText },
            { id: 'customer', label: 'Customer Rules', icon: UserCheck },
            { id: 'worker', label: 'Worker Dignity & Payout', icon: HeartHandshake },
            { id: 'cooperative', label: 'Cooperative Verification', icon: Building2 },
            { id: 'disclaimer', label: 'Platform Disclaimers', icon: ShieldAlert }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Prominent Statutory Disclaimer Callout Card */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 flex items-start gap-3 text-xs text-amber-950">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-[11px] block">
              Section 24 Statutory Prototype & Intermediary Disclosure:
            </span>
            <p className="leading-relaxed text-amber-900">
              Apex Union is an electronic marketplace platform facilitating connections between consumers, verified workers, and licensed labour cooperatives. The platform does not directly hire, employ, or supervise every independent technician. Each participating cooperative operates under the Co-operative Societies Act with its own elected oversight council.
            </p>
          </div>
        </div>

        {/* Terms Clauses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map(item => {
            const Icon = item.icon;
            const isExpanded = expandAll || expandedClause === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  {/* Expandable detailed clause bullets */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-100 space-y-2 animate-in fade-in">
                      {item.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => toggleClause(item.id)}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Collapse Clause' : 'Read Full Legal Provisions'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Clause §0{item.id}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Acknowledgment Banner */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900">
                Transparent Governance Guarantee
              </p>
              <p className="text-slate-500 text-[11px]">
                By using Apex Union, you support dignified labour, collective bargaining, and transparent algorithmic allocation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] text-slate-500 font-medium">
              Status: {acknowledged ? 'Charter Signed (Demo)' : 'Review Required'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
