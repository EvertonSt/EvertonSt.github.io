import { useCallback, useSyncExternalStore } from "react";

/**
 * Read a CSS media query as React state.
 *
 * Built on `useSyncExternalStore` rather than `useState` + `useEffect`. The
 * effect version has to call `setState` synchronously inside the effect body to
 * pick up the value on mount, which schedules a second render for every
 * consumer and is the pattern React now warns about.
 *
 * `getServerSnapshot` returns false so the first client render matches the
 * server output and hydration cannot disagree with itself.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window.matchMedia !== "function") return () => undefined;
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window.matchMedia !== "function") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
