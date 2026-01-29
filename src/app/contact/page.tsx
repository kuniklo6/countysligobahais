import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - County Sligo Bahá’ís',
    description: 'Get in touch with the County Sligo Bahá’í Community regarding our activities, devotionals, and study circles.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
            <div className="max-w-4xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
                <div className="rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 md:p-12">
                    <div className="max-w-xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 text-center">
                            Contact Us
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 text-center">
                            Have a question or want to get involved? Send us a message and we'll get back to you as soon as possible.
                        </p>

                        <form
                            name="contact"
                            method="POST"
                            data-netlify="true"
                        // Netlify will redirect to a generic success page if action is omitted,
                        // or we can create a /success page. For now, default behavior is fine.
                        >
                            {/* Hidden input for Netlify to identify the form */}
                            <input type="hidden" name="form-name" value="contact" />

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={5}
                                        required
                                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-y"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-zinc-700 hover:scale-[1.02] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
