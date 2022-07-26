import { useEffect, useState } from 'react';
import useFullScreen from '../../components/hooks/useFullScreen';
import { YOUTUBE_VIDEO_WATCH_URL } from '../../utils/movieRequests';

const Player = ({ videos }) => {
  console.log('Player: videos: ', videos);
  const [teaser, setTeaser] = useState();
  const [playUrl, setPlayUrl] = useState('');

  const [setElementId, setHotKey] = useFullScreen();

  useEffect(() => {
    setElementId('video');
    setHotKey('Enter');
  }, []);

  useEffect(() => {
    setTeaser(videos.find((video) => video.type === 'Teaser'));
  }, [videos]);

  useEffect(() => {
    setPlayUrl(`${YOUTUBE_VIDEO_WATCH_URL}${teaser?.key}?&autoplay=1`);
  }, [teaser]);

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <iframe
        id="video"
        className="w-full h-full"
        src={playUrl}
        // width="560"
        // height="315"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default Player;
