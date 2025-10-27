import {type PortableTextBlock} from 'next-sanity'

import CustomPortableText from '@/app/components/CustomPortableText'
import {StandardText as StandardTextPayload} from '@/sanity.types'

type InfoProps = {
  block: StandardTextPayload
  index: number
}

export default function StandardText({block}: InfoProps) {
  return (
    <div className="my-4 px-4">
      {block?.content?.length && (
        <CustomPortableText
          className="max-w-2xl grid gap-4"
          value={block.content as PortableTextBlock[]}
        />
      )}
    </div>
  )
}
