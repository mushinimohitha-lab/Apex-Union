import {
  User,
  ServiceCategory,
  Cooperative,
  Worker,
  Booking,
  Review,
  AuditRecord,
  Complaint,
  NotificationItem
} from '../types';

export const DEMO_USERS: Record<string, User> = {
  customer: {
    id: 'usr-cust-01',
    name: 'Ananya Rao',
    email: 'ananya.rao@example.com',
    phone: '+91 98490 12345',
    role: 'customer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    location: 'Banjara Hills, Hyderabad',
    preferredLanguage: 'en',
    createdAt: '2026-01-15'
  },
  cooperative_admin: {
    id: 'usr-coop-01',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@metroartisans.coop',
    phone: '+91 98765 43210',
    role: 'cooperative_admin',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    location: 'Madhapur, Hyderabad',
    cooperativeId: 'coop-01',
    preferredLanguage: 'en',
    createdAt: '2025-11-10'
  },
  platform_admin: {
    id: 'usr-plat-01',
    name: 'Vikramaditya Varma',
    email: 'admin@apexunion.org',
    phone: '+91 94400 99887',
    role: 'platform_admin',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    location: 'Apex Central Secretariat, Hyderabad',
    preferredLanguage: 'en',
    createdAt: '2025-08-01'
  }
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'electrical',
    name: 'Electrical',
    description: 'Wiring, switchboard repair, appliance installation, MCB tripping & phase fault troubleshooting.',
    iconName: 'Zap',
    basePrice: 349,
    activeWorkersCount: 42,
    popularTasks: ['Switchboard replacement', 'Ceiling fan repair', 'Short circuit fix', 'Inverter setup']
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    description: 'Leak detection, pipe repairs, tap fittings, sanitary ware, blockage clearing & overhead tank pump repair.',
    iconName: 'Plumbing',
    basePrice: 299,
    activeWorkersCount: 38,
    popularTasks: ['Kitchen tap leak', 'Bathroom drain block', 'Flush valve repair', 'Water motor wiring']
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    description: 'Custom furniture assembly, door alignment, modular cabinet hardware, latch repair & polish work.',
    iconName: 'Hammer',
    basePrice: 399,
    activeWorkersCount: 26,
    popularTasks: ['Door lock installation', 'Cabinet hinge fix', 'Bed repair', 'Curtain rod fixing']
  },
  {
    id: 'ac_service',
    name: 'AC Service',
    description: 'Split & window AC servicing, deep jet wash, gas leak charging, PCB repair & new installation.',
    iconName: 'AirConditioner',
    basePrice: 499,
    activeWorkersCount: 31,
    popularTasks: ['Deep chemical jet wash', 'Cooling issue diagnosis', 'Gas leak detection & refill', 'AC uninstallation']
  },
  {
    id: 'gardening',
    name: 'Gardening',
    description: 'Lawn trimming, shrub pruning, organic fertilization, drip line fixes & terrace garden upkeep.',
    iconName: 'Flower2',
    basePrice: 349,
    activeWorkersCount: 19,
    popularTasks: ['Hedge trimming', 'Organic pest treatment', 'Potted plants repotting', 'Lawn mowing']
  },
  {
    id: 'painting',
    name: 'Painting',
    description: 'Interior wall touch-ups, waterproof primer coating, wood polish, exterior weather-shield painting.',
    iconName: 'Paintbrush',
    basePrice: 599,
    activeWorkersCount: 22,
    popularTasks: ['Wall dampness treatment', 'Single room repaint', 'Ceiling crack putty fix', 'Door enamel paint']
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    description: 'Deep home sanitization, kitchen chimney degreasing, sofa shampooing & post-renovation cleanup.',
    iconName: 'Cleaning',
    basePrice: 449,
    activeWorkersCount: 35,
    popularTasks: ['Full bathroom deep clean', 'Kitchen chimney de-grease', 'Fabric sofa shampoo', 'Floor scrubbing']
  },
  {
    id: 'appliance_repair',
    name: 'Appliance Repair',
    description: 'Washing machines, microwave ovens, refrigerators, geysers & water purifiers repair by certified techs.',
    iconName: 'Wrench',
    basePrice: 399,
    activeWorkersCount: 27,
    popularTasks: ['Front load washer drain error', 'Refrigerator cooling coil', 'Water purifier filter replacement', 'Geyser thermostat']
  }
];

