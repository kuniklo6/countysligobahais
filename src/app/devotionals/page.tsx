import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

// Re-validate every 60 seconds (or you could use 0 for dynamic)
export const revalidate = 60;

export default async function DevotionalsPage() {
    const devotionals = await client.fetch(groq`*[_type == "devotional"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    location,
    image,
    description
  }`);

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
            <div className="max-w-5xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
                        Devotional Gatherings
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Join us for prayers, music, and spiritual fellowship in communities across County Sligo.
                    </p>
                </header>

                {devotionals.length === 0 ? (
                    <div className="text-center py-12 px-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-500 dark:text-zinc-400">
                            No upcoming devotionals listed yet. Please check back soon or visit the Studio to add one.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-12">
                        {devotionals.map((event: any) => (
                            <article
                                key={event._id}
                                className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all p-2 gap-6 md:gap-8"
                            >
                                {/* Image - Larger and on the side for desktop */}
                                {event.image && (
                                    <div className="relative w-full md:w-2/5 min-h-[300px] md:min-h-auto aspect-[16/10] md:aspect-auto overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
                                        <Image
                                            src={urlFor(event.image).width(800).height(800).url()}
                                            alt={event.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                )}

                                {/* Content - Much more space */}
                                <div className="flex flex-1 flex-col justify-center items-center text-center py-4 pr-4 pl-2 md:pl-0">


                                    <h2 className="mb-4 text-3xl font-extrabold leading-tight text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {event.title}
                                    </h2>

                                    {event.location && (
                                        <div className="mb-4 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            <span className="text-lg">{event.location}</span>
                                        </div>
                                    )}

                                    {event.description && (
                                        <div className="prose prose-lg text-left text-zinc-600 dark:text-zinc-400 dark:prose-invert">
                                            <PortableText value={event.description} />
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
