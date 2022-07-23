/** @format */

import { useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils/utils';
import Thumbnail from './Thumbnail';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const ThumbnailList = ({ videoList }) => {
  const [hover, setHover] = useState(false);
  const [posLeft, setPosLeft] = useState(0);
  const [thumbListCN, setThumbListCN] = useState('');
  const thumbnailsRef = useRef(null);

  const classNameSet = new Set([
    `relative w-fit`,
    `flex justify-start items-center space-x-1 xm:space-x-3`,
    `mt-1`,
    `transition-all duration-500 ease-in-out`,
  ]);

  const generateStyle = () => {
    return classNames(
      `relative w-fit`,
      `flex justify-start items-center space-x-1 xm:space-x-3`,
      `mt-1`,
      `transition-all duration-500 ease-in-out`,
      thumbListCN
    );
  };

  useEffect(() => {
    classNameSet.add(thumbListCN);
  }, [thumbListCN]);

  useEffect(() => {
    // if (thumbnailsRef) {
    //   thumbnailsRef.current.style.transform = `translateX(${posLeft}px)`;
    //   // thumbnailsRef.current.style.zIndex = `10`;
    // }

    setThumbListCN(
      `${posLeft < 0 ? '-' : ''}left-[${
        posLeft < 0 ? posLeft * -1 : posLeft
      }px]`
    );

    classNameSet.delete(thumbListCN);
  }, [posLeft]);

  const handleLeftButton = (e) => {
    // console.log('Left button click!');
    setPosLeft((prev) => Math.round(prev + 900));
  };

  const handleRightButton = (e) => {
    // console.log('right button click');
    // console.log('top: ??? ', thumbnailsRef?.current?.offsetTop)
    // console.log('left: ??? ', thumbnailsRef?.current?.offsetLeft)
    // console.log('right: ??? ', thumbnailsRef?.current?.offsetRight)
    // console.log('bottom: ??? ', thumbnailsRef?.current?.offsetBottom)
    // console.log('rect: ??? ', thumbnailsRef?.current?.getBoundingClientRect());
    console.log('current styles ', thumbnailsRef?.current?.style);
    console.log('getComputedStyle ', getComputedStyle(thumbnailsRef?.current));
    // const rect = thumbnailsRef?.current?.getBoundingClientRect();

    // thumbnailsRef.current.backgroundColor = 'white';

    // posLeft < 0 ? '-' : `right-[${posLeft < 0 ? posLeft * -1 : posLeft}px]`

    setPosLeft(Math.round(posLeft - 900));
  };

  return (
    <div className="relative group  content-thumb-list-container">
      <div className="content-thumb-arrows-container">
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
        ref={thumbnailsRef}
        className="transition-all duration-500 ease-in-out mt-1
        pl-[var(--default-left-padding)]
        "
        style={{
          transform: `translateX(${posLeft}px) rotate(0.0rad)`,
          position: 'relative',
        }}
      >
        {/* <div
       className={classNames(
        // hover ? 'absolute overflow-visible' : 'relative overflow-x-auto',
        'w-full'
      )}> */}
        <div className="relative">
          <div
            className={classNames(
              `relative w-fit`,
              `flex justify-start items-center space-x-1 xm:space-x-3`
              // 'transition-all duration-500 ease-in-out',
              // `mt-1`
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
  );
};

export default ThumbnailList;
