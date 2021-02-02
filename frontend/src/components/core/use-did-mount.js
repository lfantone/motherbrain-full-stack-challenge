import { useEffect, useRef } from 'react';

/**
 * React hook that returns `true` after the component mounts.
 * @returns {boolean} Whether a component has mounted or not.
 */
function useDidMount() {
  const didMount = useRef(false);
  useEffect(() => {
    didMount.current = true;
  }, []);

  return didMount.current;
}

export default useDidMount;
