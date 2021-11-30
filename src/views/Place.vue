<template>
  <div v-if="meta?.id">
    <!-- Navbar -->
    <Navbar
      :id="$route.params.id"
      ref="subnav"
      type="place"
      :name="meta.name[$locale] || meta.name['en']"
      :country="meta.country"
    />
    <!-- Content -->
    <div class="container my-3 my-lg-4">
      <div class="row gy-4">
        <div class="col-12 col-lg-8">
          <!-- Weather History -->
          <template v-if="$route.name === 'PlaceHistory'">
            <History
              :name="meta.name[$locale] || meta.name['en']"
              :lat="coords[0]"
              :lon="coords[1]"
              :alt="meta.location.elevation"
              :tz="meta.timezone"
            />
          </template>
          <!-- Climate Data -->
          <template v-if="$route.name === 'PlaceClimate'">
            <Climate
              :name="meta.name[$locale] || meta.name['en']"
              :lat="coords[0]"
              :lon="coords[1]"
              :alt="meta.location.elevation"
            />
          </template>
        </div>
        <div class="col-12 col-lg-4">
          <!-- Meta Data -->
          <Meta :data="meta" />
          <!-- Nearby Stations -->
          <Nearby
            :lat="coords[0]"
            :lon="coords[1]"
          />
          <!-- Ads -->
          <div class="sticky-top pb-3 pb-md-0 pt-3">
            <Ad slot="3216865845" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { useContext } from 'vitedge'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { format } from 'date-fns'
import { decodePlacemark } from '~/utils/placemarks'
import Navbar from '../components/LocationNavbar.vue'
import Meta from '../components/panels/Meta.vue'
import Nearby from '../components/panels/Nearby.vue'
import Ad from '~/components/Ad.vue'

/**
 * Async Components
 */
const Climate = defineAsyncComponent(() =>
  import('~/components/climate/Climate.vue')
)
const History = defineAsyncComponent(() =>
  import('~/components/history/History.vue')
)

export default defineComponent({
  name: 'Place',

  components: {
    Navbar,
    Meta,
    Nearby,
    History,
    Climate,
    Ad
  },

  props: {
    place: {
      type: Object,
      default: null
    }
  },

  setup(props: Record<string, any>): Record<string, any> {
    const { t, locale } = useI18n()

    if (props.place?.id) {
      // Meta tags
      useHead({
        meta: [
          {
            name: 'description',
            content: t('$meta.description', {
              name: props.place.name[locale.value] || props.place.name['en'],
              country: props.place.country
            })
          }
        ],
        link: [
          {
            rel: 'canonical',
            href: `https://meteostat.net/${locale.value}/place/${props.place.id}`
          }
        ]
      })
    }
    else if (import.meta.env.SSR) {
      const { writeResponse } = useContext()
      writeResponse({ status: 404 })
    }

    return { format }
  },

  data(): Record<string, any> {
    return {
      meta: this.place || null,
      nearbyStations: []
    }
  },

  computed: {
    coords(): Array<number> {
      return decodePlacemark(String(this.$route.params.id))
    }
  },

  async mounted(): Promise<void> {
    if (!this.place) {
      await this.fetchMetaData()
    }
  },

  methods: {
    /**
     * Fetch place meta data
     */
    async fetchMetaData(): Promise<void> {
      await fetch(`${this.$api}/app/place?id=${this.$route.params.id}`)
        .then(response => response.json())
        .then(data => this.meta = data.data)
        .catch(() => {
          this.$router.replace({
            name: 'Home'
          })
        })
    }
  },
})
</script>

<i18n>
{
  "en": {
    "$meta": {
      "description": "Historical weather and climate data for {name} ({country}) with information on temperature, precipitation and more."
    }
  },
  "de": {
    "$meta": {
      "description": "Wetterrückblick und Klimadaten für {name} ({country}) mit Informationen zu Temperatur, Niederschlag und mehr."
    }
  },
  "it": {
    "$meta": {
      "description": "Dati meteorologici e climatici storici per {name} ({country}) con informazioni su temperatura, precipitazioni e altro."
    }
  },
  "es": {
    "$meta": {
      "description": "Datos históricos del tiempo y del clima para {name} ({country}) con información sobre la temperatura, las precipitaciones y mucho más."
    }
  },
  "nl": {
    "$meta": {
      "description": "Historische weer- en klimaatgegevens voor {name} ({country}) met informatie over temperatuur, neerslag en meer."
    }
  },
  "fr": {
    "$meta": {
      "description": "Données météorologiques et climatiques historiques pour {name} ({country}) avec des informations sur la température, les précipitations et plus encore."
    }
  },
  "pt": {
    "$meta": {
      "description": "Dados climáticos e meteorológicos históricos para {name} ({country}) com informações sobre temperatura, precipitação e muito mais."
    }
  },
  "ru": {
     "$meta": {
      "description": "Исторические данные о погоде и климате для {name} ({country}) с информацией о температуре, осадках и многом другом."
    }   
  }
}
</i18n>