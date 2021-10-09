import { useEffect } from 'react';

const noop = () => {};

export default function useIntersectionObserver({
  target,
  onIntersect,
  threshold = 0,
  enabled = true,
}) {
  useEffect(() => {
    if (!enabled) return noop;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      { threshold },
    );
    const element = target && target.current;
    if (!element) return noop;
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [target.current, enabled]);
}
