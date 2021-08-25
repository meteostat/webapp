<template>
  <div v-if="meta.id">
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
      <div class="row">
        <div class="col-12 col-lg-8">
          <!-- Dashboard -->
          <!-- Weather History -->
          <template v-if="$route.name === 'StationHistory'">
            <History
              :station="meta.id"
              :lat="meta.location.latitude"
              :lon="meta.location.longitude"
              :tz="meta.timezone"
              :normals="normals"
            />
          </template>
          <!-- Climate Data -->
          <template v-if="$route.name === 'StationClimate'">
            <Climate
              :station="meta.id"
              :normals="normals"
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
import { defineComponent, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { format } from 'date-fns'
import Navbar from '~/components/location/Navbar.vue'
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
    const { t } = useI18n()

    // Meta data
    const meta = ref(props.station || {})

    // Meta tags
    useHead({
      title: computed(() => meta.value.name ? t('title', { name: meta.value.name.en }) : 'Meteostat'),
      meta: [
        { name: 'description', content: '' }
      ],
    })

    return { t, format, meta }
  },

  data(): Record<string, any> {
    return {
      nearbyStations: [],
      normals: null
    }
  },

  async mounted(): Promise<void> {
    if (!this.station) {
      // Get meta data
      await this.fetchMetaData()
    }
    // Get climate normals
    await this.fetchNormalsData()
  },

  methods: {
    /**
     * Fetch station meta data
     */
    async fetchMetaData(): Promise<void> {
      await fetch(`https://raw.githubusercontent.com/meteostat/weather-stations/master/stations/${this.$route.params.id}.json`)
        .then(response => response.json())
        .then(data => this.meta = data)
    },

    /**
     * Fetch climate normals data
     */
    async fetchNormalsData(): Promise<void> {
      await fetch(`${this.$api}/proxy/stations/normals?station=${this.meta.id}`)
        .then(response => response.json())
        .then(data => this.normals = data.data)
    }
  },
})
</script>

<i18n>
{
  "en": {
    "title": "{name} - Weather Station - Meteostat"
  }
}
</i18n>