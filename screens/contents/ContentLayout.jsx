// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Banner from '../../components/contents/Banner';
import ThumbnailList from '../../components/contents/ThumbnailList';

const ContentLayout = ({ videos, bgIndex }) => {
  // console.log('videos:', videos);
  const [firstList] = videos.values();
  // console.log(firstList);
  const bgInfo = firstList[bgIndex];
  // console.log('ContentLayout: bgInfo: ', bgInfo);

  return (
    <div
      className="content-container w-full flex flex-col justify-center
      overflow-hidden z-0
      "
    >
      {bgInfo && (
        // {/*  bannerIdx'th object in videoList */}
        <Banner video={bgInfo} />
      )}
      <div className="content-body w-full  ">
        <div className="relative flex flex-col max-w-full ">
          {/* <div className="relative flex flex-col max-w-[var(--max-w-default)] "> */}
          {[...videos].map((lists) => (
            <div
              key={lists[0]}
              className="
              flex flex-col mb-1"
            >
              {/* {lists[0]} */}
              {lists[1].length > 0 && (
                <div className="w-full  mb-[3%]">
                  <h2
                    className="z-[11] w-fit
                      text-[2.5vw] netflix-md:text-[1.5vw] 
                      font-medium text-[#e5e5e5]/70 
                      cursor-pointer transition-all duration-50 hover:white hover:scale-y-110 hover:font-semibold"
                  >
                    {lists[0]}
                  </h2>

                  <ThumbnailList videoList={lists[1]} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ContentLayout;
