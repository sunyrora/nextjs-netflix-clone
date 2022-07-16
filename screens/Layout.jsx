import Head from 'next/head';
// import Header from '../components/Header';

const Layout = ({ title, children }) => {
  const baseTitle = 'Netflix Clone';

  return (
    <div className="flex items-center justify-center h-full max-w-full">
      <Head>
        <title>{title ? `${title} - ${baseTitle}` : baseTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap"
          rel="stylesheet"
        /> */}
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
