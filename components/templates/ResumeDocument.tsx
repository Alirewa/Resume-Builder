'use client'

import React from 'react'
import Template1 from './Template1'
import Template2 from './Template2'
import Template3 from './Template3'
import type { TemplateId } from '@/lib/types'
import type { TemplateProps } from './shared'

const TEMPLATES: Record<TemplateId, React.ComponentType<TemplateProps>> = {
  1: Template1,
  2: Template2,
  3: Template3,
}

interface ResumeDocumentProps extends TemplateProps {
  /** Overrides `data.template` — used by the gallery to show every design at once. */
  templateId?: TemplateId
}

/** Renders the resume in whichever template is selected. */
export default function ResumeDocument({ templateId, data, ...rest }: ResumeDocumentProps) {
  const Template = TEMPLATES[templateId ?? data.template] ?? Template1
  return <Template data={data} {...rest} />
}
