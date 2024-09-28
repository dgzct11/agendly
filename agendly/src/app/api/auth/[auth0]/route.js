// app/api/auth/[auth0]/route.js
import { handleAuth, handleCallback, handleLogout, handleLogin } from '@auth0/nextjs-auth0';

//Return to the home page after login
const afterCallback = (req, session, state) => {
  state.returnTo = "/home";
  return session;
};

//Export the handler for the different auth routes
export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
  signup: handleLogin({ authorizationParams: { screen_hint: 'signup', } }),
  logout: handleLogout({ returnTo: `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?returnTo=${process.env.AUTH0_BASE_URL}&client_id=${process.env.AUTH0_CLIENT_ID}` }),
});