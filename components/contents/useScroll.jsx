import { useCallback, useEffect, useRef, useState } from 'react';
import { round2 } from '../../utils/utils';

const useScrollX = () => {
  const [posLeft, setPosLeft] = useState(0);
  const [isScrollPosStart, setIsScrollPosStart] = useState(true);
  const [isScrollPosEnd, setIsScrollPosEnd] = useState(false);
  const [scrollMax, setScrollMax] = useState(0);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const refComponent = useRef();


  const ref = useCallback((node) => {
    if (node) {
      refComponent.current = node;
    }
  }, []);

  useEffect(() => {
    const init = () => {
      setPosLeft(0);
      if(refComponent) {
        refComponent.current.scrollLeft = 0;
        setScrollMax(calculScrollMax());
        setPaddingLeft(parseFloat(window.getComputedStyle(refComponent.current).scrollPaddingLeft));
        // console.log('useEffect:: refComponent.current.scrollLeft: ', refComponent?.current?.scrollLeft);
        // console.log('padding left: ', paddingLeft)
        ;
        
      }
    }
    init();

    const {add: addScrollEvent, remove: removeScrollEvent} = handleScrollStoppedEvent(refComponent?.current);
    addScrollEvent && addScrollEvent();
    
    return () => {
      setPosLeft(0);
      if(refComponent) refComponent.current.scrollLeft = 0;
      setScrollMax(0);
      setIsScrollPosEnd(false);
      setIsScrollPosStart(true);
      removeScrollEvent && removeScrollEvent();
    //   if(handleScrollStopped) refComponent?.current?.removeEventListener('scroll', handleScrollStopped);
    }
  }, []);

  useEffect(() => {
    // console.log('useEffect:: scrollMax: ', scrollMax);
    setIsScrollPosEnd(checkScrollPosEnd());
    setIsScrollPosStart(checkScrollPosStart());
    
  }, [scrollMax]);

  useEffect(() => {
    // console.log('useEffect:: posLeft: ', posLeft);
    setIsScrollPosEnd(checkScrollPosEnd());
    setIsScrollPosStart(checkScrollPosStart());
  }, [posLeft]);

  const handleScrollStoppedEvent = (element) => {
    if(!element) return;

    let handleScrollStopped = null;

    const onScroll = (callBack, timeOut = 150) => {
      let scrollStopTimer;

      return (e) => {
          scrollStopTimer && clearTimeout(scrollStopTimer);
          scrollStopTimer = setTimeout(callBack, timeOut);
        };
    }

    handleScrollStopped = onScroll(() => {
      // console.log('Scroll stopped: scrollLeft: ', refComponent?.current?.scrollLeft);
      setPosLeft(element?.scrollLeft);
    });

    return {
      add: () => element?.addEventListener('scroll', handleScrollStopped),
      remove: () => element.removeEventListener('scroll', handleScrollStopped),
    }    
  }

  const calculScrollMax = () => {
    if(!refComponent) return 0;

     const { clientWidth, scrollWidth } = refComponent.current;
    const max = round2((scrollWidth - clientWidth));
    //  - paddingLeft);
    // console.log('scrollMax: ', max);

    return max;
  }


  const checkScrollPosEnd = () => {
    // console.log('posLeft: ', posLeft, 'scrollMax: ', scrollMax);

    if(Math.round(posLeft) >= scrollMax) {
      // console.log('isScrollEnd true');
      return true;
    }      
    // console.log('isScrollEnd false');
    return false;
  }
    
  const checkScrollPosStart = () => {
    // console.log('posLeft: ', posLeft, 'scrollMax: ', scrollMax);
    if(Math.round(posLeft) <= paddingLeft) {
      // console.log('isScrollPosStart true');
      return true;
    }      
    // console.log('isScrollPosStart false');
    return false;
  }


  const scrollX = useCallback(
    (params = { to: 'right', offset: null, ref: null }) => {
      const { to, offset, ref } = params;

      const targetElement = ref?.current ?? refComponent?.current;

      if (targetElement) {
        // console.log('scroll before : ', targetElement.scrollLeft);
        // console.log('scroll Max : ', scrollMax);
        // console.log('targetElement.clientWidth? : ', targetElement.clientWidth);
        // console.log('targetElement.scrollWidth? : ', targetElement.scrollWidth);

        const { scrollLeft, clientWidth } = targetElement;

        let offsetX = offset ?? clientWidth;
        // let offsetX = offset ?? targetElement.clientWidth;
        if (to === 'left') {
          offsetX = -offsetX;
        }
        
        // console.log('offestX : ', offsetX);
        
        const scrollTo = scrollLeft + offsetX;

        targetElement.scrollTo({left: scrollTo, behavior: 'smooth'});

        setPosLeft(scrollTo);
        // console.log('scroll after : ', targetElement.scrollLeft);
      
      }
    }, []);

  return [ref, scrollX, isScrollPosStart, isScrollPosEnd];
};

export default useScrollX;
