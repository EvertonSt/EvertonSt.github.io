import { useState, useEffect } from 'react';
export function useScrollSpy(ids: string[], offset = 100): string {
  const [activeId, setActiveId] = useState(ids[0] || '');
  useEffect(() => {
    const handler = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) { setActiveId(id); return; }
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [ids, offset]);
  return activeId;
}
