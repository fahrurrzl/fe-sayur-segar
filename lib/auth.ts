import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Contoh: Simulasi login manual (biasanya dari database)
async function authenticateUser(email: string, password: string) {
  if (email === "admin@mail.com" && password === "123456") {
    return { id: "1", name: "Admin User", email: "admin@mail.com" };
  }
  return null;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await authenticateUser(
          credentials.email,
          credentials.password
        );

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        (token.email = user.email), (token.name = user.name);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export const getSession = () => getServerSession(authOptions);
