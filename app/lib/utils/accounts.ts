export function getInitials(name: string, firstCharOnly?: boolean) {
  const words = name.split(' ');
  let initials = '';

  for (const word of words) {
    if (word.length > 0) {
      initials += word.charAt(0).toUpperCase();
    }
  }
  return firstCharOnly && initials.length ? initials[0] : initials;
}

export function getLogo(domain: string, size: number = 128): string {
  return (
    domain &&
    `${process.env.NEXT_PUBLIC_LOGO_DEV_URL}/${domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&size=${size}&retina=true`
  );
}
