import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Worker,
  Booking,
  VerificationStatus,
  WorkerAvailability,
  ServiceCategoryKey
} from '../../types';
import {
  Users,
  ShieldCheck,
  Clock,
  Sparkles,
  Building2,
  FileText,
  CreditCard,
  BarChart3,
  Activity,
  Plus,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  Search,
  Filter,
  Eye,
  SlidersHorizontal,
  TrendingUp,
  Percent
} from 'lucide-react';
import { CategoryIcon } from '../common/IconHelper';
import { computeWorkforceAllocation } from '../../services/allocationEngine';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface CooperativeDashboardProps {
  onNavigate?: (view: string) => void;
  onBack?: () => void;
  onMove?: () => void;
  prevPageName?: string;
  nextPageName?: string;
}

export const CooperativeDashboard: React.FC<CooperativeDashboardProps> = ({
  onNavigate,
  onBack,
  onMove,
  prevPageName = 'Customer Portal',
  nextPageName = 'Platform Admin'
}) => {
  const {
    currentUser,
    workers,
    cooperatives,
    bookings,
    reviews,
    auditLogs,
    addWorker,
    updateBookingStatus,
    assignWorkerToBooking,
    setSelectedBooking,
    setSelectedWorker,
    setSelectedDocumentInspection,
    setIsWorkerProfileModalOpen,
    setIsTrackingModalOpen,
    serviceCategories,
    t
  } = useApp();

  // Find active cooperative
  const cooperative = useMemo(() => {
    return cooperatives.find(c => c.id === (currentUser.cooperativeId || 'coop-01')) || cooperatives[0];
  }, [cooperatives, currentUser.cooperativeId]);

  // Cooperative's workers
  const coopWorkers = useMemo(() => {
    return workers.filter(w => w.cooperativeId === cooperative.id);
  }, [workers, cooperative.id]);

  // Cooperative's bookings
  const coopBookings = useMemo(() => {
    return bookings.filter(b => b.cooperativeId === cooperative.id);
  }, [bookings, cooperative.id]);

  // Tabs
  const [activeSection, setActiveSection] = useState<
    | 'overview'
    | 'workers'
    | 'verification'
    | 'bookings'
    | 'ai_allocation'
    | 'utilization'
    | 'analytics'
    | 'audit'
  >('overview');

  // Add Worker Modal State
  const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
  const [newWorkerName, setNewWorkerName] = useState('');
  const [newWorkerPhone, setNewWorkerPhone] = useState('+91 98');
  const [newWorkerCategory, setNewWorkerCategory] = useState<ServiceCategoryKey>('electrical');
  const [newWorkerExp, setNewWorkerExp] = useState<number>(4);
  const [newWorkerSkills, setNewWorkerSkills] = useState('Wiring, MCB Repair');
  const [newWorkerDocTitle, setNewWorkerDocTitle] = useState('ITI Vocational Certificate in Trade');

  // Search & Filter for Workers Table
  const [workerSearch, setWorkerSearch] = useState('');
  const [workerCategoryFilter, setWorkerCategoryFilter] = useState('all');

  // Statistics
  const totalWorkers = coopWorkers.length;
  const verifiedWorkers = coopWorkers.filter(w => w.verificationStatus === 'verified').length;
  const pendingWorkers = coopWorkers.filter(w => w.verificationStatus === 'pending').length;
  const availableWorkers = coopWorkers.filter(w => w.availability === 'available').length;
  const activeJobs = coopBookings.filter(b => b.status === 'ON THE WAY' || b.status === 'IN PROGRESS').length;
  const completedJobs = coopBookings.filter(b => b.status === 'COMPLETED').length;
  const utilizationPercent = Math.min(100, Math.round((activeJobs / Math.max(1, totalWorkers)) * 100));

  // AI Allocation Target Booking
  const unassignedBooking = useMemo(() => {
    return coopBookings.find(b => b.status === 'REQUESTED') || coopBookings[0];
  }, [coopBookings]);

  // Allocation Suggestions
  const allocationSuggestions = useMemo(() => {
    if (!unassignedBooking) return [];
    return computeWorkforceAllocation(unassignedBooking, coopWorkers);
  }, [unassignedBooking, coopWorkers]);

  const handleCreateWorker = (e: React.FormEvent) => {
    e.preventDefault();
    addWorker(
      {
        name: newWorkerName,
        phone: newWorkerPhone,
        serviceCategory: newWorkerCategory,
        experienceYears: newWorkerExp,
        skills: newWorkerSkills.split(',').map(s => s.trim()),
        cooperativeId: cooperative.id,
        cooperativeName: cooperative.name,
        hourlyRate: serviceCategories.find(c => c.id === newWorkerCategory)?.basePrice || 399
      },
      newWorkerDocTitle
    );
    setShowAddWorkerModal(false);
    setNewWorkerName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* In-Page Navigation Bar (Back & Move Arrows) */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer group"
          title={`Go back to ${prevPageName}`}
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
          <span className="hidden sm:inline text-slate-500 font-normal">({prevPageName})</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-950 bg-indigo-100 border border-indigo-300 px-2.5 py-1 rounded-md">
            Cooperative Admin Portal
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <button
            onClick={() => onNavigate && onNavigate('customer_dashboard')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-colors cursor-pointer"
            title="Switch to Customer Portal"
          >
            <Users className="w-3.5 h-3.5 text-amber-600" />
            <span>Switch to Customer Portal</span>
          </button>
        </div>

        <button
          onClick={onMove}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer group shadow-2xs"
          title={`Move forward to ${nextPageName}`}
        >
          <span>Move</span>
          <span className="hidden sm:inline font-semibold">({nextPageName})</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Cooperative Header & Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
              {t('coop.title')}
            </span>
            <DemoIntegrationBadge status="demo" label="Cooperative Workspace" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {cooperative.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Registration: <span className="font-mono text-slate-700">{cooperative.registrationNumber}</span> · President: {cooperative.presidentName} · Commission Cap: {cooperative.commissionRatePercent}%
          </p>
        </div>

        <button
          onClick={() => setShowAddWorkerModal(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>{t('coop.add_worker')}</span>
        </button>
      </div>

      {/* KPI Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Workers</span>
          <span className="text-xl font-bold text-slate-900">{totalWorkers}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified</span>
          <span className="text-xl font-bold text-emerald-700">{verifiedWorkers}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Pending OCR</span>
          <span className="text-xl font-bold text-amber-600">{pendingWorkers}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Available</span>
          <span className="text-xl font-bold text-blue-600">{availableWorkers}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Jobs</span>
          <span className="text-xl font-bold text-indigo-700">{activeJobs}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed</span>
          <span className="text-xl font-bold text-slate-900">{completedJobs}</span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-center col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Utilization</span>
          <span className="text-xl font-bold text-slate-900">{utilizationPercent}%</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center overflow-x-auto gap-1 border-b border-slate-200 pb-2 text-xs font-semibold scrollbar-none">
        {[
          { key: 'overview', label: '1. Overview' },
          { key: 'workers', label: `2. Workers Directory (${totalWorkers})` },
          { key: 'verification', label: `3. Document Verification (${pendingWorkers})` },
          { key: 'ai_allocation', label: '4. AI Workforce Allocation' },
          { key: 'bookings', label: `5. Bookings (${coopBookings.length})` },
          { key: 'utilization', label: '6. Utilization Radar' },
          { key: 'analytics', label: '7. Demand Analytics & AI Insights' },
          { key: 'audit', label: '8. Activity & Audit Logs' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key as any)}
            className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeSection === tab.key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section 1: Overview */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* AI Workforce Recommendation Banner */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  AI Workforce Allocation Engine Ready
                </span>
              </div>
              <h3 className="text-base font-bold">
                {unassignedBooking ? `Request #${unassignedBooking.id} (${unassignedBooking.serviceCategory}) is awaiting optimal artisan dispatch` : 'All incoming service requests currently allocated'}
              </h3>
              <p className="text-xs text-slate-300">
                Algorithm balances artisan proximity, trade certification, workload equity, and live availability.
              </p>
            </div>
            <button
              onClick={() => setActiveSection('ai_allocation')}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <span>Open AI Allocation Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Verifications Alert */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Pending Document Verifications ({pendingWorkers})</span>
                </h3>
                <button
                  onClick={() => setActiveSection('verification')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View All
                </button>
              </div>

              {pendingWorkers === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">
                  All worker documents have been audited and verified.
                </p>
              ) : (
                <div className="space-y-2">
                  {coopWorkers
                    .filter(w => w.verificationStatus === 'pending')
                    .map(w => (
                      <div
                        key={w.id}
                        className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={w.avatarUrl}
                            alt={w.name}
                            className="w-9 h-9 rounded-lg object-cover ring-1 ring-amber-300"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900">{w.name}</p>
                            <p className="text-[11px] text-slate-500 capitalize">
                              {w.serviceCategory} · {w.documents.length} Document(s) Uploaded
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedDocumentInspection({
                              worker: w,
                              document: w.documents[0]
                            });
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs"
                        >
                          Audit OCR
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Recent Cooperative Bookings */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Incoming Cooperative Service Queue</span>
                </h3>
                <button
                  onClick={() => setActiveSection('bookings')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View Queue
                </button>
              </div>

              <div className="space-y-2">
                {coopBookings.slice(0, 3).map(b => (
                  <div
                    key={b.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        #{b.id} · {b.customerName}
                      </p>
                      <p className="text-[11px] text-slate-500 capitalize">
                        {b.serviceCategory} · Assigned: {b.workerName}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 capitalize">
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Workers Management Directory */}
      {activeSection === 'workers' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Cooperative Workforce Directory ({coopWorkers.length})
              </h2>
              <p className="text-xs text-slate-500">
                Manage union members, verify trade certifications, and review field workload.
              </p>
            </div>
            <button
              onClick={() => setShowAddWorkerModal(true)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Worker</span>
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={workerSearch}
                onChange={e => setWorkerSearch(e.target.value)}
                placeholder="Search worker by name or skills..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <select
              value={workerCategoryFilter}
              onChange={e => setWorkerCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            >
              <option value="all">All Service Categories</option>
              {serviceCategories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Workers Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Worker Name</th>
                  <th className="py-3 px-3">Service</th>
                  <th className="py-3 px-3">Experience</th>
                  <th className="py-3 px-3">Rating</th>
                  <th className="py-3 px-3">Availability</th>
                  <th className="py-3 px-3">Verification</th>
                  <th className="py-3 px-3">Workload</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {coopWorkers
                  .filter(w => {
                    if (workerCategoryFilter !== 'all' && w.serviceCategory !== workerCategoryFilter)
                      return false;
                    if (workerSearch) {
                      const q = workerSearch.toLowerCase();
                      const matchN = w.name.toLowerCase().includes(q);
                      const matchS = w.skills.some(s => s.toLowerCase().includes(q));
                      if (!matchN && !matchS) return false;
                    }
                    return true;
                  })
                  .map(w => (
                    <tr key={w.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={w.avatarUrl}
                            alt={w.name}
                            className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{w.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{w.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 capitalize font-medium">{w.serviceCategory.replace('_', ' ')}</td>
                      <td className="py-3 px-3">{w.experienceYears} Years</td>
                      <td className="py-3 px-3 font-semibold text-slate-900">{w.rating}★ ({w.reviewCount})</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-semibold rounded-full capitalize ${
                            w.availability === 'available'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {w.availability}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-semibold rounded-full capitalize ${
                            w.verificationStatus === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {w.verificationStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-medium">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            w.currentWorkload === 0
                              ? 'bg-emerald-50 text-emerald-700 font-semibold'
                              : w.currentWorkload <= 2
                              ? 'bg-blue-50 text-blue-700 font-semibold'
                              : 'bg-rose-50 text-rose-700 font-semibold'
                          }`}
                        >
                          {w.currentWorkload} Active Task(s)
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedWorker(w);
                            setIsWorkerProfileModalOpen(true);
                          }}
                          className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs"
                        >
                          View / Edit
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section 3: Worker Verification & Document Processing */}
      {activeSection === 'verification' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Worker Document Verification & OCR Studio
                </h2>
                <DemoIntegrationBadge status="demo" label="OCR Pipeline Prototype" />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Audit uploaded trade certificates, apprenticeship IDs, and competency credentials.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900">
              {pendingWorkers} Requiring Board Approval
            </span>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Document processing assistance — final verification is performed by the authorized cooperative/admin workflow. Simulated OCR models extract trade category, candidate name, and issue dates for admin convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coopWorkers.flatMap(w =>
              w.documents.map(doc => (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                        <p className="text-[11px] text-slate-500">
                          Worker: <span className="font-semibold text-slate-800">{w.name}</span>
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {doc.fileName} · Uploaded: {doc.uploadDate}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                        doc.status === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : doc.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>

                  {/* OCR snippet */}
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 font-mono text-[10px] text-slate-600 line-clamp-2">
                    {doc.ocrExtractedText || 'No text extracted.'}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-emerald-700 font-medium">
                      OCR Confidence: {((doc.ocrConfidence || 0.95) * 100).toFixed(0)}%
                    </span>
                    <button
                      onClick={() => {
                        setSelectedDocumentInspection({
                          worker: w,
                          document: doc
                        });
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect & Approve</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Section 4: AI Workforce Allocation */}
      {activeSection === 'ai_allocation' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  Core AI Feature #2
                </span>
                <DemoIntegrationBadge status="implemented" label="Multi-Factor Optimization" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                AI Workforce Allocation Assistant
              </h2>
              <p className="text-xs text-slate-500">
                Calculates optimal worker assignment for incoming booking requests based on proximity, trade license, availability, and equitable workload distribution.
              </p>
            </div>
            <div className="text-xs bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700 font-medium self-start sm:self-auto">
              Administrator retains final authorization override
            </div>
          </div>

          {/* Active Request Showcase */}
          {unassignedBooking ? (
            <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-md space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-800 gap-2">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                    INCOMING SERVICE REQUEST TO BE ALLOCATED
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    Booking #{unassignedBooking.id} · {unassignedBooking.serviceCategory.replace('_', ' ').toUpperCase()}
                  </h3>
                </div>
                <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded-md font-mono self-start sm:self-auto">
                  Status: {unassignedBooking.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[11px]">Customer & Contact:</span>
                  <span className="font-semibold text-white">{unassignedBooking.customerName}</span> ({unassignedBooking.customerPhone})
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Job Location:</span>
                  <span className="font-semibold text-white">{unassignedBooking.customerAddress}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Problem Overview:</span>
                  <span className="text-white italic">"{unassignedBooking.problemDescription}"</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
              No pending service requests in queue.
            </div>
          )}

          {/* AI Ranked Worker Suggestions */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              AI Suggested Worker Matches Ranked by Operational Fit
            </h3>

            <div className="space-y-3">
              {allocationSuggestions.slice(0, 3).map((sug, idx) => {
                const isTopPick = idx === 0;
                return (
                  <div
                    key={sug.worker.id}
                    className={`rounded-2xl p-4 border transition-all ${
                      isTopPick
                        ? 'border-amber-400 ring-2 ring-amber-100 bg-amber-50/30'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={sug.worker.avatarUrl}
                          alt={sug.worker.name}
                          className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">{sug.worker.name}</h4>
                            {isTopPick && (
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                                AI Top Recommendation
                              </span>
                            )}
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              Score: {sug.score}/100
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 capitalize">
                            {sug.worker.serviceCategory} · {sug.worker.experienceYears} Yrs Exp · {sug.worker.rating}★ Rating
                          </p>
                          <p className="text-[11px] text-slate-600">
                            Current Active Tasks: <strong className="text-slate-900">{sug.currentWorkload}</strong> · Proximity: ~{sug.distanceKm} km
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            setSelectedWorker(sug.worker);
                            setIsWorkerProfileModalOpen(true);
                          }}
                          className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg"
                        >
                          Inspect Profile
                        </button>
                        <button
                          onClick={() => {
                            if (unassignedBooking) {
                              assignWorkerToBooking(
                                unassignedBooking.id,
                                sug.worker.id,
                                `Allocated via AI Workforce Engine (Score: ${sug.score}/100)`
                              );
                            }
                          }}
                          className={`px-4 py-2 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors ${
                            isTopPick
                              ? 'bg-slate-900 hover:bg-slate-800 text-white'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept & Dispatch</span>
                        </button>
                      </div>
                    </div>

                    {/* Rationale factors */}
                    <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-wrap gap-2 text-xs">
                      {sug.reasons.map((r, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px] flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{r}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Section 5: Bookings Queue */}
      {activeSection === 'bookings' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Cooperative Bookings Master Log ({coopBookings.length})
              </h2>
              <p className="text-xs text-slate-500">
                Monitor live assignments, worker tracking states, and payment clearances.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {coopBookings.map(b => (
              <div
                key={b.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      Booking #{b.id} ({b.serviceCategory.toUpperCase()})
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 capitalize">
                      {b.status}
                    </span>
                  </div>
                  <p className="text-slate-600">
                    Customer: <span className="font-semibold">{b.customerName}</span> · Worker: <span className="font-semibold">{b.workerName}</span>
                  </p>
                  <p className="text-slate-500">{b.problemDescription}</p>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <div className="text-right mr-2">
                    <span className="font-bold text-slate-900 block">₹{b.totalAmount}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold uppercase">
                      {b.paymentStatus}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBooking(b);
                      setIsTrackingModalOpen(true);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs"
                  >
                    Track Lifecycle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 6: Utilization Radar */}
      {activeSection === 'utilization' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Workforce Utilization & Roster Availability
            </h2>
            <p className="text-xs text-slate-500">
              Real-time snapshot of active vs. on-service artisans across cooperative trades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
              <span className="text-xs font-bold uppercase text-emerald-800 block">Available (Ready)</span>
              <span className="text-2xl font-bold text-emerald-700">{availableWorkers}</span>
              <span className="text-[10px] text-emerald-600 block mt-1">Ready for on-demand dispatch</span>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
              <span className="text-xs font-bold uppercase text-blue-800 block">On Transit / Way</span>
              <span className="text-2xl font-bold text-blue-700">
                {coopBookings.filter(b => b.status === 'ON THE WAY').length}
              </span>
              <span className="text-[10px] text-blue-600 block mt-1">En route with toolkits</span>
            </div>
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 text-center">
              <span className="text-xs font-bold uppercase text-indigo-800 block">Actively Executing</span>
              <span className="text-2xl font-bold text-indigo-700">
                {coopBookings.filter(b => b.status === 'IN PROGRESS').length}
              </span>
              <span className="text-[10px] text-indigo-600 block mt-1">Service underway</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs font-bold uppercase text-slate-600 block">Off-Duty / Standby</span>
              <span className="text-2xl font-bold text-slate-700">
                {coopWorkers.filter(w => w.availability === 'off_duty').length}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Shift rotation standby</span>
            </div>
          </div>

          {/* Trade Category Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Artisans by Trade Discipline
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
              {['plumbing', 'electrical', 'carpentry', 'ac_service', 'gardening'].map(cat => {
                const count = coopWorkers.filter(w => w.serviceCategory === cat).length;
                return (
                  <div key={cat} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="capitalize font-semibold text-slate-800">{cat.replace('_', ' ')}</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-bold text-slate-900">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Section 7: Demand Analytics & AI Insights */}
      {activeSection === 'analytics' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Demand Analytics & Predictive Workforce Planning
                </h2>
                <DemoIntegrationBadge status="demo" label="AI Demand Insight Model" />
              </div>
              <p className="text-xs text-slate-500">
                Service trends, booking frequency, and automated workforce scheduling alerts.
              </p>
            </div>
          </div>

          {/* AI Demand Insight Callout Card */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="font-bold text-amber-950 uppercase tracking-wider text-[11px]">
                AI Demand Insight Advisory
              </span>
            </div>
            <p className="text-amber-900 leading-relaxed font-medium">
              “Plumbing and Electrical service requests have shown a 28% increase across Hyderabad Central during weekend mornings (09:00 AM – 12:00 PM). The cooperative administration should consider mobilizing 2 additional certified plumbers on standby to maintain sub-20 minute dispatch SLAs.”
            </p>
            <p className="text-[11px] text-amber-700 italic">
              Notice: This is a prototype predictive advisory generated from rolling demand histograms.
            </p>
          </div>

          {/* Trade Demand Bars */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Weekly Service Request Volume by Trade
            </h3>

            {[
              { trade: 'Plumbing', volume: 64, trend: '+18% (High Demand)', color: 'bg-blue-600' },
              { trade: 'Electrical', volume: 52, trend: '+12% (Medium-High)', color: 'bg-amber-500' },
              { trade: 'AC Service', volume: 44, trend: '+22% (Increasing Seasonal)', color: 'bg-cyan-500' },
              { trade: 'Carpentry', volume: 28, trend: 'Stable (Medium)', color: 'bg-emerald-600' },
              { trade: 'Gardening & Cleaning', volume: 20, trend: 'Normal', color: 'bg-purple-600' }
            ].map(item => (
              <div key={item.trade} className="space-y-1 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-800 font-semibold">{item.trade}</span>
                  <span className="text-slate-500">{item.volume} Requests · <strong className="text-slate-800">{item.trend}</strong></span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`${item.color} h-2.5 rounded-full transition-all`}
                    style={{ width: `${(item.volume / 70) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 8: Audit & Activity Records */}
      {activeSection === 'audit' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Cooperative Audit & Administrative Activity Records
            </h2>
            <p className="text-xs text-slate-500">
              Immutable digital ledger of approvals, worker dispatches, and verification decisions.
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
                  <th className="py-2.5 px-3">Details</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-900 font-mono text-[11px]">
                      {log.action}
                    </td>
                    <td className="py-2.5 px-3">{log.performedBy}</td>
                    <td className="py-2.5 px-3 capitalize text-slate-500">{log.userRole.replace('_', ' ')}</td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate">{log.details}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Worker Modal */}
      {showAddWorkerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-6">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
                  Union Membership
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Register New Skilled Artisan
                </h3>
              </div>
              <button
                onClick={() => setShowAddWorkerModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateWorker} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newWorkerName}
                  onChange={e => setNewWorkerName(e.target.value)}
                  placeholder="e.g. Balakrishna Yadav"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={newWorkerPhone}
                    onChange={e => setNewWorkerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    required
                    value={newWorkerExp}
                    onChange={e => setNewWorkerExp(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Trade Category</label>
                <select
                  value={newWorkerCategory}
                  onChange={e => setNewWorkerCategory(e.target.value as ServiceCategoryKey)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                >
                  {serviceCategories.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} (Base Rate: ₹{c.basePrice})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Key Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={newWorkerSkills}
                  onChange={e => setNewWorkerSkills(e.target.value)}
                  placeholder="e.g. Circuit rewiring, MCB repair, Inverter setup"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Initial Document / Certificate Title
                </label>
                <input
                  type="text"
                  value={newWorkerDocTitle}
                  onChange={e => setNewWorkerDocTitle(e.target.value)}
                  placeholder="e.g. ITI Trade Certificate / Apprenticeship Card"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddWorkerModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm"
                >
                  Add Worker to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
