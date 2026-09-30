import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  LanguageCode,
  Worker,
  WorkerAvailability,
  Cooperative,
  ServiceCategory,
  Booking,
  BookingStatus,
  Review,
  NotificationItem,
  AuditRecord,
  Complaint,
  VerificationStatus,
  WorkerDocument,
  AnomalyAlert
} from '../types';
import {
  DEMO_USERS,
  SERVICE_CATEGORIES,
  COOPERATIVES,
  INITIAL_WORKERS,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_COMPLAINTS,
  INITIAL_ANOMALY_ALERTS
} from '../data/mockData';
import { translate } from '../utils/translations';

interface AppContextType {
  currentUser: User;
  currentLanguage: LanguageCode;
  t: (key: string, defaultText?: string) => string;
  switchRole: (role: UserRole) => void;
  updateCustomerLocation: (location: string) => void;
  updateLanguage: (lang: LanguageCode) => void;

  workers: Worker[];
  cooperatives: Cooperative[];
  serviceCategories: ServiceCategory[];
  bookings: Booking[];
  reviews: Review[];
  notifications: NotificationItem[];
  auditLogs: AuditRecord[];
  complaints: Complaint[];
  anomalyAlerts: AnomalyAlert[];
  dismissAnomalyAlert: (id: string) => void;

  // Interactive booking flows
  createBooking: (params: {
    serviceCategory: Worker['serviceCategory'];
    workerId: string;
    scheduledDate: string;
    scheduledTime: string;
    problemDescription: string;
    problemImage?: string;
    detectedIssue?: string;
    priority?: 'emergency' | 'high' | 'normal';
    customerAddress: string;
    distanceKm: number;
    amount: number;
  }) => Booking;
  updateBookingStatus: (bookingId: string, newStatus: BookingStatus, note?: string) => void;
  assignWorkerToBooking: (bookingId: string, workerId: string, note?: string) => void;
  processPayment: (bookingId: string, method: 'online' | 'qr' | 'cash') => void;
  submitReview: (bookingId: string, rating: number, comment: string, tags: string[]) => void;

  // Cooperative & Worker verification workflows
  verifyWorkerDocument: (workerId: string, documentId: string, status: VerificationStatus, notes?: string) => void;
  addWorker: (workerData: Partial<Worker>, initialDocTitle?: string) => void;
  updateWorkerStatus: (workerId: string, status: VerificationStatus) => void;
  updateWorkerAvailability: (workerId: string, availability: WorkerAvailability) => void;

  // Platform admin actions
  addNewServiceCategory: (cat: Partial<ServiceCategory>) => void;
  resolveComplaint: (complaintId: string) => void;

  // Modal controls
  selectedBooking: Booking | null;
  setSelectedBooking: (b: Booking | null) => void;
  selectedWorker: Worker | null;
  setSelectedWorker: (w: Worker | null) => void;
  selectedDocumentInspection: { worker: Worker; document: WorkerDocument } | null;
  setSelectedDocumentInspection: (data: { worker: Worker; document: WorkerDocument } | null) => void;

  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  isInvoiceModalOpen: boolean;
  setIsInvoiceModalOpen: (open: boolean) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  isWorkerProfileModalOpen: boolean;
  setIsWorkerProfileModalOpen: (open: boolean) => void;
  isTryDemoModalOpen: boolean;
  setIsTryDemoModalOpen: (open: boolean) => void;

  bookingDraft: {
    problemDescription?: string;
    problemImage?: string;
    detectedIssue?: string;
    priority?: 'emergency' | 'high' | 'normal';
  };
  setBookingDraft: React.Dispatch<
    React.SetStateAction<{
      problemDescription?: string;
      problemImage?: string;
      detectedIssue?: string;
      priority?: 'emergency' | 'high' | 'normal';
    }>
  >;

