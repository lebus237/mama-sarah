import { Box, Drawer, Group, Text, useMantineColorScheme } from '@mantine/core'
import { IconCircleX } from '@tabler/icons-react'
import type { ComponentType, ReactNode } from 'react'
import { useViewPort } from '../../../hooks'
import { I18nLabel } from '@shared/i18n'

type WithDrawerProps = {
   editLabel?: ReactNode | null
   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
   fullScreen?: boolean
   middle?: boolean
   noClose?: boolean
   position?: 'left' | 'right' | 'top' | 'bottom'
   description?: ReactNode | null
   updateDescription?: ReactNode | null
   customHeader?: ReactNode
}

type DrawerComponentProps = {
   open: boolean
   onClose: () => void
   hideModal?: () => void
   drawerProps?: {
      id?: string | number
   } & any
   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
   position?: 'left' | 'right' | 'top' | 'bottom'
   editLabel?: ReactNode | null
   description?: ReactNode | null
   updateDescription?: ReactNode | null
   customHeader?: ReactNode
}

export default function withDrawer<T extends object>(
   label: ReactNode | string | null,
   modalProps: WithDrawerProps = {},
) {
   return (WrappedComponent: ComponentType<T>) => (props: T & DrawerComponentProps) => {
      const { id } = props.drawerProps || {}
      const { colorScheme } = useMantineColorScheme()
      const viewPort = useViewPort()

      let labelComponent = label

      if (id) {
         labelComponent = modalProps.editLabel || label
      }

      return (
         <Drawer
            opened={props.open}
            title={
               props.customHeader ??
               modalProps.customHeader ?? (
                  <Group align="center" gap="xl">
                     <Box px={0}>
                        <Text
                           fw={600}
                           size="1.5rem"
                           c={colorScheme === 'light' ? 'dark.5' : 'gray.5'}
                        >
                           <I18nLabel label={labelComponent} />
                        </Text>
                        {!viewPort?.isMobile && (
                           <>
                              {id === undefined &&
                                 (props.description || modalProps.description) && (
                                    <Text fw={300} size="md" c="dimmed">
                                       <I18nLabel
                                          label={props.description ?? modalProps.description}
                                       />
                                    </Text>
                                 )}
                              {id && (props.updateDescription || modalProps.updateDescription) && (
                                 <Text fw={300} size="md" c="dimmed">
                                    <I18nLabel
                                       label={
                                          props.updateDescription ?? modalProps.updateDescription
                                       }
                                    />
                                 </Text>
                              )}
                           </>
                        )}
                     </Box>
                  </Group>
               )
            }
            onClose={props.onClose}
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            // scrollAreaComponent={ScrollArea.Autosize}
            position={props.position ?? modalProps.position ?? 'right'}
            size={viewPort?.isMobile ? '100%' : (props.size ?? modalProps.size ?? 'xs')}
            transitionProps={{ transition: 'slide-left', duration: 500, timingFunction: 'linear' }}
            closeButtonProps={{
               mr: '0px',
               size: 'xl',
               icon: <IconCircleX size={40} color="red" />,
               style: { borderRadius: '50%' },
            }}
         >
            <Box pt={{ base: 'xl', sm: 'md' }}>
               <WrappedComponent {...(props as T)} onClose={props.hideModal || props.onClose} />
            </Box>
         </Drawer>
      )
   }
}
