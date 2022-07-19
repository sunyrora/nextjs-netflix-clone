import { useRouter } from 'next/router';
import menus from '../../components/header/menus';
import ContentLayout from '../../screens/contents/ContentLayout';
import { TMDB_IMG_BASE_URL } from '../../utils/movieRequests';
import { randomNumber } from '../../utils/utils';
import { fetchHomeVideos } from '../api/vodeos/fetchVideos';

const ContentPage = ({ videos, bgIndex }) => {
  const router = useRouter();
  const { menuId } = router.query;
  console.log('ContentPage:: menuId: ', menuId);

  // return <div>Content Page</div>;
  return <ContentLayout videos={videos} bgIndex={bgIndex} />;
};

export default ContentPage;

export const getServerSideProps = async ({ params }) => {
  const { menuId } = params;
  // const title = menuId;

  const pageInfo = menus.get(menuId);
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

  // console.log('fetchRes: ', fetchRes);

  const { netflixOriginals } = fetchRes;

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
      bgImg,
      bgIndex: randomNum,
      videos: fetchRes,
    },
  };
};
