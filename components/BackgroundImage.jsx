import Image from 'next/image';
import bgImg from '../public/images/bg.jpeg';

const BackgroundImage = () => {
  return (
    <div className="fixed overflow-hidden z-[-1] w-screen h-screen bg-gradient-to-r from-gray-600 to-gray-400">
      <Image
        className="mix-blend-multiply"
        src={bgImg}
        layout="fill"
        objectFit="cover"
        quality={100}
        placeholder="blur"
        // objectPosition="center"
      />
    </div>
  );
};

export default BackgroundImage;
