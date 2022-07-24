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

  const scrollOffset = 900;

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

  // useEffect(() => {
  //   if (thumbnailsRef) {
  //     thumbnailsRef.current.scrollIntoView({ behabior: 'smooth' });
  //     console.log(
  //       'rect: ??? ',
  //       thumbnailsRef?.current?.getBoundingClientRect()
  //     );
  //   }
  // }, []);

  useEffect(() => {
    classNameSet.add(thumbListCN);
  }, [thumbListCN]);

  useEffect(() => {
    // if (thumbnailsRef) {
    //   thumbnailsRef.current.style.transform = `translateX(${posLeft}px)`;
    //   // thumbnailsRef.current.style.zIndex = `10`;
    // }
    // setThumbListCN(
    //   `${posLeft < 0 ? '-' : ''}left-[${
    //     posLeft < 0 ? posLeft * -1 : posLeft
    //   }px]`
    // );
    // classNameSet.delete(thumbListCN);
  }, [posLeft]);

  const handleLeftButton = (e) => {
    // console.log('Left button click!');
    setPosLeft((prev) => Math.round(prev + 900));

    if (thumbnailsRef) {
      console.log(
        'thumbnailsRef.current.scrollLeft: ',
        thumbnailsRef.current.scrollLeft
      );
      thumbnailsRef.current.scrollLeft =
        thumbnailsRef.current.scrollLeft - scrollOffset;
      console.log(
        'after thumbnailsRef.current.scrollLeft: ',
        thumbnailsRef.current.scrollLeft
      );
    }
  };

  const handleRightButton = (e) => {
    // console.log('right button click');
    // console.log('top: ??? ', thumbnailsRef?.current?.offsetTop)
    // console.log('left: ??? ', thumbnailsRef?.current?.offsetLeft)
    // console.log('right: ??? ', thumbnailsRef?.current?.offsetRight)
    // console.log('bottom: ??? ', thumbnailsRef?.current?.offsetBottom)
    // console.log('rect: ??? ', thumbnailsRef?.current?.getBoundingClientRect());
    console.log('thumbnailsRef?.current ', thumbnailsRef?.current);
    // console.log('current styles ', thumbnailsRef?.current?.style);
    // console.log('getComputedStyle ', getComputedStyle(thumbnailsRef?.current));
    // const rect = thumbnailsRef?.current?.getBoundingClientRect();

    // thumbnailsRef.current.backgroundColor = 'white';

    // posLeft < 0 ? '-' : `right-[${posLeft < 0 ? posLeft * -1 : posLeft}px]`

    setPosLeft(Math.round(posLeft - 90));

    if (thumbnailsRef) {
      console.log(
        'thumbnailsRef.current.scrollLeft: ',
        thumbnailsRef.current.scrollLeft
      );
      thumbnailsRef.current.scrollLeft =
        thumbnailsRef.current.scrollLeft + scrollOffset;
      console.log(
        'after thumbnailsRef.current.scrollLeft: ',
        thumbnailsRef.current.scrollLeft
      );
    }
  };

  return (
    <div
      className="relative group content-thumb-list-container 
     overflow-visible"
    >
      <div className="relative w-full">
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
          className={classNames(
            'transition-all duration-500 ease-in-out',
            'mt-1',
            'w-fit',
            `pl-[var(--default-left-padding)]`
            // 'overflow-visible scroll-smooth',
          )}
          // style={{
          //   transform: `translateX(${posLeft}px) rotate(0.0rad)`,
          //   position: 'relative',
          // }}
        >
          {/* <div
       className={classNames(
        // hover ? 'absolute overflow-visible' : 'relative overflow-x-auto',
        'w-full'
      )}> */}
          {/* <div className="relative"> */}
          <div
            className={classNames(
              `relative w-fit h-fit`,
              `flex justify-start items-center space-x-1 xm:space-x-3`
              // 'border-2 p-1 border-red-800'
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

// const ThumbnailList = ({ videoList }) => {
//   const [hover, setHover] = useState(false);
//   const [posLeft, setPosLeft] = useState(0);
//   const [thumbListCN, setThumbListCN] = useState('');
//   const thumbnailsRef = useRef(null);

//   const scrollOffset = 900;

//   const classNameSet = new Set([
//     `relative w-fit`,
//     `flex justify-start items-center space-x-1 xm:space-x-3`,
//     `mt-1`,
//     `transition-all duration-500 ease-in-out`,
//   ]);

//   const generateStyle = () => {
//     return classNames(
//       `relative w-fit`,
//       `flex justify-start items-center space-x-1 xm:space-x-3`,
//       `mt-1`,
//       `transition-all duration-500 ease-in-out`,
//       thumbListCN
//     );
//   };

//   // useEffect(() => {
//   //   if (thumbnailsRef) {
//   //     thumbnailsRef.current.scrollIntoView({ behabior: 'smooth' });
//   //     console.log(
//   //       'rect: ??? ',
//   //       thumbnailsRef?.current?.getBoundingClientRect()
//   //     );
//   //   }
//   // }, []);

//   useEffect(() => {
//     classNameSet.add(thumbListCN);
//   }, [thumbListCN]);

//   useEffect(() => {
//     // if (thumbnailsRef) {
//     //   thumbnailsRef.current.style.transform = `translateX(${posLeft}px)`;
//     //   // thumbnailsRef.current.style.zIndex = `10`;
//     // }
//     // setThumbListCN(
//     //   `${posLeft < 0 ? '-' : ''}left-[${
//     //     posLeft < 0 ? posLeft * -1 : posLeft
//     //   }px]`
//     // );
//     // classNameSet.delete(thumbListCN);
//   }, [posLeft]);

//   const handleLeftButton = (e) => {
//     // console.log('Left button click!');
//     setPosLeft((prev) => Math.round(prev + 900));

//     if (thumbnailsRef) {
//       console.log(
//         'thumbnailsRef.current.scrollLeft: ',
//         thumbnailsRef.current.scrollLeft
//       );
//       thumbnailsRef.current.scrollLeft =
//         thumbnailsRef.current.scrollLeft - scrollOffset;
//       console.log(
//         'after thumbnailsRef.current.scrollLeft: ',
//         thumbnailsRef.current.scrollLeft
//       );
//     }
//   };

//   const handleRightButton = (e) => {
//     // console.log('right button click');
//     // console.log('top: ??? ', thumbnailsRef?.current?.offsetTop)
//     // console.log('left: ??? ', thumbnailsRef?.current?.offsetLeft)
//     // console.log('right: ??? ', thumbnailsRef?.current?.offsetRight)
//     // console.log('bottom: ??? ', thumbnailsRef?.current?.offsetBottom)
//     // console.log('rect: ??? ', thumbnailsRef?.current?.getBoundingClientRect());
//     console.log('thumbnailsRef?.current ', thumbnailsRef?.current);
//     // console.log('current styles ', thumbnailsRef?.current?.style);
//     // console.log('getComputedStyle ', getComputedStyle(thumbnailsRef?.current));
//     // const rect = thumbnailsRef?.current?.getBoundingClientRect();

//     // thumbnailsRef.current.backgroundColor = 'white';

//     // posLeft < 0 ? '-' : `right-[${posLeft < 0 ? posLeft * -1 : posLeft}px]`

//     setPosLeft(Math.round(posLeft - 90));

//     if (thumbnailsRef) {
//       console.log(
//         'thumbnailsRef.current.scrollLeft: ',
//         thumbnailsRef.current.scrollLeft
//       );
//       thumbnailsRef.current.scrollLeft =
//         thumbnailsRef.current.scrollLeft + scrollOffset;
//       console.log(
//         'after thumbnailsRef.current.scrollLeft: ',
//         thumbnailsRef.current.scrollLeft
//       );
//     }
//   };

//   return (
//     <div
//       className="relative group content-thumb-list-container 
//      overflow-visible"
//     >
//       <div
//         className="absolute inset-0 w-full h-full overflow-hidden 
//         z-0"
//       >
//         {/* <div className="relative w-full h-full flex items-center border-2 border-green-800"> */}
//         <div className="relative w-full h-full">
//           <div className="content-thumb-arrows-container">
//             <ChevronLeftIcon
//               className="content-thumb-arrows"
//               onClick={handleLeftButton}
//             />
//             <ChevronRightIcon
//               className="content-thumb-arrows"
//               onClick={handleRightButton}
//             />
//           </div>

//           <div
//             ref={thumbnailsRef}
//             className={classNames(
//               'transition-all duration-500 ease-in-out',
//               'mt-1',
//               'w-fit h-full',
//               `pl-[var(--default-left-padding)]`
//               // 'overflow-visible scroll-smooth',
//               // 'border-2 border-green-800'
//             )}
//             // style={{
//             //   transform: `translateX(${posLeft}px) rotate(0.0rad)`,
//             //   position: 'relative',
//             // }}
//           >
//             {/* <div
//        className={classNames(
//         // hover ? 'absolute overflow-visible' : 'relative overflow-x-auto',
//         'w-full'
//       )}> */}
//             {/* <div className="relative"> */}
//             <div
//               className={classNames(
//                 `relative w-fit h-full`,
//                 `flex justify-start items-center space-x-1 xm:space-x-3`
//                 // 'transition-all duration-500 ease-in-out',
//                 // `mt-1`
//               )}
//             >
//               {videoList.map((video) =>
//                 video ? (
//                   <Thumbnail key={video.id} video={video} setHover={setHover} />
//                 ) : null
//               )}
//             </div>
//             {/* </div> */}
//           </div>
//         </div>
//         {/* </div> */}
//       </div>
//       <div className="relrative"></div>
//     </div>
//   );
// };

// export default ThumbnailList;

