import React from 'react';

export interface AULogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'dark' | 'light';
  showText?: boolean;
  className?: string;
  subtitle?: string;
}

export const AULogo: React.FC<AULogoProps> = ({
  size = 'md',
  variant = 'dark',
  showText = true,
  className = '',
  subtitle = 'Labour Cooperatives Federation'
}) => {
  const pixelSizes = {
    sm: 36,
    md: 46,
    lg: 60,
    xl: 84
  };

  const px = pixelSizes[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* AU Vector Monogram Mark */}
      <svg
        width={px}
        height={px}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md select-none transition-transform duration-200 group-hover:scale-105"
        role="img"
        aria-label="Apex Union AU Official Logo"
      >
        <defs>
          <linearGradient id="auGoldPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="30%" stopColor="#FBBF24" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="auGoldShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="60%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <linearGradient id="auShieldBg" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="60%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>

        {/* Chamfered Obsidian Guild Shield Base */}
        <path
          d="M 50 6 L 88 20 C 88 56 71 80 50 94 C 29 80 12 56 12 20 Z"
          fill="url(#auShieldBg)"
          stroke="url(#auGoldPrimary)"
          strokeWidth="2.5"
        />

        {/* Inner Border Inset */}
        <path
          d="M 50 12 L 82 24 C 82 52 67 74 50 86 C 33 74 18 52 18 24 Z"
          stroke="url(#auGoldPrimary)"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          opacity="0.6"
        />

        {/* BOLD GEOMETRIC 'A' (Apex Pinnacle & Precision Caliper) */}
        {/* Left diagonal leg */}
        <path
          d="M 40 22 L 24 68 L 32 68 L 36 56 L 44 56 L 48 68 L 56 68 L 40 22 Z M 40 37 L 43 49 L 37 49 Z"
          fill="url(#auGoldPrimary)"
        />

        {/* BOLD GEOMETRIC 'U' (Interlocking Union Solidarity Ribbon) */}
        <path
          d="M 52 28 L 60 28 L 60 52 C 60 62 66 67 73 67 C 80 67 86 62 86 52 L 86 28 L 94 28 L 94 52 C 94 67 84 75 73 75 C 62 75 52 67 52 52 Z"
          fill="url(#auGoldShadow)"
        />

        {/* Central Unity Clasp Star */}
        <polygon
          points="49,53 52,47 55,53 61,53 56,57 58,63 52,59 46,63 48,57 43,53"
          fill="#FEF08A"
        />

        {/* Small Golden Federation Base Stars */}
        <circle cx="50" cy="80" r="2.2" fill="url(#auGoldPrimary)" />
        <circle cx="40" cy="74" r="1.5" fill="url(#auGoldPrimary)" />
        <circle cx="60" cy="74" r="1.5" fill="url(#auGoldPrimary)" />
      </svg>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight leading-tight ${
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
                  : variant === 'light'
                  ? 'text-white'
                  : 'text-slate-900 group-hover:text-amber-600 transition-colors'
              }`}
            >
              APEX UNION
            </span>
            <span className="text-[10px] font-black tracking-wider px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-mono">
              AU
            </span>
          </div>
          <p
            className={`font-medium tracking-normal leading-tight flex items-center gap-1 ${
              variant === 'gold' || variant === 'light' ? 'text-slate-400' : 'text-slate-500'
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
