import { methodSteps, sanctuaries, type PublicPage } from './siteContent'
import { OriginalStudioRoomVisual } from './originalVisuals'
import { seoEntries } from './seoLibrary'

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
          ${LinkPanel('Professional Frameworks', 'Studio-ready frameworks that translate sanctuary design into client-ready design work.', '/professional-frameworks', 'Bridge')}
          ${LinkPanel('Room Archetypes', 'Sleep, focus, recovery, creative, and nature sanctuaries as premium room patterns.', '/room-archetypes', 'Archetypes')}
          ${LinkPanel('Case Studies', 'Public design narratives that show spatial transformation without implementation methods.', '/case-studies', 'Studies')}
        </div>
      </section>
      <section class="cinema-section library-section">
        <div>
          <p class="kicker">Sanctuary Stories</p>
          <h2>Public room stories for sleep, focus, recovery, creativity, nature, and daily ritual.</h2>
        </div>
        <div class="library-grid">
          ${LinkPanel('Room Stories', 'Narratives that show how rooms shift through light, sound, air, material, and ritual.', '/room-stories', 'Stories')}
          ${LinkPanel('Studio Field Guides', 'Practical public guides for tuning rooms one layer at a time.', '/guides', 'Guides')}
          ${LinkPanel('Studio Briefs', 'Public briefs for partners, projects, and premium room systems.', '/studio-briefs', 'Briefs')}
        </div>
      </section>
      <section class="cinema-section library-section">
        <div>
          <p class="kicker">Before / After Narrative</p>
          <h2>Room archetypes become easier to act on when the story is clear.</h2>
        </div>
        <div class="library-grid">
          ${LinkPanel('Room Archetypes', 'Sleep, focus, recovery, creative, and nature sanctuaries as premium room patterns.', '/room-archetypes', 'Archetypes')}
          ${LinkPanel('Partner Preview', 'A public preview for aligned design and operator conversations.', '/partner-preview', 'Partner')}
          ${LinkPanel('Investor Preview', 'A public category preview for strategic readers.', '/investor-preview', 'Preview')}
        </div>
      </section>
      <section class="cinema-section library-section">
        <div>
          <p class="kicker">Sanctuary Guides</p>
          <h2>Existing guide content, visible from the home page.</h2>
        </div>
        <div class="dense-link-grid">${seoEntries.filter((entry) => entry.collection === 'guides').map((entry) => LinkPanel(entry.title, entry.description, `/articles/${entry.slug}`, entry.category)).join('')}</div>
      </section>
      <section class="cinema-section library-section">
        <div>
          <p class="kicker">Room Stories</p>
          <h2>Narratives for sleep, focus, recovery, creativity, nature, and ritual.</h2>
        </div>
        <div class="dense-link-grid">${seoEntries.filter((entry) => entry.collection === 'room-stories' || entry.collection === 'stories').map((entry) => LinkPanel(entry.title, entry.description, `/articles/${entry.slug}`, 'Room Story')).join('')}</div>
      </section>
      <section class="cinema-section library-section">
        <div>
          <p class="kicker">Studio Briefs</p>
          <h2>Briefs for clients, partners, strategic readers, and room systems.</h2>
        </div>
        <div class="dense-link-grid">
          ${seoEntries.filter((entry) => entry.collection === 'studio-briefs').map((entry) => LinkPanel(entry.title, entry.description, `/articles/${entry.slug}`, 'Studio Brief')).join('')}
          ${LinkPanel('Partner Preview', 'A public preview for aligned design and operator conversations.', '/partner-preview', 'Partner Preview')}
          ${LinkPanel('Investor Preview', 'A public category preview for strategic readers.', '/investor-preview', 'Investor Preview')}
          ${LinkPanel('Room Archetypes', 'Sleep, focus, recovery, creative, and nature sanctuaries as premium room patterns.', '/room-archetypes', 'Archetypes')}
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
      ${page.seoCollectionItems?.length ? CollectionItemsSection(page) : ''}
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
      ${SeoArticleSection(page)}
      ${page.seoCollectionItems?.length ? '' : CollectionItemsSection(page)}
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
        ${OriginalStudioRoomVisual('hero-visual')}
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
  return `<section class="cinema-section faq-section"><p class="kicker">FAQ</p><h2>Questions before changing the room.</h2><div class="faq-list">${items.map((item) => `<details open><summary>${item.question}</summary><p>${item.answer}</p><p>Why it matters: a room works better when the design starts with the state it should support, not with a shopping list or visual theme.</p><p>Practical example: observe the room at the time it matters most, then tune one layer such as light, sound, air, material, nature, or ritual before adding more.</p><p>Related reading: continue with <a href="/guides">Studio guides</a>, <a href="/room-stories">room stories</a>, and <a href="/room-archetypes">room archetypes</a>.</p></details>`).join('')}</div></section>`
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

function SeoArticleSection(page: PublicPage) {
  if (!page.seoBody) return ''

  return `
    <section class="cinema-section article-section">
      <div class="section-head">
        <p class="kicker">${page.seoCategory ?? 'Studio Library'}</p>
        <h2>${page.h1}</h2>
        ${page.seoAudience ? `<p>Audience: ${page.seoAudience}</p>` : ''}
      </div>
      <div class="article-body">${page.seoBody.map((paragraph) => `<p>${paragraph}</p>`).join('')}</div>
      ${page.seoDisclaimer ? `<div class="disclaimer"><strong>Disclaimer</strong><p>${page.seoDisclaimer}</p></div>` : ''}
    </section>
  `
}

function CollectionItemsSection(page: PublicPage) {
  if (!page.seoCollectionItems?.length) return ''

  return `
    <section class="cinema-section">
      <div class="section-head">
        <p class="kicker">Collection Index</p>
        <h2>${page.h1} entries.</h2>
      </div>
      <div class="sanctuary-grid">${page.seoCollectionItems.map((item) => LinkPanel(item.label, item.text, item.href, 'Library Entry')).join('')}</div>
    </section>
  `
}

export function PublicDiagram(_kind: PublicPage['diagram'], className = '') {
  return OriginalStudioRoomVisual(className)
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
      ...(page.seoCollectionItems ? [
        { '@type': 'CollectionPage', name: page.h1, description: page.description, url: page.canonical },
        { '@type': 'ItemList', name: `${page.h1} entries`, itemListElement: page.seoCollectionItems.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, url: `${page.canonical.replace(/\/[^/]*$/, '')}${item.href}` })) },
      ] : []),
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
