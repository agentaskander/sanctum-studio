import { methodSteps, pages, sanctuaries, type PublicPage } from './siteContent'

export function SeoHead(page: PublicPage) {
  document.title = page.title
  setMeta('description', page.description)
  setMeta('robots', 'index,follow')
  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', page.title)
  setMeta('twitter:description', page.description)
  setMetaProperty('og:type', page.path === '/' ? 'website' : 'article')
  setMetaProperty('og:site_name', 'SANCTUM Studio')
  setMetaProperty('og:title', page.title)
  setMetaProperty('og:description', page.description)
  setMetaProperty('og:url', page.canonical)
  setLink('canonical', page.canonical)
}

export function PageShell(page: PublicPage) {
  return page.path === '/' ? HomePage(page) : PillarPage(page)
}

function HomePage(page: PublicPage) {
  return `
    ${Hero({
      eyebrow: 'Sanctuary Design Studio',
      title: 'Design Your Environment Like an Instrument',
      copy: 'SANCTUM Studio helps shape rooms for sleep, focus, recovery, creativity, and calm through light, sound, air, nature, and spatial rhythm.',
      primary: ['Design a Sleep Sanctuary', '/sleep-room-design'],
      secondary: ['Explore Studio Systems', '#sanctuaries'],
      diagram: 'room-stack',
    })}
    <main>
      <section id="sanctuaries" class="cinema-section">
        <div class="section-head">
          <p class="kicker">Sanctuary Systems</p>
          <h2>Rooms designed as living instruments.</h2>
        </div>
        <div class="sanctuary-grid">${sanctuaries.map((item) => LinkPanel(item.label, item.text, item.href, 'Sanctuary')).join('')}</div>
      </section>
      <section class="cinema-section split-section">
        <div>
          <p class="kicker">Room Optimization Stack</p>
          <h2>Light, sound, air, temperature, materials, nature, and ritual tuned as one atmosphere.</h2>
        </div>
        ${PublicDiagram('room-stack', 'hero-diagram')}
      </section>
      <section id="method" class="cinema-section">
        <div class="section-head">
          <p class="kicker">Studio Method</p>
          <h2>Observe. Tune. Layer. Stabilize. Refine.</h2>
        </div>
        <div class="method-grid">${methodSteps.map((step, index) => `<article class="method-step"><span>0${index + 1}</span><h3>${step.title}</h3><p>${step.text}</p></article>`).join('')}</div>
      </section>
      <section id="guides" class="cinema-section library-section">
        <div>
          <p class="kicker">Featured Guides</p>
          <h2>Premium design guides, not generic articles.</h2>
        </div>
        <div class="library-grid">
          ${LinkPanel('Sleep Room Design', 'A sleep sanctuary system for darkness, quiet, air, material softness, and evening descent.', '/sleep-room-design', 'Guide')}
          ${LinkPanel('Home Office Design', 'A focus sanctuary for task light, acoustic privacy, clean surfaces, and spatial clarity.', '/home-office-design', 'Guide')}
          ${LinkPanel('Nature And Grounding', 'A nature sanctuary built from views, plants, material warmth, outdoor thresholds, and ritual.', '/nature-and-grounding', 'Guide')}
        </div>
      </section>
      <section class="cinema-section library-section">
        <div>
          <p class="kicker">Professional Layer</p>
          <h2>Design systems for clients, projects, and rooms that need a clearer method.</h2>
        </div>
        <div class="library-grid">
          ${LinkPanel('Professional Frameworks', 'Studio-ready frameworks that translate sanctuary design into public-safe client work.', '/professional-frameworks', 'Bridge')}
          ${LinkPanel('Room Archetypes', 'Sleep, focus, recovery, creative, and nature sanctuaries as premium room patterns.', '/room-archetypes', 'Archetypes')}
          ${LinkPanel('Case Studies', 'Public-safe design narratives that show spatial transformation without private methods.', '/case-studies', 'Studies')}
        </div>
      </section>
      ${CTA('Begin with one room.', page.cta, '/tools', 'Open Studio tools')}
      ${DisclaimerBlock()}
      ${Footer()}
      ${Schema(page)}
    </main>
  `
}

