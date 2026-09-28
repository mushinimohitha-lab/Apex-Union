import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import {
  X,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Receipt,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface Props {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal: React.FC<Props> = ({ booking, isOpen, onClose }) => {
  const { processPayment, setIsInvoiceModalOpen } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'online' | 'qr' | 'cash'>('online');
  const [commissionRate, setCommissionRate] = useState<number>(10); // 10%
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen || !booking) return null;

  const serviceAmount = booking.serviceAmount || booking.totalAmount || 500;
  const platformFee = Math.round(serviceAmount * (commissionRate / 100));
  const workerAmount = serviceAmount - platformFee;
  const totalPayable = serviceAmount;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      processPayment(booking.id, paymentMethod);
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 800);
  };

  const handleViewInvoice = () => {
    onClose();
    setIsInvoiceModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Transparent Settlement
              </span>
              <DemoIntegrationBadge status="demo" label="Demo Payment Flow" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Cooperative Service Payment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Payment Completed (Demo)</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                ₹{totalPayable} received via {paymentMethod.toUpperCase()}. Worker payout credited to cooperative account.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left max-w-sm mx-auto space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-medium text-slate-800">TXN-DEMO-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Worker Share Credited:</span>
                <span className="font-semibold text-emerald-700">₹{workerAmount}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={handleViewInvoice}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <Receipt className="w-4 h-4 text-amber-400" />
                <span>View Official Invoice</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Service & Worker Summary */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Booking #{booking.id}</p>
                <p className="text-slate-500 capitalize">{booking.serviceCategory} Service</p>
                <p className="text-[11px] text-indigo-700 font-medium">{booking.workerName} ({booking.cooperativeName})</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Total Due</span>
                <span className="text-base font-bold text-slate-900">₹{totalPayable}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('online')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                    paymentMethod === 'online'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs font-semibold">Online / UPI</span>
                  <span className="text-[10px] opacity-75">Cards, GPay, PayTM</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('qr')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                    paymentMethod === 'qr'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="text-xs font-semibold">Coop QR Code</span>
                  <span className="text-[10px] opacity-75">Scan & Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                    paymentMethod === 'cash'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span className="text-xs font-semibold">Cash to Worker</span>
                  <span className="text-[10px] opacity-75">Direct Handover</span>
                </button>
              </div>
            </div>

            {/* QR Code Demo Screen if QR selected */}
            {paymentMethod === 'qr' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
                <div className="w-32 h-32 bg-white p-2 mx-auto rounded-lg shadow-sm border border-slate-200 flex items-center justify-center">
                  {/* Clean SVG QR Code Representation */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="#fff" />
                    {/* Top left corner marker */}
                    <rect x="10" y="10" width="25" height="25" fill="#0f172a" />
                    <rect x="15" y="15" width="15" height="15" fill="#fff" />
                    <rect x="19" y="19" width="7" height="7" fill="#0f172a" />
                    {/* Top right corner marker */}
                    <rect x="65" y="10" width="25" height="25" fill="#0f172a" />
                    <rect x="70" y="15" width="15" height="15" fill="#fff" />
                    <rect x="74" y="19" width="7" height="7" fill="#0f172a" />
                    {/* Bottom left corner marker */}
                    <rect x="10" y="65" width="25" height="25" fill="#0f172a" />
                    <rect x="15" y="70" width="15" height="15" fill="#fff" />
                    <rect x="19" y="74" width="7" height="7" fill="#0f172a" />
                    {/* Simulated data blocks */}
                    <rect x="42" y="15" width="6" height="12" fill="#0f172a" />
                    <rect x="52" y="22" width="6" height="6" fill="#0f172a" />
                    <rect x="42" y="38" width="16" height="6" fill="#0f172a" />
                    <rect x="65" y="45" width="20" height="6" fill="#0f172a" />
                    <rect x="12" y="45" width="18" height="6" fill="#0f172a" />
                    <rect x="45" y="55" width="10" height="18" fill="#0f172a" />
                    <rect x="62" y="65" width="14" height="14" fill="#0f172a" />
                    <rect x="80" y="72" width="8" height="16" fill="#0f172a" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-800">
                  Scan with BHIM / PhonePe / GPay
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  UPI ID: {booking.cooperativeName.toLowerCase().replace(/[^a-z]/g, '')}@coopupi
                </p>
              </div>
            )}

            {/* Configurable Commission & Transparent Breakdown */}
            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-amber-200">
                <span className="font-semibold text-slate-800">
                  Transparent Commission Breakdown
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-500">Union Share:</span>
                  <select
                    value={commissionRate}
                    onChange={e => setCommissionRate(Number(e.target.value))}
                    className="text-[11px] bg-white border border-amber-300 rounded px-1.5 py-0.5 font-bold"
                  >
                    <option value={5}>5%</option>
                    <option value={8}>8%</option>
                    <option value={10}>10% (Default)</option>
                    <option value={12}>12%</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-slate-700">
                <span>Service Amount</span>
                <span>₹{serviceAmount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span>Platform/Organization Commission ({commissionRate}%)</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-emerald-800 text-[11px]">
                <span>Direct Worker Net Payout (Transparent)</span>
                <span>₹{workerAmount}</span>
              </div>
              <div className="pt-1.5 border-t border-amber-200 flex items-center justify-between font-bold text-slate-900 text-sm">
                <span>Total Amount Due</span>
                <span>₹{totalPayable}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePay}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm flex items-center gap-2 transition-all"
              >
                {isProcessing ? (
                  <span>Authorizing (Demo)...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Pay ₹{totalPayable} (Demo)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
