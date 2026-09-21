import React from 'react';

interface PuducoMascotProps {
  mood?: 'happy' | 'listening' | 'celebrating' | 'encouraging';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PuducoMascot: React.FC<PuducoMascotProps> = ({
  mood = 'happy',
  className = '',
  size = 'md',
}) => {
  const sizeClass =
    size === 'sm'
      ? 'w-16 h-16 sm:w-20 sm:h-20'
      : size === 'lg'
      ? 'w-32 h-32 sm:w-40 sm:h-40'
      : 'w-24 h-24 sm:w-28 sm:h-28';

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeClass} ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-md transition-transform duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft ground shadow */}
        <ellipse cx="60" cy="112" rx="42" ry="7" fill="#4B5563" fillOpacity="0.12" />

        {/* Ears */}
        {/* Left Ear */}
        <path
          d="M32 36 C 22 18, 14 30, 24 46 Z"
          fill="#A0522D"
          stroke="#7A3D20"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M29 34 C 23 23, 19 32, 26 42 Z" fill="#F8B195" />

        {/* Right Ear */}
        <path
          d="M88 36 C 98 18, 106 30, 96 46 Z"
          fill="#A0522D"
          stroke="#7A3D20"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M91 34 C 97 23, 101 32, 94 42 Z" fill="#F8B195" />

        {/* Little Antlers (cornamenta de pudú tierno) */}
        <path
          d="M44 26 C 42 16, 38 12, 34 14 M 42 20 C 37 20, 35 18, 35 18"
          stroke="#5C4033"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M76 26 C 78 16, 82 12, 86 14 M 78 20 C 83 20, 85 18, 85 18"
          stroke="#5C4033"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Body (Little round cozy body) */}
        <rect
          x="35"
          y="72"
          width="50"
          height="38"
          rx="18"
          fill="#B86235"
          stroke="#7A3D20"
          strokeWidth="2.5"
        />
        {/* Tummy (Pecho color crema) */}
        <ellipse cx="60" cy="88" rx="16" ry="14" fill="#FDEBD0" />

        {/* Head */}
        <rect
          x="28"
          y="26"
          width="64"
          height="56"
          rx="24"
          fill="#C46E3A"
          stroke="#7A3D20"
          strokeWidth="2.5"
        />

        {/* Cheeks / Muzzle area (Hocico crema) */}
        <ellipse cx="60" cy="62" rx="18" ry="13" fill="#FDEBD0" />

        {/* Nose (Naricita tierna de pudú) */}
        <ellipse cx="60" cy="56" rx="5" ry="3.5" fill="#2C1810" />

        {/* Mouth */}
        {mood === 'celebrating' || mood === 'happy' ? (
          <path
            d="M54 62 Q 60 70 66 62"
            stroke="#2C1810"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        ) : mood === 'listening' ? (
          <ellipse cx="60" cy="64" rx="3.5" ry="3" fill="#2C1810" />
        ) : (
          <path
            d="M55 62 Q 60 67 65 62"
            stroke="#2C1810"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Eyes */}
        {mood === 'celebrating' ? (
          <>
            {/* Happy closed arched eyes */}
            <path
              d="M41 47 Q 47 41 53 47"
              stroke="#2C1810"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M67 47 Q 73 41 79 47"
              stroke="#2C1810"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : (
          <>
            {/* Left Eye */}
            <circle cx="47" cy="46" r="5.5" fill="#2C1810" />
            <circle cx="45.5" cy="44.5" r="2" fill="#FFFFFF" />
            <circle cx="48.5" cy="48" r="1" fill="#FFFFFF" />

            {/* Right Eye */}
            <circle cx="73" cy="46" r="5.5" fill="#2C1810" />
            <circle cx="71.5" cy="44.5" r="2" fill="#FFFFFF" />
            <circle cx="74.5" cy="48" r="1" fill="#FFFFFF" />
          </>
        )}

        {/* Rosy Cheeks */}
        <circle cx="37" cy="55" r="4" fill="#F87171" fillOpacity="0.5" />
        <circle cx="83" cy="55" r="4" fill="#F87171" fillOpacity="0.5" />

        {/* Headphones (when listening) */}
        {mood === 'listening' && (
          <g className="animate-pulse">
            {/* Band */}
            <path
              d="M24 48 C 22 18, 98 18, 96 48"
              stroke="#0284C7"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Earpad */}
            <rect x="18" y="40" width="10" height="18" rx="5" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
            {/* Right Earpad */}
            <rect x="92" y="40" width="10" height="18" rx="5" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
          </g>
        )}

        {/* Small Yellow Scarf (Chilenito abrigado) */}
        <path
          d="M38 72 C 48 76, 72 76, 82 72 C 78 80, 42 80, 38 72 Z"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="1.5"
        />
        <path
          d="M68 74 L 72 90 L 63 88 Z"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="1.5"
        />

        {/* Celebrating Stars */}
        {mood === 'celebrating' && (
          <g>
            <path d="M18 20 L 21 27 L 28 28 L 23 33 L 24 40 L 18 36 L 12 40 L 13 33 L 8 28 L 15 27 Z" fill="#FBBF24" />
            <path d="M102 18 L 105 24 L 111 25 L 107 29 L 108 35 L 102 32 L 96 35 L 97 29 L 93 25 L 99 24 Z" fill="#FBBF24" />
          </g>
        )}
      </svg>
    </div>
  );
};
