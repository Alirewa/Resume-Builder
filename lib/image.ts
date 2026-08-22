'use client'

/** Longest edge of the stored avatar, in pixels. */
const MAX_EDGE = 512
/** Reject obviously-wrong uploads before we spend time decoding them. */
const MAX_SOURCE_BYTES = 10 * 1024 * 1024

export type AvatarResult =
  | { ok: true; dataUrl: string }
  | { ok: false; reason: 'not-an-image' | 'too-large' | 'decode-failed' }

/**
 * Read an uploaded image and return a downscaled JPEG data URL.
 *
 * The original file is never stored: a 4 MB phone photo becomes ~40 KB, which
 * is what keeps the whole resume inside the ~5 MB localStorage budget and
 * keeps the exported PDF small.
 */
export async function fileToAvatar(file: File): Promise<AvatarResult> {
  if (!file.type.startsWith('image/')) return { ok: false, reason: 'not-an-image' }
  if (file.size > MAX_SOURCE_BYTES) return { ok: false, reason: 'too-large' }

  let bitmapSrc: string
  try {
    bitmapSrc = await readAsDataUrl(file)
  } catch {
    return { ok: false, reason: 'decode-failed' }
  }

  try {
    const img = await loadImage(bitmapSrc)
    const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height))
    const w = Math.max(1, Math.round(img.width * scale))
    const h = Math.max(1, Math.round(img.height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return { ok: false, reason: 'decode-failed' }

    // Flatten onto white: JPEG has no alpha channel, and a transparent PNG
    // would otherwise come out with a black background.
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)
    ctx.drawImage(img, 0, 0, w, h)

    return { ok: true, dataUrl: canvas.toDataURL('image/jpeg', 0.88) }
  } catch {
    return { ok: false, reason: 'decode-failed' }
  }
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image decode failed'))
    img.src = src
  })
}

/** Read a text file (used for JSON import). */
export function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}
