import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Camera,
  Mic,
  FileText,
  MapPin,
  Users,
  CheckCircle2,
  Navigation,
  KeyRound,
  CreditCard,
  Star,
  Building2,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  RotateCcw,
  Zap,
  Check,
  Award,
  Layers
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface TryDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView: (view: string) => void;
}

export const TryDemoModal: React.FC<TryDemoModalProps> = ({
  isOpen,
  onClose,
  onNavigateView
}) => {
  const {
    currentUser,
    workers,
    bookings,
    createBooking,
    updateBookingStatus,
    processPayment,
    submitReview,
    switchRole,
    setSelectedBooking,
    setIsTrackingModalOpen
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [createdBookingId, setCreatedBookingId] = useState<string>('bk-demo-01');
  const [startOtp, setStartOtp] = useState<string>('4829');
  const [completionOtp, setCompletionOtp] = useState<string>('7163');
  const [rating, setRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('Excellent prompt service by Suresh Varma! Fixed the burst pipe under 45 minutes.');

  if (!isOpen) return null;

  const demoScenario = {
    text: 'Na bathroom pipe leak ayindi, urgent ga plumber kavali.',
    lang: 'Telugu (తెలుగు)',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=600',
    service: 'Plumbing',
    issue: 'Pipe Leak / Ruptured Fitting',
    priority: 'Emergency',
    location: 'Banjara Hills, Road No 12, Hyderabad',
    worker: workers.find(w => w.serviceCategory === 'plumbing') || workers[0],
    matchingScore: 98,
    reasons: [
      'Trade Skill Match (Plumbing Grade-A certified)',
      'Closest Proximity (1.8 km / 12 mins transit)',
      'Lowest Current Workload (Fair queue rotation)',
      'High Member Rating (4.88 ★ over 142 union jobs)'
    ],
    tariff: 349,
    workerPayout: 307,
    coopShare: 28,
    platformShare: 14
  };

  const handleNext = () => {
    if (currentStep < 14) {
      // At step 7 (Book Worker), create a live booking in state if not done
      if (currentStep === 6) {
        const newB = createBooking({
          serviceCategory: 'plumbing',
          workerId: demoScenario.worker.id,
          scheduledDate: new Date().toISOString().split('T')[0],
          scheduledTime: 'Immediate (Emergency)',
          problemDescription: `${demoScenario.text} [Detected: ${demoScenario.issue}]`,
          problemImage: demoScenario.image,
          detectedIssue: demoScenario.issue,
          priority: 'emergency',
          customerAddress: demoScenario.location,
          distanceKm: 1.8,
          amount: demoScenario.tariff
        });
        setCreatedBookingId(newB.id);
        if (newB.startOtp) setStartOtp(newB.startOtp);
        if (newB.completionOtp) setCompletionOtp(newB.completionOtp);
      }

      // At step 8 (Worker Accepts)
      if (currentStep === 7) {
        updateBookingStatus(createdBookingId, 'ACCEPTED', 'Suresh Varma accepted dispatch on cooperative terminal.');
      }

      // At step 9 (Worker Tracking / Dispatched)
      if (currentStep === 8) {
        updateBookingStatus(createdBookingId, 'ON THE WAY', 'Worker en route with tool kit.');
      }

      // At step 10 (OTP Verification & Job Start)
      if (currentStep === 9) {
        updateBookingStatus(createdBookingId, 'IN PROGRESS', `Start OTP ${startOtp} verified on site.`);
      }

      // At step 11 (Job Completion)
      if (currentStep === 10) {
        updateBookingStatus(createdBookingId, 'COMPLETED', `Completion OTP ${completionOtp} verified by customer.`);
      }

      // At step 12 (Payment)
      if (currentStep === 11) {
        processPayment(createdBookingId, 'qr');
      }

      // At step 13 (Rating)
      if (currentStep === 12) {
        submitReview(createdBookingId, rating, reviewComment, ['Fast Response', 'Fair Tariff', 'Skill Certified']);
      }

      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const stepsList = [
    { num: 1, title: 'Input Problem', sub: 'Text + Voice + Image' },
    { num: 2, title: 'AI Understanding', sub: 'Multilingual NLP' },
    { num: 3, title: 'Service Classified', sub: 'Plumbing Service' },
    { num: 4, title: 'Problem Detected', sub: 'Pipe Joint Leak' },
    { num: 5, title: 'Priority & Locality', sub: 'Emergency / Banjara Hills' },
    { num: 6, title: 'AI Worker Matching', sub: 'Proximity + Fair Queue' },
    { num: 7, title: 'Book Worker', sub: 'Cooperative Fixed Tariff' },
    { num: 8, title: 'Worker Accepts', sub: 'Worker Portal Action' },
    { num: 9, title: 'Track Worker', sub: 'Live Transit Simulation' },
    { num: 10, title: 'OTP Job Start', sub: '4-Digit Handshake' },
    { num: 11, title: 'Job Completed', sub: 'Completion OTP Verified' },
    { num: 12, title: 'Payment Settled', sub: '88% Direct Payout' },
    { num: 13, title: 'Customer Rating', sub: '5-Star Trust Score' },
    { num: 14, title: 'Coop Admin Updated', sub: 'Real-time Metrics & Audit' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-6 relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-300 px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Try Demo Experience</span>
              </span>
              <DemoIntegrationBadge status="demo" label="End-to-End Walkthrough" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Apex Union: Complete 14-Step Service Journey
            </h2>
            <p className="text-xs text-slate-500">
              Step through the realistic customer problem, AI diagnostics, worker dispatch, OTP handshake, and cooperative dividend settlement.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="py-3 border-b border-slate-100 overflow-x-auto scrollbar-none shrink-0">
          <div className="flex items-center gap-1.5 min-w-[720px]">
            {stepsList.map(s => {
              const isPast = s.num < currentStep;
              const isCurrent = s.num === currentStep;
              return (
                <button
                  key={s.num}
                  onClick={() => setCurrentStep(s.num)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-slate-900 text-amber-400 shadow-sm ring-2 ring-slate-900'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isCurrent ? 'bg-amber-400 text-slate-950 font-black' : isPast ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isPast ? '✓' : s.num}
                  </span>
                  <span className="truncate max-w-[90px]">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Stage Body */}
        <div className="py-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Problem Input */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl">
                <span className="text-xs font-bold uppercase text-amber-900">Step 1: Customer Input (Text, Voice, or Image)</span>
                <p className="text-sm text-slate-800 mt-1 font-semibold">
                  Customer can explain their issue using voice, text, or taking a photo with camera.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-amber-600" />
                    <span className="text-xs font-bold text-slate-900">Customer Uploaded Photo:</span>
                  </div>
                  <img
                    src={demoScenario.image}
                    alt="Leaking Pipe"
                    className="w-full h-44 rounded-xl object-cover ring-1 ring-slate-300"
                  />
                  <p className="text-xs text-slate-500">Photo of leaking bathroom washbasin coupling with moisture dripping.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mic className="w-5 h-5 text-indigo-600" />
                      <span className="text-xs font-bold text-slate-900">Voice Dictation (Telugu):</span>
                    </div>
                    <blockquote className="p-3 bg-white rounded-xl border border-slate-200 text-xs italic text-slate-800 leading-relaxed font-sans">
                      "{demoScenario.text}"
                    </blockquote>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Translation: "My bathroom pipe is leaking, urgently need a plumber."
                    </p>
                  </div>

                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900">
                    <strong>Multimodal Synergy:</strong> Customer submitted both image and spoken regional language for instant AI diagnostic.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2-5: AI Problem Understanding, Service Classification, Priority */}
          {currentStep >= 2 && currentStep <= 5 && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
                <span className="text-xs font-bold uppercase text-indigo-900">
                  Step {currentStep}: AI Computer Vision & Multilingual NLP Diagnosis
                </span>
                <p className="text-sm text-slate-800 mt-1 font-semibold">
                  Apex Union's dual AI models parse the speech token stream and analyze pixel moisture reflections.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className={`p-4 rounded-2xl border ${currentStep >= 2 ? 'bg-white border-indigo-400 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                  <span className="text-[10px] font-bold uppercase text-indigo-600 block">AI 1: NLP Language</span>
                  <span className="text-base font-black text-slate-900 mt-1 block">Telugu (తెలుగు)</span>
                  <p className="text-[11px] text-slate-500 mt-1">99% intent confidence on phrase "pipe leak ayindi"</p>
                </div>

                <div className={`p-4 rounded-2xl border ${currentStep >= 3 ? 'bg-white border-amber-400 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                  <span className="text-[10px] font-bold uppercase text-amber-600 block">AI 2: Service Classification</span>
                  <span className="text-base font-black text-amber-700 mt-1 block">PLUMBING</span>
                  <p className="text-[11px] text-slate-500 mt-1">Classified under Metro Skilled Artisans Union</p>
                </div>

                <div className={`p-4 rounded-2xl border ${currentStep >= 4 ? 'bg-white border-blue-400 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                  <span className="text-[10px] font-bold uppercase text-blue-600 block">AI 3: Detected Defect</span>
                  <span className="text-base font-black text-blue-800 mt-1 block">Pipe Joint Leak</span>
                  <p className="text-[11px] text-slate-500 mt-1">Visual moisture pooling (98% CV match)</p>
                </div>

                <div className={`p-4 rounded-2xl border ${currentStep >= 5 ? 'bg-rose-50 border-rose-400 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                  <span className="text-[10px] font-bold uppercase text-rose-600 block">AI 4: Priority & Geofence</span>
                  <span className="text-base font-black text-rose-700 mt-1 block animate-pulse">EMERGENCY</span>
                  <p className="text-[11px] text-rose-800 mt-1">Banjara Hills Sector • Stopcock alert issued</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: AI Intelligent Worker Matching */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                <span className="text-xs font-bold uppercase text-emerald-900">Step 6: AI Explainable Worker Matching</span>
                <p className="text-sm text-slate-800 mt-1 font-semibold">
                  Matching workers using required skill, problem type, customer proximity, availability, and fair queue rotation.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <img
                    src={demoScenario.worker.avatarUrl}
                    alt={demoScenario.worker.name}
                    className="w-20 h-20 rounded-2xl object-cover ring-2 ring-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900">{demoScenario.worker.name}</h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {demoScenario.matchingScore}% Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      National Trade Certificate (Plumbing ITI) • {demoScenario.worker.experienceYears} Years Exp.
                    </p>
                    <p className="text-xs font-semibold text-indigo-700 mt-0.5">
                      {demoScenario.worker.cooperativeName}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-auto bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">AI Matching Factors:</span>
                  {demoScenario.reasons.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Customer Books Worker */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
                <span className="text-xs font-bold uppercase text-amber-900">Step 7: Customer Books Worker</span>
                <p className="text-sm text-slate-800 mt-1 font-semibold">
                  Customer confirms booking with transparent cooperative minimum tariff (₹{demoScenario.tariff}).
                </p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase">Booking Generation</span>
                  <span className="text-xs font-bold font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    #{createdBookingId}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Tariff</span>
                    <span className="text-base font-black text-slate-900">₹{demoScenario.tariff}</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 block">Worker Direct (88%)</span>
                    <span className="text-base font-black text-emerald-700">₹{demoScenario.workerPayout}</span>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-indigo-700 block">Coop Pool (8%)</span>
                    <span className="text-base font-black text-indigo-700">₹{demoScenario.coopShare}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 text-center">
                  Job dispatch dispatched immediately to Suresh Varma's Worker Portal terminal.
                </p>
              </div>
            </div>
          )}

          {/* STEP 8: Worker Accepts */}
          {currentStep === 8 && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
                <span className="text-xs font-bold uppercase text-indigo-900">Step 8: Worker Portal Receives & Accepts</span>
                <p className="text-sm text-slate-800 mt-1 font-semibold">
                  Suresh Varma reviews the customer problem photo, address, and accepts the assignment.
                </p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Assignment Accepted by Suresh Varma</h4>
                    <p className="text-xs text-slate-500">Status changed from REQUESTED → ACCEPTED</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    switchRole('cooperative_worker');
                    onNavigateView('worker_dashboard');
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs"
                >
                  View in Worker Portal
                </button>
              </div>
            </div>
          )}

          {/* STEP 9: Tracking & Map */}
          {currentStep === 9 && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl">
                <span className="text-xs font-bold uppercase text-blue-900">Step 9: Customer Tracks Worker Transit</span>
                <p className="text-sm text-slate-800 mt-1 font-semibold">
                  Status: ON THE WAY • Estimated Arrival: 12 minutes. Live GPS simulation active.
                </p>
              </div>

              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Navigation className="w-4 h-4" />
                    <span>Worker Dispatched from Jubilee Hills</span>
                  </span>
                  <span className="font-mono text-slate-400">Transit: 1.8 km</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 w-3/4 animate-pulse rounded-full" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: OTP Verification on Arrival */}
          {currentStep === 10 && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
                <span className="text-xs font-bold uppercase text-indigo-900">Step 10: Arrival & OTP Security Verification</span>
                <p className="text-sm text-slate-800 mt-1 font-semibold">
                  Worker arrives at doorstep. Customer shares 4-digit Job Start OTP ({startOtp}) to initiate work timer.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-indigo-200 shadow-sm text-center space-y-3">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">Customer Job Start OTP</span>
                <span className="text-4xl font-mono font-black text-indigo-950 tracking-widest bg-indigo-50 px-6 py-2 rounded-2xl inline-block border border-indigo-200">
                  {startOtp}
                </span>
                <p className="text-xs text-slate-500">
                  Status changes to IN PROGRESS upon successful OTP validation.
                </p>
              </div>
            </div>
          )}

          {/* STEP 11: Job Completion with Completion OTP */}
          {currentStep === 11 && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                <span className="text-xs font-bold uppercase text-emerald-900">Step 11: Work Finished & Completion OTP Handshake</span>
                <p className="text-sm text-slate-800 mt-1 font-semibold">
                  Customer inspects repaired pipe joint, tests water pressure, and provides Completion OTP ({completionOtp}).
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-emerald-200 shadow-sm text-center space-y-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Customer Completion OTP</span>
                <span className="text-4xl font-mono font-black text-emerald-900 tracking-widest bg-emerald-50 px-6 py-2 rounded-2xl inline-block border border-emerald-200">
                  {completionOtp}
                </span>
                <p className="text-xs text-emerald-800 font-semibold">
                  ✓ Repair verified: No water leakage. 30-Day Cooperative Guarantee activated.
                </p>
              </div>
            </div>
          )}

          {/* STEP 12: Transparent Payment Settlement */}
          {currentStep === 12 && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                <span className="text-xs font-bold uppercase text-emerald-900">Step 12: Instant Payment & Transparent Union Split</span>
                <p className="text-sm text-slate-800 mt-1 font-semibold">
                  Customer pays ₹{demoScenario.tariff} via UPI QR / Cash. 88% settles immediately to Suresh Varma.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-white rounded-xl border border-emerald-300 shadow-2xs">
                  <span className="text-xs font-bold text-emerald-800 block">Worker Payout (88%)</span>
                  <span className="text-2xl font-black text-emerald-700 mt-1 block">₹{demoScenario.workerPayout}</span>
                  <span className="text-[10px] text-slate-500">Credited to Suresh Varma's Bank</span>
                </div>
                <div className="p-4 bg-white rounded-xl border border-indigo-300 shadow-2xs">
                  <span className="text-xs font-bold text-indigo-800 block">Coop Welfare (8%)</span>
                  <span className="text-2xl font-black text-indigo-700 mt-1 block">₹{demoScenario.coopShare}</span>
                  <span className="text-[10px] text-slate-500">Transferred to Union Health Pool</span>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-300 shadow-2xs">
                  <span className="text-xs font-bold text-slate-700 block">Platform Share (4%)</span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block">₹{demoScenario.platformShare}</span>
                  <span className="text-[10px] text-slate-500">Servers & SMS Gateways</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 13: Customer Review */}
          {currentStep === 13 && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
                <span className="text-xs font-bold uppercase text-amber-900">Step 13: Customer Trust Rating & Feedback</span>
                <p className="text-sm text-slate-800 mt-1 font-semibold">
                  Customer rates the certified artisan 5 stars. Score updates worker profile in real time.
                </p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-1 justify-center">
                  {[1, 2, 3, 4, 5].map(st => (
                    <button
                      key={st}
                      onClick={() => setRating(st)}
                      className="p-1 cursor-pointer"
                    >
                      <Star className={`w-7 h-7 ${st <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-center text-slate-600 italic">
                  "{reviewComment}"
                </p>
              </div>
            </div>
          )}

          {/* STEP 14: Cooperative Admin Dashboard Updates & AI Anomaly Sentinel */}
          {currentStep === 14 && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
                <span className="text-xs font-bold uppercase text-indigo-900">
                  Step 14: Cooperative Admin Dashboard Automatically Updates!
                </span>
                <p className="text-sm text-slate-800 mt-1 font-semibold">
                  Completed job logged into cooperative books, patronage dividend credited, and AI Anomaly Sentinel checks for review tampering.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900">Cooperative Society Metrics:</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>✓ Completed Jobs count incremented (+1)</li>
                    <li>✓ Suresh Varma status returned to 'Available'</li>
                    <li>✓ ₹{demoScenario.coopShare} added to Patronage Dividend Pool</li>
                    <li>✓ Tamper-proof audit record logged on system</li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    <span className="text-xs font-bold text-slate-900">AI Module 4: Anomaly Sentinel</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Review verified genuine (unique IP, valid OTP lifecycle handshake, zero automated cluster patterns). No fraud alerts triggered.
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    switchRole('cooperative_admin');
                    onNavigateView('cooperative_dashboard');
                    onClose();
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  View Cooperative Admin Dashboard
                </button>
                <button
                  onClick={() => {
                    switchRole('customer');
                    onNavigateView('customer_dashboard');
                    onClose();
                  }}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  View Customer Portal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-3 py-2 text-xs font-bold rounded-xl flex items-center gap-1 transition-all ${
                currentStep > 1
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
                  : 'bg-slate-50 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              Step {currentStep} of 14
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-3 py-2 text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {currentStep < 14 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <span>Advance to Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md cursor-pointer"
              >
                Done / Return to App
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
