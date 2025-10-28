import Link from 'next/link'
import IconTriangle from '@/app/components/IconTriangle'

export function BlockFileDownload(props: any = {}) {
  const {value} = props || {}
  const {title, file} = value || {}
  if (!file?.asset?.url) {
    return null
  }
  return (
    <div>
      <Link
        href={`${file?.asset?.url}?dl`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative border border-current grid gap-4 p-4 pr-12 group"
      >
        <span>{title || file?.asset?.originalFilename || ''} </span>
        <span
          className="absolute top-1/2 -translate-y-1/2 right-4 w-8 h-8 grid items-center justify-center 
        border-current border group-hover:border-black group-hover:bg-black group-hover:text-white
        dark:group-hover:border-white dark:group-hover:bg-white dark:group-hover:text-black
        rounded-full"
        >
          <IconTriangle className="translate-y-[0.075em] col-start-1 row-start-1 rotate-180 w-[1em] h-[1em]" />
        </span>
      </Link>
    </div>
  )
}
