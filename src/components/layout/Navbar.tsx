import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, LanguageCode } from '../../types';
import {
  ShieldCheck,
  MapPin,
  Bell,
  Check,
  ChevronDown,
  Layers,
  Sparkles,
  Building2,
  UserCheck,
  Home,
  X,
  ScrollText,
  Globe2,
  Info,
  ArrowLeft,
  ArrowRight,
  Users
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';
import { AULogo } from '../common/AULogo';
import { SUPPORTED_LANGUAGES_LIST } from '../../utils/translations';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onBack?: () => void;
  onMove?: () => void;
  prevPageName?: string;
  nextPageName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onBack,
  onMove,
  prevPageName = 'Previous',
  nextPageName = 'Next'
}) => {
  const {
    currentUser,
    currentLanguage,
    t,
    switchRole,
    updateCustomerLocation,
    updateLanguage,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setSelectedBooking,
    setIsTrackingModalOpen,
    bookings
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tempLocation, setTempLocation] = useState(currentUser.location);

  const unreadCount = notifications.filter(n => !n.read).length;
  const currentLangObj = SUPPORTED_LANGUAGES_LIST.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES_LIST[0];

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setShowRoleMenu(false);
    if (role === 'customer') onNavigate('customer_dashboard');
    else if (role === 'cooperative_admin') onNavigate('cooperative_dashboard');
    else if (role === 'platform_admin') onNavigate('platform_dashboard');
  };

  const handleLocationSave = () => {
    updateCustomerLocation(tempLocation);
    setShowLocationModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        {/* Prototype Banner */}
        <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-400">{t('brand.name')}</span>
              <span className="text-slate-500">·</span>
              <span className="hidden sm:inline">{t('brand.subtitle')}</span>
            </div>
            <div className="flex items-center gap-3">
              <DemoIntegrationBadge status="demo" label="Verified Cooperative Platform" />
              <span className="text-slate-500">|</span>
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="text-slate-400">{t('nav.role')}:</span>
                <span className="text-white font-medium capitalize bg-slate-800 px-2 py-0.5 rounded">
                  {t(`role.${currentUser.role}`, currentUser.role.replace('_', ' '))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* AU Logo with Official Emblem Badge & Quick Navigation Arrows */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('landing')}
                className="flex items-center group text-left cursor-pointer transition-transform hover:scale-[1.02] focus:outline-none"
                aria-label="Apex Union AU Home"
              >
                <AULogo
                  size="sm"
                  variant="dark"
                  showText={true}
                  subtitle={t('brand.subtitle')}
                />
              </button>

              {/* Quick Navigation Arrows */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={onBack}
                  title={`Back to ${prevPageName}`}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-white hover:shadow-2xs transition-all cursor-pointer group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="hidden xl:inline">Back</span>
                </button>
                <button
                  onClick={onMove}
                  title={`Move to ${nextPageName}`}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-amber-950 bg-amber-300/80 hover:bg-amber-300 hover:shadow-2xs transition-all cursor-pointer group"
                >
                  <span className="hidden xl:inline">Move</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-900 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Navigation Links with Separate Customer & Cooperative Admin portals */}
              <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-slate-600">
                <button
                  onClick={() => onNavigate('landing')}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer text-xs ${
                    currentView === 'landing' ? 'text-slate-950 bg-slate-100 font-bold' : 'hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {t('nav.home')}
                </button>

                {/* SEPARATE: Customer Portal */}
                <button
                  onClick={() => {
                    switchRole('customer');
                    onNavigate('customer_dashboard');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentView === 'customer_dashboard'
                      ? 'bg-amber-400 text-slate-950 shadow-sm ring-2 ring-amber-400/50'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                  }`}
                  title="Enter Customer Portal"
                >
                  <Users className="w-3.5 h-3.5 text-amber-900" />
                  <span>Customer Portal</span>
                </button>

                {/* SEPARATE: Cooperative Admin */}
                <button
                  onClick={() => {
                    switchRole('cooperative_admin');
                    onNavigate('cooperative_dashboard');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentView === 'cooperative_dashboard'
                      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/50'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200'
                  }`}
                  title="Enter Cooperative Admin Portal"
                >
                  <Building2 className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Cooperative Admin</span>
                </button>

                <button
                  onClick={() => {
                    if (currentUser.role !== 'platform_admin') switchRole('platform_admin');
                    onNavigate('platform_dashboard');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer text-xs ${
                    currentView === 'platform_dashboard' ? 'text-emerald-950 bg-emerald-50 font-semibold' : 'hover:text-emerald-900 hover:bg-slate-50'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Federation</span>
                </button>

                <button
                  onClick={() => {
                    if (currentView !== 'landing') {
                      onNavigate('landing');
                      setTimeout(() => {
                        const el = document.getElementById('terms-and-conditions');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      const el = document.getElementById('terms-and-conditions');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer text-xs text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                >
                  <ScrollText className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t('nav.terms')}</span>
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer text-xs ${
                    currentView === 'about' ? 'text-slate-950 bg-slate-100 font-semibold' : 'hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {t('nav.about')}
                </button>
              </nav>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Location Selector (Customer) */}
              <button
                onClick={() => setShowLocationModal(true)}
                className="hidden md:flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg transition-colors border border-slate-200/60 cursor-pointer"
                title={t('nav.change_location')}
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="truncate max-w-[120px] font-medium">{currentUser.location.split(',')[0]}</span>
              </button>

              {/* Dynamic Regional Language Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowLangMenu(!showLangMenu);
                    setShowRoleMenu(false);
                    setShowNotifMenu(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold transition-all cursor-pointer"
                  title="Change Application Language"
                  aria-label="Change Application Language"
                >
                  <Globe2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{currentLangObj.nativeName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in max-h-96 overflow-y-auto">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Regional Languages / భాషలు / भाषाएँ
                      </span>
                    </div>
                    <div className="space-y-1">
                      {SUPPORTED_LANGUAGES_LIST.map(lang => {
                        const isSelected = currentLanguage === lang.code;
                        return (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => {
                              updateLanguage(lang.code);
                              setShowLangMenu(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-amber-50 text-amber-950 font-bold border border-amber-300'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900">{lang.nativeName}</span>
                              <span className="text-[10px] text-slate-400">({lang.label})</span>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifMenu(!showNotifMenu);
                    setShowRoleMenu(false);
                    setShowLangMenu(false);
                  }}
                  className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  aria-label={t('nav.notifications')}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifMenu && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 text-sm">{t('nav.notifications')}</span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          {notifications.length}
                        </span>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 mt-1">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-500 py-6 text-center">No notifications yet</p>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n.id}
                            onClick={() => {
                              markNotificationRead(n.id);
                              if (n.linkAction === 'track-booking') {
                                const activeB = bookings.find(b => b.status === 'ON THE WAY' || b.status === 'IN PROGRESS');
                                if (activeB) {
                                  setSelectedBooking(activeB);
                                  setIsTrackingModalOpen(true);
                                }
                              }
                            }}
                            className={`py-2.5 px-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors ${
                              !n.read ? 'bg-amber-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                              <span className="text-[10px] text-slate-400 shrink-0">
                                {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5 leading-snug">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Role Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowRoleMenu(!showRoleMenu);
                    setShowNotifMenu(false);
                    setShowLangMenu(false);
                  }}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all text-left cursor-pointer"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-300"
                  />
                  <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[110px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium capitalize">
                      {t(`role.${currentUser.role}`, currentUser.role.replace('_', ' '))}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {showRoleMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Switch Operational Portal
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Access Customer, Cooperative Admin, or Platform Admin portals.
                      </p>
                    </div>

                    <div className="space-y-1 mt-1">
                      {/* Customer */}
                      <button
                        onClick={() => handleRoleSelect('customer')}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                          currentUser.role === 'customer'
                            ? 'bg-amber-50 text-amber-950 font-semibold border border-amber-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                            <Home className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold">1. {t('role.customer')}</p>
                            <p className="text-[11px] text-slate-500">Service search, voice problem, booking</p>
                          </div>
                        </div>
                        {currentUser.role === 'customer' && <Check className="w-4 h-4 text-amber-700" />}
                      </button>

                      {/* Cooperative Admin */}
                      <button
                        onClick={() => handleRoleSelect('cooperative_admin')}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                          currentUser.role === 'cooperative_admin'
                            ? 'bg-indigo-50 text-indigo-950 font-semibold border border-indigo-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold">2. {t('role.cooperative_admin')}</p>
                            <p className="text-[11px] text-slate-500">Society workers, OCR approvals, allocation</p>
                          </div>
                        </div>
                        {currentUser.role === 'cooperative_admin' && <Check className="w-4 h-4 text-indigo-700" />}
                      </button>

                      {/* Platform Admin */}
                      <button
                        onClick={() => handleRoleSelect('platform_admin')}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                          currentUser.role === 'platform_admin'
                            ? 'bg-emerald-50 text-emerald-950 font-semibold border border-emerald-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold">3. {t('role.platform_admin')}</p>
                            <p className="text-[11px] text-slate-500">Multi-coop governance, tariffs, disputes</p>
                          </div>
                        </div>
                        {currentUser.role === 'platform_admin' && <Check className="w-4 h-4 text-emerald-700" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-slate-900 text-base">{t('nav.change_location')}</h3>
              </div>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-500">
                Worker recommendations and dispatch calculations use proximity to your chosen address.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Active Locality / Neighborhood
                </label>
                <input
                  type="text"
                  value={tempLocation}
                  onChange={e => setTempLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="e.g. Banjara Hills, Hyderabad"
                />
              </div>

              <div className="space-y-1 pt-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Quick Neighborhoods</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    'Banjara Hills, Hyderabad',
                    'Jubilee Hills, Hyderabad',
                    'Hitec City, Hyderabad',
                    'Madhapur, Hyderabad',
                    'Gachibowli, Hyderabad',
                    'Ameerpet, Hyderabad',
                    'Secunderabad, Hyderabad'
                  ].map(loc => (
                    <button
                      key={loc}
                      onClick={() => setTempLocation(loc)}
                      className={`text-xs px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                        tempLocation === loc
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {loc.split(',')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLocationSave}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs cursor-pointer"
                >
                  Save Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
