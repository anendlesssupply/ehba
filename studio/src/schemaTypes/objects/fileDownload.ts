import {DownloadIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const fileDownload = defineType({
  name: 'fileDownload',
  title: 'File Download',
  type: 'object',
  icon: DownloadIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The name of the file, used for the download button text',
    }),
    defineField({
      title: 'File',
      name: 'file',
      type: 'file',
      description: 'The file, e.g. a PDF',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: 'File Download',
        subtitle: `Title: ${title}`,
      }
    },
  },
})
