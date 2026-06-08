'use client'

import React from 'react'
import type { ResumeData } from '@/lib/types'
import { translations } from '@/lib/translations'

interface Props {
  data: ResumeData
  accentColor?: string
}

/* ── Empty section placeholder ── */
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

/* ── Inline SVG icons (safe for html2canvas) ── */
const Icon = {
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 11, height: 11, display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  globe:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 11, height: 11, display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  pin:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 11, height: 11, display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  phone:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 11, height: 11, display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  mail:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 11, height: 11, display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  user:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 11, height: 11, display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
}

export default function Template1({ data, accentColor = '#1e40af' }: Props) {
  const t = translations[data.language]
  const isRTL = data.language === 'fa'
  const font = isRTL ? "'Vazirmatn', Arial, sans-serif" : 'Arial, Helvetica, sans-serif'
  const dir: 'rtl' | 'ltr' = 'ltr' // ATS: always LTR layout but RTL text when FA
  const textAlign: 'right' | 'left' = isRTL ? 'right' : 'left'

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '10.5px',
    fontWeight: 700,
    color: '#111',
    textTransform: isRTL ? 'none' : 'uppercase',
    letterSpacing: isRTL ? '0' : '0.08em',
    marginBottom: '8px',
    paddingBottom: '4px',
    borderBottom: `2px solid ${accentColor}`,
    textAlign: isRTL ? 'right' : 'left',
    direction: isRTL ? 'rtl' : 'ltr',
  }

  return (
    <div
      id="resume-template"
      style={{
        fontFamily: font,
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign,
        fontSize: '10.5px',
        lineHeight: '1.55',
        color: '#1a1a2e',
        backgroundColor: '#fff',
        width: '210mm',
        minHeight: '297mm',
        padding: '15mm 13mm',
        boxSizing: 'border-box',
      }}
    >
      {/* ══ HEADER ══ */}
      <header style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexDirection: isRTL ? 'row-reverse' : 'row',
        marginBottom: '16px',
        paddingBottom: '14px',
        borderBottom: `3px solid ${accentColor}`,
      }}>
        {/* Avatar */}
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          overflow: 'hidden', flexShrink: 0,
          border: `3px solid ${accentColor}`,
          backgroundColor: `${accentColor}15`,
        }}>
          {data.personal.avatar
            ? <img src={data.personal.avatar} alt={`${data.personal.firstName} ${data.personal.lastName}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '46px', height: '46px', color: `${accentColor}55` }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
          }
        </div>

        {/* Name block */}
        <div style={{ flex: 1, textAlign }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 2px', color: '#0f0f1a', fontFamily: font }}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p style={{ fontSize: '12px', fontWeight: 600, color: accentColor, margin: '0 0 8px' }}>
            {data.personal.jobTitle}
          </p>
          {/* Contact items */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '5px 14px',
            fontSize: '9.5px', color: '#555',
            justifyContent: isRTL ? 'flex-end' : 'flex-start',
          }}>
            {data.personal.birthDate && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                {Icon.calendar}
                {data.personal.birthDate}{data.personal.birthPlace ? ` · ${data.personal.birthPlace}` : ''}
              </span>
            )}
            {data.personal.nationality && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                {Icon.globe}{data.personal.nationality}
              </span>
            )}
            {data.personal.address && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                {Icon.pin}{data.personal.address}
              </span>
            )}
            {data.personal.phone && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                {Icon.phone}{data.personal.phone}
              </span>
            )}
            {data.personal.email && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                {Icon.mail}{data.personal.email}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ══ PROFILE ══ */}
      <section style={{ marginBottom: '14px' }}>
        <div style={sectionTitleStyle}>{t.profile}</div>
        {data.personal.profile
          ? <p style={{ margin: 0, color: '#333', lineHeight: '1.65', textAlign }}>{data.personal.profile}</p>
          : <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
        }
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section style={{ marginBottom: '14px' }}>
        <div style={sectionTitleStyle}>{t.experience}</div>
        {data.experience.map((exp, idx) => (
          <div key={exp.id} style={{ marginBottom: idx < data.experience.length - 1 ? '12px' : 0 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', flexWrap: 'wrap', gap: '4px',
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}>
              <strong style={{ fontSize: '11px', color: '#0f0f1a' }}>{exp.company}</strong>
              <span style={{ fontSize: '9px', color: '#888', background: '#f5f5f5', padding: '1px 7px', borderRadius: '3px', flexShrink: 0 }}>
                {exp.startDate} – {exp.current ? t.current : exp.endDate}
              </span>
            </div>
            <p style={{ margin: '2px 0 5px', fontSize: '10px', color: accentColor, fontWeight: 600 }}>
              {exp.role}
            </p>
            {exp.bullets.length > 0 && (
              <ul style={{ margin: 0, paddingInlineStart: '16px', textAlign }}>
                {exp.bullets.map((b, i) => (
                  <li key={i} style={{ marginBottom: '2px', color: '#333' }}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {data.experience.length === 0 && <div style={{ height: '8px' }} />}
      </section>

      {/* ══ EDUCATION ══ */}
      <section style={{ marginBottom: '14px' }}>
        <div style={sectionTitleStyle}>{t.education}</div>
        {data.education.map((edu, idx) => (
          <div key={edu.id} style={{ marginBottom: idx < data.education.length - 1 ? '9px' : 0 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', flexWrap: 'wrap', gap: '4px',
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}>
              <strong style={{ fontSize: '11px', color: '#0f0f1a' }}>
                {edu.degree}{edu.field ? ` · ${edu.field}` : ''}
              </strong>
              <span style={{ fontSize: '9px', color: '#888', background: '#f5f5f5', padding: '1px 7px', borderRadius: '3px', flexShrink: 0 }}>
                {edu.startDate} – {edu.endDate}
              </span>
            </div>
            <p style={{ margin: '1px 0 0', fontSize: '10px', color: '#555' }}>{edu.institution}</p>
            {edu.notes && <p style={{ margin: '1px 0 0', fontSize: '9.5px', color: '#888', fontStyle: 'italic' }}>{edu.notes}</p>}
          </div>
        ))}
        {data.education.length === 0 && <div style={{ height: '8px' }} />}
      </section>

      {/* ══ SKILLS ══ */}
      <section style={{ marginBottom: '14px' }}>
        <div style={sectionTitleStyle}>{t.skills}</div>
        {data.skills.length > 0
          ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px 14px' }}>
              {data.skills.map((group) => (
                <div key={group.id}>
                  <p style={{ fontWeight: 700, fontSize: '9.5px', color: accentColor, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {group.category}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {group.items.map((item, i) => (
                      <span key={i} style={{
                        fontSize: '9px', padding: '2px 7px', borderRadius: '4px',
                        background: `${accentColor}10`, color: '#333', border: `1px solid ${accentColor}25`,
                      }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          : <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
        }
      </section>

      {/* ══ BOTTOM 3-COL ══ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '12px' }}>
        <div>
          <div style={sectionTitleStyle}>{t.languages}</div>
          {data.languages.map((lang) => (
            <p key={lang.id} style={{ margin: '0 0 3px', textAlign }}>
              <span style={{ fontWeight: 600, fontSize: '10px', color: '#222' }}>{lang.name}</span>
              <span style={{ color: '#888', fontSize: '9.5px' }}> — {lang.level}</span>
            </p>
          ))}
          {data.languages.length === 0 && <div style={{ height: '8px' }} />}
        </div>
        <div>
          <div style={sectionTitleStyle}>{t.certificates}</div>
          {data.certificates.map((cert) => (
            <p key={cert.id} style={{ margin: '0 0 3px', fontSize: '9.5px', textAlign }}>
              <span style={{ fontWeight: 600, color: '#222' }}>{cert.name}</span>
              {(cert.issuer || cert.date) && <span style={{ color: '#888' }}> — {[cert.issuer, cert.date].filter(Boolean).join(' · ')}</span>}
            </p>
          ))}
          {data.certificates.length === 0 && <div style={{ height: '8px' }} />}
        </div>
        <div>
          <div style={sectionTitleStyle}>{t.additionalSkills}</div>
          {data.additionalSkills.map((s, i) => (
            <p key={i} style={{ margin: '0 0 3px', fontSize: '10px', color: '#333', textAlign }}>· {s}</p>
          ))}
          {data.additionalSkills.length === 0 && <div style={{ height: '8px' }} />}
        </div>
      </div>

      {/* ══ INTERESTS ══ */}
      <section>
        <div style={sectionTitleStyle}>{t.interests}</div>
        {data.interests.length > 0
          ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              {data.interests.map((item, i) => (
                <span key={i} style={{
                  fontSize: '9.5px', padding: '3px 10px', borderRadius: '99px',
                  background: `${accentColor}10`, color: '#444', border: `1px solid ${accentColor}20`,
                }}>{item}</span>
              ))}
            </div>
          : <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
        }
      </section>
    </div>
  )
}
