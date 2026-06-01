import type { DiagramKind, PublicPage } from './siteContent'

export type SeoEntry = {
  slug: string
  title: string
  description: string
  category: string
  audience: string
  body: string[]
  checklist: string[]
  faq: { question: string; answer: string }[]
  relatedLinks: { label: string; href: string; text: string }[]
  disclaimer: string
  collection: 'articles' | 'stories' | 'guides' | 'room-stories' | 'studio-briefs'
  diagram: DiagramKind
}

export type StudioGuideHub = {
  slug: string
  title: string
  description: string
  definition: string
  whyItMatters: string
  examples: string[]
  principles: string[]
  checklist: string[]
  mistakes: string[]
  relatedSanctuaries: string[]
  relatedSlugs: string[]
  diagram: DiagramKind
}

const origin = 'https://sanctumstudio.io'
const updated = 'May 31, 2026'

const relatedLinks = [
  { label: 'Sleep Room Design', href: '/sleep-room-design', text: 'Bedroom sanctuary systems for rest and descent.' },
  { label: 'Home Office Design', href: '/home-office-design', text: 'Focus sanctuary design for attention and flow.' },
  { label: 'Recovery Room Design', href: '/recovery-room-design', text: 'Rooms for downshift, privacy, and return.' },
  { label: 'Studio Guides', href: '/guides', text: 'Premium public design guides for sanctuary rooms.' },
]

function bodyFor(title: string, category: string, audience: string) {
  return [
    `${title} is part of SANCTUM Studio's public design library for ${audience.toLowerCase()}. It keeps the existing Studio promise intact: design the environment like an instrument for sleep, focus, recovery, creativity, and calm.`,
    `The Studio method starts with atmosphere before objects. A room is read through light, sound, air, temperature, material, nature, layout, and ritual. Those layers determine whether the space descends, clarifies, softens, opens, or scatters.`,
    `${category} content stays practical and public. It can be used as a design brief, room story, or guide without publishing implementation methods or making medical claims.`,
    `Begin with one room and one intended state. The room might need a protected evening descent, a clearer desk zone, a softer recovery corner, a creative surface, or a stronger connection to plants and outdoor rhythm.`,
    `Observe friction before adding more. Glare, reflected sound, stale air, harsh texture, visual clutter, and hard-to-repeat rituals often create the real design problem. The best first change is usually the one that makes the room easier to use every day.`,
    `A SANCTUM Studio room should feel intentional before it feels styled. The public library gives readers enough structure to act while preserving the premium restraint of the current site.`,
  ]
}

function checklistFor(category: string) {
  return [
    `Name the ${category.toLowerCase()} room state in one sentence.`,
    'Observe the room at the time it matters most.',
    'Read light, sound, air, temperature, material, nature, layout, and ritual together.',
    'Remove the strongest source of friction before buying anything new.',
    'Keep the guidance public, practical, and non-medical.',
    'Link the room decision back to a Studio guide or sanctuary archetype.',
  ]
}

function faqFor(title: string) {
  return [
    { question: `What is ${title}?`, answer: `${title} is a public SANCTUM Studio page for designing rooms as intentional sanctuary systems.` },
    { question: 'Does this replace the existing Studio guides?', answer: 'No. It adds depth and links back to the existing public routes.' },
    { question: 'Is this medical advice?', answer: 'No. SANCTUM Studio provides design guidance only.' },
    { question: 'Where should a reader start?', answer: 'Start with one room, one state, and the most visible source of friction.' },
  ]
}

function entry(
  slug: string,
  title: string,
  description: string,
  category: string,
  audience: string,
  collection: SeoEntry['collection'],
  diagram: DiagramKind,
): SeoEntry {
  return {
    slug,
    title,
    description,
    category,
    audience,
    collection,
    diagram,
    body: bodyFor(title, category, audience),
    checklist: checklistFor(category),
    faq: faqFor(title),
    relatedLinks,
    disclaimer: 'Design guidance only. Not medical advice.',
  }
}

