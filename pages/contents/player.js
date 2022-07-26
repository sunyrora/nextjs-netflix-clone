import React from 'react';
import PropTypes from 'prop-types';
import Player from '../../screens/contents/Player';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../../utils/movieRequests';
import { fetchVideo } from '../api/videos/fetchVideos';

const playerPage = ({ videos }) => {
  return <Player videos={videos} />;
};

if (process.env.NODE_ENV !== 'development') playerPage.auth = true;

export default playerPage;

export const getServerSideProps = async ({ query }) => {
  const { id, media_type } = query;

  console.log('movie id, media_type: ', id, media_type);

  //http://api.themoviedb.org/3/movie/{movie_id}/videos?{api_key}&language=en-US

  const url = `${TMDB_BASE_URL}/${media_type}/${id}/videos?api_key=${TMDB_API_KEY}`;

  const data = await fetchVideo(url);

  console.log('video fetch data: ', data);

  https: return {
    props: {
      showHeader: false,
      videos: data,
    },
  };
};
