import {PortableTextBlock} from '@portabletext/types'

const blocksToTextDefaults = {nonTextBehavior: 'remove'}

export const blocksToText = (blocks: PortableTextBlock[] = [], opts = {}) => {
  if (typeof blocks === 'string') {
    return blocks
  }
  const options = {...blocksToTextDefaults, ...opts}
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }
      return block.children.map((child): any => child.text).join('')
    })
    .join('\n\n')
}
