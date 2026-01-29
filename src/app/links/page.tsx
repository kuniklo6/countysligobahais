import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Useful Links - County Sligo Bahá’ís",
    description: "Curated links to resources about the Bahá’í Faith.",
};

export default async function LinksPage() {
    const links = await client.fetch(groq`*[_type == "link"] | order(title asc)`);

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
            <div className="max-w-5xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-center md:text-left">Useful Links</h1>

                {links.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {links.map((link: any) => (
                            <a
                                key={link._id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-900 transition-all"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {link.title}
                                    </h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-zinc-400 group-hover:text-blue-500 transition-colors">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </div>
                                {link.description && (
                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                        {link.description}
                                    </p>
                                )}
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/50">
                        <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-600 dark:text-purple-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">No links yet</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
                            We haven't added any resources yet. Check back later!
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
