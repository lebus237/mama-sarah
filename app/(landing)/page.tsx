import { getProducts } from '@/entities/product'
import { HomeProductList } from '@/views/home'
import HeroSection from '@/views/home/sections/HeroSection'

// TODO: Simulated delay to preview loading animation (remove in production)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default async function Page() {
   await delay(5000) // 3 second delay to see loading animation

   const products = getProducts()

   return (
      <div>
         <HeroSection/>
         <HomeProductList products={products} />
      </div>
   )
}
