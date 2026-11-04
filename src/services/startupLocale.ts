type Locale = 'en' | 'ja'

function decode(value: string) {
  try { return decodeURIComponent(value.replace(/\+/g, ' ')) } catch { return null }
}

// Startup presentation request only. Hub has no saved locale preference.
export function initialHubLocale(hash: string): Locale {
  const values: Array<string | null> = []
  for (const pair of hash.replace(/^#/, '').split('&')) {
    const at = pair.indexOf('=')
    if (decode(at < 0 ? pair : pair.slice(0, at)) !== 'locale') continue
    values.push(decode(at < 0 ? '' : pair.slice(at + 1)))
  }
  return values.length === 1 && (values[0] === 'en' || values[0] === 'ja') ? values[0] : 'en'
}

// Keep unrelated raw segments intact; repair any locale duplicates/invalid value.
export function withHubLocale(hash: string, locale: Locale): string {
  const raw = hash.replace(/^#/, '')
  const segments: string[] = []
  let written = false
  for (const segment of raw ? raw.split('&') : []) {
    const at = segment.indexOf('=')
    if (decode(at < 0 ? segment : segment.slice(0, at)) === 'locale') {
      if (!written) segments.push(`locale=${locale}`)
      written = true
    } else segments.push(segment)
  }
  if (!written) segments.push(`locale=${locale}`)
  return `#${segments.join('&')}`
}
