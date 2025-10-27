/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {PortableText, type PortableTextComponents, type PortableTextBlock} from 'next-sanity'

import ResolvedLink from '@/app/components/ResolvedLink'
import {BlockFigure} from './BlockFigure'
import {BlockFileDownload} from './BlockFileDownload'
import {BlockHtmlEmbed} from './BlockHtmlEmbed'

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      h2: ({children, value}) => {
        // Add an anchor to the h2
        return <h2 className="text-3xl mt-8 mb-4 first:mt-0 last:mb-0">{children}</h2>
      },
      normal: ({children}: {children?: any}) => {
        return <p className="text-pretty">{children}</p>
      },
      blockquote: ({children}: {children?: any}) => {
        return (
          <blockquote className="border-l border-current pl-4 text-pretty my-4 first:mt-0 last:mb-0">
            {children}
          </blockquote>
        )
      },
    },
    marks: {
      link: ({children, value: link}) => {
        return (
          <ResolvedLink className="underline hover:no-underline" link={link}>
            {children}
          </ResolvedLink>
        )
      },
    },
    list: ({children, value}) => {
      if (value.listItem === 'bullet') {
        return <ul className="list-disc ml-4">{children}</ul>
      }
      return <ol className="list-decimal ml-4">{children}</ol>
    },
    listItem: ({children}: {children?: any}) => {
      return <li>{children}</li>
    },
    types: {
      figure: BlockFigure,
      fileDownload: BlockFileDownload,
      htmlEmbed: BlockHtmlEmbed,
    },
  }

  return (
    <div className={[className].filter(Boolean).join(' ')}>
      <PortableText components={components} value={value} />
    </div>
  )
}

export function SimplePortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({children}: {children?: any}) => {
        return <p>{children}</p>
      },
    },
    marks: {
      link: ({children, value: link}) => {
        return (
          <ResolvedLink className="underline hover:no-underline" link={link}>
            {children}
          </ResolvedLink>
        )
      },
    },
    types: {},
  }

  return (
    <span className={[className].filter(Boolean).join(' ')}>
      <PortableText components={components} value={value} />
    </span>
  )
}
