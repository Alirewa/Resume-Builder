import type { Metadata } from 'next'
import './globals.css'
import DarkModeSync from '@/components/ui/DarkModeSync'

export const metadata: Metadata = {
  title: 'رزومه‌ساز | ApplyFA',
  description: 'رزومه حرفه‌ای خود را با قالب‌های زیبا بسازید — اختصاصی سایت اپلای فا',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300" suppressHydrationWarning>
        <DarkModeSync />
        {children}
      </body>
    </html>
  )
}
