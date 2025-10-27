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
    <header className="sticky top-0 z-50">
      <div className="p-4 grid gap-4">
        <Link href="/" title={settings?.title || 'EHBA'}>
          <span className="flex w-auto h-12 aspect-783/129">
            <IconLogo className="w-full h-full" />
            {/* {settings?.title || 'EHBA'} */}
          </span>
        </Link>
        <MenuItems menuItems={settings?.menuItems || []} />
      </div>
    </header>
  )
}
