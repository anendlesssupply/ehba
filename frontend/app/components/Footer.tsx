import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import CustomPortableText from './CustomPortableText'

export default async function Footer() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })
  if (!settings?.footer) {
    return null
  }

  return (
    <header className="px-4 lg:px-10 py-8 bg-sky-blue dark:bg-olive">
      <div className="grid lg:max-w-3xl mx-auto">
        {settings?.footer && (
          <CustomPortableText className="text-sm" value={settings.footer as any} />
        )}
        {/* <p className="text-xs mt-8">
          Font:
          <br />
          Karrik by Jean-Baptiste Morizot, Lucas Le Bihan. Distributed by velvetyne.fr.
        </p> */}
      </div>
    </header>
  )
}
