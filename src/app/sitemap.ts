import type { MetadataRoute } from 'next'

import { env } from '@/shared/lib/env'

const baseUrl = env.app.url

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return []
}
