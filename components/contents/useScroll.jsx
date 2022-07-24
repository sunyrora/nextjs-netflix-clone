import { useCallback } from 'react';

const useScrollX = () => {


  const scrollRight = useCallback((Component, offset) => {
    if (Component) {
      const offsetX = offset ?? window.innerWidth;

      Component.current.scrollLeft += offsetX;
      console.log('scrollRight: ', Component.current.scrollLeft);
    }
  }, []);

  const scrollLeft = useCallback((Component, offset) => {
    if (Component) {
      const offsetX = offset ?? window.innerWidth;

      Component.current.scrollLeft -= offsetX;
      console.log('scrollLeft: ', Component.current.scrollLeft);
    }
  }, []);

  return [scrollRight, scrollLeft];
};

export default useScrollX;