export const seoEntries: SeoEntry[] = [
  entry('sleep-sanctuary-evening-descent', 'Sleep Sanctuary Evening Descent', 'A guide to shaping bedroom light, quiet, air, texture, and ritual for night.', 'Sleep Sanctuary', 'Homeowners and designers', 'guides', 'sleep-factors'),
  entry('sleep-room-surface-reset', 'Sleep Room Surface Reset', 'A room story about visual calm, bedside surfaces, storage, and protected descent.', 'Sleep Sanctuary', 'Homeowners', 'room-stories', 'sleep-factors'),
  entry('darkness-quiet-and-coolth-brief', 'Darkness, Quiet, And Coolth Brief', 'A Studio brief for the bedroom conditions that make rest easier to protect.', 'Sleep Sanctuary', 'Design teams', 'studio-briefs', 'sleep-factors'),
  entry('focus-sanctuary-desk-orientation', 'Focus Sanctuary Desk Orientation', 'A guide to desk placement, task light, views, quiet, and reset friction.', 'Focus Sanctuary', 'Remote workers and designers', 'guides', 'focus-framework'),
  entry('home-office-acoustic-edge', 'Home Office Acoustic Edge', 'A room story about reducing speech paths and hard reflection in a work zone.', 'Focus Sanctuary', 'Homeowners', 'room-stories', 'focus-framework'),
  entry('cognitive-space-design-brief', 'Cognitive Space Design Brief', 'A Studio brief for designing clarity, continuity, and calm attention.', 'Focus Sanctuary', 'Professional teams', 'studio-briefs', 'focus-framework'),
  entry('recovery-room-low-contrast', 'Recovery Room Low Contrast', 'A guide to privacy, soft light, breathable air, texture, and gradual return.', 'Recovery Room', 'Homeowners and practitioners', 'guides', 'recovery-framework'),
  entry('soft-return-room-story', 'Soft Return Room Story', 'A room story about shifting a corner from performance to downshift.', 'Recovery Room', 'Homeowners', 'room-stories', 'recovery-framework'),
  entry('recovery-atmosphere-brief', 'Recovery Atmosphere Brief', 'A Studio brief for rooms that need tactile calm and spatial quiet.', 'Recovery Room', 'Designers', 'studio-briefs', 'recovery-framework'),
  entry('creative-room-surface-rhythm', 'Creative Room Surface Rhythm', 'A guide to creative rooms that invite making without scattering attention.', 'Creative Room', 'Makers and designers', 'guides', 'studio-method'),
  entry('creative-reset-story', 'Creative Reset Story', 'A room story about ideation, material restraint, and easier return to work.', 'Creative Room', 'Makers', 'stories', 'studio-method'),
  entry('creative-sanctuary-brief', 'Creative Sanctuary Brief', 'A Studio brief for movement, clarity, visual cues, and room reset.', 'Creative Room', 'Creative teams', 'studio-briefs', 'studio-method'),
  entry('nature-room-living-reference', 'Nature Room Living Reference', 'A guide to views, plants, living material, outdoor thresholds, and grounded ritual.', 'Nature Room', 'Homeowners and designers', 'guides', 'nature-ladder'),
  entry('plant-view-and-material-story', 'Plant, View, And Material Story', 'A room story about adding nature contact without decorative clutter.', 'Nature Room', 'Homeowners', 'room-stories', 'nature-ladder'),
  entry('nature-sanctuary-brief', 'Nature Sanctuary Brief', 'A Studio brief for rooms that need place contact and seasonal rhythm.', 'Nature Room', 'Design teams', 'studio-briefs', 'nature-ladder'),
  entry('light-design-layering-guide', 'Light Design Layering Guide', 'A guide to task, ambient, evening, and darkness layers in rooms.', 'Light Design', 'Designers and homeowners', 'guides', 'room-stack'),
  entry('glare-control-room-story', 'Glare Control Room Story', 'A story about reducing visual fatigue through orientation and softer contrast.', 'Light Design', 'Homeowners', 'room-stories', 'room-stack'),
  entry('evening-warmth-brief', 'Evening Warmth Brief', 'A Studio brief for light choices that support a calmer end of day.', 'Light Design', 'Designers', 'studio-briefs', 'sleep-factors'),
  entry('soundscape-design-for-quiet', 'Soundscape Design For Quiet', 'A guide to reflection, masking, privacy, and acoustic atmosphere.', 'Soundscape Design', 'Designers and homeowners', 'guides', 'focus-framework'),
  entry('quiet-focus-room-story', 'Quiet Focus Room Story', 'A room story about turning acoustic friction into a calmer work surface.', 'Soundscape Design', 'Remote workers', 'room-stories', 'focus-framework'),
  entry('soundscape-implementation-brief', 'Soundscape Implementation Brief', 'A Studio brief for quiet, privacy, material absorption, and sound as atmosphere.', 'Soundscape Design', 'Professional teams', 'studio-briefs', 'focus-framework'),
  entry('room-ritual-reset-guide', 'Room Ritual Reset Guide', 'A guide to repeatable rituals that make rooms easier to use and maintain.', 'Room Rituals', 'Homeowners', 'guides', 'studio-method'),
  entry('morning-and-evening-ritual-story', 'Morning And Evening Ritual Story', 'A room story about daily transitions, reset paths, and sensory cues.', 'Room Rituals', 'Homeowners and designers', 'stories', 'studio-method'),
  entry('ritual-design-brief', 'Ritual Design Brief', 'A Studio brief for designing routines into the room without making them visible clutter.', 'Room Rituals', 'Design teams', 'studio-briefs', 'studio-method'),
]

