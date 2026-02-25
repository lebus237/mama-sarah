import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useTolgee } from '@tolgee/react'
import type { TranslationKey } from '@tolgee/core'

export function useTranslate() {
   const tolgee = useTolgee()

   const trans = (label: TranslationKey, vars?: Record<string, any>): string => {
      return tolgee.t(label, label as any, vars) ?? label
   }

   const transDate = (date?: any, dateFormat?: any): any => {
      if (date) {
         return format(new Date(date), dateFormat ?? 'dd, MMM yyyy', {
            locale: fr,
         })
      }

      return date
   }

   return {
      trans,
      transDate,
      lang: tolgee.getLanguage(),
      changeLanguage: tolgee.changeLanguage,
   }
}
