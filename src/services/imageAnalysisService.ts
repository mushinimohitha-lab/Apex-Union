import { ServiceCategoryKey } from '../types';

export interface ImageAnalysisResult {
  detectedIssue: string;
  category: ServiceCategoryKey;
  categoryName: string;
  priority: 'emergency' | 'high' | 'normal';
  recommendedService: string;
  confidence: number; // 0 - 100
  visualIndicators: string[];
  suggestedAction: string;
  isDemoAnalysis: boolean;
}

export interface DemoSampleImage {
  id: string;
  title: string;
  category: ServiceCategoryKey;
  thumbnailUrl: string;
  description: string;
  detectedIssue: string;
  priority: 'emergency' | 'high' | 'normal';
  confidence: number;
  visualIndicators: string[];
}

export const DEMO_SAMPLE_IMAGES: DemoSampleImage[] = [
  {
    id: 'pipe-leak-01',
    title: 'Leaking Bathroom Pipe Joint',
    category: 'plumbing',
    thumbnailUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=600',
    description: 'Severe high-pressure dripping under washbasin with visible corrosion around PVC threaded coupling.',
    detectedIssue: 'Severe Pipe Joint Leakage & Thread Corrosion',
    priority: 'emergency',
    confidence: 96,
    visualIndicators: [
      'Moisture and pooled water detected on floor tile (98%)',
      'Threaded coupling seal rupture detected (94%)',
      'High risk of indoor water damage / flooding'
    ]
  },
  {
    id: 'switchboard-spark-02',
    title: 'Burnt Electrical Switchboard',
    category: 'electrical',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600',
    description: 'Black carbon residue around 16A power socket with melted plastic faceplate.',
    detectedIssue: 'Phase Overload & Scorched Switchboard Socket',
    priority: 'emergency',
    confidence: 98,
    visualIndicators: [
      'Carbon thermal burn marks detected around socket aperture (97%)',
      'Melted polycarbonate housing indicates persistent arcing (95%)',
      'Immediate fire / electrical shock hazard'
    ]
  },
  {
    id: 'ac-ice-03',
    title: 'AC Indoor Unit Dripping & Ice Buildup',
    category: 'ac_servicing',
    thumbnailUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600',
    description: 'Condensation dripping down wall surface from split AC indoor blower coil.',
    detectedIssue: 'Choked Evaporator Fins & Drain Tray Overflow',
    priority: 'high',
    confidence: 92,
    visualIndicators: [
      'Condensate spill detected along lower casing (91%)',
      'Dust matting on heat exchange fins restricts airflow (93%)',
      'Deep foam jet cleaning & drain flush recommended (₹500/hr tariff)'
    ]
  },
  {
    id: 'wall-crack-04',
    title: 'Masonry Wall Plaster Separation',
    category: 'civil_mesthri',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=600',
    description: 'Diagonal hairline shear crack propagating along brickwork mortar joint.',
    detectedIssue: 'Plaster Delamination & Mortar Joint Settlement',
    priority: 'normal',
    confidence: 89,
    visualIndicators: [
      'Linear structural separation along brick joint (88%)',
      'No immediate foundation collapse hazard detected',
      'Requires polymer cement patching & trowel re-plastering'
    ]
  }
];

/**
 * Analyzes an image (data URL or uploaded image filename / text prompt)
 * Returns structured AI Demo Analysis.
 */
export function analyzeProblemImage(
  imageSource: string,
  userTextDescription?: string
): ImageAnalysisResult {
  // If matched with one of the sample images
  const matchedSample = DEMO_SAMPLE_IMAGES.find(
    s => s.thumbnailUrl === imageSource || s.id === imageSource
  );

  if (matchedSample) {
    return {
      detectedIssue: matchedSample.detectedIssue,
      category: matchedSample.category,
      categoryName:
        matchedSample.category === 'plumbing'
          ? 'Plumbing'
          : matchedSample.category === 'electrical'
          ? 'Electrical'
          : matchedSample.category === 'ac_servicing'
          ? 'AC Servicing (₹500/hr)'
          : 'Civil Work / Mesthri',
      priority: matchedSample.priority,
      recommendedService:
        matchedSample.category === 'plumbing'
          ? 'Emergency Certified Plumber'
          : matchedSample.category === 'electrical'
          ? 'Licensed Wireman / Electrician'
          : matchedSample.category === 'ac_servicing'
          ? 'AC Technician (Foam Jet Wash)'
          : 'Civil Mesthri (Masonry Artisan)',
      confidence: matchedSample.confidence,
      visualIndicators: matchedSample.visualIndicators,
      suggestedAction:
        matchedSample.priority === 'emergency'
          ? 'Immediate dispatch of nearest verified cooperative technician advised.'
          : 'Schedule standard inspection slot with cooperative member.',
      isDemoAnalysis: true
    };
  }

  // If user uploaded a custom image, analyze image filename or combination with text
  const combined = `${imageSource} ${userTextDescription || ''}`.toLowerCase();

  if (
    combined.includes('wire') ||
    combined.includes('spark') ||
    combined.includes('switch') ||
    combined.includes('fuse') ||
    combined.includes('mcb') ||
    combined.includes('electric')
  ) {
    return {
      detectedIssue: 'Possible Electrical Fault / Socket Arcing',
      category: 'electrical',
      categoryName: 'Electrical',
      priority: 'emergency',
      recommendedService: 'Licensed Wireman / Electrician',
      confidence: 94,
      visualIndicators: [
        'Electrical terminal discoloration or disarray detected (93%)',
        'Shock hazard precaution recommended prior to technician arrival'
      ],
      suggestedAction: 'Turn off the main MCB breaker before touching the fixture.',
      isDemoAnalysis: true
    };
  }

  if (
    combined.includes('ac') ||
    combined.includes('cool') ||
    combined.includes('filter') ||
    combined.includes('gas') ||
    combined.includes('condenser')
  ) {
    return {
      detectedIssue: 'Air Conditioner Coil Clog or Cooling Loss',
      category: 'ac_servicing',
      categoryName: 'AC Servicing (₹500/hr)',
      priority: 'high',
      recommendedService: 'AC Service Technician',
      confidence: 91,
      visualIndicators: [
        'Evaporator airflow restriction or moisture leakage observed (91%)'
      ],
      suggestedAction: 'Recommend 1-hour Deep Foam Jet Wash under Apex ₹500/hr cap.',
      isDemoAnalysis: true
    };
  }

  // Default to Plumbing for standard leaks or generic demo
  return {
    detectedIssue: 'Possible Pipe Joint Leakage & Water Pressure Defect',
    category: 'plumbing',
    categoryName: 'Plumbing',
    priority: 'emergency',
    recommendedService: 'Certified Cooperative Plumber',
    confidence: 95,
    visualIndicators: [
      'Moisture / fluid reflection identified on pipe fitting (95%)',
      'Joint seal degradation detected on water intake line (92%)'
    ],
    suggestedAction: 'Shut off the localized stopcock valve. Dispatching nearest artisan.',
    isDemoAnalysis: true
  };
}
