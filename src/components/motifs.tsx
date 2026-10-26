// Small drawn marks. The page's main shape, the church arch, is CSS
// (border-radius on the window, venue frames and reply choices).

export function ArchMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 44 60" aria-hidden="true">
      <path d="M0 60V22a22 22 0 0 1 44 0v38z" />
    </svg>
  )
}

export function Arrow({ direction = 'right' }: { direction?: 'right' | 'down' }) {
  return (
    <svg
      className="arrow"
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={direction === 'down' ? { transform: 'rotate(90deg)' } : undefined}
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  )
}
