import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";

// const refreshToken = async (refreshToken: string) => {
//   const response = await fetch("https://oauth2.googleapis.com/token", {
//     method: "POST",
//     body: new URLSearchParams({
//       client_id: process.env.GOOGLE_CLIENT_ID!,
//       client_secret: process.env.GOOGLE_CLIENT_SECRET!,
//       grant_type: "refresh_token",
//       refresh_token: refreshToken,
//     }),
//   });

//   const tokensOrError = await response.json();

//   if (!response.ok) throw tokensOrError;

//   return tokensOrError as {
//     access_token: string;
//     expires_in: number;
//     refresh_token?: string;
//   };
// };

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
          ].join(" "),
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const [googleAccount] = await db.account.findMany({
        where: { userId: user.id, provider: "google" },
      });
      // if (googleAccount.expires_at && googleAccount.expires_at * 1000 < Date.now()) {
      //   // If the access token has expired, try to refresh it
      //   try {
      //     const newTokens = await refreshToken(googleAccount.refresh_token!);
      //     await db.account.update({
      //       data: {
      //         access_token: newTokens.access_token,
      //         expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
      //         refresh_token: newTokens.refresh_token ?? googleAccount.refresh_token,
      //       },
      //       where: {
      //         provider_providerAccountId: {
      //           provider: "google",
      //           providerAccountId: googleAccount.providerAccountId,
      //         },
      //       },
      //     });
      //   } catch (error) {
      //     console.error("Error refreshing access_token", error);
      //     // If we fail to refresh the token, return an error so we can handle it on the page
      //     session.error = "RefreshTokenError";
      //   }
      // }

      return session;
    },
  },
  pages: { signIn: "/login" },
});

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError";
  }
}
