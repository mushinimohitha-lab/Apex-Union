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
import { LandingTermsAndCharter } from './LandingTermsAndCharter';

interface Props {
  onNavigate: (view: string) => void;
  onSelectCategory: (cat: ServiceCategoryKey) => void;
}

export const LandingPage: React.FC<Props> = ({ onNavigate, onSelectCategory }) => {
  const { workers, serviceCategories, cooperatives, reviews, switchRole } = useApp();

  const handleStartBooking = (catKey?: ServiceCategoryKey) => {
    switchRole('customer');
    if (catKey) onSelectCategory(catKey);
    onNavigate('customer_dashboard');
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
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Ambient subtle light glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Emblem Tagline Ribbon */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/80 border border-indigo-700/70 text-xs text-indigo-200 shadow-sm">
                  <ApexUnionEmblem size="sm" variant="gold" showText={false} />
                  <span className="font-semibold text-white">APEX UNION</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-amber-300 font-medium">Digital Labour Cooperatives Federation</span>
                </div>
                <DemoIntegrationBadge status="demo" label="Working Model" />
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Find Trusted Skilled Workers.{' '}
                <span className="text-amber-400">Build Stronger Cooperatives.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                “Connecting Skilled Workers, Cooperatives and Customers on One Digital Platform.” Access verified trade artisans through transparent algorithmic matching, standardized tariffs, and guaranteed 90% direct fair wages.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => handleStartBooking()}
                  className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg hover:shadow-amber-400/20 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Wrench className="w-4 h-4 text-slate-950" />
                  <span>Find a Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={handleJoinWorker}
                  className="px-5 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl backdrop-blur-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Join as Worker</span>
                </button>

                <button
                  onClick={handleRegisterCoop}
                  className="px-5 py-3.5 text-sm font-semibold text-indigo-200 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/50 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  <span>Register Cooperative</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Cooperative Verified</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Coins className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>90% Fair Wage Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Scale className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Democratic Governance</span>
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
                  <span className="font-semibold">Terms & Conditions (On First Page) ↓</span>
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
                      Live Cooperative Roster
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-mono">18 Cooperatives Federated</span>
                </div>

                {/* Worker Mini Showcase Cards */}
                <div className="space-y-2.5">
                  {[
                    {
                      name: 'Suresh Varma',
                      trade: 'Master Plumber',
                      coop: 'Metro Artisans Cooperative',
                      exp: '6 Yrs',
                      rating: '4.88★',
                      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=150',
                      status: 'Available Now'
                    },
                    {
                      name: 'Mohammad Riaz',
                      trade: 'Licensed Electrician',
                      coop: 'Metro Artisans Cooperative',
                      exp: '8 Yrs',
                      rating: '4.92★',
                      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
                      status: 'On Job'
                    },
                    {
                      name: 'K. Ramesh Chari',
                      trade: 'Master Carpenter',
                      coop: 'Telangana Craftsmen Federation',
                      exp: '10 Yrs',
                      rating: '4.95★',
                      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
                      status: 'Available Now'
                    },
                    {
                      name: 'Sunita Devi',
                      trade: 'Deep Cleaning Specialist',
                      coop: 'Deccan Green Union',
                      exp: '5 Yrs',
                      rating: '4.91★',
                      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
                      status: 'Available Now'
                    }
                  ].map((worker, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-700/70 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={worker.avatar}
                          alt={worker.name}
                          className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-600"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white">{worker.name}</span>
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <p className="text-[11px] text-amber-300 font-medium">{worker.trade} · {worker.exp}</p>
                          <p className="text-[10px] text-slate-400">{worker.coop}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-white text-xs">{worker.rating}</span>
                        <span className="text-[10px] block text-emerald-400 font-medium">
                          {worker.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => handleStartBooking()}
                    className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center justify-center gap-1 w-full"
                  >
                    <span>Explore All 1,850+ Verified Cooperative Workers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Service Categories (8 Core Disciplines) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            8 Certified Skilled Disciplines
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Professional Cooperative Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Standardized tariffs, trade-certified union artisans, and guaranteed transparent payouts.
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
                    {cat.activeWorkersCount} Active Artisans
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                    {cat.name}
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
                  <span className="text-[10px] text-slate-400 block">Tariff Starts At</span>
                  <span className="text-base font-bold text-slate-900">₹{cat.basePrice}</span>
                </div>
                <button
                  onClick={() => handleStartBooking(cat.id)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>View Artisans</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Official Terms and Conditions & Democratic Charter (Embedded on First Page) */}
      <LandingTermsAndCharter />

      {/* 4. How Apex Union Works (4-Step Flow) */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
              End-to-End Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How Apex Union Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Transparent digital coordination from problem discovery to official cooperative invoice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Request & AI Match',
                desc: 'Describe your issue in English, Telugu, or Hindi. Our NLP engine classifies the trade and ranks nearby verified workers.',
                icon: Sparkles
              },
              {
                step: '02',
                title: 'Cooperative Allocation',
                desc: 'The autonomous labour cooperative validates availability, approves dispatch, and assigns the best-suited certified artisan.',
                icon: Building2
              },
              {
                step: '03',
                title: 'Professional Service',
                desc: 'Track the artisan’s approach on our map simulator. Receive precision on-site repair adhering to safety standards.',
                icon: Wrench
              },
              {
                step: '04',
                title: 'Transparent Settlement',
                desc: 'Pay with UPI, QR code, or cash. 90% goes directly to the worker with an official verifiable tax invoice.',
                icon: ShieldCheck
              }
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60 relative space-y-3"
              >
                <span className="text-3xl font-extrabold text-amber-400 font-mono block">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI Features Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-indigo-800/40 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-indigo-800/60">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/20 px-2.5 py-0.5 rounded">
                  Intelligence Layer
                </span>
                <DemoIntegrationBadge status="implemented" label="Live Working Models" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                AI Built for Worker Dignity & Operational Equity
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Apex Union replaces opaque black-box gig algorithms with transparent, human-in-the-loop AI designed to support cooperatives and customers alike.
              </p>
            </div>

            <button
              onClick={() => onNavigate('ai_features')}
              className="px-5 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-colors flex items-center gap-1.5 shrink-0 self-start lg:self-auto cursor-pointer"
            >
              <span>Explore AI Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
                Feature 1
              </span>
              <h3 className="text-base font-bold text-white">Multilingual NLP Understanding</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Interprets natural language queries in English, Telugu, and Hindi to accurately pinpoint required repair categories without jargon.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
                Feature 2
              </span>
              <h3 className="text-base font-bold text-white">Weighted Worker Recommendations</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ranks workers using transparent criteria: Skill match (35%), Distance (20%), Availability (15%), Experience (10%), Rating (10%), Verification (10%).
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
                Feature 3
              </span>
              <h3 className="text-base font-bold text-white">AI Workforce Allocation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Optimizes cooperative dispatch by balancing artisan proximity and fair task rotation to prevent worker burnout and SLA breaches.
              </p>
            </div>

            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
                Feature 4
              </span>
              <h3 className="text-base font-bold text-white">Predictive Demand Insights</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Aggregates neighborhood service request trends to alert cooperative administrators regarding staffing needs for peak morning windows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Statistics (Platform Impact) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">14,200+</span>
            <span className="text-xs text-slate-500 font-medium block mt-1">Completed Bookings</span>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-extrabold text-emerald-700 font-mono">1,850+</span>
            <span className="text-xs text-slate-500 font-medium block mt-1">Verified Union Artisans</span>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-extrabold text-indigo-700 font-mono">18</span>
            <span className="text-xs text-slate-500 font-medium block mt-1">Federated Cooperatives</span>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-3xl font-extrabold text-amber-600 font-mono">99.2%</span>
            <span className="text-xs text-slate-500 font-medium block mt-1">Fair Wage Disbursal Rate</span>
          </div>
        </div>
      </section>

      {/* 6. Cooperative Network Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
            Federated Societies
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Our Participating Labour Cooperatives
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Registered under the State Cooperative Societies Act, democratically owned and operated by workers.
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
                  {workers.filter(w => w.cooperativeId === c.id).length} Artisans
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Testimonials & Verified Reviews */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100 px-2.5 py-1 rounded-md">
              Real Customer Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Verified Feedback from Everyday Citizens
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(rev => (
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

      {/* 8. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden border border-slate-800 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Experience Dignified, Reliable Skilled Services?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Join thousands of households supporting labour cooperatives and receiving verified, honest trade work.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleStartBooking()}
              className="px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Book a Service Now
            </button>
            <button
              onClick={() => onNavigate('tech_stack')}
              className="px-5 py-3 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              View System Architecture
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
