import "server-only";

import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import type { QueryParams } from "next-sanity";
import { draftMode } from "next/headers";

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export async function sanityFetch<QueryResponse>({
    query,
    params = DEFAULT_PARAMS,
    tags = DEFAULT_TAGS,
}: {
    query: string;
    params?: QueryParams;
    tags?: string[];
}): Promise<QueryResponse> {
    const isDraftMode = (await draftMode()).isEnabled

    if (isDraftMode && !token) {
        throw new Error(
            "The `SANITY_API_READ_TOKEN` environment variable is required."
        );
    }

    // Use the token for draft mode fetches to bypass caching and get latest drafts
    // AND stega (if configured in client)
    return client.fetch<QueryResponse>(query, params, {
        ...(isDraftMode && {
            token: token,
            perspective: 'previewDrafts',
            stega: true, // Force stega (visual editing) markings
            useCdn: false
        }),
        next: {
            revalidate: isDraftMode ? 0 : 60, // Ensure fresh data in draft mode
            tags,
        },
    });
}
