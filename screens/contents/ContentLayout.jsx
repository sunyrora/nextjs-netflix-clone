import Banner from '../../components/contents/Banner';
import { TMDB_IMG_BASE_URL } from '../../utils/movieRequests';
import Image from 'next/future/image';

const ContentLayout = ({ videos, bgIndex }) => {
  // console.log('videos:', videos);
  const [firstList] = videos.values();
  // console.log(firstList);
  const bgInfo = firstList[bgIndex];
  // console.log('ContentLayout: bgInfo: ', bgInfo);

  return (
    <div className="content-container w-full flex flex-col justify-center ">
      {bgInfo && (
        // {/*  bannerIdx'th object in videoList */}
        <Banner video={bgInfo} />
      )}
      <div className="content-body w-full overflow-x-hidden">
        <div className="flex flex-col">
          {[...videos].map((lists) => (
            <div key={lists[0]} className="flex flex-col mb-1">
              {/* {lists[0]} */}
              {lists[1].length > 0 && (
                <div>
                  <p className="text-[1.5vw]">{lists[0]}</p>
                  <div
                    className="flex justify-start items-center space-x-1 xm:space-x-3
                  mt-1
                   w-full max-w-full "
                  >
                    {lists[1].map(
                      (video) =>
                        video && (
                          <div
                            key={video.id}
                            className="relative
                             w-[29.5vw] netflix-md:w-[22.45vw] netflix-lg:w-[17.75vw]
                             hover:scale-150 hover:z-10
                             "
                          >
                            <Image
                              src={`${TMDB_IMG_BASE_URL}/w500/${
                                video?.backdrop_path ?? video?.poster_path
                              }`}
                              width={2000}
                              height={1200}
                            />
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
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
