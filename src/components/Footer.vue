<template>
  <footer class="footer mt-auto py-3 bg-light">
    <div class="container-fluid p-3 p-md-5">
      <ul class="d-md-flex align-items-center text-center flex-wrap pb-4 m-0">
        <li class="d-inline-block">
          <router-link to="/about">
            {{ t('aboutMeteostat') }}
          </router-link>
        </li>
        <li class="d-inline-block ms-3">
          <a href="https://dev.meteostat.net">
            {{ t('developers') }}
          </a>
        </li>
        <li class="d-inline-block ms-3">
          <a href="https://blog.meteostat.net">
            {{ t('blog') }}
          </a>
        </li>
        <li class="d-block mt-3 my-md-0 ms-md-4">
          <router-link
            to="/support"
            tag="button"
            class="btn btn-light bg-transparent btn-sm border w-100"
            data-toggle="modal"
            data-target="#contact"
          >
            <icon :icon="['fas', 'comment-alt']" class="me-2" />
            {{ t('support') }}
          </router-link>
        </li>
        <li class="w-100 d-md-none" />
        <li class="d-inline-block mt-3 mt-md-0 ms-md-auto fs-4">
          <a href="https://twitter.com/meteost" v-tooltip="'Twitter'">
            <icon :icon="['fab', 'twitter']" />
          </a>
        </li>
        <li class="d-inline-block mt-3 mt-md-0 ms-3 fs-4">
          <a href="https://medium.com/meteostat" v-tooltip="t('blog')">
            <icon :icon="['fab', 'medium']" />
          </a>
        </li>
        <li class="d-inline-block mt-3 mt-md-0 ms-3 fs-4">
          <a href="https://github.com/meteostat" v-tooltip="'GitHub'">
            <icon :icon="['fab', 'github']" />
          </a>
        </li>
        <li class="d-inline-block mt-3 mt-md-0 ms-3 fs-4">
          <a href="https://www.linkedin.com/company/meteostat/" v-tooltip="'LinkedIn'">
            <icon :icon="['fab', 'linkedin']" />
          </a>
        </li>
        <li class="d-inline-block mt-3 mt-md-0 ms-3 fs-4">
          <a href="https://www.patreon.com/meteostat" v-tooltip="'Patreon'">
            <icon :icon="['fab', 'patreon']" />
          </a>
        </li>
      </ul>
      <div class="mb-3">
        <span class="me-2"> {{ t('language') }}: </span>
        <div class="dropdown d-inline">
          <a class="dropdown-toggle" data-bs-toggle="dropdown">
            {{ lang.name }}
          </a>
          <div class="dropdown-menu">
            <a v-for="language in languages" :key="language" class="dropdown-item" :href="i18nLink(language.locale)">
              {{ language.name }}
            </a>
          </div>
        </div>
      </div>
      <i18n-t keypath="$legal" tag="small">
        <template #legal>
          <a :href="t('$legalLink')">
            {{ t('legalDisclosure') }}
          </a>
        </template>
        <template #privacy>
          <a :href="t('$privacyLink')">
            {{ t('privacy') }}
          </a>
        </template>
      </i18n-t>
      <br />
      <i18n-t keypath="$sources" tag="small">
        <template #noaa>
          <a href="http://www.noaa.gov/" target="_blank" rel="noreferrer nofollow"> NOAA </a>
        </template>
        <template #dwd>
          <a href="https://www.dwd.de/" target="_blank" rel="noreferrer nofollow"> Deutscher Wetterdienst </a>
        </template>
        <template #ec>
          <a href="https://weather.gc.ca/" target="_blank" rel="noreferrer nofollow"> Environment Canada </a>
        </template>
        <template #sources>
          <a href="https://dev.meteostat.net/sources.html">
            {{ t('sources') }}
          </a>
        </template>
      </i18n-t>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useRouter, useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';
import { SUPPORTED_LANGUAGES } from '~/i18n/locales';

export default defineComponent({
  name: 'Footer',

  setup(): Record<string, any> {
    const router = useRouter();
    const route = useRoute();
    const { t, locale } = useI18n();

    // Get current language
    const languages = SUPPORTED_LANGUAGES;
    const lang = languages.filter((l) => l.locale === locale.value)[0];

    // Translateable routes
    const translateableRoutes = ['Home', 'Station', 'Place', 'Blog', 'Patrons', 'About', 'Support'];

    // Current router path
    let path: Ref<string | null> = ref(null);

    const updatePath = (to: RouteLocationNormalizedLoaded) => {
      path.value = translateableRoutes.includes(String(to.name)) ? String(to.path) : null;
    };

    router.beforeEach(updatePath);
    updatePath(route);

    // Get alternate i18n links
    const i18nLink = (l: string): string => {
      return path.value ? `/${l}${path.value}` : `/${l}`;
    };

    // Add alternate links
    const alternates = languages
      .filter((l) => l.locale !== locale.value)
      .map((l): any => {
        return {
          rel: 'alternate',
          hreflang: l.locale,
          href: `https://meteostat.net${i18nLink(l.locale)}`
        };
      });

    if (path.value) {
      useHead({
        link: alternates
      });
    }

    return { t, lang, languages, i18nLink };
  }
});
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/functions';
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';

