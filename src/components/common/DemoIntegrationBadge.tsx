import React from 'react';
import { CheckCircle2, FlaskConical, Milestone } from 'lucide-react';

export type IntegrationStatus = 'implemented' | 'demo' | 'planned';

interface Props {
  status: IntegrationStatus;
  label?: string;
  showIcon?: boolean;
  className?: string;
}

export const DemoIntegrationBadge: React.FC<Props> = ({
  status,
  label,
  showIcon = true,
  className = ''
}) => {
  if (status === 'implemented') {
    return (
      <span
        title="Active functional module running in client/prototype runtime"
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium tracking-tight rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/70 ${className}`}
      >
        {showIcon && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
        <span>{label || 'Implemented'}</span>
      </span>
    );
  }

  if (status === 'demo') {
    return (
      <span
        title="Interactive prototype simulation using structured domain algorithms & synthetic data"
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium tracking-tight rounded-md bg-amber-50 text-amber-800 border border-amber-200/80 ${className}`}
      >
        {showIcon && <FlaskConical className="w-3 h-3 text-amber-600" />}
        <span>{label || 'Demo / Mock'}</span>
      </span>
    );
  }

  return (
    <span
      title="Production integration planned for verified cooperative scale (PostgreSQL / Cloud API)"
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium tracking-tight rounded-md bg-slate-100 text-slate-700 border border-slate-200 ${className}`}
    >
      {showIcon && <Milestone className="w-3 h-3 text-slate-500" />}
      <span>{label || 'Planned Integration'}</span>
    </span>
  );
};
