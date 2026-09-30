import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { CooperativeDashboard } from './components/cooperative/CooperativeDashboard';
import { PlatformAdminDashboard } from './components/platform/PlatformAdminDashboard';
import { AIFeaturesPage } from './components/pages/AIFeaturesPage';
import { AboutPage } from './components/pages/AboutPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { WorkerDashboard } from './components/worker/WorkerDashboard';

// Modals
import { BookingModal } from './components/modals/BookingModal';
import { BookingTrackingModal } from './components/modals/BookingTrackingModal';
import { PaymentModal } from './components/modals/PaymentModal';
import { InvoiceModal } from './components/modals/InvoiceModal';
import { ReviewModal } from './components/modals/ReviewModal';
import { WorkerProfileModal } from './components/modals/WorkerProfileModal';
import { WorkerVerificationModal } from './components/modals/WorkerVerificationModal';
import { TryDemoModal } from './components/modals/TryDemoModal';
import { PageNavigationHeader } from './components/common/PageNavigationHeader';
import { ServiceCategoryKey, UserRole } from './types';
import { ShieldCheck, UserCheck, X } from 'lucide-react';

const VIEW_MAP: Record<string, { label: string; role?: UserRole }> = {
  landing: { label: 'Home' },
  customer_dashboard: { label: 'Customer Portal', role: 'customer' },
  worker_dashboard: { label: 'Worker Portal', role: 'cooperative_worker' },
  cooperative_dashboard: { label: 'Cooperative Admin', role: 'cooperative_admin' },
  platform_dashboard: { label: 'Platform Admin', role: 'platform_admin' },
  ai_features: { label: 'AI Features' },
  about: { label: 'About Apex Union' },
  privacy: { label: 'Privacy Policy' }
};

const VIEW_ORDER = [
  'landing',
  'customer_dashboard',
  'worker_dashboard',
  'cooperative_dashboard',
  'platform_dashboard',
  'ai_features',
  'about',
  'privacy'
];

