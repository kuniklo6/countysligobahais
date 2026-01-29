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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-20 md:h-32 max-w-7xl items-center px-6 sm:px-8 lg:px-12">
                {/* Logo - Left Section */}
                <div className="flex flex-1 items-center justify-start">
                    <Link
                        href="/"
                        className="text-xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        County Sligo Bahá’ís
                    </Link>
                </div>

                {/* Navigation - Center Section (Desktop) */}
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

                {/* Right Section */}
                <div className="flex flex-1 items-center justify-end gap-4">
                    {/* Contact Button (Desktop) */}
                    <Link
                        href="/contact"
                        className="hidden md:block rounded-full bg-zinc-900 px-7 py-3 text-base font-medium text-white transition-all hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        Contact Us
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700 dark:text-zinc-200"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {mobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <div className="space-y-1 px-6 py-6 pb-20">
                        {navigation.map((item) => (
                            <div key={item.name}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                                            className="flex w-full items-center justify-between rounded-lg py-3 text-base font-semibold leading-7 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                        >
                                            {item.name}
                                            <svg
                                                className={`h-5 w-5 flex-none transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`}
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-4.14a.75.75 0 111.08 1.04l-4.25 4.75a.75.75 0 01-1.08 0l-4.25-4.75a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        {mobileResourcesOpen && (
                                            <div className="mt-2 space-y-2 pl-4">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                             <Link
                                href="/contact"
                                className="block w-full rounded-full bg-zinc-900 px-3.5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
