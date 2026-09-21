import React from 'react';

export type FaunaSpecies = 'pudu' | 'pinguino' | 'condor' | 'llama' | 'puma' | 'rana';
export type FaunaMood = 'idle' | 'happy' | 'speaking' | 'celebrating' | 'listening' | 'thinking';

interface FaunaAvatarProps {
  species: FaunaSpecies;
  mood?: FaunaMood;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSpeechBubble?: boolean;
  bubbleText?: string;
  className?: string;
}

export const FaunaAvatar: React.FC<FaunaAvatarProps> = ({
  species,
  mood = 'idle',
  size = 'md',
  showSpeechBubble = false,
  bubbleText = '',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-12 h-12',
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44',
  };

  const isBouncing = mood === 'celebrating';
  const isScale = mood === 'speaking' || mood === 'listening';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className={`${sizeClasses[size]} relative shrink-0 select-none transition-transform duration-200 ${
          isBouncing ? 'animate-bounce' : isScale ? 'scale-105' : ''
        }`}
      >
        {species === 'pudu' && <PuduSvg mood={mood} />}
        {species === 'pinguino' && <PinguinoSvg mood={mood} />}
        {species === 'condor' && <CondorSvg mood={mood} />}
        {species === 'llama' && <LlamaSvg mood={mood} />}
        {species === 'puma' && <PumaSvg mood={mood} />}
        {species === 'rana' && <RanaSvg mood={mood} />}
      </div>

      {showSpeechBubble && bubbleText && (
        <div className="relative bg-white border border-stone-200 rounded-2xl px-3.5 py-2.5 shadow-xs max-w-xs sm:max-w-sm text-left">
          <div className="absolute left-[-6px] top-4 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-stone-200" />
          <div className="absolute left-[-5px] top-4 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-white" />
          <p className="text-xs font-bold text-stone-800 leading-snug">{bubbleText}</p>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   1. PUDÚ (Bosques del Sur) - Guía de Fonética, Voz y Expresión Oral
   ========================================================================= */
const PuduSvg: React.FC<{ mood: FaunaMood }> = ({ mood }) => (
  <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xs" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="148" rx="42" ry="8" fill="#e2e8f0" />
    {/* Orejitas */}
    <g transform="rotate(-15 45 42)">
      <ellipse cx="45" cy="42" rx="14" ry="24" fill="#a0522d" />
      <ellipse cx="45" cy="42" rx="8" ry="16" fill="#fbcfe8" />
    </g>
    <g transform="rotate(15 115 42)">
      <ellipse cx="115" cy="42" rx="14" ry="24" fill="#a0522d" />
      <ellipse cx="115" cy="42" rx="8" ry="16" fill="#fbcfe8" />
    </g>
    {/* Cuernitos */}
    <path d="M 58 36 Q 54 22 59 18 Q 65 20 63 36 Z" fill="#78350f" />
    <path d="M 102 36 Q 106 22 101 18 Q 95 20 97 36 Z" fill="#78350f" />
    {/* Cabeza */}
    <circle cx="80" cy="78" r="48" fill="#b45309" />
    <ellipse cx="80" cy="88" rx="40" ry="32" fill="#d97706" />
    {/* Hojita nativa */}
    <g transform="translate(48, 28) rotate(-20)">
      <ellipse cx="8" cy="6" rx="8" ry="4" fill="#16a34a" />
      <ellipse cx="14" cy="10" rx="6" ry="3" fill="#22c55e" />
    </g>
    {/* Ojos */}
    {mood === 'celebrating' || mood === 'happy' ? (
      <g fill="none" stroke="#451a03" strokeWidth="4" strokeLinecap="round">
        <path d="M 58 75 Q 65 66 72 75" />
        <path d="M 88 75 Q 95 66 102 75" />
      </g>
    ) : (
      <g>
        <ellipse cx="65" cy="74" rx="7" ry="8" fill="#27272a" />
        <ellipse cx="95" cy="74" rx="7" ry="8" fill="#27272a" />
        <circle cx="63" cy="71" r="2.8" fill="#ffffff" />
        <circle cx="93" cy="71" r="2.8" fill="#ffffff" />
      </g>
    )}
    {/* Blush */}
    <ellipse cx="50" cy="86" rx="7" ry="4" fill="#f43f5e" opacity="0.45" />
    <ellipse cx="110" cy="86" rx="7" ry="4" fill="#f43f5e" opacity="0.45" />
    {/* Hocico */}
    <ellipse cx="80" cy="94" rx="18" ry="13" fill="#fef3c7" />
    <ellipse cx="80" cy="89" rx="7" ry="4.5" fill="#27272a" />
    {/* Sonrisa */}
    <path d="M 74 97 Q 80 103 86 97" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bufanda verde */}
    <path d="M 52 114 Q 80 128 108 114 Q 102 128 80 134 Q 58 128 52 114 Z" fill="#10b981" />
  </svg>
);

/* =========================================================================
   2. PINGÜINO DE HUMBOLDT (Costas de Chile) - Guía de Matemática y Cálculo
   ========================================================================= */
const PinguinoSvg: React.FC<{ mood: FaunaMood }> = ({ mood }) => (
  <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xs" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="148" rx="42" ry="8" fill="#e2e8f0" />
    {/* Patitas naranjas */}
    <ellipse cx="62" cy="140" rx="14" ry="7" fill="#f97316" />
    <ellipse cx="98" cy="140" rx="14" ry="7" fill="#f97316" />
    {/* Alitas / Aletas */}
    <ellipse cx="32" cy="90" rx="10" ry="24" transform="rotate(20 32 90)" fill="#1e293b" />
    <ellipse cx="128" cy="90" rx="10" ry="24" transform="rotate(-20 128 90)" fill="#1e293b" />
    {/* Cuerpo redondeado negro-azulado */}
    <ellipse cx="80" cy="82" rx="46" ry="52" fill="#0f172a" />
    {/* Pecho y pancita blanca limpia */}
    <ellipse cx="80" cy="92" rx="34" ry="40" fill="#f8fafc" />
    {/* Franja rosadita característica del pingüino de Humboldt sobre el pico */}
    <path d="M 68 76 Q 80 72 92 76" fill="none" stroke="#fda4af" strokeWidth="4" strokeLinecap="round" />
    {/* Gorrito marinero / visera escolar verde esmeralda */}
    <ellipse cx="80" cy="38" rx="28" ry="10" fill="#047857" />
    <circle cx="80" cy="32" r="5" fill="#10b981" />
    {/* Ojos expresivos */}
    {mood === 'celebrating' || mood === 'happy' ? (
      <g fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round">
        <path d="M 62 66 Q 68 60 74 66" />
        <path d="M 86 66 Q 92 60 98 66" />
      </g>
    ) : (
      <g>
        <circle cx="68" cy="65" r="7" fill="#0f172a" />
        <circle cx="92" cy="65" r="7" fill="#0f172a" />
        <circle cx="66" cy="63" r="2.8" fill="#ffffff" />
        <circle cx="90" cy="63" r="2.8" fill="#ffffff" />
      </g>
    )}
    {/* Mejillitas celestes o rosadas */}
    <ellipse cx="56" cy="74" rx="6" ry="3.5" fill="#f43f5e" opacity="0.35" />
    <ellipse cx="104" cy="74" rx="6" ry="3.5" fill="#f43f5e" opacity="0.35" />
    {/* Pico triangular amarillo-naranja */}
    <polygon points="80,72 70,86 90,86" fill="#f59e0b" />
    <polygon points="80,72 75,82 85,82" fill="#fbbf24" />
    {/* Corbatín de matemáticas rojo/ámbar */}
    <g transform="translate(80, 102)">
      <polygon points="-12,-6 -12,6 0,0" fill="#dc2626" />
      <polygon points="12,-6 12,6 0,0" fill="#dc2626" />
      <circle cx="0" cy="0" r="3.5" fill="#fbbf24" />
    </g>
  </svg>
);

/* =========================================================================
   3. CÓNDOR ANDINO (Cordillera y Cumbres) - Guía de Historia, Geografía y Mapas
   ========================================================================= */
const CondorSvg: React.FC<{ mood: FaunaMood }> = ({ mood }) => {
  const isSpeaking = mood === 'speaking';
  const isHappy = mood === 'happy' || mood === 'celebrating';

  return (
    <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xs" xmlns="http://www.w3.org/2000/svg">
      {/* 1. Cumbre andina / Risco de roca donde se posa el ave */}
      <polygon points="18,154 48,132 82,130 114,136 142,154 148,160 12,160" fill="#475569" />
      <polygon points="48,132 82,130 96,142 62,146 38,154" fill="#64748b" />
      <polygon points="68,130 82,130 90,136 78,138" fill="#94a3b8" />

      {/* 2. Cola de plumas de ave (remeras caudales negras que asoman tras la roca) */}
      <path d="M 38 116 L 22 138 L 34 142 L 50 128 Z" fill="#09090b" stroke="#18181b" strokeWidth="1" />
      <path d="M 44 118 L 30 144 L 42 146 L 56 130 Z" fill="#18181b" />

      {/* 3. Patas y garras de ave rapaz sujetando la roca */}
      <g fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round">
        {/* Pata izquierda de ave con 3 garras */}
        <path d="M 60 126 L 54 135" />
        <path d="M 62 126 L 61 137" />
        <path d="M 64 126 L 70 135" />
        {/* Pata derecha de ave con 3 garras */}
        <path d="M 88 126 L 82 136" />
        <path d="M 90 126 L 91 138" />
        <path d="M 92 126 L 98 136" />
      </g>
      {/* Nudillos de las patas */}
      <ellipse cx="62" cy="126" rx="6" ry="3" fill="#f59e0b" />
      <ellipse cx="90" cy="126" rx="6" ry="3" fill="#f59e0b" />

      {/* 4. Cuerpo de ave rapaz: silueta de pecho y dorso */}
      <path
        d="M 52 74 Q 44 98 56 122 Q 74 130 94 124 Q 106 108 106 82 Q 96 72 80 72 Q 64 72 52 74 Z"
        fill="#18181b"
      />
      {/* Plumas del pecho con textura de plumaje */}
      <path d="M 58 88 Q 66 94 74 88" fill="none" stroke="#27272a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 64 96 Q 72 102 80 96" fill="none" stroke="#27272a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 60 106 Q 68 112 76 106" fill="none" stroke="#27272a" strokeWidth="1.5" strokeLinecap="round" />

      {/* 5. Ala de ave rapaz con el distintivo parche blanco del Cóndor */}
      {/* Ala izquierda plegada atrás */}
      <path d="M 46 76 Q 36 92 40 114 Q 46 112 52 98 Z" fill="#09090b" />
      {/* Ala derecha principal plegada al costado */}
      <g>
        {/* Silueta del ala derecha */}
        <path
          d="M 82 74 Q 112 80 120 102 Q 124 116 116 124 Q 106 126 94 118 Q 84 100 80 82 Z"
          fill="#09090b"
          stroke="#27272a"
          strokeWidth="1.2"
        />
        {/* PARCHE BLANCO EN EL ALA: Característica biológica esencial del Cóndor Andino */}
        <path
          d="M 88 82 Q 106 86 114 98 Q 110 108 96 106 Q 88 98 86 88 Z"
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        {/* Plumas remeras del ala (digitaciones de vuelo) */}
        <path d="M 116 110 L 126 122 L 120 124 L 112 118" fill="#18181b" stroke="#09090b" strokeWidth="1" />
        <path d="M 110 116 L 120 128 L 114 130 L 106 122" fill="#18181b" stroke="#09090b" strokeWidth="1" />
      </g>

      {/* 6. Cuello y pliegue gular andino */}
      <path d="M 64 68 Q 62 48 72 40 L 86 40 Q 94 48 90 68 Z" fill="#475569" />
      {/* Pliegue carúncula rojizo en el cuello */}
      <path d="M 70 56 Q 76 60 82 56" fill="none" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round" />

      {/* 7. ICONO INCONFUNDIBLE: Collarín de plumón blanco esponjoso de ave */}
      <g>
        <ellipse cx="78" cy="70" rx="30" ry="12" fill="#e2e8f0" />
        <circle cx="52" cy="70" r="9" fill="#ffffff" />
        <circle cx="62" cy="74" r="10" fill="#ffffff" />
        <circle cx="74" cy="75" r="11" fill="#ffffff" />
        <circle cx="86" cy="75" r="11" fill="#ffffff" />
        <circle cx="98" cy="72" r="10" fill="#ffffff" />
        <circle cx="104" cy="68" r="8" fill="#ffffff" />
        <circle cx="94" cy="64" r="8" fill="#f8fafc" />
        <circle cx="78" cy="64" r="9" fill="#f8fafc" />
        <circle cx="62" cy="64" r="8" fill="#f8fafc" />
      </g>

      {/* 8. Cabeza de ave rapaz (cóndor andino mirando de perfil/tres cuartos hacia la derecha) */}
      <path
        d="M 64 46 Q 60 26 78 22 Q 94 20 102 34 Q 106 48 94 56 Q 80 58 68 54 Z"
        fill="#475569"
      />

      {/* 9. Cresta caruncular carnosa de cóndor macho andino */}
      <path
        d="M 74 22 Q 78 12 86 10 Q 94 10 96 22 Q 94 28 84 26 Z"
        fill="#991b1b"
      />
      <circle cx="86" cy="12" r="4.5" fill="#be123c" />

      {/* 10. Ojo de ave rapaz inteligente y noble */}
      {isHappy ? (
        <g fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round">
          <path d="M 80 36 Q 86 30 92 36" />
        </g>
      ) : (
        <g>
          {/* Ceja de rapaz */}
          <path d="M 78 30 L 92 34" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
          {/* Ojo ámbar */}
          <circle cx="85" cy="36" r="5.5" fill="#f59e0b" />
          <circle cx="85" cy="36" r="3.2" fill="#09090b" />
          <circle cx="84" cy="34.5" r="1.5" fill="#ffffff" />
        </g>
      )}

      {/* 11. PICO DE AVE RAPAZ: Inconfundible gancho curvado hacia abajo */}
      <g>
        {/* Cera oscura en la base del pico de ave con orificio nasal */}
        <path d="M 94 36 L 104 38 L 102 48 L 92 48 Z" fill="#334155" />
        <ellipse cx="98" cy="42" rx="2" ry="1.2" fill="#0f172a" />

        {/* Mandíbula inferior del ave */}
        {isSpeaking ? (
          <path d="M 94 48 L 108 52 Q 104 60 96 56 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
        ) : (
          <path d="M 94 47 L 106 49 L 98 52 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
        )}

        {/* Pico superior ganchudo rapaz color marfil/córneo curvado poderosamente hacia abajo */}
        <path
          d="M 100 38 Q 116 40 124 48 Q 128 56 122 66 Q 116 68 112 56 L 102 48 Z"
          fill="#fef08a"
          stroke="#ca8a04"
          strokeWidth="1.8"
        />
        {/* Brillo de luz sobre la curva del pico córneo de ave */}
        <path
          d="M 104 42 Q 116 44 120 50 Q 122 56 118 62"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>

      {/* 12. Medallón andino de explorador al cuello (brújula dorada) */}
      <circle cx="78" cy="80" r="7.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
      <polygon points="78,74 80,80 78,86 76,80" fill="#fef08a" />
      <polygon points="72,80 78,78 84,80 78,82" fill="#fef08a" />
      <circle cx="78" cy="80" r="1.8" fill="#e0f2fe" />
    </svg>
  );
};

/* =========================================================================
   4. LLAMA / VICUÑA (Norte Grande y Altiplano) - Guía de Lenguaje y Lectura
   ========================================================================= */
const LlamaSvg: React.FC<{ mood: FaunaMood }> = ({ mood }) => (
  <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xs" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="148" rx="42" ry="8" fill="#e2e8f0" />
    {/* Cuello esponjoso y cuerpo lana suave */}
    <ellipse cx="80" cy="108" rx="40" ry="36" fill="#fdfbf7" stroke="#f1ece1" strokeWidth="2" />
    <path d="M 66 110 Q 64 65 74 60 L 86 60 Q 96 65 94 110 Z" fill="#fdfbf7" />
    {/* Orejitas largas de llama */}
    <ellipse cx="60" cy="38" rx="9" ry="24" transform="rotate(-15 60 38)" fill="#fdfbf7" />
    <ellipse cx="60" cy="38" rx="5" ry="16" transform="rotate(-15 60 38)" fill="#fbcfe8" />
    <ellipse cx="100" cy="38" rx="9" ry="24" transform="rotate(15 100 38)" fill="#fdfbf7" />
    <ellipse cx="100" cy="38" rx="5" ry="16" transform="rotate(15 100 38)" fill="#fbcfe8" />
    {/* Pompones multicolores altiplánicos en las orejas */}
    <circle cx="52" cy="46" r="5" fill="#f43f5e" />
    <circle cx="50" cy="53" r="4" fill="#06b6d4" />
    <circle cx="108" cy="46" r="5" fill="#eab308" />
    <circle cx="110" cy="53" r="4" fill="#8b5cf6" />
    {/* Cabeza de lana mullida */}
    <circle cx="80" cy="62" r="28" fill="#fdfbf7" />
    {/* Copete de lana en la frente */}
    <circle cx="74" cy="40" r="9" fill="#fefcf8" />
    <circle cx="86" cy="40" r="9" fill="#fefcf8" />
    <circle cx="80" cy="38" r="10" fill="#ffffff" />
    {/* Ojos dulces con pestañas */}
    {mood === 'celebrating' || mood === 'happy' ? (
      <g fill="none" stroke="#451a03" strokeWidth="3" strokeLinecap="round">
        <path d="M 68 58 Q 73 52 78 58" />
        <path d="M 84 58 Q 89 52 94 58" />
      </g>
    ) : (
      <g>
        <ellipse cx="72" cy="58" rx="5.5" ry="6.5" fill="#292524" />
        <ellipse cx="88" cy="58" rx="5.5" ry="6.5" fill="#292524" />
        <circle cx="70.5" cy="56" r="2.2" fill="#ffffff" />
        <circle cx="86.5" cy="56" r="2.2" fill="#ffffff" />
        {/* Pestañas coquetas */}
        <line x1="75" y1="53" x2="77" y2="50" stroke="#292524" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="91" y1="53" x2="93" y2="50" stroke="#292524" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )}
    {/* Mejillas sonrosadas */}
    <ellipse cx="62" cy="66" rx="6" ry="3.5" fill="#fb7185" opacity="0.45" />
    <ellipse cx="98" cy="66" rx="6" ry="3.5" fill="#fb7185" opacity="0.45" />
    {/* Hocico y sonrisa tierna */}
    <ellipse cx="80" cy="69" rx="12" ry="9" fill="#f5ede0" />
    <ellipse cx="80" cy="66" rx="4.5" ry="3" fill="#78350f" />
    <path d="M 76 71 Q 80 75 84 71" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
    {/* Pequeño libro o lápiz en collar andino */}
    <rect x="73" y="104" width="14" height="12" rx="3" fill="#d97706" />
    <line x1="80" y1="104" x2="80" y2="116" stroke="#fef3c7" strokeWidth="1.5" />
  </svg>
);

/* =========================================================================
   5. PUMA CHILENO (Cordillera y Bosques) - Guía de Ciencias Naturales
   ========================================================================= */
const PumaSvg: React.FC<{ mood: FaunaMood }> = ({ mood }) => (
  <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xs" xmlns="http://www.w3.org/2000/svg">
    {/* Sombra base */}
    <ellipse cx="80" cy="148" rx="42" ry="8" fill="#e2e8f0" />

    {/* Orejas redondeadas de felino */}
    <g transform="rotate(-18 45 42)">
      <path d="M 36 60 C 32 36, 52 26, 62 44 Z" fill="#b45309" />
      <path d="M 38 56 C 36 40, 50 32, 58 46 Z" fill="#fef3c7" />
      <path d="M 40 38 Q 46 32 54 36" stroke="#78350f" strokeWidth="3" fill="none" />
    </g>
    <g transform="rotate(18 115 42)">
      <path d="M 98 44 C 108 26, 128 36, 124 60 Z" fill="#b45309" />
      <path d="M 102 46 C 110 32, 124 40, 122 56 Z" fill="#fef3c7" />
      <path d="M 106 36 Q 114 32 120 38" stroke="#78350f" strokeWidth="3" fill="none" />
    </g>

    {/* Cabeza del puma (dorada / leonada) */}
    <ellipse cx="80" cy="82" rx="46" ry="40" fill="#d97706" />
    <ellipse cx="80" cy="80" rx="44" ry="38" fill="#f59e0b" />

    {/* Manchas suaves en la frente */}
    <ellipse cx="80" cy="56" rx="5" ry="3" fill="#b45309" opacity="0.3" />
    <ellipse cx="73" cy="62" rx="4" ry="2.5" fill="#b45309" opacity="0.25" />
    <ellipse cx="87" cy="62" rx="4" ry="2.5" fill="#b45309" opacity="0.25" />

    {/* Pecho y collar de explorador de la naturaleza */}
    <path d="M 52 114 C 62 138, 98 138, 108 114 Z" fill="#fef3c7" />
    <rect x="72" y="126" width="16" height="14" rx="4" fill="#15803d" />
    <path d="M 80 128 Q 84 133 80 137 Q 76 133 80 128 Z" fill="#86efac" />

    {/* Ojos expresivos felinos de color verde esmeralda / dorado */}
    {mood === 'happy' || mood === 'celebrating' ? (
      <g>
        <path d="M 54 75 Q 64 66 72 75" fill="none" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />
        <path d="M 88 75 Q 96 66 106 75" fill="none" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />
      </g>
    ) : (
      <g>
        {/* Fondo del ojo almendrado */}
        <path d="M 52 76 Q 63 68 73 76 Q 63 84 52 76 Z" fill="#ffffff" stroke="#451a03" strokeWidth="1.5" />
        <circle cx="63" cy="76" r="6" fill="#65a30d" />
        <ellipse cx="63" cy="76" rx="2.5" ry="5" fill="#1c1917" />
        <circle cx="65" cy="73.5" r="1.8" fill="#ffffff" />

        <path d="M 87 76 Q 97 68 108 76 Q 97 84 87 76 Z" fill="#ffffff" stroke="#451a03" strokeWidth="1.5" />
        <circle cx="97" cy="76" r="6" fill="#65a30d" />
        <ellipse cx="97" cy="76" rx="2.5" ry="5" fill="#1c1917" />
        <circle cx="99" cy="73.5" r="1.8" fill="#ffffff" />
      </g>
    )}

    {/* Mejillas suaves */}
    <ellipse cx="56" cy="88" rx="6" ry="3.5" fill="#fca5a5" opacity="0.4" />
    <ellipse cx="104" cy="88" rx="6" ry="3.5" fill="#fca5a5" opacity="0.4" />

    {/* Hocico claro y carnoso */}
    <ellipse cx="80" cy="94" rx="18" ry="13" fill="#fffbeb" />
    {/* Nariz triangular */}
    <path d="M 74 88 L 86 88 L 80 94 Z" fill="#451a03" />

    {/* Boca sonriente o abierta */}
    {mood === 'speaking' ? (
      <g>
        <path d="M 74 94 Q 80 98 86 94" fill="none" stroke="#451a03" strokeWidth="2" />
        <ellipse cx="80" cy="100" rx="6" ry="4" fill="#be123c" />
        <ellipse cx="80" cy="99" rx="3.5" ry="2" fill="#fda4af" />
      </g>
    ) : (
      <path d="M 74 94 Q 80 100 86 94" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
    )}

    {/* Bigotitos finos de puma */}
    <line x1="56" y1="92" x2="42" y2="90" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="56" y1="96" x2="40" y2="97" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="104" y1="92" x2="118" y2="90" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="104" y1="96" x2="120" y2="97" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/* =========================================================================
   6. RANA DE DARWIN (Bosques del Sur y Chiloé) - Guía de Inglés
   ========================================================================= */
const RanaSvg: React.FC<{ mood: FaunaMood }> = ({ mood }) => (
  <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-xs" xmlns="http://www.w3.org/2000/svg">
    {/* Sombra base */}
    <ellipse cx="80" cy="148" rx="42" ry="8" fill="#e2e8f0" />

    {/* Patitas palmeadas de anfibio */}
    <ellipse cx="44" cy="136" rx="14" ry="7" fill="#15803d" />
    <ellipse cx="116" cy="136" rx="14" ry="7" fill="#15803d" />
    <circle cx="34" cy="136" r="3.5" fill="#166534" />
    <circle cx="42" cy="139" r="3.5" fill="#166534" />
    <circle cx="50" cy="138" r="3.5" fill="#166534" />
    <circle cx="110" cy="138" r="3.5" fill="#166534" />
    <circle cx="118" cy="139" r="3.5" fill="#166534" />
    <circle cx="126" cy="136" r="3.5" fill="#166534" />

    {/* Ojos saltones en la parte superior (característica de la rana) */}
    <circle cx="55" cy="52" r="16" fill="#166534" />
    <circle cx="105" cy="52" r="16" fill="#166534" />

    {/* Cuerpo de la rana en forma de hoja (Rhinoderma darwinii) */}
    <path
      d="M 80 40 C 44 48, 38 88, 42 124 C 52 142, 108 142, 118 124 C 122 88, 116 48, 80 40 Z"
      fill="#16a34a"
    />
    {/* Textura de hoja / camuflaje verde musgo */}
    <path
      d="M 80 42 C 54 54, 48 86, 52 118 C 64 130, 96 130, 108 118 C 112 86, 106 54, 80 42 Z"
      fill="#22c55e"
    />

    {/* Nariz característica puntiaguda como punta de hoja (probóscide de Darwin) */}
    <path d="M 76 44 L 80 30 L 84 44 Z" fill="#15803d" />
    <path d="M 78 44 L 80 32 L 82 44 Z" fill="#84cc16" />

    {/* Vena central de hoja (mimetismo natural de la rana de Darwin) */}
    <path d="M 80 44 L 80 116" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    <path d="M 80 66 L 68 76" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <path d="M 80 66 L 92 76" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <path d="M 80 88 L 66 98" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <path d="M 80 88 L 94 98" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

    {/* Ojos dorados y brillantes */}
    {mood === 'happy' || mood === 'celebrating' ? (
      <g>
        <path d="M 46 54 Q 55 45 64 54" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 96 54 Q 105 45 114 54" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    ) : (
      <g>
        <circle cx="55" cy="52" r="11" fill="#f59e0b" />
        <ellipse cx="55" cy="52" rx="6" ry="3.5" fill="#0f172a" />
        <circle cx="58" cy="48.5" r="2.5" fill="#ffffff" />

        <circle cx="105" cy="52" r="11" fill="#f59e0b" />
        <ellipse cx="105" cy="52" rx="6" ry="3.5" fill="#0f172a" />
        <circle cx="108" cy="48.5" r="2.5" fill="#ffffff" />
      </g>
    )}

    {/* Mejillas sonrientes */}
    <ellipse cx="54" cy="74" rx="5" ry="3" fill="#f43f5e" opacity="0.35" />
    <ellipse cx="106" cy="74" rx="5" ry="3" fill="#f43f5e" opacity="0.35" />

    {/* Sonrisa amigable de la rana */}
    {mood === 'speaking' ? (
      <g>
        <ellipse cx="80" cy="74" rx="12" ry="7" fill="#0f172a" />
        <ellipse cx="80" cy="76" rx="8" ry="4" fill="#f43f5e" />
      </g>
    ) : (
      <path d="M 68 70 Q 80 82 92 70" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
    )}

    {/* Pequeño corbatín inglés o medalla de explorador de Charles Darwin */}
    <g transform="translate(80, 112)">
      {/* Mini Bow Tie en honor a Charles Darwin y la lengua inglesa */}
      <path d="M -10 -4 L 0 0 L -10 4 Z" fill="#4f46e5" />
      <path d="M 10 -4 L 0 0 L 10 4 Z" fill="#4f46e5" />
      <circle cx="0" cy="0" r="3" fill="#ef4444" />
      <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
    </g>
  </svg>
);

export const FAUNA_GUIDES_INFO = {
  pudu: {
    nombre: 'Pudú',
    especie: 'Pudu puda',
    region: 'Bosques del Sur y Chiloé',
    rol: 'Taller de Expresión Oral y Fonética',
    colorText: 'text-emerald-800',
    colorBg: 'bg-emerald-50',
    colorBorder: 'border-emerald-200',
    colorPill: 'bg-emerald-600 text-white',
    emoji: '🦌',
    saludo: '¡Hola! Soy el Pudú. Te acompaño a leer en voz alta, modular bien y practicar trabalenguas.',
  },
  pinguino: {
    nombre: 'Pingüino de Humboldt',
    especie: 'Spheniscus humboldti',
    region: 'Costas e Islas de Chile',
    rol: 'Guía de Matemática y Calculadora',
    colorText: 'text-teal-900',
    colorBg: 'bg-teal-50',
    colorBorder: 'border-teal-200',
    colorPill: 'bg-emerald-600 text-white',
    emoji: '🐧',
    saludo: '¡Hola! Soy el Pingüino de Humboldt. Te enseño a contar, repartir pececitos y resolver problemas con la calculadora.',
  },
  condor: {
    nombre: 'Cóndor Andino',
    especie: 'Vultur gryphus',
    region: 'Cordillera de los Andes',
    rol: 'Guía de Historia, Geografía y Territorio',
    colorText: 'text-sky-900',
    colorBg: 'bg-sky-50',
    colorBorder: 'border-sky-200',
    colorPill: 'bg-sky-600 text-white',
    emoji: '🦅',
    saludo: '¡Saludos! Desde lo alto de la cordillera contemplo todo Chile. Te guiaré por nuestros paisajes, pueblos y comunidad.',
  },
  llama: {
    nombre: 'Llama Andina',
    especie: 'Lama glama',
    region: 'Altiplano y Norte Grande',
    rol: 'Guía de Lenguaje, Fábulas y Lectura',
    colorText: 'text-amber-900',
    colorBg: 'bg-amber-50',
    colorBorder: 'border-amber-200',
    colorPill: 'bg-amber-600 text-white',
    emoji: '🦙',
    saludo: '¡Hola amiguito! Traigo cuentos y fábulas desde el altiplano para aprender sílabas y comprender hermosas historias.',
  },
  puma: {
    nombre: 'Puma Chileno',
    especie: 'Puma concolor',
    region: 'Cordillera, Bosques y Estepas de Chile',
    rol: 'Guía de Ciencias Naturales y Ecosistemas',
    colorText: 'text-emerald-950',
    colorBg: 'bg-emerald-50',
    colorBorder: 'border-emerald-300',
    colorPill: 'bg-emerald-700 text-white',
    emoji: '🐆',
    saludo: '¡Hola pequeño científico! Como guardián de los ecosistemas de Chile, te invito a explorar los seres vivos, el cuerpo humano y las maravillas de la naturaleza.',
  },
  rana: {
    nombre: 'Rana de Darwin',
    especie: 'Rhinoderma darwinii',
    region: 'Bosques Templados del Sur y Chiloé',
    rol: 'Guía de Inglés (English Guide)',
    colorText: 'text-indigo-950',
    colorBg: 'bg-indigo-50',
    colorBorder: 'border-indigo-300',
    colorPill: 'bg-indigo-600 text-white',
    emoji: '🐸',
    saludo: 'Hello! I am Darwin\'s Frog! Charles Darwin discovered me in the south of Chile. Let\'s learn and practice English together with fun games and words!',
  },
};

