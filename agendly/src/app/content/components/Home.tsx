import Link from "next/link";
import BlueGradientButton from "./blue-gradient-button";

const Home = () => {
    return( <section className="relative w-full min-h-[800px] flex items-center justify-center text-center">
    <div className="px-4 md:px-6 max-w-[1500px] mx-auto w-[90%]">
        <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl 
                lg:text-7xl/none text-dark ">
                    Agendas, simplified
                </h1>
                <p className="text-gray-300 pb-10">Managing your calendar has never been easier</p>
            </div>
                <Link href={"/signup"}>
                <BlueGradientButton  />
                </Link>

            <div>

            </div>

    </div>


    </section>);


   
}

export default Home;