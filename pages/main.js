import MainScreen from '../screens/MainScreen';
import {
  FETCH_ACTIONMOVIES,
  FETCH_COMEDYMOVIES,
  FETCH_DOCUMENTARIES,
  FETCH_HORRORMOVIES,
  FETCH_NETFLIX_ORIGINALS,
  FETCH_ROMANCEMOVIES,
  FETCH_TOPRATED,
  FETCH_TRENDING,
  TMDB_IMG_BASE_URL,
} from '../utils/movieRequests';
import { randomNumber } from '../utils/utils';

const MainPage = ({ movies, bgIndex }) => {
  return <MainScreen movies={movies} bgIndex={bgIndex} />;
};

if (process.env.NODE_ENV !== 'development') MainPage.auth = true;

// MainPage.auth = true;
export default MainPage;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(FETCH_NETFLIX_ORIGINALS).then((res) => res.json()),
    fetch(FETCH_TRENDING).then((res) => res.json()),
    fetch(FETCH_TOPRATED).then((res) => res.json()),
    fetch(FETCH_ACTIONMOVIES).then((res) => res.json()),
    fetch(FETCH_COMEDYMOVIES).then((res) => res.json()),
    fetch(FETCH_HORRORMOVIES).then((res) => res.json()),
    fetch(FETCH_ROMANCEMOVIES).then((res) => res.json()),
    fetch(FETCH_DOCUMENTARIES).then((res) => res.json()),
  ]);

  let randomNum = randomNumber(0, 5);
  let fallbackImg = `/images/bg-home-${randomNum}.webp`;
  let bgImg = fallbackImg;

  if (netflixOriginals) {
    const resNetflixOriginals = netflixOriginals?.results;

    randomNum = randomNumber(0, resNetflixOriginals?.length);
    const pickedMovie = resNetflixOriginals[randomNum];
    bgImg = `${TMDB_IMG_BASE_URL}/original${
      pickedMovie?.backdrop_path ?? pickedMovie?.poster_path
    }`;
  }
  console.log('bgImg: ', bgImg);

  return {
    props: {
      title: 'Home',
      bgImg,
      bgIndex: randomNum,
      movies: {
        netflixOriginals: netflixOriginals?.results ?? null,
        trendingNow: trendingNow?.results ?? null,
        topRated: topRated?.results ?? null,
        actionMovies: actionMovies?.results ?? null,
        comedyMovies: comedyMovies?.results ?? null,
        horrorMovies: horrorMovies?.results ?? null,
        romanceMovies: romanceMovies?.results ?? null,
        documentaries: documentaries?.results ?? null,
      },
    },
  };
};
