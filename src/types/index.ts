/**
 * Apex Union — Core Type Definitions
 * Supporting Labour Cooperatives, Workers, Customers, and Platform Admins
 */

export type UserRole = 'customer' | 'cooperative_admin' | 'platform_admin';

export type LanguageCode =
  | 'en' // English
  | 'te' // Telugu (తెలుగు)
  | 'hi' // Hindi (हिंदी)
  | 'ta' // Tamil (தமிழ்)
  | 'or' // Odia / Orissa (ଓଡ଼ିଆ)
  | 'pa' // Punjabi (ਪੰਜਾਬੀ)
  | 'ml' // Malayalam (മലയാളം)
  | 'kn' // Kannada (ಕನ್ನಡ)
  | 'bn' // Bengali (বাংলা)
  | 'mr'; // Marathi (मराठी)

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl: string;
  location: string;
  cooperativeId?: string; // If cooperative_admin or worker
  preferredLanguage: LanguageCode;
  createdAt: string;
}

export type ServiceCategoryKey =
  | 'electrical'
  | 'plumbing'
  | 'carpentry'
  | 'ac_service'
  | 'ac_servicing'
  | 'ac_installation'
  | 'civil_mesthri'
  | 'gardening'
  | 'painting'
  | 'cleaning'
  | 'appliance_repair';

export interface ServiceCategory {
  id: ServiceCategoryKey;
  name: string;
  description: string;
  iconName: string;
  basePrice: number; // in INR
  activeWorkersCount: number;
  popularTasks: string[];
}

export type VerificationStatus = 'pending' | 'processing' | 'verified' | 'rejected';

export interface WorkerDocument {
  id: string;
  workerId: string;
  title: string;
  type: 'skill_certificate' | 'identity_proof' | 'cooperative_membership' | 'experience_letter';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: VerificationStatus;
  ocrExtractedText?: string;
  ocrConfidence?: number;
  verifiedBy?: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

export type WorkerAvailability = 'available' | 'busy' | 'on_service' | 'off_duty';

export interface Worker {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarUrl: string;
  cooperativeId: string;
  cooperativeName: string;
  serviceCategory: ServiceCategoryKey;
  skills: string[];
  experienceYears: number;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  completedJobsCount: number;
  verificationStatus: VerificationStatus;
  availability: WorkerAvailability;
  currentWorkload: number; // 0 to 5 active jobs
  location: {
    city: string;
    neighborhood: string;
    lat: number;
    lng: number;
  };
  serviceRadiusKm: number;
  bio: string;
  documents: WorkerDocument[];
  joinedDate: string;
}

export interface Cooperative {
  id: string;
  name: string;
  registrationNumber: string;
  district: string;
  state: string;
  presidentName: string;
  adminEmail: string;
  phone: string;
  totalWorkers: number;
  activeBookings: number;
  rating: number;
  commissionRatePercent: number; // e.g. 8%
  establishedYear: number;
  servicesOffered: ServiceCategoryKey[];
  description: string;
}

export type BookingStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'ON THE WAY'
  | 'IN PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  workerId: string;
  workerName: string;
  workerPhone: string;
  workerAvatar: string;
  cooperativeId: string;
  cooperativeName: string;
  serviceCategory: ServiceCategoryKey;
  problemDescription: string;
  scheduledDate: string;
  scheduledTime: string;
  serviceAmount: number;
  platformCommission: number;
  cooperativeShare: number;
  workerPayout: number;
  totalAmount: number;
  paymentMethod?: 'online' | 'qr' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  status: BookingStatus;
  statusHistory: {
    status: BookingStatus;
    timestamp: string;
    note?: string;
  }[];
  reviewId?: string;
  createdAt: string;
  distanceKm: number;
  estimatedArrivalMins?: number;
  workerCurrentLocation?: {
    lat: number;
    lng: number;
  };
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  workerId: string;
  rating: number; // 1 - 5
  comment: string;
  tags: string[];
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  date: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  workerName: string;
  cooperativeName: string;
  serviceCategory: string;
  problemDescription: string;
  serviceAmount: number;
  platformCommission: number;
  workerAmount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING';
  transactionId: string;
}

export interface RecommendationScore {
  workerId: string;
  totalScore: number; // 0 - 100
  factors: {
    skillMatch: number;      // 0 - 35
    distanceScore: number;   // 0 - 20
    availabilityScore: number; // 0 - 15
    experienceScore: number; // 0 - 10
    ratingScore: number;     // 0 - 10
    verificationScore: number; // 0 - 10
  };
  reasons: string[];
  distanceKm: number;
}

export interface AllocationSuggestion {
  worker: Worker;
  score: number;
  reasons: string[];
  distanceKm: number;
  currentWorkload: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'system' | 'verification' | 'payment';
  timestamp: string;
  read: boolean;
  linkAction?: string;
}

export interface AuditRecord {
  id: string;
  action: string;
  performedBy: string;
  userRole: UserRole;
  details: string;
  timestamp: string;
  status: 'SUCCESS' | 'REVIEW_REQUIRED' | 'REJECTED';
}

export interface Complaint {
  id: string;
  bookingId: string;
  customerName: string;
  workerName: string;
  subject: string;
  description: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  createdAt: string;
}
