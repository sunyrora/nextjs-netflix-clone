import '../styles/globals.css';
import Layout from '../screens/Layout';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../db/graphql/ApolloClient';

function MyApp({
  Component,
  pageProps
  // pageProps: {
  //   session,
  //   title,
  //   bgImg,
  //   redirect,
  //   showHeader = true,
  //   ...pageProps
  // },
}) {
  const router = useRouter();

  // console.log('showHeader: ', showHeader);
  const {
    session,
    title,
    bgImg,
    redirect,
    showHeader=true
  } = pageProps;

  useEffect(() => {
    if (redirect) {
      router.push(redirect.destination);
    }
  }, [router]);

  const PrintComponent = showHeader
    ? () => (
        <Layout title={title} bgImg={bgImg}>
          <Component {...pageProps} />
        </Layout>
      )
    : () => <Component {...pageProps} />;

  return redirect ? (
    <></>
  ) : (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <PrintComponent />
        </Auth>
      ) : (
        <PrintComponent />
      )}
      </SessionProvider>
    </ApolloProvider>
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
