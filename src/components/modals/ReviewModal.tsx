import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import { X, Star, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface Props {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal: React.FC<Props> = ({ booking, isOpen, onClose }) => {
  const { submitReview } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Prompt Arrival', 'Fair Rate']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !booking) return null;

  const availableTags = [
    'Prompt Arrival',
    'Fair Rate',
    'Master Craftsmanship',
    'Cooperative Verified',
    'Cleaned Up Workspace',
    'Courteous Behavior'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitReview(booking.id, rating, comment, selectedTags);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-6">
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                Feedback & Trust
              </span>
              <DemoIntegrationBadge status="implemented" label="Rating Engine" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Rate Service by {booking.workerName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Star selector */}
          <div className="text-center py-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 block mb-2 font-medium">
              How would you rate the craftsmanship and behavior?
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => {
                const filled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 text-slate-300 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        filled ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-bold text-slate-800 block mt-1">
              {rating === 5 ? '5.0 — Outstanding Service' : `${rating}.0 / 5.0 Stars`}
            </span>
          </div>

          {/* Quick tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Highlight Worker Strengths
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map(tag => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                      active
                        ? 'bg-slate-900 text-white border-slate-900 font-medium'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text review */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Review / Observations
            </label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Describe the quality of work, adherence to pricing, and worker punctuality..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Reviews feed directly into the AI Recommendation Engine for fair worker ranking.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isSubmitting ? 'Posting...' : 'Submit Verified Review'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
