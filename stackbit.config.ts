import { defineStackbitConfig } from "@stackbit/types";
import { SanityContentSource } from "@stackbit/cms-sanity";

export default defineStackbitConfig({
    stackbitVersion: "~0.6.0",
    ssgName: "nextjs",
    nodeVersion: "20",
    contentSources: [
        new SanityContentSource({
            rootPath: __dirname,
            studioPath: __dirname + "/studio",
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
            token: process.env.SANITY_ACCESS_TOKEN!,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
            studioUrl: "https://county-sligo-bahais.netlify.app/studio",
            studioInstallCommand: "npm install && node fix-sanity.js",
        }),
    ],
    modelExtensions: [
        { name: "home", type: "page", urlPath: "/" },
        { name: "about", type: "page", urlPath: "/about" },
        { name: "post", type: "page", urlPath: "/blog/{slug}" },
    ],
});
