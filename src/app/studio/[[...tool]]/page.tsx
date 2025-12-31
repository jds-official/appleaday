// src/app/studio/[[...tool]]/page.tsx
'use client';

import { NextStudio } from 'next-sanity/studio';
import { studioConfig } from '@/sanity/studio.config';

export default function StudioPage() {
  return <NextStudio config={studioConfig} />;
}
