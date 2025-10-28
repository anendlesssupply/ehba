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
    <header className="px-4 pt-8 pb-8 lg:pt-12 lg:px-10 sticky top-0 z-50 bg-white lg:bg-none">
      <MenuItems title={settings?.title} menuItems={settings?.menuItems || []} />
    </header>
  )
}
