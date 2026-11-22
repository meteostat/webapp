<template>
  <div v-if="meta?.id">
    <!-- Navbar -->
    <Navbar :id="meta.id" ref="subnav" type="place" :name="meta.name" :country="meta.country" />
    <!-- Content -->
    <div class="container my-4">
      <div class="row gy-4">
        <div class="col-12 col-lg-8">
          <!-- Dashboard -->
          <Dashboard
            v-if="selectedStation"
            :name="meta.name"
            :station="selectedStation.id"
            :lat="meta.location.latitude"
            :lon="meta.location.longitude"
            :alt="meta.location.elevation"
            :tz="meta.timezone"
            :key="selectedStation.id"
            @loaded="updateNavbarItems()"
          >
            <template v-slot:toolbarButtons>
              <!-- Station Selector -->
              <div class="btn-group" role="group">
                <button
                  class="btn btn-light d-flex align-items-center station-selector-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <icon :icon="['fas', 'map-marker-alt']" class="d-md-none" />
                  <span class="station-selector-name d-none d-md-inline text-truncate">
                    {{ selectedStation?.name }}
                  </span>
                </button>
                <ul class="dropdown-menu station-selector-list">
                  <li v-for="s in nearbyStations" :key="s.id">
                    <a
                      class="dropdown-item d-flex align-items-center"
                      :class="{ active: s.id === selectedStation?.id }"
                      @click="changeStation(s)"
                    >
                      <span
                        class="d-inline-block text-truncate me-3"
                        :class="{ 'text-muted': !s.active && s.id !== selectedStation?.id }"
                        >{{ s?.name }}</span
                      >
                      <span class="badge ms-auto bg-light border text-dark"
                        >{{ Math.round(s.distance / 1000) }} km</span
                      >
                    </a>
                  </li>
                </ul>
              </div>
            </template>
          </Dashboard>
        </div>
        <div class="col-12 col-lg-4">
          <!-- Meta Data -->
          <Meta :data="meta" @loaded="setNearbyStations" />
          <!-- Ads -->
          <AdStickyTop />
        </div>
      </div>
    </div>
  </div>
  <NotFound v-else-if="notFound" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { placeDescription, localizedUrl } from '~/seo/meta';
import { format } from 'date-fns';
import Navbar from '../components/LocationNavbar.vue';
import Meta from '../components/panels/Meta.vue';
import AdStickyTop from '~/components/AdStickyTop.vue';
import NotFound from '~/views/NotFound.vue';

/**
 * Async Components
 */
const Dashboard = defineAsyncComponent(() => import('~/components/dashboard/Dashboard.vue'));

export default defineComponent({
  name: 'Place',

  components: {
    Navbar,
    Meta,
    Dashboard,
    AdStickyTop,
    NotFound
  },

  setup(): Record<string, any> {
    const { t, locale } = useI18n();

    // Place meta data (fetched on mount)
    const meta = ref<Record<string, any> | null>(null);

    // Set to true if the API does not know this place
    const notFound = ref(false);

    // Meta tags
    useHead({
      meta: computed(() => {
        if (notFound.value) {
          return [{ name: 'robots', content: 'noindex' }];
        }
        if (!meta.value?.id) {
          return [];
        }
        return [
          {
            name: 'description',
            content: placeDescription(meta.value.name, meta.value.country, locale.value)
          }
        ];
      }),
      link: computed(() =>
        meta.value?.id
          ? [
              {
                rel: 'canonical',
                href: localizedUrl(locale.value, `/place/${meta.value.country.toLowerCase()}/${meta.value.id}`)
              }
            ]
          : []
      )
    });

    return { t, format, meta, notFound };
  },

  data(): Record<string, any> {
    return {
      nearbyStations: [],
      selectedStation: null
    };
  },

  async mounted(): Promise<void> {
    await this.fetchMetaData();
  },

  methods: {
    /**
     * Fetch place meta data
     */
    async fetchMetaData(): Promise<void> {
      await fetch(
        `${this.$api}/app/place?country=${this.$route.params.country}&id=${this.$route.params.id}&lang=${this.$locale}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data?.data?.id) {
            this.meta = data.data;
          } else {
            this.notFound = true;
          }
        })
        .catch(() => (this.notFound = true));
    },

    updateNavbarItems(): void {
      (this.$refs as any).subnav.updateItems();
    },

    setNearbyStations(stations: Array<any>) {
      this.nearbyStations = stations;
      const stationId = this.$route.query.s;
      this.selectedStation =
        stationId?.length === 5
          ? stations.filter((station) => station.id === stationId)[0]
          : stations.filter((station) => station.active)[0] || stations[0];
    },

    changeStation(station: any) {
      this.selectedStation = station;
    }
  },

  watch: {
    '$route.query.s': {
      handler(to) {
        if (this.nearbyStations?.length && this.selectedStation && to && to !== this.selectedStation.id) {
          this.changeStation(this.nearbyStations.filter((station: any) => station.id === to)[0]);
        }
      },
      deep: true,
      immediate: true
    }
  }
});
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

.station-selector-list {
  width: auto;
  max-width: min(300px, 90vw);
}

.station-selector-name {
  display: inline-block;
  max-width: 120px;

  @media (max-width: 342px) {
    max-width: 98px;
  }

  @include media-breakpoint-up(sm) {
    max-width: 200px;
  }
}

@include media-breakpoint-up(md) {
  .station-selector-btn {
    white-space: nowrap;
    // Generate the caret automatically
    @include caret();
  }
}
</style>
