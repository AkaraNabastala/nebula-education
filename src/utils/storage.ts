/**
 * Safe localStorage wrapper with corruption fallback and schema versioning
 */

export function safeGetStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }
    const saved = window.localStorage.getItem(key);
    if (!saved) return fallback;

    const parsed = JSON.parse(saved);
    if (parsed === null || parsed === undefined) return fallback;

    // Validate that arrays stay arrays and objects stay objects
    if (Array.isArray(fallback) && !Array.isArray(parsed)) {
      console.warn(`[safeGetStorage] Expected array for key "${key}", got ${typeof parsed}. Using fallback.`);
      return fallback;
    }

    return parsed as T;
  } catch (error) {
    console.warn(`[safeGetStorage] Corrupted or invalid JSON in localStorage key "${key}". Resetting to fallback.`, error);
    return fallback;
  }
}

export function safeSetStorage<T>(key: string, data: T): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`[safeSetStorage] Failed to write key "${key}" to localStorage:`, error);
  }
}
