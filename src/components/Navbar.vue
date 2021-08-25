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
            src="https://assets.meteostat.net/icon.svg"
            class="logo d-inline-block align-text-top"
          >
          <span class="d-none d-lg-inline-block mb-0 ms-2 h4">Meteostat</span>
        </router-link>
        <div class="input-group search ms-lg-3">
          <span class="input-group-text pe-0 border-0">
            <icon icon="search" />
          </span>
          <input
            ref="search"
            v-model="term"
            type="text"
            class="search-input form-control border-0"
            :placeholder="t('searchPlaceholder')"
            @input="search"
          >
          <span
            v-if="!isMobile"
            class="input-group-text border-0"
          >
            <img src="https://assets.meteostat.net/search-hotkey.svg">
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
                :src="`https://assets.meteostat.net/flags/4x3/${place.country.toLowerCase()}.svg`"
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
                :src="`https://assets.meteostat.net/flags/4x3/${station.country.toLowerCase()}.svg`"
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
                <code class="badge bg-light text-dark border ms-auto">{{ station.id }}</code>
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
          aria-label="Toggle navigation"
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
              to="/maps"
            >
              <span class="nav-link">{{ t('maps') }}</span>
            </router-link>
            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="offcanvas"
                data-bs-target="#donationSidebar"
                aria-controls="donationSidebar"
              >
                {{ t('donation') }}
              </a>
            </li>
          </ul>
          <div class="d-flex ms-auto mt-2 mt-lg-0">
            <a
              class="btn btn-light"
              data-bs-toggle="offcanvas"
              data-bs-target="#settingsSidebar"
              aria-controls="settingsSidebar"
            >
              <icon
                :icon="['fas', 'cog']"
                class="me-1"
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
      <div class="offcanvas-header">
        <h5
          id="offcanvasExampleLabel"
          class="offcanvas-title"
        >
          {{ t('donation') }}
        </h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div class="offcanvas-body">
        <div class="mb-4">
          {{ t('donationText') }}
        </div>
        <strong class="d-block mb-3">{{ t('online') }}</strong>
        <a
          class="icon-link mb-2"
          href="https://www.patreon.com/meteostat"
          target="_blank"
        >
          <span class="box fs-5">
            <icon :icon="['fab', 'patreon']" />
          </span>
          <span class="link fs-5 ms-2">Patreon</span>
        </a>
        <a
          class="icon-link mb-2"
          href="https://www.paypal.com/donate?hosted_button_id=MQ67WRDC8EW38"
          target="_blank"
        >
          <span class="box fs-5">
            <icon :icon="['fab', 'paypal']" />
          </span>
          <span class="link fs-5 ms-2">PayPal</span>
        </a>
        <a
          class="icon-link mb-4"
          href="https://github.com/sponsors/clampr"
          target="_blank"
        >
          <span class="box fs-5">
            <icon :icon="['fab', 'github']" />
          </span>
          <span class="link fs-5 ms-2">GitHub</span>
        </a>
        <strong class="d-block mb-3">{{ t('bankTransfer') }}</strong>
        <div class="form-floating mb-3">
          <input
            id="recipient"
            type="text"
            class="form-control"
            :value="transfer.recipient"
            readonly
          >
          <label for="recipient">{{ t('recipient') }}</label>
        </div>
        <div class="form-floating mb-3">
          <input
            id="iban"
            type="text"
            class="form-control"
            :value="transfer.iban"
            readonly
          >
          <label for="iban">{{ t('iban') }}</label>
        </div>
        <div class="form-floating mb-3">
          <input
            id="bic"
            type="text"
            class="form-control"
            :value="transfer.bic"
            readonly
          >
          <label for="bic">{{ t('bic') }}</label>
        </div>
      </div>
    </div>

    <!-- Settings -->
    <div
      id="settingsSidebar"
      ref="settingsSidebar"
      class="offcanvas offcanvas-end"
      tabindex="-1"
    >
      <div class="offcanvas-header">
        <h5
          id="offcanvasExampleLabel"
          class="offcanvas-title"
        >
          {{ t('settings') }}
        </h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div class="offcanvas-body">
        <div class="form-check form-switch">
          <input
            id="imperial"
            v-model="settings.imperial"
            class="form-check-input"
            type="checkbox"
          >
          <label for="imperial">{{ t('imperialUnits') }}</label>
          <div class="form-text">
            {{ t('imperialUnitsText') }}
          </div>
        </div>
        <div class="form-check form-switch mt-4">
          <input
            id="imperial"
            v-model="settings.model"
            class="form-check-input"
            type="checkbox"
          >
          <label for="imperial">{{ t('modelData') }}</label>
          <div class="form-text">
            {{ t('modelDataText') }}
          </div>
        </div>
        <div class="form-check form-switch mt-4">
          <input
            id="imperial"
            v-model="settings.timezone"
            class="form-check-input"
            type="checkbox"
          >
          <label for="imperial">{{ t('localTimeZone') }}</label>
          <div class="form-text">
            {{ t('localTimeZoneText') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '../stores/settings'

export default defineComponent({
  name: 'Navbar',
  
  setup(): Record<string, any> {
    const { t } = useI18n()
    const settings = useSettingsStore()
    const settingsChanged = ref(false)

    watch(
      () => settings.$state,
      (state) => {
        window.localStorage.setItem('settings', JSON.stringify(state))
        settingsChanged.value = true
      },
      { deep: true }
    )

    const transfer = {
      recipient: 'Christian Lamprecht',
      iban: 'DE76 1001 1001 2621 1459 29',
      bic: 'NTSBDEB1XXX'
    }

    return { t, settings, transfer, settingsChanged }
  },

  data(): Record<string, any> {
    return {
      isMobile: true,
      term: null,
      results: {},
      activeResult: null
    }
  },

  watch: {
    $route(): void {
      this.clearSearch()
    }
  },

  mounted(): void {
    // Check if user is on a mobile device
    this.isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches
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
    });
    // Reload content after change in settings
    (this.$refs as any).settingsSidebar.addEventListener('hide.bs.offcanvas', () => {
      if (this.settingsChanged) {
        this.$router.go(0)
      }
    })
  },

  methods: {
    async search(): Promise<void> {
      if (this.term.length > 2) {
        await fetch(`${this.$api}/autocomplete?match=${this.term}&lang=de`)
          .then(response => response.json())
          .then(data => this.results = data.data)
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

.icon-link {
  display: flex;
  align-items: center;
  
  .box {
    display: flex;
    justify-content: center;
    width: 40px;
    padding: .5rem;
    color: $white;
    background: $dark;
    border-radius: 4px;
  }

  .link {
    color: $dark;
  }

  &:hover {
    .box {
      background: $primary;
    }

    .link {
      color: $primary;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "searchPlaceholder": "Station or Place",
    "places": "Places",
    "stations": "Weather Stations",
    "archive": "Archive",
    "home": "Home",
    "maps": "Maps",
    "donation": "Donation",
    "donationText": "Support Meteostat on its mission of providing open weather and climate data for everyone. Your donation also helps educational and research projects making the world run better using Meteostat data.",
    "online": "Online",
    "bankTransfer": "Bank Transfer",
    "recipient": "Recipient",
    "iban": "IBAN",
    "bic": "BIC",
    "imperialUnits": "Imperial Units",
    "imperialUnitsText": "Use imperial units (Fahrenheit, Inches) for meteorological data. Meteostat uses the metric system by default.",
    "modelData": "Model Data",
    "modelDataText": "Replace missing observations with (less accurate) model data to fill gaps in time series.",
    "localTimeZone": "Local Time Zone",
    "localTimeZoneText": "Displays hourly weather data in the local time zone of the respective weather station or place. Otherwise, hourly data is displayed in Coordinated Universal Time (UTC)."
  },
  "de": {
    "searchPlaceholder": "Wetterstation oder Ort",
    "places": "Orte",
    "stations": "Wetterstationen",
    "archive": "Archiv",
    "home": "Startseite",
    "maps": "Karten",
    "donation": "Spenden",
    "donationText": "Unterstützen Sie Meteostat bei dem Vorhaben, Wetter- und Klimadaten für jedermann frei zugänglich zu machen. Ihre Spende hilft auch zahlreichen Projekten aus Bildung und Forschung, die Meteostat-Daten für ihre Arbeit verwenden.",
    "online": "Online",
    "bankTransfer": "Überweisung",
    "recipient": "Empfänger",
    "iban": "IBAN",
    "bic": "BIC"
  }
}
</i18n>