<template>
  <div class="d-flex flex-column h-100">
    <!-- Navbar -->
    <Navbar />

    <!-- Router View -->
    <main class="flex-shrink-0">
      <router-view :key="$route.path" />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Loading Animation -->
    <div class="loading-overlay d-none align-items-center justify-content-center">
      <svg
        width="120"
        height="30"
        viewBox="0 0 120 30"
        xmlns="http://www.w3.org/2000/svg"
        fill="#0678BE"
      >
        <circle
          cx="15"
          cy="15"
          r="15"
        >
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="60"
          cy="15"
          r="9"
          fill-opacity="0.3"
        >
          <animate
            attributeName="r"
            from="9"
            to="9"
            begin="0s"
            dur="0.8s"
            values="9;15;9"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="0.5"
            to="0.5"
            begin="0s"
            dur="0.8s"
            values=".5;1;.5"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="105"
          cy="15"
          r="15"
        >
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  </div>

  <!-- Cookie Modal -->
  <ClientOnly>
    <CookieModal v-if="!settings.returning" />
  </ClientOnly>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { useSettingsStore } from '~/stores/settings'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

/**
 * Async Components
 */
const CookieModal = defineAsyncComponent(() =>
  import('~/components/CookieModal.vue')
)

export default defineComponent({
  name: 'App',

  components: {
    Navbar,
    Footer,
    CookieModal
  },

  setup(): Record<string, any> {
    const { t } = useI18n()
    const settings = useSettingsStore()

    useHead({
      title: `${t('$meta.title')} | Meteostat`,
      meta: [
        {
          name: 'description',
          content: t('$meta.description') 
        }
      ],
    })

    return { t, settings }
  }
})
</script>

<style lang="scss" scoped>
body {
  &.loading {
    .loading-overlay {
      display: flex !important;
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99999;
    }
  }
}
</style>

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
      "title": "Die Historie des Wetters",
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