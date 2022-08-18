import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';
import Register from '../screens/Register';
import { authOptions } from './api/auth/[...nextauth]';

const RegisterPage = ({title, bgImg}) => {

  const baseTitle = 'Netflix Clone';

  return (
    <>
    <Head key={title}>
      <title>{title ? `${title} - ${baseTitle}` : baseTitle}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Register bgImg={bgImg} />
    </>
  );
};

export default RegisterPage;

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
      title: 'Register',
      bgImg: '/images/bg.jpg',
      showHeader: false,
    }
  }
}