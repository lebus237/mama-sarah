import Image from 'next/image'
import LandinSections from '@/views/share/LandingSections'

const OurChefSection = () => {
   return (
      <div className="container overflow-hidden">
         <center>
            <h1 className="font-extrabold text-5xl py-8">Our Chefs</h1>
         </center>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <aside>
               <figure className="w-full">
                  <div className="w-80 h-90 relative mx-auto md:mx-0">
                     <Image
                        src="/images/chef.jpg"
                        alt="about"
                        fill
                        className="z-10 absolute object-cover rounded-2xl"
                     />
                  </div>
               </figure>
            </aside>
            <LandinSections
               name=" ⸺Masterchef's message"
               title="Herman Miler"
               desciption=" All about quality you can trust. As one of the original founding pizza brands and the
               3rd largest pizza chain, our sole mission is making the freshest, tastiest."
               subDescription="Lorem ipsum dolor amet consectetur pellentesque blandit ultrices purus suspendisse iaculis ultricies sagittis. Proin vulputate eleifend cras lacinia iaculis feugiat egestas neque sodales."
            />
         </div>
      </div>
   )
}

export default OurChefSection
