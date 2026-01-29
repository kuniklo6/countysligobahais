import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Home')
                .child(
                    S.document()
                        .schemaType('home')
                        .documentId('home')
                ),
            S.listItem()
                .title('About')
                .child(
                    S.document()
                        .schemaType('about')
                        .documentId('about')
                ),
            ...S.documentTypeListItems().filter(
                (item) => item.getId() !== 'home' && item.getId() !== 'about'
            ),
        ])
