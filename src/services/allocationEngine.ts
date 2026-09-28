import { Worker, Booking, AllocationSuggestion } from '../types';
import { calculateDistanceKm } from './recommendationEngine';

export function computeWorkforceAllocation(
  booking: Booking,
  cooperativeWorkers: Worker[]
): AllocationSuggestion[] {
  // Filter for matching cooperative or applicable skill workers
  const eligibleWorkers = cooperativeWorkers.filter(
    w => w.cooperativeId === booking.cooperativeId || w.serviceCategory === booking.serviceCategory
  );

  const suggestions: AllocationSuggestion[] = eligibleWorkers.map(worker => {
    const reasons: string[] = [];
    let score = 0;

    // 1. Skill Match
    if (worker.serviceCategory === booking.serviceCategory) {
      score += 35;
      reasons.push(`Specialized ${worker.serviceCategory.replace('_', ' ')} artisan`);
    } else {
      score += 10;
    }

    // 2. Verification
    if (worker.verificationStatus === 'verified') {
      score += 20;
      reasons.push('Cooperative verified credentials & insurance');
    }

    // 3. Availability & Workload (Crucial for cooperative operational equity)
    if (worker.availability === 'available') {
      score += 15;
      reasons.push('Current status is Available on duty');
    }

    if (worker.currentWorkload === 0) {
      score += 15;
      reasons.push('Zero active workload (optimal for immediate allocation)');
    } else if (worker.currentWorkload === 1) {
      score += 10;
      reasons.push('Low workload (1 active task underway)');
    } else {
      score += 2;
      reasons.push(`Moderate workload (${worker.currentWorkload} jobs queued)`);
    }

    // 4. Distance to customer address
    // Estimate distance based on neighborhood coordinates or booking distance
    const dist = booking.distanceKm > 0 ? booking.distanceKm : 3.2;
    if (dist <= 3.5) {
      score += 10;
      reasons.push(`Nearby location (~${dist} km from service site)`);
    } else if (dist <= 8) {
      score += 6;
      reasons.push(`Standard urban zone transit (~${dist} km)`);
    } else {
      score += 2;
    }

    // 5. Experience & Rating
    if (worker.rating >= 4.8) {
      score += 5;
      reasons.push(`High customer satisfaction (${worker.rating}★ rating)`);
    }

    return {
      worker,
      score: Math.min(100, score),
      reasons,
      distanceKm: dist,
      currentWorkload: worker.currentWorkload
    };
  });

  return suggestions.sort((a, b) => b.score - a.score);
}
