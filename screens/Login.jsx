import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';

const Login = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  function handleAuth(providerID) {
    try {
      const { error, status, ok, url } = signIn(providerID);
      if (error) {
        console.error('signIn error: ', error, ' status: ', status);
      }
    } catch (error) {
      console.error('Login error: ', error);
    }
  }

  return (
    <div className="absolute w-full">
      <BackgroundImage />
      <Header />
      <div className="flex flex-col items-center justify-center w-full p-5 m-5 mt-20">
        {!session?.user && (
          <button
            className="primary-button m-2 text-lg"
            onClick={(e) => handleAuth('google')}
          >
            SignIn with Google
          </button>
        )}
        <Link href={'/'}>
          <a className="text-white">Go to Main</a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
