import '@/app/styles/globals.css'

import { Metadata, Viewport } from 'next'

import { App } from '@/app/entrypoint/App'

export const metadata: Metadata = {
   title: 'Mama Sarah | Fast food',
   icons: [],
}

export const viewport: Viewport = {
   themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
   ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html suppressHydrationWarning lang="en" className="h-full">
         <body className={`antialiased h-full [&>div]:h-full`}>
            <App children={children} />
         </body>
      </html>
   )
}