export const studioGuideHubs: StudioGuideHub[] = [
  {
    slug: 'light-design',
    title: 'Light Design Guide',
    description: 'A deep Studio guide to daylight, task light, evening warmth, glare control, and darkness as room design layers.',
    definition: 'Light design is the way a room shapes brightness, contrast, timing, shadow, glare, task clarity, and evening descent.',
    whyItMatters: 'Light is often the fastest room layer to feel. It can sharpen attention, flatten atmosphere, create fatigue, soften transition, or make a room easier to leave behind at night.',
    examples: ['A bedroom with protected darkness and warmer evening lamps.', 'A home office with task light separated from screen glare.', 'A reading room where daylight is framed without visual strain.'],
    principles: ['Separate daylight, task, ambient, and evening layers.', 'Reduce glare before increasing brightness.', 'Make the intended light state the easiest switch to use.', 'Protect darkness when the room is meant to descend.'],
    checklist: ['Observe daylight at morning, afternoon, and evening.', 'Name the light state the room should support.', 'Identify glare, contrast, and over-bright fixtures.', 'Tune task light separately from ambient light.', 'Check whether evening light supports downshift.'],
    mistakes: ['Using one overhead light for every state.', 'Adding bright fixtures before solving glare.', 'Ignoring darkness as part of design.', 'Choosing decorative lamps that do not support the room purpose.'],
    relatedSanctuaries: ['Sleep Sanctuary', 'Focus Sanctuary', 'Recovery Sanctuary'],
    relatedSlugs: ['light-design-layering-guide', 'glare-control-room-story', 'evening-warmth-brief'],
    diagram: 'room-stack',
  },
  {
    slug: 'soundscape-design',
    title: 'Soundscape Design Guide',
    description: 'A deep Studio guide to acoustic privacy, sound reflection, masking, quiet, and sound as atmosphere.',
    definition: 'Soundscape design is the shaping of speech paths, reflection, vibration, masking, silence, and background atmosphere inside a room.',
    whyItMatters: 'Sound determines whether a room feels exposed, protected, focused, or unsettled. It is a design layer, not only a technical problem.',
    examples: ['A focus room with fewer speech paths and softer reflection.', 'A bedroom where mechanical hum and sudden noise are reduced.', 'A recovery corner where sound supports downshift instead of vigilance.'],
    principles: ['Reduce hard reflection before adding sound systems.', 'Separate quiet needs from music preferences.', 'Use materials and layout to create acoustic privacy.', 'Treat silence as an active design condition.'],
    checklist: ['Listen for speech intrusion and intermittent noise.', 'Find hard surfaces that amplify reflection.', 'Identify equipment hum or vibration.', 'Choose absorption, layout, masking, or distance as the first move.', 'Review the room at the time quiet matters most.'],
    mistakes: ['Solving every sound issue with speakers.', 'Ignoring low-frequency vibration.', 'Adding soft goods without locating reflection paths.', 'Designing for silence when stable masking would work better.'],
    relatedSanctuaries: ['Focus Sanctuary', 'Sleep Sanctuary', 'Recovery Sanctuary'],
    relatedSlugs: ['soundscape-design-for-quiet', 'quiet-focus-room-story', 'soundscape-implementation-brief'],
    diagram: 'focus-framework',
  },
  {
    slug: 'air-quality-design',
    title: 'Air Quality Design Guide',
    description: 'A deep Studio guide to breathable rooms, airflow, filtration, humidity, source control, and maintenance rhythm.',
    definition: 'Air quality design makes breath part of the room system through ventilation, filtration, humidity balance, source control, cleaning rhythm, and maintainable habits.',
    whyItMatters: 'Air is invisible, but rooms feel different when freshness, source control, and maintenance are designed into daily use.',
    examples: ['A bedroom with clearer airflow and reduced fragrance load.', 'A workspace with visible filter maintenance and less stale air.', 'A recovery room where cleaning products and material sources are simplified.'],
    principles: ['Reduce sources before relying on devices.', 'Keep airflow paths visible and unobstructed.', 'Make filter and humidity maintenance easy to remember.', 'Treat scent as a design decision, not an afterthought.'],
    checklist: ['Observe stale zones, dust, humidity, and odor.', 'Identify blocked vents or poor airflow paths.', 'Review cleaning, fragrance, and material sources.', 'Make maintenance visible and repeatable.', 'Pair air changes with room purpose and reset rhythm.'],
    mistakes: ['Adding devices without source control.', 'Blocking airflow with furniture or storage.', 'Using scent to cover stale air.', 'Making maintenance too hidden to repeat.'],
    relatedSanctuaries: ['Sleep Sanctuary', 'Recovery Sanctuary', 'Focus Sanctuary'],
    relatedSlugs: ['sleep-sanctuary-evening-descent', 'recovery-room-low-contrast', 'focus-sanctuary-desk-orientation'],
    diagram: 'room-stack',
  },
  {
    slug: 'temperature-design',
    title: 'Temperature Design Guide',
    description: 'A deep Studio guide to thermal comfort, coolth, warmth, airflow, materials, bedding, seating, and room timing.',
    definition: 'Temperature design is the way a room manages warmth, coolth, airflow, tactile temperature, seasonal shifts, and the thermal expectations of sleep, focus, recovery, or creative work.',
    whyItMatters: 'Thermal discomfort can override the best visual design. A room that is too warm, too cold, or unevenly conditioned asks the body to compensate.',
    examples: ['A sleep room with cooler night conditions and breathable bedding.', 'A focus room where sun exposure does not overheat the desk zone.', 'A recovery room where tactile warmth supports calm without heaviness.'],
    principles: ['Read temperature by time of day, not only by thermostat.', 'Use material and airflow as part of thermal comfort.', 'Separate sleep coolth from daytime warmth.', 'Design for seasonal adjustment.'],
    checklist: ['Observe hot and cold zones across a full day.', 'Check window exposure, airflow, bedding, rugs, and seating.', 'Identify where materials feel too cold, sticky, or heavy.', 'Tune temperature for the room state.', 'Make seasonal changes simple.'],
    mistakes: ['Treating thermostat setting as the whole problem.', 'Ignoring sunlight and window heat.', 'Choosing materials that fight the room state.', 'Making seasonal adjustment difficult.'],
    relatedSanctuaries: ['Sleep Sanctuary', 'Recovery Sanctuary', 'Nature Sanctuary'],
    relatedSlugs: ['darkness-quiet-and-coolth-brief', 'recovery-atmosphere-brief', 'nature-room-living-reference'],
    diagram: 'sleep-factors',
  },
  {
    slug: 'material-design',
    title: 'Material Design Guide',
    description: 'A deep Studio guide to tactile calm, material restraint, texture, surfaces, softness, durability, and visual weight.',
    definition: 'Material design is the use of texture, hardness, softness, reflectivity, weight, temperature, durability, and restraint to support the state of a room.',
    whyItMatters: 'Materials decide how a room meets the body. They can create calm, harshness, warmth, echo, visual clutter, or grounded continuity.',
    examples: ['A recovery room with softer contact points and lower contrast.', 'A creative room with durable work surfaces and fewer distracting finishes.', 'A nature room where natural materials support living references.'],
    principles: ['Choose materials for state, not theme.', 'Reduce visual weight before adding decorative texture.', 'Balance softness with maintainability.', 'Use tactile contrast carefully.'],
    checklist: ['Touch the surfaces the body uses most.', 'Identify hard, noisy, cold, reflective, or visually heavy materials.', 'Choose one material change that supports the room state.', 'Check how material affects sound and light.', 'Keep maintenance realistic.'],
    mistakes: ['Using too many finishes at once.', 'Choosing texture that adds clutter.', 'Ignoring acoustic and thermal effects.', 'Prioritizing novelty over repeatable comfort.'],
    relatedSanctuaries: ['Recovery Sanctuary', 'Creative Sanctuary', 'Nature Sanctuary'],
    relatedSlugs: ['recovery-atmosphere-brief', 'creative-room-surface-rhythm', 'plant-view-and-material-story'],
    diagram: 'recovery-framework',
  },
  {
    slug: 'nature-design',
    title: 'Nature Design Guide',
    description: 'A deep Studio guide to plants, views, water, natural materials, outdoor thresholds, living references, and seasonal rhythm.',
    definition: 'Nature design is the integration of living reference points, views, plants, water, natural materials, daylight movement, outdoor thresholds, and seasonal cues into a room.',
    whyItMatters: 'Nature contact helps a room feel less sealed and more oriented. It can ground attention, soften recovery spaces, and make daily rituals easier to repeat.',
    examples: ['A reading room oriented toward a view.', 'A nature sanctuary with plants placed as living references, not clutter.', 'A bedroom with a small morning threshold ritual near daylight.'],
    principles: ['Use nature as infrastructure, not decoration.', 'Frame views before adding objects.', 'Choose plants and materials that can be cared for.', 'Connect nature to a daily ritual.'],
    checklist: ['Identify the strongest existing nature cue.', 'Review views, daylight movement, plants, water, and materials.', 'Remove nature-themed clutter that does not support the room.', 'Place living elements where they can be maintained.', 'Tie the room to a simple outdoor or threshold habit.'],
    mistakes: ['Adding plants without a care rhythm.', 'Using nature as a decorative theme only.', 'Blocking the best view with furniture.', 'Ignoring seasonal light and maintenance.'],
    relatedSanctuaries: ['Nature Sanctuary', 'Recovery Sanctuary', 'Sleep Sanctuary'],
    relatedSlugs: ['nature-room-living-reference', 'plant-view-and-material-story', 'nature-sanctuary-brief'],
    diagram: 'nature-ladder',
  },
  {
    slug: 'room-rituals',
    title: 'Room Rituals Guide',
    description: 'A deep Studio guide to repeatable routines, reset paths, morning and evening transitions, closeout habits, and room care.',
    definition: 'Room rituals are the repeatable actions that make a room easier to enter, use, reset, and leave. They connect design to daily behavior without making the room feel scripted.',
    whyItMatters: 'A room only holds its purpose if the supportive state can be repeated. Rituals turn design choices into daily continuity.',
    examples: ['An evening closeout path that clears visual load before sleep.', 'A focus-room reset that restores the desk after work.', 'A recovery ritual that reduces contrast, sound, and clutter before downshift.'],
    principles: ['Make the ritual shorter than the friction it removes.', 'Design the room so the next right action is visible.', 'Use light, sound, surface, and storage cues together.', 'Keep rituals quiet, repeatable, and non-performative.'],
    checklist: ['Name the transition the room needs to support.', 'Identify the first and last action in the ritual.', 'Remove any step that is too hard to repeat.', 'Pair ritual cues with light, sound, surfaces, or storage.', 'Review whether the room is easier to reset after use.'],
    mistakes: ['Creating routines that require too much effort.', 'Adding visible ritual clutter.', 'Separating behavior from the room layout.', 'Designing for inspiration instead of repeatability.'],
    relatedSanctuaries: ['Sleep Sanctuary', 'Focus Sanctuary', 'Creative Sanctuary'],
    relatedSlugs: ['room-ritual-reset-guide', 'morning-and-evening-ritual-story', 'ritual-design-brief'],
    diagram: 'studio-method',
  },
]

