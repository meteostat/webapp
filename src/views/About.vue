<template>
  <div class="container py-4">
    <div class="p-5 mb-4 text-white bg-forest rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">
          The Weather's Record Keeper
        </h1>
        <p class="col-md-8 fs-4">
          Meteostat is one of the largest vendors of open weather and climate data. The platform provides access to long-term time series of thousands of weather stations.
        </p>
      </div>
    </div>

    <div class="container-fluid mb-4">
      <div class="row">
        <div class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white rounded-3">
          <h3 class="mb-4">
            Imagine a Search Engine for Weather Data
          </h3>
          <p
            class="text-muted"
          >
            Meteostat processes data from various public sources. This allows both developers and end users to access weather and climate data through a single interface.
          </p>
        </div>
        <div class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white rounded-3">
          <h3 class="mb-4">
            Real Observations & Common Standards
          </h3>
          <p
            class="text-muted"
          >
            Our weather stations meet the World Meteorological Organization's criteria for location and observation methods. Also, Meteostat is one of the rare sources which focuses on real observation data.
          </p>
        </div>
        <div class="col-12 col-md-4 p-4 p-md-5 bg-light border border-white rounded-3">
          <h3 class="mb-4">
            A Search Engine for Weather Data
          </h3>
          <p
            class="text-muted"
          >
            Meteostat processes data from various public sources. This allows both developers and end users to access weather and climate data through a single interface.
          </p>
        </div>
      </div>
    </div>


    <div class="row align-items-md-stretch gy-3 mb-4">
      <div class="col-md-6">
        <div class="h-100 p-5 text-white bg-dark rounded-3">
          <h2>Open Source</h2>
          <p>Meteostat fosters both open source and data. The majority of code which powers Meteostat is available under the MIT license. Help us making Meteostat even better or build upon it.</p>
          <a
            href="https://github.com/meteostat"
            class="btn btn-outline-light"
            target="_blank"
          >
            <icon
              :icon="['fab', 'github']"
              class="me-2"
            />
            GitHub
          </a>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 text-white bg-primary rounded-3">
          <h2>Get Creative</h2>
          <p>Integrate Meteostat data into your products, applications and workflows. Thanks to our open data policy, Meteostat is an ideal data source for research and educational projects.</p>
          <a
            class="btn btn-outline-light btn-lg px-4 me-md-2"
            href="https://dev.meteostat.net/"
            target="_blank"
          >
            <icon
              :icon="['fas', 'code']"
              class="me-1"
            />
            {{ t('documentation') }}
          </a>
        </div>
      </div>
    </div>

    <div class="p-5 text-white bg-love rounded-3">
      <div class="container-fluid py-3">
        <h1 class="display-6 fw-bold">
          Show Your Love Or Get Involved
        </h1>
        <p class="col-md-8 fs-4">
          We believe in open weather and climate data. But we need your help continuing our mission. Your contribution helps both Meteostat and the initiatives building on top of it moving forward. Thank you!
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <a
            class="btn btn-outline-light btn-lg px-4"
            data-bs-toggle="offcanvas"
            data-bs-target="#donationSidebar"
            aria-controls="donationSidebar"
          >
            <icon
              :icon="['fas', 'heart']"
              class="me-1"
            />
            {{ t('donation') }}
          </a>
          <router-link
            tag="button"
            class="btn btn-outline-light border-0 btn-lg px-4 me-md-2"
            to="/patrons"
          >
            <icon
              :icon="['fas', 'user-friends']"
              class="me-1"
            />
            {{ t('patrons') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'

export default defineComponent({
  name: 'About',

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

    return { t }
  }
})
</script>

<style lang="scss" scoped>
@import '~/style/variables';
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";

.bg-forest {
  background:
    linear-gradient(
      rgba(0, 0, 0, 0.3), 
      rgba(0, 0, 0, 0.3)
    ),
    url(https://media.meteostat.net/assets/hero-forest.jpg);
  background-size: cover;
}

.bg-love {
  background: linear-gradient(to right, #cc2b5e, #753a88);
}
</style>

<i18n>
{
  "en": {
    "$meta": {
        "title": "About Meteostat",
        "description": "Meteostat is one of the largest vendors of open weather and climate data."
    }
  },
}
</i18n>