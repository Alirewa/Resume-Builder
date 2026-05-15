'use client'

import React from 'react'
import type { ResumeData } from '@/lib/types'
import { translations } from '@/lib/translations'

interface Props {
  data: ResumeData
  accentColor?: string
}

/* ── Inline SVG icons ── */
const Ic = {
  cal:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 10, height: 10, flexShrink: 0 }}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 10, height: 10, flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  pin:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 10, height: 10, flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 10, height: 10, flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  mail:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 10, height: 10, flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
}

export default function Template2({ data, accentColor = '#1e3a5f' }: Props) {
  const t = translations[data.language]
  const isRTL = data.language === 'fa'
  const font = isRTL ? "'Vazirmatn', Arial, sans-serif" : 'Arial, Helvetica, sans-serif'
  // RTL: sidebar goes to the right, main content on left
  // LTR: sidebar on left, main content on right
  const textAlign: 'right' | 'left' = isRTL ? 'right' : 'left'

  const sidebar = (
    <div style={{
      width: '64mm', flexShrink: 0,
      backgroundColor: accentColor,
      padding: '20px 14px',
      display: 'flex', flexDirection: 'column', gap: '14px',
      direction: isRTL ? 'rtl' : 'ltr',
      textAlign,
    }}>
      {/* Avatar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          overflow: 'hidden', border: '3px solid rgba(255,255,255,0.25)',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}>
          {data.personal.avatar
            ? <img src={data.personal.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '46px', height: '46px', color: 'rgba(255,255,255,0.4)' }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
          }
        </div>
      </div>

      {/* Personal Info */}
      <SidebarBlock title={t.personalInfo}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {data.personal.birthDate && <SbRow isRTL={isRTL} icon={Ic.cal} text={`${data.personal.birthDate}${data.personal.birthPlace ? ` · ${data.personal.birthPlace}` : ''}`} />}
          {data.personal.nationality && <SbRow isRTL={isRTL} icon={Ic.globe} text={data.personal.nationality} />}
          {data.personal.address && <SbRow isRTL={isRTL} icon={Ic.pin} text={data.personal.address} />}
          {data.personal.phone && <SbRow isRTL={isRTL} icon={Ic.phone} text={data.personal.phone} />}
          {data.personal.email && <SbRow isRTL={isRTL} icon={Ic.mail} text={data.personal.email} small />}
        </div>
      </SidebarBlock>

      {/* Languages */}
      <SidebarBlock title={t.languages}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {data.languages.map((lang) => (
            <div key={lang.id}>
              <div style={{ display: 'flex', justifyContent: isRTL ? 'flex-start' : 'space-between', gap: '6px', marginBottom: '3px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span style={{ fontSize: '9.5px', color: '#e2e8f0', fontWeight: 600 }}>{lang.name}</span>
                <span style={{ fontSize: '9px', color: '#94a3b8' }}>{lang.level}</span>
              </div>
              <div style={{ height: '3px', borderRadius: '99px', background: 'rgba(255,255,255,0.12)' }}>
                <div style={{ height: '100%', borderRadius: '99px', background: 'rgba(255,255,255,0.55)', width: getLangWidth(lang.level) }} />
              </div>
            </div>
          ))}
          {data.languages.length === 0 && <SidebarEmpty text={t.sectionEmpty} isRTL={isRTL} />}
        </div>
      </SidebarBlock>

      {/* Certificates */}
      <SidebarBlock title={t.certificates}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {data.certificates.map((cert) => (
            <div key={cert.id} style={{ fontSize: '9px' }}>
              <p style={{ margin: 0, color: '#e2e8f0', fontWeight: 600, lineHeight: '1.4' }}>{cert.name}</p>
              {(cert.issuer || cert.date) && (
                <p style={{ margin: 0, color: '#94a3b8' }}>{[cert.issuer, cert.date].filter(Boolean).join(' · ')}</p>
              )}
            </div>
          ))}
          {data.certificates.length === 0 && <SidebarEmpty text={t.sectionEmpty} isRTL={isRTL} />}
        </div>
      </SidebarBlock>

      {/* Additional skills */}
      <SidebarBlock title={t.additionalSkills}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
          {data.additionalSkills.map((s, i) => (
            <span key={i} style={{ fontSize: '8.5px', padding: '2px 7px', borderRadius: '99px', background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.12)' }}>{s}</span>
          ))}
          {data.additionalSkills.length === 0 && <SidebarEmpty text={t.sectionEmpty} isRTL={isRTL} />}
        </div>
      </SidebarBlock>

      {/* Interests */}
      <SidebarBlock title={t.interests}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
          {data.interests.map((s, i) => (
            <span key={i} style={{ fontSize: '8.5px', padding: '2px 7px', borderRadius: '99px', background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.12)' }}>{s}</span>
          ))}
          {data.interests.length === 0 && <SidebarEmpty text={t.sectionEmpty} isRTL={isRTL} />}
        </div>
      </SidebarBlock>
    </div>
  )

  const main = (
    <div style={{
      flex: 1, padding: '20px 17px',
      display: 'flex', flexDirection: 'column', gap: '13px',
      direction: isRTL ? 'rtl' : 'ltr',
      textAlign,
    }}>
      {/* Name + Title */}
      <div style={{ borderBottom: `2px solid ${accentColor}20`, paddingBottom: '11px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 3px', color: '#0f0f1a', fontFamily: font }}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <p style={{ fontSize: '12px', fontWeight: 600, color: accentColor, margin: 0 }}>{data.personal.jobTitle}</p>
      </div>

      {/* Profile */}
      <MainBlock title={t.profile} accent={accentColor}>
        {data.personal.profile
          ? <p style={{ margin: 0, color: '#444', lineHeight: '1.65', fontSize: '10.5px' }}>{data.personal.profile}</p>
          : <MainEmpty text={t.sectionEmpty} isRTL={isRTL} />
        }
      </MainBlock>

      {/* Experience */}
      <MainBlock title={t.experience} accent={accentColor}>
        {data.experience.map((exp, idx) => (
          <div key={exp.id} style={{ marginBottom: idx < data.experience.length - 1 ? '12px' : 0, display: 'flex', gap: '8px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: accentColor, marginTop: '3px' }} />
              {idx < data.experience.length - 1 && <div style={{ width: '1.5px', flex: 1, background: `${accentColor}25`, marginTop: '3px' }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <strong style={{ fontSize: '10.5px', color: '#0f0f1a' }}>{exp.company}</strong>
                <span style={{ fontSize: '9px', color: '#888', background: '#f5f5f7', padding: '1px 6px', borderRadius: '3px', flexShrink: 0 }}>
                  {exp.startDate} – {exp.current ? t.current : exp.endDate}
                </span>
              </div>
              <p style={{ margin: '2px 0 5px', fontSize: '10px', fontWeight: 600, color: accentColor }}>{exp.role}</p>
              {exp.bullets.length > 0 && (
                <ul style={{ margin: 0, paddingInlineStart: '14px', textAlign }}>
                  {exp.bullets.map((b, i) => <li key={i} style={{ marginBottom: '2px', color: '#444', fontSize: '10px' }}>{b}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
        {data.experience.length === 0 && <MainEmpty text={t.sectionEmpty} isRTL={isRTL} />}
      </MainBlock>

      {/* Skills */}
      <MainBlock title={t.skills} accent={accentColor}>
        {data.skills.map((group) => (
          <div key={group.id} style={{ marginBottom: '7px' }}>
            <p style={{ fontWeight: 700, fontSize: '9.5px', color: accentColor, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {group.category}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              {group.items.map((item, i) => (
                <span key={i} style={{ fontSize: '9px', padding: '2px 7px', borderRadius: '4px', background: `${accentColor}10`, color: '#333', border: `1px solid ${accentColor}22` }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
        {data.skills.length === 0 && <MainEmpty text={t.sectionEmpty} isRTL={isRTL} />}
      </MainBlock>

      {/* Education */}
      <MainBlock title={t.education} accent={accentColor}>
        {data.education.map((edu, idx) => (
          <div key={edu.id} style={{ marginBottom: idx < data.education.length - 1 ? '9px' : 0, display: 'flex', gap: '8px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: accentColor, marginTop: '3px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <strong style={{ fontSize: '10.5px', color: '#0f0f1a' }}>{edu.institution}</strong>
                <span style={{ fontSize: '9px', color: '#888', background: '#f5f5f7', padding: '1px 6px', borderRadius: '3px', flexShrink: 0 }}>
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <p style={{ margin: '1px 0 0', fontSize: '10px', color: '#555' }}>{edu.degree}{edu.field ? ` · ${edu.field}` : ''}</p>
              {edu.notes && <p style={{ margin: '1px 0 0', fontSize: '9.5px', color: '#888', fontStyle: 'italic' }}>{edu.notes}</p>}
            </div>
          </div>
        ))}
        {data.education.length === 0 && <MainEmpty text={t.sectionEmpty} isRTL={isRTL} />}
      </MainBlock>
    </div>
  )

  return (
    <div
      id="resume-template"
      style={{
        fontFamily: font,
        fontSize: '10.5px',
        lineHeight: '1.55',
        color: '#1a1a2e',
        backgroundColor: '#fff',
        width: '210mm',
        minHeight: '297mm',
        display: 'flex',
        direction: 'ltr', // always LTR at layout level — inner sections set their own direction
        // FA (isRTL): row-reverse → sidebar RIGHT | EN/DE: row → sidebar LEFT
        flexDirection: isRTL ? 'row-reverse' : 'row',
        boxSizing: 'border-box',
      }}
    >
      {sidebar}
      {main}
    </div>
  )
}

function SidebarBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.09em', margin: '0 0 6px', paddingBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function MainBlock({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
        <div style={{ width: '3px', height: '13px', borderRadius: '2px', background: accent, flexShrink: 0 }} />
        <h2 style={{ margin: 0, fontSize: '10.5px', fontWeight: 700, color: '#0f0f1a', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

function SidebarEmpty({ text, isRTL }: { text: string; isRTL: boolean }) {
  return (
    <div style={{
      minHeight: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isRTL ? 'flex-end' : 'flex-start',
      padding: '8px 10px',
      borderRadius: '6px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px dashed rgba(255,255,255,0.15)',
      color: 'rgba(255,255,255,0.3)',
      fontSize: '8.5px',
      fontStyle: 'italic',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      {text}
    </div>
  )
}

function MainEmpty({ text, isRTL }: { text: string; isRTL: boolean }) {
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

function SbRow({ icon, text, small, isRTL }: { icon: React.ReactNode; text: string; small?: boolean; isRTL: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-start', color: '#e2e8f0', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
      <span style={{ marginTop: '1px', opacity: 0.7 }}>{icon}</span>
      <span style={{ wordBreak: 'break-word', fontSize: small ? '8.5px' : '9.5px' }}>{text}</span>
    </div>
  )
}

function getLangWidth(level: string): string {
  const l = level.toLowerCase()
  if (l.includes('c2') || l.includes('مادری') || l.includes('native') || l.includes('muttersprache')) return '100%'
  if (l.includes('c1') || l.includes('روان')) return '83%'
  if (l.includes('b2')) return '67%'
  if (l.includes('b1')) return '52%'
  if (l.includes('a2')) return '34%'
  if (l.includes('a1')) return '20%'
  return '50%'
}