export const seoSlugInventory = [
  { slug: 'sleep-sanctuary-evening-descent' },
  { slug: 'sleep-room-surface-reset' },
  { slug: 'darkness-quiet-and-coolth-brief' },
  { slug: 'focus-sanctuary-desk-orientation' },
  { slug: 'home-office-acoustic-edge' },
  { slug: 'cognitive-space-design-brief' },
  { slug: 'recovery-room-low-contrast' },
  { slug: 'soft-return-room-story' },
  { slug: 'recovery-atmosphere-brief' },
  { slug: 'creative-room-surface-rhythm' },
  { slug: 'creative-reset-story' },
  { slug: 'creative-sanctuary-brief' },
  { slug: 'nature-room-living-reference' },
  { slug: 'plant-view-and-material-story' },
  { slug: 'nature-sanctuary-brief' },
  { slug: 'light-design-layering-guide' },
  { slug: 'glare-control-room-story' },
  { slug: 'evening-warmth-brief' },
  { slug: 'soundscape-design-for-quiet' },
  { slug: 'quiet-focus-room-story' },
  { slug: 'soundscape-implementation-brief' },
  { slug: 'room-ritual-reset-guide' },
  { slug: 'morning-and-evening-ritual-story' },
  { slug: 'ritual-design-brief' },
]

