import { TMDB_IMG_BASE_URL } from '../../utils/movieRequests';
import { randomNumber } from '../../utils/utils';

import { useRouter } from 'next/router';
import ContentLayout from '../../screens/contents/ContentLayout';
import menus from '../../components/header/menus';
import { fetchVideos } from '../api/videos/fetchVideos';

const ContentIndexPage = ({ videos, bgIndex }) => {
  if (!videos || Object.keys(videos).length <= 0) return <div>No data</div>;

  const router = useRouter();
  const { path } = router.query;
  // console.log('ContentPage:: path: ', path);

  // console.log('ContentPage:: router.query: ', router.query);
  // console.log('ContentPage:: props: ', props);

  const videosMap = new Map(Object.entries(videos));
  return <ContentLayout videos={videosMap} bgIndex={bgIndex} />;
};

if (process.env.NODE_ENV !== 'development') 
ContentIndexPage.auth = true;
export default ContentIndexPage;

export const getServerSideProps = async ({ query }) => {
  // const { menuId } = query;
  // console.log('contents query menuId: ', query, menuId);

  const { path } = query;

  let menuId = Array.isArray(path) ? path[0] : path;

  if (!menuId) {
    const [firstMenu] = menus.keys();
    menuId = firstMenu;
  }
  // console.log('******************************** menuId: ', menuId);
  const pageInfo = menuId ? menus.get(menuId) : 'home';

  if (!pageInfo) {
    return {
      redirect: {
        destination: '/404',
        permanant: false,
      },
    };
  }

  let randomNum = randomNumber(0, 5);
  let fallbackImg = `/images/bg-home-${randomNum}.webp`;
  let bgImg = fallbackImg;

  // console.log('pageInfo: ', pageInfo);
  const fetchRes = await fetchVideos(pageInfo.fetchUrls);
  /** fetchRes = {
   * 'Netflix Originals': [{}, {}...], 
   * 'Romance Movies': [{}, {}..],
   * ...
   * }
   } */
  if (!fetchRes || Object.values(fetchRes).length <= 0) {
    return {
      props: {
        bgImg,
        videos: {},
      },
    };
  }

  // console.log('contents server side: fetchRes: ', fetchRes);

  const [firstSection] = Object.values(fetchRes);
  // console.log('################ firstSection: ', firstSection);
  if (firstSection) {
    randomNum = randomNumber(0, firstSection?.length);
    const pickedMovie = firstSection[randomNum];
    bgImg = `${TMDB_IMG_BASE_URL}/original${
      pickedMovie?.backdrop_path ?? pickedMovie?.poster_path
    }`;
  }
  console.log('bgImg: ', bgImg);

  const title = menus.get(menuId).name;
  menus.setSelected(menuId);

  return {
    props: {
      title,
      bgImg,
      bgIndex: randomNum,
      videos: fetchRes,
    },
  };
};

