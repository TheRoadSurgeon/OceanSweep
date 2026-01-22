import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { users } from "@prisma/client";
import { prisma } from "./app/lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";

async function getUser(email: string): Promise<users | null> {
  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Required for PrismaAdapter
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(
            password,
            user.hashedpassword
          );

          // Convert `id` to a string
          const userWithStringId = {
            ...user,
            id: user.id.toString(), // Convert `id` to string
            name: `${user.firstname || ""} ${user.lastname || ""}`.trim() || "Default Name",
          };
          if (passwordsMatch) return userWithStringId;
        }

        return null;
      },
    }),
  ],
});
