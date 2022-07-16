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
} from '../utils/movieRequests';

const MainPage = ({ movies }) => {
  return <MainScreen movies={movies} />;
};

if (process.env.NODE_ENV !== 'development') MainPage.auth = true;

// MainPage.auth = true;
export default MainPage;

export const getServerSideProps = async () => {
  // your fetch function here

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

  //   console.log('netflixOriginals: ', netflixOriginals.results.slice(0, 3));

  return {
    props: {
      title: 'Home',
      bgImg: '/images/bg-home.webp',
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
