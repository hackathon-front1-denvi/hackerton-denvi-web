import type { Metadata } from 'next'

export const Title = '유어사주'

export const MetadataBase = new URL('https://denvi.com')

export const ShareImages = {} as const

export const metadataSet: Record<string, Metadata> = {
  ko: {
    title: 'DENVI',
    description: '',
    keywords: [],
  },
}

export const JsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '유어사주',
    url: 'https://denvi.com',
    logo: 'https://denvi.com/big_logo.png',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '유어사주',
    url: 'https://denvi.com',
    inLanguage: ['ko'],
  },
]

export const Manifest = '/favicon/manifest.json'

export const FaviconIcons = {
  icon: [{ url: '/favicon/favicon-196.png', type: 'image/png' }],
  apple: [{ url: '/favicon/apple-icon-180.png', type: 'image/png' }],
  other: [
    {
      rel: 'manifest',
      url: '/favicon/manifest.json',
    },
  ],
}

export const Other: Metadata['other'] = {
  'twitter:site': Title,
}
