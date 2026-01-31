import '@/app/globals.css'

import Providers from '@/app/providers'
import { FaviconIcons, JsonLd, Manifest, MetadataBase, Other, Title, metadataSet } from '@/config/metadata'
import ChunkErrorHandler from '@/scripts/ChunkErrorHandler'
import { type Metadata, type Viewport } from 'next'
import localFont from 'next/font/local'
import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'

const sfprodisplay = localFont({
  src: [
    {
      path: '../assets/fonts/SFProDisplay.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SFProDisplayMedium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SFProDisplayBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SFProDisplayExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-sfprodisplay',
})

const nanumGothic = localFont({
  src: [
    {
      path: '../assets/fonts/NanumGothicLight.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NanumGothic.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NanumGothicBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/NanumGothicExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-nanum',
})

const cookierun = localFont({
  src: [
    {
      path: '../assets/fonts/CookieRun-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/CookieRun-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/CookieRun-Black.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-cookierun',
})

const blackHanSans = localFont({
  src: [
    {
      path: '../assets/fonts/BlackHanSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-blackhansans',
})

const gangwonEduPower = localFont({
  src: [
    {
      path: '../assets/fonts/GangwonEduPower.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-gangwon',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'contain', // AOS
}

export const metadata: Metadata = {
  metadataBase: MetadataBase,
  title: metadataSet.ko.title ?? Title,
  description: metadataSet.ko.description ?? '',
  keywords: metadataSet.ko.keywords,
  applicationName: Title,
  alternates: {
    canonical: '/',
  },
  icons: FaviconIcons,
  manifest: Manifest,
  other: Other,
  openGraph: {
    siteName: Title,
    type: 'website',
    url: 'https://denvi.com',
    title: metadataSet.ko.title ?? Title,
    description: metadataSet.ko.description ?? '',
    locale: 'ko_KR',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: metadataSet.ko.title ?? Title,
    description: metadataSet.ko.description ?? '',
    images: [],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={'ko'} className="no-scrollbar">
      <head>
        <meta name="google-site-verification" content="d83HEDq6IONP2gQIJaYQ2YigaY_cdr-qWZz04P4iP50" />
        <meta name="naver-site-verification" content="f448446de69bab72b4e64774b7e42e5af4e37e78" />
        <meta name="msvalidate.01" content="75C0A176C3DFBC03357C823EA1553838" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "v9lo5xrv7b");`,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DW8XZ7XX6R" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-DW8XZ7XX6R');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N8FVGTSX');`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JsonLd) }} />
      </head>
      <body
        className={`${nanumGothic.variable} ${cookierun.variable} ${blackHanSans.variable} ${gangwonEduPower.variable} antialiased 
        overflow-x-hidden`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N8FVGTSX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ChunkErrorHandler />
        {/* <GoogleTagManager /> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
