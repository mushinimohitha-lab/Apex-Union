import React from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCategoryKey } from '../../types';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Building2,
  Clock,
  Star,
  Zap,
  Droplet,
  Hammer,
  Wind,
  Flower2,
  Paintbrush,
  Sparkle,
  Wrench,
  HeartHandshake,
  TrendingUp,
  MapPin,
  Scale,
  Award,
  ScrollText,
  BadgeCheck,
  Coins,
  Shield,
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { CategoryIcon } from '../common/IconHelper';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';
import { ApexUnionEmblem } from '../common/ApexUnionEmblem';
import { AULogo } from '../common/AULogo';
import { LandingTermsAndCharter } from './LandingTermsAndCharter';
import serviceWorkersImage from '../../assets/images/service_workers_cooperative_1790755086267.jpg';

interface Props {
  onNavigate: (view: string) => void;
  onSelectCategory: (cat: ServiceCategoryKey) => void;
  onBack?: () => void;
  onMove?: () => void;
  prevPageName?: string;
  nextPageName?: string;
}

export const LandingPage: React.FC<Props> = ({
  onNavigate,
  onSelectCategory,
  onBack,
  onMove,
  prevPageName = 'Previous',
  nextPageName = 'Customer Portal'
}) => {
  const { workers, serviceCategories, cooperatives, reviews, switchRole, t } = useApp();

  const handleStartBooking = (catKey?: ServiceCategoryKey) => {
    switchRole('customer');
    if (catKey) onSelectCategory(catKey);
    onNavigate('customer_dashboard');
  };

  const handleOpenCoopAdmin = () => {
    switchRole('cooperative_admin');
    onNavigate('cooperative_dashboard');
  };

  const handleOpenWorkerPortal = () => {
    switchRole('cooperative_worker');
    onNavigate('worker_dashboard');
  };

  const handleJoinWorker = () => {
    switchRole('cooperative_admin');
    onNavigate('cooperative_dashboard');
  };

  const handleRegisterCoop = () => {
    switchRole('platform_admin');
    onNavigate('platform_dashboard');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section with Professional Skilled Workers & Labour Cooperatives Background Image */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        {/* Background Image of Diverse Skilled Trade Workers: Electricians, Plumbers, Technicians, Painters */}
        <div className="absolute inset-0 z-0">
          <img
            src={serviceWorkersImage}
            alt="Apex Union Cooperative Service Workers — Electricians, Plumbers, Technicians, Painters"
            className="w-full h-full object-cover object-[65%_center] lg:object-center opacity-40 sm:opacity-50 lg:opacity-60"
          />
          {/* Subtle dark navy overlays matching Apex Union branding */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/80" />
          <div className="absolute inset-0 bg-indigo-950/30 mix-blend-multiply" />
        </div>

        {/* Ambient subtle light glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content with subtle dark scrim for crisp readability */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left bg-slate-950/45 backdrop-blur-xs p-5 sm:p-7 rounded-3xl border border-white/5 shadow-2xl">
              {/* Emblem Tagline Ribbon */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/85 border border-indigo-700/80 text-xs text-indigo-200 shadow-sm">
                  <AULogo size="sm" variant="gold" showText={false} />
                  <span className="font-semibold text-white">{t('brand.name', 'APEX UNION')}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-amber-300 font-medium">
                    {t('landing.hero_badge', 'Digital Labour Cooperatives Federation')}
                  </span>
                </div>
                <DemoIntegrationBadge status="demo" label={t('landing.working_model', 'Working Model')} />
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                {t('landing.hero_title_1', 'Find Trusted Skilled Workers.')}{' '}
                <span className="text-amber-400 drop-shadow-sm">
                  {t('landing.hero_title_2', 'Build Stronger Cooperatives.')}
                </span>
              </h1>

              {/* Trade Badges Set representing Electricians, Plumbers, Technicians, Painters */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-[11px] text-slate-300">
                <span className="font-semibold text-amber-400">Verified Artisans:</span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-900/80 border border-slate-700/80 text-amber-300 font-medium">⚡ Electricians</span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-900/80 border border-slate-700/80 text-sky-300 font-medium">🔧 Plumbers</span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-900/80 border border-slate-700/80 text-emerald-300 font-medium">❄️ Technicians</span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-900/80 border border-slate-700/80 text-rose-300 font-medium">🎨 Painters</span>
              </div>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t(
                  'landing.hero_desc',
                  '“Connecting Skilled Workers, Cooperatives and Customers on One Digital Platform.” Access verified trade artisans through transparent algorithmic matching, standardized tariffs, and guaranteed 90% direct fair wages.'
                )}
              </p>

              {/* Separate Customer, Worker & Cooperative Admin Portal CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => handleStartBooking()}
                  className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg hover:shadow-amber-400/20 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Users className="w-4 h-4 text-slate-950" />
                  <span>Customer Portal: Book Artisans</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={handleOpenWorkerPortal}
                  className="px-5 py-3.5 text-sm font-bold text-amber-950 bg-amber-400/90 hover:bg-amber-300 border border-amber-300 rounded-xl shadow-lg hover:shadow-amber-400/20 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Wrench className="w-4 h-4 text-amber-950" />
                  <span>Worker Portal: Jobs & OTP</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={handleOpenCoopAdmin}
                  className="px-5 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/40 rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-indigo-200" />
                  <span>Cooperative Admin Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={handleRegisterCoop}
                  className="px-4 py-3.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Platform Federation</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('landing.trust_coop_verified', '100% Cooperative Verified')}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Coins className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{t('landing.trust_fair_wage', '90% Fair Wage Guarantee')}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Scale className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{t('landing.trust_democratic', 'Democratic Governance')}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('terms-and-conditions');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer bg-slate-800/90 hover:bg-slate-700/90 px-3 py-1 rounded-full border border-amber-400/30"
                >
                  <ScrollText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold">
                    {t('landing.trust_terms', 'Terms & Conditions (On First Page) ↓')}
                  </span>
                </button>
              </div>
            </div>

            {/* Right Multi-Worker Visual Representation */}
            <div className="lg:col-span-5 relative">
              <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-5 border border-slate-700/60 shadow-2xl relative space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-200">
                      {t('landing.live_roster', 'Live Cooperative Roster')}
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-mono">
                    {t('landing.federated_count', '18 Cooperatives Federated')}
                  </span>
                </div>

                {/* Worker Mini Showcase Cards */}
                <div className="space-y-2.5">
                  {workers.slice(0, 4).map((worker, i) => (
                    <div
                      key={worker.id || i}
                      className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-700/70 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={worker.avatarUrl}
                          alt={worker.name}
                          className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-600"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white">{worker.name}</span>
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <p className="text-[11px] text-amber-300 font-medium">
                            {t(`cat.${worker.serviceCategory}`, worker.serviceCategory.replace('_', ' '))} · {worker.experienceYears} Yrs
                          </p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[170px]">{worker.cooperativeName}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-white text-xs">{worker.rating}★</span>
                        <span className="text-[10px] block text-emerald-400 font-medium">
                          {worker.availability === 'available'
                            ? t('landing.available_now', 'Available Now')
                            : t('landing.on_job', 'On Job')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => handleStartBooking()}
                    className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center justify-center gap-1 w-full cursor-pointer"
                  >
                    <span>{t('landing.explore_all_workers', 'Explore All 1,850+ Verified Cooperative Workers')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Service Categories (10 Certified Disciplines) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            {t('landing.disciplines_badge', '10 Certified Skilled Disciplines')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t('landing.disciplines_title', 'Professional Cooperative Services')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t(
              'landing.disciplines_subtitle',
              'Standardized tariffs, trade-certified union artisans, and guaranteed transparent payouts.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceCategories.map(cat => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <CategoryIcon categoryKey={cat.id} className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {cat.activeWorkersCount} {t('landing.active_artisans_suffix', 'Active Artisans')}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                    {t(`cat.${cat.id}`, cat.name)}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {cat.popularTasks.slice(0, 2).map(task => (
                    <span
                      key={task}
                      className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded"
                    >
                      {task}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block">
                    {t('landing.tariff_starts', 'Tariff Starts At')}
                  </span>
                  <span className="text-base font-bold text-slate-900">₹{cat.basePrice}</span>
                </div>
                <button
                  onClick={() => handleStartBooking(cat.id)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{t('landing.view_artisans', 'View Artisans')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Official Terms and Conditions & Democratic Charter (Embedded on First Page) */}
      <LandingTermsAndCharter />

      {/* 4. Dedicated Portals: Customer and Cooperative Admin (Separately Featured) */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
              Dedicated Operational Portals
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Customer & Cooperative Admin Portals
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Distinct environments for service seekers and cooperative labor federation administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PORTAL 1: CUSTOMER PORTAL */}
            <div className="bg-slate-800/80 rounded-3xl p-8 border border-amber-400/30 hover:border-amber-400/60 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full">
                    Customer Experience
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Customer Portal</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Designed for households and enterprises seeking trusted trade craftsmanship. Book verified electricians, plumbers, carpenters, and AC specialists with guaranteed fair rates.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {[
                    'Instant Multi-trade Search & Verification Filter',
                    'Fixed Minimum Tariff Protection (₹500/hr AC service, ₹1000 install)',
                    'Live Map Simulation with Proximity Dispatch Tracking',
                    'Instant Invoice & Settlement (UPI, QR Code, or Cash)'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/80">
                <button
                  onClick={() => handleStartBooking()}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg hover:shadow-amber-400/25"
                >
                  <span>Launch Customer Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* PORTAL 2: COOPERATIVE ADMIN PORTAL */}
            <div className="bg-slate-800/80 rounded-3xl p-8 border border-indigo-500/40 hover:border-indigo-500/70 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 rounded-full">
                    Cooperative Governance
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Cooperative Admin Portal</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Designed for cooperative society leaders and worker-guild managers. Maintain artisan rosters, verify credentials, coordinate dispatches, and oversee equitable dividend distributions.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {[
                    'Autonomous Labour Society Worker Roster & Profiles',
                    'Simulated OCR Trade Certificate & ITI Document Auditing',
                    'Fair Dispatch Queue & Cooperative Workload Balancing',
                    'Transparent Member Patronage Dividend & Financial Metrics'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/80">
                <button
                  onClick={handleOpenCoopAdmin}
                  className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg hover:shadow-indigo-600/25"
                >
                  <span>Launch Cooperative Admin Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI Features Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-indigo-800/40 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-indigo-800/60">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/20 px-2.5 py-0.5 rounded">
                  {t('landing.ai_badge', 'Intelligence Layer')}
                </span>
                <DemoIntegrationBadge status="implemented" label="Live Working Models" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                {t('landing.ai_title', 'AI Built for Worker Dignity & Operational Equity')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                {t(
                  'landing.ai_desc',
                  'Apex Union replaces opaque black-box gig algorithms with transparent, human-in-the-loop AI designed to support cooperatives and customers alike.'
                )}
              </p>
            </div>

            <button
              onClick={() => onNavigate('customer_dashboard')}
              className="px-5 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-colors flex items-center gap-1.5 shrink-0 self-start lg:self-auto cursor-pointer"
            >
              <span>{t('landing.ai_explore_btn', 'Explore AI Smart Matching')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
                01
              </span>
              <h3 className="text-base font-bold text-white">Multilingual NLP & Voice</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Interprets natural language and spoken voice in Telugu, Hindi, Tamil, Odia, Punjabi, Malayalam & English.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
                02
              </span>
              <h3 className="text-base font-bold text-white">Weighted Recommendations</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ranks workers using verified transparent criteria: Skill match (35%), Distance (20%), Availability (15%), Experience (10%), Rating (10%), Verification (10%).
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
                03
              </span>
              <h3 className="text-base font-bold text-white">Emergency Detection</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instantly identifies urgent issues like burst pipes, short circuits, and AC cooling failures, prioritizing closest available artisans.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
                04
              </span>
              <h3 className="text-base font-bold text-white">Civil Mesthri & AC Specialization</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated matchmaking for AC Servicing (₹500/hr), AC Installation (₹1,000 fixed), and Master Civil Mesthris.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Statistics (Platform Impact) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">14,200+</span>
            <span className="text-xs text-slate-500 font-medium block mt-1">
              {t('landing.stats_completed', 'Completed Bookings')}
            </span>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-extrabold text-emerald-700 font-mono">1,850+</span>
            <span className="text-xs text-slate-500 font-medium block mt-1">
              {t('landing.stats_artisans', 'Verified Union Artisans')}
            </span>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-extrabold text-indigo-700 font-mono">18</span>
            <span className="text-xs text-slate-500 font-medium block mt-1">
              {t('landing.stats_coops', 'Federated Cooperatives')}
            </span>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-extrabold text-amber-600 font-mono">99.2%</span>
            <span className="text-xs text-slate-500 font-medium block mt-1">
              {t('landing.stats_rate', 'Fair Wage Disbursal Rate')}
            </span>
          </div>
        </div>
      </section>

      {/* 7. Cooperative Network Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
            {t('landing.coops_badge', 'Federated Societies')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t('landing.coops_title', 'Our Participating Labour Cooperatives')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t(
              'landing.coops_subtitle',
              'Registered under the State Cooperative Societies Act, democratically owned and operated by workers.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cooperatives.map(c => (
            <div
              key={c.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {c.rating}★ Rated
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-3">{c.name}</h3>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Reg No: {c.registrationNumber}
                </p>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {c.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">{c.district}, {c.state}</span>
                <span className="font-semibold text-indigo-700">
                  {workers.filter(w => w.cooperativeId === c.id).length} {t('landing.active_artisans_suffix', 'Artisans')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Testimonials & Verified Reviews */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100 px-2.5 py-1 rounded-md">
              {t('landing.reviews_badge', 'Real Customer Stories')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {t('landing.reviews_title', 'Verified Feedback from Everyday Citizens')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map(rev => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{rev.customerName}</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Customer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden border border-slate-800 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t('landing.cta_title', 'Ready to Experience Dignified, Reliable Skilled Services?')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {t(
                'landing.cta_subtitle',
                'Join thousands of households supporting labour cooperatives and receiving verified, honest trade work.'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleStartBooking()}
              className="px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              {t('landing.cta_book_btn', 'Book a Service Now')}
            </button>
            <button
              onClick={() => onNavigate('cooperative_dashboard')}
              className="px-5 py-3 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              {t('landing.cta_portal_btn', 'Cooperative Admin Portal')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
