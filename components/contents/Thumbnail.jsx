import { Transition } from '@headlessui/react';
import Image from 'next/future/image';
import { useState } from 'react';
import { TMDB_IMG_BASE_URL } from '../../utils/movieRequests';
import { classNames } from '../../utils/utils';

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="5%" />
      <stop stop-color="#222" offset="60%" />
      <stop stop-color="#333" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="5s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const ThumbImage = ({ video = null }) => {
  const blurUrl = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`;
  const srcUrl =
    video || video?.poster_path
      ? `${TMDB_IMG_BASE_URL}/w500/${
          video?.backdrop_path ?? video?.poster_path
        }`
      : blurUrl;

  return (
    <div className="relative">
      <Image src={srcUrl} blurDataURL={blurUrl} width={2000} height={1200} />
    </div>
  );
};

  export const Thumbnail = ({ video, ...props }) => {
    const [hover, setHover] = useState(false);
    const { setHover: setWrapperHover } = props;
    return (
      <div
        className={classNames(
          `relative ,
          w-[29.5vw] netflix-md:w-[22.45vw] netflix-lg:w-[17.75vw]`,
          `hover:cursor-pointer`,
          `shadow-sm shadow-bggray-100/60`,
          hover ? 'z-[25]' : 'z-[10]'
        )}
        onMouseOver={() => {
          setHover(true);
          setWrapperHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
          setWrapperHover(false);
        }}
      >
        {/* <div className="relative"> */}
        <Transition
          appear={true}
          show={hover}
          enter="transition duration-500 ease-out"
          enterFrom="transform scale-100 opacity-80"
          enterTo="transform scale-150 opacity-100"
          leave="transition duration-500 ease-out"
          leaveFrom="transform scale-150 opacity-100"
          leaveTo="transform scale-100 opacity-0"
          as="div"
          className={classNames(hover ? 'absolute z-[30]' : 'hidden')}
          // className={classNames(
          //   'absolute',
          //   hover ? 'z-[23]' : 'z-[15]'
          //   // `after:relative after:z-0 after:w-fit after:h-fit`
          // )}
        >
          <div className="flex flex-col bg-bggray-100 shadow-sm shadow-black/80 ">
            <ThumbImage video={video} />
            <div className={classNames(`flex flex-col space-y-3 mb-3`)}>
              <div className="flex px-3 mt-3 justify-between items-center flex-wrap ">
                <div className="flex space-x-1 original-md:space-x-2">
                  <div className="thumb-controller-button-outline-container bg-white ">
                    <svg
                      width={24}
                      height={24}
                      fill="none"
                      className="thumb-controller-button text-black bg-white rounded-full"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                      />
                    </svg>
                  </div>
                  <div className="thumb-controller-button-outline-container ">
                    <svg
                      width={24}
                      height={24}
                      fill="none"
                      className="thumb-controller-button"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M8.68239 19.7312L23.6824 5.73115L22.3178 4.26904L8.02404 17.6098L2.70718 12.293L1.29297 13.7072L7.29297 19.7072C7.67401 20.0882 8.28845 20.0988 8.68239 19.7312Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="thumb-controller-button-outline-container ">
                    <svg
                      width={24}
                      height={24}
                      fill="none"
                      className="thumb-controller-button"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="thumb-controller-button-outline-container ">
                    <svg
                      width={24}
                      height={24}
                      fill="none"
                      aria-label="close"
                      className="thumb-controller-button"
                      data-uia="previewModal-closebtn"
                      role="button"
                      tabIndex={0}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <div className="thumb-controller-button-outline-container ">
                    <svg
                      width={24}
                      height={24}
                      fill="none"
                      className="thumb-controller-button"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="px-3 flex justify-start items-center text-[.65rem] align-middle space-x-1">
                <span className="align-middle text-[#46d369] font-bold">
                  New
                </span>
                <span className="border align-middle border-white/40 px-1">
                  13+
                </span>

                <span className="whitespace-nowrap align-middle p-0 m-0 ">
                  16 Episodes
                </span>
                <span
                  className="border text-[.2rem] scale-[.7] align-middle
                   border-white/40 rounded-sm
                    p-0 px-1 m-0"
                >
                  HD
                </span>
              </div>

              <div className="px-3  flex justify-start text-[.75vw]">
                <span>
                  {/* video.genre_ids... */}
                  Charming Romantic Dramedy
                </span>
              </div>
            </div>
          </div>
        </Transition>

        <div
          className={classNames(
            'relative',
            // '-z-1 transition-all duration-100 ease-in-out'
            // `hover:scale-[1.7]`,
            // `transition-opacity`,
            `-z-[10]`,
            hover ? 'invisible' : 'visible'
          )}
        >
          <ThumbImage video={video} />
        </div>
        {/* </div> */}
      </div>
    );
  };
export default Thumbnail;