const MainAppContent: React.FC = () => {
  const {
    currentUser,
    switchRole,
    selectedWorker,
    setSelectedWorker,
    selectedBooking,
    selectedDocumentInspection,
    setSelectedDocumentInspection,
    isBookingModalOpen,
    setIsBookingModalOpen,
    isTrackingModalOpen,
    setIsTrackingModalOpen,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    isInvoiceModalOpen,
    setIsInvoiceModalOpen,
    isReviewModalOpen,
    setIsReviewModalOpen,
    isWorkerProfileModalOpen,
    setIsWorkerProfileModalOpen,
    isTryDemoModalOpen,
    setIsTryDemoModalOpen
  } = useApp();

  const [history, setHistory] = useState<string[]>(['landing']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const currentView = history[historyIndex] || 'landing';

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<ServiceCategoryKey>('plumbing');

  // Customer Registration Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regLocation, setRegLocation] = useState('Banjara Hills, Hyderabad');
  const [regLanguage, setRegLanguage] = useState<'en' | 'te' | 'hi'>('en');
  const [authError, setAuthError] = useState('');

  const handleNavigate = (view: string) => {
    if (view === 'terms') {
      handleNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById('terms-and-conditions');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    // Role auto-synchronization for separate portals
    if (view === 'customer_dashboard' && currentUser.role !== 'customer') {
      switchRole('customer');
    } else if (view === 'worker_dashboard' && currentUser.role !== 'cooperative_worker') {
      switchRole('cooperative_worker');
    } else if (view === 'cooperative_dashboard' && currentUser.role !== 'cooperative_admin') {
      switchRole('cooperative_admin');
    } else if (view === 'platform_dashboard' && currentUser.role !== 'platform_admin') {
      switchRole('platform_admin');
    }

    if (view === currentView) return;

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(view);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (historyIndex > 0) {
      const prevView = history[historyIndex - 1];
      if (VIEW_MAP[prevView]?.role && currentUser.role !== VIEW_MAP[prevView].role) {
        switchRole(VIEW_MAP[prevView].role!);
      }
      setHistoryIndex(historyIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const currIdx = VIEW_ORDER.indexOf(currentView);
      const prevIdx = currIdx > 0 ? currIdx - 1 : VIEW_ORDER.length - 1;
      const targetView = VIEW_ORDER[prevIdx];
      handleNavigate(targetView);
    }
  };

  const handleGoForward = () => {
    if (historyIndex < history.length - 1) {
      const nextView = history[historyIndex + 1];
      if (VIEW_MAP[nextView]?.role && currentUser.role !== VIEW_MAP[nextView].role) {
        switchRole(VIEW_MAP[nextView].role!);
      }
      setHistoryIndex(historyIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const currIdx = VIEW_ORDER.indexOf(currentView);
      const nextIdx = (currIdx + 1) % VIEW_ORDER.length;
      const targetView = VIEW_ORDER[nextIdx];
      handleNavigate(targetView);
    }
  };

  const prevPageName = historyIndex > 0
    ? VIEW_MAP[history[historyIndex - 1]]?.label || 'Previous'
    : VIEW_MAP[VIEW_ORDER[(VIEW_ORDER.indexOf(currentView) - 1 + VIEW_ORDER.length) % VIEW_ORDER.length]]?.label || 'Previous';

  const nextPageName = historyIndex < history.length - 1
    ? VIEW_MAP[history[historyIndex + 1]]?.label || 'Next'
    : VIEW_MAP[VIEW_ORDER[(VIEW_ORDER.indexOf(currentView) + 1) % VIEW_ORDER.length]]?.label || 'Next';

  const handleCategorySelectFromLanding = (cat: ServiceCategoryKey) => {
    setActiveCategoryFilter(cat);
    handleNavigate('customer_dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }
    if (regPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    setAuthError('');
    // Update active user & redirect to customer dashboard
    switchRole('customer');
    currentUser.name = regName || 'Valued Customer';
    currentUser.phone = regPhone || '+91 98490 00000';
    currentUser.email = regEmail || 'user@example.com';
    currentUser.location = regLocation;
    currentUser.preferredLanguage = regLanguage;

    setShowAuthModal(false);
    handleNavigate('customer_dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onBack={handleGoBack}
        onMove={handleGoForward}
        prevPageName={prevPageName}
        nextPageName={nextPageName}
      />

      {/* Persistent Page Navigation Bar with Back & Move Arrows across ALL pages */}
      <PageNavigationHeader
        currentView={currentView}
        onNavigate={handleNavigate}
        onBack={handleGoBack}
        onMove={handleGoForward}
        prevPageName={prevPageName}
        nextPageName={nextPageName}
      />

      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onNavigate={handleNavigate}
            onSelectCategory={handleCategorySelectFromLanding}
            onBack={handleGoBack}
            onMove={handleGoForward}
            prevPageName={prevPageName}
            nextPageName={nextPageName}
          />
        )}

        {currentView === 'customer_dashboard' && (
          <CustomerDashboard
            onNavigate={handleNavigate}
            onBack={handleGoBack}
            onMove={handleGoForward}
            prevPageName={prevPageName}
            nextPageName={nextPageName}
          />
        )}

        {currentView === 'worker_dashboard' && (
          <WorkerDashboard
            onNavigate={handleNavigate}
            onBack={handleGoBack}
            onMove={handleGoForward}
            prevPageName={prevPageName}
            nextPageName={nextPageName}
          />
        )}

        {currentView === 'cooperative_dashboard' && (
          <CooperativeDashboard
            onNavigate={handleNavigate}
            onBack={handleGoBack}
            onMove={handleGoForward}
            prevPageName={prevPageName}
            nextPageName={nextPageName}
          />
        )}

        {currentView === 'platform_dashboard' && (
          <PlatformAdminDashboard
            onNavigate={handleNavigate}
            onBack={handleGoBack}
            onMove={handleGoForward}
            prevPageName={prevPageName}
            nextPageName={nextPageName}
          />
        )}

        {currentView === 'ai_features' && (
          <AIFeaturesPage
            onNavigate={handleNavigate}
            onBack={handleGoBack}
            onMove={handleGoForward}
            prevPageName={prevPageName}
            nextPageName={nextPageName}
          />
        )}

        {currentView === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onBack={handleGoBack}
            onMove={handleGoForward}
            prevPageName={prevPageName}
            nextPageName={nextPageName}
          />
        )}

        {currentView === 'privacy' && (
          <PrivacyPage
            onNavigate={handleNavigate}
            onBack={handleGoBack}
            onMove={handleGoForward}
            prevPageName={prevPageName}
            nextPageName={nextPageName}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Interactive Modals */}
      <BookingModal
        worker={selectedWorker}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <BookingTrackingModal
        booking={selectedBooking}
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
      />

      <PaymentModal
        booking={selectedBooking}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      <InvoiceModal
        booking={selectedBooking}
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
      />

      <ReviewModal
        booking={selectedBooking}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      <WorkerProfileModal
        worker={selectedWorker}
        isOpen={isWorkerProfileModalOpen}
        onClose={() => setIsWorkerProfileModalOpen(false)}
        onOpenBooking={w => {
          setSelectedWorker(w);
          setIsBookingModalOpen(true);
        }}
      />

      <WorkerVerificationModal
        data={selectedDocumentInspection}
        isOpen={!!selectedDocumentInspection}
        onClose={() => setSelectedDocumentInspection(null)}
      />

      <TryDemoModal
        isOpen={isTryDemoModalOpen}
        onClose={() => setIsTryDemoModalOpen(false)}
        onNavigateView={handleNavigate}
      />

      {/* Customer Registration Modal (PRD Section 8) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-6">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  Customer Portal
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {authMode === 'register' ? 'Register as Customer' : 'Customer Sign In'}
                </h3>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="mt-4 space-y-3 text-xs">
              {authError && (
                <div className="p-2 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg">
                  {authError}
                </div>
              )}

              {authMode === 'register' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="e.g. Ananya Rao"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={regPhone}
                  onChange={e => setRegPhone(e.target.value)}
                  placeholder="+91 98490 12345"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="ananya.rao@example.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={e => setRegConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Location / City</label>
                    <input
                      type="text"
                      required
                      value={regLocation}
                      onChange={e => setRegLocation(e.target.value)}
                      placeholder="e.g. Banjara Hills, Hyderabad"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Preferred Language</label>
                    <select
                      value={regLanguage}
                      onChange={e => setRegLanguage(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    >
                      <option value="en">English</option>
                      <option value="te">తెలుగు (Telugu)</option>
                      <option value="hi">हिंदी (Hindi)</option>
                    </select>
                  </div>
                </>
              )}

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'register' ? 'login' : 'register')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {authMode === 'register' ? 'Already have an account? Sign In' : 'Need an account? Register'}
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm"
                >
                  {authMode === 'register' ? 'Create Customer Profile' : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
