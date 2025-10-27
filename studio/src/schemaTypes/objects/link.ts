import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  options: {
    modal: {
      type: 'dialog',
    },
  },
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'href',
      options: {
        list: [
          {title: 'URL', value: 'href'},
          // {title: 'Home', value: 'home'},
          {title: 'Email', value: 'email'},
          {title: 'Page', value: 'page'},
          {title: 'Post', value: 'post'},
        ],
        layout: 'radio',
      },
    }),
    // Has Custom Title
    defineField({
      name: 'hasCustomTitle',
      title: 'Custom Link Text',
      description: 'By default we’ll use the title from the referenced document.',
      type: 'boolean',
      initialValue: false,
      hidden: ({document, parent}) => {
        if (
          ['href', 'email'].includes(parent?.linkType) ||
          (document?._type && !['settings', 'menu'].includes(document._type))
        ) {
          return true
        }
        return false
      },
    }),
    // Title
    defineField({
      name: 'title',
      title: 'Link Text',
      type: 'string',
      hidden: ({document, parent}) => {
        if (parent?.hasCustomTitle) {
          return false
        } else if (
          ['href', 'email'].includes(parent?.linkType) &&
          document?._type &&
          ['settings', 'menu'].includes(document?._type)
        ) {
          return false
        } else {
          return true
        }
      },
      validation: (Rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
        Rule.custom((value, context: any) => {
          if (context?.document?._type && !['settings', 'menu'].includes(context.document._type)) {
            return true
          }
          if (context.document._type === 'settings' && context?.path?.[1] === 'contact') {
            return true
          }
          if (context.parent?.linkType === 'href' && !value) {
            return 'Title is required when Link Type is URL'
          }
          if (context.parent?.linkType === 'email' && !value) {
            return 'Title is required when Link Type is Email'
          }
          return true
        }),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'href' && parent?.linkType != null,
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'href' && !value) {
            return 'URL is required when Link Type is URL'
          }
          return true
        }),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      hidden: ({parent}) => parent?.linkType !== 'email',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'email' && !value) {
            return 'Email is required when Link Type is email'
          }
          return true
        }),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({parent}) => parent?.linkType !== 'page',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'page' && !value) {
            return 'Page reference is required when Link Type is Page'
          }
          return true
        }),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      hidden: ({parent}) => parent?.linkType !== 'post',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'post' && !value) {
            return 'Post reference is required when Link Type is Post'
          }
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
