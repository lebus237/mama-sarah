import React from 'react'

export type IntersectionObserverConfig = {
   root?: any
   rootMargin?: string
   threshold?: number
   persist?: boolean
}

export const useIntersectionObserver = (config?: IntersectionObserverConfig) => {
   const ref = React.useRef(null)
   const [isInView, setInView] = React.useState<boolean>(false)
   let observer: IntersectionObserver | null = null

   React.useEffect(() => {
      if (typeof window !== 'undefined') {
         observer = new IntersectionObserver(
            ([entry]) =>
               setInView(prev => {
                  return config?.persist
                     ? prev
                        ? true
                        : entry.isIntersecting
                     : entry.isIntersecting
               }),
            {
               root: config?.root ?? null,
               rootMargin: config?.rootMargin,
               threshold: config?.threshold ?? 0.1,
            },
         )

         if (ref.current) {
            observer?.observe(ref.current)
         }

         return () => {
            if (ref.current) {
               observer?.unobserve(ref.current)
            }
         }
      }
   }, [])

   return {
      ref,
      isInView,
   }
}
