import LandinSections from '@/views/share/LandingSections'
import Image from 'next/image'
import { Slide } from 'react-awesome-reveal'

export const OurChefPage = () => {
   return (
      <div className="container overflow-hidden">
         <center>
            <h1 className="font-extrabold text-5xl my-20 font-bebas">Our Chefs</h1>
         </center>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <aside className="flex-1 bgber-300">
               <figure className="w-full">
                  <Slide duration={1000} delay={100}>
                     <div className="w-4/5 h-90 relative mx-auto md:mx-0">
                        <Image
                           src="/images/chef.jpg"
                           alt="about"
                           fill
                           className="z-10 absolute object-cover rounded-2xl"
                        />
                     </div>
                  </Slide>
               </figure>
            </aside>
            <aside>
               <LandinSections
                  name=" ⸺Masterchef's message"
                  title="Herman Miler"
                  desciption=" All about quality you can trust. As one of the original founding pizza brands and the
              3rd largest pizza chain, our sole mission is making the freshest, tastiest."
                  subDescription="Lorem ipsum dolor amet consectetur pellentesque blandit ultrices purus suspendisse iaculis ultricies sagittis. Proin vulputate eleifend cras lacinia iaculis feugiat egestas neque sodales."
               />
            </aside>
         </div>
      </div>
   )
}
