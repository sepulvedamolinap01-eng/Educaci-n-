import React, { useState } from 'react';
import { LAMINAS_CATALOGO, LaminaColeccionable } from '../data/albumLaminas';
import { FaunaAvatar, FaunaSpecies } from './FaunaAvatars';
import { soundFx } from '../utils/soundEffects';
import { speechReader } from '../utils/speechReader';
import { X, Sparkles, Volume2, Lock, Check } from 'lucide-react';

interface AlbumLaminasModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedIds: string[];
}

const FAUNA_MAP: Record<string, FaunaSpecies> = {
  rana_darwin: 'rana',
  pudu_bosque: 'pudu',
  condor_alturas: 'condor',
  pinguino_humboldt: 'pinguino',
  puma_cordillera: 'puma',
  llama_nortina: 'llama',
};

export const AlbumLaminasModal: React.FC<AlbumLaminasModalProps> = ({
  isOpen,
  onClose,
  unlockedIds,
}) => {
  const [selectedLamina, setSelectedLamina] = useState<LaminaColeccionable | null>(null);
  const [activeTab, setActiveTab] = useState<'todas' | 'fauna' | 'paisaje' | 'logro'>('todas');

  if (!isOpen) return null;

  const total = LAMINAS_CATALOGO.length;
  const countUnlocked = unlockedIds.length;
  const percentage = Math.round((countUnlocked / total) * 100);

  const filtered = LAMINAS_CATALOGO.filter((lam) => {
    if (activeTab === 'todas') return true;
    return lam.categoria === activeTab;
  });

  const handleSelectLamina = (lamina: LaminaColeccionable) => {
    const isUnlocked = unlockedIds.includes(lamina.id);
    if (isUnlocked) {
      soundFx.playMagicStar();
      setSelectedLamina(lamina);
      speechReader.stop();
      speechReader.speak(`${lamina.nombre}. ${lamina.curiosidad}`, { rate: 0.9 });
    } else {
      soundFx.playBubble();
      setSelectedLamina(lamina);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-gradient-to-b from-amber-50 via-white to-amber-50 rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden">
        {/* Header con temática de álbum */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 p-4 sm:p-5 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner border border-white/40">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight drop-shadow-xs">
                  Mi Álbum de Explorador de Chile
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-amber-900 font-extrabold text-xs shadow-2xs">
                  {countUnlocked} / {total}
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                ¡Colecciona todas las láminas jugando y aprendiendo!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playPop();
              speechReader.stop();
              onClose();
            }}
            className="p-2 rounded-2xl bg-white/20 hover:bg-white/40 text-white transition-all cursor-pointer border border-white/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de progreso visual tipo videojuego */}
        <div className="px-4 sm:px-6 pt-3 pb-2 bg-amber-100/70 border-b border-amber-200">
          <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-1">
            <span>Progreso del Álbum</span>
            <span>{percentage}% completado</span>
          </div>
          <div className="w-full h-3 rounded-full bg-amber-200 overflow-hidden p-0.5 border border-amber-300 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500"
              style={{ width: `${Math.max(percentage, 8)}%` }}
            />
          </div>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex items-center justify-center gap-1.5 p-3 bg-white border-b border-stone-200 text-xs font-black overflow-x-auto">
          {(['todas', 'fauna', 'paisaje', 'logro'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                soundFx.playPop();
                setActiveTab(tab);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap capitalize ${
                activeTab === tab
                  ? 'bg-amber-500 text-white shadow-2xs scale-105'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab === 'todas'
                ? '🌟 Todas'
                : tab === 'fauna'
                ? '🐾 Fauna Chilena'
                : tab === 'paisaje'
                ? '🏔️ Paisajes'
                : '🏆 Logros'}
            </button>
          ))}
        </div>

        {/* Rejilla de Láminas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((lamina) => {
            const isUnlocked = unlockedIds.includes(lamina.id);
            const isSelected = selectedLamina?.id === lamina.id;

            return (
              <button
                key={lamina.id}
                type="button"
                onClick={() => handleSelectLamina(lamina)}
                className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer border-2 ${
                  isUnlocked
                    ? lamina.rareza === 'dorada'
                      ? 'bg-gradient-to-b from-amber-100 via-amber-50 to-orange-100 border-amber-400 shadow-sm hover:scale-105 hover:shadow-md'
                      : 'bg-white border-stone-200 shadow-2xs hover:scale-105 hover:border-amber-300'
                    : 'bg-stone-100/90 border-dashed border-stone-300 opacity-60 hover:opacity-80'
                } ${isSelected ? 'ring-3 ring-amber-500 scale-105' : ''}`}
              >
                {/* Badge de rareza */}
                {isUnlocked && (
                  <span
                    className={`absolute top-2 right-2 text-[9px] font-black px-1.5 py-0.2 rounded-md ${
                      lamina.rareza === 'dorada'
                        ? 'bg-amber-400 text-amber-950 ring-1 ring-amber-500'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {lamina.rareza === 'dorada' ? '★ ORO' : '✓'}
                  </span>
                )}

                {/* Ícono de lámina ilustrada o candado */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl my-1 transition-transform group-hover:rotate-6 overflow-hidden ${
                    isUnlocked
                      ? 'bg-white shadow-2xs border border-amber-200/60'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  {isUnlocked ? (
                    FAUNA_MAP[lamina.id] ? (
                      <div className="w-12 h-12 flex items-center justify-center">
                        <FaunaAvatar species={FAUNA_MAP[lamina.id]} size="xs" mood="happy" />
                      </div>
                    ) : (
                      <span>{lamina.icono}</span>
                    )
                  ) : (
                    <Lock className="w-6 h-6 text-stone-400" />
                  )}
                </div>

                {/* Título de lámina */}
                <h3 className="text-xs font-black text-stone-900 line-clamp-1 mt-1">
                  {isUnlocked ? lamina.nombre : 'Lámina Oculta'}
                </h3>

                <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">
                  {isUnlocked ? lamina.categoria : 'Por descubrir'}
                </p>
              </button>
            );
          })}
        </div>

        {/* Tarjeta de detalle de lámina seleccionada */}
        {selectedLamina && (
          <div className="p-4 bg-gradient-to-r from-amber-100/90 via-white to-amber-100/90 border-t-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-white border border-amber-200 shadow-2xs flex items-center justify-center shrink-0 overflow-hidden">
                {unlockedIds.includes(selectedLamina.id) && FAUNA_MAP[selectedLamina.id] ? (
                  <FaunaAvatar species={FAUNA_MAP[selectedLamina.id]} size="xs" mood="speaking" />
                ) : (
                  <span className="text-3xl select-none">{selectedLamina.icono}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-stone-900 text-sm sm:text-base">
                    {unlockedIds.includes(selectedLamina.id)
                      ? selectedLamina.nombre
                      : 'Lámina por descubrir 🔒'}
                  </h4>
                  {unlockedIds.includes(selectedLamina.id) && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      ¡En tu colección!
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  {unlockedIds.includes(selectedLamina.id)
                    ? selectedLamina.curiosidad
                    : `¿Cómo obtenerla? ${selectedLamina.desbloqueadoPor}`}
                </p>
              </div>
            </div>

            {unlockedIds.includes(selectedLamina.id) && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playBubble();
                  speechReader.stop();
                  speechReader.speak(`${selectedLamina.nombre}. ${selectedLamina.curiosidad}`, {
                    rate: 0.9,
                  });
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-2xs shrink-0 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Escuchar curiosidad</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
