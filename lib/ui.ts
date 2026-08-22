import type { AppLanguage } from './types'
import type { AccentKey } from './store'

/**
 * Strings for the application shell (navigation, buttons, dialogs).
 *
 * Deliberately separate from `lib/translations.ts`, which localizes the resume
 * *document*: a user can write a German CV while driving the app in Persian.
 */
export interface UiStrings {
  dir: 'rtl' | 'ltr'
  htmlLang: string

  appName: string
  appNameAccent: string

  nav: {
    home: string
    back: string
    edit: string
    preview: string
    build: string
    templates: string
  }

  home: {
    heroTitle: string
    heroSubtitle: string
    chooseTemplate: string
    start: string
    resume: string
    viewTemplates: string
    autosave: string
    featureLangTitle: string
    featureLangDesc: string
    featurePhotoTitle: string
    featurePhotoDesc: string
    featurePdfTitle: string
    featurePdfDesc: string
  }

  builder: {
    steps: [string, string, string, string, string]
    stepOf: (current: number, total: number) => string
    prev: string
    next: string
    viewResume: string
    getPdf: string
    clearForm: string
    clearTitle: string
    clearBody: string
    cancel: string
    confirmClear: string
    jsonSection: string
    exportJson: string
    importJson: string
    loadSample: string
    loadSampleTitle: string
    loadSampleBody: string
    confirmLoadSample: string
    completeness: string
    itemCount: (n: number) => string
    moveUp: string
    moveDown: string
  }

  preview: {
    print: string
    printTitle: string
    pdf: string
    exporting: string
    printHint: string
    templateN: (n: number) => string
    hideEmpty: string
    hideEmptyHint: string
  }

  showcase: {
    title: string
    subtitle: string
    zoom: string
    useTemplate: string
    close: string
    prevTemplate: string
    nextTemplate: string
    startWithTemplate: string
  }

  common: {
    accentColor: string
    darkMode: string
    lightMode: string
    appLanguage: string
    dismiss: string
  }

  templates: Record<1 | 2 | 3, { name: string; sub: string; desc: string }>

  colors: Record<AccentKey, string>

  toast: {
    importOk: string
    importBadJson: string
    importNotResume: string
    exportOk: string
    avatarNotImage: string
    avatarTooLarge: string
    avatarFailed: string
    storageFull: string
    pdfFailed: string
    sampleLoaded: string
    cleared: string
    undo: string
    undone: string
  }
}

