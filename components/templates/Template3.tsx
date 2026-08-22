'use client'

import React from 'react'
import { translations } from '@/lib/translations'
import { languageLevelWidth, sectionPresence, shouldRender } from '@/lib/resume'
import { Avatar, EmptySection, compact, dateRange, icons, type TemplateProps } from './shared'

/**
 * Creative CV: accent rail, chip-style contact details, and a 62/38 split
 * between the narrative column and the at-a-glance column.
 */
export default function Template3({ data, accentColor = '#7c3aed', hideEmpty = true }: TemplateProps) {
  const t = translations[data.language]
  const isRTL = data.language === 'fa'
  const font = isRTL ? "'Vazirmatn', Arial, sans-serif" : 'Arial, Helvetica, sans-serif'
  const rowDirection = isRTL ? 'row-reverse' : 'row'
  const textAlign: 'right' | 'left' = isRTL ? 'right' : 'left'
  const Icon = icons(11)

  const accent = accentColor
  const accentLight = `${accent}18`
  const accentMid = `${accent}40`

  const present = sectionPresence(data)
  const show = (key: keyof typeof present) => shouldRender(present[key], hideEmpty)

  const datePill: React.CSSProperties = {
    fontSize: '9.5px',
    color: '#888',
    background: '#f5f5f5',
    padding: '1px 6px',
    borderRadius: '4px',
    flexShrink: 0,
  }

  const contactChips = compact<{ icon: React.ReactNode; value: string }>([
    data.personal.phone && { icon: Icon.phone, value: data.personal.phone },
    data.personal.email && { icon: Icon.mail, value: data.personal.email },
    data.personal.website && { icon: Icon.link, value: data.personal.website },
    data.personal.address && { icon: Icon.pin, value: data.personal.address },
    data.personal.nationality && { icon: Icon.globe, value: data.personal.nationality },
    data.personal.birthDate && {
      icon: Icon.calendar,
      value: `${data.personal.birthDate}${data.personal.birthPlace ? ` · ${data.personal.birthPlace}` : ''}`,
    },
  ])

  return (
    <div
      id="resume-template"
      style={{
        fontFamily: font,
        direction: isRTL ? 'rtl' : 'ltr',
        fontSize: '11px',
        lineHeight: '1.55',
        color: '#1e1e2e',
        backgroundColor: '#fff',
        width: '210mm',
        minHeight: '297mm',
        display: 'flex',
        flexDirection: rowDirection,
        boxSizing: 'border-box',
      }}
    >
      {/* Accent rail — left for LTR, right for RTL */}
      <div
        style={{
          width: '5px',
          background: `linear-gradient(180deg, ${accent} 0%, ${accent}88 100%)`,
          flexShrink: 0,
        }}
      />

      <div
        style={{
          flex: 1,
          padding: isRTL ? '22px 18px 22px 20px' : '22px 20px 22px 18px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── HEADER ── */}
        <div
          className="resume-entry"
          style={{
            display: 'flex',
            gap: '18px',
            alignItems: 'center',
            flexDirection: rowDirection,
            marginBottom: '18px',
            paddingBottom: '16px',
            borderBottom: `2px solid ${accent}`,
          }}
        >
          <Avatar
            src={data.personal.avatar}
            alt=""
            size={78}
            borderColor={accent}
            background={accentLight}
            glyphColor={`${accent}55`}
          />

          <div style={{ flex: 1, textAlign }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111', margin: '0 0 3px', fontFamily: font }}>
              {data.personal.firstName} {data.personal.lastName}
            </h1>
            <p style={{ fontSize: '13px', fontWeight: 600, color: accent, margin: '0 0 8px' }}>
              {data.personal.jobTitle}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', flexDirection: rowDirection }}>
              {contactChips.map((item, i) => (
                <span
                  key={i}
                  style={{
                    background: accentLight,
                    color: '#333',
                    fontSize: '9.5px',
                    padding: '3px 8px',
                    borderRadius: '99px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    border: `1px solid ${accentMid}`,
                    flexDirection: rowDirection,
                  }}
                >
                  {item.icon}
                  <span>{item.value}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── TWO-COLUMN BODY ── */}
        <div style={{ display: 'flex', gap: '18px', flex: 1, flexDirection: rowDirection }}>
          {/* Narrative column */}
          <div
            style={{
              flex: '0 0 62%',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              textAlign,
            }}
          >
            {show('profile') && (
              <Section title={t.profile} accent={accent} isRTL={isRTL}>
                {present.profile ? (
                  <p style={{ color: '#444', lineHeight: '1.65', margin: 0 }}>{data.personal.profile}</p>
                ) : (
                  <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
                )}
              </Section>
            )}

            {show('experience') && (
              <Section title={t.experience} accent={accent} isRTL={isRTL}>
                {present.experience ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {data.experience.map((exp, idx) => (
                      <div
                        key={exp.id}
                        className="resume-entry"
                        style={{ display: 'flex', gap: '10px', flexDirection: rowDirection }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <div
                            style={{
                              width: '9px',
                              height: '9px',
                              borderRadius: '50%',
                              backgroundColor: accent,
                              marginTop: '3px',
                              flexShrink: 0,
                            }}
                          />
                          {/* No trailing rail after the last entry. */}
                          {idx < data.experience.length - 1 && (
                            <div
                              style={{
                                width: '1.5px',
                                flex: 1,
                                backgroundColor: `${accent}40`,
                                marginTop: '3px',
                              }}
                            />
                          )}
                        </div>
                        <div style={{ flex: 1, paddingBottom: '4px' }}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              flexWrap: 'wrap',
                              gap: '2px',
                              flexDirection: rowDirection,
                            }}
                          >
                            <strong style={{ fontSize: '11.5px', color: '#111' }}>{exp.company}</strong>
                            <span style={datePill}>
                              {dateRange(exp.startDate, exp.endDate, exp.current, t.current)}
                            </span>
                          </div>
                          <p style={{ margin: '1px 0 4px', color: accent, fontSize: '10.5px', fontWeight: 600 }}>
                            {exp.role}
                          </p>
                          {exp.bullets.length > 0 && (
                            <ul style={{ margin: 0, paddingInlineStart: '14px' }}>
                              {exp.bullets.map((b, i) => (
                                <li key={i} style={{ color: '#444', marginBottom: '2px', fontSize: '10.5px' }}>
                                  {b}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
                )}
              </Section>
            )}

            {show('education') && (
              <Section title={t.education} accent={accent} isRTL={isRTL}>
                {present.education ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {data.education.map((edu) => (
                      <div
                        key={edu.id}
                        className="resume-entry"
                        style={{ display: 'flex', gap: '10px', flexDirection: rowDirection }}
                      >
                        <div style={{ flexShrink: 0 }}>
                          <div
                            style={{
                              width: '9px',
                              height: '9px',
                              borderRadius: '50%',
                              backgroundColor: accent,
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
                            <strong style={{ fontSize: '11px', color: '#111' }}>{edu.institution}</strong>
                            <span style={datePill}>
                              {dateRange(edu.startDate, edu.endDate, false, t.current)}
                            </span>
                          </div>
                          <p style={{ margin: '1px 0 0', color: '#555', fontSize: '10.5px' }}>
                            {edu.degree}
                            {edu.field ? ` · ${edu.field}` : ''}
                          </p>
                          {edu.notes && (
                            <p style={{ margin: '2px 0 0', color: '#777', fontSize: '10px', fontStyle: 'italic' }}>
                              {edu.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
                )}
              </Section>
            )}
          </div>

          {/* At-a-glance column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', textAlign }}>
            {show('languages') && (
              <Section title={t.languages} accent={accent} isRTL={isRTL}>
                {present.languages ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {data.languages.map((lang) => (
                      <div key={lang.id} className="resume-entry">
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '3px',
                            flexDirection: rowDirection,
                          }}
                        >
                          <span style={{ fontSize: '10.5px', color: '#333', fontWeight: 600 }}>
                            {lang.name}
                          </span>
                          <span style={{ fontSize: '9.5px', color: '#888' }}>{lang.level}</span>
                        </div>
                        <div
                          style={{ height: '4px', borderRadius: '99px', background: '#eee', overflow: 'hidden' }}
                        >
                          <div
                            style={{
                              height: '100%',
                              borderRadius: '99px',
                              background: accent,
                              width: languageLevelWidth(lang.level),
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
                )}
              </Section>
            )}

            {show('skills') && (
              <Section title={t.skills} accent={accent} isRTL={isRTL}>
                {present.skills ? (
                  data.skills.map((group) => (
                    <div key={group.id} className="resume-entry" style={{ marginBottom: '8px' }}>
                      <p style={{ fontWeight: 700, fontSize: '10.5px', color: accent, margin: '0 0 4px' }}>
                        {group.category}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '4px',
                          justifyContent: isRTL ? 'flex-end' : 'flex-start',
                        }}
                      >
                        {group.items.map((item, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '9.5px',
                              padding: '2px 8px',
                              borderRadius: '99px',
                              background: accentLight,
                              color: '#333',
                              border: `1px solid ${accentMid}`,
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
              </Section>
            )}

            {show('certificates') && (
              <Section title={t.certificates} accent={accent} isRTL={isRTL}>
                {present.certificates ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {data.certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="resume-entry"
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '6px',
                          flexDirection: rowDirection,
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: accent,
                            flexShrink: 0,
                            marginTop: '3px',
                          }}
                        />
                        <div>
                          <p style={{ margin: 0, fontSize: '10.5px', fontWeight: 600, color: '#222' }}>
                            {cert.name}
                          </p>
                          {(cert.issuer || cert.date) && (
                            <p style={{ margin: 0, fontSize: '9.5px', color: '#888' }}>
                              {[cert.issuer, cert.date].filter(Boolean).join(' · ')}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
                )}
              </Section>
            )}

            {show('additionalSkills') && (
              <Section title={t.additionalSkills} accent={accent} isRTL={isRTL}>
                {present.additionalSkills ? (
                  <TagRow
                    items={data.additionalSkills}
                    isRTL={isRTL}
                    background="#f3f4f6"
                    border="1px solid #e5e7eb"
                  />
                ) : (
                  <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
                )}
              </Section>
            )}

            {show('interests') && (
              <Section title={t.interests} accent={accent} isRTL={isRTL}>
                {present.interests ? (
                  <TagRow
                    items={data.interests}
                    isRTL={isRTL}
                    background={accentLight}
                    border={`1px solid ${accentMid}`}
                  />
                ) : (
                  <EmptySection text={t.sectionEmpty} isRTL={isRTL} />
                )}
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({
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
          fontSize: '12px',
          fontWeight: 700,
          color: '#111',
          letterSpacing: isRTL ? '0' : '0.02em',
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

function TagRow({
  items,
  isRTL,
  background,
  border,
}: {
  items: string[]
  isRTL: boolean
  background: string
  border: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        justifyContent: isRTL ? 'flex-end' : 'flex-start',
      }}
    >
      {items.map((s, i) => (
        <span
          key={i}
          style={{
            fontSize: '9.5px',
            padding: '2px 8px',
            borderRadius: '99px',
            background,
            color: '#555',
            border,
          }}
        >
          {s}
        </span>
      ))}
    </div>
  )
}
