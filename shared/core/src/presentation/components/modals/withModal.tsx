import { Box, LoadingOverlay, Modal, Text, useMantineColorScheme } from '@mantine/core'
import { IconCircleX } from '@tabler/icons-react'
import { type ComponentType, type ReactNode } from 'react'
import { I18nLabel } from '@shared/i18n'
import { useAppState, useViewPort } from '../../../hooks'
import type { TranslationKey } from '@tolgee/core'

export type WithModalProps = {
   editLabel?: ReactNode | null
   width?: any
   wide?: boolean
   fullScreen?: boolean
   middle?: boolean
   noClose?: boolean
   contentClassName?: string
   icon?: string
   description?: ReactNode | null
   updateDescription?: ReactNode | null
   size?:
      | 'xs'
      | 'sm'
      | 'md'
      | 'lg'
      | 'xl'
      | string
      | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string }
   radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
   padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
}

export type ModalComponentProps = {
   open: boolean
   onClose: () => void
   hideModal?: () => void
   modalProps?:
      | {
           id?: string | number
        }
      | any
   size?:
      | 'xs'
      | 'sm'
      | 'md'
      | 'lg'
      | 'xl'
      | string
      | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string }
   padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
   editLabel?: ReactNode | null
   description?: ReactNode | null
   updateDescription?: ReactNode | null
}

export default function withModal<T extends object>(
   label: ReactNode | string | null,
   modalProps: WithModalProps = {},
) {
   return (WrappedComponent: ComponentType<T>) => (props: T & ModalComponentProps) => {
      const { id, size, modalLabel } = props.modalProps || {}
      const { colorScheme } = useMantineColorScheme()
      const { loading } = useAppState()
      const viewPort = useViewPort()

      // Determine label to show
      let labelComponent = modalLabel ?? label

      if (id) {
         labelComponent = modalProps.editLabel ? modalProps.editLabel : (modalLabel ?? label)
      }

      // Determine description to show
      const showDescription =
         id === undefined
            ? (props.description ?? modalProps.description)
            : (props.updateDescription ?? modalProps.updateDescription)

      return (
         <Modal
            centered
            opened={props.open}
            title={
               <Box p={modalProps.padding ?? 'xs'}>
                  <Text fw={500} size="1.1rem" c={colorScheme === 'light' ? 'gray.7' : 'gray.5'}>
                     <I18nLabel label={labelComponent} />
                  </Text>
                  {showDescription && (
                     <Text fw={300} size="md" c="dimmed">
                        <I18nLabel label={showDescription as TranslationKey} />
                     </Text>
                  )}
               </Box>
            }
            onClose={props.onClose}
            radius={modalProps.radius ?? 'md'}
            fullScreen={viewPort?.isMobile ?? modalProps.fullScreen}
            transitionProps={{ transition: 'slide-up' }}
            size={size ?? modalProps.size ?? 'xs'}
            overlayProps={{ backgroundOpacity: 0.1, blur: 5 }}
            closeButtonProps={
               modalProps.noClose
                  ? { style: { display: 'none' } }
                  : {
                       mr: 'xs',
                       size: 'md',
                       icon: <IconCircleX size={40} color="red" />,
                       style: { borderRadius: '50%' },
                    }
            }>
            <Box p={viewPort?.isMobile ? '0' : (modalProps.padding ?? 'xs')} pos="relative">
               <LoadingOverlay
                  zIndex={1000}
                  overlayProps={{ radius: 'sm', blur: 1 }}
                  visible={loading ?? false}
                  loaderProps={{ color: 'default', type: 'dots' }}
               />
               <WrappedComponent {...(props as T)} hideModal={props.hideModal || props.onClose} />
            </Box>
         </Modal>
      )
   }
}
