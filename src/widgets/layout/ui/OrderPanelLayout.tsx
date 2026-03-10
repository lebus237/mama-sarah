import { ReactNode } from 'react'
import { Header } from './components/Header'

export function OrderPanelLayout({ children }: { children: ReactNode }) {
   return (
      <div className="w-full h-full font-cabin text-secondary ">
         <header className="w-full border-b border-gray-100 fixed top-0 left-0 z-50 bg-white">
            <div className="container h-16  md:h-20 ">
               <Header />
            </div>
         </header>
         <main className="min-h-[calc(100%-144px)] md:min-h-[calc(100%-160px)] mt-16 md:mt-20">
            {children}
         </main>
         <footer className="h-16 md:h-20 bg-secondary"></footer>
      </div>
   )
}
