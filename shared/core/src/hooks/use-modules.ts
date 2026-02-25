import { useState, useMemo } from 'react'
import { useAppState } from './use-app-state'
import { Permission } from '../utilities'
import { filteredConfigs } from '../lib'
import type { ModuleConfigType, ModuleKey } from '../types'

export function useModules() {
   const {
      context: { appConfigs: c, lastMKeys, pinnedKeys, context },
      contextModules,
      defineModules,
   } = useAppState()
   const [searchQuery, setSearchQuery] = useState('')

   let appConfigs: Record<ModuleKey, ModuleConfigType> = filteredConfigs(
      contextModules ?? [],
      c ?? {},
   )

   const parentModules = (appConfigs ? Object.values(appConfigs) : []).filter(item =>
      Permission.hasAccess(context?.locationAccess ?? [], item?.access ?? []),
   )

   // 🔹 Resolve pinned modules directly from appConfigs
   const pinnedModules = pinnedKeys
      .map((key: any) => appConfigs[key])
      .filter(item => Permission.hasAccess(context?.locationAccess ?? [], item?.access ?? []))

   const lastModules = lastMKeys
      .map((key: any) => appConfigs[key])
      .filter(item => Permission.hasAccess(context?.locationAccess ?? [], item?.access ?? []))

   // 🔹 All modules (parent + submodules)
   const modules = parentModules.flatMap(module => [...(module.children ?? [module])])

   const singleModules = parentModules.filter(module => module.children === undefined)

   const groupModules = parentModules.filter(module => module.children !== undefined)

   // 🔹 Filtered modules based on searchQuery matching name or description (case-insensitive)
   const searchedModules = useMemo(() => {
      if (!searchQuery.trim()) return modules

      const lowerQuery = searchQuery.toLowerCase()

      return modules.filter(module => {
         const nameMatch = `module.${module.name}`.toLowerCase().includes(lowerQuery)
         const descMatch =
            `module.${module.name}.description`?.toLowerCase().includes(lowerQuery) ?? false
         return nameMatch || descMatch
      })
   }, [searchQuery, parentModules])

   // 🔹 Search function setter
   const onSearchModule = (query: string) => {
      setSearchQuery(query)
   }

   const defineAppModules = (configs?: any, keys?: any, modules?: any) => {
      defineModules({
         moduleKeys: keys,
         pinnedKeys: keys ?? [],
         lastMKeys: (keys ?? []).slice(0, 2),
         appConfigs: filteredConfigs(modules, configs),
         pinnedModules: keys,
         modules: filteredConfigs(modules, configs),
      })
   }

   return {
      modules,
      lastModules,
      groupModules,
      singleModules,
      pinnedModules,
      parentModules,
      searchedModules,
      onSearchModule,
      defineAppModules,
   }
}
