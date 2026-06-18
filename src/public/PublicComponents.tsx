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
  if (page.path !== '/karaoke-hero') {
    karaokeHeroCleanup?.()
    karaokeHeroCleanup = undefined
    return
  }
  bindKaraokeHeroDemo()
}

type HeroPreset = {
  label: string
  controls: Record<string, number>
}

type HeroIssue = {
  label: string
  severity: number
  primary: string
  why: string
  backups: string[]
}

type HeroBand = {
  id: string
  label: string
  range: string
  low: number
  high: number
}

type HeroSample = {
  level: number
  risk: number
  clarity: number
  neighbor: number
  bands: Record<string, number>
}

let karaokeHeroCleanup: (() => void) | undefined

function bindKaraokeHeroDemo() {
  const root = document.querySelector<HTMLElement>('[data-hero-demo]')
  if (!root) return
  karaokeHeroCleanup?.()
  root.dataset.bound = 'true'

  const presets: Record<string, HeroPreset> = {
    home: { label: 'Home karaoke', controls: { volume: 72, echo: 58, bass: 48, treble: 46, mic: 62, balance: 64 } },
    church: { label: 'Church', controls: { volume: 55, echo: 42, bass: 34, treble: 36, mic: 48, balance: 42 } },
    barangay: { label: 'Barangay event', controls: { volume: 86, echo: 54, bass: 66, treble: 62, mic: 58, balance: 68 } },
    wedding: { label: 'Wedding DJ', controls: { volume: 68, echo: 36, bass: 44, treble: 52, mic: 46, balance: 58 } },
    school: { label: 'School program', controls: { volume: 61, echo: 38, bass: 36, treble: 42, mic: 68, balance: 52 } },
  }

  const bands: HeroBand[] = [
    { id: 'bass', label: 'Bass mud', range: '80-250 Hz', low: 80, high: 250 },
    { id: 'lowMids', label: 'Low mids', range: '250-500 Hz', low: 250, high: 500 },
    { id: 'body', label: 'Vocal body', range: '500 Hz-1.5 kHz', low: 500, high: 1500 },
    { id: 'presence', label: 'Presence', range: '1.5-4 kHz', low: 1500, high: 4000 },
    { id: 'harsh', label: 'Harsh / feedback', range: '4-8 kHz', low: 4000, high: 8000 },
    { id: 'air', label: 'Air / hiss', range: '8-12 kHz', low: 8000, high: 12000 },
  ]

  let selectedVenue = 'home'
  let timer: number | undefined
  let countdown = 10
  let stream: MediaStream | undefined
  let audioContext: AudioContext | undefined
  let analyser: AnalyserNode | undefined
  let source: MediaStreamAudioSourceNode | undefined
  let frequencyData: Uint8Array<ArrayBuffer> | undefined
  let timeData: Uint8Array<ArrayBuffer> | undefined
  let animationFrame: number | undefined
  let micStatus: 'stopped' | 'waiting' | 'listening' | 'denied' | 'error' = 'stopped'
  let liveLevel = 0
  let liveBands: Record<string, number> = Object.fromEntries(bands.map((band) => [band.id, 0]))
  let liveRisk = 0
  let diagnosticSamples: HeroSample[] = []
  let diagnosticRunning = false

  const controls = Array.from(root.querySelectorAll<HTMLInputElement>('[data-control]'))
  const venueButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-venue]'))
  const runButton = root.querySelector<HTMLButtonElement>('[data-run-diagnostic]')
  const enableMicButton = root.querySelector<HTMLButtonElement>('[data-enable-mic]')
  const stopMicButton = root.querySelector<HTMLButtonElement>('[data-stop-mic]')
  const progress = root.querySelector<HTMLElement>('[data-progress]')
  const countdownLabel = root.querySelector<HTMLElement>('[data-countdown]')
  const spectrumGrid = root.querySelector<HTMLElement>('[data-spectrum-grid]')

  const setText = (selector: string, value: string) => {
    const node = root.querySelector<HTMLElement>(selector)
    if (node) node.textContent = value
  }
  const currentValues = () => Object.fromEntries(controls.map((control) => [control.dataset.control ?? '', Number(control.value)]))
  const clampScore = (value: number) => Math.max(0, Math.min(100, Math.round(value)))
  const average = (values: number[]) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0
  const scoreLabel = (score: number) => score >= 82 ? 'Strong' : score >= 68 ? 'Usable' : score >= 52 ? 'Needs tuning' : 'Problem'
  const riskLabel = (score: number) => score >= 76 ? 'Critical' : score >= 58 ? 'High' : score >= 36 ? 'Watch' : 'Low'
  const signalLabel = (level: number) => level < 6 ? 'silent' : level < 22 ? 'low' : level < 78 ? 'good' : 'too loud'
  const bandStatus = (level: number) => level >= 76 ? 'hot' : level >= 52 ? 'active' : level >= 24 ? 'present' : 'quiet'

  const issueList = () => {
    const current = currentValues()
    const micTooFar = Math.max(0, current.mic - 55)
    const micTooClose = Math.max(0, 30 - current.mic)
    const liveMode = micStatus === 'listening'
    const bandHot = Math.max(liveBands.presence ?? 0, liveBands.harsh ?? 0)
    return [
      {
        label: 'Volume too high',
        severity: liveMode ? Math.max(current.volume * 0.65, liveLevel * 1.08) : current.volume,
        primary: liveMode && liveLevel > 78 ? 'Lower mic gain or master volume now.' : 'Lower master volume 10-15%.',
        why: liveMode ? 'The live mic level is running hot, so the room is closer to clipping and feedback.' : 'High master volume raises feedback risk and makes neighbors hear harshness before clarity.',
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
        severity: liveMode ? Math.max(current.bass, (liveBands.bass ?? 0) * 1.05) : current.bass,
        primary: 'Cut bass mud and move speakers away from corners.',
        why: liveMode ? 'The low-frequency band is strong enough to mask vocal body and make the room feel louder.' : 'Boomy low end masks the vocal range and makes the room feel louder than it is.',
        backups: ['Raise the speaker if it is on the floor.', 'Lower music bass before raising vocals.'],
      },
      {
        label: 'Treble harshness',
        severity: liveMode ? Math.max(current.treble, bandHot * 1.12, liveRisk) : current.treble,
        primary: liveRisk >= 58 ? 'Move the mic behind the speaker line and reduce treble/echo.' : 'Reduce treble or presence a little.',
        why: liveMode ? 'The live presence/harsh bands are the most likely feedback area right now.' : 'Harsh treble makes microphones more piercing and increases feedback risk.',
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
    ].sort((a, b) => b.severity - a.severity) as HeroIssue[]
  }

  const scores = () => {
    const current = currentValues()
    const issues = issueList()
    const liveMode = micStatus === 'listening'
    const livePresence = liveBands.presence ?? 0
    const liveHarsh = liveBands.harsh ?? 0
    const liveBass = liveBands.bass ?? 0
    const risk = liveMode
      ? clampScore(liveLevel * 0.42 + livePresence * 0.26 + liveHarsh * 0.38 + current.echo * 0.08 + current.treble * 0.12)
      : clampScore(current.volume * 0.26 + current.echo * 0.16 + current.treble * 0.26 + Math.max(0, 35 - current.mic) * 0.45 + current.balance * 0.08)
    liveRisk = risk
    const clarity = liveMode
      ? clampScore(104 - liveBass * 0.2 - liveHarsh * 0.16 - current.echo * 0.16 - current.balance * 0.1 + (liveBands.body ?? 0) * 0.08)
      : clampScore(104 - current.echo * 0.24 - current.bass * 0.18 - current.treble * 0.12 - Math.abs(current.mic - 42) * 0.28 - current.balance * 0.18)
    const neighbor = liveMode
      ? clampScore(108 - liveLevel * 0.44 - liveBass * 0.16 - liveHarsh * 0.12 - risk * 0.16)
      : clampScore(108 - current.volume * 0.42 - current.bass * 0.18 - current.treble * 0.1 - risk * 0.15)
    const rescue = clampScore((clarity * 0.42) + (neighbor * 0.28) + ((100 - risk) * 0.3))
    return { rescue, neighbor, clarity, risk, top: issues[0], issues }
  }

  const hottestBand = () => bands.reduce((best, band) => (liveBands[band.id] ?? 0) > (liveBands[best.id] ?? 0) ? band : best, bands[0])

  const renderSpectrum = () => {
    if (!spectrumGrid) return
    spectrumGrid.innerHTML = bands.map((band) => {
      const level = clampScore(liveBands[band.id] ?? 0)
      return `
        <article class="hero-spectrum-band">
          <div><strong>${band.label}</strong><span>${band.range}</span></div>
          <div class="hero-spectrum-meter"><span style="width: ${level}%"></span></div>
          <p>${level} · ${bandStatus(level)}</p>
        </article>
      `
    }).join('')
  }

  const renderMicStatus = () => {
    const clipping = liveLevel >= 88 || (micStatus === 'listening' && liveRisk >= 82)
    setText('[data-mic-status]', micStatus)
    setText('[data-mic-level]', String(clampScore(liveLevel)))
    setText('[data-signal-label]', signalLabel(liveLevel))
    setText('[data-clipping-warning]', clipping ? 'Clipping warning: input is too hot.' : 'No clipping warning.')
    setText('[data-mic-coach]', liveLevel < 12 ? 'Move closer or sing/speak toward the mic.' : liveLevel > 82 ? 'Move farther back or lower mic gain.' : 'Signal is usable for a live check.')
    setText('[data-risk-band]', micStatus === 'listening' ? hottestBand().label : 'Mic off')
    setText('[data-risk-action]', liveRisk >= 76 ? 'Lower mic gain, move speaker away from mic, and reduce treble/echo.' : liveRisk >= 45 ? 'Watch speaker position and reduce echo before raising volume.' : 'Keep the mic behind the speaker line.')
    const levelMeter = root.querySelector<HTMLElement>('[data-level-meter]')
    if (levelMeter) levelMeter.style.width = `${clampScore(liveLevel)}%`
    if (enableMicButton) enableMicButton.disabled = micStatus === 'waiting' || micStatus === 'listening'
    if (stopMicButton) stopMicButton.disabled = micStatus !== 'listening'
    renderSpectrum()
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
    setText('[data-coach-source]', micStatus === 'listening' ? 'Live mic + controls' : 'Simulated controls')
    venueButtons.forEach((button) => button.classList.toggle('active', button.dataset.venue === selectedVenue))
    renderMicStatus()
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
    diagnosticRunning = false
    const result = diagnosticSamples.length ? summarizeSamples() : scores()
    const report = root.querySelector<HTMLElement>('[data-report]')
    const venue = presets[selectedVenue]?.label ?? 'Selected venue'
    if (report) report.hidden = false
    setText('[data-report-score]', `${result.rescue}/100`)
    setText('[data-report-problem]', result.top.label)
    const fixes = root.querySelector<HTMLElement>('[data-report-fixes]')
    if (fixes) fixes.innerHTML = result.issues.slice(0, 5).map((item) => `<li>${item.primary}</li>`).join('')
    const share = root.querySelector<HTMLTextAreaElement>('[data-share-text]')
    if (share) share.value = `Karaoke Hero beta: ${venue} scored ${result.rescue}/100 from a browser-local mic check. Top fix: ${result.top.primary} No audio uploaded or saved.`
    if (countdownLabel) countdownLabel.textContent = 'Real mic diagnostic complete.'
    if (runButton) runButton.disabled = false
  }

  const summarizeSamples = () => {
    const avgLevel = average(diagnosticSamples.map((sample) => sample.level))
    const avgRisk = average(diagnosticSamples.map((sample) => sample.risk))
    const avgClarity = average(diagnosticSamples.map((sample) => sample.clarity))
    const avgNeighbor = average(diagnosticSamples.map((sample) => sample.neighbor))
    const bandAverages = Object.fromEntries(bands.map((band) => [band.id, average(diagnosticSamples.map((sample) => sample.bands[band.id] ?? 0))]))
    const priorBands = liveBands
    const priorLevel = liveLevel
    const priorRisk = liveRisk
    liveBands = bandAverages
    liveLevel = avgLevel
    liveRisk = avgRisk
    const result = scores()
    liveBands = priorBands
    liveLevel = priorLevel
    liveRisk = priorRisk
    return {
      ...result,
      rescue: clampScore((avgClarity * 0.44) + (avgNeighbor * 0.28) + ((100 - avgRisk) * 0.28)),
      clarity: clampScore(avgClarity),
      neighbor: clampScore(avgNeighbor),
      risk: clampScore(avgRisk),
    }
  }

  const bandLevel = (band: HeroBand) => {
    if (!analyser || !frequencyData || !audioContext) return 0
    const nyquist = audioContext.sampleRate / 2
    const start = Math.max(0, Math.floor((band.low / nyquist) * frequencyData.length))
    const end = Math.min(frequencyData.length - 1, Math.ceil((band.high / nyquist) * frequencyData.length))
    if (end <= start) return 0
    let total = 0
    for (let index = start; index <= end; index += 1) total += frequencyData[index]
    return clampScore((total / (end - start + 1)) / 255 * 100)
  }

  const readMicFrame = () => {
    if (!analyser || !frequencyData || !timeData) return
    analyser.getByteFrequencyData(frequencyData)
    analyser.getByteTimeDomainData(timeData)
    let sum = 0
    let peak = 0
    for (const value of timeData) {
      const centered = Math.abs(value - 128)
      sum += centered * centered
      peak = Math.max(peak, centered)
    }
    const rms = Math.sqrt(sum / timeData.length)
    liveLevel = clampScore(Math.max(rms * 1.65, peak * 0.78))
    liveBands = Object.fromEntries(bands.map((band) => [band.id, bandLevel(band)]))
    const result = scores()
    if (diagnosticRunning) {
      diagnosticSamples.push({
        level: liveLevel,
        risk: result.risk,
        clarity: result.clarity,
        neighbor: result.neighbor,
        bands: { ...liveBands },
      })
    }
    render()
    animationFrame = window.requestAnimationFrame(readMicFrame)
  }

  const stopMic = async (status: typeof micStatus = 'stopped') => {
    if (timer) window.clearInterval(timer)
    timer = undefined
    diagnosticRunning = false
    if (animationFrame) window.cancelAnimationFrame(animationFrame)
    animationFrame = undefined
    stream?.getTracks().forEach((track) => track.stop())
    stream = undefined
    source?.disconnect()
    source = undefined
    analyser?.disconnect()
    analyser = undefined
    if (audioContext && audioContext.state !== 'closed') await audioContext.close().catch(() => undefined)
    audioContext = undefined
    frequencyData = undefined
    timeData = undefined
    micStatus = status
    liveLevel = 0
    liveBands = Object.fromEntries(bands.map((band) => [band.id, 0]))
    if (runButton) runButton.disabled = false
    if (countdownLabel && status === 'stopped') countdownLabel.textContent = 'Mic stopped. Enable Mic Check to run a real diagnostic.'
    render()
  }

  const enableMic = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      micStatus = 'error'
      if (countdownLabel) countdownLabel.textContent = 'Microphone is not supported in this browser.'
      render()
      return
    }
    if (micStatus === 'listening' || micStatus === 'waiting') return
    micStatus = 'waiting'
    render()
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) throw new Error('AudioContext is not supported.')
      audioContext = new AudioContextClass()
      analyser = audioContext.createAnalyser()
      analyser.fftSize = 2048
      analyser.smoothingTimeConstant = 0.82
      source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)
      frequencyData = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>
      timeData = new Uint8Array(analyser.fftSize) as Uint8Array<ArrayBuffer>
      micStatus = 'listening'
      if (countdownLabel) countdownLabel.textContent = 'Mic listening. Run the 10-second real diagnostic when ready.'
      readMicFrame()
    } catch (error) {
      micStatus = (error instanceof DOMException && error.name === 'NotAllowedError') ? 'denied' : 'error'
      if (countdownLabel) countdownLabel.textContent = micStatus === 'denied' ? 'Microphone permission denied.' : 'Could not start microphone.'
      await stopMic(micStatus)
    }
  }

  venueButtons.forEach((button) => button.addEventListener('click', () => applyPreset(button.dataset.venue ?? 'home')))
  controls.forEach((control) => control.addEventListener('input', render))
  enableMicButton?.addEventListener('click', () => void enableMic())
  stopMicButton?.addEventListener('click', () => void stopMic())
  runButton?.addEventListener('click', () => {
    if (micStatus !== 'listening') {
      if (countdownLabel) countdownLabel.textContent = 'Enable Mic Check first to run the real diagnostic.'
      return
    }
    if (timer) window.clearInterval(timer)
    countdown = 10
    diagnosticSamples = []
    diagnosticRunning = true
    runButton.disabled = true
    const report = root.querySelector<HTMLElement>('[data-report]')
    if (report) report.hidden = true
    if (progress) progress.style.width = '0%'
    if (countdownLabel) countdownLabel.textContent = 'Sampling live mic: 10 seconds left.'
    timer = window.setInterval(() => {
      countdown -= 1
      if (progress) progress.style.width = `${((10 - countdown) / 10) * 100}%`
      if (countdownLabel) countdownLabel.textContent = countdown > 0 ? `Sampling live mic: ${countdown} seconds left.` : 'Generating report card from live samples...'
      if (countdown <= 0) {
        window.clearInterval(timer)
        timer = undefined
        finishDiagnostic()
      }
    }, 1000)
  })

  karaokeHeroCleanup = () => {
    void stopMic()
    if (timer) window.clearInterval(timer)
  }
  window.addEventListener('pagehide', karaokeHeroCleanup, { once: true })
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
          <p class="kicker">Interactive Public Beta</p>
          <h2>Run a browser-local mic check.</h2>
          <p>Enable the microphone to move the live level, spectrum, feedback risk, Fix Coach, and 10-second diagnostic. Simulated controls stay available when the mic is off.</p>
        </div>
        <div class="hero-live-note">
          <strong>Privacy:</strong>
          <span>Mic analysis runs locally in your browser. No audio is uploaded or saved.</span>
        </div>
        <div class="hero-score-grid" aria-label="Live score dashboard">
          <article class="hero-score-card"><span>Karaoke Rescue Score</span><strong data-score="rescue">--</strong><p data-score-label="rescue">Ready</p></article>
          <article class="hero-score-card"><span>Neighbor Friendly</span><strong data-score="neighbor">--</strong><p data-score-label="neighbor">Ready</p></article>
          <article class="hero-score-card"><span>Vocal Clarity</span><strong data-score="clarity">--</strong><p data-score-label="clarity">Ready</p></article>
          <article class="hero-score-card risk"><span>Feedback Risk</span><strong data-score="risk">--</strong><p data-score-label="risk">Ready</p></article>
        </div>
        <div class="hero-demo-grid">
          <section class="hero-demo-panel hero-mic-panel">
            <div class="hero-demo-panel-head">
              <p class="kicker">Enable Mic Check</p>
              <h3>Live input meter</h3>
            </div>
            <div class="hero-mic-status-grid">
              <article><span>Status</span><strong data-mic-status>stopped</strong></article>
              <article><span>Input level</span><strong><output data-mic-level>0</output>/100</strong></article>
              <article><span>Signal</span><strong data-signal-label>silent</strong></article>
            </div>
            <div class="hero-level-meter" aria-label="Live input level"><span data-level-meter></span></div>
            <p data-clipping-warning>No clipping warning.</p>
            <p data-mic-coach>Enable Mic Check to see the live input level.</p>
            <div class="hero-button-row">
              <button class="primary-link hero-run-button" type="button" data-enable-mic>Enable Mic Check</button>
              <button class="secondary-link hero-run-button" type="button" data-stop-mic disabled>Stop Mic</button>
            </div>
          </section>
          <section class="hero-demo-panel hero-spectrum-panel">
            <div class="hero-demo-panel-head">
              <p class="kicker">Live Spectrum Bars</p>
              <h3>Karaoke frequency bands</h3>
            </div>
            <div class="hero-spectrum-grid" data-spectrum-grid>
              ${['Bass mud', 'Low mids', 'Vocal body', 'Presence', 'Harsh / feedback', 'Air / hiss'].map((label) => `
                <article class="hero-spectrum-band">
                  <div><strong>${label}</strong><span>Waiting for mic</span></div>
                  <div class="hero-spectrum-meter"><span></span></div>
                  <p>0 · quiet</p>
                </article>
              `).join('')}
            </div>
            <div class="hero-risk-detail">
              <span>Suspected band</span>
              <strong data-risk-band>Mic off</strong>
              <p data-risk-action>Enable Mic Check to estimate feedback risk from live audio.</p>
            </div>
          </section>
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
            <p class="hero-source-pill" data-coach-source>Simulated controls</p>
            <strong data-fix-primary>Pick a venue to begin.</strong>
            <p data-fix-why>The coach prioritizes one action from the current simulated setup.</p>
            <ul data-fix-backups></ul>
          </section>
          <section class="hero-demo-panel hero-diagnostic-panel" id="hero-check">
            <div class="hero-demo-panel-head">
              <p class="kicker">10-Second Real Diagnostic</p>
              <h3>Samples the live mic analyser</h3>
            </div>
            <p>Enable Mic Check, then sample live analyser levels for 10 seconds. No recording playback, no storage, no upload.</p>
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
            <p>This public page is a validation entry point. The beta check uses browser-local microphone analysis, simulated room controls, a quick read, and one top fix.</p>
          </div>
          <ol>
            <li>Pick the venue: home, church, barangay, wedding, or school.</li>
            <li>Enable Mic Check and watch the live level/spectrum.</li>
            <li>Run the 10-second real diagnostic in the browser.</li>
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
          <p>Mic analysis runs locally in your browser. No audio is uploaded or saved. This public demo does not store reports, collect emails, or send setup data to a backend.</p>
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
