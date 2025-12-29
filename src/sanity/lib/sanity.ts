// src/lib/sanity.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function getApples() {
  return client.fetch(`
    *[_type == "apple"] | order(date asc) {
      _id,
      date,
      appleName,
      "slug": slug.current,
      description,
      stats,
      "imageUrl": image.asset->url
    }
  `)
}