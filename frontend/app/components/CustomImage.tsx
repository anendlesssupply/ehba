'use client'

import {SanityImage} from 'sanity-image'
import {dataset, projectId} from '@/sanity/lib/api'

import {useState, useEffect, useRef} from 'react'
import {stegaClean} from 'next-sanity'

const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`

const FadeImage = ({className, ...props}: any) => {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<any>(null)

  useEffect(() => {
    if (ref && ref.current && ref.current.complete) {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (loaded && ref && ref.current) {
      ref.current.removeAttribute('data-loading')
    }
  }, [loaded])

  return (
    <div className={`transition duration-500 ${loaded ? 'bg-none' : 'bg-fg/10'}`}>
      {props?.src ? (
        <img
          ref={ref}
          onLoad={() => setLoaded(true)}
          className={`${className ? `${className} ` : ``}transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          alt={stegaClean(props?.alt) || ''}
          data-loading
          {...props}
        />
      ) : (
        <div className="bg-fg/10" style={{paddingTop: '100%'}} />
      )}
    </div>
  )
}

export const CustomImage = (
  props: Omit<React.ComponentProps<typeof SanityImage>, 'baseUrl' | 'dataset' | 'projectId'>,
) => {
  const {image, className, aspectRatio, sizes, alt} = props
  const {id} = image

  return (
    <SanityImage
      as={FadeImage}
      key={id}
      id={id}
      baseUrl={baseUrl}
      width={image.width}
      height={aspectRatio ? Math.floor(image.width / aspectRatio) : image.height}
      mode={aspectRatio ? 'cover' : undefined}
      hotspot={image.hotspot}
      crop={image.crop}
      alt={alt}
      className={className || ''}
      sizes={sizes}
      style={aspectRatio ? {aspectRatio, objectFit: 'cover'} : undefined}
    />
  )
}

export default CustomImage
