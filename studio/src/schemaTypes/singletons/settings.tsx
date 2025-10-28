import {CogIcon, LinkIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your blog.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // Menu Items
    defineField({
      name: 'menuItems',
      description: 'Menu items in site header.',
      title: 'Menu Items',
      type: 'array',
      of: [
        defineField({
          name: 'menuItem',
          title: 'Menu Item',
          type: 'object',
          icon: LinkIcon,
          fields: [
            defineField({
              name: 'link',
              title: 'Button link',
              type: 'link',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              hasCustomTitle: 'link.hasCustomTitle',
              linkType: 'link.linkType',
              linkTitle: 'link.title',
              pageTitle: 'link.page.title',
              postTitle: 'link.post.title',
              backgroundColor: 'backgroundColor',
            },
            prepare(selection) {
              const {
                hasCustomTitle = false,
                linkType,
                linkTitle = 'Link',
                pageTitle = '',
                postTitle = '',
              } = selection

              let title = ''
              switch (linkType) {
                case 'post':
                  title = postTitle ?? 'Link'
                  break
                case 'page':
                  title = pageTitle ?? 'Link'
                  break
              }
              if (hasCustomTitle || !title) {
                title = linkTitle
              }
              return {
                title,
                subtitle: `Menu Item`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'figure',
      description: 'Used on the Homepage',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      description: 'Used on the Homepage',
      type: 'blockContent',
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      description: 'Used for the Site Footer',
      type: 'blockContent',
    }),
    defineField({
      name: 'description',
      description: 'Used for the <meta> description tag for SEO.',
      title: 'Description',
      type: 'blockText',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Important for accessibility and SEO.',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: (
            <a
              href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
              rel="noreferrer noopener"
            >
              More information
            </a>
          ),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
