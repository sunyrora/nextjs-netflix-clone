import Head from 'next/head';
// import Header from '../components/Header';

const Layout = ({ title, children }) => {
  const baseTitle = 'Netflix Clone';

  return (
    <div className="flex items-center justify-center h-full max-w-full p-0 m-0">
      <Head>
        <title>{title ? `${title} - ${baseTitle}` : baseTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full p-0">{children}</main>
    </div>
  );
};

export default Layout;
