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
  Cpu,
  X,
  ScrollText
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';
import { ApexUnionEmblem } from '../common/ApexUnionEmblem';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const {
    currentUser,
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
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tempLocation, setTempLocation] = useState(currentUser.location);

  const unreadCount = notifications.filter(n => !n.read).length;

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
              <span className="font-semibold text-amber-400">APEX UNION PROTOTYPE</span>
              <span className="text-slate-500">·</span>
              <span className="hidden sm:inline">Connecting Skilled Workers, Cooperatives & Customers</span>
            </div>
            <div className="flex items-center gap-3">
              <DemoIntegrationBadge status="demo" label="Working Model" />
              <span className="text-slate-500">|</span>
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="text-slate-400">Active Role:</span>
                <span className="text-white font-medium capitalize bg-slate-800 px-2 py-0.5 rounded">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Professional Logo with Graphical Emblem Representing Unity & Skilled Workmanship */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('landing')}
                className="flex items-center group text-left cursor-pointer transition-transform hover:scale-[1.02] focus:outline-none"
                aria-label="Apex Union Home: Unity and Skilled Workmanship"
              >
                <ApexUnionEmblem
                  size="sm"
                  variant="dark"
                  showText={true}
                  subtitle="Labour Cooperatives Federation"
                />
              </button>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
                <button
                  onClick={() => onNavigate('landing')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    currentView === 'landing' ? 'text-slate-950 bg-slate-100 font-semibold' : 'hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    if (currentUser.role !== 'customer') switchRole('customer');
                    onNavigate('customer_dashboard');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    currentView === 'customer_dashboard' ? 'text-slate-950 bg-slate-100 font-semibold' : 'hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  Customer Portal
                </button>
                <button
                  onClick={() => onNavigate('ai_features')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    currentView === 'ai_features' ? 'text-indigo-950 bg-indigo-50 font-semibold' : 'hover:text-indigo-900 hover:bg-slate-50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>AI Architecture</span>
                </button>
                <button
                  onClick={() => onNavigate('tech_stack')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    currentView === 'tech_stack' ? 'text-slate-950 bg-slate-100 font-semibold' : 'hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-slate-500" />
                  <span>System Design</span>
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                >
                  <ScrollText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Terms & Conditions</span>
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    currentView === 'about' ? 'text-slate-950 bg-slate-100 font-semibold' : 'hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  About Union
                </button>
              </nav>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Location Selector (Customer) */}
              <button
                onClick={() => setShowLocationModal(true)}
                className="hidden lg:flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg transition-colors border border-slate-200/60"
                title="Change active location for distance matching"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="truncate max-w-[130px] font-medium">{currentUser.location.split(',')[0]}</span>
              </button>

              {/* Language Switcher */}
              <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs font-medium">
                {(['en', 'te', 'hi'] as LanguageCode[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => updateLanguage(lang)}
                    className={`px-2 py-1 rounded transition-colors ${
                      currentUser.preferredLanguage === lang
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'te' ? 'తెలుగు' : 'हिंदी'}
                  </button>
                ))}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifMenu(!showNotifMenu)}
                  className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="View notifications"
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
                        <span className="font-semibold text-slate-900 text-sm">Notifications</span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          {notifications.length}
                        </span>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
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
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all text-left"
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
                      {currentUser.role.replace('_', ' ')}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {showRoleMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Switch Operational Role
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Test end-to-end multi-role workflows as required by PRD.
                      </p>
                    </div>

                    <div className="space-y-1 mt-1">
                      {/* Customer */}
                      <button
                        onClick={() => handleRoleSelect('customer')}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors ${
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
                            <p className="text-xs font-semibold">1. Customer</p>
                            <p className="text-[11px] text-slate-500">Service search, NLP request, booking</p>
                          </div>
                        </div>
                        {currentUser.role === 'customer' && <Check className="w-4 h-4 text-amber-700" />}
                      </button>

                      {/* Cooperative Admin */}
                      <button
                        onClick={() => handleRoleSelect('cooperative_admin')}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors ${
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
                            <p className="text-xs font-semibold">2. Cooperative Admin</p>
                            <p className="text-[11px] text-slate-500">Workforce allocation, OCR & verifications</p>
                          </div>
                        </div>
                        {currentUser.role === 'cooperative_admin' && <Check className="w-4 h-4 text-indigo-700" />}
                      </button>

                      {/* Platform Admin */}
                      <button
                        onClick={() => handleRoleSelect('platform_admin')}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors ${
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
                            <p className="text-xs font-semibold">3. Platform Admin</p>
                            <p className="text-[11px] text-slate-500">Multi-coop governance, audits, global view</p>
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
                <h3 className="font-bold text-slate-900 text-base">Select Service Location</h3>
              </div>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
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
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Quick Demo Neighborhoods</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    'Banjara Hills, Hyderabad',
                    'Jubilee Hills, Hyderabad',
                    'Hitec City, Hyderabad',
                    'Gachibowli, Hyderabad',
                    'Ameerpet, Hyderabad',
                    'Secunderabad, Hyderabad'
                  ].map(loc => (
                    <button
                      key={loc}
                      onClick={() => setTempLocation(loc)}
                      className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
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
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLocationSave}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
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
