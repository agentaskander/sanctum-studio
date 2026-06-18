import { methodSteps, sanctuaries, type PublicPage } from './siteContent'
import { OriginalStudioRoomVisual } from './originalVisuals'
import { seoEntries, studioGuideHubs } from './seoLibrary'

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
  if (page.path === '/karaoke-hero') {
    return KaraokeHeroPublicPage(page)
  }

  return page.path === '/' ? HomePage(page) : PillarPage(page)
}

export function bindPublicPage(page: PublicPage) {
  if (page.path !== '/karaoke-hero') return
  bindKaraokeHeroDemo()
}

type HeroPreset = {
  label: string
  controls: Record<string, number>
}

function bindKaraokeHeroDemo() {
  const root = document.querySelector<HTMLElement>('[data-hero-demo]')
  if (!root) return

  const presets: Record<string, HeroPreset> = {
    home: { label: 'Home karaoke', controls: { volume: 72, echo: 58, bass: 48, treble: 46, mic: 62, balance: 64 } },
    church: { label: 'Church', controls: { volume: 55, echo: 42, bass: 34, treble: 36, mic: 48, balance: 42 } },
    barangay: { label: 'Barangay event', controls: { volume: 86, echo: 54, bass: 66, treble: 62, mic: 58, balance: 68 } },
    wedding: { label: 'Wedding DJ', controls: { volume: 68, echo: 36, bass: 44, treble: 52, mic: 46, balance: 58 } },
    school: { label: 'School program', controls: { volume: 61, echo: 38, bass: 36, treble: 42, mic: 68, balance: 52 } },
  }

  let selectedVenue = 'home'
  let timer: number | undefined
  let countdown = 10

  const controls = Array.from(root.querySelectorAll<HTMLInputElement>('[data-control]'))
  const venueButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-venue]'))
  const runButton = root.querySelector<HTMLButtonElement>('[data-run-diagnostic]')
  const progress = root.querySelector<HTMLElement>('[data-progress]')
  const countdownLabel = root.querySelector<HTMLElement>('[data-countdown]')

  const setText = (selector: string, value: string) => {
    const node = root.querySelector<HTMLElement>(selector)
    if (node) node.textContent = value
  }
  const currentValues = () => Object.fromEntries(controls.map((control) => [control.dataset.control ?? '', Number(control.value)]))
  const clampScore = (value: number) => Math.max(0, Math.min(100, Math.round(value)))
  const scoreLabel = (score: number) => score >= 82 ? 'Strong' : score >= 68 ? 'Usable' : score >= 52 ? 'Needs tuning' : 'Problem'
  const riskLabel = (score: number) => score >= 76 ? 'Critical' : score >= 58 ? 'High' : score >= 36 ? 'Watch' : 'Low'

  const issueList = () => {
    const current = currentValues()
    const micTooFar = Math.max(0, current.mic - 55)
    const micTooClose = Math.max(0, 30 - current.mic)
    return [
      {
        label: 'Volume too high',
        severity: current.volume,
        primary: 'Lower master volume 10-15%.',
        why: 'High master volume raises feedback risk and makes neighbors hear harshness before clarity.',
        backups: ['Lower the music bed under vocals.', 'Aim speakers away from reflective walls.'],
      },
      {
        label: 'Echo too high',
        severity: current.echo,
        primary: 'Reduce echo before increasing volume.',
        why: 'Too much echo smears words, so singers sound buried even when the system is loud.',
        backups: ['Use less reverb on speech.', 'Keep the mic closer to the singer.'],
      },
      {
        label: 'Bass mud',
        severity: current.bass,
        primary: 'Cut bass mud and move speakers away from corners.',
        why: 'Boomy low end masks the vocal range and makes the room feel louder than it is.',
        backups: ['Raise the speaker if it is on the floor.', 'Lower music bass before raising vocals.'],
      },
      {
        label: 'Treble harshness',
        severity: current.treble,
        primary: 'Reduce treble or presence a little.',
        why: 'Harsh treble makes microphones more piercing and increases feedback risk.',
        backups: ['Move the mic behind the speaker line.', 'Reduce echo after reducing treble.'],
      },
      {
        label: 'Mic too far',
        severity: micTooFar * 1.6,
        primary: 'Bring the mic closer to the singer.',
        why: 'A far mic captures more room noise, so vocals disappear behind the music.',
        backups: ['Lower the music bed.', 'Keep the singer one fist from the mic.'],
      },
      {
        label: 'Mic too close',
        severity: micTooClose * 1.8,
        primary: 'Move the mic slightly farther from the mouth.',
        why: 'A very close mic can overload, distort, and trigger sudden feedback.',
        backups: ['Lower mic gain.', 'Keep the singer behind the speaker line.'],
      },
      {
        label: 'Vocals buried',
        severity: current.balance,
        primary: 'Lower the music bed under the vocal.',
        why: 'When the track overpowers the mic, turning up everything makes the room louder but not clearer.',
        backups: ['Bring the mic closer.', 'Reduce echo so words stay intelligible.'],
      },
    ].sort((a, b) => b.severity - a.severity)
  }

  const scores = () => {
    const current = currentValues()
    const issues = issueList()
    const risk = clampScore(current.volume * 0.26 + current.echo * 0.16 + current.treble * 0.26 + Math.max(0, 35 - current.mic) * 0.45 + current.balance * 0.08)
    const clarity = clampScore(104 - current.echo * 0.24 - current.bass * 0.18 - current.treble * 0.12 - Math.abs(current.mic - 42) * 0.28 - current.balance * 0.18)
    const neighbor = clampScore(108 - current.volume * 0.42 - current.bass * 0.18 - current.treble * 0.1 - risk * 0.15)
    const rescue = clampScore((clarity * 0.42) + (neighbor * 0.28) + ((100 - risk) * 0.3))
    return { rescue, neighbor, clarity, risk, top: issues[0], issues }
  }

  const render = () => {
    const result = scores()
    for (const control of controls) {
      const output = root.querySelector<HTMLOutputElement>(`[data-output="${control.dataset.control}"]`)
      if (output) output.textContent = control.value
    }
    setText('[data-score="rescue"]', String(result.rescue))
    setText('[data-score="neighbor"]', String(result.neighbor))
    setText('[data-score="clarity"]', String(result.clarity))
    setText('[data-score="risk"]', String(result.risk))
    setText('[data-score-label="rescue"]', scoreLabel(result.rescue))
    setText('[data-score-label="neighbor"]', scoreLabel(result.neighbor))
    setText('[data-score-label="clarity"]', scoreLabel(result.clarity))
    setText('[data-score-label="risk"]', riskLabel(result.risk))
    setText('[data-fix-primary]', result.top.primary)
    setText('[data-fix-why]', result.top.why)
    const backups = root.querySelector<HTMLElement>('[data-fix-backups]')
    if (backups) backups.innerHTML = result.top.backups.map((fix) => `<li>${fix}</li>`).join('')
    venueButtons.forEach((button) => button.classList.toggle('active', button.dataset.venue === selectedVenue))
  }

  const applyPreset = (id: string) => {
    selectedVenue = id
    const preset = presets[id]
    if (!preset) return
    controls.forEach((control) => {
      const key = control.dataset.control ?? ''
      if (typeof preset.controls[key] === 'number') control.value = String(preset.controls[key])
    })
    if (countdownLabel) countdownLabel.textContent = `${preset.label} preset loaded. Ready to run.`
    render()
  }

  const finishDiagnostic = () => {
    const result = scores()
    const report = root.querySelector<HTMLElement>('[data-report]')
    const venue = presets[selectedVenue]?.label ?? 'Selected venue'
    if (report) report.hidden = false
    setText('[data-report-score]', `${result.rescue}/100`)
    setText('[data-report-problem]', result.top.label)
    const fixes = root.querySelector<HTMLElement>('[data-report-fixes]')
    if (fixes) fixes.innerHTML = result.issues.slice(0, 5).map((item) => `<li>${item.primary}</li>`).join('')
    const share = root.querySelector<HTMLTextAreaElement>('[data-share-text]')
    if (share) share.value = `Karaoke Hero demo: ${venue} scored ${result.rescue}/100. Top fix: ${result.top.primary} Public demo mode - simulated guidance only.`
    if (countdownLabel) countdownLabel.textContent = 'Diagnostic simulation complete.'
    if (runButton) runButton.disabled = false
  }

  venueButtons.forEach((button) => button.addEventListener('click', () => applyPreset(button.dataset.venue ?? 'home')))
  controls.forEach((control) => control.addEventListener('input', render))
  runButton?.addEventListener('click', () => {
    if (timer) window.clearInterval(timer)
    countdown = 10
    runButton.disabled = true
    const report = root.querySelector<HTMLElement>('[data-report]')
    if (report) report.hidden = true
    if (progress) progress.style.width = '0%'
    if (countdownLabel) countdownLabel.textContent = 'Running diagnostic simulation: 10 seconds left.'
    timer = window.setInterval(() => {
      countdown -= 1
      if (progress) progress.style.width = `${((10 - countdown) / 10) * 100}%`
      if (countdownLabel) countdownLabel.textContent = countdown > 0 ? `Running diagnostic simulation: ${countdown} seconds left.` : 'Generating report card...'
      if (countdown <= 0) {
        window.clearInterval(timer)
        timer = undefined
        finishDiagnostic()
      }
    }, 1000)
  })

  applyPreset(selectedVenue)
}