export const COOPERATIVES: Cooperative[] = [
  {
    id: 'coop-01',
    name: 'Metro Skilled Artisans & Workers Cooperative Society',
    registrationNumber: 'TS-COOP-HYD-2018-0941',
    district: 'Hyderabad Central',
    state: 'Telangana',
    presidentName: 'M. Prabhakar Reddy',
    adminEmail: 'rajesh.kumar@metroartisans.coop',
    phone: '+91 40 2345 6789',
    totalWorkers: 48,
    activeBookings: 14,
    rating: 4.85,
    commissionRatePercent: 8,
    establishedYear: 2018,
    servicesOffered: ['electrical', 'plumbing', 'carpentry', 'ac_service', 'appliance_repair'],
    description: 'Registered under the Telangana Co-operative Societies Act. A democratically run union empowering skilled mechanical and electrical craftspeople with group health cover, fair wage dividends, and transparent digital bookings.'
  },
  {
    id: 'coop-02',
    name: 'Deccan Green & Environmental Labour Union',
    registrationNumber: 'TS-COOP-HYD-2020-1402',
    district: 'Secunderabad & Cyberabad',
    state: 'Telangana',
    presidentName: 'Smt. Lakshmi Bai',
    adminEmail: 'contact@deccangreen.coop',
    phone: '+91 40 2789 1122',
    totalWorkers: 32,
    activeBookings: 9,
    rating: 4.79,
    commissionRatePercent: 7,
    establishedYear: 2020,
    servicesOffered: ['gardening', 'cleaning', 'painting', 'appliance_repair'],
    description: 'Focused on sustainable urban services, housekeeping dignity, horticulture, and certified home sanitization workers with progressive cooperative benefits.'
  },
  {
    id: 'coop-03',
    name: 'Telangana Craftsmen & Infrastructure Labour Federation',
    registrationNumber: 'TS-COOP-RR-2016-0422',
    district: 'Ranga Reddy',
    state: 'Telangana',
    presidentName: 'K. Venkateshwar Rao',
    adminEmail: 'ops@tcilf.org',
    phone: '+91 40 2999 4433',
    totalWorkers: 54,
    activeBookings: 18,
    rating: 4.91,
    commissionRatePercent: 9,
    establishedYear: 2016,
    servicesOffered: ['carpentry', 'painting', 'electrical', 'plumbing'],
    description: 'One of the oldest certified labour unions in Telangana specializing in interior woodwork, electrical distribution, and certified commercial plumbing.'
  }
];

