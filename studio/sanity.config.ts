import { presentationTool } from 'sanity/presentation'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './schemaTypes'

export default defineConfig({
    name: 'default',
    title: 'County Sligo Bahais',

    projectId: 'pffyawrp',
    dataset: 'production',

    plugins: [
        structureTool(),
        visionTool(),
        presentationTool({
            previewUrl: {
                origin: typeof location === 'undefined' ? 'http://localhost:3000' : location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://county-sligo-bahais.netlify.app',
                previewMode: {
                    enable: '/api/draft',
                },
            },
        }),
    ],

    schema: {
        types: schema.types,
    },
})
