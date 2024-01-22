"use client"
import { useEffect, useState, useCallback, useRef } from "react";

const useScrollPosition = (onScrollBottom, debounceTime = 100) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const elementRef = useRef(null);
  const debounceTimer = useRef(null);

  const handleScroll = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (elementRef.current) {
        const scrollThreshold = elementRef.current.scrollHeight * 0.75;
        if (
          elementRef.current.scrollTop + elementRef.current.clientHeight >=
          scrollThreshold
        ) {
          onScrollBottom();
        }

        setShowScrollTop(elementRef.current.scrollTop > 100);
      }
    }, debounceTime);
  }, [onScrollBottom, debounceTime]);

  useEffect(() => {
    const currentElement = elementRef.current;
    currentElement?.addEventListener("scroll", handleScroll);

    return () => {
      currentElement?.removeEventListener("scroll", handleScroll);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    elementRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return { elementRef, showScrollTop, scrollToTop };
};

export default useScrollPosition;
