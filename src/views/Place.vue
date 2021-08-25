<template>
  <div v-if="meta">
    <!-- Subnav -->
    <Navbar
      :id="meta.id"
      ref="subnav"
      type="place"
      :name="meta.name.en"
      :country="meta.country"
      @update="updateRange"
    />
    <!-- Content -->
    <div class="container my-4">
      <div class="row">
        <div class="col-12 col-lg-8">
          <!-- Hourly Data -->
          <template v-if="range && mode === 'hourly'">
            <Hourly
              :lat="meta.location.latitude"
              :lon="meta.location.longitude"
              :alt="meta.location.elevation"
              :range="[format(range.start, 'yyyy-MM-dd'), format(range.end, 'yyyy-MM-dd')]"
              :tz="place.timezone"
              @loaded="dataLoaded"
            />
          </template>
          <!-- Daily Data --->
          <template v-else-if="range && mode === 'daily'">
            <Daily
              :lat="meta.location.latitude"
              :lon="meta.location.longitude"
              :alt="meta.location.elevation"
              :start="format(range.start, 'yyyy-MM-dd')"
              :end="format(range.end, 'yyyy-MM-dd')"
            />
          </template>
          <!-- Monthly Data -->
          <template v-else-if="range && mode === 'monthly'">
            <Monthly
              :lat="meta.location.latitude"
              :lon="meta.location.longitude"
              :alt="meta.location.elevation"
              :start="format(range.start, 'yyyy-MM-dd')"
              :end="format(range.end, 'yyyy-MM-dd')"
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
import Hourly from '../components/history/dashboards/Hourly.vue'
import Daily from '../components/history/dashboards/Daily.vue'
import Monthly from '../components/history/dashboards/Monthly.vue'

export default defineComponent({
  name: 'Place',

  components: {
    Navbar,
    Meta,
    Nearby,
    Hourly,
    Daily,
    Monthly
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
      nearbyStations: [],
      mode: 'hourly',
      range: null
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
      await fetch(`https://api.meteostat.net/app/place?id=${this.$route.params.id}`)
        .then(response => response.json())
        .then(data => this.meta = data.data)
    },

    /**
     * Update date range
     * 
     * @param {Object} range Updated date range
     */
    updateRange(range: Record<string, Date>): void {
      this.range = range
    },

    /**
     * Trigger section list update
     */
    dataLoaded(): void {
      (this.$refs as any).subnav.updateSections()
    }
  },
})
</script>