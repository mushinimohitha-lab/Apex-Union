import React from 'react';
import {
  ShieldCheck,
  Building2,
  Users,
  Layers,
  HeartHandshake,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Award
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';
import { AULogo } from '../common/AULogo';
import { useApp } from '../../context/AppContext';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center text-left group cursor-pointer"
              aria-label="Apex Union Home"
            >
              <AULogo
                size="md"
                variant="gold"
                showText={true}
                subtitle={t('brand.subtitle')}
              />
            </button>

            <p className="text-xs text-slate-300 leading-relaxed">
              Democratizing skilled gig labour through verified trade standards, autonomous cooperative governance, and 90% direct fair wages.
            </p>

            {/* Core Values: Unity & Skilled Workmanship */}
            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-semibold text-white">Democratic Governance:</span>
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
              Platform Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('customer_dashboard')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('nav.customer_portal')}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cooperative_dashboard')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-indigo-300 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{t('nav.coop_portal')}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('platform_dashboard')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-300 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t('nav.platform_portal')}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai_features')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-amber-300 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Smart Problem Matching</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Trades & Pricing */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Cooperative Fixed Tariffs
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between text-slate-400">
                <span>{t('cat.ac_servicing')}</span>
                <span className="font-mono text-amber-400 font-semibold">₹500 / hr</span>
              </li>
              <li className="flex items-center justify-between text-slate-400">
                <span>{t('cat.ac_installation')}</span>
                <span className="font-mono text-amber-400 font-semibold">₹1,000</span>
              </li>
              <li className="flex items-center justify-between text-slate-400">
                <span>{t('cat.civil_mesthri')}</span>
                <span className="font-mono text-amber-400 font-semibold">₹600 / hr</span>
              </li>
              <li className="flex items-center justify-between text-slate-400">
                <span>{t('cat.electrical')}</span>
                <span className="font-mono text-slate-300">₹349</span>
              </li>
              <li className="flex items-center justify-between text-slate-400">
                <span>{t('cat.plumbing')}</span>
                <span className="font-mono text-slate-300">₹299</span>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
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
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-amber-400"
                >
                  <span>Terms & Conditions (Charter)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Worker Privacy & PII Shielding
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cooperative Federation Bylaws
                </button>
              </li>
              <li className="pt-2">
                <span className="text-[11px] text-slate-500 block leading-tight">
                  Operating under the Co-operative Societies Act Model
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Apex Union Federation (AU). All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Federation Seal: FED-COOP-2024-001</span>
            </span>
            <span>·</span>
            <span>Zero Exploitative Commission</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
