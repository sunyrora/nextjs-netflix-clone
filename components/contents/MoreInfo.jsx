import {
  TMDB_API_KEY,
  TMDB_BASE_URL,
  TMDB_IMG_BASE_URL,
} from '../../utils/movieRequests';
import { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import BackgroundImage from '../BackgroundImage';
import { classNames } from '../../utils/utils';
import { useRouter } from 'next/router';
import usePlayer, { PlaystateType } from '../hooks/usePlayer';

const MoreInfo = ({ video, show = true, setShowMoreInfo = null }) => {
    const [showModal, setShowModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);
  const [isMuted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  const [refPlayer, startPlayer, player, playerStatus, playState, error] =
    usePlayer({
      url: {
        url: `${TMDB_BASE_URL}/${video.media_type}/${video.id}/videos?api_key=${TMDB_API_KEY}`,
        lazyFetch: true,
      },
      option: {
        autoplay: 1,
        accelerometer: 0,
        loop: 0,
        controls: 0,
        autohide: 1,
        displaykb: 1,
        fs: 0,
        mute: 1,
      },
      playOnMount: true,
    });

  const router = useRouter();

  const title =
    video?.name ??
    video?.original_name ??
    video?.title ??
    video?.original_title;

  const bgImg = `${TMDB_IMG_BASE_URL}/original${
    video?.backdrop_path ?? video?.poster_path
  }`;

  useEffect(() => {
    setShow(show);

    return () => {
      // refPlayer?.current?.stop();
      // player.destroy();
    };
  }, []);

  useEffect(() => {
    // console.log('MoreInfo show: ', show);
    setShow(show);
  }, [show]);

  useEffect(() => {
    console.log('showModal ', showModal);

    if (showModal) {
      if (!player) startPlayer();
      else player?.playVideo();
    } else {
      player?.stopVideo();
    }
  }, [showModal]);

  useEffect(() => {
    console.log('MoreInfo playState: ', playState);

    if (
      !playState ||
      playState === PlaystateType.UNSTARTED ||
      playState === PlaystateType.ENDED ||
      playState === PlaystateType.CUED ||
      playState === PlaystateType.PAUSED ||
      playState === PlaystateType.BUFFERING ||
      playerStatus === 'error'
    ) {
      setShowPlayer(false);
    } else {
      setShowPlayer(true);

      const dur = player?.getDuration();
      setDuration(isNaN(dur) ? 0 : dur);
    }
  }, [playState, playerStatus]);

  const toggleMute = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.stopPro;
    isMuted ? player?.unMute() : player?.mute();
    setMuted((prev) => !prev);
  };

  const setShow = (value) => {
    if (setShowMoreInfo) {
      // console.log('call back setShowMoreInfo: ', value);
      setShowMoreInfo(value);
    }
    setShowModal(value);
  };

  // if (!showModal) {
  //   return null;
  // }

  return (
    <div
      className={classNames(
        showModal ? 'opacity-100' : 'opacity-0 -z-[10]',
        `transition-all ease-in-out duration-700`,
        // showModal ? 'visible' : 'hidden',
        `absolute inset-0 z-[60] mx-auto mt-5 flex flex-col items-center justify-start `,
        `bg-bggray-100`,
        `w-[98vh] max-w-[98%] min-w-[70vw] xmd:min-w-[850px]`,
        `h-fit`,
        // `mb-80`,
        // `border-2 border-pink-600`,
        `rounded-lg shadow-sm shadow-black/40`
      )}
    >
      {/* reltative container for all modal components  */}
      <div className="relative w-full h-fit z-[59]">
        {/* container for Poster img & player & buttons */}
        <div
          className={classNames(
            `relative w-full h-[50vh] max-h-[350px] netflix-md:max-h-[720px] min-h-[350px] netflix-md:min-h-[480px]`,
            `overflow-hidden`,
            // `border-2`,
            'z-[55]'
          )}
        >
          {/* gradient */}
          <div
            className={classNames(
              `absolute z-[56] bottom-0 w-full h-[25%]`,
              `bg-gradient-to-t from-bggray-100/100 to-white/0`
              // `border-2 border-orange-600`
            )}
          ></div>

          <div
            className={classNames(
              'absolute w-[110%] !h-[110%] transition-all ease-in-out duration-700 z-[20]',
              // `z-[20]`,
              // `border-4 border-x-emerald-500`,
              showPlayer ? 'opacity-0' : 'opacity-100'
              // showPlayer ? 'invisible' : 'visible'
            )}
          >
            <BackgroundImage bgImg={bgImg} />
          </div>

          {/* all buttons */}
          <div
            onClick={() => {
              router.push(
                {
                  pathname: `${process.env.playerPath}`,
                  query: {
                    id: video.id,
                    media_type: video.media_type,
                  },
                },
                '/player'
              );
            }}
            className={classNames(
              `absolute flex flex-col justify-between`,
              `w-full h-full`,
              `px-[7%] netflix-md:px-[4%]`,
              `pb-10 pt-5`,
              `hover:cursor-pointer`,
              // `border-2 border-orange-600`,
              // `bg-blend-multiply`,
              `z-[56]`
            )}
          >
            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setShow(false);
                }}
                className="rounded-full w-fit border-2 border-bggray-100 overflow-hidden "
              >
                <XIcon className="fill-white bg-bggray-100 h-6 w-6" />
              </button>
            </div>
            {/* play... mute buttons */}
            {playerStatus !== 'error' ? (
              <div className="flex justify-between items-center ">
                <div
                  className={classNames(
                    `w-full z-[57] bottom-[50px]`
                    // `border-2 border-blue-500`
                  )}
                >
                  <div className="flex space-x-1.5 x-fit transition-all moreinfo-play-button-container">
                    {/* Play button */}
                    <Link
                      href={{
                        pathname: `${process.env.playerPath}`,
                        query: {
                          id: video.id,
                          media_type: video.media_type,
                        },
                      }}
                      as="/player"
                    >
                      <div className="grow-[1] moreinfo-play-button-child">
                        <div className="flex items-center space-x-1 netflix-md:space-x-0 w-fit">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="content-banner-icon"
                          >
                            <path
                              d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                              fill="black"
                            ></path>
                          </svg>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              console.log('play button click');
                            }}
                            className="content-banner-button w-full text-black"
                          >
                            Play
                          </button>
                        </div>
                      </div>
                    </Link>
                    {/* Plus button */}
                    <div className="moreinfo-button-outline-container ">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          player?.playVideo();
                        }}
                      >
                        <svg
                          width={24}
                          height={24}
                          fill="none"
                          className="moreinfo-button"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M11 2V11H2V13H11V22H13V13H22V11H13V2H11Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    {
                      /* Thumb up button */
                    }
                    <div className="moreinfo-button-outline-container ">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          player?.stopVideo();
                        }}
                      >
                        <svg
                          width={24}
                          height={24}
                          fill="none"
                          className="moreinfo-button"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    
                  </div>
                </div>

                {/* mute/unmute buttons */}
                <div className="moreinfo-button-outline-container ">
                  <button
                    className={classNames(isMuted ? 'visible' : 'hidden')}
                    onClick={toggleMute}
                  >
                    <svg
                      width={24}
                      height={24}
                      fill="none"
                      className="moreinfo-button"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className={classNames(isMuted ? 'hidden' : 'visible')}
                    onClick={toggleMute}
                  >
                    <svg
                      width={24}
                      height={24}
                      fill="none"
                      className="moreinfo-button"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="border p-2  border-bggray-100 bg-white/30 rounded-lg text-bggray-100 text-sm w-fit h-fit">
                No video
              </div>
            )}
          </div>

          <div
            className={classNames(
              `absolute z-[30]`,
              `-top-[25%] -left-[25%]`,
              // `w-full h-full`,
              `w-[150%] h-[150%]`,
              ` transition-all ease-in-out duration-700`,
              // showPlayer ? `visible` : `invisible`,
              showPlayer ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div ref={refPlayer}></div>
          </div>
        </div>
        {/* video info */}
        <div
          className={classNames(
            'absolute',
            `w-full`,
            `px-[7%] netflix-md:px-[4%]`,
            'py-[7%]',
            // 'my-[7%]',
            `bg-bggray-100`,
            // `border-2 border-sky-800`,
            `z-[60]`
          )}
        >
          <div className="flex w-full">
            <div className="flex grow-[3] flex-col gap-y-4">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-green-400">
                  {video?.vote_average * 10}% Match
                </span>
                <span className="font-light">
                  {video?.release_date?.slice(0, 4) ??
                    video?.first_air_date?.slice(0, 4)}
                </span>
                <span className="flex items-center h-4 rounded border border-white/40 text-xs px-1.5">
                  HD
                </span>
              </div>
              <h1 className="font-extrabold text-4xl">{title}</h1>
              <div>{video?.overview}</div>
            </div>
            <div className="flex gap-x-2 grow[2]">
              <span className="text-[#777] ">Genere</span>
              <div className="flex gap-x-1 text-sm text-white white-space-wrap">
                {video?.type ??
                  video?.genre_ids?.map((genre) => (
                    <span key={genre}>{genre}</span>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-10 h-fit">
            <div className="my-3 flex justify-between ">
              <span className="font-bold text-lg">Episodes</span>
              <span className="font-light">{title}</span>
            </div>
            {(() => {
              let rows = [];
              for (let i = 1; i < 11; i++) {
                rows.push(
                  <div
                    key={i}
                    className={classNames(
                      `w-full h-fit nexflix-md:max-h-[140px]`,
                      `px-10 py-8`,
                      `border-b border-[#646464] hover:border hover:bg-[#515151]`,
                      i === 1 ? 'border-t' : '',
                      `flex items-center gap-x-2`
                    )}
                  >
                    <div className="grow-[1] text-center ">{i}</div>
                    <div className="grow-[1] px-2 h-fit">
                      <div className="w-[15vh] max-w-[180px] h-[10vh] max-h-[95px] border border-gray-800 bg-white/50"></div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between grow-[3]">
                        <span className="text-lg font-bold">{title}</span>
                        <div className="gorw-[1]">
                          {Math.round(duration)}min
                        </div>
                      </div>
                      <span className="text-sm font-light line-clamp-2">
                        {video?.overview}
                      </span>
                    </div>
                  </div>
                );
              }

              return rows;
            })()}
          </div>
        </div>
      </div>
    </div>
  )
};

export default MoreInfo;
