import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from '../../../lib/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../model/userModel';
import { compare } from 'bcryptjs';

import connectDb from '../../../database/conn';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../database/mongodb';
import { getUserById } from '../../../lib/db';

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider,
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials, req) {
        try {
          await connectDb();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error('No user found with Email. Please Sign Up...!');
          }

          const checkPassword = await compare(credentials.password, user.password);
          if (!checkPassword || user.email !== credentials.email) {
            throw new Error('Invalid User Name/Password');
          }

          return Promise.resolve(user);
        } catch (error) {
          console.error('Error in credentials authorize:', error);
          throw new Error('Connection failed...!');
        }
      },
    }),
  ],
  session: {
    jwt: true,
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 10 * 60 * 60 * 24,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  pages: {
    signIn: '/login',
    signUp: '/signup',
    error: '/error',
  },
  callbacks: {
    async signIn(user, account, profile) {
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      const user = await getUserById(token.sub);
      session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        skill: user.skill,
        image: user.image,
        isNewUser: user.isNewUser,
        emailVerified: user.emailVerified,
        role: user.role,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
