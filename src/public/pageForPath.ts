import { betaPages, pages } from './siteContent'
import { collectionRoutes, previewRoutes, seoPages } from './seoLibrary'

export function pageForPath(pathname: string) {
  const normalized = pathname.replace(/\/$/, '') || '/'
  return [...pages, ...betaPages, ...collectionRoutes, ...previewRoutes, ...seoPages].find((page) => page.path === normalized) ?? pages[0]
}
