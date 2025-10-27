import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'
import {blocksToText} from '../../lib/utils'

export const standardText = defineType({
  name: 'standardText',
  title: 'Standard Text',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({content}) {
      const title = blocksToText(content)
      return {
        title: title || 'Untitled Standard Text',
        subtitle: 'Standard Text',
      }
    },
  },
})
