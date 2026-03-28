import 'swiper/css'

import { Providers } from './providers'

export function App({ children }: { children: React.ReactNode }) {
   return (
      <Providers>
         <div className="h-full">{children}</div>
      </Providers>
   )
}
