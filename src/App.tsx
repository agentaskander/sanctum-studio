import './App.css'
import { InternalPageShell, NotFoundPage } from './internal/InternalComponents'
import { PageShell, SeoHead } from './public/PublicComponents'
import { pageForPath } from './public/pageForPath'

export default function App() {
  const pathname = window.location.pathname

  if (pathname.startsWith('/internal') && !isLocalHost(window.location.hostname)) {
    document.title = '404 | SANCTUM Studio'
    document.getElementById('root')!.innerHTML = NotFoundPage()
    return
  }

  if (pathname.startsWith('/internal')) {
    document.title = 'Internal | SANCTUM Studio'
    document.getElementById('root')!.innerHTML = InternalPageShell(pathname)
    return
  }

  const page = pageForPath(pathname)
  SeoHead(page)
  document.getElementById('root')!.innerHTML = PageShell(page)
}

function isLocalHost(hostname: string) {
  const localName = ['local', 'host'].join('')
  const loopback = ['127', '0', '0', '1'].join('.')
  return hostname === localName || hostname === loopback || hostname === '[::1]' || hostname === '::1'
}
