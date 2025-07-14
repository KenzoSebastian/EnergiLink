import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type Data = {
  email?: string;
  id?: string;
  role?: string;
}

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
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials) return null;
        const { email, password } = credentials;

        const user = { id: "1", email, password, role: "user" };
        console.log(user);
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
    async session({ session, token } : { session: Session; token: Data }) {
      if ("email" in token && session.user) {
        session.user.email = token.email as string;
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
