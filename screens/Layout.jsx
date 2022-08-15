import Head from 'next/head';
import BackgroundImage from '../components/BackgroundImage';
import { useSession } from 'next-auth/react';
import Header from '../components/header/Header';
import HeaderLogedIn from '../components/header/HeaderLogedIn';
import { useEffect } from 'react';
import { classNames } from '../utils/utils';

const Layout = ({ title, bgImg, children }) => {
  const baseTitle = 'Netflix Clone';
  const { data: session } = useSession();

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // console.log('----Layout: scrollbarWidth: ', scrollbarWidth);
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${scrollbarWidth}px`
    );
  }, []);

  return (
    <div className="flex items-center justify-center h-full max-w-full p-0 m-0">
      <Head>
        <title>{title ? `${title} - ${baseTitle}` : baseTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full p-0">
        <div className="absolute w-full h-fit">
          <BackgroundImage className='relative' bgImg={bgImg} />
          {/* gradient */}
          <div className={classNames(
            `w-full h-[10%]`,
            `absolute bottom-0`, 
            // `border-2 border-orange-600`,
            'bg-gradient-to-t from-bggray-100/100 to-white/0'
          )}></div>
        </div>
        <header>
          {session ? (
            <HeaderLogedIn />
          ) : (
            <Header />
          )}
        </header>
        {/* <main className="pt-24 md:pt-32">{children}</main> */}
        <main className="w-full p-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
