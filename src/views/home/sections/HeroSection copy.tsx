'use client'

import { useCallback, useEffect, useState } from 'react'

const erection = () => {
   const images = [
      '/images/chicken.jpg',
      '/images/spaghetti.jpg',
      '/images/beer.jpg',
      '/images/rice.jpg',
   ]
   const [activeIndex, setActiveIndex] = useState(0)
   const [isFading, setIsFading] = useState(false)

   const moveToNext = useCallback(() => {
      setIsFading(true)

      // Wait for fade-out to complete, then switch image and fade-in
      setTimeout(() => {
         setActiveIndex(prev => (prev + 1) % images.length)
         setIsFading(false)
      }, 1000)
   }, [images.length])

   useEffect(() => {
      const interval = setInterval(moveToNext, 10000)
      return () => clearInterval(interval)
   }, [moveToNext])

   const nextIndex = (activeIndex + 1) % images.length

   return (
      <div className="relative w-full h-full overflow-hidden">
         {/* Base layer - next image (visible when fading) */}
         <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
               backgroundImage: `url('${images[nextIndex]}')`,
            }}
         />
         {/* Top layer - current image (fades out) */}
         <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
               backgroundImage: `url('${images[activeIndex]}')`,
               opacity: isFading ? 0 : 1,
            }}
         />
      </div>
   )
}
