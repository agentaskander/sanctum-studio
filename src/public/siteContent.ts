export type DiagramKind =
  | 'focus-framework'
  | 'room-stack'
  | 'sleep-factors'
  | 'recovery-framework'
  | 'nature-ladder'
  | 'studio-method'

export type PublicPage = {
  path: string
  title: string
  description: string
  canonical: string
  h1: string
  intro: string
  label: string
  principle: string
  observe: string[]
  tune: string[]
  checklist: string[]
  faqs: { question: string; answer: string }[]
  links: { label: string; href: string; text: string }[]
  cta: string
  diagram: DiagramKind
  updated: string
  seoBody?: string[]
  seoCategory?: string
  seoAudience?: string
  seoDisclaimer?: string
  seoCollectionItems?: { label: string; href: string; text: string }[]
}

const origin = 'https://sanctumstudio.io'
const updated = 'May 31, 2026'

export const sanctuaries = [
  { label: 'Sleep Sanctuary', href: '/sleep-room-design', text: 'Darkness, quiet, coolth, air, softness, and a protected evening descent.' },
  { label: 'Focus Sanctuary', href: '/home-office-design', text: 'Task light, acoustic privacy, clear surfaces, breathable air, and cognitive space design.' },
  { label: 'Recovery Sanctuary', href: '/recovery-room-design', text: 'Low contrast, tactile calm, privacy, stable sound, and recovery-oriented atmosphere.' },
  { label: 'Creative Sanctuary', href: '/guides', text: 'Room rhythm for making, ideation, visual clarity, and a calmer return to attention.' },
  { label: 'Nature Sanctuary', href: '/nature-and-grounding', text: 'Views, plants, material warmth, seasonal cues, outdoor thresholds, and grounded rituals.' },
]

export const methodSteps = [
  { title: 'Observe', text: 'Read how the room behaves before changing it.' },
  { title: 'Tune', text: 'Adjust the sensory layer that creates the clearest friction.' },
  { title: 'Layer', text: 'Add light, sound, air, material, nature, and ritual in sequence.' },
  { title: 'Stabilize', text: 'Make the supportive state easy to repeat.' },
  { title: 'Refine', text: 'Return after use and remove what does not hold.' },
]

const studioLinks = [
  { label: 'Sleep Room Design', href: '/sleep-room-design', text: 'Bedroom sanctuary systems for rest and descent.' },
  { label: 'Home Office Design', href: '/home-office-design', text: 'Cognitive space design for attention and flow.' },
  { label: 'Recovery Room Design', href: '/recovery-room-design', text: 'Rooms for downshift, privacy, and return.' },
  { label: 'Soundscape Design', href: '/soundscape-design', text: 'Acoustic atmosphere for quiet and focus.' },
  { label: 'Lighting Design', href: '/lighting-design', text: 'Daylight, contrast, task light, and evening softness.' },
  { label: 'Air Quality Design', href: '/air-quality-design', text: 'Breathable rooms through air, source control, and maintenance.' },
  { label: 'Nature And Grounding', href: '/nature-and-grounding', text: 'Nature contact, material warmth, and outdoor rhythm.' },
  { label: 'Tools', href: '/tools', text: 'Public room review tools.' },
  { label: 'Guides', href: '/guides', text: 'Premium design guides, not generic articles.' },
]

const professionalLinks = [
  { label: 'Professional Frameworks', href: '/professional-frameworks', text: 'Studio-ready frameworks for translating sanctuary design into client work.' },
  { label: 'Room Archetypes', href: '/room-archetypes', text: 'Sleep, focus, recovery, creative, and nature sanctuary patterns.' },
  { label: 'Assessments', href: '/assessments', text: 'Public room reviews for light, sound, air, material, nature, and ritual.' },
  { label: 'Design Systems', href: '/design-systems', text: 'Implementation systems for premium environmental design.' },
  { label: 'Case Studies', href: '/case-studies', text: 'Public project narratives for sanctuary rooms.' },
  { label: 'Implementation Guides', href: '/implementation-guides', text: 'Stepwise design guides for tuning one room at a time.' },
]

