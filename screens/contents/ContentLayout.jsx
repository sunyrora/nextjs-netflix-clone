import { useRouter } from 'next/router';
import Banner from '../../components/contents/Banner';
import ThumbnailList from '../../components/contents/ThumbnailList';
import { classNames } from '../../utils/utils';

const ContentLayout = ({ videos, bgIndex }) => {
  const router = useRouter();
  const { path: menuId } = router.query;
  // console.log('ContentLayout:: menuId: ', menuId);

  if (!videos || videos.size <= 0) {
    return <div>No data</div>;
  }

  const [firstList] = videos.values();
  const bgInfo = firstList[bgIndex];
  // console.log('ContentLayout: bgInfo: ', bgInfo);

  return (
    <div
      className={classNames(
        'w-full flex flex-col justify-center',
        // `border-2 border-pink-600 bg-pink-600/40`,
        // 'overflow-hidden',
        ' z-10'
      )}
    >
      {bgInfo && (
        // {/*  bannerIdx'th object in videoList */}
        <Banner video={bgInfo} />
      )}

      <div className='relative w-full h-fit'>
        <div className={classNames(
          `absolute -top-[13vw] w-full h-fit`,
          // `border-2 border-pink-600`
        )}>
          <div className="content-body w-full h-fit min-h-[vh]">
            <div className={classNames(
                `relative flex flex-col w-full h-fit max-w-full min-h-full`,
                // `bottom-0`,
                // `border-2 border-pink-600`,
            )}>
              {[...videos].map((lists) => (
                <div
                  key={lists[0]}
                  className="
                  flex flex-col mb-1"
                >
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
      </div>
    </div>
  );
};
export default ContentLayout;