const fa: UiStrings = {
  dir: 'rtl',
  htmlLang: 'fa',
  appName: 'رزومه‌ساز',
  appNameAccent: 'اختصاصی',
  nav: {
    home: 'خانه',
    back: 'بازگشت',
    edit: 'ویرایش',
    preview: 'پیش‌نمایش',
    build: 'ساخت رزومه',
    templates: 'قالب‌ها',
  },
  home: {
    heroTitle: 'رزومه حرفه‌ای خود را بسازید',
    heroSubtitle:
      'قالب مورد نظر را انتخاب کنید، اطلاعات‌تان را وارد کنید و رزومه را به PDF تبدیل کنید',
    chooseTemplate: 'انتخاب قالب رزومه',
    start: 'شروع ساخت رزومه',
    resume: 'ادامه ساخت رزومه',
    viewTemplates: 'پیش‌نمایش قالب‌ها',
    autosave: 'اطلاعات به صورت خودکار در همین مرورگر ذخیره می‌شود',
    featureLangTitle: 'سه‌زبانه',
    featureLangDesc: 'فارسی، انگلیسی و آلمانی',
    featurePhotoTitle: 'تصویر پروفایل',
    featurePhotoDesc: 'آپلود عکس در رزومه',
    featurePdfTitle: 'خروجی PDF',
    featurePdfDesc: 'دانلود با یک کلیک',
  },
  builder: {
    steps: ['اطلاعات شخصی', 'سابقه کاری', 'تحصیلات', 'مهارت‌ها', 'زبان‌ها و گواهینامه‌ها'],
    stepOf: (c, t) => `مرحله ${c} از ${t}`,
    prev: 'مرحله قبل',
    next: 'مرحله بعد',
    viewResume: 'مشاهده رزومه',
    getPdf: 'دریافت PDF',
    clearForm: 'پاک کردن فرم',
    clearTitle: 'پاک کردن فرم',
    clearBody: 'تمام اطلاعات وارد شده پاک می‌شود. آیا مطمئن هستید؟',
    cancel: 'انصراف',
    confirmClear: 'بله، پاک کن',
    jsonSection: 'فایل JSON',
    exportJson: 'برون‌ریزی JSON',
    importJson: 'درون‌ریزی JSON',
    loadSample: 'بارگذاری نمونه',
    loadSampleTitle: 'بارگذاری رزومه نمونه',
    loadSampleBody: 'اطلاعات فعلی با یک رزومه نمونه جایگزین می‌شود. ادامه می‌دهید؟',
    confirmLoadSample: 'بله، بارگذاری کن',
    completeness: 'تکمیل رزومه',
    itemCount: (n) => `${n} مورد`,
    moveUp: 'انتقال به بالا',
    moveDown: 'انتقال به پایین',
  },
  preview: {
    print: 'چاپ',
    printTitle: 'چاپ / ذخیره به‌عنوان PDF',
    pdf: 'PDF',
    exporting: 'در حال ساخت…',
    printHint: 'بهترین کیفیت خروجی: دکمه چاپ ← «Save as PDF» در مرورگر',
    templateN: (n) => `قالب ${n}`,
    hideEmpty: 'پنهان کردن بخش‌های خالی',
    hideEmptyHint: 'بخش‌هایی که پر نکرده‌اید در رزومه نمایش داده نمی‌شوند',
  },
  showcase: {
    title: 'پیش‌نمایش قالب‌های رزومه',
    subtitle: 'روی هر قالب کلیک کنید تا بزرگ‌نمایی شود',
    zoom: 'بزرگ‌نمایی',
    useTemplate: 'استفاده از این قالب',
    close: 'بستن',
    prevTemplate: 'قالب قبلی',
    nextTemplate: 'قالب بعدی',
    startWithTemplate: 'انتخاب این قالب و شروع ساخت رزومه',
  },
  common: {
    accentColor: 'رنگ قالب',
    darkMode: 'حالت تاریک',
    lightMode: 'حالت روشن',
    appLanguage: 'زبان برنامه',
    dismiss: 'بستن',
  },
  templates: {
    1: { name: 'کلاسیک', sub: 'Classic', desc: 'ساختار ساده و تمیز، مناسب برای خوانایی ATS' },
    2: { name: 'مدرن', sub: 'Modern', desc: 'دو ستونه با سایدبار رنگی — ظاهر حرفه‌ای' },
    3: { name: 'خلاقانه', sub: 'Creative', desc: 'تایم‌لاین و تگ‌های رنگی — مدرن و متفاوت' },
  },
  colors: {
    blue: 'آبی',
    violet: 'بنفش',
    green: 'سبز',
    red: 'قرمز',
    orange: 'نارنجی',
    pink: 'صورتی',
    cyan: 'فیروزه‌ای',
    slate: 'مشکی',
  },
  toast: {
    importOk: 'رزومه با موفقیت بارگذاری شد',
    importBadJson: 'فایل خراب است — مطمئن شوید یک فایل JSON سالم انتخاب کرده‌اید',
    importNotResume: 'ساختار رزومه در این فایل پیدا نشد',
    exportOk: 'فایل JSON ذخیره شد',
    avatarNotImage: 'فقط فایل تصویری می‌توانید انتخاب کنید',
    avatarTooLarge: 'حجم تصویر بیش از حد زیاد است (حداکثر ۱۰ مگابایت)',
    avatarFailed: 'خواندن تصویر ممکن نشد',
    storageFull:
      'حافظه مرورگر پر است — تغییرات ذخیره نشد. تصویر کوچک‌تری انتخاب کنید یا خروجی JSON بگیرید.',
    pdfFailed: 'ساخت PDF ممکن نشد — از دکمه چاپ استفاده کنید',
    sampleLoaded: 'رزومه نمونه بارگذاری شد',
    cleared: 'فرم پاک شد',
    undo: 'بازگردانی',
    undone: 'تغییر بازگردانده شد',
  },
}

