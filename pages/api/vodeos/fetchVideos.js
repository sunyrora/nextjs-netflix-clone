import {
  FETCH_ACTIONMOVIES,
  FETCH_COMEDYMOVIES,
  FETCH_DOCUMENTARIES,
  FETCH_HORRORMOVIES,
  FETCH_NETFLIX_ORIGINALS,
  FETCH_ROMANCEMOVIES,
  FETCH_TOPRATED,
  FETCH_TRENDING,
} from '../../../utils/movieRequests';

const fetchCallback = (res) => res.json();

export const fetchHomeVideos = async () => {
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
    fetch(FETCH_NETFLIX_ORIGINALS).then(fetchCallback),
    fetch(FETCH_TRENDING).then(fetchCallback),
    fetch(FETCH_TOPRATED).then(fetchCallback),
    fetch(FETCH_ACTIONMOVIES).then(fetchCallback),
    fetch(FETCH_COMEDYMOVIES).then(fetchCallback),
    fetch(FETCH_HORRORMOVIES).then(fetchCallback),
    fetch(FETCH_ROMANCEMOVIES).then(fetchCallback),
    fetch(FETCH_DOCUMENTARIES).then(fetchCallback),
  ]);

  return {
    netflixOriginals: netflixOriginals.results,
    trendingNow: trendingNow.results,
    topRated: topRated.results,
    actionMovies: actionMovies.results,
    comedyMovies: comedyMovies.results,
    horrorMovies: horrorMovies.results,
    romanceMovies: romanceMovies.results,
    documentaries: documentaries.results,
  };
};

export default async function (req, res) {
  try {
    const data = await fetchHomeVideos();

    res.status(201).json(data);
  } catch (error) {
    console.error('fetch videos error: ', error);
  }

  // res.status(200).json({ name: 'Example' })
}