footer {
  border-top: 1px solid #eee;
  font-size: 85%;
}

footer a {
  font-weight: 500;
  color: $dark;
}

footer a:hover {
  color: $blue;
}

footer ul {
  list-style: none;
  padding-left: 0;
}

footer ul a > i {
  font-size: 24px;
}
</style>

<i18n>
{
  "en": {
    "aboutMeteostat": "About Meteostat",
    "developers": "Developers",
    "language": "Language",
    "legalDisclosure": "Legal Disclosure",
    "privacy": "Privacy",
    "sources": "sources",
    "$legal": "Copyright © Meteostat. {legal} & {privacy}.",
    "$sources": "Weather data provided by {noaa}, {dwd} and {ec}. Learn more about our {sources}.",
    "$legalLink": "/en/legal",
    "$privacyLink": "/en/privacy"
  },
  "de": {
    "aboutMeteostat": "Über Meteostat",
    "developers": "Entwickler",
    "language": "Sprache",
    "legalDisclosure": "Impressum",
    "privacy": "Datenschutz",
    "sources": "Quellen",
    "$legal": "Copyright © Meteostat. {legal} & {privacy}.",
    "$sources": "Wetterdaten bereitgestellt von {noaa}, {dwd} und {ec}. Erfahren Sie mehr über unsere {sources}.",
    "$legalLink": "/de/legal",
    "$privacyLink": "/de/privacy"
  },
  "it": {
    "aboutMeteostat": "Su Meteostat",
    "developers": "Sviluppatori",
    "language": "Lingua",
    "legalDisclosure": "Divulgazione Legale",
    "privacy": "Privacy",
    "sources": "fonti",
    "$legale": "Copyright © Meteostat. {legal} & {privacy}.",
    "$fonti": "Dati meteo forniti da {noaa}, {dwd} e {ec}. Scopri di più sulle nostre {sources}.",
    "$legalLink": "/en/legal",
    "$privacyLink": "/en/privacy"
  },
  "es": {
    "aboutMeteostat": "Acerca de Meteostat",
    "developers": "Desarrolladores",
    "language": "Idioma",
    "legalDisclosure": "Información Legal",
    "privacy": "Privacidad",
    "sources": "fuentes",
    "legal": "Copyright © Meteostat. {legal} & {privacy}",
    "$sources": "Datos meteorológicos proporcionados por {noaa}, {dwd} y {ec}. Más información sobre nuestras {sources}.",
    "$legalLink": "/en/legal",
    "$privacyLink": "/en/privacy"
  },
  "nl": {
    "aboutMeteostat": "Over Meteostat",
    "developers": "Developers",
    "language": "Language",
    "legalDisclosure": "Wettelijke Openbaarmaking",
    "privacy": "Privacy",
    "sources": "bronnen",
    "$legal": "Copyright © Meteostat. {legal} & {privacy}.",
    "$sources": "Weergegevens verstrekt door {noaa}, {dwd} en {ec}. Meer informatie over onze {sources}.",
    "$legalLink": "/en/legal",
    "$privacyLink": "/en/privacy"
  },
  "fr": {
    "aboutMeteostat" : "A Propos de Meteostat",
    "developers" : "Développeurs",
    "language" : "Langue",
    "legalDisclosure" : "Divulgation Légale",
    "privacy" : "Vie Privée",
    "sources" : "sources",
    "$legal" : "Copyright © Meteostat. {legal} & {privacy}.",
    "$sources" : "Données météorologiques fournies par {noaa}, {dwd} et {ec}. En savoir plus sur nos {sources}.",
    "$legalLink": "/en/legal",
    "$privacyLink": "/en/privacy"
  },
  "pt": {
    "aboutMeteostat": "Sobre o Meteostat",
    "developers": "Desenvolvedores",
    "language": "Linguagem",
    "legalDisclosure": "Divulgação Jurídica",
    "privacy": "Privacidade",
    "sources": "fontes",
    "$legal": "Copyright © Meteostat. {legal} & {privacy}.",
    "$sources": "Dados meteorológicos fornecidos por {noaa}, {dwd} e {ec}. Saiba mais sobre as nossas {sources}.",
    "$legalLink": "/en/legal",
    "$privacyLink": "/en/privacy"
  },
  "ru": {
    "aboutMeteostat": "О Мeteostat",
    "developers": "Разработчики",
    "language": "Язык",
    "legalDisclosure": "Юридическое раскрытие",
    "privacy": "Конфиденциальность",
    "sources": "источники",
    "$legal": "Copyright © Meteostat. {legal} & {privacy}.",
    "$sources": "Погодные данные предоставлены {noaa}, {dwd} и {ec}. Узнайте больше о наших {sources}.",
    "$legalLink": "/en/legal",
    "$privacyLink": "/en/privacy"
  }
}
</i18n>
