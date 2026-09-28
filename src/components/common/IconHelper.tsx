import React from 'react';
import {
  Zap,
  Droplet,
  Hammer,
  Wind,
  Flower2,
  Paintbrush,
  Sparkles,
  Wrench,
  HeartHandshake,
  ShieldCheck,
  MapPin,
  Clock,
  Star,
  Users,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileText,
  CreditCard,
  QrCode,
  Banknote,
  Search,
  Sparkle,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  Share2,
  Download,
  Printer,
  X,
  ExternalLink,
  BrainCircuit,
  Cpu,
  Layers,
  BarChart3,
  SlidersHorizontal,
  UserCheck,
  Eye,
  Check,
  Maximize2
} from 'lucide-react';
import { ServiceCategoryKey } from '../../types';

export const ACIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Air Conditioner Icon"
  >
    {/* AC Indoor Split Unit Body */}
    <rect x="2" y="3" width="20" height="8" rx="2" />
    {/* Front vent panel dividing line */}
    <line x1="2" y1="8" x2="22" y2="8" />
    {/* Digital temperature indicator / status bar */}
    <line x1="16" y1="5.5" x2="18.5" y2="5.5" />
    {/* Bottom cooling airflow waves */}
    <path d="M6 14.5c.5 1.5 1.5 2.5 1.5 4.5" />
    <path d="M12 14v5.5" />
    <path d="M18 14.5c-.5 1.5-1.5 2.5-1.5 4.5" />
  </svg>
);

export const AirConditionerIcon = ACIcon;

export const PlumbingIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Plumbing Faucet and Pipe Icon"
  >
    {/* Wall pipe intake & mounting flange */}
    <path d="M2 12h5" />
    <path d="M2 9v6" />
    {/* Top valve control handle */}
    <path d="M5 4h6" />
    <path d="M8 4v4" />
    {/* Faucet body and curved spout pipe */}
    <path d="M7 10h6a4 4 0 0 1 4 4v2" />
    {/* Aerator nozzle rim */}
    <path d="M15 16h4" />
    {/* Water droplet falling from tap */}
    <path d="M17 19.8a1.2 1.2 0 0 1-1.2 1.2c-.7 0-1.2-.5-1.2-1.2 0-.8 1.2-2 1.2-2s1.2 1.2 1.2 2z" fill="currentColor" />
  </svg>
);

export const CleaningIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Cleaning Spray and Sanitization Icon"
  >
    {/* Spray nozzle top cap & dispenser */}
    <path d="M14 4h-5" />
    <path d="M9 4v3h5V4" />
    {/* Spray nozzle tip */}
    <path d="M14 5.5h2" />
    {/* Ergonomic trigger lever */}
    <path d="M9 7l-3 4" />
    {/* Cleaning bottle neck, contoured shoulders & body */}
    <path d="M10 7v3l-3 2v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9l-3-2V7" />
    {/* Liquid measure line */}
    <line x1="8.5" y1="16" x2="13.5" y2="16" strokeDasharray="1 2" />
    {/* Sparkling clean mist & shine */}
    <path d="M19 3v4" />
    <path d="M17 5h4" />
    <circle cx="20" cy="11" r="1" fill="currentColor" />
  </svg>
);

export const CategoryIcon: React.FC<{
  categoryKey: ServiceCategoryKey | string;
  className?: string;
}> = ({ categoryKey, className = 'w-5 h-5' }) => {
  switch (categoryKey) {
    case 'electrical':
      return <Zap className={className} />;
    case 'plumbing':
      return <PlumbingIcon className={className} />;
    case 'carpentry':
      return <Hammer className={className} />;
    case 'ac_service':
      return <ACIcon className={className} />;
    case 'gardening':
      return <Flower2 className={className} />;
    case 'painting':
      return <Paintbrush className={className} />;
    case 'cleaning':
      return <CleaningIcon className={className} />;
    case 'appliance_repair':
      return <Wrench className={className} />;
    default:
      return <Wrench className={className} />;
  }
};

export {
  ShieldCheck,
  MapPin,
  Clock,
  Star,
  Users,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileText,
  CreditCard,
  QrCode,
  Banknote,
  Search,
  Sparkle,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  Share2,
  Download,
  Printer,
  X,
  ExternalLink,
  BrainCircuit,
  Cpu,
  Layers,
  BarChart3,
  SlidersHorizontal,
  UserCheck,
  Eye,
  Check,
  Maximize2
};
