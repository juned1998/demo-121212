import {
    useEffect,
    useState,
} from 'react';
export default function useIntersectionObserver(ref, options, handleEntry) {

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      handleEntry(entry);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, handleEntry, options]);

}