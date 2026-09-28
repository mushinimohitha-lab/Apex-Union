import React from 'react';

export interface ApexUnionEmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'dark' | 'light';
  showText?: boolean;
  subtitle?: string;
  className?: string;
}

/**
 * Apex Union Official Logo & Brand Emblem
 * 
 * Symbolism of Unity and Skilled Workmanship:
 * 1. The "A" Pinnacle (Skilled Workmanship):
 *    - An architectural, faceted upward chevron representing the summit ("Apex") of trade mastery.
 *    - Modeled after the precision draftsman's compass and master craftsman's square.
 * 2. The "U" Solidarity Cradle (Unity):
 *    - Two dynamic, interlocking golden ribbons meeting in a seamless solidarity clasp.
 *    - Represents democratic labour cooperatives, 90% direct fair wages, and collective worker protection.
 * 3. The Central Guild Core:
 *    - A 4-point diamond star symbolizing precision calibration, ITI/NSDC trade certification, and fair tariffs.
 * 4. Obsidian Hexagonal Guild Shield:
 *    - A modern chamfered shield backplate providing contrast and representing institutional security and worker welfare.
 */
export const ApexUnionEmblem: React.FC<ApexUnionEmblemProps> = ({
  size = 'md',
  variant = 'dark',
  showText = true,
  subtitle = 'Labour Cooperatives Federation',
  className = ''
}) => {
  const pixelSizes = {
    sm: 36,
    md: 46,
    lg: 68,
    xl: 96
  };

  const px = pixelSizes[size];

  // Distinct color configurations for theme contexts
  const isLightVariant = variant === 'light' || variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Precision Vector Emblem */}
      <svg
        width={px}
        height={px}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md select-none transition-transform duration-200 group-hover:scale-105"
        role="img"
        aria-label="Apex Union Official Logo: Unity & Skilled Workmanship"
      >
        <defs>
          {/* Primary High-Gloss Gold Gradient (Light Facet) */}
          <linearGradient id="apexGoldPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="25%" stopColor="#FBBF24" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Deep Amber-Bronze Gradient (Shadow Facet) */}
          <linearGradient id="apexGoldShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* Core Shield Slate-Obsidian Gradient */}
          <linearGradient id="apexShieldBase" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Inner Radiant Core Ambient Glow */}
          <radialGradient id="apexCoreGlow" cx="50%" cy="46%" r="48%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="80%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>

          {/* Outer Ring Gold Gradient */}
          <linearGradient id="apexRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* 1. Outer Circular Federation Border of Solidarity */}
        <circle
          cx="50"
          cy="50"
          r="47"
          stroke="url(#apexRingGrad)"
          strokeWidth="2.2"
          fill="none"
          opacity="0.9"
        />

        {/* 2. Precision Trade Metric Ring (Subtle Calibration Ticks) */}
        <circle
          cx="50"
          cy="50"
          r="43"
          stroke="url(#apexRingGrad)"
          strokeWidth="0.75"
          strokeDasharray="2.5 2.5"
          fill="none"
          opacity="0.5"
        />

        {/* 4 Cardinal Regional Guild Markers (Statewide Federation) */}
        <circle cx="50" cy="5" r="1.5" fill="url(#apexGoldPrimary)" />
        <circle cx="95" cy="50" r="1.5" fill="url(#apexGoldPrimary)" />
        <circle cx="50" cy="95" r="1.5" fill="url(#apexGoldPrimary)" />
        <circle cx="5" cy="50" r="1.5" fill="url(#apexGoldPrimary)" />

        {/* 3. Obsidian Faceted Guild Shield (Protection & Collective Security) */}
        <path
          d="M 50 10 L 83 23 C 83 54 68 77 50 89 C 32 77 17 54 17 23 Z"
          fill="url(#apexShieldBase)"
          stroke="url(#apexRingGrad)"
          strokeWidth="1.6"
        />
        <path
          d="M 50 10 L 83 23 C 83 54 68 77 50 89 C 32 77 17 54 17 23 Z"
          fill="url(#apexCoreGlow)"
        />

        {/* 4. SKILLED WORKMANSHIP: The "A" (Apex Pinnacle & Precision Caliper) */}
        {/* Left Lit Facet of Apex Chevron */}
        <path
          d="M 50 17 L 31 52 L 40 52 L 50 32 Z"
          fill="url(#apexGoldPrimary)"
        />
        {/* Right Shadow Facet of Apex Chevron */}
        <path
          d="M 50 17 L 69 52 L 60 52 L 50 32 Z"
          fill="url(#apexGoldShadow)"
        />

        {/* Precision Trade Caliper / Crossbeam (Mastery & Standards) */}
        <path
          d="M 37 41 L 63 41 L 61 45 L 39 45 Z"
          fill="url(#apexGoldPrimary)"
        />

        {/* 5. UNITY: The "U" (Interlocking Solidarity Clasp & Cooperative Ribbon) */}
        {/* Left Sweeping Ribbon (Workers & Guilds) */}
        <path
          d="M 26 49 C 26 67 37 77 50 77 C 54 77 58 75 62 72 L 57 67 C 55 69 52 70 50 70 C 41 70 34 62 34 49 Z"
          fill="url(#apexGoldPrimary)"
        />

        {/* Right Sweeping Ribbon (Customers & Society) */}
        <path
          d="M 74 49 C 74 67 63 77 50 77 C 46 77 42 75 38 72 L 43 67 C 45 69 48 70 50 70 C 59 70 66 62 66 49 Z"
          fill="url(#apexGoldShadow)"
        />

        {/* Handshake Clasp Center Intersection (Unbreakable Solidarity Bond) */}
        <polygon
          points="50,49 56,56 50,63 44,56"
          fill="url(#apexGoldPrimary)"
        />
        <circle cx="50" cy="56" r="2.2" fill="#0F172A" />

        {/* 6. Three Stars of Democratic Governance (Workers, Cooperatives, Consumers) */}
        <circle cx="36" cy="67" r="1.6" fill="url(#apexGoldPrimary)" />
        <circle cx="50" cy="80" r="2.2" fill="url(#apexGoldPrimary)" />
        <circle cx="64" cy="67" r="1.6" fill="url(#apexGoldPrimary)" />

        {/* 7. Summit Star of Apex Verification (Trade Certification at Peak) */}
        <polygon
          points="50,6.5 51.6,10.5 56,10.8 52.6,13.5 53.6,17.8 50,15.5 46.4,17.8 47.4,13.5 44,10.8 48.4,10.5"
          fill="url(#apexGoldPrimary)"
        />
      </svg>

      {/* Brand Typography Lockup */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span
              className={`font-black tracking-tight font-heading leading-tight ${
                size === 'sm'
                  ? 'text-base'
                  : size === 'lg'
                  ? 'text-xl'
                  : size === 'xl'
                  ? 'text-2xl'
                  : 'text-lg'
              } ${
                variant === 'gold'
                  ? 'text-white'
                  : isLightVariant
                  ? 'text-slate-900 group-hover:text-amber-600 transition-colors'
                  : 'text-slate-950'
              }`}
            >
              APEX UNION
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-2xs font-mono">
              COOP
            </span>
          </div>
          <p
            className={`font-medium tracking-normal leading-tight flex items-center gap-1.5 ${
              variant === 'gold' ? 'text-slate-400' : 'text-slate-500'
            } ${size === 'sm' ? 'text-[11px]' : 'text-xs'}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>{subtitle}</span>
          </p>
        </div>
      )}
    </div>
  );
};
