import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useState,
} from 'react';
import useFullScreen from './hooks/useFullScreen';
import useYTPlayer from './hooks/useYTPlayer';

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
    },
    ref
  ) => {
    // console.log('Player: videos: ', videos);
    const [trailer, setTrailer] = useState();
    const [data, setData] = useState();
    const [videoId, setVideoId] = useState();
    const [playerId, setPlayerId] = useState();
    const uniqueId = useId();

    const [startYTPlayer, ytPlayer, ytpStatus, ytpError] = useYTPlayer();

    // const [setElementId, setHotKey] = useFullScreen();

    const fetchVideo = useCallback(async (fetchUrl) => {
      // return new Promise((resolve) => {
      fetch('/api/videos/fetchVideo', {
        method: 'POST', // 또는 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: fetchUrl }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(`$$$$$$$$$ fetchvideo res: ${uniqueId}`, res);
          setData(res);
        })
        .catch((error) => {
          console.error('Player fetch video error: ', error);
        });
      // });
    }, []);
    useEffect(() => {
      // setElementId('nc_s_player');
      // setHotKey('Enter');
      // console.log('Player props option: ', option);

      if (!videos && url && !lazyFetch) {
        fetchVideo(url).then(() => {
          // console.log(`$$$$$$$$$ fetchvideo res: ${uniqueId}`, res);
          // setData(res);
        });
      }

      if (videos) {
        setData(videos);
      }
    }, []);

    useEffect(() => {
      setTrailer(data?.find((video) => video.type === 'Trailer'));
    }, [data]);

    useEffect(() => {
      console.log('trailer.key: ', trailer?.key);

      if (trailer?.key) {
        setPlayerId(`player-${trailer.key}-${uniqueId}`);
        setVideoId(trailer.key);
      }
    }, [trailer]);

    useEffect(() => {
      // const startPlayer = async () => {
      //   //ready to put YTPlayer
      //   return await startYTPlayer(videoId, playerId, {
      //     ...option,
      //     playlist: videoId,
      //   });
      // };

      if (videoId && playerId) {
        startPlayer();
      }
    }, [videoId, playerId]);

    const startPlayer = async () => {
      //ready to put YTPlayer
      return await startYTPlayer(videoId, playerId, {
        ...option,
        playlist: videoId,
      });
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

    useImperativeHandle(ref, () => ({
      play,
      stop,
    }));

    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        {ytpStatus == 'error' && <h2>{ytpError}</h2>}
        <div id={playerId}></div>
      </div>
    );
  }
);

export default Player;
