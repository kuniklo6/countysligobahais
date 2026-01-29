'use client';

import { useActionState, useEffect } from 'react';
import { sendEmail } from './actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-zinc-700 hover:scale-[1.02] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? 'Sending...' : 'Send Message'}
        </button>
    );
}

export default function ContactPage() {
    const [state, action] = useActionState(sendEmail, null);

    useEffect(() => {
        if (state?.success) {
            // Create a more robust way to reset the form if possible, but for now native reset works for uncontrolled inputs
            (document.getElementById('contact-form') as HTMLFormElement)?.reset();
        }
    }, [state?.success]);

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
                            id="contact-form"
                            action={action}
                            className="space-y-6"
                        >
                            {state?.error && (
                                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xl font-medium text-center">
                                    {state.error}
                                </div>
                            )}

                            {state?.success && (
                                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xl font-medium text-center">
                                    Message sent successfully! We'll get back to you soon.
                                </div>
                            )}

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
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
                                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
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
                                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-y disabled:opacity-50"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <SubmitButton />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
