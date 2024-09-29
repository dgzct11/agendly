'use client'
import Link from "next/link";
import { SessionProvider, useSession } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();
    const profilePic = (session?.user as any)?.picture || "";
    
    
    return (
        <div className="w-full h-18 items-center drop-shadow-lg bg-white flex flex-row gap-8 border-b pt-4 pb-4">
            <Link href={"/"} className="ml-4 flex items-center text-3xl hover:text-gray-700">
                <img src="../AgendlyLogo.svg" className="h-12 w-12 mr-2"></img>
                <h1 className="text-dark font-bold">Agendly</h1> 
            </Link>
            <Link href={"/upload_file"} className="items-center text-xl hover:text-blue-700">
                <h1 className="text-dark font-bold">Upload File</h1> 
            </Link>
            <Link href={"/"} className="items-center text-xl hover:text-blue-700">
                <h1 className="text-dark font-bold">History</h1> 
            </Link>
            <div className="ml-auto mr-8">
                {session ? (
                    <>
                        <div className="flex">
                            <p className="mt-auto mb-auto mr-4 font-bold text-xl">{session.user?.name}</p>
                            <img 
                                src={profilePic ||''} 
                                alt="Profile Picture" 
                                className="border border-solid border-2 border-gray-300"
                                style={{ borderRadius: '50%', width: '60px', height: '60px' }} 
                            />
                        </div>
                    </>
                ) : (
                    <Link href="/api/auth/signin" className="text-lg hover:text-blue-700">
                        Sign In
                    </Link>
                )}
            </div>
        </div> 
    );
};

export default Navbar;