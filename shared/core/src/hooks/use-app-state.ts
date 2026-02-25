import { useDispatch, useSelector } from 'react-redux'

import * as action from '../state/app.store'
import type { AppModulesType, AppStateType } from '../state/app.store'
import { LocalStorage } from '../index'

export type InstanceType = {}

export function useAppState() {
   const dispatch = useDispatch()
   const context: AppStateType = useSelector((state: any) => state.appSlice)

   const defineLoading = (loading: boolean) => dispatch(action.appLoading(loading))
   const defineContext = (loading: any) => dispatch(action.defineContext(loading))
   const defineInstance = (data: any) => dispatch(action.defineInstance(data))
   const defineModules = (modules: AppModulesType) => dispatch(action.defineModules(modules))
   const refreshCollection = () => dispatch(action.refreshCollection())
   const refreshContext = () => dispatch(action.refreshContext())

   return {
      context,
      loading: context.loading,
      pinnedKeys: context.pinnedKeys,
      appRefresh: context.appRefresh,
      contextModules: context.context?.modules,
      instance: context.instance ?? LocalStorage.getInstance(),
      defineContext,
      defineLoading,
      defineModules,
      refreshContext,
      defineInstance,
      refreshCollection,
   }
}
