import type { Metadata } from 'next'
import './globals.css'
import DarkModeSync from '@/components/ui/DarkModeSync'

export const metadata: Metadata = {
  title: 'Resume Builder — FA / EN / DE',
  description: 'Build professional resumes in Persian, English, and German with PDF export.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300" suppressHydrationWarning>
        <DarkModeSync />
        {children}
      </body>
    </html>
  )
}
