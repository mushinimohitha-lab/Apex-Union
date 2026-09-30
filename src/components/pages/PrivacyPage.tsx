import React from 'react';
import { Lock, ShieldCheck, Database, Eye, ArrowLeft, ArrowRight, Users, Building2 } from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface PrivacyPageProps {
  onNavigate?: (view: string) => void;
  onBack?: () => void;
  onMove?: () => void;
  prevPageName?: string;
  nextPageName?: string;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
  onNavigate,
  onBack,
  onMove,
  prevPageName = 'Previous',
  nextPageName = 'Next'
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Data Governance & Privacy
          </span>
          <DemoIntegrationBadge status="implemented" label="Privacy Standard Draft" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Privacy & Data Protection Policy</h1>
        <p className="text-xs text-slate-500">Aligned with the Digital Personal Data Protection (DPDP) Act Guidelines</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            1. Information We Collect
          </h2>
          <p>
            Apex Union collects personal information strictly required to coordinate dispatch, ensure customer safety, and authenticate worker credentials:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Customer Data:</strong> Full name, telephone number, verified email, and location/service address for proximity dispatch.</li>
            <li><strong>Worker & Artisan Data:</strong> Name, contact details, trade category, years of experience, trade certificates, government identity hashes, and live availability status.</li>
            <li><strong>Booking & Financial Records:</strong> Service logs, problem descriptions, timestamps, demo transaction identifiers, and issued invoices.</li>
            <li><strong>Reviews & Ratings:</strong> Customer feedback, performance compliments, and quality audit notes used by the recommendation engine.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            2. Purpose of Processing & AI Usage
          </h2>
          <p>
            Customer problem queries in English, Telugu, or Hindi are processed locally to classify service categories. We do not sell user data to advertising syndicates. Proximity calculations use coarse urban coordinates to compute Euclidean distance without storing granular continuous GPS traces outside of active service fulfillment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            3. Worker Document Confidentiality
          </h2>
          <p>
            Scanned trade licenses and ITI diplomas uploaded by artisans are processed through access-controlled OCR verification vaults. Documents are exclusively visible to designated cooperative committee auditors and platform administrators for trade accreditation purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            4. User Rights, Access & Data Retention
          </h2>
          <p>
            Customers and workers maintain the right to view, update, or request anonymization of their account profiles. Audit logs and completed invoice vouchers are retained for statutory accounting periods mandated under cooperative society rules.
          </p>
        </section>
      </div>
    </div>
  );
};
