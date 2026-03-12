import { getProducts } from '@/entities/product'
import { HomePage } from '@/views/home'

// TODO: Simulated delay to preview loading animation (remove in production)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default async function Page() {
   await delay(5000) // 3 second delay to see loading animation

   const products = getProducts()

   return <HomePage products={products} />
}
