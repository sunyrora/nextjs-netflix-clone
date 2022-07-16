// import Image from 'next/image';
// import bgImg from '../public/images/bg.jpeg';

import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="flex justify-center items-center w-full px-10">
      <div className="w-[515px] md:max-w-[640px] md:max-w-xl">
        <div className="flex flex-col w-full items-center justify-start px-0 mt-56 mx-auto text-center font-medium min-h-screen">
          <h1 className="text-[3.125rem] leading-[1.1] text-white font-medium max-w-lg tracking-[0.023rem]">
            <p>Unlimited movies, TV</p>
            <p>shows, and more.</p>
          </h1>
          <h2 className="text-2xl tracking-widest font-light  text-white my-4">
            Watch anywhere. cancel anytime.
          </h2>
          <div className="flex flex-col w-full">
            <p className="text-lg px-[3.2rem] md:px-[2.9rem] font-light tracking-wider leading-[1.15] text-white mb-4 mt-1">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="flex flex-col items-center md:flex-row w-full md:space-x-0.3 space-y-3 md:space-y-0">
              <input
                type="tex"
                placeholder="Emai address"
                className="w-full grow md:grow-[2] mx-1 p-3 md:p-4"
              />
              <button className="md:grow-[1] whitespace-nowrap	 font-light tracking-[0.023rem] primary-button md:h-14 text-sm md:text-2xl rounded-none">
                Get Started {'>'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
