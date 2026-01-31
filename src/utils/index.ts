const isValidRedirectUrl = (props: { url: string; originUrl: URL; allowedDomains?: string[] }) => {
  const { url, originUrl, allowedDomains } = props

  try {
    const parsedUrl = new URL(decodeURIComponent(url))

    if (allowedDomains != null) {
      if (!allowedDomains.includes(parsedUrl.hostname)) {
        return false
      }
    }

    if (parsedUrl.origin !== originUrl.origin) {
      return false
    }

    return true
  } catch (e) {
    return false
  }
}
const getRedirectUrl = (props: { url: URL; nextPathname?: string; locales?: string[] }): string => {
  const { url, nextPathname, locales } = props
  const parsed = url

  const origin = parsed.origin // https://example.com
  const originalPath = parsed.pathname // /ko/page
  const search = parsed.search // ?foo=bar
  const hash = parsed.hash // #hash

  let finalPath = nextPathname ?? originalPath

  if (locales != null && locales.length > 0) {
    for (const locale of locales) {
      if (finalPath.startsWith(`/${locale}`)) {
        finalPath = `/${locales[0]}${finalPath.slice(locale.length + 1)}`
        break
      }
    }
  }

  return `${origin}${finalPath}${search}${hash}`
}

const getGradeByPrice = (price: number) => {
  if (price === 0) {
    return 'free'
  } else if (price <= 19999) {
    return 'yellow'
  } else if (price <= 69999) {
    return 'green'
  } else if (price <= 299999) {
    return 'sky'
  } else if (price <= 999999) {
    return 'purple'
  } else {
    return 'pink'
  }
}

export { getGradeByPrice, getRedirectUrl, isValidRedirectUrl }
