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
  const [status, setStatus] = useState('init');
  const [error, setError] = useState('');
  const [isJSLoaded, setJSLoaded] = useState(false);

  let player;

  const eventHandlers = {
    // 4. The API will call this function when the video player is ready.
    onReady: (event) => {
      //   if (autoPlay) event.target.playVideo();

      setStatus('ready');
      setError('');
      console.log('======YTPlayer is ready=====');
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
    onVolumeChange: (event) => console.log('onVolumeChange: ', event.data),
  };

  useEffect(() => {
    initStatus();

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  const initStatus = useCallback(() => {
    setStatus('init');
    setError('');
  }, []);

  const setErrorState = useCallback((message) => {
    setStatus('error');
    setError(message);
  }, []);

  const startYTPlayer = (videoId, playerId, option) => {
    console.log('startYTPlayer: videoId: ', videoId, 'playerId: ', playerId);
    setStatus('loading');

    if (videoId && videoId.length > 0 && playerId && playerId.length > 0) {
      loadYoutubeScript()
        .then((YT) => {
          console.log('loadYoutubeScript.then YT: ', YT);
          console.log('loadYoutubeScript.then option: ', option);
          if (playerId && YT) {
            createYTPlayer(
              YT,
              videoId,
              playerId,
              option, // ?? playerInitialOption
              eventHandlers
            ).then((res) => {
              player = res;
              //   setStatus('ready');
              //   setError('');
              return res;
            });
          } else {
            throw new Error('No player id or YTPlayer undefined');
          }
        })
        .catch((error) => {
          setErrorState(error.message);
          console.error('loadYoutube Script error', error);
        });
    } else {
      setErrorState(`Need VideoId and PlayerId, got ${videoId}, ${playerId}`);
    }
  };

  const createYTPlayer = (YT, videoId, elementId, option, events) => {
    console.log('createYTPlayer option:', option);
    console.log('createYTPlayer YT: ', YT);
    return new Promise((resolve) => {
      const newPlayer = new YT.Player(elementId, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: option,
        events,
      });
      //   console.log('createYTPlayer player: ', newPlayer);

      resolve(newPlayer);
    });
  };

  const onYouTubeIframeAPIReady = (resolve) => {
    // console.log('onYouTubeIframeAPIReady window.YT:', window.YT);
    if (isJSLoaded) resolve(window.YT);
  };

  const loadYoutubeScript = () => {
    return new Promise((resolve) => {
      // 2. This code loads the IFrame Player API code asynchronously.
      if (
        window.YT &&
        window.YT.Player &&
        window.YT.Player instanceof Function
      ) {
        console.log('window.YT is already exist: ', window.YT);
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
        // tag.setAttribute('async', '');

        tag.addEventListener('load', async () => {
          setJSLoaded(true);
          console.log('Youtube api script is loaded. YT:', window.YT);
          const intervalYT = setInterval(() => {
            console.log('scripti is loaded but YT is not ready');

            if (window.YT?.loaded) {
              console.log('YT is ready');
              clearInterval(intervalYT);

              resolve(window.YT);
            }
          }, 300);
        });
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
