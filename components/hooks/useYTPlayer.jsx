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
      //   console.log('onPlayerStateChange: ', event.data);
      // if (event.data == YT.PlayerState.PLAYING && !done) {
      //   setTimeout(stopVideo, 6000);
      //   done = true;
      // }
    },
    onVolumeChange: (event) => {
      // console.log('onVolumeChange: ', event.data);
    },
  };

  useEffect(() => {
    setYtStatus();

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  // useEffect(() => {
  //   console.log('^^^^^^^^^^^ player is set', player);
  // }, [player]);

  const setStatus = useCallback(
    (status = 'init') => {
      console.log(`setStatus:`, status);
      setYtStatus(status);
      setError('');
    },
    [status, error]
  );

  const setErrorState = useCallback((message) => {
    setYtStatus('error');
    setError(message);
  }, []);

  const startYTPlayer = async (videoId, playerId, option, eventHandlers) => {
    // const handlers = { ...initialEventHandlers, ...eventHandlers };
    const handlers = eventHandlers ?? initialEventHandlers;
    console.log('startYTPlayer: videoId: ', videoId, 'playerId: ', playerId);
    console.log('startYTPlayer: eventHandlers: ', handlers);
    setStatus('loading');

    if (videoId && playerId) {
      loadYoutubeScript()
        .then((YT) => {
          // console.log('loadYoutubeScript.then YT: ', YT);
          // console.log('loadYoutubeScript.then option: ', option);
          if (playerId && YT) {
            const newPlayer = new YT.Player(playerId, {
              height: '100%',
              width: '100%',
              videoId: videoId,
              playerVars: option,
              events: handlers,
            });
            // console.log('createYTPlayer newPlayer: ', newPlayer);
          } else {
            throw new Error('No player id or YTPlayer undefined');
          }
        })
        .catch((error) => {
          setErrorState(error.message);
          console.error('loadYoutube Script error', error);
        });
    } else {
      console.log(
        `one(or both) of these Id is missing: videoId: ${videoId}  playerID: ${playerId}`
      );
      setErrorState(`No video or Element`);
    }
  };

  // const createYTPlayer = (YT, videoId, elementId, option, events) => {
  //   console.log('createYTPlayer elementId:', elementId);
  //   console.log('createYTPlayer YT: ', YT);
  //   return new Promise((resolve) => {
  //     const newPlayer = new YT.Player(elementId, {
  //       height: '100%',
  //       width: '100%',
  //       videoId: videoId,
  //       playerVars: option,
  //       events,
  //     });
  //     console.log('createYTPlayer newPlayer: ', newPlayer);

  //     resolve(newPlayer);
  //   });
  // };

  const onYouTubeIframeAPIReady = (resolve) => {
    // console.log('onYouTubeIframeAPIReady window.YT:', window.YT);

    if (!window.YT || !window.YT.loaded) {
      const intervalYT = setInterval(() => {
        console.log('scripti is loaded but YT is not ready', window.YT);
        if (window.YT && window.YT.loaded) {
          console.log('YT is ready', window.YT);
          clearInterval(intervalYT);

          resolve(window.YT);
        }
      }, 300);
    }
  };

  const loadYoutubeScript = () => {
    return new Promise((resolve) => {
      // 2. This code loads the IFrame Player API code asynchronously.
      if (
        window.YT &&
        window.YT.Player &&
        window.YT.Player instanceof Function
      ) {
        // console.log('window.YT is already exist: ', window.YT);
        resolve(window.YT);

        return;
      }

      const youtubeAPI = 'https://www.youtube.com/iframe_api';
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
