import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCategoryKey, Worker, Booking } from '../../types';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  Receipt,
  Star,
  Users,
  Building2,
  SlidersHorizontal,
  ChevronRight,
  Navigation,
  Check,
  Compass,
  MessageSquareQuote,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { CategoryIcon } from '../common/IconHelper';
import { NaturalLanguageRequest } from './NaturalLanguageRequest';
import { WorkerCard } from './WorkerCard';
import { rankWorkersByRecommendation } from '../../services/recommendationEngine';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';
import { VoiceInputButton } from '../common/VoiceInputButton';

interface CustomerDashboardProps {
  onNavigate?: (view: string) => void;
  onBack?: () => void;
  onMove?: () => void;
  prevPageName?: string;
  nextPageName?: string;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  onNavigate,
  onBack,
  onMove,
  prevPageName = 'Home',
  nextPageName = 'Cooperative Admin'
}) => {
  const {
    currentUser,
    workers,
    serviceCategories,
    cooperatives,
    bookings,
    reviews,
    t,
    setSelectedWorker,
    setIsWorkerProfileModalOpen,
    setSelectedBooking,
    setIsBookingModalOpen,
    setIsTrackingModalOpen,
    setIsPaymentModalOpen,
    setIsInvoiceModalOpen,
    setIsReviewModalOpen
  } = useApp();

  // State
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryKey>('ac_servicing');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(true);
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'available'>('available');
  const [maxDistance, setMaxDistance] = useState<number>(15);
  const [selectedCoopFilter, setSelectedCoopFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'recommendations' | 'my_bookings' | 'locations_map' | 'reviews_hub'>('recommendations');

  // Customer statistics
  const customerBookings = useMemo(
    () => bookings.filter(b => b.customerId === currentUser.id),
    [bookings, currentUser.id]
  );

  const activeBookings = useMemo(
    () => customerBookings.filter(b => b.status !== 'COMPLETED' && b.status !== 'CANCELLED'),
    [customerBookings]
  );

  const completedBookings = useMemo(
    () => customerBookings.filter(b => b.status === 'COMPLETED'),
    [customerBookings]
  );

  const totalSpent = useMemo(
    () => completedBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0),
    [completedBookings]
  );

  // Ranked AI recommended workers
  const rankedWorkers = useMemo(() => {
    let pool = workers.filter(w => {
      if (selectedCategory && w.serviceCategory !== selectedCategory) return false;
      if (filterVerifiedOnly && w.verificationStatus !== 'verified') return false;
      if (filterAvailability === 'available' && w.availability !== 'available') return false;
      if (selectedCoopFilter !== 'all' && w.cooperativeId !== selectedCoopFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = w.name.toLowerCase().includes(q);
        const matchSkill = w.skills.some(s => s.toLowerCase().includes(q));
        const matchCoop = w.cooperativeName.toLowerCase().includes(q);
        if (!matchName && !matchSkill && !matchCoop) return false;
      }
      return true;
    });

    return rankWorkersByRecommendation(pool, {
      category: selectedCategory,
      customerLat: 17.4156,
      customerLng: 78.4350,
      maxDistanceKm: maxDistance,
      preferredCooperativeId: selectedCoopFilter !== 'all' ? selectedCoopFilter : undefined
    }).filter(item => item.scoreData.distanceKm <= maxDistance);
  }, [
    workers,
    selectedCategory,
    filterVerifiedOnly,
    filterAvailability,
    selectedCoopFilter,
    searchQuery,
    maxDistance
  ]);

  const handleBookWorker = (w: Worker) => {
    setSelectedWorker(w);
    setIsBookingModalOpen(true);
  };

  const handleViewProfile = (w: Worker) => {
    setSelectedWorker(w);
    setIsWorkerProfileModalOpen(true);
  };

  const handleTrackBooking = (b: Booking) => {
    setSelectedBooking(b);
    setIsTrackingModalOpen(true);
  };

  const handlePayBooking = (b: Booking) => {
    setSelectedBooking(b);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* In-Page Navigation Bar (Back & Move Arrows) */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer group"
          title={`Go back to ${prevPageName}`}
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
          <span className="hidden sm:inline text-slate-500 font-normal">({prevPageName})</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-md">
            Customer Portal
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <button
            onClick={() => onNavigate && onNavigate('cooperative_dashboard')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-semibold transition-colors cursor-pointer"
            title="Switch to Cooperative Admin Portal"
          >
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Switch to Cooperative Admin</span>
          </button>
        </div>

        <button
          onClick={onMove}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer group shadow-2xs"
          title={`Move forward to ${nextPageName}`}
        >
          <span>Move</span>
          <span className="hidden sm:inline font-semibold">({nextPageName})</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t('customer.welcome')}, {currentUser.name}
            </h1>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
              {t('customer.badge')}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>Service Base: {currentUser.location}</span>
          </p>
        </div>

        {/* Dashboard 4 Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('customer.active_bookings')}</span>
            <span className="text-lg font-bold text-slate-900">{activeBookings.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('customer.completed')}</span>
            <span className="text-lg font-bold text-emerald-700">{completedBookings.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('customer.tab_recommendations')}</span>
            <span className="text-lg font-bold text-amber-600">{rankedWorkers.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t('customer.total_spent')}</span>
            <span className="text-lg font-bold text-slate-900">₹{totalSpent}</span>
          </div>
        </div>
      </div>

      {/* Natural Language Problem Classifier Feature */}
      <NaturalLanguageRequest
        activeCategory={selectedCategory}
        onCategorySelected={(cat, prompt) => {
          setSelectedCategory(cat);
          setSearchQuery(prompt);
          setActiveTab('recommendations');
        }}
      />

      {/* Active In-Progress / Dispatched Bookings Tracker Bar */}
      {activeBookings.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-300 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between pb-3 border-b border-amber-200/80 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <h3 className="font-bold text-slate-900 text-sm">
                {t('customer.active_service_title')} ({activeBookings.length})
              </h3>
            </div>
            <span className="text-xs font-semibold text-amber-900 bg-amber-200/60 px-2.5 py-0.5 rounded-md">
              Live Dispatch Simulation
            </span>
          </div>

          <div className="space-y-2.5">
            {activeBookings.map(b => (
              <div
                key={b.id}
                className="bg-white rounded-xl p-3.5 border border-amber-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={b.workerAvatar}
                    alt={b.workerName}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{b.workerName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase">
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 capitalize">
                      {t(`cat.${b.serviceCategory}`, b.serviceCategory.replace('_', ' '))} · {b.cooperativeName}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5 truncate max-w-[280px]">
                      {b.problemDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {b.paymentStatus === 'pending' && (
                    <button
                      onClick={() => handlePayBooking(b)}
                      className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>{t('payment.pay_now')}</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleTrackBooking(b)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('customer.track_on_map')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'recommendations'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t('customer.tab_recommendations')} ({rankedWorkers.length})
          </button>
          <button
            onClick={() => setActiveTab('my_bookings')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'my_bookings'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t('customer.tab_bookings')} ({customerBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('locations_map')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'locations_map'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-rose-500" />
            <span>{t('customer.tab_locations')}</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews_hub')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reviews_hub'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('customer.tab_reviews')} ({reviews.length})</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 hidden sm:inline">
          Showing verified cooperative workforce
        </span>
      </div>

      {/* Tab 1: AI Recommended Workers */}
      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          {/* Quick Service Categories Carousel / Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {t('customer.categories_title')}
              </h2>
              <span className="text-xs text-slate-400">10 Registered Trade Disciplines</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2">
              {serviceCategories.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/10'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <CategoryIcon
                      categoryKey={cat.id}
                      className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`}
                    />
                    <span className="text-[11px] font-semibold truncate w-full">
                      {t(`cat.${cat.id}`, cat.name)}
                    </span>
                    <span
                      className={`text-[9px] font-mono ${
                        isSelected ? 'text-amber-300' : 'text-slate-400'
                      }`}
                    >
                      ₹{cat.basePrice}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('customer.search_placeholder')}
                  className="w-full pl-9 pr-11 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
                  <VoiceInputButton
                    onTranscript={(text) => setSearchQuery(text)}
                    currentValue={searchQuery}
                    variant="icon"
                  />
                </div>
              </div>

              {/* Cooperative Filter */}
              <div className="sm:w-64">
                <select
                  value={selectedCoopFilter}
                  onChange={e => setSelectedCoopFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                >
                  <option value="all">{t('customer.filter_coop')}</option>
                  {cooperatives.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Micro Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-4 flex-wrap">
                <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterVerifiedOnly}
                    onChange={e => setFilterVerifiedOnly(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-amber-400 w-3.5 h-3.5"
                  />
                  <span>{t('customer.filter_verified')}</span>
                </label>

                <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterAvailability === 'available'}
                    onChange={e => setFilterAvailability(e.target.checked ? 'available' : 'all')}
                    className="rounded text-amber-500 focus:ring-amber-400 w-3.5 h-3.5"
                  />
                  <span>{t('customer.filter_available')}</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500">{t('customer.filter_distance')}:</span>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="5"
                    value={maxDistance}
                    onChange={e => setMaxDistance(Number(e.target.value))}
                    className="w-24 accent-slate-900 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-800">{maxDistance} km</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Multi-factor AI weighted ranking active</span>
              </div>
            </div>
          </div>

          {/* Ranked Worker Cards Grid */}
          {rankedWorkers.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-sm">No Matching Cooperative Workers Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your distance radius or searching across all registered cooperatives.
              </p>
              <button
                onClick={() => {
                  setMaxDistance(25);
                  setSelectedCoopFilter('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rankedWorkers.map(item => (
                <WorkerCard
                  key={item.worker.id}
                  worker={item.worker}
                  scoreData={item.scoreData}
                  onBookWorker={handleBookWorker}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Bookings & Payments */}
      {activeTab === 'my_bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Service Bookings History ({customerBookings.length})
              </h2>
              <p className="text-xs text-slate-500">
                Track status in real-time, view invoices, and submit post-service ratings.
              </p>
            </div>
          </div>

          {customerBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
              <Clock className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-sm">No Bookings Yet</h3>
              <p className="text-xs text-slate-500">
                Pick a service category or speak your problem above to place your first booking!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {customerBookings.map(b => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={b.workerAvatar}
                      alt={b.workerName}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm">
                          Booking #{b.id} · {t(`cat.${b.serviceCategory}`, b.serviceCategory.replace('_', ' ').toUpperCase())}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                            b.status === 'COMPLETED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'CANCELLED'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {b.status}
                        </span>
                        {b.paymentStatus === 'paid' ? (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-200">
                            ✓ {t('payment.success')}
                          </span>
                        ) : (
                          <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold border border-amber-200">
                            Payment Pending
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600">
                        Artisan: <span className="font-semibold text-slate-800">{b.workerName}</span> · {b.cooperativeName}
                      </p>
                      <p className="text-[11px] text-slate-500">{b.problemDescription}</p>
                      <p className="text-[11px] text-slate-400">
                        Scheduled: {b.scheduledDate} ({b.scheduledTime}) · Address: {b.customerAddress}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Payment Trigger */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 self-end md:self-center shrink-0">
                    <div className="text-right sm:mr-3">
                      <span className="text-base font-bold text-slate-900 block">₹{b.totalAmount}</span>
                      <span className="text-[10px] uppercase font-semibold text-emerald-700">
                        {b.paymentStatus === 'paid' ? 'Paid (Cooperative Escrow)' : 'Amount Due'}
                      </span>
                    </div>

                    {b.paymentStatus !== 'paid' && (
                      <button
                        onClick={() => handlePayBooking(b)}
                        className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{t('payment.pay_now')}</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleTrackBooking(b)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5 text-slate-600" />
                      <span>{t('customer.track_progress')}</span>
                    </button>

                    {b.status === 'COMPLETED' && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedBooking(b);
                            setIsInvoiceModalOpen(true);
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>{t('customer.invoice')}</span>
                        </button>

                        {!b.reviewId ? (
                          <button
                            onClick={() => {
                              setSelectedBooking(b);
                              setIsReviewModalOpen(true);
                            }}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            <Star className="w-3.5 h-3.5 text-amber-400" />
                            <span>{t('customer.rate_service')}</span>
                          </button>
                        ) : (
                          <span className="text-xs text-amber-600 font-semibold px-2 py-1">
                            {t('customer.reviewed')}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Locations & Live Map */}
      {activeTab === 'locations_map' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-500" />
                <span>{t('customer.tab_locations')}</span>
              </h2>
              <p className="text-xs text-slate-500">
                Visualizing verified cooperative artisans within your selected radius ({maxDistance} km).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 font-semibold">{t('customer.your_location', 'Your Location')}:</span>
              <span className="text-xs font-bold text-slate-900 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">
                📍 {currentUser.location}
              </span>
            </div>
          </div>

          {/* Interactive Map Canvas Simulation */}
          <div className="relative w-full h-96 bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-inner flex items-center justify-center">
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Radar Proximity Circles */}
            <div className="absolute w-72 h-72 rounded-full border border-indigo-500/20 animate-pulse pointer-events-none" />
            <div className="absolute w-48 h-48 rounded-full border border-indigo-400/30 pointer-events-none" />
            <div className="absolute w-24 h-24 rounded-full border border-indigo-300/40 pointer-events-none" />

            {/* Customer Center Marker */}
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg ring-4 ring-rose-500/40 animate-bounce">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="mt-1 px-2 py-0.5 rounded bg-slate-950/80 text-white text-[10px] font-bold border border-rose-500/50">
                You ({currentUser.location.split(',')[0]})
              </span>
            </div>

            {/* Render Verified Workers around customer location */}
            {workers.slice(0, 10).map((w, i) => {
              // Calculate deterministic relative offsets for visual simulation
              const angle = (i * (360 / 10)) * (Math.PI / 180);
              const radius = 60 + (i % 4) * 28;
              const left = `calc(50% + ${Math.cos(angle) * radius}px)`;
              const top = `calc(50% + ${Math.sin(angle) * radius}px)`;

              return (
                <div
                  key={w.id}
                  style={{ position: 'absolute', left, top, transform: 'translate(-50%, -50%)' }}
                  className="z-10 group cursor-pointer"
                  onClick={() => handleViewProfile(w)}
                >
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs ring-2 ring-slate-900 shadow-md group-hover:scale-125 transition-transform">
                      <CategoryIcon categoryKey={w.serviceCategory} className="w-3.5 h-3.5" />
                    </div>
                    {/* Tooltip Hover Card */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-slate-950 text-white p-2 rounded-lg border border-slate-700 shadow-xl min-w-[150px] z-30 pointer-events-none">
                      <span className="font-bold text-xs text-amber-300">{w.name}</span>
                      <span className="text-[10px] text-slate-300 capitalize">{w.serviceCategory.replace('_', ' ')} · ⭐ {w.rating}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">{w.location.neighborhood}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-700 text-white text-[11px] space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>{t('customer.your_location', 'Your Location')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>{t('customer.verified_pin', 'Verified Cooperative Worker')}</span>
              </div>
            </div>
          </div>

          {/* Location Worker List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t('customer.vicinity_title', 'Artisans in your vicinity')} ({workers.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {workers.slice(0, 6).map(w => (
                <div
                  key={w.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={w.avatarUrl} alt={w.name} className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-200" />
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{w.name}</p>
                      <p className="text-[10px] text-slate-500">{w.location.neighborhood}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBookWorker(w)}
                    className="px-2.5 py-1 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md cursor-pointer"
                  >
                    {t('customer.book_worker', 'Book')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Customer Reviews Hub */}
      {activeTab === 'reviews_hub' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>{t('reviews.title')}</span>
              </h2>
              <p className="text-xs text-slate-500">
                100% genuine reviews submitted by verified cooperative service recipients.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xl font-black text-slate-900">4.92 / 5.0</span>
                <span className="text-[10px] text-emerald-600 block font-semibold">Federation Trust Score</span>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map(r => (
              <div key={r.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">{r.customerName}</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-700 italic">"{r.comment}"</p>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-1">
                    {r.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400">{r.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
