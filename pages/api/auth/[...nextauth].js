import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from '../../../db/controllers/authController';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      console.log('jwt callbacks: user', user, 'account: ', account);
      if(account) {
        token.acces_token = account.access_token;

        if(user) {
          user.provider = account.provider;
        }
      }
      //   if (user) token._id = user._id;
      return token;
    },
    session: async ({ session, token, user }) => {
      console.log('session callbacks: session:', session, 'user: ', user);
      session.access_token = token.access_token;
      //   if (token?._id) session.user._id = token._id;
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Nexflix_Clone',
      credentials: {
        email: {
          label: 'Eamil',
          type: 'text', 
          placeholder: 'Email',
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      authorize: async (credentials, req) => {
        return await signIn(credentials.email, credentials.password);
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
