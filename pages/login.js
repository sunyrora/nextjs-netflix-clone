import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';
import Login from '../screens/Login';
import { authOptions } from './api/auth/[...nextauth]';

const LoginPage = ({title, bgImg}) => {

  const baseTitle = 'Netflix Clone';

  return (
    <>
    <Head key={title}>
      <title>{title ? `${title} - ${baseTitle}` : baseTitle}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Login bgImg={bgImg} />
    </>
  );
};

export default LoginPage;

export const getServerSideProps = async ({req, res}) => { 
  const session = await unstable_getServerSession(req, res, authOptions);

  if(session?.user) {
    return {
      props: {
        redirect: {
          destination: `${process.env.contentsBasePath}`,
          permanant: false,
        }
      }
    }
  }

  return {
    props: {
      title: 'Sign In',
      bgImg: '/images/bg.jpg',
      showHeader: false,
    }
  }
}