import Link from 'next/link';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Devotionals', href: '/devotionals' },
    { name: 'About', href: '/about' },
    { name: 'Resources', href: '/resources' },
];

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
                {/* Logo */}
                <div className="flex shrink-0 items-center">
                    <Link
                        href="/"
                        className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        County Sligo Bahá’ís
                    </Link>
                </div>

                {/* Centered Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Side - Contact Button */}
                <div className="flex shrink-0 items-center justify-end">
                    <Link
                        href="/contact"
                        className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </header>
    );
}
