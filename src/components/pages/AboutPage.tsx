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