const collectionLabels: Record<SeoEntry['collection'], string> = {
  articles: 'Articles',
  stories: 'Stories',
  guides: 'Guides',
  'room-stories': 'Room Stories',
  'studio-briefs': 'Studio Briefs',
}

export const collectionRoutes = Object.entries(collectionLabels).map(([path, label]) => ({
  path: `/${path}`,
  title: `${label} | SANCTUM Studio`,
  description: `Public SANCTUM Studio ${label.toLowerCase()} for sanctuary rooms, light, sound, nature, recovery, and room rituals.`,
  canonical: `${origin}/${path}`,
  h1: label,
  intro: `A public Studio ${label.toLowerCase()} collection for sleep sanctuaries, focus spaces, recovery rooms, creative rooms, nature rooms, light design, soundscape design, and room rituals.`,
  label: 'SEO Library',
  principle: `This collection extends SANCTUM Studio with public ${label.toLowerCase()} while preserving the current public site.`,
  diagram: 'studio-method' as DiagramKind,
  updated,
  observe: ['Room state', 'Visible sensory friction', 'Daily reset and maintainability'],
  tune: ['Begin with one room', 'Tune the strongest layer first', 'Keep the guidance practical and public'],
  checklist: checklistFor(label),
  faqs: faqFor(label),
  links: seoEntries.filter((item) => item.collection === path).slice(0, 6).map((item) => ({
    label: item.title,
    href: `/articles/${item.slug}`,
    text: item.description,
  })),
  cta: `Explore SANCTUM Studio ${label.toLowerCase()} as public sanctuary design.`,
  seoCollectionItems: seoEntries.filter((item) => item.collection === path).map((item) => ({
    label: item.title,
    href: `/articles/${item.slug}`,
    text: item.description,
  })),
}))

