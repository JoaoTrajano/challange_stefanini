export function getInitials(identifier: string): string {
  if (!identifier.trim()) {
    return ''
  }

  const names = identifier.trim().split(/\s+/).slice(0, 2)
  const initials = names.map((name) => name[0]?.toUpperCase() || '').join('')
  return initials
}
