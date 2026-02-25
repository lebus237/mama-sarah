import { Outlet } from 'react-router-dom'
import { useViewPort } from '../../../hooks'
import DesktopLayout from './DesktopLayout'
import MobileLayout from './MobileLayout'
import type { DropdownItemType } from '../../components/dropdown'

export type AppLayoutProps = {
   logoutPath: string
   fetchCompanies: any
   fetchLocations: any
   modulePath: string
   changeContext: (id: string) => void
   quickActions: DropdownItemType[]
}

export default function AppLayout(props: AppLayoutProps) {
   const viewPort = useViewPort()

   let Layout = DesktopLayout

   if (viewPort.isMobile) {
      Layout = MobileLayout
   }

   return (
      <Layout {...props}>
         <Outlet />
      </Layout>
   )
}
