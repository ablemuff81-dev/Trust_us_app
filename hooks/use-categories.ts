import { useLanguage } from "@/hooks/use-language";
import { CATEGORIES, isCategory, type TranslationKey } from "@/lib/i18n";
import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Categories live on this device: the ten defaults come from the dictionary,
 * and the user can rename, delete or add their own from the "Ajout" dialog.
 */
export type CategoryOption = {
  key: string;
  label: string;
  custom: boolean;
};

type CategoryStore = {
  custom: Array<{ key: string; label: string }>;
  renamed: Record<string, string>;
  hidden: string[];
};

const STORAGE_KEY = "truste-us.categories.v1";
const EMPTY: CategoryStore = { custom: [], renamed: {}, hidden: [] };

let snapshot: CategoryStore | null = null;
const listeners = new Set<() => void>();

function sanitize(value: unknown): CategoryStore {
  if (typeof value !== "object" || value === null) return EMPTY;
  const parsed = value as Partial<CategoryStore>;
  return {
    custom: Array.isArray(parsed.custom)
      ? parsed.custom.filter(
          (entry): entry is { key: string; label: string } =>
            typeof entry === "object" &&
            entry !== null &&
            typeof (entry as { key?: unknown }).key === "string" &&
            typeof (entry as { label?: unknown }).label === "string",
        )
      : [],
    renamed:
      parsed.renamed && typeof parsed.renamed === "object"
        ? (parsed.renamed as Record<string, string>)
        : {},
    hidden: Array.isArray(parsed.hidden)
      ? parsed.hidden.filter((key): key is string => typeof key === "string")
      : [],
  };
}

export function readCategoryStore(): CategoryStore {
  if (snapshot) return snapshot;
  if (typeof window === "undefined") {
    snapshot = EMPTY;
    return snapshot;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    snapshot = raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    snapshot = EMPTY;
  }
  return snapshot;
}

function commit(next: CategoryStore) {
  snapshot = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage unavailable: the in-memory store still works
    }
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function useCategoryStore(): CategoryStore {
  return useSyncExternalStore(subscribe, readCategoryStore, () => EMPTY);
}

/** Label of any stored category key, defaults and custom ones included. */
export function categoryLabel(
  key: string,
  t: (key: TranslationKey) => string,
  store: CategoryStore,
): string {
  const renamed = store.renamed[key];
  if (renamed) return renamed;
  const custom = store.custom.find((entry) => entry.key === key);
  if (custom) return custom.label;
  if (isCategory(key)) return t(`category.${key}`);
  return key;
}

/** Reactive label resolver for every screen that lists categories. */
export function useCategoryLabel() {
  const { t } = useLanguage();
  const store = useCategoryStore();
  return useCallback(
    (key: string) => categoryLabel(key, t, store),
    [t, store],
  );
}

export function useCategories() {
  const { t } = useLanguage();
  const store = useCategoryStore();

  const options = useMemo<CategoryOption[]>(() => {
    const defaults = CATEGORIES.filter(
      (key) => !store.hidden.includes(key),
    ).map<CategoryOption>((key) => ({
      key,
      label: store.renamed[key] ?? t(`category.${key}`),
      custom: false,
    }));

    const custom = store.custom
      .filter((entry) => !store.hidden.includes(entry.key))
      .map<CategoryOption>((entry) => ({
        key: entry.key,
        label: store.renamed[entry.key] ?? entry.label,
        custom: true,
      }));

    return [...defaults, ...custom];
  }, [store, t]);

  const addCategory = useCallback((label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return null;
    const current = readCategoryStore();
    const key = `custom_${Date.now().toString(36)}_${Math.random()
      .toString(36)
      .slice(2, 6)}`;
    commit({
      ...current,
      custom: [...current.custom, { key, label: trimmed }],
      hidden: current.hidden.filter((entry) => entry !== key),
    });
    return key;
  }, []);

  const renameCategory = useCallback((key: string, label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    const current = readCategoryStore();
    commit({
      ...current,
      custom: current.custom.map((entry) =>
        entry.key === key ? { ...entry, label: trimmed } : entry,
      ),
      renamed: { ...current.renamed, [key]: trimmed },
    });
  }, []);

  const deleteCategory = useCallback((key: string) => {
    const current = readCategoryStore();
    const renamed = { ...current.renamed };
    delete renamed[key];
    commit({
      custom: current.custom.filter((entry) => entry.key !== key),
      renamed,
      hidden: current.hidden.includes(key)
        ? current.hidden
        : [...current.hidden, key],
    });
  }, []);

  return { options, addCategory, renameCategory, deleteCategory };
}
