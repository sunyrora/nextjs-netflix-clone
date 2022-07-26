import { useCallback, useEffect, useState } from 'react';

const useFullScreen = () => {
  const [elementId, setElementId] = useState('');
  const [hotKey, setHotKey] = useState('Enter');

  const handleKeyEvent = useCallback(
    (e) => {
      if (e.key === hotKey) {
        console.log(hotKey, 'key pressed');
        const element = document.getElementById(elementId);
        toggleFullScreen(element);
      }
    },
    [elementId]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvent);
    return () => document.removeEventListener('keydown', handleKeyEvent);
  }, [handleKeyEvent]);

  const toggleFullScreen = useCallback((element) => {
    if (!document.fullscreenElement) {
      // If the document is not in full screen mode
      // make the video full screen
      element.requestFullscreen();
    } else {
      // Otherwise exit the full screen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);
  return [setElementId, setHotKey];
};

export default useFullScreen;
