import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(`${process.env.contentsBasePath}`);
    }
  }, []);

  if (session) return <></>;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-[90vw] md:max-w-xl">
          <div className="flex flex-col w-full items-center justify-start px-0 mt-[30vw] xsm:mt-[25vw] mmd:mt-[22vw] lg:mt-[14vw] mx-auto text-center font-medium h-full min-h-full">
            <h1 className="text-[7vw] md:text-[3.125rem] leading-[1.1] text-white font-medium max-w-lg tracking-[0.023rem]">
              <p>Unlimited movies, TV</p>
              <p>shows, and more.</p>
            </h1>
            <h2 className="text-[4.8vw] msm:text-2xl font-light  text-white my-4">
              Watch anywhere. cancel anytime.
            </h2>
            <div className="flex flex-col w-full">
              <p
                className="text-[4.8vw] msm:text-[2.5vw] xmd:text-lg font-light 
                tracking-normal msm:tracking-wide xmd:tracking-tight
                leading-[1.15] text-white
               px-[1%] xsm:px-[15%] xmd:px-0
                mb-4 mt-1"
              >
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
          <div className="h-[1000px] border-t-[8px] bg-bggray-100 border-[#222]"></div>
        </div>
      </div>
    </div>
  );
};

// export const getStaticProps = async () => {
//   return {
//     props: {
//       bgImg: '/images/bg.jpeg',
//     },
//     revalidate: 5,
//   };
// };

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  let props = {
    props: {
      bgImg: '/images/bg.jpeg',
    },
  };

  if (session) {
    props = {
      redirect: {
        destination: `${process.env.contentsBasePath}`,
        permanent: false,
      },
    };
  }

  console.log('props: ', props);

  return {
    props,
  };
};

export default Home;
