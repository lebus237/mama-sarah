import type { EnumValues } from '../utilities'

export interface ViewPortType {
   isMobile: boolean
   isTablet: boolean
   isLargeTablet: boolean
   isDesktop: boolean
   isLargeDesktop: boolean
}

export type ModuleKey = string

export interface AppContextType {
   modules: any
   companyId: string
   locationId: string
   employeeId: string
   userId: string
   companyName: string
   locationName: string
   profileName: string
   profileEmail: string
   profilePhone: string
   locationAccess: EnumValues<string>[]
   access: EnumValues<string>[]
}

export type ModuleItemType = {
   key: string
   name: string
   icon: any
   path: string
   access?: EnumValues<any> | EnumValues<any>[]
}

export type ModuleConfigType = {
   key: string
   name: string
   icon: any
   path?: string
   access?: EnumValues<any> | EnumValues<any>[]
   children?: ModuleItemType[]
}

export enum NotificationType {
   SUCCESS = 'success',
   ERROR = 'error',
   INFO = 'info',
   WARNING = 'warning',
   LOADING = 'loading',
}
