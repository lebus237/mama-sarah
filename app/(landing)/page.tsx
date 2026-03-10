import { getProducts } from '@/entities/product'
import { HomeProductList } from '@/views/home'
import HeroSection from '@/views/home/sections/HeroSection'

export default function Page() {
   const products = getProducts()

   return (
      <div>
         <HeroSection/>
         <HomeProductList products={products} />
      </div>
   )
}
