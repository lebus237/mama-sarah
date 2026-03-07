'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Language } from './languages'

export type LanguageCode = (typeof Language)[keyof typeof Language]

interface LanguageState {
   language: LanguageCode
   setLanguage: (language: LanguageCode) => void
}

const DEFAULT_LANGUAGE: LanguageCode = Language.ENG

export const useLanguageStore = create<LanguageState>()(
   persist(
      (set) => ({
         language: DEFAULT_LANGUAGE,
         setLanguage: (language) => set({ language }),
      }),
      {
         name: 'language-storage',
         storage: createJSONStorage(() => localStorage),
         partialize: (state) => ({ language: state.language }),
      },
   ),
)
