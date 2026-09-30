import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Worker,
  Booking,
  BookingStatus,
  WorkerAvailability,
  ServiceCategoryKey
} from '../../types';
import {
  Wrench,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Phone,
  Navigation,
  ArrowRight,
  ArrowLeft,
  Home,
  UserCheck,
  Star,
  Calendar,
  CreditCard,
  Building2,
  Users,
  Award,
  Radio,
  FileCheck,
  KeyRound,
  Check,
  AlertCircle,
  Eye,
  Camera
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface WorkerDashboardProps {
  onNavigate?: (view: string) => void;
  onBack?: () => void;
  onMove?: () => void;
  prevPageName?: string;
  nextPageName?: string;
}

export const WorkerDashboard: React.FC<WorkerDashboardProps> = ({
  onNavigate,
  onBack,
  onMove,
  prevPageName = 'Customer Portal',
  nextPageName = 'Cooperative Admin'
}) => {
  const {
    currentUser,
    workers,
    bookings,
    updateBookingStatus,
    updateWorkerAvailability,
    setSelectedBooking,
    setIsTrackingModalOpen,
    t
  } = useApp();

  // Find active worker persona or default to Suresh Varma (wrk-01)
  const [activeWorkerId, setActiveWorkerId] = useState<string>(() => {
    if (currentUser.role === 'cooperative_worker' && currentUser.id.startsWith('wrk-')) {
      return currentUser.id;
    }
    return 'wrk-01';
  });

  const worker = useMemo(() => {
    return workers.find(w => w.id === activeWorkerId) || workers[0];
  }, [workers, activeWorkerId]);

  // Active worker's bookings
  const workerBookings = useMemo(() => {
    return bookings.filter(b => b.workerId === worker.id);
  }, [bookings, worker.id]);

  const activeJob = useMemo(() => {
    return workerBookings.find(
      b => b.status === 'ACCEPTED' || b.status === 'ON THE WAY' || b.status === 'IN PROGRESS'
    );
  }, [workerBookings]);

  const incomingRequests = useMemo(() => {
    return workerBookings.filter(b => b.status === 'REQUESTED');
  }, [workerBookings]);

  const completedJobs = useMemo(() => {
    return workerBookings.filter(b => b.status === 'COMPLETED');
  }, [workerBookings]);

  // Tab State
  const [activeTab, setActiveTab] = useState<'current_job' | 'incoming' | 'history' | 'skills_assessment' | 'earnings'>('current_job');

  // OTP Verification state for Start / Completion
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSuccessMessage, setOtpSuccessMessage] = useState('');
  const [sosActive, setSosActive] = useState(false);

  // Financial calculations
  const totalEarnings = useMemo(() => {
    return completedJobs.reduce((sum, b) => sum + (b.workerPayout || b.totalAmount * 0.88), 0);
  }, [completedJobs]);

  const cooperativeDividendFund = useMemo(() => {
    return Math.round(totalEarnings * 0.08);
  }, [totalEarnings]);

  const handleAvailabilityChange = (newStatus: WorkerAvailability) => {
    updateWorkerAvailability(worker.id, newStatus);
  };

  const handleAcceptJob = (bookingId: string) => {
    updateBookingStatus(bookingId, 'ACCEPTED', 'Worker accepted the job dispatch.');
    setActiveTab('current_job');
  };

  const handleRejectJob = (bookingId: string) => {
    updateBookingStatus(bookingId, 'CANCELLED', 'Worker declined due to immediate route congestion.');
  };

  const handleStartTrip = (bookingId: string) => {
    updateBookingStatus(bookingId, 'ON THE WAY', 'Worker is en route to customer location.');
  };

  const handleVerifyStartOtp = (booking: Booking) => {
    const validOtp = booking.startOtp || '1234';
    if (enteredOtp.trim() === validOtp || enteredOtp.trim() === '1234') {
      updateBookingStatus(booking.id, 'IN PROGRESS', 'Customer OTP verified on arrival. Job started.');
      setOtpSuccessMessage('Start OTP Verified Successfully! Job is now In Progress.');
      setOtpError('');
      setEnteredOtp('');
      setTimeout(() => setOtpSuccessMessage(''), 4000);
    } else {
      setOtpError(`Invalid Start OTP. (Demo Hint: Use "${validOtp}")`);
    }
  };

  const handleVerifyCompletionOtp = (booking: Booking) => {
    const validOtp = booking.completionOtp || '5678';
    if (enteredOtp.trim() === validOtp || enteredOtp.trim() === '5678') {
      updateBookingStatus(booking.id, 'COMPLETED', 'Customer verified completion OTP. Payout recorded.');
      setOtpSuccessMessage('Completion OTP Verified! Job marked completed & ₹' + (booking.workerPayout || 350) + ' added to earnings.');
      setOtpError('');
      setEnteredOtp('');
      setTimeout(() => setOtpSuccessMessage(''), 4000);
    } else {
      setOtpError(`Invalid Completion OTP. (Demo Hint: Use "${validOtp}")`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Worker Persona Switcher & Live Shift Status Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Worker Info Card */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={worker.avatarUrl}
                alt={worker.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-amber-400/80 shadow-md"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                  worker.availability === 'available'
                    ? 'bg-emerald-500'
                    : worker.availability === 'on_service'
                    ? 'bg-blue-500 animate-pulse'
                    : 'bg-slate-500'
                }`}
                title={`Status: ${worker.availability}`}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white">{worker.name}</h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{worker.tradeBadge || 'Union Verified Artisan'}</span>
                </span>
                <DemoIntegrationBadge status="demo" label="Cooperative Worker App" />
              </div>

              <p className="text-xs text-slate-300 mt-1 flex items-center gap-2 flex-wrap">
                <span className="capitalize font-semibold text-amber-400">
                  {t(`cat.${worker.serviceCategory}`, worker.serviceCategory.replace('_', ' '))}
                </span>
                <span>•</span>
                <span>{worker.cooperativeName}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{worker.rating.toFixed(2)}</span>
                  <span className="text-slate-400 text-[10px]">({worker.reviewCount} reviews)</span>
                </span>
              </p>

              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Base Sector: {worker.location.neighborhood}, {worker.location.city}</span>
              </p>
            </div>
          </div>

          {/* Right Controls: Availability Toggle, Worker Switcher, Emergency SOS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Worker Persona Switcher (For Demo Panel evaluation) */}
            <div className="bg-slate-800/80 border border-slate-700 p-2 rounded-xl">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Simulated Worker Persona:
              </label>
              <select
                value={activeWorkerId}
                onChange={e => setActiveWorkerId(e.target.value)}
                className="w-full bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg border border-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
              >
                {workers.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.name} — {w.serviceCategory.toUpperCase()} ({w.cooperativeName.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Shift Availability Toggle */}
            <div className="bg-slate-800/80 border border-slate-700 p-2 rounded-xl">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Shift Availability:
              </span>
              <div className="flex items-center gap-1">
                {(['available', 'busy', 'off_duty'] as WorkerAvailability[]).map(st => (
                  <button
                    key={st}
                    onClick={() => handleAvailabilityChange(st)}
                    className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-all capitalize cursor-pointer ${
                      worker.availability === st
                        ? st === 'available'
                          ? 'bg-emerald-500 text-white font-bold'
                          : st === 'busy'
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-rose-600 text-white font-bold'
                        : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency SOS Worker Union Button */}
            <button
              onClick={() => setSosActive(!sosActive)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                sosActive
                  ? 'bg-rose-600 text-white ring-4 ring-rose-400 animate-pulse'
                  : 'bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-700/60'
              }`}
              title="Emergency Union Support Desk"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{sosActive ? 'SOS Active (Desk Notified)' : 'Union SOS'}</span>
            </button>
          </div>
        </div>

        {/* SOS Alert Notification if triggered */}
        {sosActive && (
          <div className="mt-4 p-3 bg-rose-950/90 border border-rose-500/80 rounded-xl text-xs text-rose-100 flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>Cooperative Safety Desk Contacted:</strong> Dispatcher & Union Steward notified of emergency alert with live GPS coordinates.
              </span>
            </div>
            <button
              onClick={() => setSosActive(false)}
              className="text-[11px] underline text-rose-300 hover:text-white"
            >
              Cancel SOS
            </button>
          </div>
        )}

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-700/80">
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Completed</span>
            <span className="text-xl font-bold text-white mt-0.5 block">{worker.completedJobsCount} Jobs</span>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Hourly Base Tariff</span>
            <span className="text-xl font-bold text-amber-400 mt-0.5 block">₹{worker.hourlyRate}/hr</span>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Payout Recorded</span>
            <span className="text-xl font-bold text-emerald-400 mt-0.5 block">₹{totalEarnings}</span>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Coop Welfare Share (8%)</span>
            <span className="text-xl font-bold text-indigo-300 mt-0.5 block">₹{cooperativeDividendFund}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('current_job')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'current_job'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Active Assignment {activeJob ? '(1)' : '(0)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('incoming')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer relative ${
            activeTab === 'incoming'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Radio className="w-4 h-4 text-blue-400" />
          <span>Incoming Requests ({incomingRequests.length})</span>
          {incomingRequests.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute top-2 right-2" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('skills_assessment')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'skills_assessment'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Practical Skill Assessment & Guild Verification</span>
        </button>

        <button
          onClick={() => setActiveTab('earnings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'earnings'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4 text-indigo-400" />
          <span>Transparent Earnings & Patronage Dividend</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'history'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Job History & Ratings ({completedJobs.length})</span>
        </button>
      </div>

      {/* TAB CONTENT 1: CURRENT ACTIVE ASSIGNMENT & OTP WORKFLOW */}
      {activeTab === 'current_job' && (
        <div className="space-y-4">
          {otpSuccessMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{otpSuccessMessage}</span>
            </div>
          )}

          {otpError && (
            <div className="p-3.5 bg-rose-50 border border-rose-300 text-rose-900 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{otpError}</span>
            </div>
          )}

          {activeJob ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                      Booking #{activeJob.id}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        activeJob.status === 'IN PROGRESS'
                          ? 'bg-indigo-600 text-white animate-pulse'
                          : activeJob.status === 'ON THE WAY'
                          ? 'bg-blue-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {activeJob.status}
                    </span>
                    {activeJob.priority === 'emergency' && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                        EMERGENCY
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    {activeJob.problemDescription}
                  </h2>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Payout</span>
                  <span className="text-xl font-black text-emerald-700">₹{activeJob.workerPayout || Math.round(activeJob.totalAmount * 0.88)}</span>
                  <span className="text-[10px] text-slate-500 block">88% Direct Union Tariff</span>
                </div>
              </div>

              {/* Problem Photo / Captured Image Preview if present */}
              {activeJob.problemImage && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={activeJob.problemImage}
                    alt="Customer Uploaded Problem"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover ring-1 ring-slate-300 shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1 w-fit">
                      <Camera className="w-3 h-3 text-amber-600" />
                      <span>Customer Uploaded Photo</span>
                    </span>
                    <p className="text-xs font-bold text-slate-900">
                      AI Detected Issue: {activeJob.detectedIssue || 'Pipe Joint / Mechanical Defect'}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Visual inspection indicates high risk. Ensure safety shutoff stopcock before dismantling fixture.
                    </p>
                  </div>
                </div>
              )}

              {/* Customer Details & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Customer Information</span>
                  <p className="text-sm font-bold text-slate-900">{activeJob.customerName}</p>
                  <p className="text-xs text-slate-600 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeJob.customerPhone}</span>
                  </p>
                  <p className="text-xs text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{activeJob.customerAddress} ({activeJob.distanceKm} km away)</span>
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Service Schedule & Guarantee</span>
                  <p className="text-xs text-slate-700">
                    <strong className="text-slate-900">Slot:</strong> {activeJob.scheduledDate} at {activeJob.scheduledTime}
                  </p>
                  <p className="text-xs text-slate-700">
                    <strong className="text-slate-900">Cooperative Guarantee:</strong> 30-Day Union Craft Guarantee with Free Re-visit.
                  </p>
                  <p className="text-xs text-slate-700">
                    <strong className="text-slate-900">Safety Compliance:</strong> Trade insurance & accidental indemnity active under Apex Cooperative pool.
                  </p>
                </div>
              </div>

              {/* PROGRESS & OTP ACTIONS SECTION */}
              <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-indigo-600" />
                    <span>Secure Lifecycle & Customer OTP Verification</span>
                  </h3>
                  <span className="text-[11px] text-indigo-700 font-semibold bg-indigo-100 px-2 py-0.5 rounded">
                    Current: {activeJob.status}
                  </span>
                </div>

                {/* Step 1: ACCEPTED -> START TRIP */}
                {activeJob.status === 'ACCEPTED' && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-lg border border-indigo-200">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Step 1: Start Trip to Customer Location</p>
                      <p className="text-[11px] text-slate-500">Customer will see your live transit on their map tracking view.</p>
                    </div>
                    <button
                      onClick={() => handleStartTrip(activeJob.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Start Trip (On The Way)</span>
                    </button>
                  </div>
                )}

                {/* Step 2: ON THE WAY -> ARRIVE & VERIFY START OTP */}
                {activeJob.status === 'ON THE WAY' && (
                  <div className="space-y-3 p-4 bg-white rounded-lg border border-blue-200">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold text-slate-900">Step 2: Arrive at Location & Enter Customer Start OTP</p>
                        <p className="text-[11px] text-slate-500">
                          Ask customer for the 4-digit Start OTP shown on their screen to start the job timer.
                        </p>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                        Demo OTP: {activeJob.startOtp || '4829'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 max-w-sm">
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="Enter 4-Digit OTP"
                        value={enteredOtp}
                        onChange={e => setEnteredOtp(e.target.value)}
                        className="px-3 py-2 text-sm font-mono tracking-widest text-center border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                      />
                      <button
                        onClick={() => handleVerifyStartOtp(activeJob)}
                        className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm cursor-pointer whitespace-nowrap"
                      >
                        Verify & Start Job
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: IN PROGRESS -> COMPLETE JOB WITH COMPLETION OTP */}
                {activeJob.status === 'IN PROGRESS' && (
                  <div className="space-y-3 p-4 bg-white rounded-lg border border-emerald-200">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold text-slate-900">Step 3: Complete Work & Enter Completion OTP</p>
                        <p className="text-[11px] text-slate-500">
                          Inspect tools, test water/power line, clean workspace, and enter customer completion OTP.
                        </p>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        Demo Completion OTP: {activeJob.completionOtp || '7163'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 max-w-sm">
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="Enter 4-Digit OTP"
                        value={enteredOtp}
                        onChange={e => setEnteredOtp(e.target.value)}
                        className="px-3 py-2 text-sm font-mono tracking-widest text-center border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                      />
                      <button
                        onClick={() => handleVerifyCompletionOtp(activeJob)}
                        className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm cursor-pointer whitespace-nowrap"
                      >
                        Verify OTP & Complete Job
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No Job Currently In Progress</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                You are currently available on the cooperative queue. Check the Incoming Requests tab or wait for the fair algorithm dispatch.
              </p>
              {incomingRequests.length > 0 && (
                <button
                  onClick={() => setActiveTab('incoming')}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm cursor-pointer"
                >
                  View {incomingRequests.length} Incoming Request{incomingRequests.length > 1 ? 's' : ''}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: INCOMING JOB REQUESTS */}
      {activeTab === 'incoming' && (
        <div className="space-y-3">
          {incomingRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-2">
              <p className="text-sm font-bold text-slate-900">No Pending Job Requests</p>
              <p className="text-xs text-slate-500">
                Incoming dispatches from customers who book verified cooperative artisans will appear here with sound notification.
              </p>
            </div>
          ) : (
            incomingRequests.map(req => (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                      Request #{req.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 capitalize">
                      {req.serviceCategory.replace('_', ' ')}
                    </span>
                    {req.priority === 'emergency' && (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded border border-rose-300 animate-pulse">
                        EMERGENCY
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{req.problemDescription}</h3>
                  <p className="text-xs text-slate-600 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{req.customerAddress} ({req.distanceKm} km away)</span>
                    <span>•</span>
                    <span>Scheduled: {req.scheduledDate} {req.scheduledTime}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right mr-2">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Direct Payout</span>
                    <span className="text-lg font-black text-emerald-700">₹{req.workerPayout || Math.round(req.totalAmount * 0.88)}</span>
                  </div>
                  <button
                    onClick={() => handleRejectJob(req.id)}
                    className="px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl cursor-pointer"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleAcceptJob(req.id)}
                    className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm cursor-pointer"
                  >
                    Accept Job
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB CONTENT 3: PRACTICAL SKILL ASSESSMENT & GUILD ACCREDITATION */}
      {activeTab === 'skills_assessment' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Inclusive Artisan Accreditation
                </span>
                <span className="text-xs text-slate-500 font-medium">No Degree Prerequisite Required</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Practical Hands-On Skill Assessment Record
              </h2>
              <p className="text-xs text-slate-500">
                Workers who do not possess formal educational degrees undergo rigorous on-site trade assessments evaluated by Master Craftsmen.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-600 text-white flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Verified Master Artisan</span>
              </span>
            </div>
          </div>

          {/* Assessment Breakdown */}
          {worker.practicalAssessment ? (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">Evaluation Score</span>
                    <p className="text-3xl font-black text-emerald-700">{worker.practicalAssessment.score} / 100</p>
                    <p className="text-xs text-emerald-900 font-semibold mt-1">
                      Evaluated by: {worker.practicalAssessment.evaluatedBy}
                    </p>
                    <p className="text-[11px] text-emerald-700">Date: {worker.practicalAssessment.evaluationDate}</p>
                  </div>
                  <div className="max-w-md bg-white p-3 rounded-lg border border-emerald-200 text-xs text-slate-700">
                    <strong className="text-slate-900 block mb-1">Inspector Notes:</strong>
                    {worker.practicalAssessment.notes}
                  </div>
                </div>
              </div>

              {/* Rubrics Grid */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Practical Evaluation Rubrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block">Safety Protocol</span>
                    <span className="text-lg font-black text-slate-900 mt-1 block">
                      {worker.practicalAssessment.rubrics.safetyProtocol}%
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">MCB isolation, PPE gloves, stopcock pressure seal</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block">Tool Handling</span>
                    <span className="text-lg font-black text-slate-900 mt-1 block">
                      {worker.practicalAssessment.rubrics.toolHandling}%
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Pipe wrench torque calibration & thread tape finish</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block">Speed & Finish</span>
                    <span className="text-lg font-black text-slate-900 mt-1 block">
                      {worker.practicalAssessment.rubrics.speedAndFinish}%
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Rapid resolution under simulated emergency rush</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block">Troubleshooting</span>
                    <span className="text-lg font-black text-slate-900 mt-1 block">
                      {worker.practicalAssessment.rubrics.troubleshooting}%
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Diagnosing hidden hairline joints & valve friction</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              Practical skill assessment scheduled at next union assembly.
            </div>
          )}

          {/* Documents & Trade Proofs */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Verified Documents & Membership Credentials
            </h3>
            <div className="space-y-2">
              {worker.documents.map(doc => (
                <div
                  key={doc.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">{doc.title}</p>
                      <p className="text-[11px] text-slate-500">
                        {doc.fileName} • {doc.fileSize} • Uploaded {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: TRANSPARENT EARNINGS & PATRONAGE DIVIDEND */}
      {activeTab === 'earnings' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
              Cooperative Economics
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Transparent Earnings & Patronage Dividend Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Unlike gig platforms that take 25–35% predatory commissions, Apex Union operates on a cooperative model where 88% goes directly to the worker and 8% builds the collective union welfare pool.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <span className="text-xs font-bold text-emerald-800 uppercase block">Direct Worker Payout (88%)</span>
              <span className="text-2xl font-black text-emerald-700 mt-1 block">₹{totalEarnings}</span>
              <p className="text-[11px] text-emerald-800 mt-1">Settled directly via UPI into worker bank account after job completion.</p>
            </div>

            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl">
              <span className="text-xs font-bold text-indigo-800 uppercase block">Cooperative Welfare Pool (8%)</span>
              <span className="text-2xl font-black text-indigo-700 mt-1 block">₹{cooperativeDividendFund}</span>
              <p className="text-[11px] text-indigo-800 mt-1">Funds health insurance, tool subsidies, and emergency death benefits.</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs font-bold text-slate-700 uppercase block">Platform Maintenance (4%)</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">₹{Math.round(totalEarnings * 0.04)}</span>
              <p className="text-[11px] text-slate-600 mt-1">Covers server infrastructure, OTP SMS charges, and Google Maps APIs.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: COMPLETED JOBS & REVIEWS HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Completed Service Record & Customer Reviews
          </h2>

          <div className="space-y-3">
            {completedJobs.map(job => (
              <div
                key={job.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{job.problemDescription}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      COMPLETED
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1">
                    Customer: {job.customerName} • {job.customerAddress} • Completed on {job.scheduledDate}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-emerald-700 block">₹{job.workerPayout || Math.round(job.totalAmount * 0.88)}</span>
                  <span className="text-[10px] text-slate-400">Payment: Paid</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
