export function getAllowedOrigins() {
  const domain = Netlify.env.get('VITE_APP_URL');
  if (!domain) throw Error('missing app url');
  return domain;
}
