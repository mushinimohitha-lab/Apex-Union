import React from 'react';
import { HeartHandshake, ShieldCheck, Users, Building2, Scale, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface AboutPageProps {
  onNavigate?: (view: string) => void;
  onBack?: () => void;
  onMove?: () => void;
  prevPageName?: string;
  nextPageName?: string;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onBack,
  onMove,
  prevPageName = 'Previous',
  nextPageName = 'Next'
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* In-Page Navigation Bar */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold cursor-pointer transition-colors group"
          title={`Go back to ${prevPageName}`}
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
          <span className="hidden sm:inline text-slate-500 font-normal">({prevPageName})</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate && onNavigate('customer_dashboard')}
            className="px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold cursor-pointer"
          >
            Customer Portal
          </button>
          <button
            onClick={() => onNavigate && onNavigate('cooperative_dashboard')}
            className="px-2.5 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-semibold cursor-pointer"
          >
            Cooperative Admin
          </button>
        </div>

        <button
          onClick={onMove}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold cursor-pointer transition-colors group shadow-2xs"
          title={`Move forward to ${nextPageName}`}
        >
          <span>Move</span>
          <span className="hidden sm:inline font-semibold">({nextPageName})</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
          Our Founding Mission
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About Apex Union
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
          “Connecting Skilled Workers, Cooperatives and Customers on One Digital Platform.”
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <DemoIntegrationBadge status="implemented" label="Cooperative Charter Model" />
        </div>

        <h2 className="text-lg font-bold text-slate-900">
          The Problem with Predatory Gig Platforms
        </h2>
        <p>
          In conventional on-demand gig applications, skilled tradespeople—electricians, plumbers, carpenters, and appliance mechanics—are treated as replaceable algorithms. Aggregators deduct up to 30%–40% in punitive commissions, penalize workers for declining unscheduled trips, and provide zero retirement, insurance, or collective representation.
        </p>

        <h2 className="text-lg font-bold text-slate-900">
          The Cooperative Alternative
        </h2>
        <p>
          Labour Cooperatives operate under democratic principles recognized worldwide and legislated under state cooperative acts. In a cooperative, the artisans own the enterprise. Surplus earnings return to workers as annual patronage dividends, emergency welfare funds, and subsidized group healthcare.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <h3 className="font-bold text-slate-900 text-xs">Democratic Governance</h3>
            <p className="text-xs text-slate-500">
              One member, one vote. Cooperative presidents and management boards are elected by fellow artisans.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <h3 className="font-bold text-slate-900 text-xs">Capped Platform Fee</h3>
            <p className="text-xs text-slate-500">
              Platform administration fees are strictly capped at 8%–10% to cover digital infrastructure and payment settlement.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <h3 className="font-bold text-slate-900 text-xs">Documented Craftsmanship</h3>
            <p className="text-xs text-slate-500">
              Every worker's National Trade Certificate (ITI) or NSDC credential is audit-verified before public dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
