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
    `${category} content stays practical and public-safe. It can be used as a design brief, room story, or guide without publishing private methods or making medical claims.`,
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
