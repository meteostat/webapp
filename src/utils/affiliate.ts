/**
 * Partnerize
 */
const partnerizeId = '1101l446773';
const getPartnerizeBase = (camref: string): string => `https://prf.hn/click/camref:${camref}/[p_id:${partnerizeId}]`;

/**
 * Expedia
 */
const expediaLocales: Record<
  string,
  {
    domain: string;
    camref: string;
  }
> = {
  en: {
    domain: 'www.expedia.com',
    camref: '1011lpjuW'
  },
  de: {
    domain: 'www.expedia.de',
    camref: '1101lpgVG'
  },
  es: {
    domain: 'www.expedia.es',
    camref: '1011lpjvt'
  },
  fr: {
    domain: 'www.expedia.fr',
    camref: '1100lpgQL'
  },
  it: {
    domain: 'www.expedia.it',
    camref: '1101lpgVI'
  },
  pt: {
    domain: 'www.expedia.com.br',
    camref: '1100lpgQM'
  }
};

const getExpediaLocale = (
  lang: string
): {
  domain: string;
  camref: string;
} => expediaLocales[lang] || expediaLocales['en'];

export const getExpediaLink = (lang: string): string => getPartnerizeBase(getExpediaLocale(lang).camref);

export const getHotelsLink = (lang: string, place: string, lat: number, lon: number) => {
  const locale = getExpediaLocale(lang);
  return `${getPartnerizeBase(locale.camref)}/destination:https%3A%2F%2F${
    locale.domain
  }%2FHotel-Search%3Fdestination%3D${encodeURIComponent(place)}&latLong=${lat}%2C${lon}`;
};

export const getFlightsLink = (lang: string) => {
  const locale = getExpediaLocale(lang);
  return `${getPartnerizeBase(locale.camref)}/destination:https%3A%2F%2F${locale.domain}%2FFlights`;
};

export const getCarsLink = (lang: string) => {
  const locale = getExpediaLocale(lang);
  return `${getPartnerizeBase(locale.camref)}/destination:https%3A%2F%2F${locale.domain}%2FCars`;
};

export const getActivitiesLink = (lang: string) => {
  const locale = getExpediaLocale(lang);
  return `${getPartnerizeBase(locale.camref)}/destination:https%3A%2F%2F${locale.domain}%2Fthings-to-do`;
};

/**
 * Awin
 */
const awinId = '1057219';
const getAwinBase = (mid: string) => `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=${awinId}`;

/**
 * Udemy
 */
const udemyLinks: Record<string, string> = {
  en: `${getAwinBase('6554')}&ued=https%3A%2F%2Fwww.udemy.com%2F`,
  de: `${getAwinBase('15924')}&ued=https%3A%2F%2Fwww.udemy.com%2Fde`,
  it: `${getAwinBase('15926')}&ued=https%3A%2F%2Fwww.udemy.com%2Fit`,
  es: `${getAwinBase('15927')}&ued=https%3A%2F%2Fwww.udemy.com%2Fes`,
  nl: `${getAwinBase('15928')}&ued=https%3A%2F%2Fwww.udemy.com%2Fnl`
};

export const getUdemyLink = (lang: string): string => udemyLinks[lang] || udemyLinks['en'];

/**
 * Amazon
 */
const amazonLinks: Record<string, string> = {
  en: 'https://amzn.to/3vDWMYY',
  de: 'https://amzn.to/379PEdt'
};

export const getAmazonLink = (lang: string): string => amazonLinks[lang] || amazonLinks['en'];
