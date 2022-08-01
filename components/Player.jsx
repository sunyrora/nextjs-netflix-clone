import { useEffect } from "react";
import { classNames } from "../utils/utils";
import usePlayer from "./hooks/usePlayer";


export const playerInitialOption = {
  accelerometer: 1,
  autoplay: 1,
  gyroscope: 1,
  controls: 0,
  loop: 0,
  autohide: 1, // Hide video controls when playing
  // enablejsapi: true,
  // playlist: 'your-single-video-ID',
};
const Player = ({videos}) => {

  const [refPlayer, startPlayer, player, playerStatus, playState, error] = usePlayer({videos, option:playerInitialOption});

  useEffect(() => {
    if(!videos?.length) return;

    startPlayer && startPlayer();

  }, []);

  
  return  (
      <div
        className={classNames(
          `w-full h-full flex flex-col justify-center items-center`,
        )}
      >
        {
          !videos?.length ? <h2>No video data</h2> :
          <div ref={refPlayer}></div>
        }
      </div>
      
    );
};

export default Player;