import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Worker, WorkerDocument } from '../../types';
import {
  X,
  Star,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  FileText,
  Building2,
  CheckCircle2,
  Briefcase,
  ExternalLink,
  Eye,
  Check
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface Props {
  worker: Worker | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (w: Worker) => void;
}

export const WorkerProfileModal: React.FC<Props> = ({
  worker,
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const { reviews, currentUser, setSelectedDocumentInspection } = useApp();
  const [selectedDocPreview, setSelectedDocPreview] = useState<WorkerDocument | null>(null);

  if (!isOpen || !worker) return null;

  const workerReviews = reviews.filter(r => r.workerId === worker.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Artisan Profile
            </span>
            <DemoIntegrationBadge
              status={worker.verificationStatus === 'verified' ? 'implemented' : 'demo'}
              label={worker.verificationStatus === 'verified' ? 'Verified Member' : 'Pending Verification'}
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Worker Overview */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={worker.avatarUrl}
              alt={worker.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-200 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{worker.name}</h3>
                {worker.verificationStatus === 'verified' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 capitalize">
                {worker.serviceCategory.replace('_', ' ')} · {worker.experienceYears} Years Experience
              </p>
              <p className="text-xs text-indigo-700 font-medium flex items-center gap-1 mt-0.5">
                <Building2 className="w-3.5 h-3.5" />
                {worker.cooperativeName}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
            <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="font-bold text-slate-900 text-sm">{worker.rating}</span>
              <span className="text-xs text-slate-500">({worker.reviewCount})</span>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-slate-900">₹{worker.hourlyRate}</span>
              <span className="text-[11px] text-slate-400">/hr</span>
            </div>
          </div>
        </div>

        {/* Bio & Details */}
        <div className="mt-4 space-y-4 text-xs">
          <div>
            <h4 className="font-semibold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
              Craftsman Biography
            </h4>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {worker.bio}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-semibold">Location / Base</span>
              <span className="font-bold text-slate-800 text-xs truncate block">{worker.location.neighborhood}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-semibold">Service Coverage</span>
              <span className="font-bold text-slate-800 text-xs">{worker.serviceRadiusKm} km Radius</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-semibold">Completed Jobs</span>
              <span className="font-bold text-slate-800 text-xs">{worker.completedJobsCount} Services</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-semibold">Availability</span>
              <span className="font-bold text-emerald-700 capitalize text-xs">{worker.availability}</span>
            </div>
          </div>

          {/* Core Skills */}
          <div>
            <h4 className="font-semibold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5">
              Verified Technical Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {worker.skills.map(skill => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Verified Certificates with OCR Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="font-semibold text-slate-800 uppercase tracking-wider text-[11px]">
                Cooperative Verified Documents & Credentials
              </h4>
              <span className="text-[10px] text-slate-400">OCR verified trade certificates</span>
            </div>
            <div className="space-y-2">
              {worker.documents.map(doc => (
                <div
                  key={doc.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{doc.title}</p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {doc.fileName} · {doc.fileSize}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
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
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDocPreview(selectedDocPreview?.id === doc.id ? null : doc)
                      }
                      className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3 text-slate-500" />
                      <span>{selectedDocPreview?.id === doc.id ? 'Hide OCR' : 'View OCR'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* OCR Document Preview Expandable */}
            {selectedDocPreview && (
              <div className="mt-3 p-3.5 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] space-y-2 border border-slate-800 animate-in fade-in">
                <div className="flex items-center justify-between text-xs text-amber-400 border-b border-slate-800 pb-1.5 font-bold">
                  <span>OCR EXTRACTED CERTIFICATE RECORD</span>
                  <span>Confidence: {(selectedDocPreview.ocrConfidence! * 100).toFixed(0)}%</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedDocPreview.ocrExtractedText || 'Raw text processed from government/cooperative credential repository.'}
                </p>
                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
                  <span>Verified By: {selectedDocPreview.verifiedBy || 'Review Board'}</span>
                  <span>Timestamp: {selectedDocPreview.verifiedAt || 'Archived'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Customer Reviews Section */}
          <div>
            <h4 className="font-semibold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
              Recent Verified Customer Reviews ({workerReviews.length})
            </h4>
            {workerReviews.length === 0 ? (
              <p className="text-xs text-slate-400 bg-slate-50 p-3 rounded-xl">
                No customer reviews yet. Be the first to book!
              </p>
            ) : (
              <div className="space-y-2.5">
                {workerReviews.map(r => (
                  <div key={r.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{r.customerName}</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-xs">{r.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs leading-snug">{r.comment}</p>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {r.tags.map(t => (
                        <span key={t} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            <span>Cooperative Worker ID: </span>
            <span className="font-mono font-medium text-slate-800">{worker.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBooking(worker);
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Book Worker Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
