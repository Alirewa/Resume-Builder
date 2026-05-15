import type { ResumeLanguage } from './types'

export interface Translations {
  // CV title
  cvTitle: string
  // Section titles
  profile: string
  experience: string
  education: string
  skills: string
  languages: string
  certificates: string
  additionalSkills: string
  interests: string
  personalInfo: string
  softwareSkills: string
  // Common words
  current: string
  dir: 'rtl' | 'ltr'
  sectionEmpty: string

  // Form labels
  form: {
    resumeLanguage: string
    profilePhoto: string
    choosePhoto: string
    removePhoto: string
    photoHint: string
    firstName: string
    lastName: string
    jobTitle: string
    birthDate: string
    birthPlace: string
    nationality: string
    phone: string
    address: string
    email: string
    profileText: string
    // placeholders
    ph: {
      firstName: string
      lastName: string
      jobTitle: string
      birthDate: string
      birthPlace: string
      nationality: string
      phone: string
      address: string
      email: string
      profileText: string
    }
    // Experience
    company: string
    role: string
    startDate: string
    endDate: string
    currentJob: string
    bullets: string
    bulletsHint: string
    // Education
    institution: string
    degree: string
    field: string
    notes: string
    // Skills
    skillCategory: string
    skillItems: string
    additionalSkillsLabel: string
    interestsLabel: string
    // Languages & Certs
    languageName: string
    languageLevel: string
    certName: string
    certIssuer: string
    certDate: string
    // Buttons
    addExperience: string
    addEducation: string
    addSkillGroup: string
    addLanguage: string
    addCertificate: string
    delete: string
    noExperience: string
    noEducation: string
    noSkills: string
    noLanguages: string
    noCertificates: string
    newCompany: string
    newInstitution: string
    newSkillGroup: string
    newLanguage: string
    newCertificate: string
  }
}

