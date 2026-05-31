import './App.css'
import { PageShell, SeoHead, pageForPath } from './public/PublicComponents'

export default function App() {
  const page = pageForPath(window.location.pathname)
  SeoHead(page)
  document.getElementById('root')!.innerHTML = PageShell(page)
}
