'use client'

import moment from 'moment/moment'

import React from 'react'
import { TolgeeProvider, T, TolgeeInstance } from '@tolgee/react'

export * from './languages'

export function I18nLabel({ label, vars }: { label: any; vars?: any }): any {
   return <T keyName={label} params={vars} />
}

export function I18nDate(props: { date?: any; vars?: any; format?: string }): any {
   if (props.date !== undefined && props.date !== null) {
      return moment
         .utc(props.date)
         .local()
         .format(props.format ?? 'D MMM yyyy')
   } else {
      return '--'
   }
}

export function TranslationProvider({
   children,
   instance,
}: {
   children: React.ReactNode
   instance: TolgeeInstance
}) {
   return <TolgeeProvider tolgee={instance}>{children}</TolgeeProvider>
}

export * from './use-translate'
export * from './language-store'
