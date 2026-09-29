import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Globe2,
  Mic,
  Zap,
  Volume2
} from 'lucide-react';
import { classifyServiceRequest, NLPClassificationResult } from '../../services/nlpClassifier';
import { ServiceCategoryKey } from '../../types';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';
import { VoiceInputButton } from '../common/VoiceInputButton';
import { useApp } from '../../context/AppContext';

interface Props {
  onCategorySelected: (cat: ServiceCategoryKey, query: string, priority?: 'emergency' | 'high' | 'normal') => void;
  activeCategory?: ServiceCategoryKey;
}

export const NaturalLanguageRequest: React.FC<Props> = ({
  onCategorySelected,
  activeCategory
}) => {
  const { t } = useApp();
  const [query, setQuery] = useState('');
  const [nlpResult, setNlpResult] = useState<NLPClassificationResult | null>(null);

  // Run classification as user types or dictates via voice
  useEffect(() => {
    if (query.trim().length > 3) {
      const result = classifyServiceRequest(query);
      setNlpResult(result);
    } else {
      setNlpResult(null);
    }
  }, [query]);

  const samplePrompts = [
    { text: 'Na bathroom pipe leak ayindi, urgent ga plumber kavali.', lang: 'Telugu', label: 'Urgent Pipe Leak' },
    { text: 'నా ఇంట్లో పైప్ లీక్ అవుతోంది, అర్జెంట్ గా ప్లంబర్ కావాలి.', lang: 'Telugu (తెలుగు)', label: 'Emergency Plumbing' },
    { text: 'मेरे बाथरूम का पाइप लीक हो रहा है, तुरंत प्लंबर चाहिए।', lang: 'Hindi (हिंदी)', label: 'Bathroom Pipe Leak' },
    { text: 'குளியலறை குழாய் கசிகிறது, உடனடியாக பிளம்பர் தேவை.', lang: 'Tamil (தமிழ்)', label: 'Tamil Pipe Leak' },
    { text: 'ଘରର ବେସିନ୍ ପାଇପ୍ ଲିକ୍ ହେଉଛି, ତୁରନ୍ତ ପ୍ଲମ୍ବର ଦରକਾਰ |', lang: 'Odia (ଓଡ଼ିଆ)', label: 'Odia Plumbing' },
    { text: 'ਸਵਿੱਚ ਬੋਰਡ ਵਿੱਚੋਂ ਚੰਗਿਆੜੀਆਂ ਨਿਕਲ ਰਹੀਆਂ ਹਨ, ਤੁਰੰਤ ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ ਚਾਹੀਦਾ ਹੈ।', lang: 'Punjabi (ਪੰਜਾਬੀ)', label: 'Punjabi Electrical' },
    { text: 'Switchboard is sparking and fuse is tripping, urgent electrician.', lang: 'English', label: 'Electrical Spark' },
    { text: 'Need civil mesthri for brick wall construction and plastering.', lang: 'Mesthri (Civil)', label: 'Civil Mesthri' },
    { text: 'AC foam jet servicing needed for split AC at 500 per hr.', lang: 'AC Servicing', label: 'AC ₹500/hr' },
    { text: 'New inverter split AC installation required at 1000 tariff.', lang: 'AC Installation', label: 'AC ₹1,000' }
  ];

  const handleApply = () => {
    if (nlpResult) {
      onCategorySelected(nlpResult.detectedCategory, query, nlpResult.priority);
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setQuery(text);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-xl border border-indigo-900/50 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header with Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {t('nlp.badge')}
              </span>
              <DemoIntegrationBadge status="demo" label="Multilingual Speech & NLP" />
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {t('nlp.title')}
            </h3>
            <p className="text-xs text-slate-300">
              {t('nlp.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            {/* Primary Voice Input Button */}
            <VoiceInputButton
              onTranscript={handleVoiceTranscript}
              currentValue={query}
              variant="full"
              buttonLabel={t('nlp.speak_btn')}
            />
            <div className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-900/40 px-2.5 py-1.5 rounded-lg border border-indigo-700/50">
              <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>తెలుగు · हिंदी · தமிழ் · ଓଡ଼ିଆ · ਪੰਜਾਬੀ · EN</span>
            </div>
          </div>
        </div>

        {/* Input box with inline Voice & Clear Actions */}
        <div className="relative">
          <textarea
            rows={2}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('nlp.placeholder')}
            className="w-full pl-4 pr-12 py-3 text-sm bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-indigo-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none shadow-inner"
          />
          {/* Integrated Mic Button inside textarea right corner */}
          <div className="absolute right-2.5 bottom-3 flex items-center gap-1">
            <VoiceInputButton
              onTranscript={handleVoiceTranscript}
              currentValue={query}
              variant="icon"
            />
          </div>
        </div>

        {/* Quick Sample Multilingual Prompts */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Sample Customer Problems (Telugu, Hindi, Tamil, Odia, Punjabi, English):
            </span>
            <span className="text-[10px] text-amber-300 font-mono">
              Click to test
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuery(s.text)}
                className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-slate-200 border border-indigo-700/40 hover:border-amber-400/60 transition-all flex items-center gap-1.5 group cursor-pointer"
              >
                <span className="text-[10px] text-amber-400 font-bold">{s.lang}:</span>
                <span className="truncate max-w-[240px]">"{s.text}"</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live AI Classification Card: Category, Problem, Priority */}
        {nlpResult && (
          <div className="p-4 bg-indigo-950/70 border border-indigo-500/50 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    AI Identified:
                  </span>
                  {/* 1. Service Category */}
                  <div className="flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-md">
                    <span className="text-[10px] text-amber-400 uppercase font-bold">{t('nlp.detected_service')}:</span>
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wide">
                      {t(`cat.${nlpResult.detectedCategory}`, nlpResult.categoryName)}
                    </span>
                  </div>

                  {/* 2. Problem */}
                  <div className="flex items-center gap-1.5 bg-indigo-900/60 border border-indigo-700/60 px-2.5 py-0.5 rounded-md">
                    <span className="text-[10px] text-indigo-300 uppercase font-bold">{t('nlp.detected_problem')}:</span>
                    <span className="text-xs font-semibold text-white">
                      {nlpResult.identifiedProblem}
                    </span>
                  </div>

                  {/* 3. Priority */}
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[11px] font-bold ${
                      nlpResult.priority === 'emergency'
                        ? 'bg-rose-950/80 text-rose-300 border-rose-600 animate-pulse'
                        : nlpResult.priority === 'high'
                        ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                        : 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                    }`}
                  >
                    {nlpResult.priority === 'emergency' && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                    {nlpResult.priority === 'high' && <Zap className="w-3.5 h-3.5 text-amber-400" />}
                    <span className="uppercase tracking-wider">{t('nlp.priority')}: {nlpResult.priority}</span>
                  </div>

                  {/* Language & Confidence */}
                  <span className="text-[10px] text-slate-400 font-mono">
                    ({nlpResult.detectedLanguage} · {(nlpResult.confidence * 100).toFixed(0)}% Match)
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {nlpResult.explanation}
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleApply}
                className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer hover:scale-[1.02]"
              >
                <span>{t('nlp.find_workers')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Emergency Alert Banner if detected */}
            {nlpResult.isEmergency && (
              <div className="flex items-center gap-2 p-2 bg-rose-950/60 border border-rose-800/80 rounded-lg text-xs text-rose-200">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  <strong>{t('nlp.emergency_alert')}</strong>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
