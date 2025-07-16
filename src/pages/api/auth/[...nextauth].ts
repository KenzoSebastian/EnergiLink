import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type Data = {
  email?: string;
  id?: string;
  role?: string;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        id: {
          type: "text",
        },
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
        role: {
          type: "text",
        },
      },
      async authorize(
        credentials:
          | Record<"id" | "email" | "password" | "role", string>
          | undefined
      ) {
        if (!credentials) return null;
        const { id, email, password, role } = credentials;

        const user = { id, email, password, role };
        return user ? user : null;
      },
    }),
  ],
  callbacks: {
    jwt({
      token,
      account,
      user,
    }: {
      token: Data;
      account?: { provider?: string };
      user?: Data;
    }) {
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: Data }) {
      if ("email" in token && session.user) {
        session.user.email = token.email as string;
      }
      if ("id" in token && session.user) {
        session.user.id = token.id as string;
      }
      if ("role" in token && session.user) {
        session.user.role = token.role as string;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
