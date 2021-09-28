export const SUPPORTED_LANGUAGES = [
  {
    locale: 'en',
    name: 'English',
    default: true,
  },
  {
    locale: 'de',
    name: 'Deutsch'
  },
  {
    locale: 'it',
    name: 'Italiano'
  },
  {
    locale: 'es',
    name: 'Español'
  },
  {
    locale: 'nl',
    name: 'Nederlands'
  },
  {
    locale: 'fr',
    name: 'Français'
  },
  {
    locale: 'pt',
    name: 'Português'
  }
]

export const SUPPORTED_LOCALES = SUPPORTED_LANGUAGES.map((l) => l.locale)

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.find((l) => l.default)

export const DEFAULT_LOCALE = DEFAULT_LANGUAGE?.locale as string

export function extractLocaleFromPath(path = ''): string {
  const [_, maybeLocale] = path.split('/')
  return SUPPORTED_LOCALES.includes(maybeLocale) ? maybeLocale : DEFAULT_LOCALE
}