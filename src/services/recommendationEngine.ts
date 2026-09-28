import { Worker, ServiceCategoryKey, RecommendationScore } from '../types';

export interface RecommendationParams {
  category: ServiceCategoryKey;
  customerLat?: number;
  customerLng?: number;
  maxDistanceKm?: number;
  preferredCooperativeId?: string;
  queryKeywords?: string[];
}

// Distance calculation using Haversine formula
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

export function computeWorkerRecommendationScore(
  worker: Worker,
  params: RecommendationParams
): RecommendationScore {
  const reasons: string[] = [];

  // Default customer coordinates (Banjara Hills, Hyderabad)
  const custLat = params.customerLat ?? 17.4156;
  const custLng = params.customerLng ?? 78.4350;

  const distanceKm = calculateDistanceKm(
    custLat,
    custLng,
    worker.location.lat,
    worker.location.lng
  );

  // 1. Skill Match Score (Max 35 points)
  let skillMatch = 0;
  if (worker.serviceCategory === params.category) {
    skillMatch = 30;
    reasons.push(`Direct match in ${worker.serviceCategory.replace('_', ' ')} discipline`);

    // Check specific sub-skill overlap if query terms exist
    if (params.queryKeywords && params.queryKeywords.length > 0) {
      const keywordHit = worker.skills.some(skill =>
        params.queryKeywords!.some(kw => skill.toLowerCase().includes(kw.toLowerCase()))
      );
      if (keywordHit) {
        skillMatch = 35;
        reasons.push(`Specialized competence in required repair type`);
      }
    }
  } else {
    skillMatch = 5;
  }

  // 2. Distance Score (Max 20 points)
  // Closer workers score higher. 0-3km: 20pts, 3-7km: 16pts, 7-12km: 12pts, >12km: 6pts
  let distanceScore = 0;
  if (distanceKm <= 3.0) {
    distanceScore = 20;
    reasons.push(`Nearby location (${distanceKm} km away)`);
  } else if (distanceKm <= 6.0) {
    distanceScore = 16;
    reasons.push(`Quick transit distance (${distanceKm} km away)`);
  } else if (distanceKm <= 12.0) {
    distanceScore = 12;
    reasons.push(`Within service radius (${distanceKm} km away)`);
  } else {
    distanceScore = 6;
  }

  // 3. Availability Score (Max 15 points)
  let availabilityScore = 0;
  if (worker.availability === 'available') {
    availabilityScore = 15;
    reasons.push(`Available for immediate / same-day dispatch`);
  } else if (worker.availability === 'busy') {
    availabilityScore = 8;
  } else {
    availabilityScore = 2;
  }

  // 4. Experience Score (Max 10 points)
  // Normalization: 8+ years = 10pts, 5-7 years = 8pts, 3-4 years = 6pts, 1-2 years = 4pts
  let experienceScore = 0;
  if (worker.experienceYears >= 7) {
    experienceScore = 10;
    reasons.push(`${worker.experienceYears} years master cooperative experience`);
  } else if (worker.experienceYears >= 4) {
    experienceScore = 8;
    reasons.push(`${worker.experienceYears} years verified field practice`);
  } else {
    experienceScore = 6;
  }

  // 5. Rating Score (Max 10 points)
  // 4.8 - 5.0 = 10pts, 4.5 - 4.79 = 8pts, 4.0 - 4.49 = 6pts
  let ratingScore = 0;
  if (worker.rating >= 4.8) {
    ratingScore = 10;
    reasons.push(`Exceptional ${worker.rating}★ rating from ${worker.reviewCount} customer reviews`);
  } else if (worker.rating >= 4.5) {
    ratingScore = 8;
    reasons.push(`High ${worker.rating}★ rating from customer feedback`);
  } else {
    ratingScore = 5;
  }

  // 6. Verification Score (Max 10 points)
  let verificationScore = 0;
  if (worker.verificationStatus === 'verified') {
    verificationScore = 10;
    reasons.push(`Cooperative verified credential holder`);
  } else if (worker.verificationStatus === 'processing') {
    verificationScore = 5;
  } else {
    verificationScore = 0;
  }

  // Workload balance penalty: deduct 2 points per concurrent active job to distribute union tasks
  const workloadPenalty = Math.min(6, worker.currentWorkload * 2);

  const rawTotal = skillMatch + distanceScore + availabilityScore + experienceScore + ratingScore + verificationScore - workloadPenalty;
  const totalScore = Math.max(0, Math.min(100, Math.round(rawTotal)));

  return {
    workerId: worker.id,
    totalScore,
    factors: {
      skillMatch,
      distanceScore,
      availabilityScore,
      experienceScore,
      ratingScore,
      verificationScore
    },
    reasons,
    distanceKm
  };
}

export function rankWorkersByRecommendation(
  workers: Worker[],
  params: RecommendationParams
): { worker: Worker; scoreData: RecommendationScore }[] {
  return workers
    .map(worker => ({
      worker,
      scoreData: computeWorkerRecommendationScore(worker, params)
    }))
    .sort((a, b) => b.scoreData.totalScore - a.scoreData.totalScore);
}
