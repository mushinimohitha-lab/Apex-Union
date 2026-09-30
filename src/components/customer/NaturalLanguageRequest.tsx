import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Globe2,
  Mic,
  Zap,
  Camera,
  Upload,
  Image as ImageIcon,
  X,
  RefreshCw,
  Eye,
  AlertCircle
} from 'lucide-react';
import { classifyServiceRequest, NLPClassificationResult } from '../../services/nlpClassifier';
import {
  analyzeProblemImage,
  ImageAnalysisResult,
  DEMO_SAMPLE_IMAGES,
  DemoSampleImage
} from '../../services/imageAnalysisService';
import { ServiceCategoryKey } from '../../types';
import { DemoIntegrationBadge } from '../common/DemoIntegrationBadge';
import { VoiceInputButton } from '../common/VoiceInputButton';
import { useApp } from '../../context/AppContext';

interface Props {
  onCategorySelected: (
    cat: ServiceCategoryKey,
    query: string,
    priority?: 'emergency' | 'high' | 'normal',
    image?: string,
    detectedIssue?: string
  ) => void;
  activeCategory?: ServiceCategoryKey;
}

export const NaturalLanguageRequest: React.FC<Props> = ({
  onCategorySelected,
  activeCategory
}) => {
  const { t } = useApp();

  // Active Input Mode: 'text' | 'voice' | 'image'
  const [activeMode, setActiveMode] = useState<'text' | 'voice' | 'image'>('image');

  // Input states
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(DEMO_SAMPLE_IMAGES[0].thumbnailUrl);
  const [imageName, setImageName] = useState<string>('Leaking Bathroom Pipe Joint');
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);

  // Classification Results
  const [nlpResult, setNlpResult] = useState<NLPClassificationResult | null>(null);
  const [imageResult, setImageResult] = useState<ImageAnalysisResult | null>(null);

  // Camera stream ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Re-run NLP when text changes
  useEffect(() => {
    if (query.trim().length > 3) {
      const result = classifyServiceRequest(query);
      setNlpResult(result);
    } else {
      setNlpResult(null);
    }
  }, [query]);

  // Re-run Image analysis when image or query changes
  useEffect(() => {
    if (selectedImage) {
      setIsAnalyzingImage(true);
      const timer = setTimeout(() => {
        const result = analyzeProblemImage(selectedImage, query);
        setImageResult(result);
        setIsAnalyzingImage(false);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      setImageResult(null);
    }
  }, [selectedImage, query]);

  // Combined classification
  const finalCategory: ServiceCategoryKey =
    imageResult?.category || nlpResult?.detectedCategory || 'plumbing';

  const finalPriority: 'emergency' | 'high' | 'normal' =
    imageResult?.priority === 'emergency' || nlpResult?.priority === 'emergency'
      ? 'emergency'
      : imageResult?.priority === 'high' || nlpResult?.priority === 'high'
      ? 'high'
      : 'normal';

  const finalIssueName =
    imageResult?.detectedIssue || nlpResult?.identifiedProblem || 'Service Inspection';

  const samplePrompts = [
    { text: 'Na bathroom pipe leak ayindi, urgent ga plumber kavali.', lang: 'Telugu', label: 'Urgent Pipe Leak' },
    { text: 'Switchboard is sparking and MCB fuse is tripping.', lang: 'English', label: 'Electrical Spark' },
    { text: 'मेरे बाथरूम का पाइप लीक हो रहा है, तुरंत प्लंबर चाहिए।', lang: 'Hindi', label: 'Bathroom Pipe' },
    { text: 'AC cooling loss and water dripping down the wall.', lang: 'AC Servicing', label: 'AC ₹500/hr' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = event => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setActiveMode('image');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } else {
        throw new Error('Camera access not supported by browser.');
      }
    } catch (err: any) {
      setCameraError('Camera access denied or unavailable. You can upload an image file or click one of the demo samples.');
      setIsCameraActive(false);
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(dataUrl);
        setImageName('Live Camera Photo');
      }
      // Stop video stream
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
      setIsCameraActive(false);
    }
  };

  const handleCloseCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
    }
    setIsCameraActive(false);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageName('');
    setImageResult(null);
  };

  const handleApply = () => {
    const effectiveText = query.trim() || finalIssueName;
    onCategorySelected(
      finalCategory,
      effectiveText,
      finalPriority,
      selectedImage || undefined,
      finalIssueName
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-xl border border-indigo-900/50 relative overflow-hidden space-y-5">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              State Your Problem
            </span>
            <DemoIntegrationBadge status="demo" label="Multilingual NLP + Computer Vision" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
            Tell us, speak to us, or show us the problem
          </h2>
          <p className="text-xs text-slate-300">
            Submit via <strong>Voice</strong>, <strong>Text</strong>, or <strong>Upload/Capture Image</strong>. Submit alone or in any combination.
          </p>
        </div>

        {/* Global Language Pill */}
        <div className="flex items-center gap-1.5 text-xs text-indigo-300 bg-indigo-900/40 px-3 py-1.5 rounded-lg border border-indigo-700/50 self-start sm:self-auto">
          <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>తెలుగు · हिंदी · English</span>
        </div>
      </div>

      {/* 3 PROMINENT INPUT METHOD SELECTION CARDS */}
      <div className="grid grid-cols-3 gap-2.5 relative z-10">
        {/* Method 1: Voice */}
        <button
          type="button"
          onClick={() => setActiveMode('voice')}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
            activeMode === 'voice'
              ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-lg ring-2 ring-amber-400/50 scale-[1.01]'
              : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-900">
              <Mic className="w-4 h-4" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Method 1</span>
          </div>
          <div className="mt-2">
            <p className="text-xs font-bold leading-tight">🎤 Voice Problem</p>
            <p className="text-[10px] opacity-80">Telugu, Hindi, English</p>
          </div>
        </button>

        {/* Method 2: Text */}
        <button
          type="button"
          onClick={() => setActiveMode('text')}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
            activeMode === 'text'
              ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-lg ring-2 ring-amber-400/50 scale-[1.01]'
              : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-slate-900/30 flex items-center justify-center text-amber-900">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Method 2</span>
          </div>
          <div className="mt-2">
            <p className="text-xs font-bold leading-tight">⌨️ Type Description</p>
            <p className="text-[10px] opacity-80">Freeform text / prompt</p>
          </div>
        </button>

        {/* Method 3: Upload / Capture Image (HIGHLIGHTED) */}
        <button
          type="button"
          onClick={() => setActiveMode('image')}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
            activeMode === 'image'
              ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-lg ring-2 ring-amber-400/50 scale-[1.01]'
              : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-900">
              <Camera className="w-4 h-4" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Method 3</span>
          </div>
          <div className="mt-2">
            <p className="text-xs font-bold leading-tight">📷 Upload / Photo</p>
            <p className="text-[10px] opacity-80">AI Vision Diagnosis</p>
          </div>
        </button>
      </div>

      {/* INPUT SECTION BASED ON ACTIVE / COMBINED SELECTIONS */}
      <div className="space-y-4 relative z-10">
        {/* TEXT & VOICE INPUT AREA */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span>Problem Description (Type or use Voice):</span>
            </label>
            <div className="flex items-center gap-1.5">
              <VoiceInputButton
                onTranscript={text => setQuery(text)}
                currentValue={query}
                variant="badge"
                buttonLabel="Dictate in Voice"
              />
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={2}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='e.g., "Na bathroom pipe leak ayindi, urgent ga plumber kavali" or "Switchboard sparking"'
              className="w-full pl-4 pr-12 py-3 text-xs sm:text-sm bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-indigo-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none shadow-inner"
            />
            <div className="absolute right-2.5 bottom-3">
              <VoiceInputButton
                onTranscript={text => setQuery(text)}
                currentValue={query}
                variant="icon"
              />
            </div>
          </div>

          {/* Quick Clickable Text Samples */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-slate-400 font-semibold self-center mr-1">Quick Prompts:</span>
            {samplePrompts.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuery(s.text)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-950/70 hover:bg-indigo-900 text-slate-200 border border-indigo-800/60 hover:border-amber-400/60 transition-colors cursor-pointer"
              >
                <span className="text-amber-400 font-semibold">{s.lang}:</span> "{s.label}"
              </button>
            ))}
          </div>
        </div>

        {/* IMAGE UPLOAD & CAMERA CAPTURE SECTION */}
        <div className="bg-slate-950/70 rounded-xl p-4 border border-indigo-900/60 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                Image Upload & Camera Diagnostics
              </span>
              <p className="text-[11px] text-slate-400">
                Upload a photo from your device, take a live camera shot, or test realistic problem samples.
              </p>
            </div>

            {/* Upload & Camera Buttons */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload Image</span>
              </button>

              <button
                type="button"
                onClick={handleStartCamera}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>Take Photo</span>
              </button>
            </div>
          </div>

          {/* Camera Viewfinder if Camera is active */}
          {isCameraActive && (
            <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/50 space-y-3">
              <div className="relative rounded-lg overflow-hidden bg-black aspect-video max-h-56 mx-auto">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-2 border-emerald-400/40 rounded-lg pointer-events-none flex items-center justify-center">
                  <span className="text-[10px] text-emerald-300 bg-black/60 px-2 py-0.5 rounded">Center damaged area</span>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={handleCloseCamera}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCapturePhoto}
                  className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capture Frame</span>
                </button>
              </div>
            </div>
          )}

          {cameraError && (
            <div className="p-2 bg-rose-950/70 border border-rose-800/80 rounded-lg text-xs text-rose-200 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Quick Clickable Demo Sample Photos for Hackathon Panel Testing */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
              Or Click Demo Problem Photos (Instant Vision Diagnostic):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DEMO_SAMPLE_IMAGES.map(sample => {
                const isSelected = selectedImage === sample.thumbnailUrl;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => {
                      setSelectedImage(sample.thumbnailUrl);
                      setImageName(sample.title);
                    }}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/40'
                        : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
                    }`}
                  >
                    <img
                      src={sample.thumbnailUrl}
                      alt={sample.title}
                      className="w-full h-16 rounded-lg object-cover mb-1.5 ring-1 ring-slate-700 group-hover:scale-105 transition-transform"
                    />
                    <p className="text-[11px] font-bold text-white truncate">{sample.title}</p>
                    <span
                      className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded mt-0.5 inline-block ${
                        sample.priority === 'emergency'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {sample.category.toUpperCase()} • {sample.priority}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PREVIEW & AI DEMO ANALYSIS CARD */}
          {selectedImage && (
            <div className="mt-3 p-3.5 bg-slate-900/90 rounded-xl border border-amber-500/40 space-y-3 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <img
                    src={selectedImage}
                    alt="Active Preview"
                    className="w-12 h-12 rounded-lg object-cover ring-1 ring-amber-400/60"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{imageName || 'Selected Photo'}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                        AI Analyzed
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">Attached to Service Request</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1 rounded text-rose-400 hover:text-rose-200 hover:bg-rose-950/40"
                    title="Remove Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Computer Vision AI Demo Analysis Output */}
              {imageResult && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>AI Demo Analysis (Computer Vision Prototype):</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Confidence: {imageResult.confidence}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Detected Issue</span>
                      <span className="font-bold text-white">{imageResult.detectedIssue}</span>
                    </div>

                    <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Service Category</span>
                      <span className="font-bold text-amber-300 uppercase">{imageResult.categoryName}</span>
                    </div>

                    <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Priority Level</span>
                      <span
                        className={`font-black uppercase ${
                          imageResult.priority === 'emergency'
                            ? 'text-rose-400 animate-pulse'
                            : imageResult.priority === 'high'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {imageResult.priority}
                      </span>
                    </div>
                  </div>

                  {/* Visual Indicators list */}
                  <div className="p-2 rounded bg-indigo-950/40 border border-indigo-900/60 text-[11px] space-y-1">
                    <span className="font-bold text-indigo-300 block">Identified Visual Indicators:</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                      {imageResult.visualIndicators.map((ind, i) => (
                        <li key={i}>{ind}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* COMBINED SUBMIT BAR: TEXT + VOICE + IMAGE */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-indigo-900/60">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Ready to Submit:</span>
              <span className="font-bold text-amber-300">
                {query.trim() && selectedImage
                  ? 'TEXT + IMAGE'
                  : selectedImage
                  ? 'IMAGE ONLY'
                  : query.trim()
                  ? 'TEXT / VOICE'
                  : 'INSPECTION REQUEST'}
              </span>
              <span>•</span>
              <span className="capitalize font-bold text-emerald-400">
                Category: {finalCategory}
              </span>
              {finalPriority === 'emergency' && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">
                  EMERGENCY
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              Dispatches directly to nearest verified local cooperative artisans with transparent minimum tariffs.
            </p>
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] shrink-0"
          >
            <span>Find Verified {finalCategory.toUpperCase()} Workers</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
