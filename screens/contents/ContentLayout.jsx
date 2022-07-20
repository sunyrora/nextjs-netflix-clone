import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { list } from 'postcss';
import Banner from '../../components/contents/Banner';
import Thumbnail from '../../components/contents/Thumbnail';

const ContentLayout = ({ videos, bgIndex }) => {
  // console.log('videos:', videos);
  const [firstList] = videos.values();
  // console.log(firstList);
  const bgInfo = firstList[bgIndex];
  // console.log('ContentLayout: bgInfo: ', bgInfo);

  return (
    <div
      className="content-container w-full flex flex-col justify-center
      "
    >
      {bgInfo && (
        // {/*  bannerIdx'th object in videoList */}
        <Banner video={bgInfo} />
      )}
      <div className="content-body w-full ">
        <div className="flex flex-col max-w-[var(--pl-default)]">
          {[...videos].map((lists) => (
            <div
              key={lists[0]}
              className="
              flex flex-col mb-1"
            >
              {/* {lists[0]} */}
              {lists[1].length > 0 && (
                <div className="w-fit mb-[3%]">
                  <h2
                    className="z-[11] w-fit
                      text-[2.5vw] netflix-md:text-[1.5vw] 
                      font-medium text-[#e5e5e5]/70 
                      cursor-pointer transition-all duration-50 hover:white hover:scale-y-110 hover:font-semibold"
                  >
                    {lists[0]}
                  </h2>
                  <div
                    className="relative group h-fit
                    content-thumb-arrows-container 
                    
                 "
                  >
                    <div
                      className="absolute h-full
                          flex justify-between items-center content-thumb-arrows-container"
                    >
                      <ChevronLeftIcon className="content-thumb-arrows" />
                      <ChevronRightIcon className="content-thumb-arrows" />
                    </div>

                    <div className="z-[8] h-fit overflow-x-scroll overflow-y-visible">
                      <div
                        className="z-[9] w-fit flex justify-start items-center space-x-1 xm:space-x-3
                      mt-1
                    "
                      >
                        {lists[1].map((video) =>
                          video ? (
                            <Thumbnail key={video.id} video={video} />
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          )
        </div>
      </div>
    </div>
  );
};
// const ContentLayout = ({ videos, bgIndex }) => {
//   const firstList = Object.entries(videos)[0][1];
//   // console.log(firstList);
//   const bgInfo = firstList[bgIndex];
//   // console.log('ContentLayout: bgInfo: ', bgInfo);

//   return (
//     <div className="content-container w-full pt-3 flex flex-col justify-center ">
//       {bgInfo && (
//         // {/*  bannerIdx'th object in videoList */}
//         <Banner video={bgInfo} />
//       )}
//       <div className="content-body h-[500vh]">
//         {firstList?.map((video) => (
//           <div key={video.id}>{video.original_title}</div>
//         ))}
//       </div>
//     </div>
//   );
// };
export default ContentLayout;
