import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 60; // revalidate every minute

export async function generateMetadata(): Promise<Metadata> {
    const data = await client.fetch(groq`*[_type == "about"][0]`);
    return {
        title: data?.title || "About Us - County Sligo Bahá’ís",
        description: "Learn about the County Sligo Bahá’í Community, our history, and our activities.",
    };
}

export default async function AboutPage() {
    const data = await client.fetch(groq`*[_type == "about"][0]`);

    // Fallback content if no document is found in Sanity
    const fallbackData = {
        title: "About the County Sligo Bahá’í Community",
        content: null, // We'll handle null content with a specific fallback view
    };

    const title = data?.title || fallbackData.title;
    const imageUrl = data?.mainImage ? urlFor(data.mainImage).width(1200).height(600).url() : null;

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
            <div className="max-w-4xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
                <div className="rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 md:p-12">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8 text-center md:text-left">
                        {title}
                    </h1>
                    {data?.content ? (
                        <div className="prose prose-lg prose-zinc dark:prose-invert mx-auto">
                            <PortableText value={data.content} />
                        </div>
                    ) : (
                        <div className="space-y-8 text-center md:text-left">
                            {!data && (
                                <div className="p-4 mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 text-sm">
                                    <strong>Admin Note:</strong> This is a placeholder page. Create a document of type <strong>About</strong> in your Sanity Studio to populate this page with real content.
                                </div>
                            )}

                            <section className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
                                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    The Bahá’í community of County Sligo is part of the worldwide Bahá’í Faith,
                                    a religion dedicated to the unity of humanity, the oneness of God, and the oneness of religion.
                                    We are composed of people from all walks of life, joined together by a shared belief in
                                    Bahá’u’lláh’s vision of a peaceful and just global society.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight">What We Do</h2>
                                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    Our community activities include devotional gatherings, study circles, children’s classes, and
                                    junior youth groups. These activities are open to all and aim to build vibrant, community-oriented
                                    neighborhoods where service to others is the central theme.
                                </p>
                            </section>

                            <div className="pt-8 flex justify-center md:justify-start">
                                <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-zinc-700 hover:scale-105 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                                    Get in Touch
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
