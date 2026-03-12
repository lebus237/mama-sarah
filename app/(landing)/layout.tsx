import { LandingLayout } from '@/widgets/layout'
import { ReactNode } from 'react'

export default function Page({ children }: { children: ReactNode }) {
   return <LandingLayout>{children}</LandingLayout>
}
