import { OrderCounterDisplay } from '@/app/features/order'
import Link from 'next/link'

export function OrderHeader() {
   return (
      <div className="flex justify-between items-center">
         <aside>
            <h1 className="text-3xl font-bold">Logo Food</h1>
         </aside>
         <nav className="xl:space-x-6 uppercase">
            <Link href="/">Acceuil</Link>
            <Link href="/order">Commander</Link>
         </nav>
         <aside>
            <OrderCounterDisplay />
         </aside>
      </div>
   )
}
