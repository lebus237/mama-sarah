import { notifications } from '@mantine/notifications'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../state/app.store'
import { type AppStateType } from '../state/app.store'
import type { AppAlertType } from '../presentation/components/common'
import { resolveNotification } from '../lib/helpers'
import { NotificationType } from '../types'
import { useTranslate } from '@shared/i18n'

type PlacementType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | undefined

interface NotifyFunction {
   (payload: AppAlertType, placement?: PlacementType): void
   success: (message?: any, title?: string, placement?: PlacementType) => void
   error: (message?: any, title?: string, placement?: PlacementType) => void
   info: (message?: any, title?: string, placement?: PlacementType) => void
   warning: (message?: any, title?: string, placement?: PlacementType) => void
}

export const useNotification = () => {
   const { trans } = useTranslate()
   const dispatch = useDispatch()
   const context: AppStateType = useSelector((state: any) => state.appSlice)

   const notify = ((payload: AppAlertType, placement: PlacementType = 'top-right') => {
      let defaultValue = resolveNotification(payload.type ?? NotificationType.INFO)

      notifications.show({
         position: placement,
         color: defaultValue.color ?? 'blue',
         title: trans(payload.title ?? defaultValue.title),
         message: payload.content
            ? typeof payload.content === 'string'
               ? trans(payload.content)
               : payload.content
            : defaultValue.message,
      })
   }) as NotifyFunction

   // Add convenience methods
   notify.success = (message?: any, title?: string, placement?: PlacementType) => {
      notify(
         {
            content: message,
            title: title,
            type: NotificationType.SUCCESS,
         },
         placement,
      )
   }

   notify.error = (message?: any, title?: string, placement?: PlacementType) => {
      notify(
         {
            content: message,
            title: title,
            type: NotificationType.ERROR,
         },
         placement,
      )
   }

   notify.info = (message?: any, title?: string, placement?: PlacementType) => {
      notify(
         {
            content: message,
            title: title,
            type: NotificationType.INFO,
         },
         placement,
      )
   }

   notify.warning = (message?: any, title?: string, placement?: PlacementType) => {
      notify(
         {
            content: message,
            title: title,
            type: NotificationType.WARNING,
         },
         placement,
      )
   }

   const displayAlert = (payload: AppAlertType) => {
      dispatch(action.displayAlert(payload))

      setTimeout(() => {
         dispatch(action.clearAlert())
      }, 60000)
   }

   const clearAlert = () => dispatch(action.clearAlert())

   return {
      notify,
      clearAlert,
      displayAlert,
      alert: context.appAlert,
   }
}
