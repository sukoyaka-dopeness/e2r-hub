type Locale = 'en' | 'ja'

function isLoopback(hostname: string) {
  return ['localhost', '127.0.0.1', '[::1]'].includes(hostname.toLowerCase())
}

export function resolveHandoffUrl(value: string | undefined, allowLoopbackHttp = false): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    if (url.username || url.password) return undefined
    if (url.protocol !== 'https:' && !(allowLoopbackHttp && url.protocol === 'http:' && isLoopback(url.hostname))) return undefined
    return url.toString()
  } catch {
    return undefined
  }
}

export function parameterPlotterHandoffHref(applicationUrl: string, datasetUrl: string, locale: Locale) {
  const target = new URL(applicationUrl)
  target.hash = new URLSearchParams([['datasetUrl', datasetUrl], ['locale', locale]]).toString()
  return target.toString()
}

export function parameterPlotterGuideHref(applicationUrl: string, locale: Locale) {
  const base = new URL(applicationUrl)
  base.hash = ''
  if (!base.pathname.endsWith('/')) base.pathname += '/'
  return new URL(`docs/user-guide-${locale}.html`, base).toString()
}