export const INITIAL_WORKERS: Worker[] = [
  {
    id: 'wrk-01',
    name: 'Suresh Varma',
    phone: '+91 98480 22334',
    email: 'suresh.varma@metroartisans.coop',
    avatarUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=256',
    cooperativeId: 'coop-01',
    cooperativeName: 'Metro Skilled Artisans & Workers Cooperative',
    serviceCategory: 'plumbing',
    skills: ['Pipe Leak Repair', 'Overhead Tank Fitting', 'Water Heater Piping', 'Sanitary Installations'],
    experienceYears: 6,
    hourlyRate: 349,
    rating: 4.88,
    reviewCount: 142,
    completedJobsCount: 218,
    verificationStatus: 'verified',
    availability: 'available',
    currentWorkload: 1,
    location: {
      city: 'Hyderabad',
      neighborhood: 'Jubilee Hills (Near Road 36)',
      lat: 17.4319,
      lng: 78.4073
    },
    serviceRadiusKm: 12,
    bio: 'Government ITI certified plumber with 6+ years of precision residential plumbing. Member of Metro Artisans Cooperative since 2019.',
    documents: [
      {
        id: 'doc-01',
        workerId: 'wrk-01',
        title: 'National Trade Certificate (Plumbing ITI)',
        type: 'skill_certificate',
        fileName: 'ITI_Plumber_SureshVarma_Cert.pdf',
        fileSize: '1.8 MB',
        uploadDate: '2025-11-20',
        status: 'verified',
        ocrExtractedText: 'DIRECTORATE GENERAL OF TRAINING - NATIONAL TRADE CERTIFICATE. Trade: Plumber. Candidate: Suresh Varma. Roll: 2018-ITI-PL-9821. Result: Passed First Class. Verification hash: NTC-TS-98218.',
        ocrConfidence: 0.98,
        verifiedBy: 'Rajesh Kumar (Coop Admin)',
        verifiedAt: '2025-11-22'
      },
      {
        id: 'doc-02',
        workerId: 'wrk-01',
        title: 'Cooperative Membership Card',
        type: 'cooperative_membership',
        fileName: 'MetroArtisans_ID_Suresh.pdf',
        fileSize: '840 KB',
        uploadDate: '2025-11-20',
        status: 'verified',
        ocrExtractedText: 'METRO ARTISANS COOPERATIVE SOCIETY. Member ID: MACS-2019-042. Category: Master Plumber. Status: Active & Insured.',
        ocrConfidence: 0.99,
        verifiedBy: 'Rajesh Kumar (Coop Admin)',
        verifiedAt: '2025-11-22'
      }
    ],
    joinedDate: '2019-04-12'
  },
  {
    id: 'wrk-02',
    name: 'Mohammad Riaz',
    phone: '+91 97000 88765',
    email: 'm.riaz@metroartisans.coop',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256',
    cooperativeId: 'coop-01',
    cooperativeName: 'Metro Skilled Artisans & Workers Cooperative',
    serviceCategory: 'electrical',
    skills: ['MCB Troubleshooting', 'Full House Rewiring', 'Phase Fault Diagnosis', 'Inverter Wiring'],
    experienceYears: 8,
    hourlyRate: 399,
    rating: 4.92,
    reviewCount: 198,
    completedJobsCount: 310,
    verificationStatus: 'verified',
    availability: 'available',
    currentWorkload: 0,
    location: {
      city: 'Hyderabad',
      neighborhood: 'Banjara Hills (Rd No 12)',
      lat: 17.4156,
      lng: 78.4350
    },
    serviceRadiusKm: 15,
    bio: 'Licensed Wireman Grade-A by Electrical Licensing Board. Expert in smart home wiring and circuit safety audits.',
    documents: [
      {
        id: 'doc-03',
        workerId: 'wrk-02',
        title: 'Electrical Licensing Board Wireman License',
        type: 'skill_certificate',
        fileName: 'ELB_Wireman_License_Riaz.pdf',
        fileSize: '2.1 MB',
        uploadDate: '2025-10-15',
        status: 'verified',
        ocrExtractedText: 'GOVERNMENT OF TELANGANA ELECTRICAL LICENSING BOARD. Wireman Competency Certificate Grade A. Name: Mohd Riaz. Reg No: ELB-TG-2017-4889. Valid till: 2028.',
        ocrConfidence: 0.97,
        verifiedBy: 'Rajesh Kumar (Coop Admin)',
        verifiedAt: '2025-10-18'
      }
    ],
    joinedDate: '2018-06-15'
  },
  {
    id: 'wrk-03',
    name: 'K. Ramesh Chari',
    phone: '+91 98492 55678',
    email: 'ramesh.chari@tcilf.org',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=256',
    cooperativeId: 'coop-03',
    cooperativeName: 'Telangana Craftsmen Labour Federation',
    serviceCategory: 'carpentry',
    skills: ['Modular Kitchen Fixing', 'Door Alignment', 'Hinges & Locks', 'Custom Woodwork'],
    experienceYears: 10,
    hourlyRate: 449,
    rating: 4.95,
    reviewCount: 220,
    completedJobsCount: 360,
    verificationStatus: 'verified',
    availability: 'available',
    currentWorkload: 2,
    location: {
      city: 'Hyderabad',
      neighborhood: 'Ameerpet / Somajiguda',
      lat: 17.4375,
      lng: 78.4483
    },
    serviceRadiusKm: 14,
    bio: 'Master woodcraft artisan belonging to Telangana Craftsmen Federation. Precision hinge fitting and bespoke wooden restorations.',
    documents: [
      {
        id: 'doc-04',
        workerId: 'wrk-03',
        title: 'NSDC Skill India Master Carpentry Credential',
        type: 'skill_certificate',
        fileName: 'NSDC_SkillIndia_Carpentry_Ramesh.pdf',
        fileSize: '1.4 MB',
        uploadDate: '2025-09-10',
        status: 'verified',
        ocrExtractedText: 'NATIONAL SKILL DEVELOPMENT CORPORATION (NSDC) - Level 4 Furniture & Woodcraft Artisan. Ramesh Chari. Certified with Distinction.',
        ocrConfidence: 0.96,
        verifiedBy: 'Platform Admin',
        verifiedAt: '2025-09-12'
      }
    ],
    joinedDate: '2017-02-20'
  },
  {
    id: 'wrk-04',
    name: 'Sunita Devi',
    phone: '+91 99881 33445',
    email: 'sunita.devi@deccangreen.coop',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    cooperativeId: 'coop-02',
    cooperativeName: 'Deccan Green & Environmental Labour Union',
    serviceCategory: 'cleaning',
    skills: ['Deep Home Sanitization', 'Kitchen Chimney Degreasing', 'Sofa Shampooing', 'Eco-friendly Disinfection'],
    experienceYears: 5,
    hourlyRate: 449,
    rating: 4.91,
    reviewCount: 94,
    completedJobsCount: 160,
    verificationStatus: 'verified',
    availability: 'available',
    currentWorkload: 1,
    location: {
      city: 'Hyderabad',
      neighborhood: 'Begumpet / Prakash Nagar',
      lat: 17.4448,
      lng: 78.4650
    },
    serviceRadiusKm: 10,
    bio: 'Certified sanitation and deep hygiene specialist from Deccan Green. Expert in non-toxic chemical treatments, post-renovation cleaning, and kitchen degreasing.',
    documents: [
      {
        id: 'doc-05',
        workerId: 'wrk-04',
        title: 'National Skill Development Cleaning Specialist Certification',
        type: 'skill_certificate',
        fileName: 'NSDC_Cleaning_Sunita.pdf',
        fileSize: '1.9 MB',
        uploadDate: '2025-11-01',
        status: 'verified',
        ocrExtractedText: 'NATIONAL SKILL QUALIFICATION FRAMEWORK. Candidate: Sunita Devi. Qualified: Domestic & Commercial Deep Sanitization Specialist (Level 4).',
        ocrConfidence: 0.99,
        verifiedBy: 'Lakshmi Bai (Deccan Green Coop)',
        verifiedAt: '2025-11-04'
      }
    ],
    joinedDate: '2021-03-10'
  },
  {
    id: 'wrk-05',
    name: 'Anil Kumar Reddy',
    phone: '+91 98661 77234',
    email: 'anil.reddy@metroartisans.coop',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    cooperativeId: 'coop-01',
    cooperativeName: 'Metro Skilled Artisans & Workers Cooperative',
    serviceCategory: 'ac_service',
    skills: ['Split AC Jet Wash', 'R32 Gas Refill', 'PCB Micro-repair', 'Compressor Diagnostics'],
    experienceYears: 7,
    hourlyRate: 549,
    rating: 4.87,
    reviewCount: 176,
    completedJobsCount: 285,
    verificationStatus: 'verified',
    availability: 'available',
    currentWorkload: 2,
    location: {
      city: 'Hyderabad',
      neighborhood: 'Gachibowli / Hitec City',
      lat: 17.4401,
      lng: 78.3489
    },
    serviceRadiusKm: 16,
    bio: 'Daikin & Voltas authorized training alumnus. Specializes in multi-brand HVAC energy optimization and eco-refrigerant servicing.',
    documents: [
      {
        id: 'doc-06',
        workerId: 'wrk-05',
        title: 'Refrigeration & Air Conditioning ITI Diploma',
        type: 'skill_certificate',
        fileName: 'RAC_Technician_Anil.pdf',
        fileSize: '2.2 MB',
        uploadDate: '2025-10-05',
        status: 'verified',
        ocrExtractedText: 'DIRECTORATE OF TECHNICAL EDUCATION. Trade: Mechanic (Refrigeration & Air Conditioning). Cert No: RAC-TS-2018-771.',
        ocrConfidence: 0.98,
        verifiedBy: 'Rajesh Kumar (Coop Admin)',
        verifiedAt: '2025-10-08'
      }
    ],
    joinedDate: '2019-08-01'
  },
  {
    id: 'wrk-06',
    name: 'Venkat Narayana',
    phone: '+91 99499 12389',
    email: 'venkat.narayana@deccangreen.coop',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
    cooperativeId: 'coop-02',
    cooperativeName: 'Deccan Green & Environmental Labour Union',
    serviceCategory: 'gardening',
    skills: ['Landscape Design', 'Drip Irrigation Fix', 'Bonsai Pruning', 'Terrace Soil Mixing'],
    experienceYears: 9,
    hourlyRate: 349,
    rating: 4.84,
    reviewCount: 88,
    completedJobsCount: 145,
    verificationStatus: 'verified',
    availability: 'available',
    currentWorkload: 0,
    location: {
      city: 'Hyderabad',
      neighborhood: 'Kondapur / Botanical Garden',
      lat: 17.4643,
      lng: 78.3644
    },
    serviceRadiusKm: 12,
    bio: 'Passionate horticulturist from rural Medak. Over 9 years transforming urban balconies and corporate lawns into thriving green sanctuaries.',
    documents: [
      {
        id: 'doc-07',
        workerId: 'wrk-06',
        title: 'Horticulture Training Certificate',
        type: 'skill_certificate',
        fileName: 'Horticulture_Venkat.pdf',
        fileSize: '1.2 MB',
        uploadDate: '2025-12-01',
        status: 'verified',
        ocrExtractedText: 'TELANGANA HORTICULTURE MISSION - Urban Floriculture and Organic Pest Control. Candidate: Venkat Narayana.',
        ocrConfidence: 0.95,
        verifiedBy: 'Lakshmi Bai (Deccan Green Coop)',
        verifiedAt: '2025-12-03'
      }
    ],
    joinedDate: '2020-04-10'
  },
  {
    id: 'wrk-07',
    name: 'Prakash Rao (Pending Verification)',
    phone: '+91 98491 99881',
    email: 'prakash.rao@metroartisans.coop',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256',
    cooperativeId: 'coop-01',
    cooperativeName: 'Metro Skilled Artisans & Workers Cooperative',
    serviceCategory: 'plumbing',
    skills: ['Concealed Pipeline Fixing', 'Pressure Pump Setup'],
    experienceYears: 4,
    hourlyRate: 299,
    rating: 4.60,
    reviewCount: 12,
    completedJobsCount: 18,
    verificationStatus: 'pending',
    availability: 'available',
    currentWorkload: 0,
    location: {
      city: 'Hyderabad',
      neighborhood: 'Kukatpally Housing Board (KPHB)',
      lat: 17.4938,
      lng: 78.4018
    },
    serviceRadiusKm: 10,
    bio: 'Newly registered plumber awaiting final document verification from the cooperative review board.',
    documents: [
      {
        id: 'doc-08',
        workerId: 'wrk-07',
        title: 'Apprenticeship Certificate',
        type: 'skill_certificate',
        fileName: 'Plumbing_Apprentice_Prakash.pdf',
        fileSize: '1.5 MB',
        uploadDate: '2026-03-20',
        status: 'pending',
        ocrExtractedText: 'NATIONAL APPRENTICESHIP PROMOTION SCHEME - Trade: Plumber (General). Candidate: Prakash Rao. Enrolment: APPR-2023-0912.',
        ocrConfidence: 0.94
      }
    ],
    joinedDate: '2026-03-18'
  },
  {
    id: 'wrk-08',
    name: 'Mahesh Goud',
    phone: '+91 98765 11223',
    email: 'mahesh.goud@tcilf.org',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256',
    cooperativeId: 'coop-03',
    cooperativeName: 'Telangana Craftsmen Labour Federation',
    serviceCategory: 'painting',
    skills: ['Asian Paints Royale Finish', 'Exterior Waterproofing', 'Stencils & Texture', 'Wood PU Polish'],
    experienceYears: 7,
    hourlyRate: 599,
    rating: 4.89,
    reviewCount: 110,
    completedJobsCount: 195,
    verificationStatus: 'verified',
    availability: 'available',
    currentWorkload: 1,
    location: {
      city: 'Hyderabad',
      neighborhood: 'Secunderabad (Marredpally)',
      lat: 17.4474,
      lng: 78.5118
    },
    serviceRadiusKm: 15,
    bio: 'Certified Color Academy applicator. Master in dust-free sanding and anti-fungal waterproof primers.',
    documents: [
      {
        id: 'doc-09',
        workerId: 'wrk-08',
        title: 'Professional Master Painter Certificate',
        type: 'skill_certificate',
        fileName: 'MasterPainter_Mahesh.pdf',
        fileSize: '1.6 MB',
        uploadDate: '2025-08-14',
        status: 'verified',
        ocrExtractedText: 'ASIAN PAINTS COLOUR ACADEMY - Master Certified Applicator. Mahesh Goud. Completed 120 Hours Intensive Architectural Finishing.',
        ocrConfidence: 0.98,
        verifiedBy: 'Platform Admin',
        verifiedAt: '2025-08-16'
      }
    ],
    joinedDate: '2019-01-20'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    customerId: 'usr-cust-01',
    customerName: 'Ananya Rao',
    customerPhone: '+91 98490 12345',
    customerAddress: 'Flat 402, Oakwood Heights, Road No. 10, Banjara Hills, Hyderabad',
    workerId: 'wrk-01',
    workerName: 'Suresh Varma',
    workerPhone: '+91 98480 22334',
    workerAvatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=256',
    cooperativeId: 'coop-01',
    cooperativeName: 'Metro Skilled Artisans & Workers Cooperative',
    serviceCategory: 'plumbing',
    problemDescription: 'Kitchen sink tap mixer valve is continuously leaking under the granite counter slab. Water dripping into lower cabinet.',
    scheduledDate: '2026-09-28',
    scheduledTime: '11:00 AM - 12:30 PM',
    serviceAmount: 500,
    platformCommission: 50,
    cooperativeShare: 40,
    workerPayout: 410,
    totalAmount: 500,
    paymentMethod: 'online',
    paymentStatus: 'pending',
    status: 'ON THE WAY',
    statusHistory: [
      { status: 'REQUESTED', timestamp: '2026-09-28T09:00:00Z', note: 'Customer placed request with natural language prompt' },
      { status: 'ACCEPTED', timestamp: '2026-09-28T09:12:00Z', note: 'Cooperative AI recommended and allocated Suresh Varma' },
      { status: 'ON THE WAY', timestamp: '2026-09-28T09:45:00Z', note: 'Worker dispatched with toolkit and pipe seals' }
    ],
    createdAt: '2026-09-28T09:00:00Z',
    distanceKm: 2.4,
    estimatedArrivalMins: 14,
    workerCurrentLocation: {
      lat: 17.4225,
      lng: 78.4210
    }
  },
  {
    id: 'bk-102',
    customerId: 'usr-cust-01',
    customerName: 'Ananya Rao',
    customerPhone: '+91 98490 12345',
    customerAddress: 'Flat 402, Oakwood Heights, Road No. 10, Banjara Hills, Hyderabad',
    workerId: 'wrk-02',
    workerName: 'Mohammad Riaz',
    workerPhone: '+91 97000 88765',
    workerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256',
    cooperativeId: 'coop-01',
    cooperativeName: 'Metro Skilled Artisans & Workers Cooperative',
    serviceCategory: 'electrical',
    problemDescription: 'Main hall MCB trip issue whenever geyser is turned on. Need load inspection and neutral wire check.',
    scheduledDate: '2026-09-24',
    scheduledTime: '02:00 PM',
    serviceAmount: 650,
    platformCommission: 65,
    cooperativeShare: 52,
    workerPayout: 533,
    totalAmount: 650,
    paymentMethod: 'online',
    paymentStatus: 'paid',
    status: 'COMPLETED',
    statusHistory: [
      { status: 'REQUESTED', timestamp: '2026-09-24T10:00:00Z' },
      { status: 'ACCEPTED', timestamp: '2026-09-24T10:15:00Z' },
      { status: 'ON THE WAY', timestamp: '2026-09-24T13:30:00Z' },
      { status: 'IN PROGRESS', timestamp: '2026-09-24T14:05:00Z' },
      { status: 'COMPLETED', timestamp: '2026-09-24T15:20:00Z', note: 'Replaced faulty 16A MCB and re-crimped neutral terminal.' }
    ],
    reviewId: 'rev-01',
    createdAt: '2026-09-24T10:00:00Z',
    distanceKm: 3.1
  },
  {
    id: 'bk-103',
    customerId: 'usr-cust-02',
    customerName: 'Dr. K. Srinivas',
    customerPhone: '+91 94411 77665',
    customerAddress: 'Villa 18, Whispering Pines, Gachibowli, Hyderabad',
    workerId: 'wrk-05',
    workerName: 'Anil Kumar Reddy',
    workerPhone: '+91 98661 77234',
    workerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    cooperativeId: 'coop-01',
    cooperativeName: 'Metro Skilled Artisans & Workers Cooperative',
    serviceCategory: 'ac_service',
    problemDescription: 'Split AC is blowing warm air and showing error code E6. Needs pressure leak test.',
    scheduledDate: '2026-09-28',
    scheduledTime: '04:00 PM',
    serviceAmount: 799,
    platformCommission: 80,
    cooperativeShare: 64,
    workerPayout: 655,
    totalAmount: 799,
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    status: 'ACCEPTED',
    statusHistory: [
      { status: 'REQUESTED', timestamp: '2026-09-28T08:30:00Z' },
      { status: 'ACCEPTED', timestamp: '2026-09-28T09:10:00Z' }
    ],
    createdAt: '2026-09-28T08:30:00Z',
    distanceKm: 4.8
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    bookingId: 'bk-102',
    customerId: 'usr-cust-01',
    customerName: 'Ananya Rao',
    workerId: 'wrk-02',
    rating: 5,
    comment: 'Mohammad Riaz was extremely prompt, identified the high-resistance joint in the MCB box right away, and provided an official cooperative receipt. Delighted with the service!',
    tags: ['Prompt Arrival', 'Clear Explanation', 'Transparent Pricing', 'Cooperative Verified'],
    createdAt: '2026-09-24T16:00:00Z'
  },
  {
    id: 'rev-02',
    bookingId: 'bk-098',
    customerId: 'usr-cust-03',
    customerName: 'Priya Nambiar',
    workerId: 'wrk-01',
    rating: 5,
    comment: 'Suresh fixed our kitchen tap without wasting any time and explained how to clean the aerator filter monthly. Very courteous worker!',
    tags: ['Quality Work', 'Professional Behavior', 'Fair Rate'],
    createdAt: '2026-09-21T18:30:00Z'
  },
  {
    id: 'rev-03',
    bookingId: 'bk-092',
    customerId: 'usr-cust-04',
    customerName: 'V. Ramanathan',
    workerId: 'wrk-03',
    rating: 5,
    comment: 'Ramesh Chari repaired our antique rosewood dining chair joints with exceptional skill. You can see the craftsmanship in cooperative artisans.',
    tags: ['Master Craftsmanship', 'Honest Advice', 'Punctual'],
    createdAt: '2026-09-18T14:15:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    userId: 'usr-cust-01',
    title: 'Worker is on the way',
    message: 'Suresh Varma is en route to your Banjara Hills address. Estimated arrival in 14 minutes.',
    type: 'booking',
    timestamp: '2026-09-28T09:45:00Z',
    read: false,
    linkAction: 'track-booking'
  },
  {
    id: 'notif-02',
    userId: 'usr-cust-01',
    title: 'Booking Accepted',
    message: 'Metro Artisans Cooperative assigned Suresh Varma for your kitchen plumbing request.',
    type: 'booking',
    timestamp: '2026-09-28T09:12:00Z',
    read: true
  },
  {
    id: 'notif-03',
    userId: 'usr-coop-01',
    title: 'New Verification Request',
    message: 'Worker Prakash Rao uploaded an Apprenticeship Certificate for review.',
    type: 'verification',
    timestamp: '2026-09-20T11:20:00Z',
    read: false,
    linkAction: 'verification-tab'
  },
  {
    id: 'notif-04',
    userId: 'usr-cust-01',
    title: 'Invoice Generated',
    message: 'Invoice APX-2026-102 for Electrical repair has been settled. Download your copy anytime.',
    type: 'payment',
    timestamp: '2026-09-24T15:25:00Z',
    read: true,
    linkAction: 'view-invoice'
  }
];

