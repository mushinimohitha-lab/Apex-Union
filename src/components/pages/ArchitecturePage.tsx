import React from 'react';
import {
  Layers,
  Database,
  Server,
  Smartphone,
  Cpu,
  Shield,
  CreditCard,
  MapPin,
  FileCode,
  CheckCircle2,
  ExternalLink,
  Code2
} from 'lucide-react';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-amber-400 text-xs font-semibold">
          <Code2 className="w-3.5 h-3.5" />
          <span>Project Requirements Document (PRD) Specifications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          System Architecture & Data Engineering
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Comprehensive full-stack architecture diagram, data schema entities, and API tiering designed for presentation, faculty panel defense, and production rollout.
        </p>
      </div>

      {/* Tiered Architectural Pipeline Flow */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              High-Level Multi-Tier Architectural Topology
            </h2>
            <p className="text-xs text-slate-500">
              Flutter / Client Web → FastAPI REST Backend → PostgreSQL Relational Store → ML & Computer Vision Microservices
            </p>
          </div>
          <DemoIntegrationBadge status="demo" label="PRD Architecture Blueprint" />
        </div>

        {/* Visual Architecture Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Layer 1: Client Tier */}
          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-indigo-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                Tier 1: Presentation
              </span>
              <Smartphone className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Flutter / React SPA</h3>
            <ul className="text-xs text-slate-600 space-y-1.5 leading-snug">
              <li>• Responsive Cross-Platform UI</li>
              <li>• Role-Based Views (Customer / Coop / Admin)</li>
              <li>• State Management & Offline Caching</li>
              <li>• Multilingual Speech & Vernacular Text</li>
            </ul>
            <div className="pt-2">
              <DemoIntegrationBadge status="implemented" label="Active React Prototype" />
            </div>
          </div>

          {/* Layer 2: API & Business Logic */}
          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Tier 2: Business Logic
              </span>
              <Server className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Python FastAPI / Node</h3>
            <ul className="text-xs text-slate-600 space-y-1.5 leading-snug">
              <li>• RESTful CRUD Endpoints</li>
              <li>• JWT Session Authentication</li>
              <li>• RBAC Authorization Gateways</li>
              <li>• Booking State Lifecycle Engine</li>
            </ul>
            <div className="pt-2">
              <DemoIntegrationBadge status="implemented" label="FastAPI Client Middleware" />
            </div>
          </div>

          {/* Layer 3: Persistence & Schema */}
          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Tier 3: Relational DB
              </span>
              <Database className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">PostgreSQL / SQL</h3>
            <ul className="text-xs text-slate-600 space-y-1.5 leading-snug">
              <li>• Normalized Multi-Coop Tenancy</li>
              <li>• Spatial Extensions (PostGIS)</li>
              <li>• Immutable Audit Event Trails</li>
              <li>• Financial Transaction Receipts</li>
            </ul>
            <div className="pt-2">
              <DemoIntegrationBadge status="planned" label="SQL Schema Specification" />
            </div>
          </div>

          {/* Layer 4: AI & Specialized Services */}
          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                Tier 4: Intelligence
              </span>
              <Cpu className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">AI, OCR & Cloud</h3>
            <ul className="text-xs text-slate-600 space-y-1.5 leading-snug">
              <li>• Multilingual NLP (EN, TE, HI)</li>
              <li>• Weighted Scoring Recommendation</li>
              <li>• OpenCV + OCR Document Ingestion</li>
              <li>• Razorpay / Maps Gateway Webhooks</li>
            </ul>
            <div className="pt-2">
              <DemoIntegrationBadge status="implemented" label="Working Heuristics" />
            </div>
          </div>
        </div>
      </div>

      {/* Database Schema Design (PRD Entities) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-600" />
            <span>Relational Entity Relationship Design (ERD Specification)</span>
          </h2>
          <p className="text-xs text-slate-500">
            Normalized data schema designed to scale across dozens of independent municipal cooperatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-mono font-bold text-indigo-700 block">users & roles</span>
            <ul className="font-mono text-[11px] text-slate-600 space-y-1">
              <li>id: UUID (PK)</li>
              <li>email: VARCHAR(255) UNIQUE</li>
              <li>phone: VARCHAR(20)</li>
              <li>role: ENUM (customer, coop_admin, platform_admin)</li>
              <li>preferred_language: ENUM (en, te, hi)</li>
              <li>created_at: TIMESTAMP</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-mono font-bold text-indigo-700 block">cooperatives</span>
            <ul className="font-mono text-[11px] text-slate-600 space-y-1">
              <li>id: UUID (PK)</li>
              <li>name: VARCHAR(255)</li>
              <li>registration_number: VARCHAR(100)</li>
              <li>district: VARCHAR(100)</li>
              <li>commission_cap_percent: NUMERIC(4,2)</li>
              <li>status: ENUM (active, suspended)</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-mono font-bold text-indigo-700 block">workers & profiles</span>
            <ul className="font-mono text-[11px] text-slate-600 space-y-1">
              <li>id: UUID (PK)</li>
              <li>user_id: UUID (FK -&gt; users)</li>
              <li>cooperative_id: UUID (FK -&gt; cooperatives)</li>
              <li>category_id: VARCHAR(50)</li>
              <li>experience_years: INT</li>
              <li>rating: NUMERIC(3,2)</li>
              <li>verification_status: ENUM</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-mono font-bold text-indigo-700 block">worker_documents</span>
            <ul className="font-mono text-[11px] text-slate-600 space-y-1">
              <li>id: UUID (PK)</li>
              <li>worker_id: UUID (FK -&gt; workers)</li>
              <li>document_type: ENUM</li>
              <li>ocr_extracted_payload: JSONB</li>
              <li>ocr_confidence: NUMERIC(4,3)</li>
              <li>verification_status: ENUM</li>
              <li>verified_by: UUID (FK -&gt; users)</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-mono font-bold text-indigo-700 block">bookings & lifecycle</span>
            <ul className="font-mono text-[11px] text-slate-600 space-y-1">
              <li>id: UUID (PK)</li>
              <li>customer_id: UUID (FK -&gt; users)</li>
              <li>worker_id: UUID (FK -&gt; workers)</li>
              <li>service_category: VARCHAR(50)</li>
              <li>service_amount: NUMERIC(10,2)</li>
              <li>commission_amount: NUMERIC(10,2)</li>
              <li>status: ENUM (REQUESTED ... COMPLETED)</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-mono font-bold text-indigo-700 block">audit_ledger_events</span>
            <ul className="font-mono text-[11px] text-slate-600 space-y-1">
              <li>id: UUID (PK)</li>
              <li>action_code: VARCHAR(100)</li>
              <li>performed_by: UUID (FK -&gt; users)</li>
              <li>target_entity_id: UUID</li>
              <li>event_metadata: JSONB</li>
              <li>timestamp: TIMESTAMP WITH TIME ZONE</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
