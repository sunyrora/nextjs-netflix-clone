import Head from 'next/head';
import BackgroundImage from '../components/BackgroundImage';
import { useSession } from 'next-auth/react';
import Header from '../components/Header';
import HeaderLogined from '../components/HeaderLogined';

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
        <header>{session ? <HeaderLogined /> : <Header />}</header>
        <main className="pt-24 md:pt-32">{children}</main>
        {/* <main className="w-full p-0">{children}</main> */}
      </div>
    </div>
  );
};

export default Layout;
