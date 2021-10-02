<template>
  <div v-if="meta?.id">
    <!-- Navbar -->
    <Navbar
      :id="meta.id"
      ref="subnav"
      type="station"
      :name="meta.name.en"
      :country="meta.country"
    />
    <!-- Content -->
    <div class="container my-3 my-lg-4">
      <div class="row gy-4">
        <div class="col-12 col-lg-8">
          <!-- Weather History -->
          <template v-if="$route.name === 'StationHistory'">
            <History
              :name="meta.name[$locale] || meta.name['en']"
              :station="meta.id"
              :lat="meta.location.latitude"
              :lon="meta.location.longitude"
              :tz="meta.timezone"
            />
          </template>
          <!-- Climate Data -->
          <template v-if="$route.name === 'StationClimate'">
            <Climate
              :name="meta.name[$locale] || meta.name['en']"
              :station="meta.id"
            />
          </template>
        </div>
        <div class="col-12 col-lg-4">
          <!-- Meta Data -->
          <Meta :data="meta" />
          <!-- Nearby Stations -->
          <Nearby
            :lat="meta.location.latitude"
            :lon="meta.location.longitude"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { format } from 'date-fns'
import Navbar from '~/components/LocationNavbar.vue'
import Meta from '~/components/panels/Meta.vue'
import Nearby from '~/components/panels/Nearby.vue'
import Climate from '~/components/climate/Climate.vue'
import History from '~/components/history/History.vue'

export default defineComponent({
  name: 'Station',

  components: {
    Navbar,
    Meta,
    Nearby,
    Climate,
    History
  },

  props: {
    station: {
      type: Object,
      default: null
    }
  },

  setup(props: Record<string, any>): Record<string, any> {
    // Translations
    const { t, locale } = useI18n()

    if (props.station?.id) {
      // Meta tags
      useHead({
        meta: [
          {
            name: 'description',
            content: t('$meta.description', {
              name: props.station.name[locale.value] || props.station.name['en'],
              country: props.station.country
            })
          }
        ],
      })
    }

    return { t, format }
  },

  data(): Record<string, any> {
    return {
      meta: this.station || null,
      nearbyStations: []
    }
  },

  async mounted(): Promise<void> {
    if (!this.station) {
      // Get meta data
      await this.fetchMetaData()
    }
  },

  methods: {
    /**
     * Fetch station meta data
     */
    async fetchMetaData(): Promise<void> {
      await fetch(`${this.$api}/app/proxy/stations/meta?id=${this.$route.params.id}`)
        .then(response => response.json())
        .then(data => this.meta = data.data)
    }
  },
})
</script>

<i18n>
{
  "en": {
    "$meta": {
      "description": "Historical weather and climate data for the weather station {name} ({country}) with information on temperature, precipitation and more."
    }
  }
}
</i18n>