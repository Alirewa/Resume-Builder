'use client'

import Link from 'next/link'
import { useResumeStore } from '@/lib/store'
import type { TemplateId } from '@/lib/types'
import {
  DocumentTextIcon,
  LanguageIcon,
  PhotoIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  SunIcon,
  MoonIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'

const templates = [
  {
    id: 1 as TemplateId,
    name: 'قالب کلاسیک',
    nameEn: 'Classic Lebenslauf',
    description: 'رزومه سفید با ساختار کلاسیک آلمانی',
  },
  {
    id: 2 as TemplateId,
    name: 'قالب مدرن',
    nameEn: 'Modern Two-Column',
    description: 'دو ستونه با سایدبار آبی — حرفه‌ای',
  },
  {
    id: 3 as TemplateId,
    name: 'قالب خلاقانه',
    nameEn: 'Creative Accent',
    description: 'تایم‌لاین زیبا با تگ‌های رنگی',
  },
]

export default function HomePage() {
  const { resume, setTemplate, settings, toggleDarkMode } = useResumeStore()
  const dark = settings.darkMode

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${dark ? 'bg-gray-950 text-gray-100' : 'bg-gradient-to-br from-slate-100 to-blue-50 text-gray-900'}`}>

      {/* ── Header ── */}
      <header className={`border-b sticky top-0 z-20 ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-7 h-7 text-blue-500 flex-shrink-0" />
            <div>
              <h1 className="text-base sm:text-lg font-extrabold leading-tight">
                <span className={dark ? 'text-gray-100' : 'text-gray-800'}>رزومه‌ساز </span>
                <span className="text-blue-600">اختصاصی</span>
              </h1>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-xl transition cursor-pointer ${dark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            title={dark ? 'حالت روشن' : 'حالت تاریک'}
          >
            {dark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">

        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">رزومه حرفه‌ای خود را بسازید</h2>
          <p className={`text-sm sm:text-base max-w-xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            قالب مورد نظر را انتخاب کنید، اطلاعات‌تان را وارد کنید و رزومه را به PDF تبدیل کنید
          </p>
        </div>

        {/* Template cards */}
        <div className="mb-10">
          <h3 className={`text-sm sm:text-base font-bold mb-4 text-center ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
            انتخاب قالب رزومه
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {templates.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => setTemplate(tmpl.id)}
                className={`relative cursor-pointer rounded-2xl border-2 p-4 transition-all hover:shadow-lg ${
                  resume.template === tmpl.id
                    ? 'border-blue-500 shadow-md ' + (dark ? 'bg-blue-950' : 'bg-blue-50')
                    : dark
                    ? 'border-gray-700 bg-gray-800 hover:border-blue-500'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                {resume.template === tmpl.id && (
                  <div className="absolute top-2 left-2">
                    <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                  </div>
                )}
                <TemplateMiniPreview id={tmpl.id} dark={dark} />
                <div className="text-center mt-3">
                  <h4 className="font-bold text-sm">{tmpl.name}</h4>
                  <p className={`text-xs mt-0.5 ${dark ? 'text-gray-400' : 'text-gray-400'}`}>{tmpl.nameEn}</p>
                  <p className={`text-xs mt-1.5 leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{tmpl.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: <LanguageIcon className="w-6 h-6 text-blue-500" />, title: 'سه‌زبانه', desc: 'فارسی، انگلیسی و آلمانی' },
            { icon: <PhotoIcon className="w-6 h-6 text-green-500" />, title: 'تصویر پروفایل', desc: 'آپلود عکس در رزومه' },
            { icon: <ArrowDownTrayIcon className="w-6 h-6 text-purple-500" />, title: 'خروجی PDF', desc: 'دانلود با یک کلیک' },
          ].map((f) => (
            <div key={f.title} className={`rounded-xl p-4 text-center border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} shadow-sm`}>
              <div className="flex justify-center mb-2">{f.icon}</div>
              <h4 className="font-bold text-sm mb-1">{f.title}</h4>
              <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Link
            href="/builder"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-bold px-8 py-3 sm:py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            onClick={() => useResumeStore.getState().resetResume()}
          >
            <span>شروع ساخت رزومه</span>
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div>
            <Link
              href="/showcase"
              className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl border transition ${
                dark
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <EyeIcon className="w-4 h-4" />
              پیش‌نمایش قالب‌ها
            </Link>
          </div>
          <p className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>اطلاعات به صورت خودکار ذخیره می‌شود</p>
        </div>
      </main>

      {/* Footer */}
      <footer className={`text-center py-4 text-xs border-t ${dark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
        طراحی و توسعه با <span className="text-red-500">❤️</span> توسط{' '}
        <a href="https://github.com/Alirewa" target="_blank" rel="noopener noreferrer"
          className="font-medium hover:underline text-blue-500">@Alirewa</a>
      </footer>
    </div>
  )
}

function TemplateMiniPreview({ id, dark }: { id: TemplateId; dark: boolean }) {
  const bg = dark ? 'bg-gray-700' : 'bg-gray-50'
  const border = dark ? 'border-gray-600' : 'border-gray-100'

  return (
    <div className={`h-28 rounded-lg overflow-hidden ${bg} border ${border}`}>
      {id === 1 && (
        <div className="w-full h-full p-2 flex flex-col gap-1">
          <div className="w-10 h-2 bg-gray-400 rounded mx-auto" />
          <div className="flex gap-2 mt-1">
            <div className="w-7 h-7 bg-gray-300 rounded-full flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-1">
              <div className="h-1.5 bg-gray-500 rounded w-3/4" />
              <div className="h-1 bg-gray-300 rounded w-1/2" />
            </div>
          </div>
          <div className="mt-1 space-y-1">
            <div className="h-1 bg-gray-200 rounded" />
            <div className="h-1 bg-gray-200 rounded w-4/5" />
            <div className="h-1 bg-gray-200 rounded w-3/5" />
          </div>
        </div>
      )}
      {id === 2 && (
        <div className="w-full h-full flex">
          <div className="w-1/3 bg-blue-900 p-1.5 flex flex-col gap-1.5">
            <div className="w-7 h-7 bg-blue-600 rounded-full mx-auto" />
            <div className="h-1 bg-blue-500 rounded" />
            <div className="h-1 bg-blue-600 rounded w-3/4" />
          </div>
          <div className="flex-1 bg-white p-1.5 flex flex-col gap-1">
            <div className="h-2 bg-gray-700 rounded w-3/4" />
            <div className="h-1 bg-blue-400 rounded w-1/2" />
            <div className="h-1 bg-gray-200 rounded mt-0.5" />
            <div className="h-1 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      )}
      {id === 3 && (
        <div className="w-full h-full flex">
          <div className="w-1.5 bg-gradient-to-b from-violet-500 to-indigo-600 flex-shrink-0" />
          <div className="flex-1 p-2 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 bg-violet-100 rounded-full flex-shrink-0" />
              <div>
                <div className="h-2 bg-gray-600 rounded w-14" />
                <div className="h-1 bg-violet-400 rounded w-10 mt-0.5" />
              </div>
            </div>
            <div className="h-1 bg-gray-200 rounded" />
            <div className="h-1 bg-gray-200 rounded w-4/5" />
            <div className="flex gap-1 mt-0.5">
              <div className="h-1.5 bg-violet-200 rounded w-8" />
              <div className="h-1.5 bg-indigo-200 rounded w-6" />
              <div className="h-1.5 bg-violet-200 rounded w-10" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