export const INITIAL_AUDIT_LOGS: AuditRecord[] = [
  {
    id: 'aud-01',
    action: 'WORKER_DOCUMENT_VERIFIED',
    performedBy: 'Rajesh Kumar (Coop Admin)',
    userRole: 'cooperative_admin',
    details: 'Verified National Trade Certificate for Suresh Varma after OCR validation score 0.98.',
    timestamp: '2025-11-22T14:22:10Z',
    status: 'SUCCESS'
  },
  {
    id: 'aud-02',
    action: 'COOPERATIVE_ONBOARDED',
    performedBy: 'Vikramaditya Varma (Platform Admin)',
    userRole: 'platform_admin',
    details: 'Approved Deccan Green & Environmental Labour Union (Reg: TS-COOP-HYD-2020-1402).',
    timestamp: '2025-10-01T10:15:00Z',
    status: 'SUCCESS'
  },
  {
    id: 'aud-03',
    action: 'AI_WORKFORCE_ALLOCATION_ACCEPTED',
    performedBy: 'Rajesh Kumar (Coop Admin)',
    userRole: 'cooperative_admin',
    details: 'Cooperative admin accepted AI allocation recommendation for Booking #bk-101 (Score: 94/100).',
    timestamp: '2026-09-28T09:12:00Z',
    status: 'SUCCESS'
  },
  {
    id: 'aud-04',
    action: 'NEW_SERVICE_CATEGORY_REGISTERED',
    performedBy: 'Vikramaditya Varma (Platform Admin)',
    userRole: 'platform_admin',
    details: 'Added Appliance Repair category with mandatory technical trade validation threshold.',
    timestamp: '2026-01-10T16:45:00Z',
    status: 'SUCCESS'
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'cmp-01',
    bookingId: 'bk-084',
    customerName: 'K. Sunita',
    workerName: 'Unassigned Worker',
    subject: 'Minor delay in slot rescheduling',
    description: 'Worker informed 20 mins delay due to heavy downpour at Panjagutta junction. Rescheduled amicably.',
    status: 'RESOLVED',
    createdAt: '2026-09-15T11:00:00Z'
  }
];