export const translations: Record<ResumeLanguage, Translations> = {
  de: {
    cvTitle: 'Lebenslauf',
    profile: 'Persönliches Profil',
    experience: 'Berufserfahrung',
    education: 'Ausbildung',
    skills: 'Fachkenntnisse',
    languages: 'Sprachkenntnisse',
    certificates: 'Zertifikate',
    additionalSkills: 'Weitere Fähigkeiten',
    interests: 'Interessen',
    personalInfo: 'Persönliche Infos',
    softwareSkills: 'Softwarekenntnisse',
    current: 'aktuell',
    dir: 'ltr',
    sectionEmpty: 'Dieser Abschnitt wurde noch nicht ausgefüllt',
    form: {
      resumeLanguage: 'Sprache des Lebenslaufs',
      profilePhoto: 'Profilfoto',
      choosePhoto: 'Foto auswählen',
      removePhoto: 'Foto entfernen',
      photoHint: 'JPG, PNG werden unterstützt',
      firstName: 'Vorname',
      lastName: 'Nachname',
      jobTitle: 'Berufsbezeichnung',
      birthDate: 'Geburtsdatum',
      birthPlace: 'Geburtsort',
      nationality: 'Nationalität',
      phone: 'Telefon',
      address: 'Adresse',
      email: 'E-Mail',
      profileText: 'Persönliches Profil',
      ph: {
        firstName: 'z.B. Max',
        lastName: 'z.B. Mustermann',
        jobTitle: 'z.B. Softwareentwickler',
        birthDate: 'z.B. 06.04.1994',
        birthPlace: 'z.B. Berlin',
        nationality: 'z.B. Deutschland',
        phone: 'z.B. +49 123 456789',
        address: 'z.B. Musterstraße 1, 10115 Berlin',
        email: 'z.B. max@beispiel.de',
        profileText: 'Kurze Zusammenfassung Ihrer beruflichen Laufbahn...',
      },
      company: 'Unternehmen / Organisation',
      role: 'Position / Berufsbezeichnung',
      startDate: 'Startdatum',
      endDate: 'Enddatum',
      currentJob: 'Aktuelle Stelle',
      bullets: 'Aufgaben und Erfolge (jede Zeile = ein Punkt)',
      bulletsHint: 'Jede Aufgabe in einer neuen Zeile...',
      institution: 'Bildungseinrichtung / Universität',
      degree: 'Abschluss / Kurs',
      field: 'Studiengang / Fachrichtung',
      notes: 'Zusätzliche Informationen',
      skillCategory: 'Kategoriename',
      skillItems: 'Fähigkeiten (jede Zeile = eine Fähigkeit)',
      additionalSkillsLabel: 'Weitere Fähigkeiten (jede Zeile = eine Fähigkeit)',
      interestsLabel: 'Interessen und Hobbys (jede Zeile = ein Punkt)',
      languageName: 'Sprache',
      languageLevel: 'Niveau',
      certName: 'Zertifikatsname',
      certIssuer: 'Ausstellende Institution',
      certDate: 'Datum',
      addExperience: '+ Berufserfahrung hinzufügen',
      addEducation: '+ Ausbildung hinzufügen',
      addSkillGroup: '+ Gruppe hinzufügen',
      addLanguage: '+ Sprache hinzufügen',
      addCertificate: '+ Zertifikat hinzufügen',
      delete: 'Löschen',
      noExperience: 'Noch keine Berufserfahrung hinzugefügt',
      noEducation: 'Noch keine Ausbildung hinzugefügt',
      noSkills: 'Noch keine Fähigkeitsgruppe hinzugefügt',
      noLanguages: 'Noch keine Sprachen hinzugefügt',
      noCertificates: 'Noch keine Zertifikate hinzugefügt',
      newCompany: 'Neues Unternehmen',
      newInstitution: 'Neue Einrichtung',
      newSkillGroup: 'Neue Gruppe',
      newLanguage: 'Neue Sprache',
      newCertificate: 'Neues Zertifikat',
    },
  },

  en: {
    cvTitle: 'Curriculum Vitae',
    profile: 'Professional Profile',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    certificates: 'Certificates',
    additionalSkills: 'Additional Skills',
    interests: 'Interests',
    personalInfo: 'Personal Info',
    softwareSkills: 'Software Skills',
    current: 'Present',
    dir: 'ltr',
    sectionEmpty: 'This section has not been completed yet',
    form: {
      resumeLanguage: 'Resume Language',
      profilePhoto: 'Profile Photo',
      choosePhoto: 'Choose Photo',
      removePhoto: 'Remove Photo',
      photoHint: 'JPG, PNG supported',
      firstName: 'First Name',
      lastName: 'Last Name',
      jobTitle: 'Job Title',
      birthDate: 'Date of Birth',
      birthPlace: 'Place of Birth',
      nationality: 'Nationality',
      phone: 'Phone',
      address: 'Address',
      email: 'Email',
      profileText: 'Professional Profile',
      ph: {
        firstName: 'e.g. John',
        lastName: 'e.g. Smith',
        jobTitle: 'e.g. Software Engineer',
        birthDate: 'e.g. 06.04.1994',
        birthPlace: 'e.g. London',
        nationality: 'e.g. British',
        phone: 'e.g. +44 7700 900000',
        address: 'e.g. 123 Main St, London',
        email: 'e.g. john@example.com',
        profileText: 'Brief summary of your professional background...',
      },
      company: 'Company / Organization',
      role: 'Job Title / Position',
      startDate: 'Start Date',
      endDate: 'End Date',
      currentJob: 'Current Job',
      bullets: 'Duties & Achievements (one per line)',
      bulletsHint: 'Write each duty on a new line...',
      institution: 'Institution / University',
      degree: 'Degree / Course',
      field: 'Field of Study',
      notes: 'Additional Notes',
      skillCategory: 'Category Name',
      skillItems: 'Skills (one per line)',
      additionalSkillsLabel: 'Additional Skills (one per line)',
      interestsLabel: 'Interests & Hobbies (one per line)',
      languageName: 'Language',
      languageLevel: 'Level',
      certName: 'Certificate Name',
      certIssuer: 'Issuing Organization',
      certDate: 'Date',
      addExperience: '+ Add Work Experience',
      addEducation: '+ Add Education',
      addSkillGroup: '+ Add Group',
      addLanguage: '+ Add Language',
      addCertificate: '+ Add Certificate',
      delete: 'Delete',
      noExperience: 'No work experience added yet',
      noEducation: 'No education added yet',
      noSkills: 'No skill groups added yet',
      noLanguages: 'No languages added yet',
      noCertificates: 'No certificates added yet',
      newCompany: 'New Company',
      newInstitution: 'New Institution',
      newSkillGroup: 'New Group',
      newLanguage: 'New Language',
      newCertificate: 'New Certificate',
    },
  },

  fa: {
    cvTitle: 'رزومه',
    profile: 'معرفی حرفه‌ای',
    experience: 'سابقه کاری',
    education: 'تحصیلات',
    skills: 'مهارت‌ها',
    languages: 'زبان‌ها',
    certificates: 'گواهینامه‌ها',
    additionalSkills: 'سایر مهارت‌ها',
    interests: 'علایق',
    personalInfo: 'اطلاعات شخصی',
    softwareSkills: 'نرم‌افزارها',
    current: 'تاکنون',
    dir: 'rtl',
    sectionEmpty: 'این بخش هنوز تکمیل نشده است',
    form: {
      resumeLanguage: 'زبان رزومه',
      profilePhoto: 'تصویر پروفایل',
      choosePhoto: 'انتخاب تصویر',
      removePhoto: 'حذف تصویر',
      photoHint: 'JPG، PNG پشتیبانی می‌شود',
      firstName: 'نام',
      lastName: 'نام خانوادگی',
      jobTitle: 'عنوان شغلی',
      birthDate: 'تاریخ تولد',
      birthPlace: 'محل تولد',
      nationality: 'ملیت',
      phone: 'شماره تلفن',
      address: 'آدرس',
      email: 'ایمیل',
      profileText: 'معرفی / پروفایل',
      ph: {
        firstName: 'مثلاً: علی',
        lastName: 'مثلاً: احمدی',
        jobTitle: 'مثلاً: مهندس نرم‌افزار',
        birthDate: 'مثلاً: ۰۶.۰۴.۱۹۹۴',
        birthPlace: 'مثلاً: اصفهان',
        nationality: 'مثلاً: ایران',
        phone: 'مثلاً: +49 123 456789',
        address: 'مثلاً: خیابان، شهر، کشور',
        email: 'مثلاً: example@gmail.com',
        profileText: 'خلاصه‌ای از تجربیات و مهارت‌های حرفه‌ای خود را بنویسید...',
      },
      company: 'نام شرکت / سازمان',
      role: 'عنوان شغلی',
      startDate: 'تاریخ شروع',
      endDate: 'تاریخ پایان',
      currentJob: 'شغل فعلی',
      bullets: 'وظایف و دستاوردها (هر مورد در یک خط)',
      bulletsHint: 'هر وظیفه را در یک خط جدید بنویسید...',
      institution: 'نام موسسه / دانشگاه',
      degree: 'مدرک / عنوان دوره',
      field: 'رشته تحصیلی',
      notes: 'توضیحات اضافی',
      skillCategory: 'نام دسته‌بندی',
      skillItems: 'مهارت‌ها (هر مورد در یک خط)',
      additionalSkillsLabel: 'سایر مهارت‌ها (هر مورد در یک خط)',
      interestsLabel: 'علایق و سرگرمی‌ها (هر مورد در یک خط)',
      languageName: 'نام زبان',
      languageLevel: 'سطح',
      certName: 'نام گواهینامه',
      certIssuer: 'صادرکننده',
      certDate: 'تاریخ',
      addExperience: '+ افزودن سابقه کاری',
      addEducation: '+ افزودن تحصیلات',
      addSkillGroup: '+ افزودن گروه',
      addLanguage: '+ افزودن زبان',
      addCertificate: '+ افزودن گواهینامه',
      delete: 'حذف',
      noExperience: 'هنوز سابقه کاری اضافه نشده',
      noEducation: 'هنوز تحصیلاتی اضافه نشده',
      noSkills: 'هنوز گروه مهارتی اضافه نشده',
      noLanguages: 'هنوز زبانی اضافه نشده',
      noCertificates: 'هنوز گواهینامه‌ای اضافه نشده',
      newCompany: 'شرکت جدید',
      newInstitution: 'موسسه جدید',
      newSkillGroup: 'گروه جدید',
      newLanguage: 'زبان جدید',
      newCertificate: 'گواهینامه جدید',
    },
  },
}
