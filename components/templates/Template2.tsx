'use client'

import React from 'react'
import { translations } from '@/lib/translations'
import { languageLevelWidth, sectionPresence, shouldRender } from '@/lib/resume'
import { Avatar, EmptySection, compact, dateRange, icons, type TemplateProps } from './shared'

/**
 * Two-column CV with a filled sidebar.
 * Sidebar text is expressed as white at varying opacity rather than fixed
 * slate greys, so it stays legible against every accent colour.
 */
export default function Template2({ data, accentColor = '#1e3a5f', hideEmpty = true }: TemplateProps) {
  const t = translations[data.language]
  const isRTL = data.language === 'fa'
  const font = isRTL ? "'Vazirmatn', Arial, sans-serif" : 'Arial, Helvetica, sans-serif'
  const textAlign: 'right' | 'left' = isRTL ? 'right' : 'left'
  const rowDirection = isRTL ? 'row-reverse' : 'row'
  const Ic = icons(10)
  const present = sectionPresence(data)
  const show = (key: keyof typeof present) => shouldRender(present[key], hideEmpty)

  const onAccent = {
    strong: 'rgba(255,255,255,0.92)',
    muted: 'rgba(255,255,255,0.66)',
    faint: 'rgba(255,255,255,0.45)',
    chip: 'rgba(255,255,255,0.12)',
    chipBorder: 'rgba(255,255,255,0.16)',
  }

  const datePill: React.CSSProperties = {
    fontSize: '9px',
    color: '#888',
    background: '#f5f5f7',
    padding: '1px 6px',
    borderRadius: '3px',
    flexShrink: 0,
  }

  const contactRows = compact<{ icon: React.ReactNode; text: string; small?: boolean }>([
    data.personal.birthDate && {
      icon: Ic.calendar,
      text: `${data.personal.birthDate}${data.personal.birthPlace ? ` · ${data.personal.birthPlace}` : ''}`,
    },
    data.personal.nationality && { icon: Ic.globe, text: data.personal.nationality },
    data.personal.address && { icon: Ic.pin, text: data.personal.address },
    data.personal.phone && { icon: Ic.phone, text: data.personal.phone },
    data.personal.email && { icon: Ic.mail, text: data.personal.email, small: true },
    data.personal.website && { icon: Ic.link, text: data.personal.website, small: true },
  ])

  const sidebar = (
    <div
      style={{
        width: '64mm',
        flexShrink: 0,
        backgroundColor: accentColor,
        padding: '20px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
        <Avatar
          src={data.personal.avatar}
          alt=""
          size={80}
          borderColor="rgba(255,255,255,0.25)"
          background="rgba(255,255,255,0.1)"
          glyphColor="rgba(255,255,255,0.4)"
        />
      </div>

      {contactRows.length > 0 && (
        <SidebarBlock title={t.personalInfo} isRTL={isRTL} faint={onAccent.faint}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {contactRows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'flex-start',
                  color: onAccent.strong,
                  flexDirection: rowDirection,
                }}
              >
                <span style={{ marginTop: '1px', opacity: 0.7 }}>{row.icon}</span>
                <span style={{ wordBreak: 'break-word', fontSize: row.small ? '8.5px' : '9.5px' }}>
                  {row.text}
                </span>
              </div>
            ))}
          </div>
        </SidebarBlock>
      )}

      {show('languages') && (
        <SidebarBlock title={t.languages} isRTL={isRTL} faint={onAccent.faint}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {present.languages ? (
              data.languages.map((lang) => (
                <div key={lang.id}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '6px',
                      marginBottom: '3px',
                      flexDirection: rowDirection,
                    }}
                  >
                    <span style={{ fontSize: '9.5px', color: onAccent.strong, fontWeight: 600 }}>
                      {lang.name}
                    </span>
                    <span style={{ fontSize: '9px', color: onAccent.muted }}>{lang.level}</span>
                  </div>
                  <div style={{ height: '3px', borderRadius: '99px', background: onAccent.chip }}>
                    <div
                      style={{
                        height: '100%',
                        borderRadius: '99px',
                        background: 'rgba(255,255,255,0.6)',
                        width: languageLevelWidth(lang.level),
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <SidebarEmpty text={t.sectionEmpty} isRTL={isRTL} />
            )}
          </div>
        </SidebarBlock>
      )}

      {show('certificates') && (
        <SidebarBlock title={t.certificates} isRTL={isRTL} faint={onAccent.faint}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {present.certificates ? (
              data.certificates.map((cert) => (
                <div key={cert.id} style={{ fontSize: '9px' }}>
                  <p style={{ margin: 0, color: onAccent.strong, fontWeight: 600, lineHeight: '1.4' }}>
                    {cert.name}
                  </p>
                  {(cert.issuer || cert.date) && (
                    <p style={{ margin: 0, color: onAccent.muted }}>
                      {[cert.issuer, cert.date].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <SidebarEmpty text={t.sectionEmpty} isRTL={isRTL} />
            )}
          </div>
        </SidebarBlock>
      )}

      {show('additionalSkills') && (
        <SidebarBlock title={t.additionalSkills} isRTL={isRTL} faint={onAccent.faint}>
          <ChipRow
            items={data.additionalSkills}
            isRTL={isRTL}
            empty={t.sectionEmpty}
            palette={onAccent}
          />
        </SidebarBlock>
      )}

      {show('interests') && (
        <SidebarBlock title={t.interests} isRTL={isRTL} faint={onAccent.faint}>
          <ChipRow items={data.interests} isRTL={isRTL} empty={t.sectionEmpty} palette={onAccent} />
        </SidebarBlock>
      )}
    </div>
  )

  const main = (
    <div
      style={{
        flex: 1,
        padding: '20px 17px',
        display: 'flex',
        flexDirection: 'column',
        gap: '13px',
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign,
      }}
    >
      <div className="resume-entry" style={{ borderBottom: `2px solid ${accentColor}20`, paddingBottom: '11px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 3px', color: '#0f0f1a', fontFamily: font }}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <p style={{ fontSize: '12px', fontWeight: 600, color: accentColor, margin: 0 }}>
          {data.personal.jobTitle}
        </p>
      </div>

      {show('profile') && (
        <MainBlock title={t.profile} accent={accentColor} isRTL={isRTL}>
          {present.profile ? (
            <p style={{ margin: 0, color: '#444', lineHeight: '1.65', fontSize: '10.5px' }}>
              {data.personal.profile}
            </p>
          ) : (
            <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
          )}
        </MainBlock>
      )}

      {show('experience') && (
        <MainBlock title={t.experience} accent={accentColor} isRTL={isRTL}>
          {present.experience ? (
            data.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="resume-entry"
                style={{
                  marginBottom: idx < data.experience.length - 1 ? '12px' : 0,
                  display: 'flex',
                  gap: '8px',
                  flexDirection: rowDirection,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: accentColor,
                      marginTop: '3px',
                    }}
                  />
                  {idx < data.experience.length - 1 && (
                    <div style={{ width: '1.5px', flex: 1, background: `${accentColor}25`, marginTop: '3px' }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '2px',
                      flexDirection: rowDirection,
                    }}
                  >
                    <strong style={{ fontSize: '10.5px', color: '#0f0f1a' }}>{exp.company}</strong>
                    <span style={datePill}>{dateRange(exp.startDate, exp.endDate, exp.current, t.current)}</span>
                  </div>
                  <p style={{ margin: '2px 0 5px', fontSize: '10px', fontWeight: 600, color: accentColor }}>
                    {exp.role}
                  </p>
                  {exp.bullets.length > 0 && (
                    <ul style={{ margin: 0, paddingInlineStart: '14px', textAlign }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: '2px', color: '#444', fontSize: '10px' }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))
          ) : (
            <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
          )}
        </MainBlock>
      )}

      {show('skills') && (
        <MainBlock title={t.skills} accent={accentColor} isRTL={isRTL}>
          {present.skills ? (
            data.skills.map((group) => (
              <div key={group.id} className="resume-entry" style={{ marginBottom: '7px' }}>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: '9.5px',
                    color: accentColor,
                    margin: '0 0 4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {group.category}
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '3px',
                    justifyContent: isRTL ? 'flex-end' : 'flex-start',
                  }}
                >
                  {group.items.map((item, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '9px',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        background: `${accentColor}10`,
                        color: '#333',
                        border: `1px solid ${accentColor}22`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
          )}
        </MainBlock>
      )}

      {show('education') && (
        <MainBlock title={t.education} accent={accentColor} isRTL={isRTL}>
          {present.education ? (
            data.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="resume-entry"
                style={{
                  marginBottom: idx < data.education.length - 1 ? '9px' : 0,
                  display: 'flex',
                  gap: '8px',
                  flexDirection: rowDirection,
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <div
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: accentColor,
                      marginTop: '3px',
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '2px',
                      flexDirection: rowDirection,
                    }}
                  >
                    <strong style={{ fontSize: '10.5px', color: '#0f0f1a' }}>{edu.institution}</strong>
                    <span style={datePill}>{dateRange(edu.startDate, edu.endDate, false, t.current)}</span>
                  </div>
                  <p style={{ margin: '1px 0 0', fontSize: '10px', color: '#555' }}>
                    {edu.degree}
                    {edu.field ? ` · ${edu.field}` : ''}
                  </p>
                  {edu.notes && (
                    <p style={{ margin: '1px 0 0', fontSize: '9.5px', color: '#888', fontStyle: 'italic' }}>
                      {edu.notes}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
          )}
        </MainBlock>
      )}
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
        direction: 'ltr',
        // FA: sidebar on the right; EN/DE: sidebar on the left.
        flexDirection: isRTL ? 'row-reverse' : 'row',
        boxSizing: 'border-box',
      }}
    >
      {sidebar}
      {main}
    </div>
  )
}

function SidebarBlock({
  title,
  isRTL,
  faint,
  children,
}: {
  title: string
  isRTL: boolean
  faint: string
  children: React.ReactNode
}) {
  return (
    <div className="resume-entry">
      <h3
        className="resume-heading"
        style={{
          fontSize: '9px',
          fontWeight: 700,
          color: faint,
          textTransform: isRTL ? 'none' : 'uppercase',
          letterSpacing: isRTL ? '0' : '0.09em',
          margin: '0 0 6px',
          paddingBottom: '4px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          textAlign: isRTL ? 'right' : 'left',
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  )
}

function MainBlock({
  title,
  accent,
  isRTL,
  children,
}: {
  title: string
  accent: string
  isRTL: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <h2
        className="resume-heading"
        style={{
          margin: '0 0 8px',
          fontSize: '10.5px',
          fontWeight: 700,
          color: '#0f0f1a',
          textTransform: isRTL ? 'none' : 'uppercase',
          letterSpacing: isRTL ? '0' : '0.07em',
          borderRight: isRTL ? `3px solid ${accent}` : 'none',
          borderLeft: isRTL ? 'none' : `3px solid ${accent}`,
          paddingRight: isRTL ? '7px' : '0',
          paddingLeft: isRTL ? '0' : '7px',
          textAlign: isRTL ? 'right' : 'left',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function ChipRow({
  items,
  isRTL,
  empty,
  palette,
}: {
  items: string[]
  isRTL: boolean
  empty: string
  palette: { muted: string; chip: string; chipBorder: string }
}) {
  if (items.length === 0) return <SidebarEmpty text={empty} isRTL={isRTL} />
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '3px',
        justifyContent: isRTL ? 'flex-end' : 'flex-start',
      }}
    >
      {items.map((s, i) => (
        <span
          key={i}
          style={{
            fontSize: '8.5px',
            padding: '2px 7px',
            borderRadius: '99px',
            background: palette.chip,
            color: palette.muted,
            border: `1px solid ${palette.chipBorder}`,
          }}
        >
          {s}
        </span>
      ))}
    </div>
  )
}

function SidebarEmpty({ text, isRTL }: { text: string; isRTL: boolean }) {
  return (
    <div
      style={{
        minHeight: '38px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isRTL ? 'flex-end' : 'flex-start',
        padding: '8px 10px',
        borderRadius: '6px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px dashed rgba(255,255,255,0.15)',
        color: 'rgba(255,255,255,0.35)',
        fontSize: '8.5px',
        fontStyle: 'italic',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      {text}
    </div>
  )
}
