import authService from "@/services/auth.service";
import { AuthOptions, getServerSession, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 hari
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
          // 🔹 login untuk dapatkan token
          const res = await authService.login({
            email: credentials.email,
            password: credentials.password,
          });
          const token = res.data?.data;

          // 🔹 ambil user detail pakai token
          const userByToken = await authService.getUserByToken(token);
          const user = userByToken?.data.data;

          if (
            res.status === 200 &&
            token &&
            userByToken.status === 200 &&
            user.id
          ) {
            return { ...user, token };
          }
          return null;
        } catch (error) {
          console.log("Authorization error: ", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // 🔹 Pertama kali login → simpan data user ke token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.name = user.name;
        token.role = user.role;
        token.token = (user as any).token;
      }

      // 🔹 Kalau ada update dari client → replace field yang dikirim
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.username) token.username = session.username;
        if ((session as any).role) token.role = (session as any).role;
      }

      return token;
    },
    async session({ session, token }) {
      // 🔹 Mapping token -> session
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        (session.user as any).token = token.token as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export const getSession = () => getServerSession(authOptions);
