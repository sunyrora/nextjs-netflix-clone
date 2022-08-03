import { useState } from 'react';
import { classNames } from '../../utils/utils';
import Thumbnail from './Thumbnail';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import useScrollX from './useScroll';

const ThumbnailList = ({ videoList }) => {
  const [hover, setHover] = useState(false);
  const [thumbnailsRef, scrollX, isScrollPosStart, isScrollPosEnd] = useScrollX();

  const thumbsTopOffset = 14;

  const handleLeftButton = (e) => {
    // console.log('Left button thumbnailsRef!: ', thumbnailsRef);
    // setPosLeft((prev) => Math.round(prev + 900));

    if (scrollX) scrollX({ to: 'left' });
  };

  const handleRightButton = (e) => {
    // setPosLeft(Math.round(posLeft - 90));
    if (scrollX) scrollX({ to: 'right' });
  };

  return (
    <div className="relative">
      <div
        className={classNames(
          'group',
          'flex items-center',
          'absolute top-[0.25rem]',
          'w-full',
          'h-full'
          // 'border-2 border-pink-600'
        )}
      >
        <div className={classNames(
          `grow-0 w-fit h-full mr-1.5 flex items-center bg-bggray-100/60 transition-all duration-300 group-hover:bg-bggray-100/95 z-[26]`,
          isScrollPosStart ? 'invisible' : 'visible',
        )}>
          <ChevronLeftIcon
            className={classNames(
              `content-thumb-arrows`,
              // isScrollPosStart ? 'invisible' : 'visible',
            )}
            onClick={handleLeftButton}
          />
        </div>
        <div className="grow"></div>
        <div className={classNames(
          `grow-0 w-fit h-full ml-1.5 flex items-center bg-bggray-100/60 group-hover:bg-bggray-100/95 z-[26]`,
          isScrollPosEnd ? 'invisible' : 'visible'
        )}>
          <ChevronRightIcon
            className={classNames(
              `content-thumb-arrows`,
              // isScrollPosEnd ? 'invisible' : 'visible'
            )}
            onClick={handleRightButton}
          />
        </div>
      </div>

      <div
        className={classNames(
          'absolute w-full h-full'
          // 'border-2 border-green-800'
        )}
        style={{
          top: `-${thumbsTopOffset}vw`,
        }}
      >
        <div
          ref={thumbnailsRef}
          className={classNames(
            'absolute',
            'w-full',
            'overflow-auto scroll-smooth',
            'scroll-px-[var(--default-left-padding)]',
            'content-thumb-rows',
            // hover ? 'h-[100vh]' : '',
            // 'border-2 border-purple-900',
            'h-[110vh]',
            'snap-x'
          )}
          // style={{
          //   top: `${thumbsTopOffset}vw`,
          //   // top: hover ? 0 : `${thumbsTopOffset}vw`,
          // }}
        >
          <div
            className={classNames(
              'relative w-fit flex xm:space-x-3',
              'transition-all duration-500 ease-in-out',
              'mt-1',
              `pl-[var(--default-left-padding)]`
              // 'border-2 border-orange-300'
              // 'h-[100vh] border-2'
            )}
            style={{
              top: `${thumbsTopOffset}vw`,
            }}
          >
            {/* <div className="absolute inset-0 z-[15] w-full h-full border-2  border-pink-800">
              <div className="fixed grow-0 z-[26] w-[var(--default-left-padding)] border-2 border-cyan-400 bg-bggray-100/90"></div>
              <div className="grow"></div>
              <div className="fixed grow-0 z-[26] w-[var(--default-left-padding)] bg-bggray-100/90"></div>
            </div> */}

            <div className="relative -z-20 w-[var(--default-left-padding)]"></div>
            {videoList.map((video) =>
              video ? (
                <Thumbnail key={video.id} video={video} setHover={setHover} />
              ) : null
            )}
            <div className="relative -z-20 w-[var(--default-left-padding)]"></div>
          </div>
        </div>
      </div>
      <div className="relative -z-0">
        <Thumbnail />
      </div>
    </div>
  );
};

export default ThumbnailList;
