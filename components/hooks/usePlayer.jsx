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
  const [ytPlayer, setYTPlayer] = useState(null);
  // const [promiseToCancel, setPromiseToCancel] = useState(null);
  // const [cancelPromiseMap, setCancelPromiseMap] = useState(new Map());
  const uniqueId = useId();
  // let promiseToCancel = null;

  const [startYTPlayer, ytpStatus, ytpError] = useYTPlayer();

  let videoId = '';
  let playerId = '';
  let ytpOption = option;
  let ytpHandlers = handlers;

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

//  const startPlayerPromise =  () => makeCancelablePromise(() => {

//     return new Promise(async (resolve, reject) => {
//       try {
//           if (ytPlayer) {
//             if (ytpStatus === 'error' && ytpError) {
//               console.log('there was a ytp error');
//               setStatus('error', ytpError);
//               return reject(ytpError);
//             }
      
//             console.log('YTPlayer already exist');
//             play();
//             return resolve(ytPlayer);
//           }
      
//           let videoData = [];
//           if (!data) {
//             if (!videos && !url.url) {
//               const message = 'No videos data or invalid fetch url';
//               setStatus('error', message);
//               return reject(new Error(message));
//             }
      
//             if (videos) {
//               setData(videos);
//               videoData = videos;
//               // return resolve('Data setting');
//             }
      
//             if (!videos && url.url) {
//                 const res = await fetchVideo(url);
//                 setData(res);
//                 videoData = res;
//                 // return resolve(res);
              
//             }

//               prepareDataForYTP(videoData);
//           } else {
//             if ((!videoId || !playerId)) {
//               console.log('lets prepareDataForYTP:: videoId: ', videoId, 'playerId: ', playerId);
//               videoData = data;
//               prepareDataForYTP(data);
//               console.log('after prepareDataForYTP:: videoId: ', videoId, 'playerId: ', playerId);
              
//               // return resolve('prepare data');
//             }
//           }
//             setStatus('startYTPlayer loading');
//             if(Object.keys(handlers).length > 0) {
//               ytpHandlers = handlers;
//               ytpHandlers.onReady = playerEventHandlers.onReady(resolve, handlers.onReady);
//             } else {
//               ytpHandlers = playerEventHandlers;
//               ytpHandlers.onReady = playerEventHandlers.onReady(resolve);
//             }
//             console.log('ytpHandlers:::: ', ytpHandlers);
//             //create YTPlayer
//             const ytPlayerPromise = makeCancelablePromise(async() => {
              
//               try {
//                 return await startYTPlayer(
//                       videoId,
//                       playerId,
//                       ytpOption,
//                       ytpHandlers
//                   );
//               } catch (error) {
//                 reject(error);
//               }
//             }
//             , 'ytPlayerPromise');

//               if(!ytPlayerPromise) return reject('YTPlayer start error');
            
//               setPromiseToCancel(ytPlayerPromise);
//               const res = await ytPlayerPromise.promise();
//               console.log('ytPlayerPromise res: ', res);

//             // await startYTPlayer(
//             //   videoId,
//             //   playerId,
//             //   ytpOption,
//             //   ytpHandlers
//             // );

//       } catch (error) {
//         console.error('Player StartPlayer Promise error : ', error);
//         setStatus('error', `startPlayer:: ${error.message}`);
//         return reject(error);;
//       }
          
