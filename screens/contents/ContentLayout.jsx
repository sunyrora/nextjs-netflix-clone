import Banner from '../../components/contents/Banner';

const ContentLayout = ({ videos, bgIndex }) => {
  const firstList = Object.entries(videos)[0][1];
  // console.log(firstList);
  const bgInfo = firstList[bgIndex];
  // console.log('ContentLayout: bgInfo: ', bgInfo);

  return (
    <div className="content-container w-screen pt-3 border border-amber-600 flex flex-col justify-center ">
      {bgInfo && (
        // {/*  bannerIdx'th object in videoList */}
        <Banner video={bgInfo} />
      )}
      <div className="content-body ">
        {firstList?.map((video) => (
          <div key={video.id}>{video.original_title}</div>
        ))}
      </div>
    </div>
  );
};

// const ContentLayout = ({bannerInfo, children}) => {
//   return (
//   <div className=" w-screen flex flex-col justify-center ">
//     { bannerInfo &&
//     // {/*  bannerIdx'th object in videoList */}
//       <Banner video={bannerInfo} />
//     }
//     <div className="relative !w-full bg-bggray-100 flex flex-col justify-center items-center px-content-default md:py-[30px] ">

//     {children}
//     </div>
//     </div>
//     );
// };

export default ContentLayout;
