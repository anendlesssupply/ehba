import './globals.css'

import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {toPlainText} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import Header from '@/app/components/Header'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {handleError} from './client-utils'

import localFont from 'next/font/local'
import {AppProvider} from '@/app/app-provider'
import Footer from './components/Footer'

const sans = localFont({
  variable: '--font-sans',
  src: [
    {
      path: './fonts/AtlasGrotesk-Regular-Web.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/AtlasGrotesk-Medium-Web.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  fallback: ['Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  })
  const title = settings?.title || 'EHBA'
  const description = settings?.description || []

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="en" className={sans.variable}>
      <body className="text-lg lg:text-xl">
        <AppProvider>
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive
          // onError={handleError}
          />
          <section className="grid grid-cols-1 items-start">
            <Header />
            <main className="grid grid-cols-1 items-start gap-6 lg:gap-8">{children}</main>
            <Footer />
          </section>
        </AppProvider>
      </body>
    </html>
  )
}
