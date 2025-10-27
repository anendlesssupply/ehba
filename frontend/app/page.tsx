import {Suspense} from 'react'
import CustomPortableText from '@/app/components/CustomPortableText'

import {AllPosts} from '@/app/components/Posts'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <>
      <div className="p-4">
        <div className="max-w-2xl text-pretty">
          {settings?.content && <CustomPortableText value={settings.content as any} />}
        </div>
      </div>
      <div>
        <aside>
          <Suspense>{await AllPosts()}</Suspense>
        </aside>
      </div>
    </>
  )
}