function KaraokeHeroPublicPage(page: PublicPage) {
  const steps = [
    ['01', 'Pick venue', 'Choose the room or event context so the check starts with the right goal.'],
    ['02', 'Set the room', 'Adjust volume, echo, bass, treble, mic distance, and music balance.'],
    ['03', 'Run quick check', 'Generate a simulated 10-second report card for the current setup.'],
    ['04', 'Apply top fix', 'Make one practical change before turning everything louder.'],
  ]
  const useCases = [
    ['home', 'Home karaoke', 'Living room karaoke with echo, loud music, and singers fighting the mic.'],
    ['church', 'Church', 'Speech and worship clarity where feedback can interrupt the room.'],
    ['barangay', 'Barangay event', 'Announcements and karaoke that need reach without destructive volume.'],
    ['wedding', 'Wedding DJ', 'Host mic, speeches, vows, and event moments that cannot fail loudly.'],
    ['school', 'School program', 'Student speech clarity, safe volume, and fast setup for busy staff.'],
  ]
  const controls = [
    ['volume', 'Volume', '72'],
    ['echo', 'Echo / Reverb', '58'],
    ['bass', 'Bass Mud', '48'],
    ['treble', 'Treble Harshness', '46'],
    ['mic', 'Mic Distance', '62'],
    ['balance', 'Music vs Vocal Balance', '64'],
  ]

  return `
    <header class="public-hero hero-beta-hero">
      ${PublicNav()}
      <div class="hero-beta-grid">
        <div class="hero-copy">
          <p class="eyebrow">Hero Beta | Powered by SANCTUM</p>
          <h1>${page.h1}</h1>
          <p class="lede">Karaoke Hero is a lightweight prototype that helps a host or venue operator find feedback, muddy sound, buried vocals, and volume problems before the room gets louder.</p>
          <div class="hero-actions">
            <a class="primary-link" href="#hero-check">Start Hero Check</a>
            <a class="secondary-link" href="#hero-demo">Open demo</a>
          </div>
        </div>
        <aside class="hero-beta-panel" aria-label="Karaoke Hero beta notice">
          <span>Public demo mode</span>
          <h2>Simulated guidance only. No audio is uploaded or recorded.</h2>
          <p>This public page does not use the internal Karaoke Hero module. It is a safe validation demo powered by SANCTUM.</p>
        </aside>
      </div>
    </header>
    <main>
      <section id="how-it-works" class="cinema-section hero-beta-section">
        <div class="section-head">
          <p class="kicker">How It Works</p>
          <h2>One quick sound check before raising the volume.</h2>
        </div>
        <div class="hero-beta-step-grid">
          ${steps.map(([number, title, text]) => `<article class="hero-beta-card"><span>${number}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}
        </div>
      </section>
      <section id="hero-demo" class="cinema-section hero-beta-section hero-demo-shell" data-hero-demo>
        <div class="section-head">
          <p class="kicker">Interactive Public Demo</p>
          <h2>Simulate a karaoke rescue check.</h2>
          <p>Pick a venue, move the controls, and watch the score dashboard and Fix Coach update. This demo is deterministic and does not require microphone access.</p>
        </div>
        <div class="hero-score-grid" aria-label="Live score dashboard">
          <article class="hero-score-card"><span>Karaoke Rescue Score</span><strong data-score="rescue">--</strong><p data-score-label="rescue">Ready</p></article>
          <article class="hero-score-card"><span>Neighbor Friendly</span><strong data-score="neighbor">--</strong><p data-score-label="neighbor">Ready</p></article>
          <article class="hero-score-card"><span>Vocal Clarity</span><strong data-score="clarity">--</strong><p data-score-label="clarity">Ready</p></article>
          <article class="hero-score-card risk"><span>Feedback Risk</span><strong data-score="risk">--</strong><p data-score-label="risk">Ready</p></article>
        </div>
        <div class="hero-demo-grid">
          <section class="hero-demo-panel">
            <div class="hero-demo-panel-head">
              <p class="kicker">Pick Venue</p>
              <h3>Use case cards</h3>
            </div>
            <div class="hero-venue-grid">
              ${useCases.map(([id, title, text]) => `<button class="hero-venue-card" type="button" data-venue="${id}"><strong>${title}</strong><span>${text}</span></button>`).join('')}
            </div>
          </section>
          <section class="hero-demo-panel">
            <div class="hero-demo-panel-head">
              <p class="kicker">Simulated Controls</p>
              <h3>Room settings</h3>
            </div>
            <div class="hero-control-list">
              ${controls.map(([id, label, value]) => `
                <label class="hero-range">
                  <span><strong>${label}</strong><output data-output="${id}">${value}</output></span>
                  <input type="range" min="0" max="100" value="${value}" data-control="${id}" />
                </label>
              `).join('')}
            </div>
          </section>
          <section class="hero-demo-panel hero-fix-coach">
            <div class="hero-demo-panel-head">
              <p class="kicker">Fix Coach</p>
              <h3>Do this first</h3>
            </div>
            <strong data-fix-primary>Pick a venue to begin.</strong>
            <p data-fix-why>The coach prioritizes one action from the current simulated setup.</p>
            <ul data-fix-backups></ul>
          </section>
          <section class="hero-demo-panel hero-diagnostic-panel" id="hero-check">
            <div class="hero-demo-panel-head">
              <p class="kicker">10-Second Diagnostic Simulation</p>
              <h3>No real mic required</h3>
            </div>
            <p>Run a simulated local check and generate a report card for the selected venue and controls.</p>
            <div class="hero-progress" aria-label="Diagnostic progress"><span data-progress></span></div>
            <p class="hero-countdown" data-countdown>Ready to run.</p>
            <button class="primary-link hero-run-button" type="button" data-run-diagnostic>Run 10-Second Diagnostic</button>
          </section>
        </div>
        <section class="hero-report-card" data-report hidden>
          <div>
            <p class="kicker">Report Card</p>
            <h2>Hero Check Result</h2>
          </div>
          <div class="hero-report-grid">
            <article><span>Overall Score</span><strong data-report-score>--</strong></article>
            <article><span>Top Problem</span><strong data-report-problem>--</strong></article>
          </div>
          <div class="hero-report-columns">
            <div>
              <h3>Top 5 fixes</h3>
              <ol data-report-fixes></ol>
            </div>
            <div>
              <h3>Share text</h3>
              <textarea readonly data-share-text></textarea>
            </div>
          </div>
        </section>
      </section>
      <section class="cinema-section hero-beta-section hero-beta-light">
        <div class="section-head">
          <p class="kicker">Use Cases</p>
          <h2>Built for everyday karaoke and community sound checks.</h2>
        </div>
        <div class="hero-beta-use-grid">
          ${useCases.map(([, item, text]) => `<article class="hero-beta-use"><h3>${item}</h3><p>${text}</p></article>`).join('')}
        </div>
      </section>
      <section class="cinema-section hero-beta-section">
        <div class="hero-beta-check">
          <div>
            <p class="kicker">Start Hero Check</p>
            <h2>Public beta path.</h2>
            <p>This public page is a validation entry point. The production-safe check uses simulated controls, a quick read, and one top fix.</p>
          </div>
          <ol>
            <li>Pick the venue: home, church, barangay, wedding, or school.</li>
            <li>Adjust the room controls.</li>
            <li>Run the simulated quick check in the browser.</li>
            <li>Apply one fix before increasing volume.</li>
          </ol>
        </div>
      </section>
      <section class="cinema-section hero-beta-section hero-beta-privacy">
        <div class="hero-beta-note">
          <h2>Public demo mode.</h2>
          <p>Simulated guidance only. Karaoke Hero is not a certified acoustic measurement system.</p>
        </div>
        <div class="hero-beta-note">
          <h2>Privacy note.</h2>
          <p>No audio is uploaded or recorded. This public demo does not store reports, collect emails, or send setup data to a backend.</p>
        </div>
      </section>
      ${CTA('Make karaoke clearer first.', 'Try the public Hero beta flow before turning the room louder.', '#hero-check', 'Start Hero Check')}
      ${Footer()}
      ${Schema(page)}
    </main>
  `
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
      <section class="cinema-section library-section">
        <div>
          <p class="kicker">Room Optimization Layers</p>
          <h2>Each visual node opens a full Studio guide hub.</h2>
        </div>
        <div class="room-layer-grid">${studioGuideHubs.map((hub) => RoomLayerCard(hub)).join('')}</div>
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
      ${PublicNav()}
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

function PublicNav() {
  return `
    <nav class="public-nav" aria-label="Primary navigation">
      <a class="brand" href="/"><span>S</span>SANCTUM Studio</a>
      <div>
        <a href="/sleep-room-design">Sanctuaries</a>
        <a href="/guides">Method</a>
        <a href="/professional-frameworks">Professional</a>
        <a href="/guides">Guides</a>
        <a href="/tools">Tools</a>
        <a href="/karaoke-hero">Hero</a>
        <a href="/about">About</a>
      </div>
    </nav>
  `
}

function LinkPanel(title: string, text: string, href: string, eyebrow: string) {
  return `<a class="surface-card link-panel" href="${href}"><span>${eyebrow}</span><h3>${title}</h3><p>${text}</p></a>`
}

function RoomLayerCard(hub: (typeof studioGuideHubs)[number]) {
  return `
    <a class="surface-card link-panel room-layer-card" href="/guides/${hub.slug}">
      <span>Room Layer</span>
      <h3>${hub.title.replace(' Guide', '')}</h3>
      <p>${hub.definition}</p>
      <dl>
        <div><dt>Observe</dt><dd>${hub.examples[0]}</dd></div>
        <div><dt>Tune</dt><dd>${hub.principles[0]}</dd></div>
      </dl>
      <strong>Open guide hub</strong>
    </a>
  `
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
