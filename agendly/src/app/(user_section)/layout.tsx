/**
 * This layout file wraps all content in the user section of the webiste (the sections where login is required)
 * 
 * This allows us to access the user object using the useUser() hook from the auth0 library
 * 
 *  import { useUser } from '@auth0/nextjs-auth0/client';
 * 
 *  // in the desired react component
 *  const { user, error, isLoading } = useUser();

 */
import { SessionProvider } from "next-auth/react";
import Navbar from "../content/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserSectionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (

        <SessionProvider>
            <Navbar/>
            {children}
            <ToastContainer />
        </SessionProvider>

    );

}
