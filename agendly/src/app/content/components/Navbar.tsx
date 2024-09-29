'use client'
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="w-screen h-18 items-center drop-shadow-lg bg-white flex flex-row gap-8 border-b pt-4 pb-4">
            <Link href={"/"} className="ml-4 flex items-center text-3xl hover:text-gray-700">
                <img src="../AgendlyLogo.svg" className="h-12 w-12 mr-2"></img>
                <h1 className="text-dark font-bold">Agendly</h1> 
            </Link>
            <Link href={"/"} className="items-center text-xl hover:text-blue-700">
                <h1 className="text-dark font-bold">Upload File</h1> 
            </Link>
            <Link href={"/"} className="items-center text-xl hover:text-blue-700">
                <h1 className="text-dark font-bold">History</h1> 
            </Link>
            <Link href={"/"} className="ml-auto text-lg hover:text-blue-700">
                <button className="font-bold">Login</button> 
            </Link>
            <Link href={"/"} className="mr-16 text-white text-lg">
                <button className="bg-blue-400 hover:bg-blue-500 rounded-md pl-3 pt-2 pb-2 pr-3 font-bold">Sign Up</button> 
            </Link>
        </div> 
    );
};

export default Navbar;