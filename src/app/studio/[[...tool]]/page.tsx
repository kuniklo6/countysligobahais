/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path will be handled by this file using Next.js's 
 * Optional Catch-all Routes feature. For more information, see the documentation:
 * https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
    return (
        <>
            <script src="https://core.sanity-cdn.com/bridge.js" async type="module" />
            <NextStudio config={config} />
        </>
    )
}
