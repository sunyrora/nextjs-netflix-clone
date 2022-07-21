import { Transition } from '@headlessui/react';
import Image from 'next/future/image';
import { Fragment, useState } from 'react';
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

const Thumbnail = ({ video }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className=" relative
        w-[29.5vw] netflix-md:w-[22.45vw] netflix-lg:w-[17.75vw]
        hover:cursor-pointer
      "
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <Transition
        appear={false}
        show={hover}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-100 opacity-95"
        enterTo="transform scale-150 opacity-100"
        leave="transition duration-300 ease-out"
        leaveFrom="transform scale-150 opacity-100"
        leaveTo="transform scale-100 opacity-100"
        as="div"
        className={classNames('absolute', hover && 'z-20')}
      >
        <div className="w-full ">
          <ThumbImage video={video} />
        </div>
      </Transition>

      <div
        className={classNames(
          '-z-1 transition-all duration-100 ease-in-out',
          hover ? 'invisible' : 'visible'
        )}
      >
        <ThumbImage video={video} />
      </div>
    </div>
  );
};
export default Thumbnail;
