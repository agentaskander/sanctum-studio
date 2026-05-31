import { betaPages, pages } from './siteContent'
import { collectionRoutes, seoPages } from './seoLibrary'

export function pageForPath(pathname: string) {
  const normalized = pathname.replace(/\/$/, '') || '/'
  return [...pages, ...betaPages, ...collectionRoutes, ...seoPages].find((page) => page.path === normalized) ?? pages[0]
}
