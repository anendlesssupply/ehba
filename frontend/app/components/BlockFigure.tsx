import CustomImage from '@/app/components/CustomImage'
import {stegaClean} from 'next-sanity'
import {SimplePortableText} from './CustomPortableText'

export function BlockFigure(props: any = {}) {
  const {value} = props || {}

  if (!value?.asset?._ref) {
    return null
  }
  return (
    <figure className="grid grid-cols-1 gap-2 my-4 first:mt-0 last:mb-0">
      <div className="max-w-3xl">
        <CustomImage
          image={value}
          alt={stegaClean(value?.alt) || ''}
          sizes={'100vw, (min-width: 54rem) 54rem'}
        />
      </div>
      {Array.isArray(value?.caption) && value?.caption?.length > 0 && (
        <figcaption className="text-xs text-pretty">
          <SimplePortableText value={value?.caption} />
        </figcaption>
      )}
    </figure>
  )
}
