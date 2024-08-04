// This file only returns the options for nextauth
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";

// Creating a supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
// Types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

export const options: NextAuthOptions = {
  secret: process.env.NEXT_SECRET,
  debug: true,
  providers: [
    // For login with github oauth
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // For login with email
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email: ",
          type: "text",
          placeholder: "Your email to sign in",
        },
        password: {
          label: "Password: ",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      // The function, that's called after form submission, responsible for authorization of data
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw new Error("Invalid email or password");
        }

        if (data?.user) {
          return { id: data.user.id, email: data.user.email };
        }

        return null;
      },
    }),
  ],
  // Supabase next-auth integration
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  }),
  callbacks: {
    async session({ session, token }) {
      console.log("hi", session, token);
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  // Specifying the custom sign in route
  pages: {
    signIn: "/auth/signin",
  },
};
