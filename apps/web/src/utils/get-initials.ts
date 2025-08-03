export function getInitials(identifier: string): string {
  if (!identifier.trim()) {
    return ''
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailPattern.test(identifier)) {
    const [localPart] = identifier.split('@')
    const initials = localPart
      .split(/[^a-zA-Z0-9]/)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('')
    return initials
  }

  const names = identifier.trim().split(/\s+/)
  const initials = names.map((name) => name[0]?.toUpperCase() || '').join('')
  return initials
}
