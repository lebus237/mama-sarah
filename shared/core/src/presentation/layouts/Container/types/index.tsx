import type { ReactNode } from '@tabler/icons-react'
import type { RightSidebarConfigType } from '../DesktopContainer/RightSidebarComponent'
import type { ModuleConfigType } from '../../../../types'

export interface ContainerProps {
   pageHeader?: {
      pageTitle?: string | ReactNode
      pageDescription?: string
   }
   tabs?: undefined | { key: string; title: string }[]
   mobileTopHeader?: ReactNode
   pageActions?: ReactNode
   children?: any
   rightConfig?: RightSidebarConfigType
   leftConfig?: ModuleConfigType
   withBackButton?: boolean
   paddingY?: string
   hideHeader?: boolean
}
