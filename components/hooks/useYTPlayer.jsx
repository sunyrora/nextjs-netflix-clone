import { useCallback, useEffect, useState } from 'react';
import makeCancelablePromise from '../../utils/makeCancelablePromise';

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

  const ytpStatusCode = {
    INIT: 'init',
    API_LOADED: 'YT api ready loaded',
    API_READY: 'YTP_API_ready',
    LOADING: 'loading',
    CREATING_PLAYER: 'createing_player',
    READY: 'ready',
    ERROR: 'error',
} 

  const initialEventHandlers = {
    // 4. The API will call this function when the video player is ready.
    onReady: (event) => {
      setPlayer(event.target);
      setStatus(ytpStatusCode.READY);
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

  useEffect(() => {

    if(player) {
      setStatus(ytpStatusCode.READY);
    }

  },[player])


  const setStatus = useCallback(
    (status = ytpStatusCode.INIT, error = '') => {
      console.log(`ytPlayer setStatus:`, status, ', error: ', error);
      setYtStatus(status);
      setError(error);
    },
    [status, error]
  );

  const wrapperHandler = (resolve, handler = null) => (e) => {
    setPlayer(e.target);
    // console.log('YTPlayer ready: ', e.target);
    // setStatus(ytpStatusCode.READY);
    // setError('');
   resolve(handler && handler(e));
  }


const startYTPlayerPromise = (videoId, playerId, option, eventHandlers) => {
  return () => {
  return new Promise(async (resolve, reject) => {
      try {
        setStatus(ytpStatusCode.INIT);
        setStatus(ytpStatusCode.LOADING);

        player && destroyPlayer();
        
        console.log('startYTPlayer: videoId: ', videoId, 'playerId: ', playerId);
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

        const handlers = eventHandlers ? {...eventHandlers} : {...initialEventHandlers};
        handlers.onReady = wrapperHandler(resolve, handlers.onReady);
        const newPlayer = await new YT.Player(playerId, {
          // host: `${window.location.protocol}//www.youtube.com`,
          // origin: 'https://192.168.1.76:3000',
          height: '100%',
          width: '100%',
          videoId: videoId,
          playerVars: { ...option},
          events: handlers,
        });

        console.log('YTPlayer hook: is player ready? :', newPlayer);
        // resolve(newPlayer);

      } catch (error) {
        console.error('useYTPlayer start error: ', error);        
        pauseVideo();
        setStatus(ytpStatusCode.ERROR, error.message);        
        reject(error);
      }
    })
  }
}

const startYTPlayer = useCallback((videoId, playerId, option, eventHandlers) => makeCancelablePromise({
  promise: startYTPlayerPromise(videoId, playerId, option, eventHandlers),
  name: 'YTPlayer hooks: startYTPlayerPromise'
})
, [initialEventHandlers]);

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
const destroyPlayer = () => {
  console.log('************************** destroy player');
  player?.destroy();
}

  // const stopVideo = () => {
  //   console.log('YTPlayer hook stopVideo: ', player);
  //   player?.stopVideo();
  // };

  const pauseVideo = () => {
    console.log('YTPlayer hook pauseVideo: ', player);
    player?.pauseVideo();
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

  return { startYTPlayer, destroyPlayer, player, status, ytpStatusCode, error };
};

export default useYTPlayer;



