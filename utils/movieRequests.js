const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMG_BASE_URL = 'https://image.tmdb.org/t/p';

export const FETCH_TRENDING = `${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US`;
export const FETCH_NETFLIX_ORIGINALS = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_networks=213`;
export const FETCH_TOPRATED = `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`;
export const FETCH_ACTIONMOVIES = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=28`;
export const FETCH_COMEDYMOVIES = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=35`;
export const FETCH_HORRORMOVIES = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=27`;
export const FETCH_ROMANCEMOVIES = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=10749`;
export const FETCH_DOCUMENTARIES = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=99`;
