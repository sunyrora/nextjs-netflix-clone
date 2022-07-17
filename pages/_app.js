import '../styles/globals.css';
import Layout from '../screens/Layout';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function MyApp({
  Component,
  pageProps: { session, title, bgImg, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Layout title={title} bgImg={bgImg}>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      ) : (
        <Layout title={title} bgImg={bgImg}>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}
export default MyApp;

function Auth({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const redirect = pathname ?? '/';
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push({
        pathname: '/unauthorized',
        query: {
          message: 'Login required',
          redirect,
        },
      });
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}
