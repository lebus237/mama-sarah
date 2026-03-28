'use client'

import { useEffect, useMemo, useState } from 'react'

export const BackgroundImageCarousel = ({
   images,
   speed,
}: {
   images: Array<string>
   speed?: number
}) => {
   const [activeIndex, setActiveIndex] = useState(0)
   const backgroundImages = useMemo(() => images, [images])

   useEffect(() => {
      if (backgroundImages.length <= 1) return

      const reduceMotion =
         typeof window !== 'undefined' &&
         window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
      if (reduceMotion) return

      const id = window.setInterval(() => {
         setActiveIndex(i => (i + 1) % backgroundImages.length)
      }, speed ?? 6000)

      return () => window.clearInterval(id)
   }, [backgroundImages])

   return (
      <div className="w-full h-full relative overflow-hidden">
         {backgroundImages.map((src, idx) => (
            <div
               key={src}
               aria-hidden="true"
               className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                  idx === activeIndex ? 'opacity-100' : 'opacity-0'
               }`}
               style={{ backgroundImage: `url(${src})` }}
            />
         ))}
      </div>
   )
}
