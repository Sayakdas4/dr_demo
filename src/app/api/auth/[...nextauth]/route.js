import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace this with your actual user verification logic
        const mockUser = {
          id: "1",
          email: "admin",
          role: "UI Develoepr",
          password: "admin", // In real app, store hashed passwords
          name: "Sam Curan"
        };

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        if (credentials.email === mockUser.email && 
            credentials.password === mockUser.password) {
          return mockUser;
        } else {
          throw new Error("Invalid email or password");
        }
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  }
});

export { handler as GET, handler as POST };