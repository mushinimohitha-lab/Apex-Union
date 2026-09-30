import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Building2,
  Layers,
  ShieldCheck,
  CreditCard,
  AlertTriangle,
  FileText,
  Activity,
  Plus,
  CheckCircle2,
  TrendingUp,
  Settings,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface PlatformAdminDashboardProps {
  onNavigate?: (view: string) => void;
  onBack?: () => void;
  onMove?: () => void;
  prevPageName?: string;
  nextPageName?: string;
}

export const PlatformAdminDashboard: React.FC<PlatformAdminDashboardProps> = ({
  onNavigate,
  onBack,
  onMove,
  prevPageName = 'Previous',
  nextPageName = 'Next'
}) => {
  const {
    cooperatives,
    workers,
    bookings,
    complaints,
    auditLogs,
    serviceCategories,
    resolveComplaint,
    addNewServiceCategory
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'cooperatives'
    | 'services'
    | 'complaints'
    | 'audits'
    | 'integrations'
  >('overview');

  const [newCatName, setNewCatName] = useState('');
  const [newCatPrice, setNewCatPrice] = useState(449);
  const [newCatDesc, setNewCatDesc] = useState('');
  const [showAddCatModal, setShowAddCatModal] = useState(false);

  // Platform metrics
  const totalCooperatives = cooperatives.length;
  const totalWorkers = workers.length;
  const verifiedWorkers = workers.filter(w => w.verificationStatus === 'verified').length;
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(b => b.status === 'COMPLETED').length;
  const totalGMV = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const platformRevenue = Math.round(totalGMV * 0.1);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    addNewServiceCategory({
      name: newCatName,
      basePrice: newCatPrice,
      description: newCatDesc,
      iconName: 'Wrench'
    });
    setShowAddCatModal(false);
    setNewCatName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              Apex Union Federation Board
            </span>
            <DemoIntegrationBadge status="implemented" label="Multi-Cooperative Central" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Platform Administration & Consortium Governance
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Overseeing participating autonomous labour cooperatives, dispute resolutions, and system health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddCatModal(true)}
            className="px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Service Category</span>
          </button>
        </div>
      </div>

      {/* High-level Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Cooperatives</span>
          <span className="text-xl font-bold text-slate-900">{totalCooperatives}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Federated Workers</span>
          <span className="text-xl font-bold text-slate-900">{totalWorkers}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Artisans</span>
          <span className="text-xl font-bold text-emerald-700">{verifiedWorkers}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Bookings</span>
          <span className="text-xl font-bold text-slate-900">{totalBookings}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed</span>
          <span className="text-xl font-bold text-blue-600">{completedBookings}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Demo GMV</span>
          <span className="text-xl font-bold text-slate-900">₹{totalGMV}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Platform Share</span>
          <span className="text-xl font-bold text-emerald-700">₹{platformRevenue}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center overflow-x-auto gap-1 border-b border-slate-200 pb-2 text-xs font-semibold">
        {[
          { key: 'overview', label: '1. Federation Overview' },
          { key: 'cooperatives', label: `2. Participating Cooperatives (${totalCooperatives})` },
          { key: 'services', label: `3. Service Categories (${serviceCategories.length})` },
          { key: 'complaints', label: `4. Complaints & Disputes (${complaints.length})` },
          { key: 'audits', label: '5. Platform Audit Trail' },
          { key: 'integrations', label: '6. Integration Status & Scope Matrix' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Autonomous Cooperative Societies Network
            </h3>
            <div className="space-y-3">
              {cooperatives.map(c => (
                <div
                  key={c.id}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900">{c.name}</h4>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Reg: {c.registrationNumber} · {c.district}, {c.state}
                    </p>
                    <p className="text-[10px] text-slate-600">
                      President: {c.presidentName} · Workers: {workers.filter(w => w.cooperativeId === c.id).length}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 block">{c.rating}★</span>
                    <span className="text-[10px] text-indigo-700 font-medium">
                      {c.commissionRatePercent}% Cap
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Disputes & Grievance Redressal ({complaints.length})
            </h3>
            <div className="space-y-3">
              {complaints.map(c => (
                <div
                  key={c.id}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between text-xs gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{c.subject}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          c.status === 'RESOLVED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{c.description}</p>
                    <p className="text-slate-400 text-[10px]">
                      Customer: {c.customerName} · Booking Ref: {c.bookingId}
                    </p>
                  </div>

                  {c.status !== 'RESOLVED' && (
                    <button
                      onClick={() => resolveComplaint(c.id)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md shrink-0"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Cooperatives Full Directory */}
      {activeTab === 'cooperatives' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Participating Labour Cooperatives Directory
            </h2>
            <p className="text-xs text-slate-500">
              Democratically governed worker cooperatives federated under the Apex Union constitution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cooperatives.map(c => (
              <div
                key={c.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3 text-xs"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {c.rating}★ Rating
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-2">{c.name}</h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Reg No: {c.registrationNumber}
                  </p>
                  <p className="text-slate-600 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 space-y-1 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-500">President:</span>
                    <span className="font-medium text-slate-800">{c.presidentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Commission Cap:</span>
                    <span className="font-semibold text-emerald-700">{c.commissionRatePercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Associated Workers:</span>
                    <span className="font-bold text-slate-900">
                      {workers.filter(w => w.cooperativeId === c.id).length} Active Artisans
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Global Service Categories */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Federation Service Categories & Base Tariffs ({serviceCategories.length})
              </h2>
              <p className="text-xs text-slate-500">
                Configurable trade taxonomy standardizing artisan qualifications across cooperatives.
              </p>
            </div>
            <button
              onClick={() => setShowAddCatModal(true)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceCategories.map(cat => (
              <div
                key={cat.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{cat.name}</h3>
                  <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    ₹{cat.basePrice} base
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{cat.description}</p>
                <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-1">
                  {cat.popularTasks.map(task => (
                    <span
                      key={task}
                      className="text-[10px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded"
                    >
                      {task}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Complaints & Disputes */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Dispute Resolution & Grievance Redressal
            </h2>
            <p className="text-xs text-slate-500">
              Platform-level customer disputes ensuring artisan accountability and transparent restitution.
            </p>
          </div>

          <div className="space-y-3">
            {complaints.map(c => (
              <div
                key={c.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{c.subject}</h4>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        c.status === 'RESOLVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1">{c.description}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Customer: {c.customerName} · Booking Ref: {c.bookingId} · Filed: {c.createdAt}
                  </p>
                </div>

                {c.status !== 'RESOLVED' && (
                  <button
                    onClick={() => resolveComplaint(c.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg self-start sm:self-center"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Platform Audit Trail */}
      {activeTab === 'audits' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Master Federation Audit Trail
            </h2>
            <p className="text-xs text-slate-500">
              System records across all cooperatives, administrative approvals, and booking lifecycle steps.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Operator</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Event Summary</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {auditLogs.map(l => (
                  <tr key={l.id} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">
                      {new Date(l.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-2.5 px-3 font-bold font-mono text-[11px] text-slate-900">
                      {l.action}
                    </td>
                    <td className="py-2.5 px-3">{l.performedBy}</td>
                    <td className="py-2.5 px-3 capitalize text-slate-500">{l.userRole.replace('_', ' ')}</td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-sm truncate">{l.details}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Integration Matrix (Addresses PRD Section 2 & 24) */}
      {activeTab === 'integrations' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Prototype Integration Scope & Credibility Matrix</span>
              <DemoIntegrationBadge status="implemented" label="Audit Ready" />
            </h2>
            <p className="text-xs text-slate-500">
              Clear distinction between implemented working code, domain algorithm demos, and planned cloud services for academic presentation.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Subsystem / Capability</th>
                  <th className="py-3 px-3">Classification</th>
                  <th className="py-3 px-3">Active Prototype Implementation</th>
                  <th className="py-3 px-3">Production Target (Roadmap)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Multilingual Problem Parsing</td>
                  <td className="py-3 px-3"><DemoIntegrationBadge status="implemented" label="Implemented" /></td>
                  <td className="py-3 px-3 text-slate-600">English, Telugu & Hindi domain keyword classifier with confidence calculation</td>
                  <td className="py-3 px-3 text-slate-500">Gemini 2.5 Flash / FastText Multilingual Model</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">AI Worker Recommendation</td>
                  <td className="py-3 px-3"><DemoIntegrationBadge status="implemented" label="Implemented" /></td>
                  <td className="py-3 px-3 text-slate-600">6-factor weighted algorithm (Skill, Distance, Availability, Exp, Rating, Verification)</td>
                  <td className="py-3 px-3 text-slate-500">Scikit-learn Collaborative & Content-Based Filtering</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">AI Workforce Allocation</td>
                  <td className="py-3 px-3"><DemoIntegrationBadge status="implemented" label="Implemented" /></td>
                  <td className="py-3 px-3 text-slate-600">Cooperative workload-balancing dispatch engine with admin override</td>
                  <td className="py-3 px-3 text-slate-500">FastAPI OR-Tools dispatch solver</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Map & Geolocation Tracking</td>
                  <td className="py-3 px-3"><DemoIntegrationBadge status="demo" label="Demo / Mock" /></td>
                  <td className="py-3 px-3 text-slate-600">Interactive SVG Demo Map with Haversine distance and simulated route</td>
                  <td className="py-3 px-3 text-slate-500">Google Maps Platform Geocoding & Routes API</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Document OCR Verification</td>
                  <td className="py-3 px-3"><DemoIntegrationBadge status="demo" label="Demo / Mock" /></td>
                  <td className="py-3 px-3 text-slate-600">Simulated OCR text extraction studio with confidence score & admin sign-off</td>
                  <td className="py-3 px-3 text-slate-500">OpenCV + Tesseract OCR / Google Cloud Vision</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Payment Gateway</td>
                  <td className="py-3 px-3"><DemoIntegrationBadge status="demo" label="Demo / Mock" /></td>
                  <td className="py-3 px-3 text-slate-600">Interactive demo settlement (UPI, QR code, Cash) with 10% fee split</td>
                  <td className="py-3 px-3 text-slate-500">Razorpay / Cashfree Production Webhook Gateway</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">Database & Backend</td>
                  <td className="py-3 px-3"><DemoIntegrationBadge status="planned" label="Planned Integration" /></td>
                  <td className="py-3 px-3 text-slate-600">React local state & localStorage persistence matching relational schema</td>
                  <td className="py-3 px-3 text-slate-500">PostgreSQL + Drizzle ORM + FastAPI Python REST API</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Add New Service Category</h3>
              <button
                onClick={() => setShowAddCatModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  placeholder="e.g. Solar Panel Maintenance"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Base Price (₹)</label>
                <input
                  type="number"
                  required
                  value={newCatPrice}
                  onChange={e => setNewCatPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={newCatDesc}
                  onChange={e => setNewCatDesc(e.target.value)}
                  placeholder="Describe standard scope and required cooperative credentials..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddCatModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
