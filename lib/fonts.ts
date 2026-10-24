import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'

export const fontPrincipal = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-principal',
  display: 'swap',
})

export const fontSecundaria = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-secundaria',
  display: 'swap',
})
