import { routePaths } from '@/shared/routes'
import Image from 'next/image'
import Link from 'next/link'
import { Fade } from 'react-awesome-reveal'
import { FaRegAddressBook } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'

const HeroSection = () => {
   const imageTab = ['/images/spaghetti.jpg', '/images/beer.jpg', '/images/rice.jpg']
   return (
      <div className="w-full h-full bg-cover bg-[url('/images/chicken.jpg')] bg-no-repeat"></div>
   )
}

export default HeroSection
