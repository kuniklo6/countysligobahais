import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await client.fetch(groq`*[_type == "post" && slug.current == $slug][0]`, { slug });

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: `${post.title} - County Sligo Bahá’ís`,
        description: post.excerpt || "Read this article on our blog.",
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await client.fetch(groq`*[_type == "post" && slug.current == $slug][0]`, { slug });

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
            <article className="max-w-3xl mx-auto py-16 px-6 sm:px-8 lg:px-12">

                <div className="mb-10 text-center">
                    <Link href="/blog" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
                        </svg>
                        Back to Blog
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900 dark:text-white">
                        {post.title}
                    </h1>

                    {post.publishedAt && (
                        <time dateTime={post.publishedAt} className="text-zinc-500 dark:text-zinc-400">
                            {new Date(post.publishedAt).toLocaleDateString('en-IE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    )}
                </div>

                {post.mainImage && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800 mb-12 shadow-md">
                        <Image
                            src={urlFor(post.mainImage).width(1200).height(675).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="prose prose-lg prose-zinc dark:prose-invert mx-auto">
                    {post.body ? <PortableText value={post.body} /> : <p>No content available for this post.</p>}
                </div>

            </article>
        </main>
    );
}
