import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {blocksToText} from '../../lib/utils'

export const figure = defineType({
  type: 'image',
  name: 'figure',
  title: 'Image',
  icon: ImageIcon,
  fields: [
    defineField({
      type: 'blockText',
      name: 'caption',
      title: 'Caption',
      description: 'Text appears below the image.',
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessibility.',
    }),
  ],
  options: {
    hotspot: true,
  },
  preview: {
    select: {
      media: 'asset',
      caption: 'caption',
      alt: 'alt',
    },
    prepare({media, alt, caption}) {
      const title = blocksToText(caption)
      return {
        title: title || alt || 'Uncaptioned Image',
        subtitle: 'Image',
        media,
      }
    },
  },
})
