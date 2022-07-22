import { useState } from 'react';
import { classNames } from '../../utils/utils';
import Thumbnail from './Thumbnail';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const ThumbnailList = ({ videoList }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative group
                    content-thumb-list-container
                 "
    >
      <div
        className="absolute h-full
                          flex justify-between items-center content-thumb-arrows-container"
      >
        <ChevronLeftIcon className="content-thumb-arrows" />
        <ChevronRightIcon className="content-thumb-arrows" />
      </div>

      {/* // <div */}
      {/* //   className={classNames(
    //     hover ? 'absolute overflow-visible' : 'relative overflow-x-auto',
    //     'w-full'
    //   )}
    // > */}
      <div
        className="relative w-fit
            flex justify-start items-center space-x-1 xm:space-x-3
            mt-1"
      >
        {videoList.map((video) =>
          video ? (
            <Thumbnail key={video.id} video={video} setHover={setHover} />
          ) : null
        )}
      </div>
      {/* // </div> */}
    </div>
  );
};

export default ThumbnailList;

const withScroll = (Component) => (porps) => {};
