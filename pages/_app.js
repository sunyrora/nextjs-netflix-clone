import '../styles/globals.css';
import Layout from '../screens/Layout';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, title, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout title={title}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
export default MyApp;
