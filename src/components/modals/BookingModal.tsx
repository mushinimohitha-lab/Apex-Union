import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Worker, ServiceCategoryKey } from '../../types';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { CategoryIcon } from '../common/IconHelper';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';
import { VoiceInputButton } from '../common/VoiceInputButton';

interface Props {
  worker: Worker | null;
  defaultCategory?: ServiceCategoryKey;
  initialProblem?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<Props> = ({
  worker,
  defaultCategory,
  initialProblem = '',
  isOpen,
  onClose
}) => {
  const {
    currentUser,
    createBooking,
    setSelectedBooking,
    setIsTrackingModalOpen,
    t
  } = useApp();

  const [problemDescription, setProblemDescription] = useState(
    initialProblem || 'Need urgent repair inspection.'
  );
  const [scheduledDate, setScheduledDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [scheduledTime, setScheduledTime] = useState('11:00 AM - 12:30 PM');
  const [customerAddress, setCustomerAddress] = useState(currentUser.location);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !worker) return null;

  const category = (worker.serviceCategory || defaultCategory || 'plumbing') as ServiceCategoryKey;
  const baseRate = worker.hourlyRate || 399;
  const platformFee = Math.round(baseRate * 0.1);
  const totalAmount = baseRate;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = createBooking({
        serviceCategory: category,
        workerId: worker.id,
        scheduledDate,
        scheduledTime,
        problemDescription: `${problemDescription} ${notes ? `(Note: ${notes})` : ''}`,
        customerAddress,
        distanceKm: 2.8,
        amount: totalAmount
      });

      setIsSubmitting(false);
      onClose();
      // Automatically open tracking view for live demonstration
      setSelectedBooking(newBooking);
      setIsTrackingModalOpen(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                Service Booking
              </span>
              <DemoIntegrationBadge status="demo" label="Interactive Flow" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              {t('booking.title', 'Book Verified Cooperative Worker')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Worker Summary Card */}
        <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={worker.avatarUrl}
              alt={worker.name}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-sm">{worker.name}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-slate-500 capitalize">
                {t(`cat.${worker.serviceCategory}`, worker.serviceCategory.replace('_', ' '))} · {worker.experienceYears} Years Exp.
              </p>
              <p className="text-[11px] text-indigo-700 font-medium truncate max-w-[260px]">
                {worker.cooperativeName}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">{t('booking.standard_rate', 'Standard Rate')}</span>
            <span className="text-base font-bold text-slate-900">₹{worker.hourlyRate}</span>
            <span className="text-[10px] text-emerald-600 block font-medium">{t('booking.coop_fixed', 'Cooperative Fixed')}</span>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleBookingSubmit} className="mt-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                {t('booking.desc_label', 'Describe Problem / Requirement')}
              </label>
              <VoiceInputButton
                onTranscript={(text) => setProblemDescription(text)}
                currentValue={problemDescription}
                variant="badge"
                buttonLabel={t('nlp.speak_btn', 'Speak Problem')}
              />
            </div>
            <div className="relative">
              <textarea
                rows={2}
                required
                value={problemDescription}
                onChange={e => setProblemDescription(e.target.value)}
                placeholder={t('booking.desc_placeholder', 'e.g. Kitchen tap leak under sink...')}
                className="w-full pl-3 pr-10 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <div className="absolute right-2 bottom-2">
                <VoiceInputButton
                  onTranscript={(text) => setProblemDescription(text)}
                  currentValue={problemDescription}
                  variant="icon"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {t('booking.date', 'Service Date')}
              </label>
              <input
                type="date"
                required
                value={scheduledDate}
                onChange={e => setScheduledDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {t('booking.time', 'Preferred Time Slot')}
              </label>
              <select
                value={scheduledTime}
                onChange={e => setScheduledTime(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="09:00 AM - 10:30 AM">09:00 AM - 10:30 AM</option>
                <option value="11:00 AM - 12:30 PM">11:00 AM - 12:30 PM</option>
                <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM</option>
                <option value="04:30 PM - 06:00 PM">04:30 PM - 06:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              {t('booking.address', 'Service Address')}
            </label>
            <input
              type="text"
              required
              value={customerAddress}
              onChange={e => setCustomerAddress(e.target.value)}
              placeholder="Door / Flat No., Street, Landmark, City"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Transparent Price Breakdown */}
          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span>Standard Service Base Rate</span>
              <span>₹{baseRate}</span>
            </div>
            <div className="flex items-center justify-between text-slate-500 text-[11px]">
              <span>Union Operations & Platform Share (10% included)</span>
              <span>₹{platformFee}</span>
            </div>
            <div className="flex items-center justify-between text-slate-500 text-[11px]">
              <span>Direct Cooperative Worker Payout</span>
              <span className="font-semibold text-emerald-700">₹{baseRate - platformFee}</span>
            </div>
            <div className="pt-1 border-t border-amber-200 flex items-center justify-between font-bold text-slate-900 text-sm">
              <span>Total Payable</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Generating Booking...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t('booking.confirm_btn', 'Confirm & Book Worker')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
