import { MobileOrderCounterDisplay } from '@/features/order'
import { ReactNode } from 'react'
import { Header } from './sections/Header'

export function OrderPanelLayout({ children }: { children: ReactNode }) {
   return (
      <div className="w-full h-full font-cabin text-secondary relative">
         <header className="w-full border-b border-gray-100 fixed top-0 left-0 z-50 bg-white">
            <div className="container h-16  md:h-20 ">
               <Header />
            </div>
         </header>
         <div className="h-16 md:h-20"></div>
         <main className="min-h-[calc(100%-144px)] md:min-h-[calc(100%-160px)]">{children}</main>
         <footer className="h-16 md:h-20 bg-secondary"></footer>
         <div className="fixed bottom-4 h-16  right-0 z-30 w-full content-center md:hidden">
            <div className="container h-full">
               <div className="mx-auto w-1/4">
                  <MobileOrderCounterDisplay />
               </div>
            </div>
         </div>
      </div>
   )
}
