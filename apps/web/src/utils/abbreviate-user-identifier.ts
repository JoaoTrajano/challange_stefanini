export function abbreviateUserIdentifier(identifier: string): string {
  if (!identifier.trim()) return '';

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(identifier)) {
    const [localPart, domain] = identifier.split('@');
    const abbreviatedLocal =
      localPart.length > 3 ? `${localPart.slice(0, 3)}...` : localPart;

    return `${abbreviatedLocal}@${domain}`;
  }

  const names = identifier.trim().split(/\s+/);

  if (names.length === 1) return names[0];

  const firstName = names[0];
  const abbreviatedLastNames = names
    .slice(1)
    .map((name) => name[0].toUpperCase() + '.')
    .join(' ');

  return `${firstName} ${abbreviatedLastNames}`;
}
