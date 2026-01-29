import { defineField, defineType } from 'sanity'

export const devotional = defineType({
    name: 'devotional',
    title: 'Devotional',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date & Time',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            date: 'date',
            media: 'image',
        },
        prepare({ title, date, media }) {
            return {
                title,
                subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
                media,
            }
        },
    },
})
