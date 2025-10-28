import {Suspense} from 'react'
import CustomPortableText, {SimplePortableText} from '@/app/components/CustomPortableText'

import {AllPosts} from '@/app/components/Posts'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import CustomImage from './components/CustomImage'
import {stegaClean} from 'next-sanity'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <>
      <div className="px-4 lg:px-10">
        {settings?.coverImage && (
          <figure className="grid grid-cols-1 gap-2 mb-12">
            <div>
              <CustomImage
                className="h-[80vh] sm:h-auto sm:aspect-3/2 object-cover grayscale"
                image={settings?.coverImage}
                alt={stegaClean(settings?.coverImage?.alt) || ''}
                sizes="100vw"
              />
            </div>
            {Array.isArray(settings?.coverImage?.caption) &&
              settings?.coverImage?.caption?.length > 0 && (
                <figcaption className="text-xs text-pretty max-w-3xl mx-auto w-full">
                  <SimplePortableText value={settings?.coverImage?.caption as any} />
                </figcaption>
              )}
          </figure>
        )}

        <div className="max-w-3xl mx-auto w-full">
          {settings?.content && (
            <CustomPortableText
              className="text-3xl lg:text-4xl text-pretty"
              value={settings.content as any}
            />
          )}
        </div>
      </div>
      <Suspense>{await AllPosts()}</Suspense>
    </>
  )
}
