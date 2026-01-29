import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Videos - County Sligo Bahá’ís",
    description: "Watch videos from the County Sligo Bahá’í Community and the worldwide Bahá’í Faith.",
};

export default async function VideosPage() {
    const videos = await client.fetch(groq`*[_type == "video"] | order(publishedAt desc)`);

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
            <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-center md:text-left">Videos</h1>

                {videos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((video: any) => (
                            <div key={video._id} className="group flex flex-col bg-zinc-50 dark:bg-zinc-900 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg">
                                {/* Video Embed/Link Placeholder */}
                                <div className="aspect-video w-full bg-zinc-200 dark:bg-zinc-800 relative flex items-center justify-center">
                                    {/* Simple Youtube Embed or Link */}
                                    {video.url?.includes('youtube.com') || video.url?.includes('youtu.be') ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${getYouTubeId(video.url)}`}
                                            className="w-full h-full"
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 dark:bg-white/5 dark:group-hover:bg-white/10 transition-colors">
                                            <div className="rounded-full bg-white/90 dark:bg-zinc-950/90 p-4 shadow-lg backdrop-blur-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-zinc-900 dark:text-white ml-1">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                                </svg>
                                            </div>
                                        </a>
                                    )}
                                </div>

                                <div className="p-6 flex flex-1 flex-col">
                                    <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        <a href={video.url} target="_blank" rel="noopener noreferrer">{video.title}</a>
                                    </h3>
                                    {video.description && (
                                        <p className="text-base text-zinc-600 dark:text-zinc-400 line-clamp-3">
                                            {video.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/50">
                        <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 dark:text-blue-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">No videos yet</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
                            Check back soon for videos from our community, or add some in the Sanity Studio.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}

function getYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
