import 'swiper/css'
import 'swiper/css/navigation'

import { Providers } from './providers'

export function App({ children }: { children: React.ReactNode }) {
   return (
      <Providers>
         <div className="h-full">{children}</div>
      </Providers>
   )
}
