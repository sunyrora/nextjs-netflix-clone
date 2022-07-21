import { TMDB_IMG_BASE_URL } from '../../utils/movieRequests';
import { randomNumber } from '../../utils/utils';
import { fetchHomeVideos } from '../api/vodeos/fetchVideos';

import { useRouter } from 'next/router';
import ContentLayout from '../../screens/contents/ContentLayout';
import menus from '../../components/header/menus';

const ContentIndexPage = ({ videos, bgIndex }) => {
  const router = useRouter();
  const { path } = router.query;

  // const { menuId } = props;
  // console.log('ContentPage:: menuId: ', menuId);
  console.log('ContentPage:: router.query: ', router.query);
  // console.log('ContentPage:: props: ', props);

  const videosMap = new Map(Object.entries(videos));
  return <ContentLayout videos={videosMap} bgIndex={bgIndex} />;
};

export default ContentIndexPage;

export const getServerSideProps = async ({ query }) => {
  // const { menuId } = query;
  // console.log('contents query menuId: ', query, menuId);

  const { path } = query;

  // console.log('contents query menuId : ', path);

  // const { menuId } = params;
  // const title = menuId;

  let menuId = Array.isArray(path) ? path[0] : path;
  // const menuId = path;

  if (!menuId) {
    const [firstMenu] = menus.keys();
    menuId = firstMenu;
  }
  console.log('******************************** menuId: ', menuId);
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

  const fetchRes = await fetchHomeVideos();

  const videoMap = new Map(Object.entries(fetchRes));
  // console.log('videoMap: ', videoMap);

  // console.log('fetchRes: ', fetchRes);

  // const { netflixOriginals } = fetchRes;
  const netflixOriginals = videoMap.get('Netflix Originals');

  if (netflixOriginals) {
    randomNum = randomNumber(0, netflixOriginals?.length);
    const pickedMovie = netflixOriginals[randomNum];
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
      // menuId,
      bgImg,
      bgIndex: randomNum,
      videos: fetchRes,
    },
  };
};
