import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking, BookingStatus } from '../../types';
import {
  X,
  MapPin,
  Navigation,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  FileText,
  User,
  ExternalLink
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface Props {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingTrackingModal: React.FC<Props> = ({ booking, isOpen, onClose }) => {
  const {
    updateBookingStatus,
    setIsPaymentModalOpen,
    setIsInvoiceModalOpen,
    setSelectedBooking
  } = useApp();

  const [callSimulated, setCallSimulated] = useState(false);

  if (!isOpen || !booking) return null;

  const steps: BookingStatus[] = [
    'REQUESTED',
    'ACCEPTED',
    'ON THE WAY',
    'IN PROGRESS',
    'COMPLETED'
  ];

  const currentStepIdx = steps.indexOf(booking.status);

  const handleAdvanceStatus = (nextStatus: BookingStatus, note?: string) => {
    updateBookingStatus(booking.id, nextStatus, note);
    // update local object reference
    booking.status = nextStatus;
  };

  const handleOpenPayment = () => {
    setSelectedBooking(booking);
    setIsPaymentModalOpen(true);
  };

  const handleOpenInvoice = () => {
    setSelectedBooking(booking);
    setIsInvoiceModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Booking #{booking.id}
              </span>
              <DemoIntegrationBadge status="demo" label="Demo Map & GPS Simulation" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-2">
              Service Tracking & Lifecycle
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 capitalize">
                {booking.status}
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Stepper */}
        <div className="mt-5 px-2">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-600 transition-all duration-500 z-0"
              style={{
                width: `${Math.max(0, (currentStepIdx / (steps.length - 1)) * 100)}%`
              }}
            />

            {steps.map((st, idx) => {
              const isPast = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={st} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-slate-900 text-amber-400 ring-4 ring-amber-100'
                        : 'bg-white text-slate-400 border-2 border-slate-300'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-[10px] mt-1 font-semibold uppercase tracking-tight text-center ${
                      isCurrent ? 'text-slate-900' : isPast ? 'text-emerald-700' : 'text-slate-400'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Demo Map Visualizer */}
        <div className="mt-6 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100 h-64 sm:h-72">
          {/* Custom SVG Simulated Map with Streets & Markers */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Background Grid & Streets */}
            <rect width="100%" height="100%" fill="#f8fafc" />
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* River / Green Area */}
            <path
              d="M0,180 Q150,150 300,200 T600,160 L600,288 L0,288 Z"
              fill="#ecfdf5"
              opacity="0.8"
            />
            <path
              d="M0,180 Q150,150 300,200 T600,160"
              stroke="#a7f3d0"
              strokeWidth="12"
              fill="none"
              opacity="0.5"
            />

            {/* Urban Road Network */}
            <path d="M-20,60 L650,70" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
            <path d="M-20,60 L650,70" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />

            <path d="M120,-10 L140,320" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="round" />
            <path d="M120,-10 L140,320" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />

            <path d="M420,-10 L390,320" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="round" />
            <path d="M420,-10 L390,320" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />

            {/* Route Polyline (Worker to Customer) */}
            <path
              d="M 170 120 Q 280 90, 420 180"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeDasharray="6 4"
              className="animate-pulse"
            />

            {/* Worker Pin */}
            <g transform="translate(170, 120)">
              <circle r="18" fill="#3b82f6" opacity="0.2" className="animate-ping" />
              <circle r="12" fill="#2563eb" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                W
              </text>
            </g>

            {/* Customer Pin */}
            <g transform="translate(420, 180)">
              <circle r="18" fill="#ef4444" opacity="0.2" />
              <circle r="12" fill="#dc2626" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                C
              </text>
            </g>
          </svg>

          {/* Map Overlay Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-xs flex items-center gap-2 text-xs">
            <Navigation className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            <span className="font-semibold text-slate-800">
              {booking.status === 'ON THE WAY'
                ? `Worker is ~${booking.estimatedArrivalMins || 14} mins away (${booking.distanceKm} km)`
                : booking.status === 'IN PROGRESS'
                ? 'Worker is at service location'
                : booking.status === 'COMPLETED'
                ? 'Service completed successfully'
                : 'Cooperative dispatch confirmed'}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white px-2.5 py-1 rounded text-[10px] font-mono tracking-tight">
            DEMO MAP · REAL GPS API READY
          </div>
        </div>

        {/* Worker & Location Details */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={booking.workerAvatar}
                alt={booking.workerName}
                className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  {booking.workerName}
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </p>
                <p className="text-[11px] text-slate-500 capitalize">{booking.serviceCategory} Specialist</p>
                <p className="text-[10px] text-indigo-700 font-medium">{booking.cooperativeName}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setCallSimulated(true);
                setTimeout(() => setCallSimulated(false), 3000);
              }}
              className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
              title="Call Worker"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <p className="font-semibold text-slate-700 flex items-center gap-1 mb-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              Service Address
            </p>
            <p className="text-slate-600 text-[11px] leading-snug line-clamp-2">
              {booking.customerAddress}
            </p>
          </div>
        </div>

        {callSimulated && (
          <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Simulated call placed to {booking.workerName} ({booking.workerPhone}).</span>
          </div>
        )}

        {/* Prototype Lifecycle Controls */}
        <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Prototype Lifecycle Controllers
            </span>
            <span className="text-[10px] text-slate-400">Advance booking state to test workflow</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {booking.status === 'REQUESTED' && (
              <button
                onClick={() => handleAdvanceStatus('ACCEPTED', 'Worker accepted the assignment.')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
              >
                Accept Booking
              </button>
            )}

            {booking.status === 'ACCEPTED' && (
              <button
                onClick={() => handleAdvanceStatus('ON THE WAY', 'Worker dispatched on transit.')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Dispatch (On The Way)
              </button>
            )}

            {booking.status === 'ON THE WAY' && (
              <button
                onClick={() => handleAdvanceStatus('IN PROGRESS', 'Worker reached location and started work.')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                Mark Arrived & In Progress
              </button>
            )}

            {booking.status === 'IN PROGRESS' && (
              <button
                onClick={() => handleAdvanceStatus('COMPLETED', 'Task finished with job report.')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Complete Service
              </button>
            )}

            {booking.status === 'COMPLETED' && (
              <div className="flex items-center gap-2">
                {booking.paymentStatus !== 'paid' ? (
                  <button
                    onClick={handleOpenPayment}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Process Payment (₹{booking.totalAmount})
                  </button>
                ) : (
                  <button
                    onClick={handleOpenInvoice}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    View & Print Invoice
                  </button>
                )}
              </div>
            )}

            {booking.status !== 'COMPLETED' && booking.status !== 'CANCELLED' && (
              <button
                onClick={() => handleAdvanceStatus('CANCELLED', 'Cancelled by user.')}
                className="px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
