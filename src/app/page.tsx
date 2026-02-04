import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { SanityDocument } from "next-sanity";

export const revalidate = 60; // revalidate every minute

export default async function Home() {
  const data = await sanityFetch<SanityDocument>({
    query: groq`*[_type == "home"][0]`
  });



  if (!data) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 text-center text-gray-500">
        No home page data found. Please publish the Home document in Sanity Studio.
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      <div className="max-w-5xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12">
          <article className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all p-2 gap-6 md:gap-8">

            {/* Image - Left Side */}
            {data.heroImage && (
              <div className="relative w-full md:w-2/5 min-h-[300px] md:min-h-auto aspect-[16/10] md:aspect-auto overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
                <Image
                  src={urlFor(data.heroImage).width(800).height(800).url()}
                  alt={data.title || "Hero Image"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            )}

            {/* Content - Right Side */}
            <div className="flex flex-1 flex-col justify-center items-center text-center py-4 pr-4 pl-2 md:pl-0">
              <h1 className="mb-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {data.title}
              </h1>

              {data.content && (
                <div className="prose prose-lg text-left text-zinc-600 dark:text-zinc-400 dark:prose-invert">
                  <PortableText value={data.content} />
                </div>
              )}
            </div>

          </article>
        </div>
      </div>
    </main>
  );
}
