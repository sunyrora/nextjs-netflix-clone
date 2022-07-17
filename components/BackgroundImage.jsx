import Image from 'next/future/image';
import { useEffect, useState } from 'react';
// import imgFallback from '../public/images/bg.jpeg';

// const shimmer = (w, h) => `
// <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <linearGradient id="g">
//       <stop stop-color="#333" offset="20%" />
//       <stop stop-color="#222" offset="50%" />
//       <stop stop-color="#333" offset="70%" />
//     </linearGradient>
//   </defs>
//   <rect width="${w}" height="${h}" fill="#333" />
//   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
//   <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
// </svg>`;

// const toBase64 = (str) =>
//   typeof window === 'undefined'
//     ? Buffer.from(str).toString('base64')
//     : window.btoa(str);

const BackgroundImage = ({ bgImg = null }) => {
  const imgFallback = '/images/bg.jpeg';
  const [imgSrc, setImgSrc] = useState(bgImg ?? imgFallback);
  const [imgWidth, setImgWidth] = useState(3000);
  const [imgHeight, setImgHeight] = useState(100);

  useEffect(() => {
    setImgSrc(bgImg ?? imgFallback);
  }, [bgImg]);

  return (
    <div className="absolute overflow-hidden z-[-10] w-full h-fit bg-gradient-to-t from-gray-900 to-gray-200 ">
      <Image
        src={imgSrc}
        // layout="cover"
        width={imgWidth}
        height={imgHeight}
        className={`mix-blend-multiply`}
        // objectFit="contain"
        quality={100}
        // placeholder="blur"
        blurDataURL={imgSrc ?? imgFallback}
        onError={(error) => {
          console.log('Image loading error: ', error);
          setImgSrc(imgFallback);
        }}
        // objectPosition="center"
      />
    </div>
  );
};

export default BackgroundImage;
