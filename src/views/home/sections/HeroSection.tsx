import { FaRegAddressBook } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import NavbarSection from '@/views/home/sections/NavbarSection'
import Link from 'next/link'
import { Fade } from 'react-awesome-reveal'
import Image from 'next/image'
import { routePaths } from '@/shared/routes'

const HeroSection = () => {
   const imageTab = ['/images/spaghetti.jpg', '/images/beer.jpg', '/images/rice.jpg']
   return (
      <div>
         <NavbarSection />
         <div
            className="w-full bg-cover "
            style={{
               backgroundImage: "url('/images/chicken.jpg')",
               backgroundRepeat: 'no-repeat',
            }}>
            <Fade duration={1500}>
               <div className=" animate-[slideRight_1.1s_ease-out_1_forwards] relative ">
                  <figure className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                     {imageTab.map((item, index) => (
                        <div key={index} className="  h-[22rem] w-[22rem] top-15 left-10 relative">
                           <Image
                              src={item}
                              alt={`food ${index + 1}`}
                              fill
                              className="object-cover rounded-full animate-[pulse_2s_ease-out_1] duration-1000"
                           />
                        </div>
                     ))}
                  </figure>
               </div>
            </Fade>
            <div className="grid grid-cols-1 md:grid-cols-3 pb-6 pt-30 pl-25 animate-[slideRight_1.1s_ease-out_1_forwards]">
               <div className="text-white text-2xl flex gap-2 items-center">
                  <FaRegAddressBook />
                  <p>Elig-Edzoa </p>
               </div>
               <div>
                  <button className="bg-primary p-8 rounded-full text-2xl md:block hidden text-white font-bold animate-[slideRight_1.1s_ease-out_1_forwards]">
                     <Link href={routePaths.ORDER}> Order Now</Link>
                  </button>
               </div>
               <div className="text-white flex gap-2 text-2xl items-center">
                  <MdOutlineEmail />
                  <p> decatechs@gmail.com </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeroSection
