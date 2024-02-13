import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'



export const metadata: Metadata = {
  title: 'Next.js 14',
  description: 'Next.js 14 Crash Course',
}
const Copeland = localFont({
  src:'../public/font/Copeland.otf',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-slate-900 text-slate-100 text-2xl tracking-wide  ${Copeland.className}`}>
        <main className=''>
        {children}
        </main>
      </body>
    </html>
  )
}