const pageDetails: Record<string, { label: string; principle: string; observe: string[]; tune: string[] }> = {
  'SANCTUM Studio': {
    label: 'Design Studio',
    principle: 'SANCTUM Studio creates premium space-design systems for sleep, focus, recovery, creativity, and calm.',
    observe: ['How a room changes attention and energy', 'Where light, sound, air, material, and nature compete', 'Which ritual the space should make easier'],
    tune: ['Begin with one room', 'Design the environment like an instrument', 'Stabilize the atmosphere before adding complexity'],
  },
  'Karaoke Hero': {
    label: 'Hero Beta',
    principle: 'Karaoke Hero is a public prototype for improving karaoke clarity before turning everything louder.',
    observe: ['Venue type', 'Microphone level', 'Feedback risk', 'Buried vocals', 'Volume pressure'],
    tune: ['Pick the venue', 'Enable microphone locally', 'Run a quick check', 'Apply the top fix'],
  },
  'Sleep Room Design': {
    label: 'Sleep Sanctuary',
    principle: 'Sleep room design turns the bedroom into a sanctuary instrument: darker, quieter, softer, breathable, and easier to leave behind at night.',
    observe: ['Light that remains visible after sunset', 'Sound paths, vibration, and mechanical hum', 'Storage, surfaces, and visual signals around the bed'],
    tune: ['Protect darkness', 'Soften sound and texture', 'Create a repeatable evening descent'],
  },
  'Home Office Design': {
    label: 'Focus Sanctuary',
    principle: 'Home office design is cognitive space design: light for clarity, quiet for continuity, air for steadiness, and layout that reduces decision drag.',
    observe: ['Glare, screen angle, and task light', 'Speech intrusion and household interruption', 'Desk density, cable friction, and visual noise'],
    tune: ['Place the desk for attention', 'Create an acoustic boundary', 'Keep the reset simple enough to repeat'],
  },
  'Recovery Room Design': {
    label: 'Recovery Sanctuary',
    principle: 'A recovery room is an atmosphere for downshift. It uses low contrast, privacy, breathable air, texture, and spatial quiet to help the body return.',
    observe: ['Object density and visual intensity', 'Privacy, seating posture, and tactile comfort', 'Whether the room invites restoration or performance'],
    tune: ['Lower contrast', 'Layer softness and air', 'Make return gradual and uncomplicated'],
  },
  'Soundscape Design': {
    label: 'Acoustic Sanctuary',
    principle: 'Soundscape design shapes the acoustic field of a room so sleep, focus, creativity, and recovery are not constantly interrupted.',
    observe: ['Hard reflection, speech paths, and equipment hum', 'Noise that arrives suddenly or repeats', 'Where masking or absorption would feel natural'],
    tune: ['Absorb reflection', 'Create privacy through layout', 'Use sound as atmosphere, not clutter'],
  },
  'Lighting Design': {
    label: 'Light Sanctuary',
    principle: 'Lighting design is the room rhythm made visible: morning brightness, task clarity, evening warmth, low glare, and protected darkness.',
    observe: ['Where daylight lands', 'What creates glare or visual fatigue', 'Which lights remain too intense at night'],
    tune: ['Separate task, ambient, and evening light', 'Soften contrast after sunset', 'Make the right light the easiest choice'],
  },
  'Air Quality Design': {
    label: 'Air Sanctuary',
    principle: 'Air quality design makes breath part of the room. Ventilation, filtration, humidity, source control, and cleaning rhythm become spatial design.',
    observe: ['Airflow, stale zones, humidity, and dust', 'Cooking, cleaning, fragrance, and material sources', 'Filter changes and maintenance visibility'],
    tune: ['Open clear air paths', 'Reduce unnecessary sources', 'Make maintenance part of the room system'],
  },
  'Nature And Grounding': {
    label: 'Nature Sanctuary',
    principle: 'Nature and grounding bring the room back into contact with living systems through views, plants, materials, air, light, outdoor thresholds, and ritual.',
    observe: ['Whether the room has a living reference', 'How plants, material, and daylight are placed', 'Where the body can reconnect with place'],
    tune: ['Frame nature contact', 'Use tactile material with restraint', 'Create a small outdoor or threshold ritual'],
  },
  Tools: {
    label: 'Room Tools',
    principle: 'SANCTUM tools help review a room as an instrument: what it amplifies, what it muffles, what it interrupts, and what it helps stabilize.',
    observe: ['Room purpose', 'Sensory friction', 'Reset difficulty'],
    tune: ['Use the room stack', 'Choose one intervention', 'Review after real use'],
  },
  Guides: {
    label: 'Design Guides',
    principle: 'SANCTUM guides are premium design briefs for sanctuary systems, not generic wellness articles.',
    observe: ['Which guide matches the room state', 'Where the room feels unresolved', 'What the first visible change should be'],
    tune: ['Start with the primary room', 'Follow the Studio method', 'Refine after use'],
  },
  'Professional Frameworks': {
    label: 'Professional Layer',
    principle: 'Professional frameworks translate SANCTUM Studio language into client-ready room briefs while keeping implementation methods outside the public site.',
    observe: ['The room state the client wants to support', 'The visible environmental layers shaping the room', 'The boundaries between design guidance and medical claims'],
    tune: ['Use public sanctuary language', 'Turn observations into design briefs', 'Keep the method elegant, practical, and non-proprietary'],
  },
  'Room Archetypes': {
    label: 'Professional Layer',
    principle: 'Room archetypes help designers identify the primary instrument: sleep sanctuary, focus sanctuary, recovery sanctuary, creative sanctuary, or nature sanctuary.',
    observe: ['Which state the room should hold', 'Which sensory layer currently dominates', 'How the room transitions across the day'],
    tune: ['Choose one archetype as the anchor', 'Align light, sound, air, temperature, materials, nature, and ritual', 'Remove elements that blur the room intent'],
  },
  Assessments: {
    label: 'Professional Layer',
    principle: 'Assessments are qualitative reviews of the room stack. They name visible friction without publishing evaluation machinery.',
    observe: ['Glare, noise, stale air, thermal discomfort, hard materials, missing nature, and ritual friction', 'The maintenance burden of the room', 'The difference between styling and support'],
    tune: ['Prioritize the most visible friction', 'Keep recommendations qualitative', 'Translate findings into one-room implementation steps'],
  },
  'Design Systems': {
    label: 'Professional Layer',
    principle: 'Design systems turn sanctuary intent into repeatable decisions: lighting families, acoustic layers, air practices, material restraint, nature placement, and reset rituals.',
    observe: ['Which details need consistency', 'Which interventions are maintainable', 'Where the design should stay quiet'],
    tune: ['Sequence the room stack', 'Build a small system before adding more', 'Keep every element accountable to the intended state'],
  },
  'Case Studies': {
    label: 'Professional Layer',
    principle: 'Case studies show how SANCTUM Studio can frame public room transformation through design intent, observed friction, selected interventions, and lived usability.',
    observe: ['The initial atmosphere of the room', 'The intervention sequence', 'The visible change in calm, clarity, recovery, or daily rhythm'],
    tune: ['Show design reasoning without implementation methods', 'Avoid guaranteed outcomes', 'Keep the project narrative architectural and human-centered'],
  },
  'Implementation Guides': {
    label: 'Professional Layer',
    principle: 'Implementation guides help move from inspiration into practice: one room, one state, one stack, one maintainable sequence of changes.',
    observe: ['The first layer to tune', 'The simplest durable change', 'How the room will be reset after use'],
    tune: ['Start with light, sound, air, or surface friction', 'Layer nature and ritual after the base is calmer', 'Refine the room after real use'],
  },
  Stories: {
    label: 'SEO Library',
    principle: 'SANCTUM Studio stories show how rooms can shift through light, sound, air, material, nature, ritual, and calmer spatial rhythm.',
    observe: ['The room state before intervention', 'The intended sanctuary archetype', 'The visible design layer being tuned'],
    tune: ['Keep examples public', 'Show design reasoning without implementation methods', 'Frame outcomes as lived usability, not medical claims'],
  },
  Articles: {
    label: 'SEO Library',
    principle: 'SANCTUM Studio articles build public design authority around sanctuary rooms, sleep spaces, focus spaces, recovery rooms, and environmental design.',
    observe: ['Which room question readers are asking', 'Which public concept needs clearer language', 'Where examples can make the method concrete'],
    tune: ['Use public design language', 'Keep the Studio method practical', 'Link articles into guides and tools'],
  },
}

