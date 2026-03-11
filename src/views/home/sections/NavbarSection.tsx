import { routePaths } from '@/shared/routes'
import Link from 'next/link'
import { FaPhoneAlt } from 'react-icons/fa'

const NavbarSection = () => {
   return (
      <div className="container">
         <div className="w-full flex items-center justify-between my-2 relative md:h-20 h-16">
            <div className="flex gap-8 text-lg font-bold">
               <Link href="/menu">Menu</Link>
               <Link href="/about-us">About Us</Link>
            </div>
            <img
               src="/images/hero.png"
               alt="logo image"
               className="h-15 w-15 rounded-full absolute hidden md:block lg:block left-[50%] top-6"
            />
            <div className="flex gap-4 ">
               <div className="hidden  lg:block ">
                  <div className="flex gap-2 text-2xl items-center ">
                     <FaPhoneAlt />
                     <p>+237 699 999 999 </p>
                  </div>
               </div>
               <button className="bg-primary h-10 w-40 rounded-full text-md text-white font-bold ">
                  <Link href={routePaths.ORDER}> Order Now</Link>
               </button>
            </div>
         </div>
      </div>
   )
}

export default NavbarSection
