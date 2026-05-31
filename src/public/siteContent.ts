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

const pageDetails: Record<string, { label: string; principle: string; observe: string[]; tune: string[] }> = {
  'SANCTUM Studio': {
    label: 'Design Studio',
    principle: 'SANCTUM Studio creates premium space-design systems for sleep, focus, recovery, creativity, and calm.',
    observe: ['How a room changes attention and energy', 'Where light, sound, air, material, and nature compete', 'Which ritual the space should make easier'],
    tune: ['Begin with one room', 'Design the environment like an instrument', 'Stabilize the atmosphere before adding complexity'],
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
    links: studioLinks.filter((link) => link.href !== path).slice(0, 6),
    cta: `Begin with ${topic} and tune one room into a calmer, more intentional sanctuary.`,
  }
}

export const pages: PublicPage[] = [
  page('/', 'SANCTUM Studio | Design Your Environment Like an Instrument', 'SANCTUM Studio creates premium space-design systems for sleep, focus, recovery, creativity, and calm.', 'Design Your Environment Like an Instrument', 'SANCTUM Studio', 'room-stack'),
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
]
