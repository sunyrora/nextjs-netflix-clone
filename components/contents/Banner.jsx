import Image from 'next/future/image';
import imgBannerTitle from '../../public/images/banner-title.webp';

const Banner = ({ video }) => {
  return (
    <div className="flex relative w-full h-[44vw] min-h-[10vw] px-content-default 2xl:px-[60px] ">
      <div
        className="relative
          w-[68vw] md:w-[69.5vw] lg:w-[70vw] 
          h-[56.3vw]
          content-banner-parent"
      >
        <div
          className="absolute
          w-[52%] xsm:w-[52.5%] netflix-md:w-[51%] 
          bottom-[37.5%] xsm:bottom-[36.5%] sm:bottom-[15%] netflix-md:bottom-[36%] mmd:bottom-[35%]
       content-banner-child"
        >
          <div className="w-full mb-[6px] sm:my-[10px] lg:my-[20px]">
            <div className="relative w-full h-fit mb-3">
              <Image src={imgBannerTitle} className="" />
            </div>
            <div className="transition-all sm:flex my-0 sm:my-2 lg:my-[18px] netflix-md:mb-0 text-[1.15vw]">
              <p className=" p-0 line-clamp-5 sm:line-clamp-3 leading-tight content-banner-overview">
                {video.overview}
              </p>
            </div>
          </div>
          <div className="flex space-x-1.5 x-fit transition-all content-banner-button-container">
            <div className="grow-[1] content-banner-button-child">
              <div className="flex items-center space-x-1 netflix-md:space-x-0 w-fit">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="content-banner-icon"
                >
                  <path
                    d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                    fill="black"
                  ></path>
                </svg>
                <button
                  type="button"
                  onClick={() => console.log('play button click')}
                  className="content-banner-button w-full text-black z-[100]"
                >
                  Play
                </button>
              </div>
            </div>
            <div className="grow-[2] content-banner-button-child bg-[#6d6d6e]/50">
              <div className="flex space-x-1 netflix-md:space-x-0 items-center w-fit ">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="content-banner-icon"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <button
                  type="button"
                  className="content-banner-button w-full text-white"
                >
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
