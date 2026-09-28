import React, { useState } from 'react';
import {
  Sparkles,
  BrainCircuit,
  Cpu,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  Globe2,
  Scale,
  Users
} from 'lucide-react';
import { classifyServiceRequest } from '../../services/nlpClassifier';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

export const AIFeaturesPage: React.FC = () => {
  const [testQuery, setTestQuery] = useState('నా ఇంట్లో పైప్ లీక్ అవుతోంది, నీళ్ళు కారుతున్నాయి');
  const nlpResult = classifyServiceRequest(testQuery);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs text-indigo-700 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Artificial Intelligence & Machine Learning Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Transparent, Fair & Interpretable AI
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Apex Union implements algorithmic explainability. Workers and cooperative administrators can inspect exactly why allocations and recommendations occur without predatory black-box penalties.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pillar 1: Multilingual NLP */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                  AI Subsystem 01
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Multilingual Service Request NLP
                </h3>
              </div>
            </div>
            <DemoIntegrationBadge status="implemented" label="Implemented" />
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Customers frequently describe mechanical and home repair problems in regional vernacular idioms. Our multilingual taxonomy engine analyzes natural language in English, Telugu, and Hindi to pinpoint the primary trade category and symptom severity.
          </p>

          {/* Interactive Tester */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
            <label className="block font-semibold text-slate-700">
              Interactive Classifier Sandbox (Try typing Telugu or Hindi):
            </label>
            <input
              type="text"
              value={testQuery}
              onChange={e => setTestQuery(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            />

            <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Detected Trade Discipline:</span>
                <span className="font-bold text-indigo-700 uppercase">{nlpResult.categoryName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Language Detected:</span>
                <span className="font-semibold text-slate-800">{nlpResult.detectedLanguage}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Calculated Confidence:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {(nlpResult.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                {nlpResult.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* Pillar 2: Weighted Worker Recommendation */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                  AI Subsystem 02
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Weighted Worker Recommendation
                </h3>
              </div>
            </div>
            <DemoIntegrationBadge status="implemented" label="Implemented" />
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Rather than relying on closed ad-bidding or obscure ranking scores, Apex Union calculates worker recommendations using a normalized, published formula:
          </p>

          {/* Formula Card */}
          <div className="p-3.5 bg-slate-900 text-white rounded-xl font-mono text-[11px] space-y-1.5 border border-slate-800">
            <p className="text-amber-400 font-bold">Recommendation Score (0 - 100) =</p>
            <p className="text-slate-300">
              Skill Match (35 pts) + Distance Proximity (20 pts) +
            </p>
            <p className="text-slate-300">
              Live Availability (15 pts) + Verified Experience (10 pts) +
            </p>
            <p className="text-slate-300">
              Customer Rating (10 pts) + Cooperative Document Verification (10 pts) -
            </p>
            <p className="text-slate-400 text-[10px]">
              Concurrent Workload Balancing Adjustment
            </p>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            Every customer receives plain-English bullet explanations of why each artisan was recommended.
          </p>
        </div>

        {/* Pillar 3: AI Workforce Allocation */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                  AI Subsystem 03
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Cooperative Workforce Allocation
                </h3>
              </div>
            </div>
            <DemoIntegrationBadge status="implemented" label="Implemented" />
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            When service bookings arrive at the cooperative, our allocation engine evaluates member work rotations. It prioritizes qualified artisans with lower active job counts to guarantee equitable earnings across union members and prevent burnout.
          </p>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <span className="font-bold block">Human-in-the-Loop Safeguard:</span>
            <p>
              AI recommendations assist the cooperative administrator. The administrator retains final unilateral authority to accept or reassign any worker dispatch.
            </p>
          </div>
        </div>

        {/* Pillar 4: Demand Analytics & Insights */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                  AI Subsystem 04
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Predictive Demand & Capacity Insights
                </h3>
              </div>
            </div>
            <DemoIntegrationBadge status="demo" label="Demo Model" />
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Aggregates geographic request velocities to detect micro-surges (e.g. electrical faults during summer storms, plumbing calls on Sunday mornings). Cooperatives receive proactive shift rotation advisories rather than reactive emergency rushes.
          </p>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1 font-mono">
            <span className="text-slate-800 font-bold block">Example Generated Advisory:</span>
            <p className="text-[11px] leading-relaxed">
              "Plumbing demand forecast +24% for Hyderabad Central. Recommendation: Alert 3 on-call journeymen."
            </p>
          </div>
        </div>
      </div>

      {/* Prototype Boundary Notice */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-900 block">Academic & Prototype Evaluation Notice:</strong>
          <p>
            As stipulated in the Product Requirements Document (PRD), AI scores are domain-structured heuristics and demonstration models designed for project defense and presentation. They are structured to be superseded by full scikit-learn / TensorFlow / Gemini production pipelines during commercial scaling.
          </p>
        </div>
      </div>
    </div>
  );
};
