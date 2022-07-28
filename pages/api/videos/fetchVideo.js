const fetchCallback = (res) => res.json();

export const fetchVideo = async (url) => {
  try {
    const video = await fetch(url).then(fetchCallback);

    return video.results;
  } catch (error) {
    console.error(`fetch video error. url:${url}::`, error);
  }
};

export default async function (req, res) {
  try {
    const { url } = req.body;
    console.log('fetch video requste url: ', url);
    const data = await fetchVideo(url);

    res.status(201).json(data);
  } catch (error) {
    console.error('fetch videos error: ', error);
  }
}
