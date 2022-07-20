import Image from 'next/future/image';
import { TMDB_IMG_BASE_URL } from '../../utils/movieRequests';

const Thumbnail = ({ video }) => {
  return (
    <div
      key={video.id}
      className="relative
                             w-[29.5vw] netflix-md:w-[22.45vw] netflix-lg:w-[17.75vw]
                             hover:scale-150 hover:z-10 hover:cursor-pointer transition-all duration-200 ease-out
                             "
    >
      <Image
        src={`${TMDB_IMG_BASE_URL}/w500/${
          video?.backdrop_path ?? video?.poster_path
        }`}
        width={2000}
        height={1200}
      />
    </div>
  );
};

export default Thumbnail;
