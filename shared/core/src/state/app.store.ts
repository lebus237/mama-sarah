import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppContextType, ModuleConfigType, ModuleKey } from '../types'
import { LocalStorage } from '../index'

interface AppAlertType {
   type: 'warning' | 'error' | 'info' | 'success'
   title: string
   content: string
   icon?: string
}

export interface AppStateType {
   loading: boolean
   appRefresh: number
   refreshContext: number
   context: AppContextType
   moduleKeys: object
   lastMKeys: []
   pinnedKeys: []
   pinnedModules: []
   modules: []
   appAlert?: AppAlertType
   instance?: any
   appConfigs: Record<ModuleKey, ModuleConfigType>
}

export interface AppModulesType {
   moduleKeys: object
   lastMKeys: any | string | undefined[]
   pinnedKeys: any | string | undefined[]
   appConfigs: Record<ModuleKey, ModuleConfigType>
   pinnedModules: any | string | undefined[]
   modules: any | string | undefined[]
}

export const appSlice = createSlice({
   name: 'appState',
   initialState: {
      loading: false,
      appRefresh: 0,
      refreshContext: 0,
      context: {},
      moduleKeys: {},
      lastMKeys: [],
      pinnedKeys: [],
      instance: LocalStorage.getInstance(),
   } as AppStateType,
   reducers: {
      appLoading: (state, action: PayloadAction) => {
         state.loading = action.payload as any
      },
      refreshCollection: state => {
         state.appRefresh++
      },
      defineModules: (state, { payload }: { payload: AppModulesType }) => {
         state.appConfigs = payload.appConfigs
         state.moduleKeys = payload.moduleKeys
         state.lastMKeys = payload.lastMKeys
         state.pinnedKeys = payload.pinnedKeys
      },
      refreshContext: state => {
         state.appRefresh++
      },
      defineContext: (state, { payload }: PayloadAction) => {
         state.context = payload as any
      },
      defineInstance: (state, { payload }: { payload: any }) => {
         state.instance = payload
      },
      displayAlert: (state, { payload }: { payload: AppAlertType }) => {
         state.appAlert = payload
      },
      clearAlert: state => {
         state.appAlert = undefined
      },
   },
})

export const {
   appLoading,
   refreshCollection,
   defineContext,
   refreshContext,
   defineModules,
   displayAlert,
   clearAlert,
   defineInstance,
}: any = appSlice.actions
