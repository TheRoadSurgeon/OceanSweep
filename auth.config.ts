import type { NextAuthConfig } from "next-auth";
import { getToken } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user id to token when the user is first authenticated
      //console.log("token", token)
      //console.log("user", user)
      if (user) {
        token.id = user.id; // Store user ID
        token.name = user.name || "Unknown"; // Store name in token
      }
      return token;
    },
    async session({ session, token }) {

      if (token.sub) {
        session.user.id = token.sub; // Pass user ID to session
      }

      //console.log("token in session", token);
      if (token.name) {
        session.user.name = token.name; // Set the user's name in the session
      }
      
      //console.log("Session Object:", session); // Debugging log
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // List of URLs that can be accessed without login
      const allowedUrls = [
        "/public-page", // Add any public pages here
      ];

      // If the user is logged in, allow access to any page
      if (isLoggedIn) {
        return true;
      }

      // If the user is not logged in, allow access to only public pages
      if (allowedUrls.includes(nextUrl.pathname)) {
        return true;
      }
      return false;
    },
  },
  providers: [Credentials({})],
} satisfies NextAuthConfig;
