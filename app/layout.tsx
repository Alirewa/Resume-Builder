import type { Metadata, Viewport } from 'next'
import './globals.css'
import ThemeSync from '@/components/ui/ThemeSync'
import { ToastProvider } from '@/components/ui/Toast'

export const metadata: Metadata = {
  title: 'Resume Builder — FA / EN / DE',
  description: 'Build professional resumes in Persian, English, and German with PDF export.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const fontFaces = (['Light', 'Regular', 'Medium', 'Bold'] as const)
  .map((weight, i) => {
    const weights = [300, 400, 500, 700]
    return `@font-face{font-family:'Vazirmatn';src:url('${basePath}/fonts/Vazirmatn-${weight}.woff2') format('woff2');font-weight:${weights[i]};font-style:normal;font-display:swap;}`
  })
  .join('')

/**
 * Applies theme, accent and language before first paint.
 *
 * The pages are statically exported, so `<html>` ships with the build-time
 * defaults; without this the user would see a flash of the light theme and the
 * wrong text direction on every navigation.
 */
const themeBootstrap = `
(function(){
  try {
    var raw = localStorage.getItem('resume-saz-data');
    if (!raw) return;
    var s = (JSON.parse(raw) || {}).state || {};
    var settings = s.settings || {};
    var root = document.documentElement;
    if (settings.darkMode) root.classList.add('dark');
    if (settings.accentColor) {
      root.style.setProperty('--accent', settings.accentColor);
      var n = parseInt(settings.accentColor.replace('#', ''), 16);
      if (isFinite(n)) {
        var rgb = ((n >> 16) & 255) + ', ' + ((n >> 8) & 255) + ', ' + (n & 255);
        root.style.setProperty('--accent-soft', 'rgba(' + rgb + ', 0.12)');
        root.style.setProperty('--accent-ring', 'rgba(' + rgb + ', 0.45)');
      }
    }
    if (settings.appLanguage) {
      root.lang = settings.appLanguage;
      root.dir = settings.appLanguage === 'fa' ? 'rtl' : 'ltr';
    }
  } catch (e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Vazirmatn is served locally so the app works offline and so
            html2canvas can rasterise Persian text correctly. */}
        <style dangerouslySetInnerHTML={{ __html: fontFaces }} />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body
        className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100"
        suppressHydrationWarning
      >
        <ThemeSync />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
