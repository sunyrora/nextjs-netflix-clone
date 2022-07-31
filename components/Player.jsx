import PreviousMap from 'postcss/lib/previous-map';
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useState,
} from 'react';

import { classNames, randomNumber } from '../utils/utils';
import useFetch from './hooks/useFetch';
import useFullScreen from './hooks/useFullScreen';
import useYTPlayer from './hooks/useYTPlayer';

// YT.PlayerState
// {
//     "UNSTARTED": -1,  // unstarted
//     "ENDED": 0,
//     "PLAYING": 1,
//     "PAUSED": 2,
//     "BUFFERING": 3,
//     "CUED": 5 // video cued
// }

export const playerInitialOption = {
  accelerometer: 1,
  autoplay: 1,
  gyroscope: 1,
  controls: 1,
  loop: 0,
  autohide: 1, // Hide video controls when playing
  // enablejsapi: true,
  // playlist: 'your-single-video-ID',
};

const Player = forwardRef(
  (
    {
      videos = null,
      url = null,
      option = playerInitialOption,
      lazyFetch = false,
      callbacks = {},
      className = '',
    },
    ref
  ) => {
    // console.log('Player: videos: ', videos);
    const [trailer, setTrailer] = useState();
    const [data, setData] = useState(null);
    const [videoId, setVideoId] = useState();
    const [playerId, setPlayerId] = useState();
    const [playerStatus, setPlayerStatus] = useState('init');
    const [error, setError] = useState('');
    const [ytpOption, setYTPOption] = useState(option);
    const [ytPlayer, setYTPlayer] = useState(null);
    const uniqueId = useId();

    const { setPlayerStatus: cbSetPlayerStatus } = callbacks;

    const fetchVideoHost = '/api/videos/fetchVideo';
    const {
      data: fetchedData,
      status: fetchStatus,
      error: fetchError,
      startFetch,
    } = useFetch(fetchVideoHost, null, false);

    const [startYTPlayer, ytpStatus, ytpError] = useYTPlayer();
    // const [startYTPlayer, ytPlayer, ytpStatus, ytpError] = useYTPlayer();

    const setStatus = (player, error = '') => {
      setPlayerStatus(player);
      setError(error);
      if (cbSetPlayerStatus) cbSetPlayerStatus(player);
    };

    const plyerEventHanlders = {
      onReady: async (event) => {
        //   if (autoPlay) event.target.playVideo();
        await setYTPlayer(event.target);
        setStatus('ready');
        console.log(
          `======Plyaer's YTPlayer is ready===== event.target`,
          event.target
        );
        if (option.autoplay) event.target.playVideo();
      },
      onStateChange: (event) => {
        console.log(
          `This is Player's onStateChange ---------------event.data: `,
          event.data
        );
        switch (event.data) {
          case YT.PlayerState.ENDED:
            {
              console.log('Video ended');
              if (cbSetPlayerStatus) cbSetPlayerStatus('ended');
            }
            break;
          case YT.PlayerState.UNSTARTED:
            {
              console.log('Video ended');
              if (cbSetPlayerStatus) cbSetPlayerStatus('unstarted');
            }
            break;
          case YT.PlayerState.PLAYING:
            {
              console.log(
                'player state change: playing ',
                YT.PlayerState.PLAYING
              );
              if (cbSetPlayerStatus) cbSetPlayerStatus('playing');
            }
            break;
          case YT.PlayerState.PAUSED:
            {
              console.log(
                'player state chaged paused: ',
                YT.PlayerState.PAUSED
              );
              if (cbSetPlayerStatus) cbSetPlayerStatus('paused');
            }
            break;
          case YT.PlayerState.BUFFERING:
            {
              console.log(
                'player state chaged buffering: ',
                YT.PlayerState.BUFFERING
              );
              if (cbSetPlayerStatus) cbSetPlayerStatus('buffering');
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
    // const [setElementId, setHotKey] = useFullScreen();

    useEffect(() => {
      // setElementId('nc_s_player');
      // setHotKey('Enter');
      // console.log('Player props option: ', option);
      if (data) {
        console.log('data is already set');
        return;
      }

      if (!videos && url && !lazyFetch) {
        fetchVideo();
        return;
      }

      if (videos) {
        setStatus('data recieved', '');
        setData(videos);
      }
    }, []);

    useEffect(() => {
      // console.log('############### ytpStatus changed: ', ytpStatus);
      if (ytpStatus === 'ready') {
        setStatus('ready');
      }
    }, [ytpStatus]);

    const fetchVideo = useCallback(async () => {
      try {
        setStatus('fetch request');
        const res = await startFetch({ query: { url } });
        console.log(`********* Player fetchvideo res: ${uniqueId}`, res);

        setStatus('data fetched');
        setData(res);
      } catch (error) {
        console.error('Player fetch video error: ', error);
        setStatus('error', error.data);
      }
    }, [url]);

    useEffect(() => {
      // setTrailer(data?.find((video) => video.type === 'Trailer'));
      // console.log('setData done: ', data);

      if (data?.length) {
        const length = data?.length;
        const randomIdx = length > 1 ? randomNumber(0, length) : 0;
        const randomVideo = data[randomIdx ?? 0];
        setTrailer(randomVideo);
        console.log('random video===== randomIdx : ', randomVideo);

        setPlayerId(`player-${randomVideo?.key}-${uniqueId}`);
        setVideoId(randomVideo?.key);
      }
    }, [data]);

    useEffect(() => {
      if (videoId && playerId) {
        setYTPOption((prev) => ({ ...PreviousMap, playlist: videoId }));
        // // ready to mount YTPlayer
        // startPlayer();
      }
    }, [videoId, playerId]);

    useEffect(() => {
      if (ytpOption.playlist) {
        // ready to mount YTPlayer
        setStatus('ready for mouunt player');
        startPlayer();
      }
    }, [ytpOption]);

    const startPlayer = async () => {
      if (ytPlayer) {
        console.log('YTPlayer already exist');
        play();
        return;
      }

      if (!data) {
        if (!videos && !url) {
          const message = 'No videos data or invalid fetch url';
          setStatus('error', message);
          throw new Error(message);
        }

        if (videos) {
          setData(videos);
          return;
        }

        if (url) {
          fetchVideo();
          return;
        }
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
          if (!videos && !url) throw new Error('no video data');

          if (videos) {
            setData(videos);
            return;
          }

          await fetchVideo(url);
        } else {
          if (!ytPlayer) {
            await startPlayer();
          }

          ytPlayer?.playVideo();
        }
      } catch (error) {
        setStatus('error', error.message);
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

    useImperativeHandle(ref, () => ({
      startPlayer,
      play,
      stop,
      mute,
      unMute,
      isMuted,
      getDuration,
    }));
    return (
      <div
        className={classNames(
          `w-full h-full flex flex-col justify-center items-center`,
          className
        )}
      >
        {/* {ytpStatus == 'error' ? (
          <h2>{ytpError}</h2>
        ) : (
          playerStatus === 'error' && <h2>{error}</h2>
        )} */}
        <div id={playerId}></div>
      </div>
    );
  }
);

export default Player;
