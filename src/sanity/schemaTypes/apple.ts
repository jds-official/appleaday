// sanity/schemaTypes/apple.ts
import { defineType, defineField } from 'sanity'

export const appleType = defineType({
  name: 'apple',
  title: 'Apple',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'appleName',
      title: 'Apple Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'appleName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'color',
      options: {
        disableAlpha: true, // Remove transparency option
      },
      initialValue: {
        hex: '#ec1d25', // Default red
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        {
          name: 'crunchiness',
          title: 'Crunchiness',
          type: 'string',
          options: {
            list: [
              { title: 'E', value: 'E' },
              { title: 'D', value: 'D' },
              { title: 'C', value: 'C' },
              { title: 'B', value: 'B' },
              { title: 'A', value: 'A' },
              { title: 'S', value: 'S' },
            ],
          },
          initialValue: 'C',
        },
        {
          name: 'sweetness',
          title: 'Sweetness',
          type: 'string',
          options: {
            list: ['E', 'D', 'C', 'B', 'A', 'S'],
          },
          initialValue: 'C',
        },
        {
          name: 'durability',
          title: 'Durability',
          type: 'string',
          options: {
            list: ['E', 'D', 'C', 'B', 'A', 'S'],
          },
          initialValue: 'C',
        },
        {
          name: 'crispiness',
          title: 'Crispiness',
          type: 'string',
          options: {
            list: ['E', 'D', 'C', 'B', 'A', 'S'],
          },
          initialValue: 'C',
        },
        {
          name: 'vibes',
          title: 'Vibes',
          type: 'string',
          options: {
            list: ['E', 'D', 'C', 'B', 'A', 'S'],
          },
          initialValue: 'C',
        },
        {
          name: 'appleal',
          title: 'Appleal',
          type: 'string',
          options: {
            list: ['E', 'D', 'C', 'B', 'A', 'S'],
          },
          initialValue: 'C',
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Apple Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'appleName',
      subtitle: 'date',
      media: 'image',
    },
  },
})