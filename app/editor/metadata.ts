import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invoice Editor | Customize Your Invoice',
  description: 'Edit invoice details, preview templates, and download your invoice as a PDF. Fully customizable and easy to use',
  keywords: 'invoice editor, edit invoice, invoice template, PDF invoice, customize invoice',
  openGraph: {
    title: 'Invoice Editor | Customize Your Invoice',
    description: 'Edit invoice details, preview templates, and download your invoice as a PDF. Fully customizable and easy to use.',
    url: 'https://invoice-generator.plutotechnologies.org/editor',
    siteName: 'Invoice Generator',
    images: [
      {
        url: '/images/invoice-template-preview.png',
        width: 1200,
        height: 630,
        alt: 'Invoice Editor Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invoice Editor | Customize Your Invoice',
    description: 'Edit invoice details, preview templates, and download your invoice as a PDF. Fully customizable and easy to use.',
    images: ['/images/invoice-template-preview.png'],
  },
}
