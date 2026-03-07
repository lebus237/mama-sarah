'use client'

import { TranslationProvider } from '@/shared/i18n'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BackendFetch, DevTools, Tolgee } from '@tolgee/react'

const queryClient = new QueryClient()

export interface ProvidersProps {
   children: React.ReactNode
}

const tolgee = Tolgee()
   .use(DevTools())
   .use(BackendFetch())
   .init({
      defaultLanguage: 'fr',
      // for development
      apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
      apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,

      // // for production
      staticData: {
         en: import(`../../../public/i18n/en.json`) as any,
         fr: import(`../../../public/i18n/en.json`)  as any,
      },
   })

export function Providers({ children }: ProvidersProps) {
   return (
      <TranslationProvider instance={tolgee}>
         <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </TranslationProvider>
   )
}