const en: UiStrings = {
  dir: 'ltr',
  htmlLang: 'en',
  appName: 'Resume',
  appNameAccent: 'Builder',
  nav: {
    home: 'Home',
    back: 'Back',
    edit: 'Edit',
    preview: 'Preview',
    build: 'Build resume',
    templates: 'Templates',
  },
  home: {
    heroTitle: 'Build your professional resume',
    heroSubtitle: 'Pick a template, fill in your details, and export a print-ready PDF.',
    chooseTemplate: 'Choose a template',
    start: 'Start building',
    resume: 'Continue building',
    viewTemplates: 'Browse templates',
    autosave: 'Your data is saved automatically in this browser',
    featureLangTitle: 'Three languages',
    featureLangDesc: 'Persian, English and German',
    featurePhotoTitle: 'Profile photo',
    featurePhotoDesc: 'Add a picture to your CV',
    featurePdfTitle: 'PDF export',
    featurePdfDesc: 'Download in one click',
  },
  builder: {
    steps: [
      'Personal info',
      'Work experience',
      'Education',
      'Skills',
      'Languages & certificates',
    ],
    stepOf: (c, t) => `Step ${c} of ${t}`,
    prev: 'Previous',
    next: 'Next',
    viewResume: 'View resume',
    getPdf: 'Get PDF',
    clearForm: 'Clear form',
    clearTitle: 'Clear the form',
    clearBody: 'Everything you have entered will be removed. Are you sure?',
    cancel: 'Cancel',
    confirmClear: 'Yes, clear it',
    jsonSection: 'JSON file',
    exportJson: 'Export JSON',
    importJson: 'Import JSON',
    loadSample: 'Load sample',
    loadSampleTitle: 'Load the sample resume',
    loadSampleBody: 'Your current data will be replaced by a sample resume. Continue?',
    confirmLoadSample: 'Yes, load it',
    completeness: 'Resume completeness',
    itemCount: (n) => (n === 1 ? '1 entry' : `${n} entries`),
    moveUp: 'Move up',
    moveDown: 'Move down',
  },
  preview: {
    print: 'Print',
    printTitle: 'Print / Save as PDF',
    pdf: 'PDF',
    exporting: 'Generating…',
    printHint: 'Best quality: use Print → “Save as PDF” in your browser',
    templateN: (n) => `Template ${n}`,
    hideEmpty: 'Hide empty sections',
    hideEmptyHint: 'Sections you left blank are omitted from the resume',
  },
  showcase: {
    title: 'Template gallery',
    subtitle: 'Click a template to view it full size',
    zoom: 'Zoom',
    useTemplate: 'Use this template',
    close: 'Close',
    prevTemplate: 'Previous template',
    nextTemplate: 'Next template',
    startWithTemplate: 'Use this template and start building',
  },
  common: {
    accentColor: 'Accent color',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    appLanguage: 'App language',
    dismiss: 'Dismiss',
  },
  templates: {
    1: {
      name: 'Classic',
      sub: 'Single column',
      desc: 'Clean and simple — the most ATS-friendly option',
    },
    2: { name: 'Modern', sub: 'Two column', desc: 'Colored sidebar with a professional feel' },
    3: {
      name: 'Creative',
      sub: 'Timeline',
      desc: 'Timeline and colored tags — modern and distinctive',
    },
  },
  colors: {
    blue: 'Blue',
    violet: 'Violet',
    green: 'Green',
    red: 'Red',
    orange: 'Orange',
    pink: 'Pink',
    cyan: 'Cyan',
    slate: 'Slate',
  },
  toast: {
    importOk: 'Resume imported successfully',
    importBadJson: 'That file is not valid JSON',
    importNotResume: 'No resume data found in that file',
    exportOk: 'JSON file saved',
    avatarNotImage: 'Please choose an image file',
    avatarTooLarge: 'That image is too large (10 MB maximum)',
    avatarFailed: 'The image could not be read',
    storageFull:
      'Browser storage is full — changes were not saved. Use a smaller photo or export to JSON.',
    pdfFailed: 'PDF export failed — please use the print button instead',
    sampleLoaded: 'Sample resume loaded',
    cleared: 'Form cleared',
    undo: 'Undo',
    undone: 'Change undone',
  },
}

