import { useRouter } from 'next/router';
import Banner from '../../components/contents/Banner';
import ThumbnailList from '../../components/contents/ThumbnailList';
import { classNames } from '../../utils/utils';

const ContentLayout = ({ videos, bgIndex }) => {
  const router = useRouter();
  const { path: menuId } = router.query;
  console.log('ContentLayout:: menuId: ', menuId);

  if (!videos || videos.size <= 0) {
    return <div>No data</div>;
  }

  // console.log('videos:', videos);
  const [firstList] = videos.values();
  // console.log(firstList);
  const bgInfo = firstList[bgIndex];
  // console.log('ContentLayout: bgInfo: ', bgInfo);

  return (
    <div
      className={classNames(
        'content-container w-full flex flex-col justify-center',
        'overflow-hidden',
        ' z-0'
      )}
    >
      {bgInfo && (
        // {/*  bannerIdx'th object in videoList */}
        <Banner video={bgInfo} />
      )}
      <div className="content-body w-full min-h-[vh] ">
        <div className="relative flex flex-col w-full max-w-full min-h-full">
          {[...videos].map((lists) => (
            <div
              key={lists[0]}
              className="
              flex flex-col mb-1"
            >
              {/* {lists[0]} */}
              {lists[1].length > 0 && (
                <div
                  className=" relative w-full flex flex-col justify-center
                mb-[2%] min-h-full"
                >
                  <h2
                    className="z-[16] w-full ml-[var(--default-left-padding)]
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
        <div className="h-[20rem]"></div>
      </div>
    </div>
  );
};
export default ContentLayout;
