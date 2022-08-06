import { useCallback, useEffect, useId, useRef, useState } from 'react';
import makeCancelablePromise from '../../utils/makeCancelablePromise';
import { randomNumber } from '../../utils/utils';
import useFetch from './useFetch';
import useYTPlayer from './useYTPlayer';

const playerInitialOption = {
  accelerometer: 1,
  autoplay: 1,
  gyroscope: 1,
  controls: 1,
  loop: 0,
  autohide: 1, // Hide video controls when playing
  // enablejsapi: true,
  // playlist: 'your-single-video-ID',
};

export const PlaystateType = {
  UNSTARTED: -1, // unstarted
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5, // video cued
};

  let promiseToCancel = null;


const usePlayer = ({
  videos = null,
  url = {
    url: null,
    lazyFetch: false,
  },
  option = playerInitialOption,
  handlers = {},
  playOnMount = true,
}) => {
  const refComponent = useRef(null);
  const [data, setData] = useState(null);
  const [playerStatus, setPlayerStatus] = useState('init');
  const [error, setError] = useState('');
  const [playState, setPlayState] = useState(-1);
  const [stopRequest, setStopRequest] = useState(false);
  const uniqueId = useId();
  // let promiseToCancel = null;

  const { startYTPlayer, destroyPlayer, player: ytPlayer, status: ytpStatus, ytpStatusCode, error: ytpError } = useYTPlayer();

  let videoId = '';
  let playerId = '';
  let ytpOption = option;
  let ytpHandlers = handlers;
  // let currVideo = null;
  let currVideoTitle = '';

  const printLog = (...args) => {
    console.log(...args, ': ', currVideoTitle);
  }

  const printError = (...args) => {
    console.error(...args, ': ', currVideoTitle);
  }

  const promiseKeys = {
    startPlayerPromise: 'startPlayerPromise',
  };

  const fetchVideoHost = '/api/videos/fetchVideo';
  const {
    data: fetchedData,
    status: fetchStatus,
    error: fetchError,
    startFetch,
  } = useFetch({ url: fetchVideoHost, shouldStart: url.lazyFetch });

  const ref = useCallback((node) => {
    if (node) {
      refComponent.current = node;
    }
  }, []);


  useEffect(() => {
    if(playOnMount) {
        startPlayer();
    }
    return () => {

    }
  }, []);

  useEffect(() => {
    if(ytpStatus === ytpStatusCode.READY) {

      if(ytPlayer?.videoTitle)
        currVideoTitle = ytPlayer.videoTitle;

      // console.log('stopRequest? ', stopRequest);
      if(stopRequest) {
        printLog('stopRequest? ', stopRequest);
        destroyPlayer && destroyPlayer();
        // pause();
        setStopRequest(false);
        promiseToCancel= null;
      }
    }

  }, [ytpStatus]);


  const resetPlayer = useCallback(() => {
    setData(null);
    videoId = '';
    playerId = '';
    ytpOption = option;
    ytpHandlers = handlers;

    setPlayerStatus('init');
    setError('');
  }, []);

  const setStatus = (player, error = '') => {
    // console.info('Player status chaged: ', player, ', ', player?.videoTitle, );
    printLog('Player status chaged: ', player);
    error && printError('error_message: ', error);
    setPlayerStatus(player);
    setError(error);
  };

  // const wrapperHandler = (resolve, handler = null) => (e) => {
  //   resolve(handler && handler(e))
  // }

  const playerEventHandlers = {
    onReady: (event) => {
      // setStatus('player ready');
      console.log(
        `======usePlyaer's YTPlayer is ready===== event.target`,
        event.target
      );

      return event.target;
    },
    onStateChange: (event) => {
      printLog(
        `This is usePlayer's onStateChange ----: `, event.data, ', ', event.target.videoTitle,
         
      );
      switch (event.data) {
        case YT.PlayerState.ENDED:
          {
            printLog('Video ended');
            setPlayState(YT.PlayerState.ENDED);
          }
          break;
        case YT.PlayerState.UNSTARTED:
          {
            printLog('Video unstarted');
            setPlayState(YT.PlayerState.UNSTARTED);
          }
          break;
        case YT.PlayerState.PLAYING:
          {
            printLog(
              'player state change: playing ',
              YT.PlayerState.PLAYING
            );
            setPlayState(YT.PlayerState.PLAYING);
          }
          break;
        case YT.PlayerState.PAUSED:
          {
            printLog('player state chaged paused: ', YT.PlayerState.PAUSED);
            setPlayState(YT.PlayerState.PAUSED);
          }
          break;
        case YT.PlayerState.BUFFERING:
          {
            printLog(
              'player state chaged buffering: ',
              YT.PlayerState.BUFFERING
            );
            setPlayState(YT.PlayerState.BUFFERING);
          }
          break;
        case YT.PlayerState.CUED:
          {
            printLog('player state chaged cued: ', YT.PlayerState.CUED);
            setPlayState(YT.PlayerState.BUFFERING);
          }
          break;
        default: {
          printLog('player state chaged : ', event.data);
        }
      }
    },
    onVolumeChange: (event) => {
      // console.log('onVolumeChange: ', event.data);
    },
  };


  const prepareDataForYTP = (videoData) => {
    if (videoData?.length) {
      setStatus('prepareDataForYTP');

      const length = videoData?.length;
      printLog('Player:: videoData.length: ', length);
      const randomIdx = length > 1 ? randomNumber(0, length - 1) : 0;
      // console.log('random video===== randomIdx : ', randomIdx);
      const randomVideo = videoData[randomIdx];
      currVideoTitle = randomVideo?.title ?? randomVideo?.original_title ?? randomVideo?.name ?? randomVideo?.original_name;
      // printLog('random video===== randomVideo : ', randomVideo);

      playerId = `player-${randomVideo?.key}-${uniqueId}`;
      videoId = randomVideo?.key;
      refComponent?.current?.setAttribute('id', playerId);
      ytpOption = {
        ...option,
        playlist: randomVideo?.key,
      };

      // ready to mount YTPlayer
      setStatus('ready for mount player');
    }
  };

  // setData useEffect
  useEffect(() => {
    // if (data?.length) prepareDataForYTP();
  }, [data]);

  const fetchVideo = useCallback(
    (requestData) => {
      return new Promise(async (resolve, reject) => {
        try {
          setStatus('fetch request');
          const res = await startFetch({ query: { url: requestData.url } });
          printLog(`********* Player fetchvideo res: ${uniqueId}`, res);
          if (!res || res.length <= 0) {
            throw new Error('No video data');
          }

          setStatus('data fetched');
          resolve(res);
        } catch (error) {
          printError('Player fetch video error: ', error);
          setStatus('error', error.message);
          reject(error);
        }
      });
    },
    [url]
  ); 

const startPlayerPromise =  () => {

    return new Promise(async (resolve, reject) => {
      try {
        let videoData = [];
        if (!data) {
          if (!videos && !url.url) {
            const message = 'No videos data or invalid fetch url';
            setStatus('error', message);
            return reject(new Error(message));
          }
    
          if (videos) {
            setData(videos);
            videoData = videos;
          }
    
          if (!videos && url.url) {
              const res = await fetchVideo(url);
              setData(res);
              videoData = res;
          }
            prepareDataForYTP(videoData);

        } else {

          if ((!videoId || !playerId)) {
            // console.log('lets prepareDataForYTP:: videoId: ', videoId, 'playerId: ', playerId);
            videoData = data;
            prepareDataForYTP(data);
            // console.log('after prepareDataForYTP:: videoId: ', videoId, 'playerId: ', playerId);
          }
        }
        setStatus('startYTPlayer loading');

        ytpHandlers = (Object.keys(handlers).length > 0) ? handlers : playerEventHandlers;
        
        // console.log('ytpHandlers:::: ', ytpHandlers);
        
        const ytPlayerPromise = startYTPlayer(
          videoId,
          playerId,
          ytpOption,
          ytpHandlers
        );

        if(!ytPlayerPromise) return reject('start YTPlayer error');
        ytPlayerPromise.setCancelChain(promiseToCancel?.cancel);
      
        const prevCancel = promiseToCancel;
        promiseToCancel = ytPlayerPromise;
        
        const res = await ytPlayerPromise.promise();
        printLog('ytPlayerPromise res: ', res);
        promiseToCancel = prevCancel;
        resolve(res);

      } catch (error) {
        printError('Player StartPlayer Promise error : ', error);
        setStatus('error', `startPlayer:: ${error.message}`);
        promiseToCancel = null;

        return reject(error);
      }
          
    });
  }

  const startPlayer = async () => {
    try {
      setStopRequest(false);
      setStatus('init');

      if (ytPlayer && ytPlayer instanceof YT.Player && playState !== YT.PlayerState.UNSTARTED) {
        printLog('YTPlayer already exist', ytPlayer);('Player ready');
        setStatus('ready');
        return play();
      }

      const startPromise = makeCancelablePromise({
        promise: startPlayerPromise,
        name: 'startPlayerPromise'
      });
      promiseToCancel = startPromise;
      const res = await startPromise.promise();
      promiseToCancel = null;

      setStatus('ready');      
      printLog('startPlayer res: ', res);
      
    } catch (error) {
      console.error('starPlayer error: ', error);
      // printLog('ytPlayer has created? ', ytPlayer);
      promiseToCancel = null;
      setStatus('error', error);
    }
  }

  const play = () => {
    // if(playerStatus === 'error') {
    //   pause();
    // }

    ytPlayer?.playVideo();
  };

  const pause = () => {
    printLog('pause');
    ytPlayer?.pauseVideo();
  };

  const stopPlayer = () => {
    // console.log('stopPlayer cancel promiseToCancel: ', promiseToCancel?.cancel);
    // if(promiseToCancel) {

    //   if(promiseToCancel?.cancel) {
    //     promiseToCancel.cancel();
    //   }
      
    //   promiseToCancel = null;
    // }

    if(ytpStatus !== ytpStatusCode.READY) {
      setStopRequest(true);
      printLog('queue stop request');

      return;
    }
    
    setStopRequest(false);
    pause();
  }

  const mute = () => {
    printLog('mute');
    ytPlayer?.mute();
  };

  const unMute = () => {
    printLog('unMute');
    ytPlayer?.unMute();
  };

  const isMuted = () => {
    return ytPlayer?.isMuted();
  };

  const getDuration = () => {
    return ytPlayer?.getDuration();
  };

  // const playerControls = {
  //   startPlayer,
  //   play,
  //   stop,
  //   mute,
  //   unMute,
  //   isMuted,
  //   getDuration,
  //   playerStatus,
  //   error,
  // };

  return {ref, startPlayer, stopPlayer, player: ytPlayer, playerStatus, playState, error};
};

export default usePlayer;
