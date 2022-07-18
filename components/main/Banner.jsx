import { PlayIcon } from '@heroicons/react/solid';
import { InformationCircleIcon } from '@heroicons/react/outline';
import Image from 'next/future/image';
import imgBannerTitle from '../../public/images/banner-title.webp';

const Banner = ({ video }) => {
  return (
    <div className="rleative w-full min-h-[75vh] main-content">
      <div className="absolute w-full flex flex-col items-startpt-[7%] mt-[7%] netflix-md:mt-[19%]">
      {/* <div className="absolute flex flex-col items-start bottom-[70%] netflix-md:bottom-[60%] md:bottom-[60%] mmd:bottom-[55%]   xmd:bottom-[50%] mlg:bottom-[47%] lg:bottom-[48%]"> */}
        <div className="w-[22%] max-w-[25%] h-fit mb-3">
          <Image src={imgBannerTitle} className="" />
        </div>
        <div className="hidden sm:flex my-5 text-[1.15vw] w-[21%]">
          <p className=" sm:line-clamp-3 leading-tight text-justify">
            {video.overview}
          </p>
        </div>
        <div className="flex space-x-3 x-fit transition-all text-[1.5vw] sm:text-[1.7vw] netflix-md:text-[2.05vw] mmd:text-[1.5vw] ">
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
