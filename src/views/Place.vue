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
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { useContext } from 'vitedge';
import { useI18n } from 'vue-i18n';
import { useHead } from '@vueuse/head';
import { format } from 'date-fns';
import Navbar from '../components/LocationNavbar.vue';
import Meta from '../components/panels/Meta.vue';
import AdStickyTop from '~/components/AdStickyTop.vue';

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
    AdStickyTop
  },

  props: {
    place: {
      type: Object,
      default: null
    }
  },

  setup(props: Record<string, any>): Record<string, any> {
    const { t, locale } = useI18n();

    if (props.place?.id) {
      // Meta tags
      useHead({
        meta: [
          {
            name: 'description',
            content: t('$meta.description', {
              name: props.place.name,
              country: props.place.country
            })
          }
        ],
        link: [
          {
            rel: 'canonical',
            href: `https://meteostat.net/${locale.value}/place/${props.place.country.toLowerCase()}/${props.place.id}`
          }
        ]
      });
    } else if (import.meta.env.SSR) {
      const { writeResponse } = useContext();
      writeResponse({ status: 404 });
    }

    return { t, format };
  },

  data(): Record<string, any> {
    return {
      meta: this.place || null,
      nearbyStations: [],
      selectedStation: null
    };
  },

  async mounted(): Promise<void> {
    if (!this.place) {
      await this.fetchMetaData();
    }
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
        .then((data) => (this.meta = data.data))
        .catch(() => {
          this.$router.replace({
            name: 'Home'
          });
        });
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
@import '../node_modules/bootstrap/scss/functions';
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';

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
