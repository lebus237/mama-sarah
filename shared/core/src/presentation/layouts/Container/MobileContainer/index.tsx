import type { ContainerProps } from '../types'
// @ts-ignore
import classes from '../DesktopContainer/PageContainer.module.scss'
import { Box, Grid, useMantineColorScheme } from '@mantine/core'
import AppAlert from '../../../components/common/Alert'
import { useNavigator, useNotification } from '../../../../hooks'
import ContainerHeader from '../components/ContainerHeader'

export function MobileContainer({
   children,
   pageHeader,
   pageActions,
   rightConfig,
   leftConfig,
   ...props
}: ContainerProps) {
   const { goBack } = useNavigator()
   const { colorScheme } = useMantineColorScheme()
   const { alert, clearAlert } = useNotification()

   const title = pageHeader?.pageTitle

   return (
      <Box
         w={`calc(100% - ${leftConfig ? 55 : 0}px - ${rightConfig ? 55 : 0}px)`}
         className={classes.centerContainer}
         py={props.paddingY ?? '.5%'}
         px={props.paddingY ?? '2%'}
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

            <Grid.Col span={{ span: 12, xs: 12 }}>
               <ContainerHeader
                  title={title}
                  goBack={goBack}
                  actions={pageActions}
                  leftConfig={leftConfig}
                  colorScheme={colorScheme}
                  withBackButton={props.withBackButton}
               />
            </Grid.Col>

            <Grid.Col span={{ span: 12 }} py={props.paddingY ?? '1%'}>
               {children}
            </Grid.Col>
         </Grid>
      </Box>
   )
}
