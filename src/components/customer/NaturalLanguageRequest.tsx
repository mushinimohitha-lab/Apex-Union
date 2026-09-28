import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, MessageSquare, Globe2 } from 'lucide-react';
import { classifyServiceRequest, NLPClassificationResult } from '../../services/nlpClassifier';
import { ServiceCategoryKey } from '../../types';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';

interface Props {
  onCategorySelected: (cat: ServiceCategoryKey, query: string) => void;
  activeCategory?: ServiceCategoryKey;
}

export const NaturalLanguageRequest: React.FC<Props> = ({
  onCategorySelected,
  activeCategory
}) => {
  const [query, setQuery] = useState('');
  const [nlpResult, setNlpResult] = useState<NLPClassificationResult | null>(null);

  // Run classification as user types or selects sample
  useEffect(() => {
    if (query.trim().length > 3) {
      const result = classifyServiceRequest(query);
      setNlpResult(result);
    } else {
      setNlpResult(null);
    }
  }, [query]);

  const samplePrompts = [
    { text: 'My kitchen tap is leaking.', lang: 'English', category: 'Plumbing' },
    { text: 'నా ఇంట్లో పైప్ లీక్ అవుతోంది.', lang: 'Telugu', category: 'Plumbing' },
    { text: 'मेरे घर में बिजली की समस्या है।', lang: 'Hindi', category: 'Electrical' },
    { text: 'AC is blowing warm air, cooling stopped.', lang: 'English', category: 'AC Service' },
    { text: 'Cabinet hinge is broken, need carpenter.', lang: 'English', category: 'Carpentry' }
  ];

  const handleApply = () => {
    if (nlpResult) {
      onCategorySelected(nlpResult.detectedCategory, query);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-xl border border-indigo-900/50 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Natural Language Problem Understanding
              </span>
              <DemoIntegrationBadge status="demo" label="Multilingual NLP Model" />
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Describe Your Problem Naturally
            </h3>
            <p className="text-xs text-slate-300">
              Type or speak in English, Telugu (తెలుగు), or Hindi (हिंदी). Our AI identifies the trade discipline and matches verified artisans.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-900/40 px-3 py-1.5 rounded-lg border border-indigo-700/50 self-start sm:self-auto">
            <Globe2 className="w-4 h-4 text-indigo-400" />
            <span>English · తెలుగు · हिंदी Supported</span>
          </div>
        </div>

        {/* Input box */}
        <div className="relative">
          <textarea
            rows={2}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type your issue (e.g., 'Bathroom tap is dripping and valve is loose', or 'నా ఇంట్లో పైప్ లీక్ అవుతోంది', or 'स्विच बोर्ड से चिंगारी निकल रही है')..."
            className="w-full px-4 py-3 text-sm bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-indigo-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none"
          />
        </div>

        {/* Quick Sample Chips */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
            Test Interactive Sample Multilingual Prompts:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuery(s.text)}
                className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-slate-200 border border-indigo-700/40 hover:border-indigo-500 transition-all flex items-center gap-1.5"
              >
                <span className="text-[10px] text-amber-300 font-semibold">{s.lang}:</span>
                <span className="truncate max-w-[200px]">"{s.text}"</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Classification Result Card */}
        {nlpResult && (
          <div className="p-3.5 bg-indigo-900/50 border border-indigo-600/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-indigo-300">Detected Trade Service:</span>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-wide">
                  {nlpResult.categoryName}
                </span>
                <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-mono">
                  Confidence: {(nlpResult.confidence * 100).toFixed(0)}%
                </span>
                <span className="text-[10px] text-indigo-300">({nlpResult.detectedLanguage})</span>
              </div>
              <p className="text-xs text-slate-300">
                {nlpResult.explanation}
              </p>
            </div>

            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Find Suitable Workers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
