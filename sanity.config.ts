// sanity.config.ts (in root)
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
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
  ],

  schema: {
    types: [appleType], // Use it directly here
  },
})