import React from 'react';

export type PuduMood = 'idle' | 'speaking' | 'listening' | 'celebrating' | 'thinking';

interface PuduAvatarProps {
  mood?: PuduMood;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSpeechBubble?: boolean;
  bubbleText?: string;
  className?: string;
}

export const PuduAvatar: React.FC<PuduAvatarProps> = ({
  mood = 'idle',
  size = 'md',
  showSpeechBubble = false,
  bubbleText = '',
  className = '',
}) => {
  const sizeClasses: Record<string, string> = {
    xs: 'w-7 h-7 sm:w-8 sm:h-8',
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44',
  };

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      {/* SVG del Pudú Chileno Estilo Duolingo */}
      <div
        className={`${sizeClasses[size] || sizeClasses.sm} relative shrink-0 transition-transform duration-300 ${
          mood === 'celebrating'
            ? 'animate-bounce'
            : mood === 'listening'
            ? 'scale-105'
            : ''
        }`}
      >
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-md select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sombra suave inferior */}
          <ellipse cx="80" cy="148" rx="45" ry="8" fill="#e2e8f0" />

          {/* Orejas de Pudú con interior rosado */}
          {/* Oreja Izquierda */}
          <g transform="rotate(-15 45 42)">
            <ellipse cx="45" cy="42" rx="14" ry="24" fill="#a0522d" />
            <ellipse cx="45" cy="42" rx="8" ry="16" fill="#fbcfe8" />
          </g>
          {/* Oreja Derecha */}
          <g transform="rotate(15 115 42)">
            <ellipse cx="115" cy="42" rx="14" ry="24" fill="#a0522d" />
            <ellipse cx="115" cy="42" rx="8" ry="16" fill="#fbcfe8" />
          </g>

          {/* Pequeños cuernitos redondeados tiernos de pudú */}
          <path
            d="M 58 36 Q 54 22 59 18 Q 65 20 63 36 Z"
            fill="#78350f"
          />
          <path
            d="M 102 36 Q 106 22 101 18 Q 95 20 97 36 Z"
            fill="#78350f"
          />

          {/* Cabeza Redondeada tierno Pudú */}
          <circle cx="80" cy="78" r="50" fill="#b45309" />
          {/* Frente y mofletes suaves de color marrón caramelo claro */}
          <ellipse cx="80" cy="88" rx="42" ry="34" fill="#d97706" />

          {/* Hojita o flor nativa en la cabeza */}
          <g transform="translate(48, 28) rotate(-20)">
            <ellipse cx="8" cy="6" rx="8" ry="4" fill="#16a34a" />
            <ellipse cx="14" cy="10" rx="6" ry="3" fill="#22c55e" />
          </g>

          {/* Ojos expresivos según el estado */}
          {mood === 'celebrating' ? (
            /* Ojos felices estrellados ^^ */
            <g fill="none" stroke="#451a03" strokeWidth="4" strokeLinecap="round">
              <path d="M 58 75 Q 65 65 72 75" />
              <path d="M 88 75 Q 95 65 102 75" />
            </g>
          ) : mood === 'listening' ? (
            /* Ojos atentos grandes con brillos */
            <g>
              <ellipse cx="65" cy="73" rx="8" ry="10" fill="#27272a" />
              <ellipse cx="95" cy="73" rx="8" ry="10" fill="#27272a" />
              <circle cx="63" cy="70" r="3.5" fill="#ffffff" />
              <circle cx="93" cy="70" r="3.5" fill="#ffffff" />
              <circle cx="67" cy="75" r="1.5" fill="#ffffff" />
              <circle cx="97" cy="75" r="1.5" fill="#ffffff" />
            </g>
          ) : (
            /* Ojos normales simpáticos */
            <g>
              <ellipse cx="65" cy="74" rx="7" ry="8" fill="#27272a" />
              <ellipse cx="95" cy="74" rx="7" ry="8" fill="#27272a" />
              <circle cx="63" cy="71" r="3" fill="#ffffff" />
              <circle cx="93" cy="71" r="3" fill="#ffffff" />
            </g>
          )}

          {/* Mejillas sonrosadas (blush) */}
          <ellipse cx="50" cy="86" rx="7" ry="4" fill="#f43f5e" opacity="0.45" />
          <ellipse cx="110" cy="86" rx="7" ry="4" fill="#f43f5e" opacity="0.45" />

          {/* Hocico y Naricita redondeada */}
          <ellipse cx="80" cy="94" rx="20" ry="14" fill="#fef3c7" />
          <ellipse cx="80" cy="89" rx="8" ry="5" fill="#27272a" />
          <ellipse cx="78" cy="88" rx="2.5" ry="1.5" fill="#ffffff" opacity="0.6" />

          {/* Boca según el mood */}
          {mood === 'speaking' ? (
            /* Boca abierta hablando 'O' */
            <g>
              <ellipse cx="80" cy="100" rx="6" ry="7" fill="#831843" />
              <ellipse cx="80" cy="103" rx="4" ry="3" fill="#fb7185" />
            </g>
          ) : mood === 'celebrating' ? (
            /* Gran sonrisa abierta */
            <path
              d="M 72 97 Q 80 108 88 97 Z"
              fill="#831843"
            />
          ) : (
            /* Sonrisa dulce suave */
            <path
              d="M 73 97 Q 80 103 87 97"
              fill="none"
              stroke="#451a03"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Bufandita verde estilo Duolingo */}
          <g>
            <path
              d="M 52 114 Q 80 128 108 114 Q 102 128 80 134 Q 58 128 52 114 Z"
              fill="#10b981"
            />
            {/* Pliegue de la bufanda */}
            <path
              d="M 90 122 L 96 142 L 82 144 L 80 126 Z"
              fill="#059669"
            />
            {/* Rayas de la bufanda */}
            <line x1="83" y1="134" x2="94" y2="132" stroke="#ffffff" strokeWidth="2.5" />
          </g>

          {/* Auriculares / Micrófono si está escuchando */}
          {mood === 'listening' && (
            <g>
              {/* Diadema de audífonos */}
              <path
                d="M 40 68 Q 80 24 120 68"
                fill="none"
                stroke="#10b981"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Almohadilla izquierda */}
              <rect x="32" y="60" width="12" height="22" rx="6" fill="#047857" />
              {/* Almohadilla derecha */}
              <rect x="116" y="60" width="12" height="22" rx="6" fill="#047857" />
            </g>
          )}

          {/* Estrellitas si está celebrando */}
          {mood === 'celebrating' && (
            <g>
              <polygon points="30,30 33,37 40,38 35,43 36,50 30,46 24,50 25,43 20,38 27,37" fill="#fbbf24" />
              <polygon points="135,35 137,40 142,41 138,44 139,50 135,47 131,50 132,44 128,41 133,40" fill="#fbbf24" />
            </g>
          )}
        </svg>
      </div>

      {/* Burbuja de diálogo estilo Duolingo */}
      {showSpeechBubble && bubbleText && (
        <div className="relative bg-white border-2 border-stone-200 rounded-2xl p-4 shadow-sm max-w-sm sm:max-w-md text-left transition-all">
          {/* Triangulito que apunta al Pudú */}
          <div className="absolute left-[-9px] top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-stone-200" />
          <div className="absolute left-[-7px] top-6 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[8px] border-r-white" />

          <p className="text-sm font-bold text-stone-800 leading-relaxed">
            {bubbleText}
          </p>
        </div>
      )}
    </div>
  );
};
