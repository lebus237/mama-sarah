import '@/app/styles/globals.css'

import { Metadata } from 'next'
import { Bebas_Neue, Plus_Jakarta_Sans, Poppins, Cabin } from 'next/font/google'

import { App } from '@/app/entrypoint/App'

export const metadata: Metadata = {
   title: 'Mama Sarah | Fast food',
   icons: [],
}

const bebasNeue = Bebas_Neue({
   subsets: ['latin'],
   weight: ['400'],
   variable: '--font-bebas',
})

const plusJakarta = Plus_Jakarta_Sans({
   subsets: ['latin'],
   weight: ['400', '500', '600', '700'],
   variable: '--font-plus-jakarta',
})

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400', '500', '600', '700'],
   variable: '--font-poppins',
})

const cabin = Cabin({
   subsets: ['latin'],
   weight: ['400', '500', '600', '700'],
   variable: '--font-cabin',
})

// export const viewport: Viewport = {
//    themeColor: [
//       { media: '(prefers-color-scheme: light)', color: 'white' },
//       { media: '(prefers-color-scheme: dark)', color: 'black' },
//    ],
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html suppressHydrationWarning lang="en" className="h-full">
         <body
            className={`antialiased h-full [&>div]:h-full ${bebasNeue.variable} ${plusJakarta.variable} ${poppins.variable} ${cabin.variable}`}
         >
            <App children={children} />
         </body>
      </html>
   )
}
