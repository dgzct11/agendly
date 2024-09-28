import Image from "next/image";

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to Agendly</p>
            <Image
                src="/logo.svg"
                alt="Agendly Logo"
                width={200}
                height={200}
            />
        </div>
    );
}
