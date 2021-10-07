<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container-fluid">
        <router-link
          class="navbar-brand d-flex align-items-center p-0"
          to="/"
        >
          <img
            src="https://media.meteostat.net/icon.svg"
            class="logo d-inline-block align-text-top"
          >
          <span class="d-none d-lg-inline-block mb-0 ms-2 h4">Meteostat</span>
        </router-link>
        <div class="input-group search ms-lg-3">
          <span class="input-group-text pe-0 border-0">
            <icon icon="search" />
          </span>
          <input
            id="search"
            ref="search"
            v-model="term"
            type="text"
            class="search-input form-control border-0"
            :placeholder="t('$searchPlaceholder')"
            autocomplete="off"
            @input="search"
          >
          <span
            v-if="!isMobile"
            class="input-group-text border-0"
          >
            <img src="https://media.meteostat.net/assets/search-hotkey.svg">
          </span>
          <div
            v-if="results.places || results.stations"
            ref="results"
            class="search-results list-group"
          >
            <div
              v-if="results.places"
              class="search-category list-group-item fw-bold"
            >
              {{ t('places') }}
            </div>
            <router-link
              v-for="place in results.places"
              :key="place.id"
              class="search-result list-group-item list-group-item-action"
              :to="`/place/${place.placemark}`"
            >
              <img
                :src="`https://media.meteostat.net/assets/flags/4x3/${place.country.toLowerCase()}.svg`"
                class="country-flag me-2"
              >
              <span class="text-truncate">
                <span>{{ place.name }}</span>
                <small
                  v-if="place.region && (place.country == 'US' || place.country == 'CA')"
                  class="text-muted"
                >, {{ place.region }}</small>
              </span>
            </router-link>
            <div
              v-if="results.stations"
              class="search-category list-group-item fw-bold"
            >
              {{ t('stations') }}
            </div>
            <router-link
              v-for="station in results.stations"
              :key="station.id"
              class="search-result list-group-item list-group-item-action"
              :to="`/station/${station.id}`"
            >
              <img
                :src="`https://media.meteostat.net/assets/flags/4x3/${station.country.toLowerCase()}.svg`"
                class="country-flag me-2"
              >
              <span class="text-truncate me-1">
                <span>{{ station.name }}</span>
                <small
                  v-if="station.region"
                  class="text-muted"
                >, {{ station.region }}</small>
              </span>
              <span class="ms-auto">
                <span
                  v-if="!station.active"
                  class="badge bg-secondary me-1"
                >{{ t('archive') }}</span>
                <code class="badge bg-light text-dark border ms-auto">
                  {{ station.id }}
                </code>
              </span>
            </router-link>
          </div>
        </div>
        <button
          class="navbar-toggler ms-2 px-1 border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          id="navbarNav"
          class="collapse navbar-collapse ms-3 mt-2 mt-lg-0"
        >
          <ul class="navbar-nav">
            <router-link
              class="nav-item"
              to="/"
            >
              <span class="nav-link">{{ t('home') }}</span>
            </router-link>
            <router-link
              class="nav-item"
              to="/insights"
            >
              <span class="nav-link">{{ t('insights') }}</span>
            </router-link>
            <router-link
              class="nav-item"
              to="/patrons"
            >
              <span class="nav-link">{{ t('patrons') }}</span>
            </router-link>
          </ul>
          <div class="d-flex ms-auto mt-2 mt-lg-0">
            <a
              class="btn btn-light me-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#donationSidebar"
              aria-controls="donationSidebar"
            >
              <icon
                :icon="['fas', 'heart']"
                class="text-danger me-1"
              />
              {{ t('donation') }}
            </a>
            <a
              class="btn btn-light"
              data-bs-toggle="offcanvas"
              data-bs-target="#settingsSidebar"
              aria-controls="settingsSidebar"
            >
              <icon
                :icon="['fas', 'cog']"
                class="text-secondary me-1"
              />
              {{ t('settings') }}
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Donations -->
    <div
      id="donationSidebar"
      class="offcanvas offcanvas-start"
      tabindex="-1"
    >
      <Donation v-if="showDonation" />
    </div>

    <!-- Settings -->
    <div
      id="settingsSidebar"
      class="offcanvas offcanvas-end"
      tabindex="-1"
    >
      <Settings
        v-if="showSettings"
        @change="settingsChanged = true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * Async Components
 */
const Donation = defineAsyncComponent(() =>
  import('./Donation.vue')
)
const Settings = defineAsyncComponent(() =>
  import('./Settings.vue')
)

