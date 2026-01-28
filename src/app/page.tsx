import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

export default async function Home() {
  const data = await client.fetch(groq`*[_type == "home"][0]{
    title,
    heroImage,
    content
  }`);

  if (!data) return <div className="p-8">No home page data found. Please publish the Home document in Sanity Studio.</div>;

  return (
    <main className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-8">{data.title}</h1>
      {data.heroImage && (
        <div className="mb-8">
          <Image
            src={urlFor(data.heroImage).width(800).url()}
            alt={data.title || "Hero Image"}
            width={800}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}
      {data.content && (
        <div className="prose dark:prose-invert lg:prose-xl">
          <PortableText value={data.content} />
        </div>
      )}
    </main>
  );
}
