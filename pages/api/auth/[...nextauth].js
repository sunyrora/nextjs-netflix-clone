import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log('jwt callbacks: user', user);
      //   if (user) token._id = user._id;
      return token;
    },
    session: async ({ session, token }) => {
      console.log('session callbacks: session.user', session.user);
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
    // ...add more providers here
  ],
});
