import {defineQuery} from 'next-sanity'

const fileFields = /* groq */ `
  file {
    asset->{
      originalFilename,
      mimeType,
      url,
      size,
      extension
    }
  }
`

const linkReference = /* groq */ `
    "_key": coalesce(_key, ^._key),
    _type,
    openInNewTab,
    (linkType == "page") => {
        "slug": page->slug.current,
        "title": select(
            hasCustomTitle => title,
            coalesce(page->title, title, "Link")
          ),
        "page": page->slug.current,
        "linkType": "page"
    },
    (linkType == "post") => {
        "slug": post->slug.current,
        "title": select(
            hasCustomTitle => title,
            coalesce(post->title, title, "Link")
          ),
        "post": post->slug.current,
        "linkType": "post"
    },
    (linkType == "email") => {
        email,
        "slug": "mailto:" + coalesce(email, ""),
        "title": coalesce(title, "Link"),
        "linkType": "email"
    },
    (linkType == "href") => {
      "slug": href,
      "title": coalesce(title, "Link"),
      "linkType": "href"
    }
`

const textFields = /* groq */ `
  ...,
  markDefs[]{
    ...,
    (_type == 'link') => {
      ${linkReference}
    },
  }
`

const imageAssetFields = /* groq */ `
  "id": asset._ref,
  "aspectRatio": asset->metadata.dimensions.aspectRatio,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "preview": asset->metadata.lqip,
  hotspot,
  crop,
  "maxWidth": coalesce(maxWidth, null),
  alt,
  "caption":caption[]{
    ${textFields}
  }
`

const bodyFields = /* groq */ `
  ...,
  (_type == 'figure') => {
    ...,
    ${imageAssetFields}
  },
  (_type == 'htmlEmbed') => {
    ...
  },
  (_type == 'fileDownload') => {
    ...,
    ${fileFields}
  },
  markDefs[]{
    ...,
    (_type == 'link') => {
      ${linkReference}
    },
  }
`

const pageBuilderFields = /* groq */ `
  pageBuilder[]{
    ...,
    _type == "standardText" => {
      ...,
      content[]{
        ${bodyFields}
      }
    },
  }
`

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  "date": coalesce(date, _updatedAt)
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    "pageBuilder": ${pageBuilderFields},
    ogImage,
    description[]{
      ${textFields}
    }
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    ${postFields},
    content[]{
      ${bodyFields}
    },
    ogImage,
    description[]{
      ${textFields}
    }
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  ...,
  menuItems[]{
    link{
      ${linkReference}
    },
  },
  description[]{
    ${textFields}
  },
  coverImage{
    ${imageAssetFields}
  },
  content[]{
    ${bodyFields}
  },
  footer[]{
    ${bodyFields}
  }
}`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)