const de: UiStrings = {
  dir: 'ltr',
  htmlLang: 'de',
  appName: 'Lebenslauf',
  appNameAccent: 'Generator',
  nav: {
    home: 'Start',
    back: 'Zurück',
    edit: 'Bearbeiten',
    preview: 'Vorschau',
    build: 'Lebenslauf erstellen',
    templates: 'Vorlagen',
  },
  home: {
    heroTitle: 'Erstellen Sie Ihren professionellen Lebenslauf',
    heroSubtitle: 'Vorlage wählen, Daten eingeben und als druckfertiges PDF exportieren.',
    chooseTemplate: 'Vorlage auswählen',
    start: 'Jetzt starten',
    resume: 'Weiter bearbeiten',
    viewTemplates: 'Vorlagen ansehen',
    autosave: 'Ihre Daten werden automatisch in diesem Browser gespeichert',
    featureLangTitle: 'Dreisprachig',
    featureLangDesc: 'Persisch, Englisch und Deutsch',
    featurePhotoTitle: 'Profilfoto',
    featurePhotoDesc: 'Foto im Lebenslauf',
    featurePdfTitle: 'PDF-Export',
    featurePdfDesc: 'Download mit einem Klick',
  },
  builder: {
    steps: [
      'Persönliche Infos',
      'Berufserfahrung',
      'Ausbildung',
      'Fähigkeiten',
      'Sprachen & Zertifikate',
    ],
    stepOf: (c, t) => `Schritt ${c} von ${t}`,
    prev: 'Zurück',
    next: 'Weiter',
    viewResume: 'Lebenslauf ansehen',
    getPdf: 'PDF erhalten',
    clearForm: 'Formular leeren',
    clearTitle: 'Formular leeren',
    clearBody: 'Alle eingegebenen Daten werden gelöscht. Sind Sie sicher?',
    cancel: 'Abbrechen',
    confirmClear: 'Ja, löschen',
    jsonSection: 'JSON-Datei',
    exportJson: 'JSON exportieren',
    importJson: 'JSON importieren',
    loadSample: 'Beispiel laden',
    loadSampleTitle: 'Beispiel-Lebenslauf laden',
    loadSampleBody: 'Ihre aktuellen Daten werden durch ein Beispiel ersetzt. Fortfahren?',
    confirmLoadSample: 'Ja, laden',
    completeness: 'Vollständigkeit',
    itemCount: (n) => (n === 1 ? '1 Eintrag' : `${n} Einträge`),
    moveUp: 'Nach oben',
    moveDown: 'Nach unten',
  },
  preview: {
    print: 'Drucken',
    printTitle: 'Drucken / Als PDF speichern',
    pdf: 'PDF',
    exporting: 'Wird erstellt…',
    printHint: 'Beste Qualität: Drucken → „Als PDF speichern“ im Browser',
    templateN: (n) => `Vorlage ${n}`,
    hideEmpty: 'Leere Abschnitte ausblenden',
    hideEmptyHint: 'Nicht ausgefüllte Abschnitte erscheinen nicht im Lebenslauf',
  },
  showcase: {
    title: 'Vorlagen-Galerie',
    subtitle: 'Klicken Sie auf eine Vorlage für die Großansicht',
    zoom: 'Vergrößern',
    useTemplate: 'Diese Vorlage verwenden',
    close: 'Schließen',
    prevTemplate: 'Vorherige Vorlage',
    nextTemplate: 'Nächste Vorlage',
    startWithTemplate: 'Mit dieser Vorlage starten',
  },
  common: {
    accentColor: 'Akzentfarbe',
    darkMode: 'Dunkelmodus',
    lightMode: 'Hellmodus',
    appLanguage: 'App-Sprache',
    dismiss: 'Schließen',
  },
  templates: {
    1: { name: 'Klassisch', sub: 'Einspaltig', desc: 'Schlicht und klar — am besten für ATS lesbar' },
    2: { name: 'Modern', sub: 'Zweispaltig', desc: 'Farbige Seitenleiste, professionelle Wirkung' },
    3: { name: 'Kreativ', sub: 'Timeline', desc: 'Zeitstrahl und farbige Tags — modern und markant' },
  },
  colors: {
    blue: 'Blau',
    violet: 'Violett',
    green: 'Grün',
    red: 'Rot',
    orange: 'Orange',
    pink: 'Pink',
    cyan: 'Türkis',
    slate: 'Anthrazit',
  },
  toast: {
    importOk: 'Lebenslauf erfolgreich importiert',
    importBadJson: 'Diese Datei ist kein gültiges JSON',
    importNotResume: 'In dieser Datei wurden keine Lebenslaufdaten gefunden',
    exportOk: 'JSON-Datei gespeichert',
    avatarNotImage: 'Bitte wählen Sie eine Bilddatei',
    avatarTooLarge: 'Das Bild ist zu groß (maximal 10 MB)',
    avatarFailed: 'Das Bild konnte nicht gelesen werden',
    storageFull:
      'Der Browserspeicher ist voll — Änderungen wurden nicht gespeichert. Nutzen Sie ein kleineres Foto oder exportieren Sie als JSON.',
    pdfFailed: 'PDF-Export fehlgeschlagen — bitte den Drucken-Button verwenden',
    sampleLoaded: 'Beispiel-Lebenslauf geladen',
    cleared: 'Formular geleert',
    undo: 'Rückgängig',
    undone: 'Änderung rückgängig gemacht',
  },
}

export const uiStrings: Record<AppLanguage, UiStrings> = { fa, en, de }

export const APP_LANGUAGE_OPTIONS: { value: AppLanguage; label: string; flag: string }[] = [
  { value: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
]
