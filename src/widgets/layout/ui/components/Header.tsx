import { OrderCounterDisplay } from '@/features/order'
import Link from 'next/link'

export function Header() {
   return (
      <div className="flex justify-between items-cente ">
         <aside>
            <h1 className="text-3xl font-bold">Logo Food</h1>
         </aside>
         <nav className=" hidden md:block xl:space-x-6 uppercase">
            <Link href="/">Acceuil</Link>
            <Link href="/order">Commander</Link>
         </nav>
         <aside className=''>
            <OrderCounterDisplay />
         </aside>
      </div>
   )
}
