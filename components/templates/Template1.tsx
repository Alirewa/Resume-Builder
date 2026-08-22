'use client'

import React from 'react'
import { translations } from '@/lib/translations'
import { languageLevelWidth, sectionPresence, shouldRender } from '@/lib/resume'
import { Avatar, EmptySection, compact, dateRange, icons, type TemplateProps } from './shared'

/**
 * Classic single-column CV — the most ATS-friendly of the three.
 * Layout direction stays LTR; only the text flow flips for Persian.
 */
export default function Template1({ data, accentColor = '#1e40af', hideEmpty = true }: TemplateProps) {
  const t = translations[data.language]
  const isRTL = data.language === 'fa'
  const font = isRTL ? "'Vazirmatn', Arial, sans-serif" : 'Arial, Helvetica, sans-serif'
  const textAlign: 'right' | 'left' = isRTL ? 'right' : 'left'
  const rowDirection = isRTL ? 'row-reverse' : 'row'
  const Icon = icons(11)
  const present = sectionPresence(data)
  const show = (key: keyof typeof present) => shouldRender(present[key], hideEmpty)

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '10.5px',
    fontWeight: 700,
    color: '#111',
    textTransform: isRTL ? 'none' : 'uppercase',
    letterSpacing: isRTL ? '0' : '0.08em',
    marginBottom: '8px',
    paddingBottom: '4px',
    borderBottom: `2px solid ${accentColor}`,
    textAlign,
    direction: isRTL ? 'rtl' : 'ltr',
  }

  const datePill: React.CSSProperties = {
    fontSize: '9px',
    color: '#888',
    background: '#f5f5f5',
    padding: '1px 7px',
    borderRadius: '3px',
    flexShrink: 0,
  }

  const contactItems = compact<{ icon: React.ReactNode; value: string }>([
    data.personal.birthDate && {
      icon: Icon.calendar,
      value: `${data.personal.birthDate}${data.personal.birthPlace ? ` · ${data.personal.birthPlace}` : ''}`,
    },
    data.personal.nationality && { icon: Icon.globe, value: data.personal.nationality },
    data.personal.address && { icon: Icon.pin, value: data.personal.address },
    data.personal.phone && { icon: Icon.phone, value: data.personal.phone },
    data.personal.email && { icon: Icon.mail, value: data.personal.email },
    data.personal.website && { icon: Icon.link, value: data.personal.website },
  ])

  /** The bottom row only earns its space if at least one of its columns has content. */
  const bottomColumns = (['languages', 'certificates', 'additionalSkills'] as const).filter(show)

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
      <header
        className="resume-entry"
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexDirection: rowDirection,
          marginBottom: '16px',
          paddingBottom: '14px',
          borderBottom: `3px solid ${accentColor}`,
        }}
      >
        <Avatar
          src={data.personal.avatar}
          alt=""
          size={80}
          borderColor={accentColor}
          background={`${accentColor}15`}
          glyphColor={`${accentColor}55`}
        />

        <div style={{ flex: 1, textAlign }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 2px', color: '#0f0f1a', fontFamily: font }}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p style={{ fontSize: '12px', fontWeight: 600, color: accentColor, margin: '0 0 8px' }}>
            {data.personal.jobTitle}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5px 14px',
              fontSize: '9.5px',
              color: '#555',
              justifyContent: isRTL ? 'flex-end' : 'flex-start',
            }}
          >
            {contactItems.map((item, i) => (
              <span
                key={i}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', flexDirection: rowDirection }}
              >
                {item.icon}
                {item.value}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ══ PROFILE ══ */}
      {show('profile') && (
        <section style={{ marginBottom: '14px' }}>
          <div className="resume-heading" style={sectionTitleStyle}>
            {t.profile}
          </div>
          {present.profile ? (
            <p style={{ margin: 0, color: '#333', lineHeight: '1.65', textAlign }}>
              {data.personal.profile}
            </p>
          ) : (
            <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
          )}
        </section>
      )}

      {/* ══ EXPERIENCE ══ */}
      {show('experience') && (
        <section style={{ marginBottom: '14px' }}>
          <div className="resume-heading" style={sectionTitleStyle}>
            {t.experience}
          </div>
          {present.experience ? (
            data.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="resume-entry"
                style={{ marginBottom: idx < data.experience.length - 1 ? '12px' : 0 }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '4px',
                    flexDirection: rowDirection,
                  }}
                >
                  <strong style={{ fontSize: '11px', color: '#0f0f1a' }}>{exp.company}</strong>
                  <span style={datePill}>{dateRange(exp.startDate, exp.endDate, exp.current, t.current)}</span>
                </div>
                <p style={{ margin: '2px 0 5px', fontSize: '10px', color: accentColor, fontWeight: 600 }}>
                  {exp.role}
                </p>
                {exp.bullets.length > 0 && (
                  <ul style={{ margin: 0, paddingInlineStart: '16px', textAlign }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{ marginBottom: '2px', color: '#333' }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
          )}
        </section>
      )}

      {/* ══ EDUCATION ══ */}
      {show('education') && (
        <section style={{ marginBottom: '14px' }}>
          <div className="resume-heading" style={sectionTitleStyle}>
            {t.education}
          </div>
          {present.education ? (
            data.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="resume-entry"
                style={{ marginBottom: idx < data.education.length - 1 ? '9px' : 0 }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '4px',
                    flexDirection: rowDirection,
                  }}
                >
                  <strong style={{ fontSize: '11px', color: '#0f0f1a' }}>
                    {edu.degree}
                    {edu.field ? ` · ${edu.field}` : ''}
                  </strong>
                  <span style={datePill}>{dateRange(edu.startDate, edu.endDate, false, t.current)}</span>
                </div>
                <p style={{ margin: '1px 0 0', fontSize: '10px', color: '#555' }}>{edu.institution}</p>
                {edu.notes && (
                  <p style={{ margin: '1px 0 0', fontSize: '9.5px', color: '#888', fontStyle: 'italic' }}>
                    {edu.notes}
                  </p>
                )}
              </div>
            ))
          ) : (
            <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
          )}
        </section>
      )}

      {/* ══ SKILLS ══ */}
      {show('skills') && (
        <section style={{ marginBottom: '14px' }}>
          <div className="resume-heading" style={sectionTitleStyle}>
            {t.skills}
          </div>
          {present.skills ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px 14px' }}>
              {data.skills.map((group) => (
                <div key={group.id} className="resume-entry">
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: '9.5px',
                      color: accentColor,
                      margin: '0 0 4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {group.category}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {group.items.map((item, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '9px',
                          padding: '2px 7px',
                          borderRadius: '4px',
                          background: `${accentColor}10`,
                          color: '#333',
                          border: `1px solid ${accentColor}25`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
          )}
        </section>
      )}

      {/* ══ LANGUAGES · CERTIFICATES · EXTRAS ══ */}
      {bottomColumns.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${bottomColumns.length}, 1fr)`,
            gap: '14px',
            marginBottom: '12px',
          }}
        >
          {bottomColumns.includes('languages') && (
            <div className="resume-entry">
              <div className="resume-heading" style={sectionTitleStyle}>
                {t.languages}
              </div>
              {present.languages ? (
                data.languages.map((lang) => (
                  <div key={lang.id} style={{ marginBottom: '5px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '6px',
                        flexDirection: rowDirection,
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: '10px', color: '#222' }}>{lang.name}</span>
                      <span style={{ color: '#888', fontSize: '9.5px' }}>{lang.level}</span>
                    </div>
                    <div style={{ height: '3px', borderRadius: '99px', background: '#eee', marginTop: '2px' }}>
                      <div
                        style={{
                          height: '100%',
                          borderRadius: '99px',
                          background: accentColor,
                          width: languageLevelWidth(lang.level),
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
              )}
            </div>
          )}

          {bottomColumns.includes('certificates') && (
            <div className="resume-entry">
              <div className="resume-heading" style={sectionTitleStyle}>
                {t.certificates}
              </div>
              {present.certificates ? (
                data.certificates.map((cert) => (
                  <p key={cert.id} style={{ margin: '0 0 3px', fontSize: '9.5px', textAlign }}>
                    <span style={{ fontWeight: 600, color: '#222' }}>{cert.name}</span>
                    {(cert.issuer || cert.date) && (
                      <span style={{ color: '#888' }}>
                        {' '}
                        — {[cert.issuer, cert.date].filter(Boolean).join(' · ')}
                      </span>
                    )}
                  </p>
                ))
              ) : (
                <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
              )}
            </div>
          )}

          {bottomColumns.includes('additionalSkills') && (
            <div className="resume-entry">
              <div className="resume-heading" style={sectionTitleStyle}>
                {t.additionalSkills}
              </div>
              {present.additionalSkills ? (
                data.additionalSkills.map((s, i) => (
                  <p key={i} style={{ margin: '0 0 3px', fontSize: '10px', color: '#333', textAlign }}>
                    · {s}
                  </p>
                ))
              ) : (
                <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
              )}
            </div>
          )}
        </div>
      )}

      {/* ══ INTERESTS ══ */}
      {show('interests') && (
        <section className="resume-entry">
          <div className="resume-heading" style={sectionTitleStyle}>
            {t.interests}
          </div>
          {present.interests ? (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
                justifyContent: isRTL ? 'flex-end' : 'flex-start',
              }}
            >
              {data.interests.map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '9.5px',
                    padding: '3px 10px',
                    borderRadius: '99px',
                    background: `${accentColor}10`,
                    color: '#444',
                    border: `1px solid ${accentColor}20`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
          )}
        </section>
      )}
    </div>
  )
}
