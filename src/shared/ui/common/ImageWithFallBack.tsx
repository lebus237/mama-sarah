'use client'

import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type Props = ImageProps & {
   fallback?: string
}

export default function ImageWithFallback({
   src,
   fallback = '/images/placeholder.png',
   alt,
   className,
   ...props
}: Props) {
   const [imgSrc, setImgSrc] = useState(src)
   const [isLoading, setIsLoading] = useState(true)

   return (
      <div className={clsx('relative overflow-hidden', className)}>
         {/* Skeleton */}
         {isLoading && <div className="absolute inset-0 animate-pulse bg-gray-200" />}

         <Image
            {...props}
            src={imgSrc}
            alt={alt}
            className={clsx(
               'transition-opacity duration-300',
               isLoading ? 'opacity-0' : 'opacity-100',
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
               if (imgSrc !== fallback) setImgSrc(fallback)
            }}
            placeholder="blur"
            blurDataURL="/images/blur-placeholder.png"
         />
      </div>
   )
}
