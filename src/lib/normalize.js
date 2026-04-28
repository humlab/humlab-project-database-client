const VIDEO_FILE_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];

export function normalizeMediaUrl(rawUrl) {
  if (typeof rawUrl !== 'string') {
    return '';
  }

  const url = rawUrl.trim();

  if (!url) {
    return '';
  }

  if (url.startsWith('data:')) {
    return url;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (url.startsWith('//')) {
    const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
    return `${protocol}${url}`;
  }

  if (/^(\.\.\/|\.\/)+assets\//i.test(url)) {
    return `/${url.replace(/^(\.\.\/|\.\/)+/i, '')}`;
  }

  if (/^assets\//i.test(url)) {
    return `/${url}`;
  }

  if (/^\/assets\//i.test(url)) {
    return url;
  }

  return url;
}

export function getVideoMode(url) {
  if (!url) {
    return 'none';
  }

  const normalized = normalizeMediaUrl(url).toLowerCase();

  if (normalized.includes('youtube.com/channel/')) {
    return 'link';
  }

  if (VIDEO_FILE_EXTENSIONS.some((ext) => normalized.includes(ext))) {
    return 'video';
  }

  if (
    normalized.includes('youtube.com/embed/') ||
    normalized.includes('player.vimeo.com') ||
    normalized.includes('kaltura') ||
    normalized.includes('play.umu.se')
  ) {
    return 'iframe';
  }

  if (/^https?:\/\//i.test(normalized)) {
    return 'link';
  }

  return 'video';
}

export function shortText(value, max = 140) {
  if (typeof value !== 'string') {
    return '';
  }

  const text = value.trim().replace(/\s+/g, ' ');

  if (text.length <= max) {
    return text;
  }

  return `${text.slice(0, max).trim()}...`;
}

export function splitParagraphs(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return [];
  }

  return value
    .split(/\n{2,}|\r\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}
