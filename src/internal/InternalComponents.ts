type InternalRoute = {
  path: string
  eyebrow: string
  title: string
  intro: string
  panels: { title: string; text: string }[]
}

const routes: InternalRoute[] = [
  {
    path: '/internal',
    eyebrow: 'Internal Studio Console',
    title: 'Technology for Human Systems',
    intro: 'The old light Studio UI restored as development-only internal routes for ecosystem, ontology, service status, and human-systems coordination.',
    panels: [
      { title: 'SynkOS', text: 'Identity, workflows, experiences, and personal system coordination.' },
      { title: 'NarrativeIQ', text: 'Structured sessions for story, identity, and decision clarity.' },
      { title: 'FlowSync', text: 'Movement patterns, body systems, progress, and adaptive routines.' },
      { title: 'Sanctum Protocol', text: 'Environmental intelligence and ontology-driven calibration for human environments.' },
    ],
  },
  {
    path: '/internal/ecosystem',
    eyebrow: 'Ecosystem',
    title: 'Connected portfolio map.',
    intro: 'A calm coordination layer for development applications, future ontologies, and intelligence surfaces.',
    panels: [
      { title: 'CraftSure', text: 'Verification, project assurance, workflow governance, and field trust.' },
      { title: 'PipeFlow', text: 'Infrastructure workflows for skilled trades and operational execution.' },
      { title: 'ClearField', text: 'Land, home, clarity, and environmental stewardship intelligence.' },
      { title: 'Clover Ecosystem', text: 'Market intelligence and financial workflow surfaces.' },
    ],
  },
  {
    path: '/internal/ontology',
    eyebrow: 'Ontology',
    title: 'Structured intelligence for identity, meaning, movement, and coordination.',
    intro: 'Studio internal ontology views organize human-system context into relationships, workflows, symbols, time, behavior, movement, and coordination.',
    panels: ['Identities', 'Relationships', 'Workflows', 'Symbols', 'Time', 'Behavior', 'Movement', 'Coordination'].map((title) => ({
      title,
      text: `${title} remains an internal coordination surface inside the Studio app route namespace.`,
    })),
  },
  {
    path: '/internal/status',
    eyebrow: 'Development Status',
    title: 'Service Status',
    intro: 'Development service launch references remain internal and are not linked from the public Studio site.',
    panels: [
      { title: 'SynkOS', text: 'Development coordination surface.' },
      { title: 'NarrativeIQ', text: 'Development narrative session surface.' },
      { title: 'FlowSync', text: 'Development movement intelligence surface.' },
      { title: 'CraftSure', text: 'Development operational trust surface.' },
    ],
  },
]

export function InternalPageShell(pathname: string) {
  const normalized = pathname.replace(/\/$/, '') || '/internal'
  const route = routes.find((item) => item.path === normalized) ?? routes[0]

  return `
    <header class="public-hero internal-hero">
      <nav class="public-nav" aria-label="Internal navigation">
        <a class="brand" href="/internal"><span>S</span>SANCTUM Studio</a>
        <div>
          <a href="/internal">Home</a>
          <a href="/internal/ecosystem">Ecosystem</a>
          <a href="/internal/ontology">Ontology</a>
          <a href="/internal/status">Status</a>
        </div>
      </nav>
      <section class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">${route.eyebrow}</p>
          <h1>${route.title}</h1>
          <p class="lede">${route.intro}</p>
          <div class="hero-actions">
            <a class="primary-link" href="/internal/ecosystem">Open Ecosystem</a>
            <a class="secondary-link" href="/internal/ontology">View Ontology</a>
          </div>
        </div>
        <section class="diagram-wrap hero-visual">
          <div class="module-grid internal-module-grid">${route.panels.map((panel) => `<span>${panel.title}</span>`).join('')}</div>
        </section>
      </section>
    </header>
    <main>
      <section class="cinema-section">
        <div class="section-head">
          <p class="kicker">Internal Route</p>
          <h2>${route.title}</h2>
        </div>
        <div class="sanctuary-grid">${route.panels.map((panel) => `<article class="surface-card"><span>${route.eyebrow}</span><h3>${panel.title}</h3><p>${panel.text}</p></article>`).join('')}</div>
      </section>
      <footer class="footer"><div><strong>SANCTUM Studio</strong><span>Internal route namespace only. Not a separate app folder.</span></div><a href="/">Public site</a></footer>
    </main>
  `
}

export function NotFoundPage() {
  return `
    <main>
      <section class="public-hero internal-hero">
        <div class="hero-copy">
          <p class="eyebrow">404</p>
          <h1>Not Found</h1>
          <p class="lede">This route is not available on the public host.</p>
          <a class="primary-link" href="/">Return home</a>
        </div>
      </section>
    </main>
  `
}
