import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Worker, WorkerDocument, VerificationStatus } from '../../types';
import {
  X,
  FileText,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Scan,
  AlertTriangle,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface Props {
  data: { worker: Worker; document: WorkerDocument } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WorkerVerificationModal: React.FC<Props> = ({ data, isOpen, onClose }) => {
  const { verifyWorkerDocument } = useApp();
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !data) return null;

  const { worker, document } = data;

  const handleDecision = (status: VerificationStatus) => {
    setIsProcessing(true);
    setTimeout(() => {
      verifyWorkerDocument(worker.id, document.id, status, rejectionReason);
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                OCR Verification Studio
              </span>
              <DemoIntegrationBadge status="demo" label="OCR Processing Assistant" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Document Audit: {document.title}
            </h2>
            <p className="text-xs text-slate-500">
              Worker: <span className="font-semibold text-slate-800">{worker.name}</span> ({worker.cooperativeName})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Regulatory Prototype Disclaimer */}
        <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Verification Notice:</strong> Document processing assistance — final verification is performed by the authorized cooperative/admin workflow. This platform does not claim official government authentication.
          </p>
        </div>

        {/* Document Visualizer & OCR Extraction Side-by-Side */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Simulated Certificate Preview Card */}
          <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col justify-between space-y-3 relative overflow-hidden">
            <div className="border border-slate-300 bg-white p-4 rounded-lg shadow-xs space-y-2 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs border border-slate-700">
                AU
              </div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Official Trade Credential
              </h4>
              <p className="text-[10px] text-slate-500">Document Type: {document.type.replace('_', ' ').toUpperCase()}</p>
              <div className="py-2 border-y border-slate-100 text-[11px] text-slate-700 font-serif">
                This is to certify that <span className="font-bold underline">{worker.name}</span> has completed the requisite technical evaluation in <span className="font-bold">{worker.serviceCategory.toUpperCase()}</span>.
              </div>
              <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono">
                <span>FILE: {document.fileName}</span>
                <span>SIZE: {document.fileSize}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center justify-between">
              <span>Uploaded: {document.uploadDate}</span>
              <span className="font-semibold capitalize text-indigo-700">Status: {document.status}</span>
            </div>
          </div>

          {/* OCR Extracted Text & Confidence */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 flex flex-col justify-between space-y-3 font-mono text-xs">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Scan className="w-3.5 h-3.5" />
                  OCR TEXT EXTRACTION
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 text-[10px]">
                  Confidence: {((document.ocrConfidence || 0.96) * 100).toFixed(0)}%
                </span>
              </div>

              <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-300 leading-relaxed max-h-48 overflow-y-auto">
                {document.ocrExtractedText ||
                  'DIRECTORATE GENERAL OF TECHNICAL EDUCATION. Verified artisan credential. Matched name and registered trade category.'}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
              Matched Fields: Candidate Name (100%), Trade Competency (98%), Issuing Registry (95%)
            </div>
          </div>
        </div>

        {/* Rejection input toggle */}
        {showRejectInput && (
          <div className="mt-4 p-3 bg-rose-50 rounded-xl border border-rose-200 space-y-2 text-xs animate-in fade-in">
            <label className="block font-semibold text-rose-900">
              Specify Reason for Rejection
            </label>
            <input
              type="text"
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              placeholder="e.g. Blurry certificate scan or expired trade license..."
              className="w-full px-3 py-1.5 text-xs border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
            />
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-100">
          <span className="text-[11px] text-slate-500">
            Current Document Status: <strong className="capitalize">{document.status}</strong>
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>

            {document.status !== 'rejected' && (
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => {
                  if (!showRejectInput) {
                    setShowRejectInput(true);
                  } else {
                    handleDecision('rejected');
                  }
                }}
                className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>{showRejectInput ? 'Confirm Rejection' : 'Reject Document'}</span>
              </button>
            )}

            {document.status !== 'verified' && (
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleDecision('verified')}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'Verifying...' : 'Approve & Mark Verified'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
