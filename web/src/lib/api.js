import { getVideoMode, normalizeMediaUrl } from './normalize.js';

const DEFAULT_API_PORT = 3100;

function asArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeImage(image) {
  return {
    url: normalizeMediaUrl(image?.url),
    alt: cleanText(image?.alt),
    caption: cleanText(image?.caption),
    cover: Boolean(image?.cover)
  };
}

function normalizeVideo(video) {
  const url = normalizeMediaUrl(video?.url);

  return {
    url,
    alt: cleanText(video?.alt),
    caption: cleanText(video?.caption),
    mode: getVideoMode(url)
  };
}

function normalizeLink(link) {
  return {
    label: cleanText(link?.label) || cleanText(link?.name) || 'Open link',
    url: normalizeMediaUrl(link?.url || link?.link)
  };
}

function normalizePerson(person) {
  return {
    name: cleanText(person?.name),
    association: cleanText(person?.association),
    link: normalizeMediaUrl(person?.link),
    profileImage: normalizeMediaUrl(person?.profileImage)
  };
}

function normalizePartner(entry) {
  return {
    name: cleanText(entry?.name),
    logo: normalizeMediaUrl(entry?.logo),
    link: normalizeMediaUrl(entry?.link || entry?.url),
    type: cleanText(entry?.type)
  };
}

function normalizeSummaryMedia(item) {
  if (!item) {
    return null;
  }

  const url = normalizeMediaUrl(item.url);

  if (!url) {
    return null;
  }

  return {
    url,
    alt: cleanText(item.alt),
    caption: cleanText(item.caption),
    cover: Boolean(item.cover),
    mode: getVideoMode(url)
  };
}

function normalizeProject(detail, summary, order) {
  const images = asArray(detail?.images).map(normalizeImage).filter((image) => image.url);
  const videos = asArray(detail?.videos).map(normalizeVideo).filter((video) => video.url);

  const summaryCover = normalizeSummaryMedia(summary?.cover_image);
  const summarySideImage = normalizeSummaryMedia(summary?.side_image);
  const summarySideVideo = normalizeSummaryMedia(summary?.side_video);

  const coverImage = images.find((image) => image.cover) || summaryCover || images[0] || null;

  return {
    id: cleanText(detail?.id) || cleanText(summary?.id),
    title: cleanText(detail?.title) || cleanText(summary?.title) || 'Untitled project',
    subtitle: cleanText(detail?.subtitle),
    description: cleanText(detail?.description) || cleanText(summary?.description),
    pullQuote: cleanText(detail?.pullQuote),
    longText: cleanText(detail?.longText),
    visible: detail?.visible !== false,
    order,
    coverImage,
    sideImage: summarySideImage || images[1] || coverImage,
    sideVideo: summarySideVideo || videos[0] || null,
    images,
    videos,
    links: asArray(detail?.links).map(normalizeLink).filter((link) => link.url),
    people: asArray(detail?.people).map(normalizePerson).filter((person) => person.name),
    cooperationPartners: asArray(detail?.cooperation_partners)
      .map(normalizePartner)
      .filter((entry) => entry.name),
    infrastructures: asArray(detail?.infrastructures).map(normalizePartner).filter((entry) => entry.name),
    financiers: asArray(detail?.financier).map(normalizePartner).filter((entry) => entry.name)
  };
}

export function getApiBaseUrl() {
  const fromEnv = cleanText(import.meta.env.VITE_API_BASE_URL);

  if (fromEnv) {
    return fromEnv.replace(/\/+$/, '');
  }

  if (typeof window === 'undefined') {
    return `http://localhost:${DEFAULT_API_PORT}`;
  }

  return `${window.location.protocol}//${window.location.hostname}:${DEFAULT_API_PORT}`;
}

async function requestJson(path) {
  const response = await fetch(`${getApiBaseUrl()}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchProjectsWithDetails() {
  const summaries = await requestJson('/projects');
  const summaryList = asArray(summaries);

  const details = await Promise.allSettled(
    summaryList.map((summary) => requestJson(`/project/${encodeURIComponent(summary.id)}`))
  );

  return summaryList
    .map((summary, index) => {
      const detailResult = details[index];
      const detail = detailResult?.status === 'fulfilled' ? detailResult.value : {};
      return normalizeProject(detail, summary, index);
    })
    .filter((project) => project.id && project.visible);
}
