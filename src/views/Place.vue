<template>
  <div v-if="meta?.id">
    <!-- Navbar -->
    <Navbar
      :id="meta.id"
      ref="subnav"
      type="place"
      :name="meta.name.en"
      :country="meta.country"
    />
    <!-- Content -->
    <div class="container my-3 my-lg-4">
      <div class="row">
        <div class="col-12 col-lg-8">
          <!-- Dashboard -->
          <!-- Weather History -->
          <template v-if="$route.name === 'PlaceHistory'">
            <History
              :lat="meta.location.latitude"
              :lon="meta.location.longitude"
              :alt="meta.location.elevation"
              :tz="meta.timezone"
            />
          </template>
          <!-- Climate Data -->
          <template v-if="$route.name === 'PlaceClimate'">
            <Climate
              :lat="meta.location.latitude"
              :lon="meta.location.longitude"
              :alt="meta.location.elevation"
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
import { format } from 'date-fns'
import Navbar from '../components/location/Navbar.vue'
import Meta from '../components/panels/Meta.vue'
import Nearby from '../components/panels/Nearby.vue'
import History from '~/components/history/History.vue'
import Climate from '~/components/climate/Climate.vue'

export default defineComponent({
  name: 'Place',

  components: {
    Navbar,
    Meta,
    Nearby,
    History,
    Climate
  },

  props: {
    place: {
      type: Object,
      default: null
    }
  },

  setup(): Record<string, any> {
    return { format }
  },

  data(): Record<string, any> {
    return {
      meta: this.place || null,
      nearbyStations: []
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
      await fetch(`${this.$api}/place?id=${this.$route.params.id}`)
        .then(response => response.json())
        .then(data => this.meta = data.data)
    }
  },
})
</script>