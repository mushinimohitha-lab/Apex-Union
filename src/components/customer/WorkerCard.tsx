import React from 'react';
import { Worker, RecommendationScore } from '../../types';
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Building2,
  CheckCircle2,
  Calendar,
  Briefcase
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';
import { useApp } from '../../context/AppContext';

interface Props {
  worker: Worker;
  scoreData?: RecommendationScore;
  onViewProfile: (w: Worker) => void;
  onBookWorker: (w: Worker) => void;
  isTopRecommendation?: boolean;
}

export const WorkerCard: React.FC<Props> = ({
  worker,
  scoreData,
  onViewProfile,
  onBookWorker,
  isTopRecommendation = false
}) => {
  const { t } = useApp();
  return (
    <div
      className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between hover:shadow-lg ${
        isTopRecommendation
          ? 'border-amber-400 ring-2 ring-amber-100 shadow-md'
          : 'border-slate-200 shadow-xs hover:border-slate-300'
      }`}
    >
      <div>
        {/* Top Header & AI Match Badge */}
        <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={worker.avatarUrl}
                alt={worker.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100"
              />
              {worker.availability === 'available' && (
                <span
                  title="Available for immediate work"
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"
                />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 text-base">{worker.name}</h3>
                {worker.verificationStatus === 'verified' && (
                  <span title="Cooperative Verified">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 capitalize">
                {worker.serviceCategory.replace('_', ' ')} · {worker.experienceYears} Years Exp.
              </p>
              <p className="text-[11px] text-indigo-700 font-medium truncate max-w-[200px] flex items-center gap-1">
                <Building2 className="w-3 h-3 text-indigo-500" />
                {worker.cooperativeName}
              </p>
            </div>
          </div>

          {/* Hourly rate & Rating */}
          <div className="text-right shrink-0">
            <div className="flex items-center justify-end gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-slate-900 text-xs">{worker.rating}</span>
              <span className="text-[10px] text-slate-400">({worker.reviewCount})</span>
            </div>
            <p className="text-sm font-bold text-slate-900 mt-0.5">₹{worker.hourlyRate}</p>
            <span className="text-[10px] text-slate-400">standard rate</span>
          </div>
        </div>

        {/* Location & Service Area */}
        <div className="py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
          <div className="flex items-center gap-1 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate max-w-[150px]">{worker.location.neighborhood}</span>
            {scoreData?.distanceKm && (
              <span className="font-semibold text-slate-700">· {scoreData.distanceKm} km away</span>
            )}
          </div>

          <div className="flex items-center gap-1 text-slate-500 text-[11px]">
            <span>Radius:</span>
            <span className="font-medium text-slate-700">{worker.serviceRadiusKm} km</span>
          </div>
        </div>

        {/* Skills preview */}
        <div className="flex flex-wrap gap-1 py-1">
          {worker.skills.slice(0, 3).map(skill => (
            <span
              key={skill}
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60"
            >
              {skill}
            </span>
          ))}
          {worker.skills.length > 3 && (
            <span className="text-[10px] text-slate-400 self-center">
              +{worker.skills.length - 3} more
            </span>
          )}
        </div>

        {/* AI Recommendation Explainability Breakdown */}
        {scoreData && (
          <div className="mt-3 p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                AI-Assisted Recommendation
              </span>
              <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-amber-200 font-mono text-[11px]">
                Score: {scoreData.totalScore}/100
              </span>
            </div>

            <p className="text-[11px] font-semibold text-slate-700">Recommended because:</p>
            <ul className="space-y-0.5 text-[11px] text-slate-600">
              {scoreData.reasons.slice(0, 4).map((reason, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-4 mt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onViewProfile(worker)}
          className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center cursor-pointer"
        >
          {t('customer.view_profile', 'View Profile')}
        </button>
        <button
          type="button"
          onClick={() => onBookWorker(worker)}
          className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors text-center flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>{t('customer.book_worker', 'Book Worker')}</span>
        </button>
      </div>
    </div>
  );
};
