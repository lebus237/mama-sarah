import { useState } from 'react'

import { Card, Collapse, Flex } from '@mantine/core'
import { Label } from '../../common'
import { ChevronDown } from 'lucide-react'
import { useClickAway } from '@uidotdev/usehooks'
import { CanvasDrawer } from './CanvasDrawer'

function CanvasEditor(props: { save: any }) {
   const [expanded, setExpanded] = useState(false)
   const containerRef = useClickAway<HTMLDivElement>(() => setExpanded(false))

   // useEffect(() => {
   //    let bodyElt = document.body
   //    expanded ? bodyElt.classList.add('stop-scroll') : bodyElt.classList.remove('stop-scroll')
   //    if (expanded && !document.fullscreenElement) {
   //       document.documentElement.requestFullscreen()
   //    } else {
   //       if (document.exitFullscreen) {
   //          document.exitFullscreen().catch(() => {})
   //       }
   //    }
   // }, [expanded])

   //

   return (
      <Card
         ref={containerRef}
         p="md"
         radius="sm"
         shadow="none"
         style={{
            border: '1px solid var(--mantine-color-gray-4)',
            cursor: expanded ? 'default' : 'pointer',
         }}
         bg="transparent"
         w="100%"
      >
         {expanded ? (
            <Collapse in={expanded}>
               <div id="canvas-container">
                  <CanvasDrawer
                     onSave={(data: any) => {
                        props.save(data)
                        setExpanded(prevState => !prevState)
                     }}
                  />
               </div>
            </Collapse>
         ) : (
            <Flex
               w="100%"
               justify="space-between"
               align="center"
               onClick={() => setExpanded(prevState => !prevState)}
            >
               <Label text="text.signatureArea" />
               <ChevronDown size={20} />
            </Flex>
         )}
      </Card>
   )
}

export default CanvasEditor
