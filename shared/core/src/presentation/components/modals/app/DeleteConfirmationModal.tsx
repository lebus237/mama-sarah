import { Box, Button, Center, Flex, LoadingOverlay, Typography, Text } from '@mantine/core'
// @ts-ignore
import styles from './DeleteConfirmationModal.module.scss'
import React from 'react'
import { I18nLabel } from '@shared/i18n'
import { useAppState, useModals } from '../../../../hooks'
import { withModal } from '../index'

export default withModal('modal.confirm.suppression', {
   size: 'md',
   padding: '0px',
})(DeleteConfirmationModal)

function DeleteConfirmationModal(props: any) {
   const { icon, callback, title, description } = props.modalProps
   const { closeModal } = useModals()
   const [loading, setLoading] = React.useState(false)
   const { refreshCollection } = useAppState()

   const onConfirm = async () => {
      setLoading(true)
      await callback()
      setLoading(false)
      refreshCollection()
      closeModal('DELETE_CONFIRMATION_MODAL')
   }

   return (
      <Box className={styles.container}>
         <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 1 }}
            loaderProps={{ color: 'red', type: 'dots' }}
         />
         <Box p="md">
            <Center>
               <Box className={styles.iconBox} h={120} w={120} c="red.5">
                  {icon}
               </Box>
            </Center>
            <Typography component="h2" lh={1} ta="center">
               {title}
            </Typography>
            <Typography c="gray.6" lh={1.5} component="p" ta="center">
               {description} ?
            </Typography>
         </Box>
         <Box w="100%" bg="gray.1" p="md">
            <Flex justify="space-between">
               <Button
                  h={50}
                  variant="white"
                  w="40%"
                  onClick={() => closeModal('DELETE_CONFIRMATION_MODAL')}>
                  <Text size="md" fw={700} c="orange">
                     <I18nLabel label="action.cancel" />
                  </Text>
               </Button>
               <Button onClick={onConfirm} bg="red" w="40%" h={50}>
                  <Text size="md" fw={700} c="white">
                     <I18nLabel label="action.confirm" />
                  </Text>
               </Button>
            </Flex>
         </Box>
      </Box>
   )
}
