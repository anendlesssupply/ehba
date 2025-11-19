import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {toPlainText, type PortableTextBlock} from 'next-sanity'
import {Suspense} from 'react'

import {MorePosts} from '@/app/components/Posts'
import CustomPortableText from '@/app/components/CustomPortableText'
import {sanityFetch} from '@/sanity/lib/live'
import {postPagesSlugs, postQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import Link from 'next/link'
import IconClose from '@/app/components/IconClose'
import DateComponent from '@/app/components/Date'

type Props = {
  params: Promise<{slug: string}>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: postPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: post} = await sanityFetch({
    query: postQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(post?.ogImage)

  return {
    title: post?.title,
    description: toPlainText(post?.description ?? []),
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function PostPage(props: Props) {
  const params = await props.params
  const [{data: post}] = await Promise.all([sanityFetch({query: postQuery, params})])

  if (!post?._id) {
    return notFound()
  }

  return (
    <>
      <div className="grid gap-6 lg:gap-8 mb-12 mt-4 lg:mt-12">
        <div
          // className="hidden lg:block px-4 lg:px-10 lg:fixed lg:top-50"
          className="px-4 lg:px-10"
        >
          <Link href="/" className="text-base hover:text-gray dark:hover:text-dark-gray">
            {/* <IconClose className="w-10 h-10" /> */}
            <span aria-hidden>&larr;</span> Home
          </Link>
        </div>
        <div className="px-4 lg:px-10">
          <div className="w-full lg:max-w-3xl mx-auto grid gap-4">
            <h2 className="font-display text-3xl lg:text-3xl">{post.title}</h2>
            {post?.date && (
              <time dateTime={post.date} className="text-base">
                <DateComponent dateString={post.date} />
              </time>
            )}
          </div>
        </div>

        <article className="px-4 lg:px-10 my-4">
          {post.content?.length && (
            <CustomPortableText
              className="lg:max-w-3xl mx-auto grid gap-4"
              value={post.content as PortableTextBlock[]}
            />
          )}
        </article>
      </div>
    </>
  )
}