//       })
//     }, promiseKeys.startPlayerPromise)

  useEffect(() => {

    // cancelPromiseMap.set(promiseKeys.startPlayerPromise, startPlayerPromise());
    // console.log('useEffect cancelPromiseMap? ', cancelPromiseMap);


    if(playOnMount) {
        startPlayer();
    }
    return () => {

    }
  }, []);

  
  // useEffect(() => {
  //   console.log('useEffect:: promiseToCancel: ', promiseToCancel);
  // }, [promiseToCancel]);

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
    console.info('Player status chaged: ', player, ',error message: ', error);
    setPlayerStatus(player);
    setError(error);
  };

  const wrapperHandler = (resolve, handler = null) => (e) => {
    resolve(handler && handler(e))
  }

  const playerEventHandlers = {
    onReady: (event) => {
      setYTPlayer(event.target);
      setStatus('player ready');
      console.log(
        `======usePlyaer's YTPlayer is ready===== event.target`,
        event.target
      );

      return event.target;

      // if(customOnReady) {            
      //   return resolve(customOnReady(event));
      // }

      // // option?.mute ? event?.target?.mute() : event?.target?.unMute();
      // // if (option?.autoplay) event?.target?.playVideo();
      // resolve(event.target);
    },
    onStateChange: (event) => {
      console.log(
        `This is usePlayer's onStateChange ----event.data: `, event.target.videoTitle,
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

  const prepareDataForYTP = (videoData) => {
    if (videoData?.length) {
      setStatus('prepareDataForYTP');

      const length = videoData?.length;
      console.info('Player:: videoData.length: ', length);
      const randomIdx = length > 1 ? randomNumber(0, length - 1) : 0;
      // console.log('random video===== randomIdx : ', randomIdx);
      const randomVideo = videoData[randomIdx];
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
      // startPlayer();
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
          console.log(`********* Player fetchvideo res: ${uniqueId}`, res);
          if (!res || res.length <= 0) {
            throw new Error('No video data');
          }

          setStatus('data fetched');
          resolve(res);
        } catch (error) {
          console.error('Player fetch video error: ', error);
          setStatus('error', error.message);
          reject(error);
        }
      });
    },
    [url]
  );

  // const startPlayerPromise = makeCancelablePromise(() => {
  // setStartPlayerPromise( makeCancelablePromise(() => {

  //   return new Promise(async (resolve, reject) => {
  //     try {
  //         if (ytPlayer) {
  //           if (ytpStatus === 'error' && ytpError) {
  //             console.log('there was a ytp error');
  //             setStatus('error', ytpError);
  //             return reject(ytpError);
  //           }
      
  //           console.log('YTPlayer already exist');
  //           play();
  //           return resolve(ytPlayer);
  //         }
      
  //         if (!data) {
  //           if (!videos && !url.url) {
  //             const message = 'No videos data or invalid fetch url';
  //             setStatus('error', message);
  //             return reject(new Error(message));
  //           }
      
  //           if (videos) {
  //             setData(videos);
  //             return resolve('Data setting');
  //           }
      
  //           if (url.url) {
  //               const res = await fetchVideo(url);
  //               setData(res);
  //               return resolve(res);
  //           }
  //         } else {
  //           if ((!videoId || !playerId)) {
  //             prepareDataForYTP();
  //             return resolve('prepare data');
  //           }
  //         }
  //           setStatus('startYTPlayer loading');
  //           if(Object.keys(ytpHandlers).length > 0) {
  //             ytpHandlers.onReady = playerEventHandlers.onReady(resolve, ytpHandlers.onReady);
  //           } else {
  //             ytpHandlers = playerEventHandlers;
  //             ytpHandlers.onReady = playerEventHandlers.onReady(resolve);
  //           }
  //           console.log('ytpHandlers:::: ', ytpHandlers);
  //           //create YTPlayer
  //           await startYTPlayer(
  //             videoId,
  //             playerId,
  //             ytpOption,
  //             ytpHandlers
  //           );

  //     } catch (error) {
  //           console.error('Player StartPlayer Promise error : ', error);
  //           setStatus('error', `startPlayer:: ${error.message}`);
  //           return reject(error);;
  //     }
        

  //       // console.log('cancelable? ', cancelable);
  //       // cancelPromiseMap.set(promiseKeys.startPlayerPromise, cancelable);
  //       // console.log('cancelPromiseMap? ', cancelPromiseMap);
  //       // return cancelable;  
          
  //     })
  //   }, promiseKeys.startPlayerPromise)
  // );

  // return runPromise

// cancelPromiseMap.set(promiseKeys.startPlayerPromise, startPlayerPromise);
// console.log('cancelPromiseMap? ', cancelPromiseMap);
    

