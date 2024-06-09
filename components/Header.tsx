import Image from "next/image";

export default function Header() 
{
    return (
        <header className="flex justify-between items-center py-4 px-1.5 md:p-4">
            <Image
                src="/images/logo.svg"
                alt="Loanee"
                width={150}
                height={50}
                className='max-md:max-w-32'
            />
            <button className='rounded-[0.5rem] max-md:font-semibold px-4 py-1 md:px-6 md:py-2 font-medium border border-[#000]'>
                About us
            </button>
        </header>
    )
}