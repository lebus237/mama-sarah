import React, { useRef, useState } from 'react'
// @ts-ignore
import styles from '../Dashboard.module.scss'
import { ModuleCardComponent } from '../../../components/common'
import type { ModuleConfigType } from '../../../../types'
import { useNavigator } from '../../../../hooks'

export default function ModulesHorizontalScroll({ modules }: { modules: ModuleConfigType[] }) {
   const { navigate } = useNavigator()
   const scrollRef = useRef<HTMLDivElement | null>(null)

   const [isDragging, setIsDragging] = useState(false)
   const [startX, setStartX] = useState(0)
   const [scrollLeft, setScrollLeft] = useState(0)
   const [hasDragged, setHasDragged] = useState(false)

   function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
      if (!scrollRef.current) return
      setIsDragging(true)
      setHasDragged(false)
      setStartX(e.pageX - scrollRef.current.offsetLeft)
      setScrollLeft(scrollRef.current.scrollLeft)
   }

   function onMouseLeave() {
      setIsDragging(false)
      // Reset hasDragged after a short delay to allow click prevention
      setTimeout(() => setHasDragged(false), 100)
   }

   function onMouseUp() {
      setIsDragging(false)
      // Reset hasDragged after a short delay to allow click prevention
      setTimeout(() => setHasDragged(false), 100)
   }

   function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      if (!isDragging || !scrollRef.current) return
      e.preventDefault()
      const x = e.pageX - scrollRef.current.offsetLeft
      const walk = x - startX // scroll speed

      // If we've moved more than 3 pixels, consider it a drag
      if (Math.abs(walk) > 3) {
         setHasDragged(true)
      }

      scrollRef.current.scrollLeft = scrollLeft - walk
   }

   function handleCardClick(module: ModuleConfigType) {
      // Only navigate if we haven't dragged
      if (!hasDragged) {
         navigate(module.path)
      }
   }

   return (
      <div
         className={styles.moduleCards}
         ref={scrollRef}
         onMouseDown={onMouseDown}
         onMouseLeave={onMouseLeave}
         onMouseUp={onMouseUp}
         onMouseMove={onMouseMove}
         style={{
            display: 'grid',
            gridTemplateRows: 'repeat(4, 1fr)',
            gridAutoFlow: 'column',
            gridAutoColumns: '280px',
            gap: '16px',
            overflowX: 'auto',
            overflowY: 'hidden',
            justifyContent: 'start',
         }}
      >
         {modules.map((module, index) => (
            <div key={index}>
               <ModuleCardComponent
                  module={module}
                  key={index}
                  width="100%"
                  onClick={() => handleCardClick(module)}
               />
            </div>
         ))}
      </div>
   )
}
