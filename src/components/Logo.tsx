import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
    return (
        <Link
            href="/"
            className="flex items-center gap-2"
        >
            <Image
                src="/tinystepsaday-logo.png"
                alt="TinyStepsADay Logo"
                width={30}
                height={30}
                className="z-10 animate-spin-slow drop-shadow-xl"
                priority
            />
            <span className="text-xl md:text-2xl font-bold text-primary">tinystepsaday</span>
        </Link>
    )
}
