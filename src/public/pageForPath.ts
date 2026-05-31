import { betaPages, pages } from './siteContent'
import { collectionRoutes, previewRoutes, seoPages } from './seoLibrary'

export function pageForPath(pathname: string) {
  const normalized = pathname.replace(/\/$/, '') || '/'
  const basePage = [...pages, ...betaPages, ...previewRoutes].find((page) => page.path === normalized)
  const collectionPage = collectionRoutes.find((page) => page.path === normalized)

  if (basePage && collectionPage?.seoCollectionItems?.length) {
    return {
      ...basePage,
      seoCollectionItems: collectionPage.seoCollectionItems,
      links: [...collectionPage.links, ...basePage.links].slice(0, 12),
    }
  }

  return basePage ?? collectionPage ?? seoPages.find((page) => page.path === normalized) ?? pages[0]
}
