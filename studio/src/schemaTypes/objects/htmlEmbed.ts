import {CodeBlockIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const htmlEmbed = defineType({
  name: 'htmlEmbed',
  title: 'HTML Embed',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'html',
      title: 'HTML',
      type: 'text',
      description:
        'You usually want to avoid storing freeform HTML, but for embed codes it can be useful.',
    }),
  ],
  preview: {
    select: {
      html: 'html',
    },
    prepare(selection) {
      const {html} = selection
      return {
        title: 'HTML Embed',
        subtitle: html || 'No HTML',
      }
    },
  },
})
