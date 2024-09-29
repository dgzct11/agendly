// lib/google.ts
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

export function getOAuth2Client(
  accessToken: string,
  refreshToken: string
): OAuth2Client {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!
  );

  client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  return client;
}
