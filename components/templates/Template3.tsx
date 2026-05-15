'use client'

import React from 'react'
import type { ResumeData } from '@/lib/types'
import { translations } from '@/lib/translations'

interface Props {
  data: ResumeData
  accentColor?: string
}

/* ── Inline SVG icons (safe for html2canvas) ── */
const Icon = {
  phone:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 11, height: 11, display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  mail:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 11, height: 11, display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  pin:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 11, height: 11, display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  globe:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 11, height: 11, display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 11, height: 11, display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
}

export default function Template3({ data, accentColor = '#7c3aed' }: Props) {
  const t = translations[data.language]
  const isRTL = data.language === 'fa'
  const font = isRTL ? "'Vazirmatn', Arial, sans-serif" : 'Arial, Helvetica, sans-serif'

  const accent = accentColor
  const accentLight = `${accent}18`
  const accentMid = `${accent}40`

  const base: React.CSSProperties = {
    fontFamily: font,
    direction: isRTL ? 'rtl' : 'ltr',
    fontSize: '11px',
    lineHeight: '1.55',
    color: '#1e1e2e',
    backgroundColor: '#fff',
  }

  return (
    <div
      id="resume-template"
      style={{
        ...base,
        width: '210mm',
        minHeight: '297mm',
        display: 'flex',
        boxSizing: 'border-box',
      }}
    >
      {/* Left accent bar */}
      <div style={{ width: '5px', background: `linear-gradient(180deg, ${accent} 0%, ${accent}88 100%)`, flexShrink: 0 }} />

      {/* Content */}
      <div style={{ flex: 1, padding: '22px 20px 22px 18px', display: 'flex', flexDirection: 'column', gap: '0' }}>

        {/* ── HEADER ─────────────────────────────── */}
        <div style={{
          display: 'flex',
          gap: '18px',
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row',
          marginBottom: '18px',
          paddingBottom: '16px',
          borderBottom: `2px solid ${accent}`,
        }}>
          {/* Avatar */}
          <div style={{
            width: '78px', height: '78px', borderRadius: '50%',
            overflow: 'hidden', flexShrink: 0,
            border: `3px solid ${accent}`,
            backgroundColor: accentLight,
          }}>
            {data.personal.avatar ? (
              <img src={data.personal.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '46px', height: '46px', color: `${accent}55` }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            )}
          </div>

          {/* Name block */}
          <div style={{ flex: 1, textAlign: isRTL ? 'right' : 'left' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111', margin: '0 0 3px', fontFamily: font }}>
              {data.personal.firstName} {data.personal.lastName}
            </h1>
            <p style={{ fontSize: '13px', fontWeight: 600, color: accent, margin: '0 0 8px' }}>
              {data.personal.jobTitle}
            </p>
            {/* Contact chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              {[
                data.personal.phone && { icon: Icon.phone, val: data.personal.phone },
                data.personal.email && { icon: Icon.mail, val: data.personal.email },
                data.personal.address && { icon: Icon.pin, val: data.personal.address },
                data.personal.nationality && { icon: Icon.globe, val: data.personal.nationality },
                data.personal.birthDate && { icon: Icon.calendar, val: `${data.personal.birthDate}${data.personal.birthPlace ? ` · ${data.personal.birthPlace}` : ''}` },
              ].filter(Boolean).map((item: any, i) => (
                <span key={i} style={{
                  background: accentLight,
                  color: '#333',
                  fontSize: '9.5px',
                  padding: '3px 8px',
                  borderRadius: '99px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  border: `1px solid ${accentMid}`,
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}>
                  {item.icon}
                  <span>{item.val}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── TWO-COLUMN BODY ─────────────────────── */}
        <div style={{ display: 'flex', gap: '18px', flex: 1, flexDirection: isRTL ? 'row-reverse' : 'row' }}>

          {/* LEFT COLUMN (wider) */}
          <div style={{ flex: '0 0 62%', display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Profile */}
            <Section title={t.profile} accent={accent}>
              {data.personal.profile
                ? <p style={{ color: '#444', lineHeight: '1.65', margin: 0 }}>{data.personal.profile}</p>
                : <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
              }
            </Section>

            {/* Experience */}
            <Section title={t.experience} accent={accent}>
              {data.experience.length > 0
                ? <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {data.experience.map((exp) => (
                      <div key={exp.id} style={{ display: 'flex', gap: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                          <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: accent, marginTop: '3px', flexShrink: 0 }} />
                          <div style={{ width: '1.5px', flex: 1, backgroundColor: `${accent}40`, marginTop: '3px' }} />
                        </div>
                        <div style={{ flex: 1, paddingBottom: '4px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2px' }}>
                            <strong style={{ fontSize: '11.5px', color: '#111' }}>{exp.company}</strong>
                            <span style={{ fontSize: '9.5px', color: '#888', background: '#f5f5f5', padding: '1px 6px', borderRadius: '4px' }}>
                              {exp.startDate} – {exp.current ? t.current : exp.endDate}
                            </span>
                          </div>
                          <p style={{ margin: '1px 0 4px', color: accent, fontSize: '10.5px', fontWeight: 600 }}>{exp.role}</p>
                          {exp.bullets.length > 0 && (
                            <ul style={{ margin: 0, paddingInlineStart: '14px' }}>
                              {exp.bullets.map((b, i) => (
                                <li key={i} style={{ color: '#444', marginBottom: '2px', fontSize: '10.5px' }}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                : <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
              }
            </Section>

            {/* Education */}
            <Section title={t.education} accent={accent}>
              {data.education.length > 0
                ? <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {data.education.map((edu) => (
                      <div key={edu.id} style={{ display: 'flex', gap: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                          <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: accent, marginTop: '3px' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2px' }}>
                            <strong style={{ fontSize: '11px', color: '#111' }}>{edu.institution}</strong>
                            <span style={{ fontSize: '9.5px', color: '#888', background: '#f5f5f5', padding: '1px 6px', borderRadius: '4px' }}>
                              {edu.startDate} – {edu.endDate}
                            </span>
                          </div>
                          <p style={{ margin: '1px 0 0', color: '#555', fontSize: '10.5px' }}>
                            {edu.degree}{edu.field ? ` · ${edu.field}` : ''}
                          </p>
                          {edu.notes && <p style={{ margin: '2px 0 0', color: '#777', fontSize: '10px', fontStyle: 'italic' }}>{edu.notes}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                : <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
              }
            </Section>
          </div>

          {/* RIGHT COLUMN (narrower) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Languages */}
            <Section title={t.languages} accent={accent}>
              {data.languages.length > 0
                ? <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {data.languages.map((lang) => (
                      <div key={lang.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                          <span style={{ fontSize: '10.5px', color: '#333', fontWeight: 600 }}>{lang.name}</span>
                          <span style={{ fontSize: '9.5px', color: '#888' }}>{lang.level}</span>
                        </div>
                        <div style={{ height: '4px', borderRadius: '99px', background: '#eee', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', borderRadius: '99px', background: accent,
                            width: getLangWidth(lang.level),
                            transition: 'width 0.3s',
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                : <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
              }
            </Section>

            {/* Skills */}
            <Section title={t.skills} accent={accent}>
              {data.skills.length > 0
                ? <>
                    {data.skills.map((group) => (
                      <div key={group.id} style={{ marginBottom: '8px' }}>
                        <p style={{ fontWeight: 700, fontSize: '10.5px', color: accent, margin: '0 0 4px' }}>{group.category}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {group.items.map((item, i) => (
                            <span key={i} style={{
                              fontSize: '9.5px', padding: '2px 8px', borderRadius: '99px',
                              background: accentLight, color: '#333',
                              border: `1px solid ${accentMid}`,
                            }}>{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                : <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
              }
            </Section>

            {/* Certificates */}
            <Section title={t.certificates} accent={accent}>
              {data.certificates.length > 0
                ? <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {data.certificates.map((cert) => (
                      <div key={cert.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, flexShrink: 0, marginTop: '3px' }} />
                        <div>
                          <p style={{ margin: 0, fontSize: '10.5px', fontWeight: 600, color: '#222' }}>{cert.name}</p>
                          {(cert.issuer || cert.date) && (
                            <p style={{ margin: 0, fontSize: '9.5px', color: '#888' }}>
                              {cert.issuer}{cert.issuer && cert.date ? ' · ' : ''}{cert.date}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                : <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
              }
            </Section>

            {/* Additional skills */}
            <Section title={t.additionalSkills} accent={accent}>
              {data.additionalSkills.length > 0
                ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {data.additionalSkills.map((s, i) => (
                      <span key={i} style={{
                        fontSize: '9.5px', padding: '2px 8px', borderRadius: '99px',
                        background: '#f3f4f6', color: '#555', border: '1px solid #e5e7eb',
                      }}>{s}</span>
                    ))}
                  </div>
                : <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
              }
            </Section>

            {/* Interests */}
            <Section title={t.interests} accent={accent}>
              {data.interests.length > 0
                ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {data.interests.map((s, i) => (
                      <span key={i} style={{
                        fontSize: '9.5px', padding: '2px 8px', borderRadius: '99px',
                        background: accentLight, color: '#555', border: `1px solid ${accentMid}`,
                      }}>{s}</span>
                    ))}
                  </div>
                : <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
              }
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptySection({ text, isRTL }: { text: string; isRTL: boolean }) {
  return (
    <div style={{
      minHeight: '54px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isRTL ? 'flex-end' : 'flex-start',
      padding: '10px 14px',
      borderRadius: '6px',
      background: '#f9fafb',
      border: '1px dashed #e5e7eb',
      color: '#aaa',
      fontSize: '9.5px',
      fontStyle: 'italic',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      {text}
    </div>
  )
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
        <div style={{ width: '3px', height: '14px', borderRadius: '2px', background: accent, flexShrink: 0 }} />
        <h2 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#111', letterSpacing: '0.02em' }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function getLangWidth(level: string): string {
  const l = level.toLowerCase()
  if (l.includes('c2') || l.includes('مادری') || l.includes('native') || l.includes('muttersprache')) return '100%'
  if (l.includes('c1') || l.includes('روان') || l.includes('fluent')) return '85%'
  if (l.includes('b2')) return '70%'
  if (l.includes('b1')) return '55%'
  if (l.includes('a2')) return '35%'
  if (l.includes('a1')) return '20%'
  return '50%'
}
