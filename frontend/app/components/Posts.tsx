import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/live'
import {morePostsQuery, allPostsQuery} from '@/sanity/lib/queries'
import {Post as PostType, AllPostsQueryResult} from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import {createDataAttribute} from 'next-sanity'

const Post = ({post}: {post: AllPostsQueryResult[number]}) => {
  const {_id, title, slug, date} = post

  const attr = createDataAttribute({
    id: _id,
    type: 'post',
    path: 'title',
  })

  return (
    <article data-sanity={attr()} key={_id}>
      <Link className="hover:opacity-70" href={`/posts/${slug}`}>
        <h3>{title}</h3>
        {date && (
          <time dateTime={date} className="text-base">
            <DateComponent dateString={date} />
          </time>
        )}
      </Link>
    </article>
  )
}

const Posts = ({children, heading}: {children: React.ReactNode; heading?: string}) => (
  <div className="px-4 lg:px-10 py-8 bg-yellow dark:bg-grey-brown ">
    <div className="grid grid-cols-1 gap-6 lg:gap-8 max-w-3xl mx-auto w-full">
      {heading && <h2 className="text-3xl">{heading}</h2>}
      <div className="grid grid-cols-1 gap-6 lg:gap-8">{children}</div>
    </div>
  </div>
)

export const MorePosts = async ({skip, limit}: {skip: string; limit: number}) => {
  const {data} = await sanityFetch({
    query: morePostsQuery,
    params: {skip, limit},
  })

  if (!data || data.length === 0) {
    return null
  }

  return (
    <Posts heading={`Recent Posts (${data?.length})`}>
      {data?.map((post: any) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}

export const AllPosts = async () => {
  const {data} = await sanityFetch({query: allPostsQuery})

  if (!data || data.length === 0) {
    return null
  }

  return (
    <Posts heading="Announcements">
      {data.map((post: any) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}
