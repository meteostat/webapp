/**
 * SEO metadata shared by the Vue app and the edge worker (worker/index.ts).
 *
 * Keep this module framework-free: it is bundled into the Cloudflare Worker,
 * which cannot import .vue files or vue-i18n.
 */
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '../i18n/locales';

export const SITE_URL = 'https://meteostat.net';
export const SITE_NAME = 'Meteostat';

type Localized = Record<string, string>;

/** Default title and description (home page and pages without specific metadata) */
export const APP_TITLE: Localized = {
  en: "The Weather's Record Keeper",
  de: 'Wetterrückblick und Klimadaten',
  it: 'Il Guardiano del Tempo',
  es: 'El Guardián del Tiempo',
  nl: 'Weerbericht en Klimaatgegevens',
  fr: 'Le Gardien du Temps',
  pt: 'O Recordista Meteorológico',
  ru: 'Записи погоды и данные климата'
};

export const APP_DESCRIPTION: Localized = {
  en: 'Weather and climate database providing detailed weather data for thousands of weather stations and places worldwide.',
  de: 'Wetter- und Klimadatenbank mit detaillierten Wetteraufzeichnungen und Klimastatistiken für tausende Wetterstationen und Orte weltweit.',
  it: 'Banca dati meteorologici e climatici con record meteo dettagliati e statistiche climatiche per migliaia di stazioni meteorologiche e località in tutto il mondo.',
  es: 'Meteostat ofrece informaciones alrededor del tiempo y clima para miles de estaciones meteorológicas.',
  nl: 'Weer- en klimaatdatabase met gedetailleerde weergegevens en klimaatstatistieken voor duizenden weerstations en locaties wereldwijd.',
  fr: 'Base de données météorologiques et climatiques avec des enregistrements météorologiques détaillés pour des milliers de stations météorologiques dans le monde entier.',
  pt: 'Base de dados meteorológicos e climáticos com registos meteorológicos detalhados e estatísticas climáticas para milhares de estações meteorológicas e locais em todo o mundo.',
  ru: 'База данных погоды и климата с детальными записями погоды тысяч метеорологических станций всего мира.'
};

/** Title suffix for station and place dashboards */
export const DASHBOARD_TITLE: Localized = {
  en: 'Weather History & Climate',
  de: 'Wetterrückblick & Klimadaten',
  it: 'Cronologia Meteo',
  es: 'Historial Meteorológico',
  nl: 'Weather History',
  fr: 'Aperçu de la Météo',
  pt: 'História do Tempo',
  ru: 'История погоды'
};

const STATION_DESCRIPTION: Localized = {
  en: 'Historical weather and climate data for the weather station {name} ({country}) with information on temperature, precipitation and more.',
  de: 'Wetterrückblick und Klimadaten für die Wetterstation {name} ({country}) mit Informationen zu Temperatur, Niederschlag und mehr.',
  it: 'Dati meteorologici e climatici storici per la stazione meteo {name} ({country}) con informazioni su temperatura, precipitazioni e altro.',
  es: 'Datos meteorológicos y climáticos históricos de la estación meteorológica {name} ({country}) con información sobre la temperatura, las precipitaciones y mucho más.',
  nl: 'Historische weer- en klimaatgegevens voor het weerstation {name} ({country}) met informatie over temperatuur, neerslag en meer.',
  fr: 'Données météorologiques et climatiques historiques pour la station météorologique {name} ({country}) avec des informations sur la température, les précipitations et plus encore.',
  pt: 'Dados climáticos e meteorológicos históricos para a estação meteorológica {name} ({country}) com informações sobre temperatura, precipitação e muito mais.',
  ru: 'Исторические данные о погоде и климате для метеостанции {name} ({country}) с информацией о температуре, осадках и многом другом.'
};

const PLACE_DESCRIPTION: Localized = {
  en: 'Historical weather and climate data for {name} ({country}) with information on temperature, precipitation and more.',
  de: 'Wetterrückblick und Klimadaten für {name} ({country}) mit Informationen zu Temperatur, Niederschlag und mehr.',
  it: 'Dati meteorologici e climatici storici per {name} ({country}) con informazioni su temperatura, precipitazioni e altro.',
  es: 'Datos históricos del tiempo y del clima para {name} ({country}) con información sobre la temperatura, las precipitaciones y mucho más.',
  nl: 'Historische weer- en klimaatgegevens voor {name} ({country}) met informatie over temperatuur, neerslag en meer.',
  fr: 'Données météorologiques et climatiques historiques pour {name} ({country}) avec des informations sur la température, les précipitations et plus encore.',
  pt: 'Dados climáticos e meteorológicos históricos para {name} ({country}) com informações sobre temperatura, precipitação e muito mais.',
  ru: 'Исторические данные о погоде и климате для {name} ({country}) с информацией о температуре, осадках и многом другом.'
};

function pick(table: Localized, locale: string): string {
  return table[locale] ?? table[DEFAULT_LOCALE];
}

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
}

export function pageTitle(...parts: string[]): string {
  return [...parts.filter(Boolean), SITE_NAME].join(' | ');
}

export const appTitle = (locale: string): string => pageTitle(pick(APP_TITLE, locale));
export const appDescription = (locale: string): string => pick(APP_DESCRIPTION, locale);
export const dashboardTitle = (name: string, locale: string): string => pageTitle(name, pick(DASHBOARD_TITLE, locale));

/** Station names are localized objects ({ en: 'Frankfurt Airport', de: 'Frankfurt Flughafen' }) */
export const stationName = (name: Localized, locale: string): string => pick(name, locale);

export const stationDescription = (name: string, country: string, locale: string): string =>
  fill(pick(STATION_DESCRIPTION, locale), { name, country });

export const placeDescription = (name: string, country: string, locale: string): string =>
  fill(pick(PLACE_DESCRIPTION, locale), { name, country });

/** Absolute URL for a locale and a path without locale prefix ('' or '/station/10637') */
export const localizedUrl = (locale: string, path: string): string => `${SITE_URL}/${locale}${path || '/'}`;

/**
 * hreflang alternates for a path without locale prefix, including the current
 * language and x-default (the unprefixed URL, which redirects by Accept-Language).
 */
export function alternateLinks(path: string): Array<{ rel: string; hreflang: string; href: string }> {
  return [
    ...SUPPORTED_LOCALES.map((locale) => ({ rel: 'alternate', hreflang: locale, href: localizedUrl(locale, path) })),
    { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}${path || '/'}` }
  ];
}
