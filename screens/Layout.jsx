import Head from 'next/head';
import BackgroundImage from '../components/BackgroundImage';
import { useSession } from 'next-auth/react';
import Header from '../components/header/Header';
import HeaderLogined from '../components/header/HeaderLogined';

const Layout = ({ title, bgImg, children }) => {
  const baseTitle = 'Netflix Clone';
  const { data: session } = useSession();

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
         from-bggay/10  to-bggray-100"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
