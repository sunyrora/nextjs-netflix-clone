import { createRef, useCallback, useRef, useState } from 'react';

const useScrollX = () => {
  const refComponent = useRef();

  const ref = useCallback((node) => {
    if (node) {
      refComponent.current = node;
    }
  }, []);

  const scrollX = useCallback(
    (params = { to: 'right', offset: null, ref: null }) => {
      console.log('scrollRight: ref ', ref);

      const { to, offset, ref } = params;

      const tartgetRef = ref ?? refComponent;

      if (tartgetRef) {
        const offsetX = offset ?? window.innerWidth;
        if (to === 'left') offsetX = -offsetX;

        tartgetRef.current.scrollLeft += offsetX;
        console.log('scrollRight: ', tartgetRef.current.scrollLeft);
      }
    },
    []
  );

  return [ref, scrollX];
};

export default useScrollX;