function page(path: string, title: string, description: string, h1: string, topic: string, diagram: DiagramKind): PublicPage {
  const detail = pageDetails[topic]
  return {
    path,
    title,
    description,
    canonical: `${origin}${path}`,
    h1,
    intro: detail.principle,
    label: detail.label,
    principle: detail.principle,
    diagram,
    updated,
    observe: detail.observe,
    tune: detail.tune,
    checklist: [
      'Name the room state: sleep, focus, recovery, creativity, or calm.',
      'Read light, sound, air, temperature, materials, nature, and ritual as one system.',
      'Remove the strongest source of sensory friction before adding new objects.',
      'Tune one layer at a time and observe the room after real use.',
      'Keep the design beautiful, maintainable, and easy to reset.',
      'Use design guidance only. Do not treat the room as medical advice.',
    ],
    faqs: [
      { question: `What is ${topic}?`, answer: `${topic} is a SANCTUM Studio public design guide for shaping rooms as supportive sanctuary systems.` },
      { question: 'Is this medical advice?', answer: 'No. SANCTUM Studio provides design guidance only, not medical advice.' },
      { question: 'Do I need a renovation?', answer: 'No. Many rooms can be improved through light, sound, air, layout, material, nature, and repeatable ritual before construction is considered.' },
      { question: 'Where should I begin?', answer: 'Begin with one room and one state. Tune the environment like an instrument, then refine after use.' },
    ],
    links: [...professionalLinks, ...studioLinks].filter((link) => link.href !== path).slice(0, 6),
    cta: `Begin with ${topic} and tune one room into a calmer, more intentional sanctuary.`,
  }
}

