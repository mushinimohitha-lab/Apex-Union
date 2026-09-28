import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Building2, Code2, ArrowUpRight, ScrollText, Scale, Coins } from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';
import { ApexUnionEmblem } from '../common/ApexUnionEmblem';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Mission with Official Apex Union Logo */}
          <div className="space-y-4 md:col-span-1">
            <button
              onClick={() => onNavigate('landing')}
              className="text-left group cursor-pointer transition-transform hover:scale-[1.02] focus:outline-none"
              aria-label="Apex Union Home"
            >
              <ApexUnionEmblem
                size="md"
                variant="gold"
                showText={true}
                subtitle="Labour Cooperatives Federation"
              />
            </button>

            <p className="text-xs text-slate-300 leading-relaxed">
              Democratizing skilled gig labour through verified trade standards, autonomous cooperative governance, and 90% direct fair wages.
            </p>

            {/* Core Values: Unity & Skilled Workmanship */}
            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-semibold text-white">Unity in Solidarity:</span>
                <span className="text-slate-400">1 Member = 1 Vote · 90% Direct Payout</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="font-semibold text-white">Skilled Workmanship:</span>
                <span className="text-slate-400">ITI / NSDC Certified Master Trades</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <DemoIntegrationBadge status="demo" label="Federation Portal" />
              <span className="text-[10px] text-slate-500 font-mono">FED-COOP-2024</span>
            </div>
          </div>

          {/* Quick Portals */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Platform Dashboards
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('customer_dashboard')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Customer Service Discovery</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cooperative_dashboard')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Cooperative Operations & Workforce</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('platform_dashboard')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Platform Federation Governance</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai_features')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-amber-300"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Matching & Allocation Engine</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Tech & Architecture */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              System Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('tech_stack')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Architecture & Tech Stack (PRD)</span>
                </button>
              </li>
              <li>
                <span className="text-slate-500 block">Frontend: React / Vite SPA + Tailwind</span>
              </li>
              <li>
                <span className="text-slate-500 block">Target Architecture: Flutter & FastAPI</span>
              </li>
              <li>
                <span className="text-slate-500 block">Database: PostgreSQL Schema Standard</span>
              </li>
              <li>
                <span className="text-slate-500 block">AI Layer: NLP + Weighted Recommendation</span>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Governance & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onNavigate('landing');
                    setTimeout(() => {
                      const el = document.getElementById('terms-and-conditions');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Terms & Conditions (First Page)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy & Data Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Labour Cooperatives
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                Notice: Document OCR and GPS are simulated working models in this prototype environment for college/panel evaluation.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Official Union Seal Note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2.5">
            <ApexUnionEmblem size="sm" variant="gold" showText={false} className="opacity-90 scale-90" />
            <div>
              <p className="text-slate-300 font-medium">
                © {new Date().getFullYear()} APEX UNION — Registered Labour Cooperatives Digital Consortium.
              </p>
              <p className="text-[11px] text-slate-500">
                Operating under the Co-operative Societies Act Model
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Cooperative Workforce</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 font-mono text-[11px]">FED-COOP-2024-001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
