// import Image from 'next/image';
// import bgImg from '../public/images/bg.jpeg';

import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="absolute w-full">
      <BackgroundImage />
      <Header />
      <div className="flex flex-col w-full items-center justify-center px-20 mt-10 text-center min-h-screen">
        <h1 className="text-5xl text-white font-medium max-w-lg tracking-wide">
          Unlimited movies, TV shows, and more.
        </h1>
        <h2 className="text-2xl font-thin text-white my-4">
          Watchianywhere. cancel anvime
        </h2>
        <p className="text-base font-thin text-white my-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="main-input-form flex space-x-0.5 min-w-[615px]">
          <input
            type="tex"
            placeholder="Emai address"
            className="grow-[4] p-2"
          />
          <button className="grow-[1] primary-button h-14 text-2xl">
            Get Started {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
