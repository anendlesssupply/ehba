import Link from 'next/link'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import MenuItems from './MenuItems'
import IconLogo from './IconLogo'

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <header
      className="px-4 pt-8 pb-12 lg:pt-12 lg:px-10 lg:sticky lg:top-0 lg:z-50"
      // bg-off-white dark:bg-black
    >
      <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-baseline">
        <div>
          <Link
            href="/"
            title={settings?.title || 'EHBA'}
            className="flex w-auto h-11 aspect-783/129 hover:opacity-70"
          >
            <IconLogo className="w-full h-full" />
          </Link>
        </div>
        <MenuItems menuItems={settings?.menuItems || []} />
      </div>
    </header>
  )
}
