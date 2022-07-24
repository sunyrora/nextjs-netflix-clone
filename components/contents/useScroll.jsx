import { useCallback } from 'react';

const useScrollX = () => {
  const scrollRight = useCallback((Component, offset) => {
    if (Component) {
      Component.current.scrollLeft += offset;
      console.log('scrollRight: ', Component.current.scrollLeft);
    }
  }, []);

  const scrollLeft = useCallback((Component, offset) => {
    if (Component) {
      Component.current.scrollLeft -= offset;
      console.log('scrollLeft: ', Component.current.scrollLeft);
    }
  }, []);

  return [scrollRight, scrollLeft];
};

export default useScrollX;
