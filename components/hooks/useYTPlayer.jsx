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

  const ytpStatusCode = {
    INIT: 'init',
    API_LOADED: 'YT api ready loaded',
    API_READY: 'YTP_API_ready',
    LOADING: 'loading',
    CREATING_PLAYER: 'creating_player',
    READY: 'ready',
    ERROR: 'error',
} 

  const initialEventHandlers = {
    // 4. The API will call this function when the video player is ready.
    onReady: (event) => {
      setPlayer(event.target);
      setStatus(ytpStatusCode.READY);
      // printLog('======YTPlayer is ready===== event.target', event.target);
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

  const printLog = (...args) => {
    console.log(...args, ': ', player?.videoTitle);
  }

  const printError = (...args) => {
    console.error(...args, ': ', currVideoTitle);
  }

  useEffect(() => {
    setStatus(ytpStatusCode.INIT);
    

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  useEffect(() => {
    if(player) {
      setStatus(ytpStatusCode.READY);
    }

  },[player])


  const setStatus = useCallback(
    (status = ytpStatusCode.INIT, error = '') => {
      // printLog(`ytPlayer setStatus:`, status)
      if(error) printError('error: ', error);

      setYtStatus(status);
      setError(error);
    },
    [status, error]
  );


const startYTPlayer = (videoId, playerId, option, eventHandlers) => {
   return new Promise(async (resolve, reject) => {
      try {
        setStatus(ytpStatusCode.LOADING);

        if(player) {
          // await destroyPlayer();
          printLog('player destroy: ', player);
          await player.destroy();
        }

        let errorMessage = '';

        if (!videoId) {
          errorMessage = 'YTPlayer: videoId is missing';
          setStatus(ytpStatusCode.ERROR, errorMessage);
           return reject(new Error(errorMessage));
        }

        if (!playerId) {
          errorMessage = 'YTPlayer: playerId is missing';
          setStatus(ytpStatusCode.ERROR, errorMessage);
          return reject(new Error(errorMessage));
        }

      
        const YT = await loadYoutubeScript();
        if (!YT) {
          throw new Error('YTPlayer load error');
        }

        setStatus(ytpStatusCode.CREATING_PLAYER);

        const handlers = eventHandlers ? eventHandlers : initialEventHandlers;
        const newPlayer = await new YT.Player(playerId, {
          height: '100%',
          width: '100%',
          videoId: videoId,
          playerVars: { ...option},
          events: handlers,
        });

        // printLog('YTPlayer hook: is player ready? :', newPlayer);
        setPlayer(newPlayer);
        resolve(newPlayer);

      } catch (error) {
        printError('useYTPlayer start error: ', error.message);        
        pauseVideo();
        setStatus(ytpStatusCode.ERROR, error.message);        
        reject(error);
      }
    })
};

  const onYouTubeIframeAPIReady = (resolve) => () => {
    setStatus(ytpStatusCode.API_READY);
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
        setStatus(ytpStatusCode.API_LOADED);
        return resolve(window.YT);
      }

      const youtubeAPI = '//www.youtube.com/iframe_api';
      const apiNotLoaded = [...document.getElementsByTagName('script')].every(
        (elem) => elem.src !== youtubeAPI
      );
      
      // printLog('apiNotLoaded: ', apiNotLoaded);

      if (apiNotLoaded) {
        const tag = document.createElement('script');
        tag.src = youtubeAPI;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady(resolve);
    });
  };

// const destroyPlayer = async () => {
//   printLog('************************** destroy player');
//   await player?.destroy();
//   setPlayer(null);
// }

  // const stopVideo = () => {
  //   console.log('YTPlayer hook stopVideo: ', player);
  //   player?.stopVideo();
  // };

  const pauseVideo = () => {
    printLog('YTPlayer hook pauseVideo: ', player);
    player?.pauseVideo();
  };

  const addListeners = useCallback((events) => {
    printLog('addListener!! player:', player);
    if (player) {
      for (const key in events) {
        printLog('addListener!! ', key, events[key]);
        player.addEventListener(key, events[key]);
      }
    }
  }, []);

  return { startYTPlayer, player, status, ytpStatusCode, error };
};

export default useYTPlayer;