export const previewRoutes: PublicPage[] = [
  {
    path: '/partner-preview',
    title: 'Partner Preview | SANCTUM Studio',
    description: 'A public partner preview for SANCTUM Studio sanctuary design language, room systems, and implementation fit.',
    canonical: `${origin}/partner-preview`,
    h1: 'Partner Preview',
    intro: 'A public preview for partners exploring SANCTUM Studio as a premium room design and sanctuary system.',
    label: 'Partner Preview',
    principle: 'SANCTUM Studio partner language stays practical, visual, and public-facing while preserving the current public site.',
    diagram: 'studio-method',
    updated,
    observe: ['Room state', 'Design fit', 'Public-facing use case'],
    tune: ['Start with one room type', 'Connect the room to a public Studio guide', 'Keep claims bounded and design-led'],
    checklist: checklistFor('Partner Preview'),
    faqs: faqFor('Partner Preview'),
    links: relatedLinks,
    cta: 'Explore the Studio public library before any partner discussion.',
    seoBody: bodyFor('Partner Preview', 'Partner Preview', 'Design partners and aligned operators'),
    seoCategory: 'Partner Preview',
    seoAudience: 'Design partners and aligned operators',
    seoDisclaimer: 'Design guidance only. Not medical advice.',
  },
  {
    path: '/investor-preview',
    title: 'Investor Preview | SANCTUM Studio',
    description: 'A public investor preview for SANCTUM Studio category language, sanctuary design, and room system positioning.',
    canonical: `${origin}/investor-preview`,
    h1: 'Investor Preview',
    intro: 'A public-facing preview of SANCTUM Studio as a design layer for sanctuary rooms, guides, stories, and briefs.',
    label: 'Investor Preview',
    principle: 'SANCTUM Studio investor language describes the public category and content system without protected operating details.',
    diagram: 'room-stack',
    updated,
    observe: ['Public category fit', 'Room archetype clarity', 'Content library depth'],
    tune: ['Review the public guides', 'Map the room archetypes', 'Keep the preview strategic and public'],
    checklist: checklistFor('Investor Preview'),
    faqs: faqFor('Investor Preview'),
    links: relatedLinks,
    cta: 'Explore Studio briefs and guides as the public category surface.',
    seoBody: bodyFor('Investor Preview', 'Investor Preview', 'Strategic readers and investors'),
    seoCategory: 'Investor Preview',
    seoAudience: 'Strategic readers and investors',
    seoDisclaimer: 'Design guidance only. Not medical advice.',
  },
]

