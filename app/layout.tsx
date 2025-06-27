import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Invoice Generator | Create Professional Invoices Instantly',
  description: 'Generate, preview, and download professional invoices with customizable templates. Fast, easy, and free invoice generator for businesses and freelancers.',
  keywords: 'invoice generator, free invoice, proforma invoice, business invoice, PDF invoice, customizable invoice, invoice template',
  openGraph: {
    title: 'Invoice Generator | Create Professional Invoices Instantly',
    description: 'Generate, preview, and download professional invoices with customizable templates. Fast, easy, and free invoice generator for businesses and freelancers.',
    url: 'https://invoice-generator.plutotechnologies.org/',
    siteName: 'Invoice Generator',
    images: [
      {
        url: '/images/invoice-template-preview.png',
        width: 1200,
        height: 630,
        alt: 'Invoice Generator Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invoice Generator | Create Professional Invoices Instantly',
    description: 'Generate, preview, and download professional invoices with customizable templates. Fast, easy, and free invoice generator for businesses and freelancers.',
    images: ['/images/invoice-template-preview.png'],
  },
  icons: {
    icon: '/placeholder-logo.png',
    shortcut: '/placeholder-logo.png',
    apple: '/placeholder-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
