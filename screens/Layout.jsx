import Head from 'next/head';
import BackgroundImage from '../components/BackgroundImage';
import { useSession } from 'next-auth/react';
import Header from '../components/header/Header';
import HeaderLogined from '../components/header/HeaderLogined';
import { useEffect } from 'react';

const Layout = ({ title, bgImg, children }) => {
  const baseTitle = 'Netflix Clone';
  const { data: session } = useSession();

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    console.log('----Layout: scrollbarWidth: ', scrollbarWidth);
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
        <BackgroundImage bgImg={bgImg} />
        <header>
          {process.env.NODE_ENV === 'development' ? (
            <HeaderLogined />
          ) : session ? (
            <HeaderLogined />
          ) : (
            <Header />
          )}
        </header>
        {/* <main className="pt-24 md:pt-32">{children}</main> */}
        <main
          className="w-full p-0  bg-gradient-to-b
         from-bggay/10  to-[#010511]"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
