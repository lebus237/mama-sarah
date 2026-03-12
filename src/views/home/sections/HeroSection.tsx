'use client'

import { useEffect, useMemo, useState } from 'react'

const HeroSection = () => {
   const images = useMemo(
      () => [
         '/images/chicken.jpg',
         '/images/spaghetti.jpg',
         '/images/beer.jpg',
         '/images/rice.jpg',
      ],
      [],
   )
   const [activeIndex, setActiveIndex] = useState(0)

   useEffect(() => {
      if (images.length <= 1) return

      const reduceMotion =
         typeof window !== 'undefined' &&
         window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
      if (reduceMotion) return

      const id = window.setInterval(() => {
         setActiveIndex(i => (i + 1) % images.length)
      }, 6000)

      return () => window.clearInterval(id)
   }, [images])

   return (
      <div className="w-full h-full relative overflow-hidden">
         {images.map((src, idx) => (
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

export default HeroSection
