import { isNil } from 'lodash';

export function getInitials(name: string, maxChar?: number) {
  const words = name.split(' ');
  let initials = '';

  for (const word of words) {
    if (word.length > 0) {
      initials += word.charAt(0).toUpperCase();
    }
  }
  return isNil(maxChar) ? initials : initials.slice(0, maxChar);
}

export function getLogo(domain: string, size: number = 128): string {
  return (
    domain &&
    `${process.env.NEXT_PUBLIC_LOGO_DEV_URL}/${domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&size=${size}&retina=true`
  );
}
