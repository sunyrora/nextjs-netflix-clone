import { useCallback, useEffect, useState } from 'react';
import useFullScreen from '../../components/hooks/useFullScreen';
import useYTPlayer from '../../components/hooks/useYTPlayer';

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

const Player = ({
  videos = null,
  url = null,
  option = playerInitialOption,
}) => {
  // console.log('Player: videos: ', videos);
  const [trailer, setTrailer] = useState();
  const [data, setData] = useState();
  const [videoId, setVideoId] = useState();

  const playerId = 'player';

  const [startYTPlayer, ytpStatus, ytpError] = useYTPlayer();

  // const [setElementId, setHotKey] = useFullScreen();

  const fetchVideo = useCallback(async (fetchUrl) => {
    await fetch('/api/videos/fetchVideo', {
      method: 'POST', // 또는 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fetchUrl }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Player fetche video error: ', error);
      });
  }, []);
  useEffect(() => {
    // setElementId('nc_s_player');
    // setHotKey('Enter');
    // console.log('Player props option: ', option);

    if (!videos && url) {
      // const fetchVideo = async () => {
      //   await fetch('/api/videos/fetchVideo', {
      //     method: 'POST', // 또는 'PUT'
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ url }),
      //   })
      //     .then((res) => res.json())
      //     .then((data) => {
      //       setData(data);
      //     })
      //     .catch((error) => {
      //       console.error('Player fetche video error: ', error);
      //     });
      //   // try {
      //   //   const data = await fetch(
      //   //     `/api/videos/fetchVideo`,

      //   //     {
      //   //       method: 'POST', // 또는 'PUT'
      //   //       headers: {
      //   //         'Content-Type': 'application/json',
      //   //       },
      //   //       body: JSON.stringify({ url }),
      //   //     }
      //   //   );
      //   //   console.log('Player fetch data: ', data.json());

      //   //   setData(data.json());
      //   // } catch (error) {
      //   //   console.error('Player fetche video error: ', error);
      //   // }
      // };
      fetchVideo(url);
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
      setVideoId(trailer.key);
    }
  }, [trailer]);

  useEffect(() => {
    const startPlayer = async () => {
      if (videoId) {
        //ready to put YTPlayer
        startYTPlayer(videoId, playerId, { ...option, playlist: videoId });
      }
    };

    startPlayer();
  }, [videoId]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div id={playerId}>
        {ytpStatus == 'error' ? (
          <h2>{ytpError}</h2>
        ) : (
          ytpStatus !== 'ready' && <h2>Loaidng...</h2>
        )}
      </div>
    </div>
  );
};

export default Player;
