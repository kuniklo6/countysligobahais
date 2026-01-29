import { type SchemaTypeDefinition } from 'sanity'
import { devotional } from './devotional'
import { home } from './home'
import { post } from './post'
import { about } from './about'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [home, post, devotional, about],
}
