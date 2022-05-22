<template>
  <div class="d-flex flex-column h-100">
    <!-- Loading Animation -->
    <div class="loading-overlay d-none">
      <div class="spinner-border text-primary" role="status" />
    </div>

    <!-- Navbar -->
    <Navbar />

    <!-- Router View -->
    <main class="flex-shrink-0">
      <router-view :key="$route.path" />
    </main>

    <!-- Footer -->
    <Footer />
  </div>

  <!-- Cookie Modal -->
  <ClientOnly>
    <CookieModal v-if="!settings.returning" />
  </ClientOnly>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@vueuse/head';
import { useSettingsStore } from '~/stores/settings';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

/**
 * Async Components
 */
const CookieModal = defineAsyncComponent(() => import('~/components/CookieModal.vue'));

export default defineComponent({
  name: 'App',

  components: {
    Navbar,
    Footer,
    CookieModal
  },

  setup(): Record<string, any> {
    const { t, locale } = useI18n();
    const settings = useSettingsStore();

    useHead({
      title: `${t('$meta.title')} | Meteostat`,
      meta: [
        {
          name: 'description',
          content: t('$meta.description')
        }
      ],
      htmlAttrs: {
        lang: locale
      }
    });

    return { t, settings };
  },

  mounted() {
    this.$nextTick(() => {
      document.body.removeAttribute('style');
      this.$loaded();
    });
  }
});
</script>

<i18n>
{
  "en": {
    "$meta": {
      "title": "The Weather's Record Keeper",
      "description": "Weather and climate database providing detailed weather data for thousands of weather stations and places worldwide."
    }
  },
  "de": {
    "$meta": {
      "title": "Wetterrückblick und Klimadaten",
      "description": "Wetter- und Klimadatenbank mit detaillierten Wetteraufzeichnungen und Klimastatistiken für tausende Wetterstationen und Orte weltweit."
    }
  },
  "it": {
    "$meta": {
      "title": "Il Guardiano del Tempo",
      "description": "Banca dati meteorologici e climatici con record meteo dettagliati e statistiche climatiche per migliaia di stazioni meteorologiche e località in tutto il mondo."
    }
  },
  "es": {
    "$meta": {
      "title": "El Guardián del Tiempo",
      "description": "Meteostat ofrece informaciones alrededor del tiempo y clima para miles de estaciones meteorológicas."
    }
  },
  "nl": {
    "$meta": {
      "title": "Weerbericht en Klimaatgegevens",
      "description": "Weer- en klimaatdatabase met gedetailleerde weergegevens en klimaatstatistieken voor duizenden weerstations en locaties wereldwijd."
    }
  },
  "fr": {
    "$meta": {
      "title": "Le Gardien du Temps",
      "description": "Base de données météorologiques et climatiques avec des enregistrements météorologiques détaillés pour des milliers de stations météorologiques dans le monde entier."
    }
  },
  "pt": {
    "$meta": {
      "title": "O Recordista Meteorológico",
      "description": "Base de dados meteorológicos e climáticos com registos meteorológicos detalhados e estatísticas climáticas para milhares de estações meteorológicas e locais em todo o mundo."
    }
  },
  "ru": {
    "$meta": {
      "title": "Записи погоды и данные климата",
      "description": "База данных погоды и климата с детальными записями погоды тысяч метеорологических станций всего мира."
    }    
  }
}
</i18n>
