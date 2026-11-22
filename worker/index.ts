/**
 * Meteostat edge worker
 *
 * Serves the Vite SPA from Workers Static Assets and pre-renders what crawlers
 * that don't execute JavaScript need (search engines, link previews, AI crawlers):
 *
 *  - <title>, description, canonical, hreflang, Open Graph and <html lang>
 *  - a plain-text summary inside #app (replaced by Vue on mount)
 *  - real HTTP status codes: 404 for unknown pages, 301 for legacy URLs
 *
 * Everything the worker injects into <head> is marked with data-edge; the SPA
 * removes those tags on startup and manages <head> itself (src/main.ts).
 *
 * Routes mirror src/router/index.ts — keep both in sync.
 */
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '../src/i18n/locales';
import {
  pageTitle,
  appTitle,
  appDescription,
  dashboardTitle,
  stationName,
  stationDescription,
  placeDescription,
  localizedUrl,
  alternateLinks
} from '../src/seo/meta';
import metaLabels from '../src/components/panels/Meta.i18n.json';

interface Env {
  ASSETS: Fetcher;
  /** Meteostat API base URL (wrangler.jsonc vars; overridable for testing) */
  API_BASE?: string;
}

const DEFAULT_API = 'https://d.meteostat.net';
let API = DEFAULT_API;
const API_TIMEOUT_MS = 4000;
const API_CACHE_TTL = 60 * 60 * 24; // 1 day at the edge

/** Pages that exist in every language (mirrors translateableRoutes in Footer.vue) */
const TRANSLATED_STATIC_PAGES = new Set(['/blog', '/donate', '/patrons', '/about', '/support']);
const UNTRANSLATED_STATIC_PAGES = new Set(['/legal', '/privacy']);

