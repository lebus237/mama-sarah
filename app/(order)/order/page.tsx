import { OrderPage } from '@/views/order'

// Simulated delay to preview loading animation (remove in production)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
export default async function Page() {
   await delay(1000) // 5 second delay to see loading animation

   return <OrderPage />
}
