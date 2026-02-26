import { Box, Grid, useMantineColorScheme } from '@mantine/core'

import { useEffect, useState } from 'react'

import LeftSidebarComponent from './LeftSidebarComponent'
import RightSidebarComponent from './RightSidebarComponent'

// @ts-ignore
import classes from './PageContainer.module.scss'
import { useNavigator, useNotification } from '../../../../hooks'
import AppAlert from '../../../components/common/Alert'
import type { ContainerProps } from '../types'
import ContainerHeader from '../components/ContainerHeader'

export function DesktopContainer({
   children,
   pageHeader,
   pageActions,
   rightConfig,
   leftConfig,
   ...props
}: ContainerProps) {
   const { goBack, path, hashNavigate, hash } = useNavigator()
   const { colorScheme } = useMantineColorScheme()
   const { alert, clearAlert } = useNotification()
   const [isLeftOpen, setIsLeftOpen] = useState(false)
   const [activeKey, setActiveKey] = useState<string | undefined>(props?.tabs?.[0]?.key)

   const hasChildren = leftConfig && Array.isArray(children) && children.length > 1

   const currentIndex = leftConfig?.children?.findIndex(module => module.path === path) ?? 0

   const currentModule = leftConfig?.children?.[currentIndex]

   const title =
      currentModule !== undefined ? `module.${currentModule?.name}` : pageHeader?.pageTitle

   useEffect(() => {
      setActiveKey(hash !== '' ? hash?.replace('#', '') : props?.tabs?.[0]?.key)
   }, [props?.tabs?.length])

   return (
      <Box className={classes.container}>
         {leftConfig && (
            <LeftSidebarComponent
               isOpen={isLeftOpen}
               config={leftConfig}
               currentPath={path}
               onOpenSidebar={() => setIsLeftOpen(!isLeftOpen)}
            />
         )}

         <Box
            w={`calc(100% - ${leftConfig ? 55 : 0}px - ${rightConfig ? 55 : 0}px)`}
            className={classes.centerContainer}
            px={'1.5%'}
            py={'.5%'}
            ml={leftConfig ? (isLeftOpen ? '280px' : '55px') : undefined}
            mr={rightConfig && '55px'}
         >
            <Grid justify="space-between" gutter="xs">
               {alert && (
                  <Grid.Col span={{ span: 12, xs: 12 }} my="md">
                     <AppAlert
                        title={alert.title}
                        content={alert.content}
                        icon={alert.icon}
                        onClose={clearAlert}
                     />
                  </Grid.Col>
               )}

               {!props.hideHeader && (
                  <Grid.Col span={{ span: 12, xs: 12 }}>
                     <ContainerHeader
                        title={pageHeader?.pageTitle ?? title}
                        goBack={goBack}
                        tabs={props.tabs}
                        activeKey={activeKey}
                        actions={pageActions}
                        leftConfig={leftConfig}
                        colorScheme={colorScheme}
                        withBackButton={props.withBackButton}
                        setActiveKey={(activeKey: string) => {
                           setActiveKey(activeKey)
                           hashNavigate(activeKey)
                        }}
                     />
                  </Grid.Col>
               )}

               <Grid.Col span={{ span: 12 }} py="1%">
                  {props.tabs &&
                     children?.length > 0 &&
                     children?.filter((child: any) => child?.key === activeKey)[0]}

                  {!props.tabs &&
                     hasChildren &&
                     children
                        .filter(child => child?.key === (path ?? children[0]?.key))
                        .map((child, index) => <div key={child.key || index}>{child}</div>)}

                  {!props.tabs && !hasChildren && children}
               </Grid.Col>
            </Grid>
         </Box>

         {rightConfig && <RightSidebarComponent config={rightConfig} />}
      </Box>
   )
}
