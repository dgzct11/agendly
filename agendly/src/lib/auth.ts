import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          authorization: {
            params: {
              scope:
                "openid email profile https://www.googleapis.com/auth/calendar",
              access_type: "offline",
              prompt: "consent",
            },
          },
        }),
      ],
      callbacks: {
        async jwt({ token, account }) {
          if (account) {
            token.accessToken = account.access_token;
            token.refreshToken = account.refresh_token;
            token.accessTokenExpires = account.expires_at
              ? account.expires_at * 1000
              : Date.now() + 3600 * 1000; // Default to 1 hour
          }
    
          if (Date.now() < (token.accessTokenExpires as number)) {
            return token;
          }
    
          return await refreshAccessToken(token);
        },
        async session({ session, token }) {
          //@ts-ignore
          session.user = token;
          return session;
        },
      },
      secret: process.env.AUTH_SECRET,
})



async function refreshAccessToken(token: any) {
    try {
      const url =
        "https://oauth2.googleapis.com/token?" +
        new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          grant_type: "refresh_token",
          refresh_token: token.refreshToken,
        });
  
      const response = await fetch(url, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
      });
  
      const refreshedTokens = await response.json();
  
      if (!response.ok) {
        throw refreshedTokens;
      }
  
      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
        refreshToken:
          refreshedTokens.refresh_token ?? token.refreshToken,
      };
    } catch (error) {
      console.error("Error refreshing access token", error);
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  }