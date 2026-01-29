import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Blog - County Sligo Bahá’ís",
    description: "Read the latest news and writings from the County Sligo Bahá’í Community.",
};

export default async function BlogPage() {
    const posts = await client.fetch(groq`*[_type == "post"] | order(publishedAt desc)`);

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
            <div className="max-w-6xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-center md:text-left">Latest News</h1>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-12">
                        {posts.map((post: any) => (
                            <article key={post._id} className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start cursor-pointer">
                                {/* Image */}
                                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                                    {post.mainImage ? (
                                        <Image
                                            src={urlFor(post.mainImage).width(800).height(450).url()}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-zinc-300 dark:text-zinc-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-x-4 text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                                        <time dateTime={post.publishedAt}>
                                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IE', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }) : 'Unpublished'}
                                        </time>
                                    </div>
                                    <h3 className="mt-0 text-2xl font-bold leading-8 text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        <Link href={`/blog/${post.slug.current}`}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </Link>
                                    </h3>
                                    {post.excerpt && (
                                        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    )}
                                    <div className="mt-6 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                                        Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1">
                                            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.5a.75.75 0 0 1 0 1.08l-5.5 5.5a.75.75 0 1 1-1.04-1.08l4.158-4.17H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/50">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600 dark:text-green-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">No posts yet</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
                            Our blog is coming soon! Stay tuned for updates and stories.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
