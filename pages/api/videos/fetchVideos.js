const fetchCallback = (res) => res.json();

export const fetchVideo = async (url) => {
  try {
    const video = await fetch(url).then(fetchCallback);

    return video.results;
  } catch (error) {
    console.error(`fetch video error. url:${url}::`, error);
  }
};

export const fetchVideos = async (urls) => {
  try {
    const { media_type } = urls;

    if (!urls.urls || Object.keys(urls.urls).length <= 0) return {};

    const fetchRes = await Promise.all(
      Object.values(urls.urls).map((url) => fetch(url).then(fetchCallback))
    );
    const withMediaType = fetchRes.map((res) => {
      const newResults = res.results.map((video) => {
        if (!video.media_type) video.media_type = media_type;

        return video;
      });

      return { ...res, results: [...newResults] };
    });

    // console.log('fetchRes: ', fetchRes);

    const keys = Object.keys(urls.urls);
    const videos = keys.reduce(
      (acc, key, index) => ({
        ...acc,
        [key]: withMediaType[index].results ?? [],
      }),
      {}
    );

    // console.log('videos: ', videos);

    return videos;
  } catch (error) {
    console.error('fetchVideos error: ', error);
  }
};

// export const fetchHomeVideos = async () => {
//   const [
//     netflixOriginals,
//     trendingNow,
//     topRated,
//     actionMovies,
//     comedyMovies,
//     horrorMovies,
//     romanceMovies,
//     documentaries,
//   ] = await Promise.all([
//     fetch(FETCH_NETFLIX_ORIGINALS).then(fetchCallback),
//     fetch(FETCH_TRENDING).then(fetchCallback),
//     fetch(FETCH_TOPRATED).then(fetchCallback),
//     fetch(FETCH_ACTIONMOVIES).then(fetchCallback),
//     fetch(FETCH_COMEDYMOVIES).then(fetchCallback),
//     fetch(FETCH_HORRORMOVIES).then(fetchCallback),
//     fetch(FETCH_ROMANCEMOVIES).then(fetchCallback),
//     fetch(FETCH_DOCUMENTARIES).then(fetchCallback),
//   ]);

//   const videos = {
//     'Netflix Originals': netflixOriginals.results ?? [],
//     'Trending Now': trendingNow.results ?? [],
//     'Top Rated': topRated.results ?? [],
//     'Action Movies': actionMovies.results ?? [],
//     Comedies: comedyMovies.results ?? [],
//     'Scary Movies': horrorMovies.results ?? [],
//     'Romance Movies': romanceMovies.results ?? [],
//     Documentaries: documentaries.results ?? [],
//   };

//   return videos;
// };

export default async function (req, res) {
  try {
    const { fetchUrls } = req.body;
    const data = await fetchVideos(fetchUrls);

    res.status(201).json(data);
  } catch (error) {
    console.error('fetch videos error: ', error);
  }
}
