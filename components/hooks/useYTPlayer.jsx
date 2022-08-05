import { useCallback, useEffect, useState } from 'react';

// Player events
// [
//   onReady,
//   onStateChange,
//   onPlaybackQualityChange,
//   onPlaybackRateChange,
//   onError
//   onApiChange
//   onVolumeChange',
// ];


const useYTPlayer = () => {
  const [status, setYtStatus] = useState('init');
  const [error, setError] = useState('');
  const [player, setPlayer] = useState();
  let eventHandlers = null;

  const initialEventHandlers = {
    // 4. The API will call this function when the video player is ready.
    onReady: (event) => {
      //   if (autoPlay) event.target.playVideo();
      setPlayer(event.target);
      setStatus('ready');
      setError('');
      console.log('======YTPlayer is ready===== event.target', event.target);
    },
    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    onStateChange: (event) => {
    },
    onVolumeChange: (event) => {
      // console.log('onVolumeChange: ', event.data);
    },
  };

  useEffect(() => {

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);


  const setStatus = useCallback(
    (status = 'init', error = '') => {
      console.log(`ytPlayer setStatus:`, status, ', error: ', error);
      setYtStatus(status);
      setError(error);
    },
    [status, error]
  );

  const startYTPlayer = (videoId, playerId, option, eventHandlers) => {
     return new Promise(async (resolve, reject) => {
        const handlers = eventHandlers ?? initialEventHandlers;
        console.log('startYTPlayer: videoId: ', videoId, 'playerId: ', playerId);
        setStatus('loading');
        let errorMessage = '';

        if (!videoId) {
          errorMessage = 'YTPlayer: videoId is missing';
          setStatus('error', errorMessage);
           return reject(new Error(errorMessage));
        }

        if (!playerId) {
          errorMessage = 'YTPlayer: playerId is missing';
          setStatus('error', errorMessage);
          return reject(new Error(errorMessage));
        }

      try {
        const YT = await loadYoutubeScript();
        if (!YT) {
          throw new Error('YTPlayer load error');
        }

        setStatus('create YTPlayer');

        const newPlayer = new YT.Player(playerId, {
          // host: `${window.location.protocol}//www.youtube.com`,
          // origin: 'http://192.168.1.76:3000',
          height: '100%',
          width: '100%',
          videoId: videoId,
          playerVars: { ...option},
          events: handlers,
        });

          // resolve(newPlayer);

      } catch (error) {
        setStatus('error', error.message);
        reject(error);
      }
    });
  };

  const onYouTubeIframeAPIReady = (resolve) => () => {
    setStatus('YT api ready');
    resolve(window.YT);
  };

  const loadYoutubeScript = () => {
     return new Promise((resolve, reject) => {
        // 2. This code loads the IFrame Player API code asynchronously.
      if (
        window.YT &&
        window.YT.Player &&
        window.YT.Player instanceof Function
      ) {
        setStatus('YT api ready loaded');
        return resolve(window.YT);
      }

      const youtubeAPI = 'http://www.youtube.com/iframe_api';
      const apiNotLoaded = [...document.getElementsByTagName('script')].every(
        (elem) => elem.src !== youtubeAPI
      );

      console.log('apiNotLoaded: ', apiNotLoaded);

      if (apiNotLoaded) {
        const tag = document.createElement('script');
        tag.src = youtubeAPI;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady(resolve);
      });
};

  const stopVideo = () => {
    player?.stopVideo();
  };

  const addListeners = useCallback((events) => {
    console.log('addListener!! player:', player);
    if (player) {
      for (const key in events) {
        console.log('addListener!! ', key, events[key]);
        player.addEventListener(key, events[key]);
      }
    }
  }, []);

  return [startYTPlayer, status, error];
};

export default useYTPlayer;