export const pages: PublicPage[] = [
  page('/', 'SANCTUM Studio | Design Your Environment Like an Instrument', 'SANCTUM Studio creates premium space-design systems for sleep, focus, recovery, creativity, and calm.', 'Design Your Environment Like an Instrument', 'SANCTUM Studio', 'room-stack'),
  page('/karaoke-hero', 'Karaoke Hero | SANCTUM Studio', 'Karaoke Hero is a public prototype that helps karaoke operators find feedback, buried vocals, and volume problems before turning louder.', 'Make Karaoke Sound Better Without Turning It Louder', 'Karaoke Hero', 'focus-framework'),
  page('/sleep-room-design', 'Sleep Sanctuary Design | SANCTUM Studio', 'Premium sleep room design for darkness, quiet, breathable air, soft materials, and evening room rhythm.', 'Sleep Room Design', 'Sleep Room Design', 'sleep-factors'),
  page('/home-office-design', 'Home Office Design | SANCTUM Studio', 'Cognitive space design for home offices through task light, quiet, air, layout, and visual calm.', 'Home Office Design', 'Home Office Design', 'focus-framework'),
  page('/recovery-room-design', 'Recovery Room Design | SANCTUM Studio', 'Recovery sanctuary design through low contrast, privacy, tactile comfort, sound, air, and spatial calm.', 'Recovery Room Design', 'Recovery Room Design', 'recovery-framework'),
  page('/soundscape-design', 'Soundscape Design | SANCTUM Studio', 'Soundscape design for acoustic calm, focus, sleep, privacy, and recovery-oriented environments.', 'Soundscape Design', 'Soundscape Design', 'focus-framework'),
  page('/lighting-design', 'Lighting Design | SANCTUM Studio', 'Healthy lighting as room rhythm: daylight, task clarity, low glare, evening warmth, and darkness.', 'Lighting Design', 'Lighting Design', 'room-stack'),
  page('/air-quality-design', 'Air Quality Design | SANCTUM Studio', 'Air quality design for breathable rooms through ventilation, filtration, humidity, and source control.', 'Air Quality Design', 'Air Quality Design', 'room-stack'),
  page('/nature-and-grounding', 'Nature And Grounding | SANCTUM Studio', 'Nature sanctuary design through views, plants, materials, outdoor thresholds, and grounding rituals.', 'Nature And Grounding', 'Nature And Grounding', 'nature-ladder'),
  page('/tools', 'Studio Tools | SANCTUM Studio', 'Public room review tools for tuning light, sound, air, material, nature, ritual, and room rhythm.', 'Studio Tools', 'Tools', 'studio-method'),
  page('/guides', 'Studio Guides | SANCTUM Studio', 'Premium SANCTUM design guides for sleep, focus, recovery, lighting, sound, air, and nature sanctuaries.', 'Studio Guides', 'Guides', 'nature-ladder'),
  page('/about', 'About | SANCTUM Studio', 'About SANCTUM Studio, a premium sanctuary design system for human-centered rooms.', 'About SANCTUM Studio', 'SANCTUM Studio', 'recovery-framework'),
  page('/professional-frameworks', 'Professional Frameworks | SANCTUM Studio', 'Public professional frameworks for sanctuary design, room assessment, design systems, and implementation guides.', 'Professional Frameworks', 'Professional Frameworks', 'studio-method'),
  page('/room-archetypes', 'Room Archetypes | SANCTUM Studio', 'Premium room archetypes for sleep, focus, recovery, creative, and nature sanctuary design.', 'Room Archetypes', 'Room Archetypes', 'room-stack'),
  page('/assessments', 'Assessments | SANCTUM Studio', 'Public qualitative room assessments for light, sound, air, temperature, material, nature, and ritual.', 'Assessments', 'Assessments', 'focus-framework'),
  page('/design-systems', 'Design Systems | SANCTUM Studio', 'SANCTUM Studio design systems for premium room implementation with clear public boundaries.', 'Design Systems', 'Design Systems', 'studio-method'),
  page('/case-studies', 'Case Studies | SANCTUM Studio', 'Public case studies for sanctuary room design, environmental intelligence, and premium spatial transformation.', 'Case Studies', 'Case Studies', 'recovery-framework'),
  page('/implementation-guides', 'Implementation Guides | SANCTUM Studio', 'Implementation guides for tuning rooms through light, sound, air, material, nature, and ritual.', 'Implementation Guides', 'Implementation Guides', 'sleep-factors'),
  page('/stories', 'Stories | SANCTUM Studio', 'Public SANCTUM Studio stories about sleep rooms, focus spaces, recovery rooms, nature contact, and sanctuary design.', 'Stories', 'Stories', 'recovery-framework'),
  page('/articles', 'Articles | SANCTUM Studio', 'Articles on sanctuary design, sleep room design, focus spaces, recovery rooms, lighting, sound, air, and nature.', 'Articles', 'Articles', 'studio-method'),
]

const betaSources = [
  '/',
  '/professional-frameworks',
  '/room-archetypes',
  '/assessments',
  '/design-systems',
  '/case-studies',
  '/implementation-guides',
]

export const betaPages: PublicPage[] = betaSources.map((sourcePath) => {
  const source = pages.find((item) => item.path === sourcePath) ?? pages[0]
  const betaPath = sourcePath === '/' ? '/beta' : `/beta${sourcePath}`
  return {
    ...source,
    path: betaPath,
    canonical: `${origin}${betaPath}`,
    title: `Beta Preview | ${source.title}`,
    h1: sourcePath === '/' ? 'SANCTUM Studio Beta Preview' : `${source.h1} Beta Preview`,
    label: 'Beta Preview',
    description: `Public-preview beta route for ${source.h1}. ${source.description}`,
    intro: `${source.intro} This beta route is a preview surface and contains no protected route links or implementation logic.`,
    cta: `Preview ${source.h1} in the SANCTUM Studio beta route namespace.`,
  }
})
