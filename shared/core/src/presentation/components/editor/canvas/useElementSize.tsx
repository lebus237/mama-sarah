import { useLayoutEffect, useState } from 'react'

export default function UseElementSize(id: any) {
   const [size, setSize] = useState([0, 0])

   useLayoutEffect(() => {
      function updateSize() {
         let element = document.getElementById(id)
         setSize([element?.offsetWidth ?? 10, element?.offsetHeight ?? 10])
      }

      window.addEventListener('resize', updateSize)
      updateSize()
      return () => window.removeEventListener('resize', updateSize)
   }, [])

   return size
}
