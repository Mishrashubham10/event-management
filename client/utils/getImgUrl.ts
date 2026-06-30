export function getImageUrl(path?: string) {
  if (!path) return '/placeholder.jpg';

  return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
}