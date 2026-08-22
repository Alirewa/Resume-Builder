import type { ResumeData, ResumeLanguage } from './types'

/**
 * Demo content used by the template gallery and the "load sample" action.
 * One version per resume language so the gallery never shows a German CV to
 * someone browsing the app in Persian.
 */

const de: ResumeData = {
  language: 'de',
  template: 1,
  personal: {
    firstName: 'Max',
    lastName: 'Mustermann',
    jobTitle: 'Softwareentwickler / Full-Stack Developer',
    birthDate: '12.08.1990',
    birthPlace: 'Wien',
    nationality: 'Österreich',
    address: 'Musterstraße 42, 1010 Wien',
    phone: '+43 650 1234567',
    email: 'max.mustermann@example.com',
    website: 'github.com/mustermann',
    avatar: null,
    profile:
      'Erfahrener Full-Stack Entwickler mit über 6 Jahren Praxis in der Webentwicklung. Spezialisierung auf React, Node.js und Cloud-Architekturen. Leidenschaft für sauberen Code, Performance-Optimierung und agile Arbeitsweisen.',
  },
  experience: [
    {
      id: 'exp1',
      company: 'TechVision GmbH',
      role: 'Senior Frontend Developer',
      startDate: '03/2021',
      endDate: '',
      current: true,
      bullets: [
        'Entwicklung und Wartung einer SaaS-Plattform mit React und TypeScript',
        'Leitung eines 4-köpfigen Entwicklerteams und Code-Reviews',
        'Optimierung der Ladezeiten um 40% durch Lazy Loading und Caching',
        'Enge Zusammenarbeit mit UX/UI-Design und Produktmanagement',
      ],
    },
    {
      id: 'exp2',
      company: 'Digital Agency Pixel',
      role: 'Frontend Developer',
      startDate: '06/2018',
      endDate: '02/2021',
      current: false,
      bullets: [
        'Entwicklung responsiver Webapplikationen mit Vue.js und Nuxt',
        'Integration von REST-APIs und GraphQL-Schnittstellen',
        'Mitarbeit an 15+ Kundenprojekten in verschiedenen Branchen',
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'TU Wien',
      degree: 'Master of Science',
      field: 'Informatik',
      startDate: '10/2015',
      endDate: '06/2018',
      notes: 'Schwerpunkt: Software Engineering & Web Technologies',
    },
    {
      id: 'edu2',
      institution: 'FH Technikum Wien',
      degree: 'Bachelor',
      field: 'Informationstechnik',
      startDate: '10/2012',
      endDate: '07/2015',
      notes: '',
    },
  ],
  skills: [
    { id: 'sk1', category: 'Frontend', items: ['React', 'TypeScript', 'Vue.js', 'Next.js', 'Tailwind CSS'] },
    { id: 'sk2', category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST / GraphQL'] },
    { id: 'sk3', category: 'Tools & DevOps', items: ['Git', 'Docker', 'CI/CD', 'AWS', 'Figma'] },
  ],
  languages: [
    { id: 'l1', name: 'Deutsch', level: 'Muttersprache' },
    { id: 'l2', name: 'Englisch', level: 'C1' },
    { id: 'l3', name: 'Französisch', level: 'A2' },
  ],
  certificates: [
    { id: 'c1', name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '05/2023' },
    { id: 'c2', name: 'Google UX Design Certificate', issuer: 'Google', date: '11/2022' },
  ],
  additionalSkills: [
    'Führerschein Klasse B',
    'Agile / Scrum Methodik',
    'Teamführung & Mentoring',
    'Technische Dokumentation',
  ],
  interests: ['Open Source', 'Klettern', 'Fotografie', 'Reisen'],
}

const en: ResumeData = {
  language: 'en',
  template: 1,
  personal: {
    firstName: 'Alex',
    lastName: 'Morgan',
    jobTitle: 'Software Engineer / Full-Stack Developer',
    birthDate: '12.08.1990',
    birthPlace: 'Manchester',
    nationality: 'British',
    address: '42 Example Road, London E1 6AN',
    phone: '+44 7700 900123',
    email: 'alex.morgan@example.com',
    website: 'github.com/alexmorgan',
    avatar: null,
    profile:
      'Full-stack engineer with 6+ years building web products end to end. Specialised in React, Node.js and cloud architecture, with a strong bias towards clean code, measurable performance work and collaborative delivery.',
  },
  experience: [
    {
      id: 'exp1',
      company: 'TechVision Ltd.',
      role: 'Senior Frontend Developer',
      startDate: '03/2021',
      endDate: '',
      current: true,
      bullets: [
        'Built and maintained a multi-tenant SaaS platform in React and TypeScript',
        'Led a team of four engineers and owned the code review process',
        'Cut initial load time by 40% through code splitting and caching',
        'Partnered closely with design and product on the roadmap',
      ],
    },
    {
      id: 'exp2',
      company: 'Pixel Digital Agency',
      role: 'Frontend Developer',
      startDate: '06/2018',
      endDate: '02/2021',
      current: false,
      bullets: [
        'Delivered responsive web applications with Vue.js and Nuxt',
        'Integrated REST and GraphQL APIs across the client portfolio',
        'Shipped 15+ client projects across retail, fintech and media',
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'University of Manchester',
      degree: 'MSc',
      field: 'Computer Science',
      startDate: '10/2015',
      endDate: '06/2018',
      notes: 'Focus: software engineering and web technologies',
    },
    {
      id: 'edu2',
      institution: 'Leeds Beckett University',
      degree: 'BSc',
      field: 'Information Technology',
      startDate: '10/2012',
      endDate: '07/2015',
      notes: '',
    },
  ],
  skills: [
    { id: 'sk1', category: 'Frontend', items: ['React', 'TypeScript', 'Vue.js', 'Next.js', 'Tailwind CSS'] },
    { id: 'sk2', category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST / GraphQL'] },
    { id: 'sk3', category: 'Tools & DevOps', items: ['Git', 'Docker', 'CI/CD', 'AWS', 'Figma'] },
  ],
  languages: [
    { id: 'l1', name: 'English', level: 'Native' },
    { id: 'l2', name: 'German', level: 'B2' },
    { id: 'l3', name: 'Spanish', level: 'A2' },
  ],
  certificates: [
    { id: 'c1', name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '05/2023' },
    { id: 'c2', name: 'Google UX Design Certificate', issuer: 'Google', date: '11/2022' },
  ],
  additionalSkills: [
    'Full driving licence',
    'Agile / Scrum',
    'Team leadership & mentoring',
    'Technical writing',
  ],
  interests: ['Open source', 'Climbing', 'Photography', 'Travel'],
}

const fa: ResumeData = {
  language: 'fa',
  template: 1,
  personal: {
    firstName: 'علی',
    lastName: 'احمدی',
    jobTitle: 'مهندس نرم‌افزار / توسعه‌دهنده فول‌استک',
    birthDate: '۱۲.۰۸.۱۳۶۹',
    birthPlace: 'اصفهان',
    nationality: 'ایران',
    address: 'تهران، خیابان ولیعصر',
    phone: '+۹۸ ۹۱۲ ۱۲۳ ۴۵۶۷',
    email: 'ali.ahmadi@example.com',
    website: 'github.com/aliahmadi',
    avatar: null,
    profile:
      'توسعه‌دهنده فول‌استک با بیش از ۶ سال تجربه در ساخت محصولات وب. متخصص در React، Node.js و معماری ابری، با تمرکز بر کد تمیز، بهینه‌سازی کارایی و کار تیمی چابک.',
  },
  experience: [
    {
      id: 'exp1',
      company: 'شرکت تک‌ویژن',
      role: 'توسعه‌دهنده ارشد فرانت‌اند',
      startDate: '۰۳/۱۴۰۰',
      endDate: '',
      current: true,
      bullets: [
        'توسعه و نگهداری یک پلتفرم SaaS با React و TypeScript',
        'سرپرستی تیم چهار نفره و مسئولیت بازبینی کد',
        'کاهش ۴۰ درصدی زمان بارگذاری با کدشکنی و کشینگ',
        'همکاری نزدیک با تیم طراحی تجربه کاربری و مدیریت محصول',
      ],
    },
    {
      id: 'exp2',
      company: 'آژانس دیجیتال پیکسل',
      role: 'توسعه‌دهنده فرانت‌اند',
      startDate: '۰۶/۱۳۹۷',
      endDate: '۰۲/۱۳۹۹',
      current: false,
      bullets: [
        'ساخت اپلیکیشن‌های وب واکنش‌گرا با Vue.js و Nuxt',
        'یکپارچه‌سازی سرویس‌های REST و GraphQL',
        'مشارکت در بیش از ۱۵ پروژه مشتری در صنایع مختلف',
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'دانشگاه صنعتی اصفهان',
      degree: 'کارشناسی ارشد',
      field: 'مهندسی نرم‌افزار',
      startDate: '۱۰/۱۳۹۴',
      endDate: '۰۶/۱۳۹۷',
      notes: 'گرایش: مهندسی نرم‌افزار و فناوری‌های وب',
    },
    {
      id: 'edu2',
      institution: 'دانشگاه آزاد اسلامی',
      degree: 'کارشناسی',
      field: 'فناوری اطلاعات',
      startDate: '۱۰/۱۳۹۱',
      endDate: '۰۷/۱۳۹۴',
      notes: '',
    },
  ],
  skills: [
    { id: 'sk1', category: 'فرانت‌اند', items: ['React', 'TypeScript', 'Vue.js', 'Next.js', 'Tailwind CSS'] },
    { id: 'sk2', category: 'بک‌اند', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST / GraphQL'] },
    { id: 'sk3', category: 'ابزارها', items: ['Git', 'Docker', 'CI/CD', 'AWS', 'Figma'] },
  ],
  languages: [
    { id: 'l1', name: 'فارسی', level: 'زبان مادری' },
    { id: 'l2', name: 'انگلیسی', level: 'C1' },
    { id: 'l3', name: 'آلمانی', level: 'B1' },
  ],
  certificates: [
    { id: 'c1', name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '۰۵/۱۴۰۲' },
    { id: 'c2', name: 'گواهی طراحی تجربه کاربری گوگل', issuer: 'Google', date: '۱۱/۱۴۰۱' },
  ],
  additionalSkills: ['گواهینامه رانندگی', 'متدولوژی اسکرام', 'رهبری و منتورینگ تیم', 'مستندسازی فنی'],
  interests: ['متن‌باز', 'کوهنوردی', 'عکاسی', 'سفر'],
}

const samples: Record<ResumeLanguage, ResumeData> = { de, en, fa }

/** A fresh, independent copy of the sample resume for the given language. */
export function sampleResume(language: ResumeLanguage): ResumeData {
  return structuredClone(samples[language])
}
