import Link from "next/link"

export default function Header() {
    return (
        <div className="h-20 bg-white border-b border-red-50">
            <Link className="flex flex-row justify-center items-center h-full py-2" href="/">
                <img className="logo" src="/vercel.svg" alt="logo" />
                <div className="ml-3 text-3xl font-bold hover:font-sky">Home</div>
            </Link>
        </div>
    )
}