import authService from "@/services/auth.service";
import { AuthOptions, getServerSession, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await authService.login({
            email: credentials.email,
            password: credentials.password,
          });
          const token = res.data?.data;

          const userByToken = await authService.getUserByToken(token);
          const user = userByToken?.data.data;

          if (
            res.status === 200 &&
            token &&
            userByToken.status === 200 &&
            user.id
          ) {
            user.token = token;
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log("Authorization error: ", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: any; user: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export const getSession = () => getServerSession(authOptions);