export default defineComponent({
  name: 'Navbar',

  components: {
    Donation,
    Settings
  },
  
  setup(): Record<string, any> {
    const { t } = useI18n()

    return { t }
  },

  data(): Record<string, any> {
    return {
      isMobile: true,
      term: null,
      results: {},
      activeResult: null,
      showDonation: false,
      showSettings: false,
      settingsChanged: false
    }
  },

  watch: {
    $route(): void {
      this.clearSearch()
    }
  },

  mounted(): void {
    // Check if user is on a mobile device
    this.isMobile = window?.matchMedia('(hover: none) and (pointer: coarse)').matches
    // Show donation sidebar
    document.getElementById('donationSidebar')?.addEventListener('show.bs.offcanvas', () => {
      this.showDonation = true
    })
    // Show settings sidebar
    document.getElementById('settingsSidebar')?.addEventListener('show.bs.offcanvas', () => {
      this.showSettings = true
    })
    // Reload content after change in settings
    document.getElementById('settingsSidebar')?.addEventListener('hide.bs.offcanvas', () => {
      if (this.settingsChanged) {
        this.$router.go(0)
      }
    })
    // Register search hot key
    document.addEventListener('keydown', (e) => {
      if (e.key === '/') {
        e.preventDefault();
        (this.$refs as any).search.focus()
      }
    })
    // Clear search on click
    document.addEventListener('click', this.clearSearch)
    // Handle search results focus
    document.addEventListener('keydown', (e) => {
      if (
        (e.key === 'ArrowDown' || e.key === 'ArrowUp') &&
        ['search-result', 'search-input'].some(r => document.activeElement?.classList.contains(r))
      ) {
        e.preventDefault();
        const results = (this.$refs as any).results.getElementsByTagName('a')
        if (e.key === 'ArrowDown' && document.activeElement?.classList.contains('search-input')) {
          results[0].focus()
        }        
        else if (e.key === 'ArrowDown') {
          const activeIndex = Array.from(results).findIndex(item => item === document.activeElement)
          if (activeIndex === results.length - 1) {
            results[0].focus()
          }
          else {
            results[activeIndex + 1].focus()
          }
        }
        else if (e.key === 'ArrowUp') {
          const activeIndex = Array.from(results).findIndex(item => item === document.activeElement)
          if (activeIndex === 0) {
            results[results.length - 1].focus()
          }
          else {
            results[activeIndex - 1].focus()
          }
        }
      }     
    })
  },

  methods: {
    async search(): Promise<void> {
      if (this.term.length > 2) {
        await fetch(`${this.$api}/app/autocomplete?match=${this.term}&lang=${this.$locale}`)
          .then(response => response.json())
          .then(data => this.results = data.data)
        window._paq?.push(['trackSiteSearch', this.term, false, false])
      } else {
        this.results = {}
      }
    },

    clearSearch(): void {
      this.term = null
      this.results = {}
    }
  }
})
</script>

<style lang="scss" scoped>
@import "~/style/variables";
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.navbar {
  .logo {
    width: 36px;
    height: 36px;
  }

  .search {
    flex: 1;
    max-width: 420px;
    border-radius: 0.25rem;

    @include media-breakpoint-down(md) {
      position: static;
    }

    @include media-breakpoint-up(sm) {
      min-width: 320px;
    }

    &:focus-within {
      box-shadow: 0 0 0 0.25rem rgb(6 120 190 / 25%);

      .input-group-text, .form-control, .form-control:focus {
        background: $white;
        box-shadow: none;
      }
    }

    .input-group-text, .form-control {
      background: $gray-200;
    }

    .search-results {
      width: 100%;
      position: absolute;
      top: 42px;
      left: 0;
      z-index: 9999;

      @include media-breakpoint-down(md) {
        top: 55px;
        margin-left: 0 !important;
        border-radius: 0 !important;

        .list-group-item {
          border-left: 0;
          border-right: 0;
        }
      }

      @include media-breakpoint-up(lg) {
        border-radius: $border-radius-lg !important;
      }

      .search-category {
        font-size: 75%;
        text-transform: uppercase;
        background: $light;
      }

      .search-result {
        color: $dark;
        width: 100%;
        padding: 7px 10px;
        display: flex;
        align-items: center;

        .country-flag {
          width: 16px;
        }
      }
    }
  }

  .nav-item.router-link-active {
    @include media-breakpoint-down(md) {
      margin-left: calc(-1.7rem - 1px);
      padding-left: calc(1.7rem - 2px);
      border-left: 2px solid $primary;
    }

    @include media-breakpoint-up(lg) {
      margin-bottom: calc(-.5rem - 1px);
      border-bottom: 2px solid $primary;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "$searchPlaceholder": "Station or Place",
    "places": "Places",
    "stations": "Weather Stations",
    "archive": "Archive"
  },
  "de": {
    "$searchPlaceholder": "Wetterstation oder Ort",
    "places": "Orte",
    "stations": "Wetterstationen",
    "archive": "Archiv"
  },
  "it": {
    "$searchPlaceholder": "Stazione o Luogo",
    "places": "Luoghi",
    "stations": "Stazioni Meteorologiche",
    "archive": "Archivio"
  },
  "es": {
    "$searchPlaceholder": "Estación o Lugar",
    "places": "Lugares",
    "stations": "Estaciones Meteorológicas",
    "archive": "Archivo"
  },
  "nl": {
    "$searchPlaceholder": "Station of Plaats",
    "places": "Plaatsen",
    "stations": "Weerstations",
    "archive": "Archive"
  },
  "fr": {
    "$searchPlaceholder" : "Station ou Lieu",
    "places" : "Lieux",
    "stations" : "Stations Météo",
    "archive": "Archives"
  },
  "pt": {
    "$searchPlaceholder": "Estação ou Local",
    "places": "Lugares",
    "stations": "Estações Meteorológicas",
    "archive": "Arquivo"
  },
  "ru": {
    "$searchPlaceholder": "Станция или место",
    "places": "Орте",
    "stations": "Погодные станции",
    "archive": "Архив"   
  }
}
</i18n>