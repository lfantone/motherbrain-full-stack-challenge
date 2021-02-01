import { useEffect, useRef, useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

/**
 * Default Y offset that should scrolled before hiding the header.
 * @constant {number}
 */
const DEFAULT_Y_OFFSET_PX = 100;

function useHiddenHeader(scrollOffset = DEFAULT_Y_OFFSET_PX) {
  const [headerHidden, setHeaderHidden] = useState(false);
  const hiddenRef = useRef();

  useEffect(() => {
    hiddenRef.current = headerHidden;
  }, [headerHidden]);

  const { callback: handleScroll, cancel: cancelScrollHandler } = useDebouncedCallback(() => {
    if (window.pageYOffset > scrollOffset) {
      if (!hiddenRef.current) {
        setHeaderHidden(true);
      }
    } else if (hiddenRef.current) {
      setHeaderHidden(false);
    }
  }, 350);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelScrollHandler();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, cancelScrollHandler]);

  return headerHidden;
}

export default useHiddenHeader;
