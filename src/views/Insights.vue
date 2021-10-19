<template>
  <div class="container py-4">
    <div class="p-5 mb-4 text-white bg-header rounded-3">
      <div class="container-fluid">
        <h1 class="display-5 fw-bold">
          {{ t('$title') }}
        </h1>
        <p class="col-md-8 fs-4">
          {{ t('$description') }}
        </p>
      </div>
    </div>

    <div class="mb-4 text-center">
      <Ad />
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div
        v-for="(item, key) in items"
        :key="key"
        class="col cursor-pointer"
        @click="open(item)"
      >
        <div class="card h-100">
          <img
            :src="item.cover"
            class="card-img-top insight-img"
            :alt="item.title"
            loading="lazy"
          >
          <div class="card-body">
            <p class="card-text d-flex align-items-center">
              <span
                v-if="item.lang !== $locale"
                class="badge border border-dark text-dark fw-bold text-uppercase me-2"
              >
                {{ item.lang }}
              </span>
              <span class="badge bg-primary border border-primary fw-bold text-uppercase me-2">
                {{ item.topic }}
              </span>
              <span class="ms-auto">
                {{ format(parseISO(item.date), t('dateFormat')) }}
              </span>
            </p>            
            <h5 class="card-title">
              {{ item.title }}
            </h5>
            <p class="card-text">
              {{ item.teaser }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { parseISO, format } from 'date-fns'
import Ad from '~/components/Ad.vue'

export default defineComponent({
  name: 'Insights',

  components: {
    Ad
  },

  props: {
    insights: {
      type: Array,
      default: null
    }
  },

  setup(): Record<string, any> {
    const { t } = useI18n()

    useHead({
      title: `${t('$meta.title')} | Meteostat`,
      meta: [
        {
          name: 'description',
          content: t('$meta.description')
        }
      ],
    })

    return { t, parseISO, format }
  },

  data() {
    return {
      items: this.insights || null
    }
  },

  async mounted(): Promise<void> {
    if (!this.items) {
      // Get insights articles
      await this.fetchItems()
    }
  },

  methods: {
    /**
     * Fetch items
     */
    async fetchItems(): Promise<void> {
      await fetch(`${this.$api}/cms/insights/latest?lang=${this.$locale}&limit=9`)
        .then(response => response.json())
        .then(data => this.items = data.data)
    },
    open(insight: any) {
      // Get year & month
      const year = insight.date.substr(0, 4)
      const month = insight.date.substr(5, 2)
      // Navigate
      if (insight.lang === this.$locale) {
        this.$router.push({
          path: `/insights/${year}/${month}/${insight.slug}`
        })
      } else {
        window.location.href = `${window.origin}/${insight.lang}/insights/${year}/${month}/${insight.slug}`
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.bg-header {
  background: linear-gradient(to right, #0678be, #2eabf8);
}

.cursor-pointer {
  cursor: pointer;
}

.insight-img {
  height: 250px;
  object-fit: cover;
}
</style>

<i18n>
{
  "en": {
    "$meta": {
      "title": "Insights",
      "description": "Gain insights into the stories behind our data and learn more about weather, climate and Meteostat."
    },
    "$title": "Meteostat Insights",
    "$description": "Gain insights into the stories behind our data and learn more about weather, climate and Meteostat."
  },
  "de": {
    "$meta": {
      "title": "Insights",
      "description": "Gewinnen Sie Einblicke in die Geschichten hinter unseren Daten und erfahren Sie mehr über Wetter, Klima und Meteostat."
    },
    "$title": "Meteostat Insights",
    "$description": "Gewinnen Sie Einblicke in die Geschichten hinter unseren Daten und erfahren Sie mehr über Wetter, Klima und Meteostat."
  },
  "it": {
    "$meta": {
      "title": "Insights",
      "description": "Approfondisci le storie dietro i nostri dati e impara di più su meteo, clima e Meteostat."
    },
    "$title": "Meteostat Insights",
    "$description": "Approfondisci le storie dietro i nostri dati e impara di più su meteo, clima e Meteostat."
  },
  "es": {
    "$meta": {
      "title": "Insights",
      "description": "Conozca las historias que hay detrás de nuestros datos y aprenda más sobre el tiempo, el clima y Meteostat."
    },
    "$title": "Meteostat Insights",
    "$description": "Conozca las historias que hay detrás de nuestros datos y aprenda más sobre el tiempo, el clima y Meteostat."
  },
  "nl": {
    "$meta": {
      "title": "Insights",
      "description": "Krijg inzicht in de verhalen achter onze gegevens en kom meer te weten over weer, klimaat en Meteostat."
    },
    "$title": "Meteostat Insights",
    "$description": "Krijg inzicht in de verhalen achter onze gegevens en kom meer te weten over weer, klimaat en Meteostat."
  },
  "fr": {
    "$meta": {
      "title": "Insights",
      "description": "Découvrez les histoires qui se cachent derrière nos données et apprenez-en davantage sur la météo, le climat et Meteostat."
    },
    "$title": "Meteostat Insights",
    "$description": "Découvrez les histoires qui se cachent derrière nos données et apprenez-en davantage sur la météo, le climat et Meteostat."
  },
  "pt": {
    "$meta": {
      "title": "Insights",
      "description": "Obtenha informações sobre as histórias por detrás dos nossos dados e saiba mais sobre o tempo, o clima e o Meteostat."
    },
    "$title": "Meteostat Insights",
    "$description": "Obtenha informações sobre as histórias por detrás dos nossos dados e saiba mais sobre o tempo, o clima e o Meteostat."
  },
  "ru": {
    "$meta": {
      "title": "Insights",
      "description": "Познакомьтесь с историями, стоящими за нашими данными, и узнайте больше о погоде, климате и Meteostat."
    },
    "$title": "Meteostat Insights",
    "$description": "Познакомьтесь с историями, стоящими за нашими данными, и узнайте больше о погоде, климате и Meteostat."    
  }
}
</i18n>