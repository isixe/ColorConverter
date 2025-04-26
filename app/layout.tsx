import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import '@/styles/global.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host') || 'localhost:3000'
  const url = `${protocol}://${host}`

  return {
    title: 'ColorConverter',
    keywords:
      'color, color, color converter, color tool, color generator, color format',
    description:
      'A color conversion tool that supports conversions between RGB, HEX, HSL, HWB, and CMYK color formats.',
    alternates: {
      canonical: url
    },
    openGraph: {
      title: 'ColorConverter',
      description:
        'A color conversion tool that supports conversions between RGB, HEX, HSL, HWB, and CMYK color formats.',
      url,
      siteName: 'ColorConverter',
      locale: 'en'
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
