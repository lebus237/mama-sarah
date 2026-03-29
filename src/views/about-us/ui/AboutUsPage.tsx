import LandinSections from '@/views/home/ui/sections/LandingSections'
import Image from 'next/image'
import { Fade, Slide } from 'react-awesome-reveal'
import { HeroSection } from './sections/HeroSection'

export const AboutUsPage = () => {
   return (
      <div className="container overflow-hidden">
         <HeroSection title="A propos" />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LandinSections
               name=" ⸺Best African food for your family"
               title="Amazing and hygiene pasta and pizza parlor."
               desciption=" All about quality you can trust. As one of the original founding pizza brands and the
               3rd largest pizza chain, our sole mission is making the freshest, tastiest."
               Butname="Professional chefs"
            />
            <aside>
               <figure className="w-full">
                  <Fade direction="right" triggerOnce={false} duration={2000} delay={100}>
                     <div className="w-110 h-120 relative left-20">
                        <Image
                           src="/images/chicken.jpg"
                           alt="about"
                           fill
                           className="z-0 absolute object-cover right-0 top-10 rounded-2xl"
                        />
                     </div>
                  </Fade>
                  <Slide direction="down" triggerOnce={false} duration={1000} delay={50}>
                     <div className="w-80 h-90 relative bottom-80 right-0">
                        <Image
                           src="/images/chef.jpg"
                           alt="about"
                           fill
                           className="z-10 absolute object-cover rounded-2xl "
                        />
                     </div>
                  </Slide>
               </figure>
            </aside>
         </div>
      </div>
   )
}
