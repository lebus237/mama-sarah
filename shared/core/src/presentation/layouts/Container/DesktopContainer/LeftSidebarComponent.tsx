import { Box, Text } from '@mantine/core'
import { I18nLabel } from '@shared/i18n'
import {
   IconArrowBarLeft,
   IconArrowBarRight,
   IconDots,
   IconLayoutSidebarLeftCollapse,
   IconLayoutSidebarRightCollapse,
} from '@tabler/icons-react'

// @ts-ignore
import classes from './LeftSidebar.module.scss'

import { useNavigator } from '../../../../hooks'
import type { ModuleConfigType } from '../../../../types'

interface LeftSidebarProps {
   isOpen: boolean
   onOpenSidebar: () => void
   config: ModuleConfigType
   currentPath?: string
}

function LeftSidebarComponent(props: LeftSidebarProps) {
   const { config, isOpen, onOpenSidebar } = props
   const { navigate, path } = useNavigator()

   return (
      <Box className={classes.leftContainer} w={isOpen ? '280px' : '55px'}>
         <Box className={classes.module}>
            <Box
               my="xs"
               mx="auto"
               w={isOpen ? '90%' : '50%'}
               className={classes.moduleIconBoxCollapse}
               onClick={onOpenSidebar}>
               {isOpen && (
                  <Box>
                     <I18nLabel label={`module.${config.name}`} />
                  </Box>
               )}
               <Box>
                  {isOpen ? (
                     <IconLayoutSidebarLeftCollapse stroke={1.2} />
                  ) : (
                     <IconLayoutSidebarRightCollapse stroke={1.2} />
                  )}
               </Box>
            </Box>
            {config.children?.map((_module, index) => (
               <Box
                  mx="auto"
                  key={index}
                  w={isOpen ? '90%' : '55px'}
                  className={path === _module.path ? classes.moduleItemActive : classes.moduleItem}
                  onClick={() => {
                     navigate(_module.path)
                  }}>
                  <Box className={classes.moduleIconBox} w={isOpen ? 280 : 40}>
                     <Box className={classes.moduleIconBoxIcon}>
                        {_module.icon ? <_module.icon stroke={1.2} /> : <IconDots stroke={1.2} />}
                     </Box>
                     {isOpen && (
                        <Text className={classes.moduleIconBoxName}>
                           <I18nLabel label={_module.name} />
                        </Text>
                     )}
                  </Box>
               </Box>
            ))}
         </Box>

         <Box mx="auto" w={isOpen ? '90%' : '55px'} className={classes.bottomAction}>
            <Box className={classes.moduleItem} w={isOpen ? '90%' : '55px'} onClick={onOpenSidebar}>
               <Box className={classes.moduleIconBoxIcon}>
                  {isOpen ? <IconArrowBarLeft /> : <IconArrowBarRight />}
               </Box>
               {isOpen && (
                  <Text className={classes.moduleIconBoxName}>
                     <I18nLabel label="text.collapse.sidebar" />
                  </Text>
               )}
            </Box>
         </Box>
      </Box>
   )
}

export default LeftSidebarComponent
