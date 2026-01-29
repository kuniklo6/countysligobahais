'use client';

import Link from 'next/link';
import { useState } from 'react';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Devotionals', href: '/devotionals' },
    { name: 'About', href: '/about' },
    {
        name: 'Resources',
        href: '#', // Changed to # as it is now a menu trigger
        children: [
            { name: 'Blog', href: '/blog' },
            { name: 'Links', href: '/links' },
            { name: 'Videos', href: '/videos' },
        ],
    },
];

export default function Header() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-32 max-w-7xl items-center px-6 sm:px-8 lg:px-12">
                {/* Logo - Left Section */}
                <div className="flex flex-1 items-center justify-start">
                    <Link
                        href="/"
                        className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        County Sligo Bahá’ís
                    </Link>
                </div>

                {/* Navigation - Center Section */}
                <nav className="hidden md:flex items-center justify-center gap-10">
                    {navigation.map((item, index) => (
                        <div
                            key={item.name}
                            className="relative group h-full flex items-center"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <Link
                                href={item.href}
                                className="text-lg font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-4 flex items-center gap-1"
                                onClick={(e) => {
                                    if (item.children) e.preventDefault();
                                }}
                            >
                                {item.name}
                                {item.children && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${hoveredIndex === index ? 'rotate-180' : ''}`}>
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                )}
                            </Link>

                            {/* Dropdown Menu */}
                            {item.children && (
                                <div
                                    className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-48 transition-all duration-200 ease-in-out ${hoveredIndex === index
                                            ? 'opacity-100 visible translate-y-0'
                                            : 'opacity-0 invisible -translate-y-2'
                                        }`}
                                >
                                    <div className="overflow-hidden rounded-xl bg-white dark:bg-zinc-900 shadow-xl ring-1 ring-zinc-900/5 dark:ring-white/10 p-2">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className="block rounded-lg px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Contact Button - Right Section */}
                <div className="flex flex-1 items-center justify-end">
                    <Link
                        href="/contact"
                        className="rounded-full bg-zinc-900 px-7 py-3 text-base font-medium text-white transition-all hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </header>
    );
}
