const roomNodes = ['Light', 'Sound', 'Air', 'Temp', 'Material', 'Nature', 'Ritual']

export function OriginalStudioRoomVisual(className = '') {
  return `
    <section class="original-studio-graph ${className}" aria-label="Room optimization graphic">
      <div class="graph-lines"></div>
      ${roomNodes.map((node, index) => `<span class="graph-node node-${index + 1}">${node}</span>`).join('')}
    </section>
  `
}
