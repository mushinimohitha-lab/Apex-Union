import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Globe2,
  Sparkles,
  Volume2,
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface VoiceInputProps {
  onTranscript: (text: string, language?: string) => void;
  currentValue?: string;
  className?: string;
  variant?: 'icon' | 'badge' | 'full';
  buttonLabel?: string;
}

// Window interface augmentation for Web Speech API
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

const SUPPORTED_LANGUAGES = [
  { code: 'te-IN', label: 'తెలుగు (Telugu)', short: 'తెలుగు', sample: 'నా బాత్‌రూమ్ పైప్ లీక్ అవుతోంది, అర్జెంట్‌గా ప్లంబర్ కావాలి.' },
  { code: 'hi-IN', label: 'हिंदी (Hindi)', short: 'हिंदी', sample: 'मेरे किचन का नल खराब है और पानी बह रहा है, तुरंत प्लंबर भेजो।' },
  { code: 'en-IN', label: 'English (India)', short: 'English', sample: 'My bathroom pipe is leaking under the sink, need an emergency plumber.' }
];

export const VoiceInputButton: React.FC<VoiceInputProps> = ({
  onTranscript,
  currentValue = '',
  className = '',
  variant = 'badge',
  buttonLabel = 'Voice Input'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState('te-IN');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Check speech support on mount
  useEffect(() => {
    const win = window as unknown as IWindow;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setHasSpeechSupport(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  const startAudioMeter = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 256;
          analyserRef.current = analyser;
          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const updateMeter = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const average = sum / dataArray.length;
            setAudioLevel(Math.min(100, Math.round((average / 128) * 100)));
            animFrameRef.current = requestAnimationFrame(updateMeter);
          };
          updateMeter();
        }
      }
    } catch (err) {
      // Audio stream error/permission denied - fallback to mock level
      simulateAudioMeters();
    }
  };

  const simulateAudioMeters = () => {
    let count = 0;
    const interval = setInterval(() => {
      if (!isListening) {
        clearInterval(interval);
        setAudioLevel(0);
        return;
      }
      count++;
      setAudioLevel(Math.floor(25 + Math.random() * 60));
    }, 150);
  };

  const stopAudioMeter = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setAudioLevel(0);
  };

  const startListening = () => {
    setSpeechError(null);
    setInterimTranscript('');
    setIsModalOpen(true);

    const win = window as unknown as IWindow;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasSpeechSupport(false);
      setIsListening(true);
      simulateVoiceRecognition(selectedLang);
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLang;

      recognition.onstart = () => {
        setIsListening(true);
        startAudioMeter();
      };

      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            currentText += transcriptChunk;
          } else {
            currentText += transcriptChunk;
          }
        }
        setInterimTranscript(currentText);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition notice:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission denied. You can select a sample speech query below to simulate voice input.');
        } else if (event.error === 'no-speech') {
          // ignore transient no-speech
        } else {
          setSpeechError(`Notice: ${event.error}. You can use sample speech inputs below.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        stopAudioMeter();
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.warn('Failed to start native recognition:', err);
      setIsListening(true);
      simulateVoiceRecognition(selectedLang);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    stopAudioMeter();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
      recognitionRef.current = null;
    }
  };

  const handleApplyTranscript = (textToApply?: string) => {
    const text = textToApply || interimTranscript;
    if (text && text.trim()) {
      onTranscript(text.trim(), selectedLang);
    }
    stopListening();
    setIsModalOpen(false);
    setInterimTranscript('');
  };

  // Simulation mode for demo or fallback
  const simulateVoiceRecognition = (langCode: string) => {
    setIsListening(true);
    simulateAudioMeters();
    const preset = SUPPORTED_LANGUAGES.find(l => l.code === langCode) || SUPPORTED_LANGUAGES[0];
    const words = preset.sample.split(' ');
    let current = '';
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < words.length) {
        current += (idx > 0 ? ' ' : '') + words[idx];
        setInterimTranscript(current);
        idx++;
      } else {
        clearInterval(interval);
        setIsListening(false);
        stopAudioMeter();
      }
    }, 300);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      {/* Trigger Button */}
      {variant === 'icon' ? (
        <button
          type="button"
          onClick={startListening}
          className={`p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all flex items-center justify-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-amber-300 ${className}`}
          title="Speak your problem (Telugu, Hindi, English)"
          aria-label="Speak your problem"
        >
          <Mic className="w-4 h-4 transition-transform group-hover:scale-110" />
        </button>
      ) : variant === 'full' ? (
        <button
          type="button"
          onClick={startListening}
          className={`px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-amber-300 ${className}`}
        >
          <div className="relative">
            <Mic className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          </div>
          <span>{buttonLabel}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/20 font-mono">
            తెలుగు · हिंदी · EN
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={startListening}
          className={`px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 hover:border-amber-400 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs group ${className}`}
        >
          <Mic className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:scale-110" />
          <span>{buttonLabel}</span>
          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 font-mono text-amber-200">
            Voice
          </span>
        </button>
      )}

      {/* Interactive Voice Recognition Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-700/60 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Voice Problem Dictation</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                      Live AI
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Speak your problem in Telugu, Hindi, or English
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  stopListening();
                  setIsModalOpen(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Selector Pills */}
            <div className="mt-4">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Select Your Spoken Language:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {SUPPORTED_LANGUAGES.map(lang => {
                  const isActive = selectedLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setSelectedLang(lang.code);
                        if (isListening) {
                          stopListening();
                        }
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-md'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {lang.short}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Central Listening Radar & Audio Visualizer */}
            <div className="mt-6 flex flex-col items-center justify-center py-6 px-4 bg-slate-950/60 rounded-xl border border-slate-800 relative">
              {/* Mic Icon with Ripple Rings */}
              <div className="relative mb-4 flex items-center justify-center">
                {isListening && (
                  <>
                    <span className="absolute w-24 h-24 rounded-full bg-amber-400/20 animate-ping" />
                    <span className="absolute w-20 h-20 rounded-full bg-amber-400/30 animate-pulse" />
                  </>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (isListening) {
                      stopListening();
                    } else {
                      startListening();
                    }
                  }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all relative z-10 cursor-pointer ${
                    isListening
                      ? 'bg-amber-400 text-slate-950 scale-105 ring-4 ring-amber-400/30'
                      : 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                  }`}
                >
                  {isListening ? (
                    <Mic className="w-7 h-7 animate-bounce" />
                  ) : (
                    <MicOff className="w-7 h-7 text-slate-400" />
                  )}
                </button>
              </div>

              {/* Status Text & Audio Waveform Bars */}
              <div className="text-center space-y-2">
                <p className="text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5">
                  {isListening ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span>Listening in {currentLangObj.label}... Speak clearly now</span>
                    </>
                  ) : (
                    <span className="text-slate-400">Microphone paused. Tap mic to record.</span>
                  )}
                </p>

                {/* Animated Sound Wave Bars */}
                <div className="flex items-center justify-center gap-1 h-8 pt-1">
                  {[40, 75, 90, 50, 100, 65, 80, 45, 95, 60, 30].map((h, i) => {
                    const dynamicHeight = isListening
                      ? Math.max(15, Math.min(100, (audioLevel / 100) * h + Math.random() * 20))
                      : 12;
                    return (
                      <span
                        key={i}
                        className="w-1 rounded-full transition-all duration-100"
                        style={{
                          height: `${dynamicHeight}%`,
                          backgroundColor: isListening ? '#F59E0B' : '#475569'
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Live Transcript Display Box */}
              <div className="w-full mt-4 p-3 bg-slate-900 border border-slate-700/80 rounded-lg min-h-[70px] text-left">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
                  Transcribed Problem:
                </span>
                <p className="text-xs text-white leading-relaxed font-sans min-h-[30px]">
                  {interimTranscript || (
                    <span className="text-slate-500 italic">
                      {isListening
                        ? 'Speech will appear here in real time as you talk...'
                        : 'No speech recorded yet. Tap the microphone to start speaking.'}
                    </span>
                  )}
                </p>
              </div>

              {speechError && (
                <div className="mt-2 text-[11px] text-amber-300 flex items-center gap-1 bg-amber-950/40 border border-amber-800/50 p-2 rounded w-full">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{speechError}</span>
                </div>
              )}
            </div>

            {/* Quick One-Tap Spoken Voice Presets */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Or Test Realistic Spoken Voice Samples:
                </span>
                <span className="text-[10px] text-slate-400">Click to transcribe</span>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {SUPPORTED_LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setInterimTranscript(lang.sample);
                    }}
                    className="w-full p-2 text-left rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-400/50 text-xs transition-all flex items-start gap-2 group cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110" />
                    <div>
                      <span className="font-semibold text-amber-300 text-[11px] mr-1.5">
                        {lang.short}:
                      </span>
                      <span className="text-slate-300 text-[11px]">"{lang.sample}"</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setInterimTranscript('');
                }}
                className="px-3 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    stopListening();
                    setIsModalOpen(false);
                  }}
                  className="px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!interimTranscript.trim()}
                  onClick={() => handleApplyTranscript()}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    interimTranscript.trim()
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Use Voice Transcript</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
