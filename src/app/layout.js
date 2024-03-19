import './globals.css'
import { Toaster } from "@/components/ui/sonner"
import Fonts from '@/components/fonts'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'SaaS Prompt Builder',
  description: 'Build and manage prompts for your SaaS application',
  openGraph: {
    title: 'SaaS Prompt Builder', 
    description: 'Build and manage prompts for your SaaS application',
    images: ['https://prompt.wavyr.com/images/PromptBuilder.png'],
  }
}

export default function RootLayout({ children }) {
  return (
      <html lang="en"> 
        <head>
          <Fonts />
          <meta name="robots" content="noindex" />
        </head>
        <body className="bg-gray-100">{children}
        <Analytics />
        </body>
        <Toaster richColors position="top-right"/>
      </html>
  
  )
}
