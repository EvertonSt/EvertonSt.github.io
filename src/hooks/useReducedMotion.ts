import { useMediaQuery } from "./useMediaQuery";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Whether the reader has asked the system for less motion.
 *
 * The stylesheet already collapses every transition through a media query. This
 * hook is for the behaviour CSS cannot express, such as not starting a scroll
 * animation at all.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery(QUERY);
}
