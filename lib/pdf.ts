'use client'

/**
 * Rasterised PDF export.
 *
 * The preview scales the A4 template down to fit the viewport, and the capture
 * inherits CSS transforms from ancestors — capturing as-is would produce a
 * postage-stamp PDF on mobile. So the scaling and clipping are lifted for the
 * duration of the capture and restored afterwards, whatever happens.
 *
 * Uses `html2canvas-pro` rather than `html2canvas`: the original stalled on
 * modern CSS colour functions ("unsupported color function lab"), and since
 * Tailwind v4 emits an `oklch()` palette that browsers serialise as `oklab()`,
 * every single export failed and silently fell back to the print dialog.
 */

export type PdfResult = { ok: true } | { ok: false; reason: 'no-element' | 'capture-failed' }

const TEMPLATE_ID = 'resume-template'

export async function exportToPdf(filename = 'resume.pdf'): Promise<PdfResult> {
  const element = document.getElementById(TEMPLATE_ID)
  if (!element) return { ok: false, reason: 'no-element' }

  const wrapper = element.parentElement // #preview-template-wrapper
  const clipDiv = wrapper?.parentElement ?? null // #preview-clip-div

  const previous = {
    wTransform: wrapper?.style.transform ?? '',
    wWidth: wrapper?.style.width ?? '',
    cHeight: clipDiv?.style.height ?? '',
    cWidth: clipDiv?.style.width ?? '',
    cOverflow: clipDiv?.style.overflow ?? '',
  }

  try {
    // Vazirmatn must be resident before capture or Persian text renders as
    // fallback glyphs in the bitmap.
    await document.fonts.ready

    const html2canvas = (await import('html2canvas-pro')).default
    const { jsPDF } = await import('jspdf')

    if (wrapper) {
      wrapper.style.transform = 'none'
      wrapper.style.width = '210mm'
    }
    if (clipDiv) {
      clipDiv.style.height = 'auto'
      clipDiv.style.width = '210mm'
      clipDiv.style.overflow = 'visible'
    }

    // Give the browser a couple of frames to re-layout at full size.
    await settleLayout()

    let canvas: HTMLCanvasElement
    try {
      canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        foreignObjectRendering: false,
      })
    } finally {
      restore()
    }

    if (!canvas.width || !canvas.height) throw new Error('empty canvas')

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pageW = pdf.internal.pageSize.getWidth()
    const pageH = pdf.internal.pageSize.getHeight()

    const imgW = canvas.width
    const imgH = canvas.height
    const renderH = (imgH / imgW) * pageW

    if (renderH <= pageH + 1) {
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, pageW, renderH)
    } else {
      // Slice the tall canvas into A4-height strips, one per page.
      const stripPx = Math.max(1, Math.floor((pageH / renderH) * imgH))
      let offsetPx = 0
      while (offsetPx < imgH) {
        const sliceH = Math.min(stripPx, imgH - offsetPx)
        if (sliceH <= 0) break

        const slice = document.createElement('canvas')
        slice.width = imgW
        slice.height = sliceH
        const ctx = slice.getContext('2d')
        if (!ctx) throw new Error('2d context unavailable')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, imgW, sliceH)
        ctx.drawImage(canvas, 0, offsetPx, imgW, sliceH, 0, 0, imgW, sliceH)

        if (offsetPx > 0) pdf.addPage()
        pdf.addImage(
          slice.toDataURL('image/jpeg', 0.95),
          'JPEG',
          0,
          0,
          pageW,
          (sliceH / imgW) * pageW,
        )
        offsetPx += sliceH
      }
    }

    pdf.save(filename)
    return { ok: true }
  } catch (err) {
    console.error('[pdf] export failed:', err)
    restore()
    return { ok: false, reason: 'capture-failed' }
  }

  function restore() {
    if (wrapper) {
      wrapper.style.transform = previous.wTransform
      wrapper.style.width = previous.wWidth
    }
    if (clipDiv) {
      clipDiv.style.height = previous.cHeight
      clipDiv.style.width = previous.cWidth
      clipDiv.style.overflow = previous.cOverflow
    }
  }
}

/**
 * Wait for the browser to re-layout, but never wait forever.
 *
 * `requestAnimationFrame` does not fire in a hidden or backgrounded tab, so a
 * bare rAF await would leave the export permanently pending — button stuck on
 * "generating", preview stuck in its un-scaled capture state — for anyone who
 * switches tabs after pressing the button. The timer is the escape hatch.
 */
function settleLayout(timeoutMs = 400): Promise<void> {
  return new Promise<void>((resolve) => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      resolve()
    }
    const timer = window.setTimeout(finish, timeoutMs)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        window.clearTimeout(timer)
        finish()
      }),
    )
  })
}

/** The browser's own renderer — vector text, selectable, and always available. */
export function printResume() {
  window.print()
}
