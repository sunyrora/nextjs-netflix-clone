import Head from 'next/head';
// import Header from '../components/Header';

const Layout = ({ title, children }) => {
  const baseTitle = 'Netflix Clone';

  return (
    <div className="flex items-center justify-center h-full max-w-full">
      <Head>
        <title>{title ? `${title} - ${baseTitle}` : baseTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        {/* <header className="">
          <Header />
        </header> */}
        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
