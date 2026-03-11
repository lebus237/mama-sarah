'use client'

import { useCallback, useEffect, useState } from 'react'

type ScreenType = {
   isMobile: boolean
   isTablet: boolean
   isDesktop: boolean
}

const MOBILE_MAX = 639
const TABLET_MAX = 1024

export const useViewPort = (): ScreenType => {
   const [screenType, setScreenType] = useState<ScreenType>({
      isMobile: false,
      isTablet: false,
      isDesktop: false,
   })

   const assertScreenType = useCallback((event: MediaQueryListEvent, type: keyof ScreenType) => {
      setScreenType(prev => ({
         ...prev,
         [type]: event.matches,
      }))
   }, [])

   useEffect(() => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

      const mobile = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`)
      const tablet = window.matchMedia(
         `(min-width: ${MOBILE_MAX + 1}px) and (max-width: ${TABLET_MAX}px)`,
      )
      const desktop = window.matchMedia(`(min-width: ${TABLET_MAX + 1}px)`)

      const updateAll = () => {
         setScreenType({
            isMobile: mobile.matches,
            isTablet: tablet.matches,
            isDesktop: desktop.matches,
         })
      }

      updateAll()

      mobile.addEventListener('change', e => assertScreenType(e, 'isMobile'))
      tablet.addEventListener('change', e => assertScreenType(e, 'isTablet'))
      desktop.addEventListener('change', e => assertScreenType(e, 'isDesktop'))

      return () => {
         mobile.removeEventListener('change', e => assertScreenType(e, 'isMobile'))
         tablet.removeEventListener('change', e => assertScreenType(e, 'isTablet'))
         desktop.removeEventListener('change', e => assertScreenType(e, 'isDesktop'))
      }
   }, [assertScreenType])

   return screenType
}
