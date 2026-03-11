import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
   return <div className="h-full bg-amber-100">{children}</div>
}
