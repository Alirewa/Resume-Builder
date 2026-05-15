'use client'

export async function exportToPdf(elementId: string, filename = 'resume.pdf') {
  const element = document.getElementById(elementId)
  if (!element) {
    alert('خطا: قالب رزومه یافت نشد')
    return
  }

  try {
    // Wait for all web fonts (Vazirmatn etc.) to finish loading
    await document.fonts.ready

    const html2canvas = (await import('html2canvas')).default
    const { jsPDF } = await import('jspdf')

    // DOM structure in preview/page.tsx:
    //   sizerRef   (width:210mm, maxWidth:100%)
    //     clipDiv  (overflow:hidden, height:clipHeight)
    //       wrapRef / #preview-template-wrapper  (transform:scale(s))
    //         #resume-template  ← element
    //
    // html2canvas inherits CSS transforms from ancestors, so the scaled-down
    // wrapper produces a tiny canvas on mobile. We must clear the transforms
    // and clip constraints before capture, then restore them afterward.

    const wrapper = element.parentElement                   // #preview-template-wrapper
    const clipDiv = wrapper?.parentElement ?? null          // overflow:hidden clip container
    const sizerDiv = clipDiv?.parentElement ?? null         // width:210mm sizer

    // Save current styles
    const prev = {
      wTransform:   wrapper?.style.transform    ?? '',
      wWidth:       wrapper?.style.width        ?? '',
      cHeight:      clipDiv?.style.height       ?? '',
      cOverflow:    clipDiv?.style.overflow     ?? '',
      sMaxWidth:    sizerDiv?.style.maxWidth    ?? '',
    }

    // Temporarily lift all scaling/clipping so html2canvas sees the full A4 layout
    if (wrapper)  { wrapper.style.transform = 'none'; wrapper.style.width = '210mm' }
    if (clipDiv)  { clipDiv.style.height = 'auto';    clipDiv.style.overflow = 'visible' }
    if (sizerDiv) { sizerDiv.style.maxWidth = 'none' }

    // Allow the browser one frame to re-layout before capture
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))

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
      // Always restore — even if capture throws
      if (wrapper)  { wrapper.style.transform = prev.wTransform; wrapper.style.width = prev.wWidth }
      if (clipDiv)  { clipDiv.style.height = prev.cHeight;       clipDiv.style.overflow = prev.cOverflow }
      if (sizerDiv) { sizerDiv.style.maxWidth = prev.sMaxWidth }
    }

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('تصویر رزومه خالی است')
    }

    // A4: 210 × 297 mm
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pdfW = pdf.internal.pageSize.getWidth()   // 210
    const pdfH = pdf.internal.pageSize.getHeight()  // 297

    const imgW = canvas.width
    const imgH = canvas.height
    const renderH = (imgH / imgW) * pdfW

    if (renderH <= pdfH + 1) {
      // Single page — fits on one A4
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, pdfW, renderH)
    } else {
      // Multi-page: slice canvas into A4 strips
      const stripPx = Math.max(1, Math.floor((pdfH / renderH) * imgH))
      let offsetPx = 0
      while (offsetPx < imgH) {
        const sliceH = Math.min(stripPx, imgH - offsetPx)
        if (sliceH <= 0) break

        const slice = document.createElement('canvas')
        slice.width = imgW
        slice.height = sliceH
        slice.getContext('2d')!.drawImage(
          canvas, 0, offsetPx, imgW, sliceH, 0, 0, imgW, sliceH
        )

        if (offsetPx > 0) pdf.addPage()
        pdf.addImage(
          slice.toDataURL('image/jpeg', 0.95),
          'JPEG', 0, 0, pdfW, (sliceH / imgW) * pdfW
        )
        offsetPx += sliceH
      }
    }

    pdf.save(filename)
  } catch (err) {
    console.error('[PDF] html2canvas failed, falling back to print:', err)
    // Reliable fallback: browser's native PDF renderer
    printResume()
  }
}

/** Open the browser's print dialog which produces a pixel-perfect PDF */
export function printResume() {
  window.print()
}
