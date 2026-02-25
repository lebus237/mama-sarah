import { Box } from '@mantine/core'
import React from 'react'

// @ts-ignore
import classes from './RightSidebar.module.scss'

export type RightSidebarConfigType = {
   modules: { content: React.ReactNode; onClick: () => void }[]
   bottomModules?: { content: React.ReactNode; onClick: () => void }[]
}

interface RightSidebarProps {
   config: RightSidebarConfigType
}

function RightSidebarComponent(props: RightSidebarProps) {
   return (
      <Box className={classes.rightContainer}>
         <Box className={classes.module} pt="sm">
            {props.config.modules.map((module, index) => (
               <Box key={index} onClick={module.onClick} className={classes.moduleItem}>
                  <div>{module.content}</div>
               </Box>
            ))}
         </Box>

         <Box className={classes.bottomModule}>
            {props.config.bottomModules?.map((module, index) => (
               <Box key={index} onClick={module.onClick} className={classes.moduleItem}>
                  {module.content}
               </Box>
            ))}
         </Box>
      </Box>
   )
}

export default RightSidebarComponent
