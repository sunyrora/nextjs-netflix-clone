import Link from 'next/link';
import { useRouter } from 'next/router';

function Unauthorized() {
  const router = useRouter();
  const { message, redirect } = router.query;
  return (
    <div className="relative flex flex-col items-center justify-center space-y-3 mt-40">
      <h1 className="text-xl">Access Denied</h1>
      {message && <div className="error-message">{message}</div>}
      <Link
        href={{
          pathname: '/login',
          query: {
            redirect: redirect ?? '/',
          },
        }}
      >
        Go to Login
      </Link>
    </div>
  );
}

export default Unauthorized;
