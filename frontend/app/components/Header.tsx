import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import MenuItems from './MenuItems'

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <header className="px-4 pt-8 pb-8 lg:pt-12 lg:px-10 lg:sticky lg:top-0 lg:z-50 bg-white dark:bg-dark-black lg:bg-transparent">
      <MenuItems title={settings?.title} menuItems={settings?.menuItems || []} />
    </header>
  )
}
