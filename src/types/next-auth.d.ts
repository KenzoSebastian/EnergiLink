declare module "next-auth" {
  interface Session {
    user: {
      email?: string;
      id?: string;
      role?: string;
    };
  }
  interface User {
    email?: string;
    id?: string;
    role?: string;
  }
}
