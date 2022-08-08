import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { randomNumber } from '../../utils/utils';
import useFetch from './useFetch';
import useStateRef from './useStateRef';
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
  // const [playerStatus, setPlayerStatus] = useState('init');
  const [playerStatus, setPlayerStatus, playerStatusRef] = useStateRef('init');
  const [error, setError] = useState('');
  const [playState, setPlayState] = useState(-1);
  const [stopRequest, setStopRequest] = useState(false);
  const [player, setPlayer, playerRef] = useStateRef(null);
  // const [player, setPlayer] = useState();
  const uniqueId = useId();
  // let promiseToCancel = null;

  const { startYTPlayer, player : ytPlayer, status: ytpStatus, ytpStatusCode, error: ytpError } = useYTPlayer();

  let videoId = '';
  let playerId = '';
  let ytpOption = option;
  let ytpHandlers = handlers;
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
  }, [refComponent]);


  useEffect(() => {
    if(playOnMount) {
        startPlayer();
    }
    return () => {

    }
  }, []);

  // useEffect(() => {
  //   printLog('ytpStatus changed', ytpStatus, ytPlayer );
  //   if(ytpStatus === ytpStatusCode.READY) {

  //     if(ytPlayer?.videoTitle)
  //       currVideoTitle = ytPlayer.videoTitle;

  //     // console.log('stopRequest? ', stopRequest);
  //     if(stopRequest) {
  //       printLog('stopRequest? ', stopRequest);
  //       // destroyPlayer && destroyPlayer();
  //       pause();
  //       setStopRequest(false);
  //       promiseToCancel= null;
  //     }
  //   }

  // }, [ytpStatus]);
  
  useEffect(() => {
    // printLog('player has set', player, 'playerRef: ',playerRef );
    if(playerRef.current) {
      setStatus('ready');
      if(player?.videoTitle)
        currVideoTitle = player.videoTitle;

      if(stopRequest) {
        // printLog('stopRequest? ', stopRequest);
        pause();
        setStopRequest(false);
      }
    }

  }, [player]);


  const setStatus = (player, error = '') => {
    // console.info('Player status chaged: ', player, ', ', player?.videoTitle, );
    // printLog('Player status changed: ', player);
    error && printError('error_message: ', error);
    setPlayerStatus(player);
    setError(error);
  };


  const playerEventHandlers = {
    onReady: (event) => {
      // console.log(
      //   `======usePlayer's YTPlayer is ready===== event.target`,
      //   event.target
      // );

      setPlayer(event.target);
      return event.target;
    },
    onStateChange: (event) => {

      switch (event.data) {
        case YT.PlayerState.ENDED:
          {
            printLog('Video ended');
            setPlayState(YT.PlayerState.ENDED);
          }
          break;
        case YT.PlayerState.UNSTARTED:
          {
            // printLog(
            //   'player state change: UNSTARTED ',
            //   YT.PlayerState.UNSTARTED
            // );
          //   printLog('Video unstarted:: player', player);
          //   printLog('Video unstarted:: refPlayer', playerRef);
          //   printLog('Video unstarted', event.target);
            setPlayState(YT.PlayerState.UNSTARTED);
          }
          break;
        case YT.PlayerState.PLAYING:
          {
            // printLog(
            //   'player state change: playing ',
            //   YT.PlayerState.PLAYING
            // );
            setPlayState(YT.PlayerState.PLAYING);
          }
          break;
        case YT.PlayerState.PAUSED:
          {
            // printLog('player state chaged paused: ', YT.PlayerState.PAUSED);
            setPlayState(YT.PlayerState.PAUSED);
          }
          break;
        case YT.PlayerState.BUFFERING:
          {
            // printLog(
            //   'player state chaged buffering: ',
            //   YT.PlayerState.BUFFERING
            // );
            setPlayState(YT.PlayerState.BUFFERING);
          }
          break;
        case YT.PlayerState.CUED:
          {
            // printLog('player state chaged cued: ', YT.PlayerState.CUED);
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
    // setStatus('prepareDataForYTP');
    // printLog('videoData', videoData);
    
    if (videoData?.length) {
      const length = videoData?.length;
      // printLog('Player:: videoData.length: ', length);
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
          // printLog(`********* Player fetchvideo res: ${uniqueId}`, res);
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

        } else {

          videoData = data;
        }

        prepareDataForYTP(videoData);

        setStatus('startYTPlayer loading');

        if(!ytpHandlers || !Object.keys(ytpHandlers).length) {
          ytpHandlers = playerEventHandlers;
        }
       
        const res =  await startYTPlayer(
          videoId,
          playerId,
          ytpOption,
          ytpHandlers
        );

        resolve(res);
      } catch (error) {
        printError('Player StartPlayer Promise error : ', error);
        setStatus('error', `startPlayer:: ${error.message}`);

        return reject(error);
      }
    })
  }

  const startPlayer = async () => {
    try {
      setStopRequest(false);
      setStatus('init');

      if (playerRef.current && playerRef.current instanceof YT.Player /* && playState !== YT.PlayerState.UNSTARTED */) {
        // printLog('Player already exist', player);('Player ready');
        setStatus('ready');
        return play();
      }
      const res = await startPlayerPromise();

      // printLog('startPlayer res: ', res);
      
    } catch (error) {
      console.error('starPlayer error: ', error);
      setStatus('error', error);
    }
  }

  const play = () => {

    // console.log('play:: player: ', player, 'refPlayer.current: ', playerRef.current)

    playerRef?.current?.playVideo();
  };

  const pause = () => {
    // printLog('pause player', player);
    // console.log('play:: player: ', player, 'refPlayer.current: ', playerRef.current)

    playerRef?.current?.pauseVideo();
  };

  const stopPlayer = useCallback( () => {
    // printLog('stopPlayer player', player);
    // console.log('stopPlayer player: ', player, 'refPlayer.current: ', playerRef.current)

    // console.log('stopPlayer playerStatus: ', playerStatus, 'playerStatusRef.current: ', playerStatusRef.current);

    if(playerStatusRef.current !== 'ready' && playerStatusRef.current !== 'init') {
        setStopRequest(true);
        // printLog('queue stop request');

      return;
    }
    
    setStopRequest(false);
    pause();

  }, [playerStatus]);

  const mute = () => {
    printLog('mute');
    playerRef?.current?.mute();
  };

  const unMute = () => {
    printLog('unMute');
    playerRef?.current?.unMute();
  };

  const isMuted = () => {
    return playerRef?.current?.isMuted();
  };

  const getDuration = () => {
    return playerRef?.current?.getDuration();
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

  return {ref, startPlayer, stopPlayer, player, playerStatus, playState, error};
};

export default usePlayer;
