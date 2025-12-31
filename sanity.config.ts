// sanity.config.ts (in root)
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { appleType } from './src/sanity/schemaTypes/apple'

export default defineConfig({
  name: 'default',
  title: 'Apple a Day',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: [appleType], // Use it directly here
  },
})
