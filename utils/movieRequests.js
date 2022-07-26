import menus from '../components/header/menus';

export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const YOUTUBE_VIDEO_WATCH_URL = 'https://www.youtube.com/embed/';

export const fetchUrlsHome = {
  media_type: 'movie',
  urls: {
    'Netflix Originals': `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_networks=213`,
    'Trending Now': `${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US`,
    'Top Rated': `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`,
    'Action Movies': `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=28`,
    Comedies: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=35`,
    'Scary Movies': `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=27`,
    'Romance Movies': `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=10749`,
    Documentaries: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=99`,
  },
};



// export const fetchUrlsHome = {
//   'Netflix Originals': {
//     url: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_networks=213`,
//     ['media_type']: 'movie',
//   },
//   'Trending Now': {
//     url: `${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US`,
//     ['media_type']: '',
//   },
//   'Top Rated': {
//     url: `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`,
//     ['media_type']: 'movie',
//   },
//   'Action Movies': {
//     url: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=28`,
//     ['media_type']: 'movie',
//   },
//   Comedies: {
//     url: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=35`,
//     ['media_type']: 'movie',
//   },
//   'Scary Movies': `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=27`,
//   'Romance Movies': `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=10749`,
//   Documentaries: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=99`,
// };

export const fetchUrlTVShows = {
  media_type: 'tv',
  urls: {
    'Popular on Netflix': `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`,
    'Top Rated': `${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}`,
    'New Releases': `${TMDB_BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}`,
    //   'The Latest': `${TMDB_BASE_URL}/tv/latest?api_key=${TMDB_API_KEY}`,
  },
};
