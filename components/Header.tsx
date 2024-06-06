import Image from "next/image";

export default function Header() 
{
    return (
        <header className="flex justify-between items-center p-4">
            <Image
                src="/images/logo.svg"
                alt="Loanee"
                width={150}
                height={50}
            />
            <button className='rounded-lg px-6 py-2 font-medium border border-[#000]'>
                About us
            </button>
        </header>
    )
}