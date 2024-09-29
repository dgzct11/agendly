'use client'
import Link from "next/link";
import Logo from "../../../../public/AgendlyLogo.svg"

const Navbar = () => {
    return (<div className="pt-5 ">
        <div className="max-w-[1500px] mx-auto w-[90%] flex justify-between items-center border-b
        pb-5">
        <div>
            <Link href={"/"} className="flex gap-1 items-center text-2xl">
                <h1 className="text-dark font-bold">Agendly</h1> 
                <Logo className="w-8 h-8"/>
            </Link>
        </div> 

        </div> 
    </div>
    );
};

export default Navbar;