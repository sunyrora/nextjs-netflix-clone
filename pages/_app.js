import '../styles/globals.css';
import Layout from '../screens/Layout';
import { SessionProvider } from 'next-auth/react';
import SubLayout from '../screens/SubLayout';

function MyApp({
  Component,
  pageProps: { session, title, bgImg, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout title={title}>
        <SubLayout bgImg={bgImg}>
          <Component {...pageProps} />
        </SubLayout>
      </Layout>
    </SessionProvider>
  );
}
export default MyApp;

// function Auth({ children }) {
//   const router = useRouter();
//   const { pathname } = router;
//   const { status } = useSession({
//     required: true,
//     onUnauthenticated: () => {
//       router.push({
//         pathname: '/unauthorized',
//         query: {
//           message: 'Login required',
//           redirect: pathname ?? '/',
//         },
//       });
//     },
//   });

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   return children;
// }