const startPlayerPromise =  () => {

    return new Promise(async (resolve, reject) => {
      try {
          if (ytPlayer) {
            if (ytpStatus === 'error' && ytpError) {
              console.log('there was a ytp error');
              setStatus('error', ytpError);
              return reject(ytpError);
            }
      
            console.log('YTPlayer already exist', ytPlayer);
            play();
            return resolve(ytPlayer);
          }
      
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
              // return resolve('Data setting');
            }
      
            if (!videos && url.url) {
                const res = await fetchVideo(url);
                setData(res);
                videoData = res;
                // return resolve(res);
              
            }

              prepareDataForYTP(videoData);
          } else {
            if ((!videoId || !playerId)) {
              console.log('lets prepareDataForYTP:: videoId: ', videoId, 'playerId: ', playerId);
              videoData = data;
              prepareDataForYTP(data);
              console.log('after prepareDataForYTP:: videoId: ', videoId, 'playerId: ', playerId);
              
              // return resolve('prepare data');
            }
          }
            setStatus('startYTPlayer loading');
            if(Object.keys(handlers).length > 0) {
              ytpHandlers = {...handlers};
              ytpHandlers.onReady = wrapperHandler(resolve, ytpHandlers.onReady);
            } else {
              ytpHandlers = {...playerEventHandlers}
              ytpHandlers.onReady = wrapperHandler(resolve, ytpHandlers.onReady);
            }
            // if(Object.keys(handlers).length > 0) {
            //   ytpHandlers = handlers;
            //   ytpHandlers.onReady = playerEventHandlers.onReady(resolve, handlers.onReady);
            // } else {
            //   ytpHandlers = playerEventHandlers;
            //   ytpHandlers.onReady = playerEventHandlers.onReady(resolve);
            // }
            console.log('ytpHandlers:::: ', ytpHandlers);
            //create YTPlayer
            const ytPlayerPromise = makeCancelablePromise(async() => {
              return await startYTPlayer(
                      videoId,
                      playerId,
                      ytpOption,
                      ytpHandlers
                  );
              }
            , promiseToCancel?.cancel, 'ytPlayerPromise');

              if(!ytPlayerPromise) return reject('YTPlayer start error');
            
              promiseToCancel = ytPlayerPromise;
              // setPromiseToCancel(ytPlayerPromise);
              const res = await ytPlayerPromise.promise();
              console.log('ytPlayerPromise res: ', res);

            // await startYTPlayer(
            //   videoId,
            //   playerId,
            //   ytpOption,
            //   ytpHandlers
            // );

      } catch (error) {
        console.error('Player StartPlayer Promise error : ', error);
        setStatus('error', `startPlayer:: ${error.message}`);
        return reject(error);
      }
          
    });
  }
   



  const startPlayer = async () => {
    try {
      // const startPromise = cancelPromiseMap.get(promiseKeys.startPlayerPromise);
      // if(ytPlayer) return play();
      setStatus('init');
      if (ytPlayer && ytPlayer instanceof YT.Player) return play();

      const startPromise = makeCancelablePromise(startPlayerPromise, null, 'startPlayerPromise');;
      console.log('startPlayer:: startPromise :', startPromise);
      // setPromiseToCancel(startPromise);
      promiseToCancel = startPromise;
      const res = await startPromise.promise();
      
      console.log('startPlayer res: ', res);
      // if(promiseToCancel.hasCanceled_) throw new Error('canceld');

      // option?.mute ? res?.mute() : res?.unMute();
      // option?.autoplay && res?.playVideo();
      
      
      // setPromiseToCancel(null);

      console.log('startPlayer:: promiseToCancel :', promiseToCancel);
    } catch (error) {
      console.error('starPlayer error: ', error);
      console.log('ytPlayer was created? ', ytPlayer);
      if(ytPlayer)
        stop();
      setStatus('error', error);
    }
  }

  // const startPlayer = async () => {
  //   try {
  //     const startPromise = cancelPromiseMap.get(promiseKeys.startPlayerPromise);
  //     console.log('startPlayer:: cancelPromiseMap:', cancelPromiseMap);
  //     console.log('startPlayer:: startPromise :', startPromise);
  //     setPromiseToCancel(startPromise);
  //     const res = await startPromise.promise();
      

  //     console.log('startPlayer res: ', res);
  //     option?.mute ? res?.mute() : res?.unMute();
  //     option?.autoplay && res?.playVideo();
              
  //     console.log('startPlayer:: promiseToCancel :', promiseToCancel);
  //   } catch (error) {
  //     console.error('starPlayer error: ', error);
  //     setStatus('error', error);
  //   }
  // }

  const stopPlayer = () => {
    console.log('stopPlayer cancel promiseToCancel: ', promiseToCancel?.cancel);
    if(promiseToCancel?.cancel) {
      // console.log('cancel promise');
      promiseToCancel.cancel();
      // setPromiseToCancel(null);
      promiseToCancel = null;
    }

    // if(ytPlayer) ytPlayer.stopVideo();
    stop();
  }

  const play = () => {
    if (!ytPlayer || !(ytPlayer instanceof YT.Player)) {
      startPlayer();
      return;
    }

    // if (ytPlayer?.error) {
    //   console.log('There was a ytPlayer error, retry..', ytPlayer?.error);
    //   startPlayer();
    // }

    if(playerStatus === 'error') {
      stop();
    }

    ytPlayer?.playVideo();


    // try {
    //   console.log('play');
    //   if (!data) {
    //     if (!videos && !url.url) throw new Error('no video data');

    //     if (videos) {
    //       setData(videos);
    //       // return;
    //     }

    //     if (!videos && url.url) {
    //       const res = await fetchVideo(url);
    //       setData(res);
    //       prepareDataForYTP(res);
    //       startPlayer();
    //       return;
    //     }
    //   } else {
    //     if (!ytPlayer) {
    //       startPlayer();
    //       return;
    //     }

    //     if (ytPlayer?.error) {
    //       console.log('There was a ytPlayer error, retry..', ytPlayer?.error);
    //       startPlayer();
    //     }

    //     ytPlayer?.playVideo();
    //   }
    // } catch (error) {
    //   setStatus('error', `usePlayer::play- ${error.message}`);
    //   console.log('Player play() error: ', error);
    // }
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
