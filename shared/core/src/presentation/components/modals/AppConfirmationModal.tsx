import { Button, Group, Text, Stack, Title } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import type { ModalComponentProps } from './withModal'
import { withModal } from './index'

interface ConfirmationModalProps {
   onConfirm: () => void
   onCancel?: () => void
   title?: string
   message?: string
   confirmLabel?: string
   cancelLabel?: string
   variant?: 'danger' | 'warning' | 'info'
}

function AppConfirmationModal(props: ModalComponentProps) {
   const {
      onConfirm,
      onCancel,
      title = 'Confirm Action',
      message = 'Are you sure you want to proceed?',
      confirmLabel = 'Confirm',
      cancelLabel = 'Cancel',
      variant = 'warning',
   } = props.modalProps as ConfirmationModalProps

   const handleConfirm = () => {
      onConfirm()
      props.onClose()
   }

   const handleCancel = () => {
      if (onCancel) {
         onCancel()
      }
      props.onClose()
   }

   const getVariantColor = () => {
      switch (variant) {
         case 'danger':
            return 'red'
         case 'warning':
            return 'yellow'
         case 'info':
            return 'blue'
         default:
            return 'yellow'
      }
   }

   return (
      <Stack>
         <Group align="center">
            <IconAlertTriangle size={24} color={`var(--mantine-color-${getVariantColor()}-6)`} />
            <Title order={3} size="h4">
               {title}
            </Title>
         </Group>

         <Text size="sm" c="dimmed">
            {message}
         </Text>

         <Group mt="lg">
            <Button variant="subtle" onClick={handleCancel}>
               {cancelLabel}
            </Button>
            <Button color={getVariantColor()} onClick={handleConfirm}>
               {confirmLabel}
            </Button>
         </Group>
      </Stack>
   )
}

export default withModal<ModalComponentProps>(null, {
   size: '50%',
})(AppConfirmationModal)
