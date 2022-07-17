import { PlayIcon } from '@heroicons/react/solid';
import { InformationCircleIcon } from '@heroicons/react/outline';
import Image from 'next/future/image';
import imgBannerTitle from '../../public/images/banner-title.webp';

const Banner = ({ video }) => {
  return (
    <div className="w-full min-h-[75vh]">
      <div className="flex flex-col items-start pt-[7%] netflix-md:pt-[11%] pr-[30vw] pl-[4%]">
        <div className="relative w-fit max-w-[52%] h-fit">
          <Image src={imgBannerTitle} className="" />
        </div>
        <div className="my-5 text-[1.15vw] w-[45%]">
          <p className="line-clamp-5 md:line-clamp-3 text-justify">
            {video.overview}
          </p>
        </div>
        <div className="flex space-x-3 x-fit transition-all text-[1.5vw] sm:text-[1.7vw] netflix-md:text-[2.05vw] mlg:text-[1.5vw] ">
          <div className="flex items-center justify-center w-fit bg-white rounded-md">
            <div className="flex items-center w-full px-[0.8rem] py-[0.1rem] netflix-md:py-0">
              <PlayIcon className="h-5 sm:h-6 netflix-md:h-[30px] fill-black" />
              <button type="button" className="w-full text-black">
                Play
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center bg-[#6d6d6e]/50 rounded-md">
            <div className="flex items-center w-full px-[0.8rem] py-[0.1rem] netflix-md::py-0">
              <InformationCircleIcon className="h-5 sm:h-6 netflix-md:h-[30px]" />
              <button type="button" className="w-full text-white">
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
