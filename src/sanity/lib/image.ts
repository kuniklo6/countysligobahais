import { createImageUrlBuilder } from '@sanity/image-url'
import { type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const projectIdStr = projectId || '';
const datasetStr = dataset || '';

if (!projectIdStr || !datasetStr) {
    console.warn('Missing projectId or dataset in sanity/image-url builder config');
}

const builder = createImageUrlBuilder({ projectId: projectIdStr, dataset: datasetStr })

export const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
}
