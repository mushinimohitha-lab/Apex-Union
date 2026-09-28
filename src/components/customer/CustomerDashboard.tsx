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
  Navigation
} from 'lucide-react';
import { CategoryIcon } from '../common/IconHelper';
import { NaturalLanguageRequest } from './NaturalLanguageRequest';
import { WorkerCard } from './WorkerCard';
import { rankWorkersByRecommendation } from '../../services/recommendationEngine';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

export const CustomerDashboard: React.FC = () => {
  const {
    currentUser,
    workers,
    serviceCategories,
    cooperatives,
    bookings,
    reviews,
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
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryKey>('plumbing');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(true);
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'available'>('available');
  const [maxDistance, setMaxDistance] = useState<number>(15);
  const [selectedCoopFilter, setSelectedCoopFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'recommendations' | 'my_bookings' | 'history'>('recommendations');

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
    // Filter base pool
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

    // Score and rank
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Welcome back, {currentUser.name}
            </h1>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Customer Account
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
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Bookings</span>
            <span className="text-lg font-bold text-slate-900">{activeBookings.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed</span>
            <span className="text-lg font-bold text-emerald-700">{completedBookings.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Recommended</span>
            <span className="text-lg font-bold text-amber-600">{rankedWorkers.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Spent</span>
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
                Active Service in Progress ({activeBookings.length})
              </h3>
            </div>
            <DemoIntegrationBadge status="demo" label="Live Tracking Active" />
          </div>

          <div className="space-y-3">
            {activeBookings.map(b => (
              <div
                key={b.id}
                className="bg-white rounded-xl p-4 border border-amber-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={b.workerAvatar}
                    alt={b.workerName}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-amber-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{b.workerName}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 capitalize">
                      {b.serviceCategory.replace('_', ' ')} · {b.cooperativeName}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                      {b.problemDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleTrackBooking(b)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-400" />
                    <span>Track on Demo Map</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'recommendations'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            AI Recommended Workers ({rankedWorkers.length})
          </button>
          <button
            onClick={() => setActiveTab('my_bookings')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'my_bookings'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            My Bookings ({customerBookings.length})
          </button>
        </div>

        <span className="text-xs text-slate-500 hidden sm:inline">
          Showing verified cooperative workforce
        </span>
      </div>

      {activeTab === 'recommendations' ? (
        <div className="space-y-6">
          {/* Quick Service Categories Carousel / Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Select Service Category
              </h2>
              <span className="text-xs text-slate-400">8 Registered Trade Disciplines</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {serviceCategories.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/10'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <CategoryIcon
                      categoryKey={cat.id}
                      className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`}
                    />
                    <span className="text-[11px] font-semibold truncate w-full">{cat.name}</span>
                    <span
                      className={`text-[9px] ${
                        isSelected ? 'text-slate-300' : 'text-slate-400'
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
                  placeholder="Search by worker name, specialized skill, or cooperative..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Cooperative Filter */}
              <div className="sm:w-64">
                <select
                  value={selectedCoopFilter}
                  onChange={e => setSelectedCoopFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                >
                  <option value="all">All Participating Cooperatives</option>
                  {cooperatives.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sub-filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={filterVerifiedOnly}
                    onChange={e => setFilterVerifiedOnly(e.target.checked)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span>Cooperative Verified Only</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={filterAvailability === 'available'}
                    onChange={e =>
                      setFilterAvailability(e.target.checked ? 'available' : 'all')
                    }
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span>Available Immediately</span>
                </label>
              </div>

              {/* Max Distance Slider */}
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[11px]">Radius:</span>
                <input
                  type="range"
                  min="2"
                  max="25"
                  step="1"
                  value={maxDistance}
                  onChange={e => setMaxDistance(Number(e.target.value))}
                  className="w-24 accent-slate-900"
                />
                <span className="font-bold text-slate-800 text-xs">{maxDistance} km</span>
              </div>
            </div>
          </div>

          {/* Workers Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>AI Recommended Workers</span>
                  <DemoIntegrationBadge status="implemented" label="Weighted Scoring Engine" />
                </h3>
                <p className="text-xs text-slate-500">
                  Ranked by Skill Match (35%) · Distance (20%) · Availability (15%) · Experience (10%) · Rating (10%) · Verification (10%)
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                {rankedWorkers.length} Artisans Available
              </span>
            </div>

            {rankedWorkers.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
                <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">No Workers Match Current Filters</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting the maximum distance slider, unchecking immediate availability, or switching trade category.
                </p>
                <button
                  onClick={() => {
                    setMaxDistance(25);
                    setFilterAvailability('all');
                    setSelectedCoopFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Reset Search Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rankedWorkers.map((item, idx) => (
                  <WorkerCard
                    key={item.worker.id}
                    worker={item.worker}
                    scoreData={item.scoreData}
                    isTopRecommendation={idx === 0}
                    onViewProfile={handleViewProfile}
                    onBookWorker={handleBookWorker}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* My Bookings Tab */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Your Booking Records ({customerBookings.length})
            </h2>
            <span className="text-xs text-slate-500">Full lifecycle & invoices</span>
          </div>

          {customerBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800">No Bookings Found</h4>
              <p className="text-xs text-slate-500 mt-1">
                You haven't requested any services yet. Explore recommended workers to book!
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
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          Booking #{b.id} · {b.serviceCategory.replace('_', ' ').toUpperCase()}
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
                      </div>

                      <p className="text-xs text-slate-600">
                        Worker: <span className="font-semibold text-slate-800">{b.workerName}</span> · {b.cooperativeName}
                      </p>
                      <p className="text-[11px] text-slate-500">{b.problemDescription}</p>
                      <p className="text-[11px] text-slate-400">
                        Scheduled: {b.scheduledDate} ({b.scheduledTime}) · Address: {b.customerAddress}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Payment Status */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 self-end md:self-center shrink-0">
                    <div className="text-right sm:mr-3">
                      <span className="text-sm font-bold text-slate-900 block">₹{b.totalAmount}</span>
                      <span className="text-[10px] uppercase font-semibold text-emerald-700">
                        {b.paymentStatus === 'paid' ? 'Paid (Settled)' : 'Payment Pending'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleTrackBooking(b)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5 text-slate-600" />
                      <span>Track / Progress</span>
                    </button>

                    {b.status === 'COMPLETED' && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedBooking(b);
                            setIsInvoiceModalOpen(true);
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg flex items-center gap-1"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>Invoice</span>
                        </button>

                        {!b.reviewId ? (
                          <button
                            onClick={() => {
                              setSelectedBooking(b);
                              setIsReviewModalOpen(true);
                            }}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1"
                          >
                            <Star className="w-3.5 h-3.5 text-amber-400" />
                            <span>Rate Service</span>
                          </button>
                        ) : (
                          <span className="text-xs text-amber-600 font-semibold px-2 py-1">
                            ✓ Reviewed
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
    </div>
  );
};
