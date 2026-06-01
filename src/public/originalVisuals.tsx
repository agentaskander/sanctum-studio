const roomNodes = [
  { label: 'Light', href: '/guides/light-design' },
  { label: 'Sound', href: '/guides/soundscape-design' },
  { label: 'Air', href: '/guides/air-quality-design' },
  { label: 'Temp', href: '/guides/temperature-design' },
  { label: 'Material', href: '/guides/material-design' },
  { label: 'Nature', href: '/guides/nature-design' },
  { label: 'Ritual', href: '/guides/room-rituals' },
]

export function OriginalStudioRoomVisual(className = '') {
  return `
    <section class="original-studio-graph ${className}" aria-label="Room optimization graphic">
      <div class="graph-lines"></div>
      ${roomNodes.map((node, index) => `<a class="graph-node node-${index + 1}" href="${node.href}" aria-label="Open ${node.label} design guide">${node.label}</a>`).join('')}
    </section>
  `
}
