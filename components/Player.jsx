import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useState,
} from 'react';

import { randomNumber } from '../utils/utils';
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
    const [ytPlayer, setYTPlayer] = useState(null);
    const uniqueId = useId();

    const { setPlayerStatus: cbSetPlayerStatus } = callbacks;

    const fetchVideoHost = '/api/videos/fetchVideo';
    const {
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
      onReady: (event) => {
        //   if (autoPlay) event.target.playVideo();
        setYTPlayer(event.target);
        setStatus('ready');
        console.log(
          `======Plyaer's YTPlayer is ready===== event.target`,
          event.target
        );
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
                YT.Playerstate.PAUSED
              );
              if (cbSetPlayerStatus) cbSetPlayerStatus('paused');
            }
            break;
          // case YT.PlayerState.BUFFERING:
          //   {
          //     console.log(
          //       'player state chaged buffering: ',
          //       YT.Playerstate.BUFFERING
          //     );
          //     if (cbSetPlayerStatus) cbSetPlayerStatus('buffering');
          //   }
          //   break;
          default: {
            console.log('player state chaged : ', event.data);
          }
        }

        // if (
        //   event.data === YT.PlayerState.ENDED ||
        //   event.data === YT.PlayerState.UNSTARTED
        // ) {
        //   console.log('Video ended');
        //   if (cbSetPlayerStatus) cbSetPlayerStatus('ended');
        //   // setStatus(YT.PlayerState.ENDED);
        //   // setVideoEnd ?? setVideoEnd(true);
        // }
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

    const fetchVideo = useCallback(() => {
      startFetch({ query: { url } })
        .then((res) => {
          console.log(`********* Player fetchvideo res: ${uniqueId}`, res);

          setStatus('data fetched');
          setData(res);
        })
        .catch((error) => {
          console.error('Player fetch video error: ', error);
          setStatus('error', error.data);
        });
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
        // ready to mount YTPlayer
        startPlayer();
      }
    }, [videoId, playerId]);

    const startPlayer = async () => {
      if (ytPlayer) {
        console.log('YTPlayer already exist');
        play();
        return;
      }

      if (!data) {
        if (videos) {
          setData(videos);
          return;
        }

        if (url) {
          fetchVideo();
          return;
        }
      }

      //create YTPlayer
      await startYTPlayer(
        videoId,
        playerId,
        {
          ...option,
          playlist: videoId,
        },
        plyerEventHanlders
      );
    };

    const play = async () => {
      console.log('play');
      if (!data) {
        if (!url) throw new Error('no video data');
        await fetchVideo(url);
      } else {
        if (!ytPlayer) {
          await startPlayer();
        }

        ytPlayer?.playVideo();
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
      <div className="w-full h-full flex flex-col justify-center items-center">
        {/* {ytpStatus == 'error' ? (
          <h2>{ytpError}</h2>
        ) : (
          playerStatus === 'error' && <h2>{error}</h2>
        )} */}
        <div id={playerId}></div>
      </div>
    );
  };
);

export default Player;
