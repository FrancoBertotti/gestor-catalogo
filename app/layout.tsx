import type { Metadata, Viewport } from 'next'
import { fontPrincipal, fontSecundaria } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gestor Practical',
  description: 'Panel de administración del catálogo',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fontPrincipal.variable} ${fontSecundaria.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-black text-white selection:bg-[#dc4a1b] selection:text-white">
        {children}
      </body>
    </html>
  )
}
