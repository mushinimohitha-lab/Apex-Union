import React, { useRef } from 'react';
import { Booking } from '../../types';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Calendar,
  User,
  Hash
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface Props {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<Props> = ({ booking, isOpen, onClose }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !booking) return null;

  const invoiceNumber = `APX-2026-${booking.id.replace('bk-', '')}`;
  const invoiceDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-6">
        {/* Actions bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 print:hidden">
          <div className="flex items-center gap-2">
            <DemoIntegrationBadge status="implemented" label="Official Tax Invoice View" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div ref={invoiceRef} className="pt-4 text-slate-900 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-sm">
                  AU
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-950">APEX UNION</h1>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Labour Cooperative Digital Federation of India
              </p>
              <p className="text-[11px] text-slate-400">
                Central Cooperative Registry: TS-COOP-FED-2024-001
              </p>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
                INVOICE
              </span>
              <p className="text-sm font-mono font-bold text-slate-900">{invoiceNumber}</p>
              <p className="text-xs text-slate-500">Date: {invoiceDate}</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold rounded-md bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-3 h-3" />
                {booking.paymentStatus === 'paid' ? 'PAID IN FULL' : 'PAYMENT PENDING'}
              </span>
            </div>
          </div>

          {/* Parties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Customer Details
              </span>
              <p className="font-bold text-slate-900 text-sm">{booking.customerName}</p>
              <p className="text-slate-600 leading-snug">{booking.customerAddress}</p>
              <p className="text-slate-500">{booking.customerPhone}</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Executing Cooperative Worker
              </span>
              <p className="font-bold text-slate-900 text-sm flex items-center gap-1">
                {booking.workerName}
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </p>
              <p className="text-indigo-700 font-medium">{booking.cooperativeName}</p>
              <p className="text-slate-500">Category: {booking.serviceCategory.replace('_', ' ').toUpperCase()}</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3 text-center">Service Type</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-3">
                    <p className="font-semibold text-slate-900">{booking.serviceCategory.replace('_', ' ').toUpperCase()} Maintenance & Labor</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{booking.problemDescription}</p>
                  </td>
                  <td className="py-3 px-3 text-center capitalize">{booking.serviceCategory}</td>
                  <td className="py-3 px-3 text-right font-medium">₹{booking.serviceAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Breakdown summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
            <div className="text-xs text-slate-500 max-w-xs space-y-1">
              <p className="font-semibold text-slate-700">Cooperative Dividend Guarantee:</p>
              <p className="text-[11px] leading-relaxed">
                Under the Apex Union cooperative charter, platform administration fees are capped to guarantee fair wages directly to trade workers.
              </p>
            </div>

            <div className="w-full sm:w-72 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Gross Service Charge:</span>
                <span>₹{booking.serviceAmount}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>Platform/Cooperative Fee (10%):</span>
                <span>₹{booking.platformCommission || Math.round(booking.serviceAmount * 0.1)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold text-[11px]">
                <span>Worker Net Disbursed:</span>
                <span>₹{booking.workerPayout || Math.round(booking.serviceAmount * 0.9)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-950 text-sm">
                <span>Total Settled:</span>
                <span>₹{booking.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
            This is a computer-generated voucher issued under the Apex Union Labour Cooperative Framework.
          </div>
        </div>
      </div>
    </div>
  );
};
