import { ReactNode } from 'react'
import { LandingHeader } from './sections/LandingHeader'

export function LandingLayout({ children }: { children: ReactNode }) {
   return (
      <div className="h-full bg-white">
         <header className="lg:h-24 bg-primary content-center">
            <LandingHeader />
         </header>
         <main className="lg:h-[calc(100%-96px)]">{children}</main>
         {/*<footer className="md:h-24 bg-amber-100"></footer>*/}
      </div>
   )
}
