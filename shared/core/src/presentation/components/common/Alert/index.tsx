import { Alert } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import React from 'react'
import { I18nLabel } from '@shared/i18n'
import { NotificationType } from '../../../../types'
import { resolveNotification, resolveNotificationIcon } from '../../../../lib/helpers'

export type AppAlertType = {
   icon?: React.ReactNode
   title?: React.ReactNode
   content?: React.ReactNode
   onClose?: () => void
   type?: NotificationType | 'success' | 'error' | 'info' | 'warning'
}

export default function AppAlert(props: AppAlertType) {
   const icon = resolveNotificationIcon(props.type ?? NotificationType.INFO) ?? (
      <IconInfoCircle size={34} />
   )
   let defaultValue = resolveNotification(props.type ?? NotificationType.INFO)

   return (
      <Alert
         w="100%"
         radius="md"
         withCloseButton
         onClose={props.onClose}
         color={defaultValue.type ?? 'blue'}
         title={<I18nLabel label={props.title ?? defaultValue.title} />}
         icon={props.icon ?? icon}>
         {props.content}
      </Alert>
   )
}
