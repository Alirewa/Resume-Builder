/** Colour helpers shared by the theme layer and the resume templates. */

/** `#2563eb` → `[37, 99, 235]`. Accepts 3- and 6-digit hex. */
export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '').trim()
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  const value = Number.parseInt(full, 16)
  if (!Number.isFinite(value) || full.length !== 6) return [37, 99, 235]
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

/**
 * Translucent variant of a hex colour, as legacy `rgba()`.
 *
 * Deliberately not `color-mix()`: html2canvas 1.x throws on modern colour
 * functions, which would break PDF export for the whole document.
 */
export function withAlpha(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
