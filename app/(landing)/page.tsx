import { getProducts } from '@/entities/product'
import { HomeProductList } from '@/views/home'

export default function Page() {
   const products = getProducts()

   return <HomeProductList products={products} />
}
