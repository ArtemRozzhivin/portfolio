const SANITY_CDN = 'https://cdn.sanity.io/'

type ImageParams = Record<string, string | number>

export function imageUrl(src: string, params: ImageParams): string {
  if (!src.startsWith(SANITY_CDN)) return src
  const url = new URL(src)
  for (const [key, value] of Object.entries({ auto: 'format', ...params })) {
    url.searchParams.set(key, String(value))
  }
  return url.toString()
}

export function imageSrcSet(src: string, widths: number[]): string | undefined {
  if (!src.startsWith(SANITY_CDN)) return undefined
  return widths.map((w) => `${imageUrl(src, { w })} ${w}w`).join(', ')
}
