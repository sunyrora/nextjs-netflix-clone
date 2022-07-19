import Banner from '../../components/contents/Banner';

const ContentLayout = ({ videos, bgIndex }) => {
  const firstList = Object.entries(videos)[0][1];
  // console.log(firstList);
  const bgInfo = firstList[bgIndex];
  // console.log('ContentLayout: bgInfo: ', bgInfo);

  return (
    <div className="content-container w-full pt-3 flex flex-col justify-center ">
      {bgInfo && (
        // {/*  bannerIdx'th object in videoList */}
        <Banner video={bgInfo} />
      )}
      <div className="content-body h-[500vh]">
        {firstList?.map((video) => (
          <div key={video.id}>{video.original_title}</div>
        ))}
      </div>
    </div>
  );
};
export default ContentLayout;
