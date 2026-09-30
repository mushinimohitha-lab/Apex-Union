import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Users,
  Building2,
  Layers,
  Sparkles,
  Info,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Wrench
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface PageNavigationHeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onBack: () => void;
  onMove: () => void;
  prevPageName: string;
  nextPageName: string;
}

export const PageNavigationHeader: React.FC<PageNavigationHeaderProps> = ({
  currentView,
  onNavigate,
  onBack,
  onMove,
  prevPageName,
  nextPageName
}) => {
  const { t, currentUser, switchRole } = useApp();

  const getPageInfo = (view: string) => {
    switch (view) {
      case 'landing':
        return { title: 'Apex Union Home', icon: Home, badge: 'Home' };
      case 'customer_dashboard':
        return { title: 'Customer Portal', icon: Users, badge: 'Customer Mode' };
      case 'worker_dashboard':
        return { title: 'Cooperative Worker Portal', icon: Wrench, badge: 'Artisan Member' };
      case 'cooperative_dashboard':
        return { title: 'Cooperative Admin Portal', icon: Building2, badge: 'Admin Mode' };
      case 'platform_dashboard':
        return { title: 'Platform Admin Dashboard', icon: Layers, badge: 'Federation' };
      case 'ai_features':
        return { title: 'AI & Algorithmic Features', icon: Sparkles, badge: 'Explainable AI' };
      case 'about':
        return { title: 'About Apex Union Charter', icon: Info, badge: 'Democracy' };
      case 'privacy':
        return { title: 'Privacy & Data Governance', icon: ShieldCheck, badge: 'DPDP Standard' };
      default:
        return { title: 'Apex Union', icon: Home, badge: 'Portal' };
    }
  };

  const currentInfo = getPageInfo(currentView);
  const CurrentIcon = currentInfo.icon;

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white shadow-sm sticky top-[4.5rem] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          
          {/* 1. BACK ARROW NAVIGATION & HOME ICON */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              title={`Back to ${prevPageName}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 border border-slate-700 hover:border-amber-400/40 text-xs font-semibold transition-all cursor-pointer group shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
              <span className="hidden md:inline text-slate-400 font-normal">({prevPageName})</span>
            </button>

            {/* Home Icon button to view app starting page */}
            <button
              onClick={() => onNavigate('landing')}
              title="Home - View app starting page"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>

          {/* 2. CURRENT PAGE INDICATOR & SEPARATE PORTALS SWITCHER */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Current View Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs">
              <CurrentIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-bold text-white truncate max-w-[140px] sm:max-w-xs">{currentInfo.title}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-700 text-slate-300 hidden sm:inline">
                {currentInfo.badge}
              </span>
            </div>

            <div className="hidden lg:flex items-center text-slate-500 text-xs">|</div>

            {/* SEPARATE CUSTOMER, WORKER, & COOPERATIVE ADMIN ACCESS */}
            <div className="flex items-center gap-1.5">
              {/* Customer Portal Button */}
              <button
                onClick={() => {
                  switchRole('customer');
                  onNavigate('customer_dashboard');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentView === 'customer_dashboard'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs ring-2 ring-amber-400/50'
                    : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
                title="Open Customer Portal (Book verified artisans & services)"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Customer</span>
              </button>

              {/* Worker Portal Button */}
              <button
                onClick={() => {
                  switchRole('cooperative_worker');
                  onNavigate('worker_dashboard');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentView === 'worker_dashboard'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs ring-2 ring-amber-400/50'
                    : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
                title="Open Worker Portal (Jobs, practical assessment, verification, OTPs)"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Worker</span>
              </button>

              {/* Cooperative Admin Button */}
              <button
                onClick={() => {
                  switchRole('cooperative_admin');
                  onNavigate('cooperative_dashboard');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentView === 'cooperative_dashboard'
                    ? 'bg-indigo-500 text-white font-bold shadow-xs ring-2 ring-indigo-400/50'
                    : 'bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 border border-indigo-500/30'
                }`}
                title="Open Cooperative Admin Portal (Roster, OCR verification, allocations)"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Coop Admin</span>
              </button>
            </div>
          </div>

          {/* 3. MOVE / FORWARD ARROW NAVIGATION */}
          <div className="flex items-center gap-2">
            <button
              onClick={onMove}
              title={`Move to ${nextPageName}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-300 text-xs font-bold transition-all cursor-pointer group shadow-xs"
            >
              <span>Move</span>
              <span className="hidden md:inline font-semibold text-slate-900">({nextPageName})</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
