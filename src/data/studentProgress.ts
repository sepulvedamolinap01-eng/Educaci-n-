// Student Progress Persistence (Mineduc Estrellas y Unidades Completadas)

export interface UnitProgressRecord {
  nivel: string;
  asignatura: string;
  unidadId: string;
  stars: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

const STORAGE_KEY = 'mineduc_student_progress_v1';

const buildKey = (nivel: string, asignatura: string, unidadId: string): string => {
  const norm = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
  return `${norm(nivel)}_${norm(asignatura)}_${norm(unidadId)}`;
};

export function getAllStudentProgress(): Record<string, UnitProgressRecord> {
  try {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};
    return JSON.parse(saved);
  } catch {
    return {};
  }
}

export function getUnitProgress(
  nivel: string,
  asignatura: string,
  unidadId: string
): UnitProgressRecord | null {
  const all = getAllStudentProgress();
  const key = buildKey(nivel, asignatura, unidadId);
  return all[key] || null;
}

export function saveUnitProgress(
  nivel: string,
  asignatura: string,
  unidadId: string,
  stars: number,
  totalQuestions: number
): void {
  try {
    if (typeof window === 'undefined') return;
    const all = getAllStudentProgress();
    const key = buildKey(nivel, asignatura, unidadId);
    const prev = all[key];

    // Preserve the highest score
    const bestStars = prev ? Math.max(prev.stars, stars) : stars;
    const percentage = totalQuestions > 0 ? Math.round((bestStars / totalQuestions) * 100) : 100;

    all[key] = {
      nivel,
      asignatura,
      unidadId,
      stars: bestStars,
      totalQuestions,
      percentage,
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Error al guardar progreso del estudiante:', err);
  }
}

export function getTotalStarsEarned(): number {
  const all = getAllStudentProgress();
  return Object.values(all).reduce((acc, curr) => acc + (curr.stars || 0), 0);
}

export function getCompletedUnitsCount(nivel?: string): number {
  const all = Object.values(getAllStudentProgress());
  if (!nivel) return all.length;
  return all.filter((r) => r.nivel === nivel).length;
}
