import { OrderPanelLayout } from '@/widgets/layout'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
   return <OrderPanelLayout>{children}</OrderPanelLayout>
}