function PillarPage(page: PublicPage) {
  return `
    ${Hero({
      eyebrow: page.label,
      title: page.h1,
      copy: page.intro,
      primary: ['Observe The Room', '#observe'],
      secondary: ['Related Guides', '#related'],
      diagram: page.diagram,
    })}
    <main>
      <section class="cinema-section split-section">
        <div>
          <p class="kicker">Studio Principle</p>
          <h2>Sanctuary design is atmosphere with intention.</h2>
        </div>
        <div class="large-copy">
          <p>${page.principle}</p>
          <p>The Studio method keeps the work practical: observe the room, tune one sensory layer, add only what supports the intended state, stabilize the routine, and refine after real use.</p>
        </div>
      </section>
      <section class="cinema-section">
        <div class="section-head">
          <p class="kicker">Visual Framework</p>
          <h2>${page.h1} as a room system.</h2>
        </div>
        ${PublicDiagram(page.diagram, 'hero-diagram')}
      </section>
      <section id="observe" class="cinema-section two-column">
        ${ListPanel('What To Observe', page.observe)}
        ${ListPanel('What To Tune', page.tune)}
      </section>
      ${DeepSeoSection(page)}
      ${ChecklistBlock(page.checklist)}
      <section id="related" class="cinema-section">
        <div class="section-head">
          <p class="kicker">Related Studio Systems</p>
          <h2>Continue through the sanctuary design library.</h2>
        </div>
        <div class="sanctuary-grid">${page.links.map((link) => LinkPanel(link.label, link.text, link.href, 'Related')).join('')}</div>
      </section>
      ${FaqBlock(page.faqs)}
      ${CTA('Tune the next layer.', page.cta, '/guides', 'Explore Studio guides')}
      ${DisclaimerBlock()}
      <section class="last-updated"><span>Last Updated</span><strong>${page.updated}</strong></section>
      ${Footer()}
      ${Schema(page)}
    </main>
  `
}

function Hero(props: {
  eyebrow: string
  title: string
  copy: string
  primary: [string, string]
  secondary: [string, string]
  diagram: PublicPage['diagram']
}) {
  return `
    <header class="public-hero">
      <nav class="public-nav" aria-label="Primary navigation">
        <a class="brand" href="/"><span>S</span>SANCTUM Studio</a>
        <div>
          <a href="/sleep-room-design">Sanctuaries</a>
          <a href="/guides">Method</a>
          <a href="/professional-frameworks">Professional</a>
          <a href="/guides">Guides</a>
          <a href="/tools">Tools</a>
          <a href="/about">About</a>
        </div>
      </nav>
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">${props.eyebrow}</p>
          <h1>${props.title}</h1>
          <p class="lede">${props.copy}</p>
          <div class="hero-actions">
            <a class="primary-link" href="${props.primary[1]}">${props.primary[0]}</a>
            <a class="secondary-link" href="${props.secondary[1]}">${props.secondary[0]}</a>
          </div>
        </div>
        ${PublicDiagram(props.diagram, 'hero-visual')}
      </div>
    </header>
  `
}

function LinkPanel(title: string, text: string, href: string, eyebrow: string) {
  return `<a class="surface-card link-panel" href="${href}"><span>${eyebrow}</span><h3>${title}</h3><p>${text}</p></a>`
}

function ListPanel(title: string, items: string[]) {
  return `<section class="list-panel"><h2>${title}</h2><ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul></section>`
}

export function ChecklistBlock(items: string[]) {
  return `<section class="cinema-section">${ListPanel('Public Design Checklist', items)}</section>`
}

export function FaqBlock(items: PublicPage['faqs']) {
  return `<section class="cinema-section faq-section"><p class="kicker">FAQ</p><h2>Questions before changing the room.</h2><div class="faq-list">${items.map((item) => `<details open><summary>${item.question}</summary><p>${item.answer}</p></details>`).join('')}</div></section>`
}

export function DisclaimerBlock() {
  return '<section class="disclaimer"><strong>Disclaimer</strong><p>Design guidance only. Not medical advice.</p></section>'
}

function CTA(title: string, text: string, href: string, label: string) {
  return `<section class="cta"><p class="kicker">SANCTUM Studio</p><h2>${title}</h2><p>${text}</p><a class="primary-link" href="${href}">${label}</a></section>`
}

function Footer() {
  return '<footer class="footer"><div><strong>SANCTUM Studio</strong><span>Design implementation for sanctuary spaces.</span></div><a href="https://sanctumprotocol.org">SANCTUM Protocol is the public framework layer.</a></footer>'
}

