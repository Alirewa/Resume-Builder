<div dir="rtl">

# رزومه‌ساز اپلای‌فا | ApplyFA Resume Builder

یک وب‌اپلیکیشن مدرن برای ساخت رزومه‌های حرفه‌ای به زبان‌های فارسی، انگلیسی و آلمانی — با پشتیبانی کامل از RTL و خروجی PDF.

---

## ویژگی‌ها

- **۳ قالب حرفه‌ای** — کلاسیک، مدرن و دوستونه؛ همه با پشتیبانی کامل RTL/LTR
- **چندزبانه** — فارسی، انگلیسی و آلمانی با ترجمه کامل رابط کاربری
- **رنگ‌بندی اختصاصی** — انتخاب رنگ سازمانی برای قالب رزومه
- **حالت تاریک** — Dark mode کامل در سراسر اپلیکیشن
- **خروجی PDF** — دانلود مستقیم یا پرینت مرورگر با کیفیت بالا
- **درون‌ریزی / برون‌ریزی JSON** — ذخیره و بارگذاری اطلاعات رزومه
- **پیش‌نمایش موبایل** — مقیاس‌بندی هوشمند در صفحه‌های کوچک
- **ذخیره خودکار** — اطلاعات در localStorage مرورگر نگه داشته می‌شود

---

## تکنولوژی‌های استفاده‌شده

| ابزار | نسخه | کاربرد |
|---|---|---|
| Next.js | 16.2.6 | فریم‌ورک اصلی (App Router) |
| React | 19 | رابط کاربری |
| TypeScript | 5 | تایپ‌سیفتی |
| Tailwind CSS | 4 | استایل‌دهی |
| Zustand | 5 | مدیریت state |
| html2canvas | 1.4 | کپچر قالب برای PDF |
| jsPDF | 4 | تولید فایل PDF |
| Vazirmatn | — | فونت فارسی |

---

## نصب و راه‌اندازی

```bash
# کلون کردن پروژه
git clone https://github.com/Alirewa/resume-builder-Fa.git
cd resume-builder-Fa

# نصب وابستگی‌ها
npm install

# اجرا در محیط توسعه
npm run dev
```

اپلیکیشن روی [http://localhost:3000](http://localhost:3000) در دسترس خواهد بود.

---

## ساختار پروژه

```
├── app/
│   ├── page.tsx           # صفحه اصلی (لندینگ)
│   ├── builder/           # فرم ساخت رزومه
│   ├── preview/           # پیش‌نمایش و خروجی
│   └── showcase/          # نمایش قالب‌ها
├── components/
│   ├── builder/           # استپ‌های فرم
│   ├── templates/         # Template1, Template2, Template3
│   └── ui/                # کامپوننت‌های عمومی
├── lib/
│   ├── store.ts           # Zustand store
│   ├── types.ts           # تایپ‌های TypeScript
│   ├── translations.ts    # ترجمه‌های FA/EN/DE
│   ├── pdf.ts             # منطق خروجی PDF
│   └── sampleData.ts      # داده نمونه
└── public/fonts/          # فونت Vazirmatn
```

---

## دستورات

```bash
npm run dev      # اجرای سرور توسعه
npm run build    # بیلد پروداکشن
npm run start    # اجرای بیلد پروداکشن
npm run lint     # بررسی کد
```

---

## نکات خروجی PDF

برای بهترین کیفیت PDF دو روش وجود دارد:

1. **دکمه PDF** — از html2canvas استفاده می‌کند، مستقیم دانلود می‌شود
2. **دکمه پرینت** — از رندرر native مرورگر استفاده می‌کند (کیفیت بهتر)
   - در دیالوگ پرینت گزینه **Save as PDF** را انتخاب کنید
   - Margins را روی **None** تنظیم کنید

</div>

---

<div dir="ltr">

# ApplyFA Resume Builder | رزومه‌ساز اپلای‌فا

A modern web application for building professional resumes in Persian (Farsi), English, and German — with full RTL support and PDF export.

---

## Features

- **3 Professional Templates** — Classic, Modern, and Two-Column; all with full RTL/LTR support
- **Multilingual** — Persian, English, and German with fully translated UI
- **Custom Accent Colors** — Choose your brand color for the resume template
- **Dark Mode** — Full dark mode support throughout the application
- **PDF Export** — Direct download or browser print with high quality output
- **JSON Import / Export** — Save and load your resume data as a JSON file
- **Mobile Preview Scaling** — Smart scaling on small screens for accurate preview
- **Auto-save** — Resume data is persisted in the browser's localStorage

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 16.2.6 | Core framework (App Router) |
| React | 19 | UI rendering |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| Zustand | 5 | State management |
| html2canvas | 1.4 | Template capture for PDF |
| jsPDF | 4 | PDF file generation |
| Vazirmatn | — | Persian font |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Alirewa/resume-builder-Fa.git
cd resume-builder-Fa

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
├── app/
│   ├── page.tsx           # Landing page
│   ├── builder/           # Resume builder form
│   ├── preview/           # Preview & export
│   └── showcase/          # Template gallery
├── components/
│   ├── builder/           # Form step components
│   ├── templates/         # Template1, Template2, Template3
│   └── ui/                # Shared UI components
├── lib/
│   ├── store.ts           # Zustand store
│   ├── types.ts           # TypeScript types
│   ├── translations.ts    # FA/EN/DE translations
│   ├── pdf.ts             # PDF export logic
│   └── sampleData.ts      # Sample resume data
└── public/fonts/          # Vazirmatn font files
```

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Run production build
npm run lint     # Lint the codebase
```

---

## PDF Export Tips

There are two ways to export your resume as PDF:

1. **PDF Button** — Uses html2canvas, downloads directly
2. **Print Button** — Uses the browser's native renderer (higher quality)
   - In the print dialog, select **Save as PDF**
   - Set Margins to **None**

---

## License

MIT

</div>
