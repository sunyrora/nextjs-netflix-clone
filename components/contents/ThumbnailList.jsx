import { useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils/utils';
import Thumbnail from './Thumbnail';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import useScrollX from './useScroll';

const ThumbnailList = ({ videoList }) => {
  const [hover, setHover] = useState(false);
  // const [posLeft, setPosLeft] = useState(0);
  const thumbnailsRef = useRef(null);
  const [scrollRight, scrollLeft] = useScrollX();

  const scrollOffset = 900;
  const thumbsTopOffset = 47.5;

  const handleLeftButton = (e) => {
    // console.log('Left button thumbnailsRef!: ', thumbnailsRef);
    // setPosLeft((prev) => Math.round(prev + 900));

    if (scrollLeft) scrollLeft(thumbnailsRef, scrollOffset);
  };

  const handleRightButton = (e) => {
    // console.log('right button click');
    // console.log('top: ??? ', thumbnailsRef?.current?.offsetTop)
    // console.log('left: ??? ', thumbnailsRef?.current?.offsetLeft)
    // console.log('right: ??? ', thumbnailsRef?.current?.offsetRight)
    // console.log('bottom: ??? ', thumbnailsRef?.current?.offsetBottom)
    // console.log('rect: ??? ', thumbnailsRef?.current?.getBoundingClientRect());
    // console.log('thumbnailsRef?.current ', thumbnailsRef?.current);
    // console.log('current styles ', thumbnailsRef?.current?.style);
    // console.log('getComputedStyle ', getComputedStyle(thumbnailsRef?.current));
    // const rect = thumbnailsRef?.current?.getBoundingClientRect();

    // thumbnailsRef.current.backgroundColor = 'white';

    // posLeft < 0 ? '-' : `right-[${posLeft < 0 ? posLeft * -1 : posLeft}px]`

    // setPosLeft(Math.round(posLeft - 90));
    if (scrollRight) scrollRight(thumbnailsRef, scrollOffset);
  };

  return (
    <div className="relative">
      <div
        className={classNames(
          'group',
          'flex justify-between items-center',
          'absolute inset-0 w-[97vw] netflix-md:w-[98vw]',
          'h-full'
        )}
      >
        <ChevronLeftIcon
          className="content-thumb-arrows"
          onClick={handleLeftButton}
        />
        <ChevronRightIcon
          className="content-thumb-arrows"
          onClick={handleRightButton}
        />
      </div>

      <div
        className={classNames('absolute w-full h-full')}
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
            'content-thumb-rows',
            // hover ? 'h-[100vh]' : '',
            // 'border-2 border-purple-900',
            'h-[110vh]'
          )}
        >
          <div
            className={classNames(
              'relative w-full',
              'transition-all duration-500 ease-in-out',
              'mt-1',
              `pl-[var(--default-left-padding)]`
              // 'h-[100vh] border-2'
            )}
            style={{
              top: `${thumbsTopOffset - 0.4}vw`,
            }}
          >
            <div
              className={classNames(
                `relative w-fit h-fit`,
                `flex justify-start items-center space-x-1 xm:space-x-3`
              )}
            >
              {videoList.map((video) =>
                video ? (
                  <Thumbnail key={video.id} video={video} setHover={setHover} />
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-fit">
        <Thumbnail />
      </div>
    </div>
  );
};;

export default ThumbnailList;