function DeepSeoSection(page: PublicPage) {
  return `
    <section class="cinema-section knowledge-section">
      <div class="section-head">
        <p class="kicker">Definition And Design Context</p>
        <h2>${page.h1} as premium sanctuary room design.</h2>
      </div>
      <div class="knowledge-grid">
        <article class="knowledge-panel">
          <h3>What It Means</h3>
          <p>${page.h1} is a visible design system for shaping a room around a human state. SANCTUM Studio treats light, sound, air, temperature, materials, nature, and ritual as parts of one instrument, not separate purchases or isolated decor decisions.</p>
          <p>The result is a room that feels intentional before it feels styled. A sleep room should descend. A focus space should clarify. A recovery room should soften. A creative room should invite movement without scattering attention. A nature room should reconnect the body with place.</p>
        </article>
        <article class="knowledge-panel">
          <h3>How It Differs From Generic Room Advice</h3>
          <p>Generic room advice usually starts with tips. SANCTUM starts with atmosphere. The Studio method asks what the room is amplifying, what it is muffling, what it interrupts, and which daily ritual it should make easier to repeat.</p>
          <p>This keeps the work premium and practical. Instead of filling a room with themed objects, the design removes friction, tunes sensory conditions, layers materials with restraint, and stabilizes the room so its purpose can be felt every day.</p>
        </article>
        <article class="knowledge-panel">
          <h3>How To Apply It</h3>
          <p>Begin with one room and one state: sleep, focus, recovery, creativity, or calm. Observe the room at the time it matters most. Notice glare, noise, air, thermal comfort, clutter, material harshness, missing nature contact, and reset difficulty.</p>
          <p>Then tune one layer. Change the light path, reduce sound reflection, clear the primary surface, introduce breathable order, add a living reference point, or simplify the ritual. Keep what makes the room easier to use, and remove what only adds visual weight.</p>
        </article>
      </div>
    </section>
  `
}

export function PublicDiagram(kind: PublicPage['diagram'], className = '') {
  const labels = diagramLabels[kind]
  return `
    <section class="diagram-wrap ${className}" aria-label="${labels.title}">
      <div class="diagram-stack">
        <svg viewBox="0 0 760 520" role="img">
          <title>${labels.title}</title>
          <defs>
            <linearGradient id="studioGlow" x1="0" x2="1">
              <stop offset="0%" stop-color="#f0d6a7"></stop>
              <stop offset="100%" stop-color="#96c7bb"></stop>
            </linearGradient>
          </defs>
          <rect class="stage" x="70" y="58" width="620" height="404" rx="34"></rect>
          ${labels.items.map((item, index) => {
            const x = 132 + (index % 4) * 166
            const y = 146 + Math.floor(index / 4) * 150
            return `<g><rect class="stack-node" x="${x - 58}" y="${y - 42}" width="116" height="84" rx="18"></rect><text class="node-label" x="${x}" y="${y + 5}">${item}</text></g>`
          }).join('')}
          <path class="flow-line" d="M132 380 C244 292 334 424 456 318 C548 238 612 260 650 156"></path>
        </svg>
      </div>
    </section>
  `
}

const diagramLabels = {
  'focus-framework': { title: 'Focus Space Framework', items: ['Task', 'Quiet', 'Air', 'Desk', 'View', 'Reset', 'Boundary'] },
  'room-stack': { title: 'Room Optimization Stack', items: ['Light', 'Sound', 'Air', 'Temp', 'Material', 'Nature', 'Ritual'] },
  'sleep-factors': { title: 'Sleep Environment Factors', items: ['Dark', 'Quiet', 'Cool', 'Air', 'Soft', 'Ritual', 'Wake'] },
  'recovery-framework': { title: 'Recovery Space Framework', items: ['Privacy', 'Low Light', 'Texture', 'Sound', 'Air', 'Return', 'Still'] },
  'nature-ladder': { title: 'Nature Exposure Ladder', items: ['Image', 'View', 'Plant', 'Material', 'Garden', 'Outside', 'Season'] },
  'studio-method': { title: 'Studio Method', items: ['Observe', 'Tune', 'Layer', 'Stabilize', 'Refine'] },
}

function Schema(page: PublicPage) {
  const json = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', name: 'SANCTUM Studio', url: 'https://sanctumstudio.io' },
      { '@type': 'WebSite', name: 'SANCTUM Studio', url: 'https://sanctumstudio.io' },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sanctumstudio.io/' }, { '@type': 'ListItem', position: 2, name: page.h1, item: page.canonical }] },
      { '@type': 'Article', headline: page.h1, description: page.description, dateModified: '2026-05-31' },
      { '@type': 'FAQPage', mainEntity: page.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
      { '@type': 'HowTo', name: `Review ${page.h1}`, step: page.checklist.map((item) => ({ '@type': 'HowToStep', text: item })) },
    ],
  }
  return `<script type="application/ld+json">${JSON.stringify(json)}</script>`
}

function setMeta(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.name = name
    document.head.appendChild(tag)
  }
  tag.content = content
}

function setMetaProperty(property: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.content = content
}

function setLink(rel: string, href: string) {
  let tag = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.rel = rel
    document.head.appendChild(tag)
  }
  tag.href = href
}

export function pageForPath(pathname: string) {
  const normalized = pathname.replace(/\/$/, '') || '/'
  return pages.find((page) => page.path === normalized) ?? pages[0]
}