function guideHubBody(hub: StudioGuideHub) {
  return [
    `Definition: ${hub.definition}`,
    `Why it matters: ${hub.whyItMatters}`,
    `Room examples: ${hub.examples.join(' ')}`,
    `Design principles: ${hub.principles.join(' ')}`,
    `Common mistakes: ${hub.mistakes.join(' ')}`,
    `Related sanctuary types: ${hub.relatedSanctuaries.join(', ')}. These sanctuary types keep the guide connected to the larger SANCTUM Studio room library.`,
    'CTA: begin with one room, observe the strongest layer of friction, tune one condition, and revisit the room after real use before adding more.',
  ]
}

export const guideHubRoutes: PublicPage[] = studioGuideHubs.map((hub) => ({
  path: `/guides/${hub.slug}`,
  title: `${hub.title} | SANCTUM Studio`,
  description: hub.description,
  canonical: `${origin}/guides/${hub.slug}`,
  h1: hub.title,
  intro: hub.description,
  label: 'Studio Guide Hub',
  principle: `${hub.definition} ${hub.whyItMatters}`,
  diagram: hub.diagram,
  updated,
  observe: hub.examples,
  tune: hub.principles,
  checklist: hub.checklist,
  faqs: [
    { question: `What is ${hub.title}?`, answer: `${hub.title} is a SANCTUM Studio guide hub for ${hub.definition.toLowerCase()}` },
    { question: 'Why does this layer matter?', answer: hub.whyItMatters },
    { question: 'What mistakes should I avoid?', answer: hub.mistakes.join(' ') },
    { question: 'Where should I continue?', answer: `Continue with ${hub.relatedSanctuaries.join(', ')} and the related Studio articles connected below.` },
  ],
  links: [
    ...hub.relatedSanctuaries.map((label) => ({
      label,
      href: label === 'Sleep Sanctuary' ? '/sleep-room-design' : label === 'Focus Sanctuary' ? '/home-office-design' : label === 'Recovery Sanctuary' ? '/recovery-room-design' : label === 'Nature Sanctuary' ? '/nature-and-grounding' : '/room-archetypes',
      text: `${label} connects this layer to a complete room archetype.`,
    })),
    ...hub.relatedSlugs.map((slug) => {
      const entry = seoEntries.find((item) => item.slug === slug)
      return {
        label: entry?.title ?? slug,
        href: `/articles/${slug}`,
        text: entry?.description ?? 'Related Studio guide content.',
      }
    }),
  ],
  cta: `Use ${hub.title} to tune one room layer before adding more objects.`,
  seoBody: guideHubBody(hub),
  seoCategory: 'Studio Guide Hub',
  seoAudience: 'Homeowners, designers, and room teams',
  seoDisclaimer: 'Design guidance only. Not medical advice.',
  seoCollectionItems: hub.relatedSlugs.map((slug) => {
    const entry = seoEntries.find((item) => item.slug === slug)
    return {
      label: entry?.title ?? slug,
      href: `/articles/${slug}`,
      text: entry?.description ?? 'Related Studio guide content.',
    }
  }),
}))

export const seoPages: PublicPage[] = seoEntries.map((item) => ({
  path: `/articles/${item.slug}`,
  title: `${item.title} | SANCTUM Studio`,
  description: item.description,
  canonical: `${origin}/articles/${item.slug}`,
  h1: item.title,
  intro: item.description,
  label: item.category,
  principle: item.body[0],
  diagram: item.diagram,
  updated,
  observe: item.body.slice(1, 4),
  tune: item.body.slice(3, 6),
  checklist: item.checklist,
  faqs: item.faq,
  links: item.relatedLinks,
  cta: `Continue through the SANCTUM Studio ${item.category.toLowerCase()} library.`,
  seoBody: item.body,
  seoCategory: item.category,
  seoAudience: item.audience,
  seoDisclaimer: item.disclaimer,
}))
