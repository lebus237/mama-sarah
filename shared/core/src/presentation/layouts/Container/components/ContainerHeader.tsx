import { Box, Text } from '@mantine/core'
// @ts-ignore
import classes from '../DesktopContainer/PageContainer.module.scss'
import { IconChevronLeft } from '@tabler/icons-react'
import { I18nLabel } from '@shared/i18n'
import { useViewPort } from '../../../../hooks'
import cx from 'clsx'

export default function ContainerHeader(props: {
   withBackButton: boolean | undefined
   title?: any
   activeKey?: string
   setActiveKey: (activeKey: string) => void
   goBack: () => void
   colorScheme: string
   actions: any
   leftConfig: any
   tabs: undefined | { key: string; title: string }[]
}) {
   const viewPort = useViewPort()

   return (
      <Box className={classes.titleContainer}>
         <Box className={classes.titleContainerBox}>
            {props.withBackButton && (
               <Box className={classes.backButton} onClick={props.goBack}>
                  <IconChevronLeft size={25} />
               </Box>
            )}
            {props.title && !props.tabs && (
               <Box mx="xs" className={classes.titleTabItem}>
                  <Text fw={500} size="0.9rem">
                     <I18nLabel label={props.title} />
                  </Text>
               </Box>
            )}

            {(props.tabs ?? [])?.map((item, index) => (
               <Box
                  mx="xs"
                  key={index}
                  onClick={() => props.setActiveKey(item.key)}
                  className={cx(classes.titleTabItem, {
                     [classes.titleTabItemActive]: item.key === props.activeKey,
                  })}
               >
                  <Text fw={500} size="0.9rem">
                     <I18nLabel label={item.title} />
                  </Text>
               </Box>
            ))}
         </Box>

         {!viewPort.isMobile && props.actions && (
            <Box className={classes.titleContainerActions}>{props.actions}</Box>
         )}
      </Box>
   )
}
