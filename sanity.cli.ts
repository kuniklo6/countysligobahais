/**
* This configuration file defines the existing project information for use with the Sanity CLI.
*
* It's used when you run `sanity` commands from the command line.
*
* https://www.sanity.io/docs/cli-config-file
*/

import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({
    api: { projectId, dataset },
})
