import Head from 'next/head';
import Image from 'next/image';
import bgImg from '../public/images/bg.jpeg';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Home = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { pathname: currentPath } = router;

  return (
    <div className="inline flex min-h-screen flex-col items-center justify-center w-full h-full">
      <Head>
        <title>Netflix Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="fixed overflow-hidden z-[-1] w-screen h-screen bg-gradient-to-r from-gray-400 to-gray-100">
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
        {session ? (
          <>
            Signed in as {session.user.name} <br />
            <button className="primary-button" onClick={() => signOut()}>
              Sign out
            </button>
          </>
        ) : (
          <button
            className="primary-button"
            onClick={() =>
              router.push({
                pathname: '/login',
                query: {
                  redirect: currentPath ?? '/',
                },
              })
            }
          >
            Login
          </button>
        )}
        <h1 className="text-5xl text-white font-bold max-w-lg">
          Unlimited movies, TV shows, and more.
        </h1>
        <h2 className="text-2xl text-white my-4">
          Watchianywhere. cancel anvime
        </h2>
        <p className="text-xl text-white mt-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="main-input-form flex space-x-0.5 min-w-[615px]">
          <input
            type="tex"
            placeholder="Emai address"
            className="grow-[2] p-2"
          />
          <button className="grow-[1] primary-button">Get Started {'>'}</button>
        </div>
      </main>
    </div>
  );
};

export default Home;
