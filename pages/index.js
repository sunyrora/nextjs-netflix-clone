// import { unstable_getServerSession } from 'next-auth';
// import { authOptions } from './api/auth/[...nextauth]';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // router.push('/main');
    } else {
      if (session) {
        router.push('/main');
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full px-10">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-[515px] md:max-w-[640px] md:max-w-xl">
          <div className="flex flex-col w-full items-center justify-start px-0 mt-28 mx-auto text-center font-medium h-full min-h-full">
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

        <div className="mt-32 w-screen">
          <div className="h-[1000px] border-[8px] bg-[#141414] border-[#222]"></div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      bgImg: '/images/bg.jpeg',
    },
  };
};

// export const getServerSideProps = async (context) => {
//   const session = await unstable_getServerSession(
//     context.req,
//     context.res,
//     authOptions
//   );

//   let props = {
//     props: {
//       bgImg: '/images/bg.jpeg',
//     },
//   };

//   console.log('@@@@@@@ session: ', session);

//   if (session) {
//     props = {
//       redirect: '{
//         permanent: false,
//         destination: '/main',
//       },'
//       props: {},
//     };
//   }

//   console.log('props: ', props);

//   return {
//     props,
//   };
// };

export default Home;
