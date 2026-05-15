import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,

  // برای deploy روی subdomain مثل resume.applyfa.com
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // برای export استاتیک (آپلود روی هاست اشتراکی)
  // output: 'export',

  images: {
    unoptimized: true, // لازم برای static export
  },

  // متغیرهای محیطی public
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
}

export default nextConfig
