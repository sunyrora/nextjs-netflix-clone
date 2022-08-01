import { useCallback, useEffect, useId, useRef, useState } from 'react';
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

const usePlayer = ({
  videos = null,
  url = {
    url: null,
    lazyFetch: false,
  },
  option = playerInitialOption,
  playOnMount = true,
}) => {
  const refComponent = useRef(null);
  const [data, setData] = useState(null);
  const [playerStatus, setPlayerStatus] = useState('init');
  const [error, setError] = useState('');
  const [playState, setPlayState] = useState();
  const [ytPlayer, setYTPlayer] = useState(null);
  const uniqueId = useId();

  const [startYTPlayer, ytpStatus, ytpError] = useYTPlayer();

  let videoId = '';
  let playerId = '';
  let ytpOption = option;

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
      if (playOnMount) {
        startPlayer();
      }
    }

    return () => {
      resetYTPlayer();
    };
  }, []);

  const resetPlayer = useCallback(() => {
    setData(null);
    videoId = '';
    let PlayerId = '';
    let ytpOption = option;
    setPlayerStatus('init');
    setError('');
    resetYTPlayer();
  }, []);

  const resetYTPlayer = () => {
    if (ytPlayer) {
      ytPlayer.destroy();
    }
  };

  const setStatus = (player, error = '') => {
    console.info('Player status chaged: ', player, ',error message: ', error);
    setPlayerStatus(player);
    setError(error);
  };

  const plyerEventHanlders = {
    onReady: async (event) => {
      //   if (autoPlay) event.target.playVideo();
      await setYTPlayer(event.target);
      setStatus('ready');
      console.log(
        `======usePlyaer's YTPlayer is ready===== event.target`,
        event.target
      );
      if (option.mute) event.target.mute();
      if (option.autoplay) event.target.playVideo();
    },
    onStateChange: (event) => {
      console.log(
        `This is usePlayer's onStateChange ---------------event.data: `,
        event.data
      );
      switch (event.data) {
        case YT.PlayerState.ENDED:
          {
            console.log('Video ended');
            setPlayState(YT.PlayerState.ENDED);
          }
          break;
        case YT.PlayerState.UNSTARTED:
          {
            console.log('Video ended');
            setPlayState(YT.PlayerState.UNSTARTED);
          }
          break;
        case YT.PlayerState.PLAYING:
          {
            console.log(
              'player state change: playing ',
              YT.PlayerState.PLAYING
            );
            setPlayState(YT.PlayerState.PLAYING);
          }
          break;
        case YT.PlayerState.PAUSED:
          {
            console.log('player state chaged paused: ', YT.PlayerState.PAUSED);
            setPlayState(YT.PlayerState.PAUSED);
          }
          break;
        case YT.PlayerState.BUFFERING:
          {
            console.log(
              'player state chaged buffering: ',
              YT.PlayerState.BUFFERING
            );
            setPlayState(YT.PlayerState.BUFFERING);
          }
          break;
        case YT.PlayerState.CUED:
          {
            console.log('player state chaged cued: ', YT.PlayerState.CUED);
            setPlayState(YT.PlayerState.BUFFERING);
          }
          break;
        default: {
          console.log('player state chaged : ', event.data);
        }
      }
    },
    onVolumeChange: (event) => {
      // console.log('onVolumeChange: ', event.data);
    },
  };

  useEffect(() => {}, []);

  const prepareDataForYTP = () => {
    if (data?.length) {
      const length = data?.length;
      console.info('Player:: data.length: ', length);
      const randomIdx = length > 1 ? randomNumber(0, length - 1) : 0;
      console.log('random video===== randomIdx : ', randomIdx);
      const randomVideo = data[randomIdx];
      console.log('random video===== randomVideo : ', randomVideo);

      playerId = `player-${randomVideo?.key}-${uniqueId}`;
      videoId = randomVideo?.key;
      ytpOption = {
        ...option,
        playlist: randomVideo?.key,
      };
      refComponent?.current?.setAttribute('id', playerId);

      // ready to mount YTPlayer
      setStatus('ready for mount player');
      startPlayer();
    }
  };

  // setData useEffect
  useEffect(() => {
    console.log('data set: ', data);
    if (data?.length) prepareDataForYTP();
  }, [data]);

  const fetchVideo = useCallback(
    (requestData) => {
      return new Promise(async (resolve, reject) => {
        try {
          setStatus('fetch request');
          const res = await startFetch({ query: { url: requestData.url } });
          console.log(`********* Player fetchvideo res: ${uniqueId}`, res);
          if (!res || res.length <= 0) {
            throw new Error('No video data');
          }

          setStatus('data fetched');
          resolve(res);
          // setData(res);
        } catch (error) {
          console.error('Player fetch video error: ', error);
          setStatus('error', error.message);
          // throw error;
          reject(error);
        }
      });
    },
    [url]
  );

  const startPlayer = async () => {
    if (ytPlayer) {
      if (ytpStatus === 'error' && ytpError) {
        console.log('there was a ytp error');
        setStatus('error', ytpError);
        return;
      }

      console.log('YTPlayer already exist');
      play();
      return;
    }

    if (!data) {
      if (!videos && !url.url) {
        const message = 'No videos data or invalid fetch url';
        setStatus('error', message);
        throw new Error(message);
      }

      if (videos) {
        setData(videos);
        return;
      }

      if (url) {
        try {
          const res = await fetchVideo(url);
          setData(res);
          return;
        } catch (error) {
          console.error('startPlayer fetch error : ', error);
          setStatus('error', `startPlayer:: ${error.message}`);
          return;
        }
      }
    }
    if (data && (!videoId || !playerId)) {
      prepareDataForYTP();
      return;
    }

    try {
      setStatus('startYTPlayer loading');
      //create YTPlayer
      await startYTPlayer(
        videoId,
        playerId,
        ytpOption,
        // {
        //   ...ytpOption,
        //   playlist: videoId,
        // },
        plyerEventHanlders
      );
    } catch (error) {
      console.log('Player startYTPlayer error: ', error);
      setStatus('error', error.message);
    }
  };

  const play = async () => {
    try {
      console.log('play');
      if (!data) {
        if (!videos && !url.url) throw new Error('no video data');

        if (videos) {
          setData(videos);
          return;
        }

        if (url.url) {
          const res = await fetchVideo(url);
          setData(res);
          return;
        }
      } else {
        if (!ytPlayer) {
          startPlayer();
          return;
        }

        if (ytPlayer?.error) {
          console.log('There was a ytPlayer error, retry..', ytPlayer?.error);
          startPlayer();
        }

        ytPlayer?.playVideo();
      }
    } catch (error) {
      setStatus('error', `Player::play- ${error.message}`);
      console.log('Player play() error: ', error);
    }
  };

  const stop = () => {
    console.log('stop');
    ytPlayer?.stopVideo();
  };

  const mute = () => {
    console.log('mute');
    ytPlayer?.mute();
  };

  const unMute = () => {
    console.log('unMute');
    ytPlayer?.unMute();
  };

  const isMuted = () => {
    // console.log('ytPlayer?.isMuted()? ', ytPlayer?.isMuted());
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

  return [refComponent, startPlayer, ytPlayer, playerStatus, playState, error];
};

export default usePlayer;
