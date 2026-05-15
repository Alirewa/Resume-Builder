import type { ResumeData } from './types'

export const sampleDataDe: ResumeData = {
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
    {
      id: 'sk1',
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Vue.js', 'Next.js', 'Tailwind CSS'],
    },
    {
      id: 'sk2',
      category: 'Backend',
      items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST / GraphQL'],
    },
    {
      id: 'sk3',
      category: 'Tools & DevOps',
      items: ['Git', 'Docker', 'CI/CD', 'AWS', 'Figma'],
    },
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