  // Helpers
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER_ROLE: 'apex_union_role_v1',
  WORKERS: 'apex_union_workers_v1',
  BOOKINGS: 'apex_union_bookings_v1',
  REVIEWS: 'apex_union_reviews_v1',
  NOTIFICATIONS: 'apex_union_notifications_v1',
  AUDIT_LOGS: 'apex_union_audit_v1',
  LANGUAGE: 'apex_union_lang_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return (saved as UserRole) || 'customer';
  });

  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS[currentRole] || DEMO_USERS.customer);

  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return (saved as LanguageCode) || currentUser.preferredLanguage || 'en';
  });

  const [workers, setWorkers] = useState<Worker[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WORKERS);
    if (!saved) return INITIAL_WORKERS;
    try {
      const parsed = JSON.parse(saved);
      const existingIds = new Set(parsed.map((w: Worker) => w.id));
      const missing = INITIAL_WORKERS.filter(w => !existingIds.has(w.id));
      return missing.length > 0 ? [...parsed, ...missing] : parsed;
    } catch {
      return INITIAL_WORKERS;
    }
  });

  const [cooperatives] = useState<Cooperative[]>(COOPERATIVES);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>(SERVICE_CATEGORIES);

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [anomalyAlerts, setAnomalyAlerts] = useState<AnomalyAlert[]>(INITIAL_ANOMALY_ALERTS);

  // Modals state
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [selectedDocumentInspection, setSelectedDocumentInspection] = useState<{ worker: Worker; document: WorkerDocument } | null>(null);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isWorkerProfileModalOpen, setIsWorkerProfileModalOpen] = useState(false);
  const [isTryDemoModalOpen, setIsTryDemoModalOpen] = useState(false);
  const [bookingDraft, setBookingDraft] = useState<{
    problemDescription?: string;
    problemImage?: string;
    detectedIssue?: string;
    priority?: 'emergency' | 'high' | 'normal';
  }>({
    problemDescription: 'Na bathroom pipe leak ayindi, urgent ga plumber kavali.',
    problemImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=600',
    detectedIssue: 'Severe Pipe Joint Leakage & Thread Corrosion',
    priority: 'emergency'
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, currentRole);
    setCurrentUser(DEMO_USERS[currentRole]);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WORKERS, JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(DEMO_USERS[role]);
  };

  const updateCustomerLocation = (location: string) => {
    setCurrentUser(prev => ({ ...prev, location }));
  };

  const updateLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    setCurrentUser(prev => ({ ...prev, preferredLanguage: lang }));
  };

  const t = (key: string, defaultText?: string) => {
    return translate(key, currentLanguage, defaultText);
  };

  const createBooking = (params: {
    serviceCategory: Worker['serviceCategory'];
    workerId: string;
    scheduledDate: string;
    scheduledTime: string;
    problemDescription: string;
    problemImage?: string;
    detectedIssue?: string;
    priority?: 'emergency' | 'high' | 'normal';
    customerAddress: string;
    distanceKm: number;
    amount: number;
  }): Booking => {
    const worker = workers.find(w => w.id === params.workerId) || workers[0];
    const coop = cooperatives.find(c => c.id === worker.cooperativeId) || cooperatives[0];

    const platformCommission = Math.round(params.amount * 0.1); // 10%
    const cooperativeShare = Math.round(params.amount * (coop.commissionRatePercent / 100));
    const workerPayout = params.amount - platformCommission;

    const startOtp = String(Math.floor(1000 + Math.random() * 9000));
    const completionOtp = String(Math.floor(1000 + Math.random() * 9000));

    const newBooking: Booking = {
      id: `bk-${Date.now().toString().slice(-4)}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      customerAddress: params.customerAddress || currentUser.location,
      workerId: worker.id,
      workerName: worker.name,
      workerPhone: worker.phone,
      workerAvatar: worker.avatarUrl,
      cooperativeId: coop.id,
      cooperativeName: coop.name,
      serviceCategory: params.serviceCategory,
      problemDescription: params.problemDescription,
      problemImage: params.problemImage,
      detectedIssue: params.detectedIssue,
      priority: params.priority || 'normal',
      startOtp,
      completionOtp,
      scheduledDate: params.scheduledDate,
      scheduledTime: params.scheduledTime,
      serviceAmount: params.amount,
      platformCommission,
      cooperativeShare,
      workerPayout,
      totalAmount: params.amount,
      paymentStatus: 'pending',
      status: 'REQUESTED',
      statusHistory: [
        {
          status: 'REQUESTED',
          timestamp: new Date().toISOString(),
          note: 'Request placed by customer on Apex Union platform.'
        }
      ],
      createdAt: new Date().toISOString(),
      distanceKm: params.distanceKm || 3.2,
      estimatedArrivalMins: 20,
      workerCurrentLocation: {
        lat: worker.location.lat,
        lng: worker.location.lng
      }
    };

    setBookings(prev => [newBooking, ...prev]);

    // Update worker workload
    setWorkers(prev =>
      prev.map(w => (w.id === worker.id ? { ...w, currentWorkload: w.currentWorkload + 1 } : w))
    );

    // Audit log
    setAuditLogs(prev => [
      {
        id: `aud-${Date.now()}`,
        action: 'BOOKING_CREATED',
        performedBy: currentUser.name,
        userRole: currentUser.role,
        details: `Created Booking #${newBooking.id} for ${params.serviceCategory} allocated to ${worker.name}`,
        timestamp: new Date().toISOString(),
        status: 'SUCCESS'
      },
      ...prev
    ]);

    // Push notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: currentUser.id,
        title: 'Booking Placed Successfully',
        message: `Your request #${newBooking.id} with ${worker.name} is waiting for cooperative dispatch.`,
        type: 'booking',
        timestamp: new Date().toISOString(),
        read: false
      },
      ...prev
    ]);

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus, note?: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: newStatus,
          statusHistory: [
            ...b.statusHistory,
            {
              status: newStatus,
              timestamp: new Date().toISOString(),
              note: note || `Status updated to ${newStatus}`
            }
          ]
        };
      })
    );

    // If marked completed or cancelled, adjust worker workload
    if (newStatus === 'COMPLETED' || newStatus === 'CANCELLED') {
      const current = bookings.find(b => b.id === bookingId);
      if (current) {
        setWorkers(prev =>
          prev.map(w =>
            w.id === current.workerId
              ? {
                  ...w,
                  currentWorkload: Math.max(0, w.currentWorkload - 1),
                  completedJobsCount:
                    newStatus === 'COMPLETED' ? w.completedJobsCount + 1 : w.completedJobsCount
                }
              : w
          )
        );
      }
    }

    // Add Audit Log
    setAuditLogs(prev => [
      {
        id: `aud-${Date.now()}`,
        action: `BOOKING_${newStatus}`,
        performedBy: currentUser.name,
        userRole: currentUser.role,
        details: `Booking #${bookingId} status changed to ${newStatus}. ${note || ''}`,
        timestamp: new Date().toISOString(),
        status: 'SUCCESS'
      },
      ...prev
    ]);

    // Push Notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: 'usr-cust-01',
        title: `Service Status: ${newStatus}`,
        message: `Booking #${bookingId} is now ${newStatus}. ${note || ''}`,
        type: 'booking',
        timestamp: new Date().toISOString(),
        read: false
      },
      ...prev
    ]);
  };

  const assignWorkerToBooking = (bookingId: string, workerId: string, note?: string) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;

    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          workerId: worker.id,
          workerName: worker.name,
          workerPhone: worker.phone,
          workerAvatar: worker.avatarUrl,
          cooperativeId: worker.cooperativeId,
          cooperativeName: worker.cooperativeName,
          status: 'ACCEPTED',
          statusHistory: [
            ...b.statusHistory,
            {
              status: 'ACCEPTED',
              timestamp: new Date().toISOString(),
              note: note || `Assigned to ${worker.name} by Cooperative Admin.`
            }
          ]
        };
      })
    );

    // Audit log
    setAuditLogs(prev => [
      {
        id: `aud-${Date.now()}`,
        action: 'WORKER_ALLOCATION_UPDATED',
        performedBy: currentUser.name,
        userRole: currentUser.role,
        details: `Worker ${worker.name} assigned to Booking #${bookingId}. Note: ${note || 'AI recommendation accepted.'}`,
        timestamp: new Date().toISOString(),
        status: 'SUCCESS'
      },
      ...prev
    ]);
  };

  const processPayment = (bookingId: string, method: 'online' | 'qr' | 'cash') => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          paymentMethod: method,
          paymentStatus: 'paid'
        };
      })
    );

    setAuditLogs(prev => [
      {
        id: `aud-${Date.now()}`,
        action: 'PAYMENT_PROCESSED_DEMO',
        performedBy: currentUser.name,
        userRole: currentUser.role,
        details: `Settled payment via ${method.toUpperCase()} for Booking #${bookingId}`,
        timestamp: new Date().toISOString(),
        status: 'SUCCESS'
      },
      ...prev
    ]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: currentUser.id,
        title: 'Payment Successful (Demo)',
        message: `Receipt generated for Booking #${bookingId}. Invoice is ready for download.`,
        type: 'payment',
        timestamp: new Date().toISOString(),
        read: false
      },
      ...prev
    ]);
  };

  const submitReview = (bookingId: string, rating: number, comment: string, tags: string[]) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const newReview: Review = {
      id: `rev-${Date.now().toString().slice(-4)}`,
      bookingId,
      customerId: currentUser.id,
      customerName: currentUser.name,
      workerId: booking.workerId,
      rating,
      comment,
      tags,
      createdAt: new Date().toISOString()
    };

    setReviews(prev => [newReview, ...prev]);

    // Recalculate worker rating
    setWorkers(prev =>
      prev.map(w => {
        if (w.id !== booking.workerId) return w;
        const newCount = w.reviewCount + 1;
        const newAvg = Number(((w.rating * w.reviewCount + rating) / newCount).toFixed(2));
        return {
          ...w,
          rating: newAvg,
          reviewCount: newCount
        };
      })
    );

    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, reviewId: newReview.id } : b))
    );

    setAuditLogs(prev => [
      {
        id: `aud-${Date.now()}`,
        action: 'REVIEW_SUBMITTED',
        performedBy: currentUser.name,
        userRole: currentUser.role,
        details: `Customer rated Worker ${booking.workerName} ${rating} Stars for #${bookingId}`,
        timestamp: new Date().toISOString(),
        status: 'SUCCESS'
      },
      ...prev
    ]);
  };

  const verifyWorkerDocument = (
    workerId: string,
    documentId: string,
    status: VerificationStatus,
    notes?: string
  ) => {
    setWorkers(prev =>
      prev.map(w => {
        if (w.id !== workerId) return w;
        const updatedDocs = w.documents.map(d => {
          if (d.id !== documentId) return d;
          return {
            ...d,
            status,
            verifiedBy: `${currentUser.name} (${currentUser.role})`,
            verifiedAt: new Date().toISOString(),
            rejectionReason: status === 'rejected' ? notes : undefined
          };
        });

        // If all docs are verified, worker becomes verified
        const allVerified = updatedDocs.length > 0 && updatedDocs.every(d => d.status === 'verified');
        const hasRejected = updatedDocs.some(d => d.status === 'rejected');
        const workerStatus: VerificationStatus = allVerified ? 'verified' : hasRejected ? 'rejected' : 'pending';

        return {
          ...w,
          documents: updatedDocs,
          verificationStatus: workerStatus
        };
      })
    );

    setAuditLogs(prev => [
      {
        id: `aud-${Date.now()}`,
        action: `DOCUMENT_${status.toUpperCase()}`,
        performedBy: currentUser.name,
        userRole: currentUser.role,
        details: `Document #${documentId} for Worker #${workerId} set to ${status}. ${notes || ''}`,
        timestamp: new Date().toISOString(),
        status: 'SUCCESS'
      },
      ...prev
    ]);
  };

  const addWorker = (workerData: Partial<Worker>, initialDocTitle?: string) => {
    const newId = `wrk-${Date.now().toString().slice(-4)}`;
    const newDocId = `doc-${Date.now().toString().slice(-4)}`;

    const initialDoc: WorkerDocument = {
      id: newDocId,
      workerId: newId,
      title: initialDocTitle || 'Technical Trade Credential / National Skill Certificate',
      type: 'skill_certificate',
      fileName: 'Trade_Certificate_Uploaded.pdf',
      fileSize: '1.7 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      ocrExtractedText: `COOPERATIVE SKILL REGISTRY. Name: ${workerData.name || 'Artisan'}. Trade: ${workerData.serviceCategory?.toUpperCase() || 'GENERAL'}. Experience Verified: ${workerData.experienceYears || 2} Years. Status: Pending Verification Board Signature.`,
      ocrConfidence: 0.94
    };

    const newWorker: Worker = {
      id: newId,
      name: workerData.name || 'New Artisan',
      phone: workerData.phone || '+91 98000 00000',
      email: workerData.email || 'artisan@cooperative.org',
      avatarUrl:
        workerData.avatarUrl ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256',
      cooperativeId: workerData.cooperativeId || 'coop-01',
      cooperativeName: workerData.cooperativeName || 'Metro Skilled Artisans & Workers Cooperative',
      serviceCategory: workerData.serviceCategory || 'plumbing',
      skills: workerData.skills || ['General Maintenance'],
      experienceYears: workerData.experienceYears || 3,
      hourlyRate: workerData.hourlyRate || 349,
      rating: 4.5,
      reviewCount: 0,
      completedJobsCount: 0,
      verificationStatus: 'pending',
      availability: 'available',
      currentWorkload: 0,
      location: workerData.location || {
        city: 'Hyderabad',
        neighborhood: 'Kondapur Main',
        lat: 17.4643,
        lng: 78.3644
      },
      serviceRadiusKm: workerData.serviceRadiusKm || 12,
      bio: workerData.bio || 'Experienced trade craftsman eager to serve cooperative clients.',
      documents: [initialDoc],
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setWorkers(prev => [newWorker, ...prev]);

    setAuditLogs(prev => [
      {
        id: `aud-${Date.now()}`,
        action: 'WORKER_REGISTERED',
        performedBy: currentUser.name,
        userRole: currentUser.role,
        details: `Registered worker ${newWorker.name} under ${newWorker.cooperativeName}`,
        timestamp: new Date().toISOString(),
        status: 'SUCCESS'
      },
      ...prev
    ]);
  };

  const updateWorkerStatus = (workerId: string, status: VerificationStatus) => {
    setWorkers(prev =>
      prev.map(w => (w.id === workerId ? { ...w, verificationStatus: status } : w))
    );
  };

  const addNewServiceCategory = (cat: Partial<ServiceCategory>) => {
    const newCat: ServiceCategory = {
      id: (cat.id || `custom_${Date.now()}`) as any,
      name: cat.name || 'New Service',
      description: cat.description || '',
      iconName: cat.iconName || 'Wrench',
      basePrice: cat.basePrice || 399,
      activeWorkersCount: 0,
      popularTasks: cat.popularTasks || ['General Maintenance']
    };
    setServiceCategories(prev => [...prev, newCat]);
  };

  const resolveComplaint = (complaintId: string) => {
    setComplaints(prev =>
      prev.map(c => (c.id === complaintId ? { ...c, status: 'RESOLVED' } : c))
    );
  };

  const dismissAnomalyAlert = (id: string) => {
    setAnomalyAlerts(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'resolved' } : a))
    );
  };

  const updateWorkerAvailability = (workerId: string, availability: WorkerAvailability) => {
    setWorkers(prev =>
      prev.map(w => (w.id === workerId ? { ...w, availability } : w))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentLanguage,
        t,
        switchRole,
        updateCustomerLocation,
        updateLanguage,

        workers,
        cooperatives,
        serviceCategories,
        bookings,
        reviews,
        notifications,
        auditLogs,
        complaints,
        anomalyAlerts,
        dismissAnomalyAlert,

        createBooking,
        updateBookingStatus,
        assignWorkerToBooking,
        processPayment,
        submitReview,

        verifyWorkerDocument,
        addWorker,
        updateWorkerStatus,
        updateWorkerAvailability,

        addNewServiceCategory,
        resolveComplaint,

        selectedBooking,
        setSelectedBooking,
        selectedWorker,
        setSelectedWorker,
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
        setIsTryDemoModalOpen,
        bookingDraft,
        setBookingDraft,

        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