interface PageMeta {
  status: number;
  locale: string;
  title: string;
  description: string;
  /** Path without locale prefix for canonical + og:url; omitted for 404s */
  canonicalPath?: string;
  /** Emit hreflang alternates for canonicalPath */
  translated?: boolean;
  noindex?: boolean;
  og?: { type?: string; image?: string; publishedTime?: string; author?: string };
  /** Trusted HTML placed inside #app for non-JS crawlers */
  body?: string;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (value: unknown): string => String(value ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);

function redirect(location: URL | string, status: 301 | 302, extraHeaders: Record<string, string> = {}): Response {
  return new Response(null, { status, headers: { location: String(location), ...extraHeaders } });
}

function negotiateLocale(request: Request): string {
  const header = request.headers.get('accept-language') ?? '';
  const preferred = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return preferred.find((p) => SUPPORTED_LOCALES.includes(p.lang))?.lang ?? DEFAULT_LOCALE;
}

type ApiResult<T> = { ok: true; data: T | null } | { ok: false };

/**
 * Fetch from the Meteostat API. Distinguishes "does not exist" (ok + null) from
 * "API unavailable" (not ok) so an API outage never turns pages into 404s.
 */
async function api<T>(path: string): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${API}${path}`, {
      cf: { cacheTtl: API_CACHE_TTL, cacheEverything: true },
      signal: AbortSignal.timeout(API_TIMEOUT_MS)
    });
    if (response.status === 404) return { ok: true, data: null };
    if (!response.ok) return { ok: false };
    const json = (await response.json()) as { data?: unknown };
    // Unknown stations return null, unknown places return []
    const data = json?.data && !Array.isArray(json.data) ? (json.data as T) : null;
    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}

function labels(locale: string): Record<string, string> {
  const all = metaLabels as Record<string, Record<string, string>>;
  return all[locale] ?? all[DEFAULT_LOCALE];
}

function factList(rows: Array<[string, unknown]>): string {
  const items = rows
    .filter(([, value]) => value !== null && value !== undefined && value !== '')
    .map(([label, value]) => `<dt>${esc(label)}</dt><dd>${esc(value)}</dd>`)
    .join('');
  return `<dl>${items}</dl>`;
}

/* -------------------------------------------------------------------------- */
/* Page resolvers                                                             */
/* -------------------------------------------------------------------------- */

function defaultPage(locale: string, path: string, translated: boolean): PageMeta {
  return {
    status: 200,
    locale,
    title: appTitle(locale),
    description: appDescription(locale),
    canonicalPath: path,
    translated
  };
}

function notFound(locale: string): PageMeta {
  return { status: 404, locale, title: appTitle(locale), description: appDescription(locale), noindex: true };
}

interface Station {
  id: string;
  name: Record<string, string>;
  country: string;
  region: string | null;
  identifier?: { national?: string; wmo?: string; icao?: string };
  location: { latitude: number; longitude: number; elevation: number | null };
  timezone: string;
  inventory?: Record<string, { start: string | number | null; end: string | number | null }>;
}

async function stationPage(locale: string, id: string): Promise<PageMeta> {
  const path = `/station/${id}`;
  const result = await api<Station>(`/app/proxy/stations/meta?id=${encodeURIComponent(id)}`);
  if (!result.ok) return defaultPage(locale, path, true);
  const station = result.data;
  if (!station?.id) return notFound(locale);

  const name = stationName(station.name, locale);
  const description = stationDescription(name, station.country, locale);
  const l = labels(locale);
  const range = (key: string) => {
    const r = station.inventory?.[key];
    return r?.start && r?.end ? `${r.start} – ${r.end}` : null;
  };

  return {
    status: 200,
    locale,
    title: dashboardTitle(name, locale),
    description,
    canonicalPath: path,
    translated: true,
    body:
      `<h1>${esc(name)}</h1><p>${esc(description)}</p>` +
      factList([
        [l.country, station.country],
        [l.region, station.region],
        [l.elevation, station.location?.elevation != null ? `${station.location.elevation} m` : null],
        [l.timezone, station.timezone],
        [l.coordinates, station.location ? `${station.location.latitude}, ${station.location.longitude}` : null]
      ]) +
      `<h2>${esc(l.stationIdentifiers)}</h2>` +
      factList([
        ['Meteostat', station.id],
        [l.national, station.identifier?.national],
        ['WMO', station.identifier?.wmo],
        ['ICAO', station.identifier?.icao]
      ]) +
      `<h2>${esc(l.inventory)}</h2>` +
      factList([
        [l.hourly, range('hourly')],
        [l.daily, range('daily')]
      ])
  };
}

interface Place {
  id: string;
  name: string;
  country: string;
  region: string | null;
  location: { latitude: number; longitude: number; elevation: number | null };
  timezone: string;
}

async function placePage(locale: string, country: string, id: string): Promise<PageMeta> {
  const path = `/place/${country}/${id}`;
  const result = await api<Place>(
    `/app/place?country=${encodeURIComponent(country)}&id=${encodeURIComponent(id)}&lang=${locale}`
  );
  if (!result.ok) return defaultPage(locale, path, true);
  const place = result.data;
  if (!place?.id) return notFound(locale);

  const description = placeDescription(place.name, place.country, locale);
  const l = labels(locale);

  return {
    status: 200,
    locale,
    title: dashboardTitle(place.name, locale),
    description,
    canonicalPath: `/place/${place.country.toLowerCase()}/${place.id}`,
    translated: true,
    body:
      `<h1>${esc(place.name)}</h1><p>${esc(description)}</p>` +
      factList([
        [l.country, place.country],
        [l.region, place.region],
        [l.elevation, place.location?.elevation != null ? `${place.location.elevation} m` : null],
        [l.timezone, place.timezone],
        [l.coordinates, place.location ? `${place.location.latitude}, ${place.location.longitude}` : null]
      ])
  };
}

interface BlogPost {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  img?: string;
  content?: string;
  author?: { name?: string };
}

async function blogPostPage(locale: string, slug: string): Promise<PageMeta> {
  const path = `/blog/${slug}`;
  const result = await api<BlogPost>(`/cms/blog/post?lang=${locale}&slug=${encodeURIComponent(slug)}`);
  if (!result.ok) return defaultPage(locale, path, false);
  const post = result.data;
  if (!post?.slug) return notFound(locale);

  return {
    status: 200,
    locale,
    title: pageTitle(post.title),
    description: post.excerpt ?? appDescription(locale),
    canonicalPath: path,
    og: { type: 'article', image: post.img, publishedTime: post.date, author: post.author?.name },
    // Post content is HTML from Meteostat's own CMS (also rendered via v-html in BlogPost.vue)
    body: `<article><h1>${esc(post.title)}</h1>${post.content ?? ''}</article>`
  };
}

/** Legacy /place/:placemark URLs → 301 to /place/:country/:id */
async function legacyPlaceRedirect(locale: string, placemark: string, url: URL): Promise<Response | PageMeta> {
  const result = await api<{ id: string; country: string }>(`/app/place?placemark=${encodeURIComponent(placemark)}`);
  // API unavailable: serve the shell (the SPA router resolves it), but never declare the legacy URL canonical
  if (!result.ok) return { ...defaultPage(locale, '', false), canonicalPath: undefined };
  if (!result.data?.id) return notFound(locale);
  return redirect(new URL(`/${locale}/place/${result.data.country.toLowerCase()}/${result.data.id}${url.search}`, url), 301);
}

async function resolvePage(locale: string, path: string, url: URL): Promise<Response | PageMeta> {
  if (path === '/') return defaultPage(locale, '', true);
  if (TRANSLATED_STATIC_PAGES.has(path)) return defaultPage(locale, path, true);
  if (UNTRANSLATED_STATIC_PAGES.has(path)) return defaultPage(locale, path, false);

  const segments = path.slice(1).split('/').map(decodeURIComponent);
  const [section, a, b] = segments;
  const n = segments.length;

  if (section === 'station' && n === 2) return stationPage(locale, a);
  if (section === 'station' && n === 3 && b === 'climate') {
    return redirect(new URL(`/${locale}/station/${encodeURIComponent(a)}${url.search}`, url), 301);
  }
  if (section === 'place' && n === 3 && b !== 'climate') return placePage(locale, a, b);
  if (section === 'place' && (n === 2 || (n === 3 && b === 'climate'))) return legacyPlaceRedirect(locale, a, url);
  if (section === 'blog' && n === 3 && a === 'tag') return defaultPage(locale, path, false);
  if (section === 'blog' && n === 2) return blogPostPage(locale, a);

  return notFound(locale);
}

/* -------------------------------------------------------------------------- */
/* HTML rendering                                                             */
/* -------------------------------------------------------------------------- */

function headTags(meta: PageMeta): string {
  const tags: string[] = [];
  const add = (html: string) => tags.push(html.replace(/^<(\w+)/, '<$1 data-edge'));

  add(`<title>${esc(meta.title)}</title>`);
  add(`<meta name="description" content="${esc(meta.description)}">`);
  add(`<meta property="og:title" content="${esc(meta.title)}">`);
  add(`<meta property="og:description" content="${esc(meta.description)}">`);
  add(`<meta property="og:type" content="${esc(meta.og?.type ?? 'website')}">`);
  add(`<meta name="twitter:card" content="${meta.og?.image ? 'summary_large_image' : 'summary'}">`);
  if (meta.og?.image) add(`<meta property="og:image" content="${esc(meta.og.image)}">`);
  if (meta.og?.author) add(`<meta name="author" content="${esc(meta.og.author)}">`);
  if (meta.og?.publishedTime) add(`<meta property="article:published_time" content="${esc(meta.og.publishedTime)}">`);

  if (meta.canonicalPath !== undefined) {
    const canonical = localizedUrl(meta.locale, meta.canonicalPath);
    add(`<link rel="canonical" href="${esc(canonical)}">`);
    add(`<meta property="og:url" content="${esc(canonical)}">`);
    if (meta.translated) {
      for (const link of alternateLinks(meta.canonicalPath)) {
        add(`<link rel="alternate" hreflang="${link.hreflang}" href="${esc(link.href)}">`);
      }
    }
  }
  return tags.join('');
}

async function renderShell(env: Env, url: URL, meta: PageMeta, isHead: boolean): Promise<Response> {
  // Fresh request without conditional headers, so the asset layer never answers 304
  const shell = await env.ASSETS.fetch(new Request(new URL('/', url)));

  const rewritten = new HTMLRewriter()
    .on('html', {
      element(el) {
        el.setAttribute('lang', meta.locale);
      }
    })
    .on('meta[name="robots"]', {
      element(el) {
        if (meta.noindex) {
          el.setAttribute('content', 'noindex');
          el.setAttribute('data-edge', '');
        }
      }
    })
    .on('head', {
      element(el) {
        el.append(headTags(meta), { html: true });
      }
    })
    .on('#app', {
      element(el) {
        if (meta.body) el.setInnerContent(`<main class="container py-4">${meta.body}</main>`, { html: true });
      }
    })
    .transform(shell);

  const headers = new Headers(rewritten.headers);
  headers.set('content-type', 'text/html; charset=utf-8');
  headers.set('cache-control', 'public, max-age=0, must-revalidate');
  headers.delete('etag'); // content now depends on the URL, not just index.html
  headers.delete('content-length');

  return new Response(isHead ? null : rewritten.body, { status: meta.status, headers });
}

/* -------------------------------------------------------------------------- */
/* Entry                                                                      */
/* -------------------------------------------------------------------------- */

export default {
  async fetch(request, env): Promise<Response> {
    API = env.API_BASE || DEFAULT_API;
    const url = new URL(request.url);

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return env.ASSETS.fetch(request);
    }

    // www.meteostat.net → meteostat.net
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return redirect(url, 301);
    }

    // Files (anything with an extension) are served as-is
    if (/\.[a-z0-9]+$/i.test(url.pathname)) {
      return env.ASSETS.fetch(request);
    }

    // Strip trailing slashes, except for locale home pages (/en/)
    if (url.pathname.length > 1 && url.pathname.endsWith('/') && !/^\/[a-z]{2}\/$/.test(url.pathname)) {
      url.pathname = url.pathname.replace(/\/+$/, '') || '/';
      return redirect(url, 301);
    }

    const [, first = '', ...rest] = url.pathname.split('/');

    // No locale prefix → redirect by Accept-Language (302, since it depends on the visitor)
    if (!SUPPORTED_LOCALES.includes(first)) {
      const locale = negotiateLocale(request);
      const path = url.pathname === '/' ? '/' : url.pathname;
      return redirect(new URL(`/${locale}${path}${url.search}`, url), 302, { vary: 'Accept-Language' });
    }

    // /en → /en/
    if (rest.length === 0) {
      url.pathname = `/${first}/`;
      return redirect(url, 301);
    }

    const locale = first;
    const path = '/' + rest.join('/');
    const page = await resolvePage(locale, path === '/' ? '/' : path, url);

    if (page instanceof Response) return page;
    return renderShell(env, url, page, request.method === 'HEAD');
  }
} satisfies ExportedHandler<Env>;
