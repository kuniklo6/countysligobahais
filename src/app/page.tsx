import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

export default async function Home() {
  const data = await client.fetch(groq`*[_type == "home"][0]`);



  if (!data) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 text-center text-gray-500">
        No home page data found. Please publish the Home document in Sanity Studio.
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      <article className="max-w-5xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <header className="mb-16 text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {data.title}
          </h1>

          {data.heroImage && (
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-xl ring-1 ring-zinc-900/5 dark:ring-white/10">
              <Image
                src={urlFor(data.heroImage).width(1200).height(675).url()}
                alt={data.title || "Hero Image"}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          )}
        </header>

        {data.content && (
          <div className="prose prose-lg md:prose-xl max-w-none prose-zinc dark:prose-invert mx-auto
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-white
            prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-300
            prose-strong:font-bold prose-strong:text-zinc-900 dark:prose-strong:text-white
            prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-lg">
            <PortableText value={data.content} />
          </div>
        )}
      </article>
    </main>
  );
}
