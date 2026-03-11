import { routePaths } from '@/shared/routes'
import Link from 'next/link'
import { FaPhoneAlt } from 'react-icons/fa'
import { Slide } from 'react-awesome-reveal'

interface ILanndingSection {
   title?: string
   desciption?: string
   name?: string
   Butname?: string
   subDescription?: string
}

const LandinSections = (props: ILanndingSection) => {
   return (
      <aside className="flex flex-col gap-8">
         <Slide duration={1000} direction="up" delay={0}>
            <h4 className="text-xl font-extrabold text-primary">{props.name}</h4>
         </Slide>
         <Slide duration={2000} delay={20} direction="up">
            <h1 className="text-5xl font-extrabold">{props.title} </h1>
         </Slide>
         <Slide direction="up" duration={3000}>
            <p>{props.desciption}</p>
            <p className="text-gray-500">{props.subDescription}</p>
         </Slide>
         {props.Butname && (
            <Slide direction="up" duration={4000}>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <button className="bg-primary p-4 rounded-2xl text-xl  text-white hover:text-primary hover:border-primary hover:border-2 transition ease-in-out duration-500 hover:bg-white font-bold animate-[slideRight_1.1s_ease-out_1_forwards]">
                        <Link href={routePaths.OURCHEF}> {props.Butname} </Link>
                     </button>
                  </div>
                  <div className="flex flex-col">
                     <div className="flex gap-2 text-lg items-center ">
                        <FaPhoneAlt />
                        <p>+237 699 999 999 </p>
                     </div>
                     <div className="flex gap-2 text-lg items-center ">
                        <FaPhoneAlt />
                        <p>+237 699 999 999 </p>
                     </div>
                     <div className="flex gap-2 text-lg items-center ">
                        <FaPhoneAlt />
                        <p>+237 699 999 999 </p>
                     </div>
                  </div>
               </div>
            </Slide>
         )}
      </aside>
   )
}

export default LandinSections
